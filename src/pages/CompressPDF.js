import React, { useState, useRef, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// We'll attempt to use a local worker served from /pdf.worker.min.mjs (copied into public by postinstall);
// if it's not available we'll fall back to the CDN version matching the installed package version.

// NOTE: This implementation uses `pdfjs-dist` to render pages and `jspdf` to rebuild
// a compressed PDF by re-encoding pages as JPEG images. Install packages:
// npm install pdfjs-dist jspdf

const CompressPDF = () => {
  const [file, setFile] = useState(null);
  const [compressionLevel, setCompressionLevel] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [compressedSize, setCompressedSize] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // 'success' | 'error'
  const toastTimerRef = useRef(null);
  const [consoleErrors, setConsoleErrors] = useState([]);

  useEffect(() => {
    let mounted = true;
    async function ensureWorker() {
      const local = '/pdf.worker.min.mjs';
      const cdn = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      try {
        const res = await fetch(local, { method: 'HEAD' });
        if (mounted && res && res.ok) {
          pdfjsLib.GlobalWorkerOptions.workerSrc = local;
        } else if (mounted) {
          pdfjsLib.GlobalWorkerOptions.workerSrc = cdn;
        }
      } catch (e) {
        if (mounted) pdfjsLib.GlobalWorkerOptions.workerSrc = cdn;
      }
      if (mounted) {
        console.info('pdfjs', { version: pdfjsLib.version, workerSrc: pdfjsLib.GlobalWorkerOptions.workerSrc });
      }
    }
    ensureWorker();
    return () => {
      mounted = false;
    };
  }, []);

  const showTemporaryToast = (msg, type = 'success', duration = 5000) => {
    // clear existing timer
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    setToastMessage(msg);
    setToastType(type);
    setShowToast(true);
    toastTimerRef.current = setTimeout(() => {
      setShowToast(false);
      toastTimerRef.current = null;
    }, duration);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
        toastTimerRef.current = null;
      }
    };
  }, []);

  // Capture last errors so they can be shown on-page for quick debugging
  useEffect(() => {
    const onError = (ev) => {
      const msg = ev?.message || (ev?.reason && ev.reason.message) || String(ev);
      const stack = ev?.error?.stack || (ev?.reason && ev.reason.stack) || '';
      setConsoleErrors((prev) => {
        const next = [{ time: Date.now(), msg, stack }].concat(prev).slice(0, 2);
        return next;
      });
    };

    const onRejection = (ev) => onError(ev);

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);

    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection);
    };
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setCompressedSize(null);
      setProgress(0);
      setError('');

      // Start compression automatically after a file is selected
      // Use a microtask so the state updates are applied first
      setTimeout(() => {
        handleCompress(selected);
      }, 0);
    }
  };

  const getQualityAndScale = (level) => {
    // Returns [jpegQuality, renderScale]
    switch (level) {
      case 'low':
        return [0.92, 1.0]; // best quality, least compression
      case 'high':
        return [0.55, 0.6]; // aggressive compression and downscale
      case 'medium':
      default:
        return [0.75, 0.85];
    }
  };

  async function handleCompress(fileParam) {
    // When invoked via onClick, React may pass an event object as the first arg.
    // Only treat fileParam as file when it's a File instance.
    const targetFile = fileParam instanceof File ? fileParam : file;
    if (!targetFile) return;
    // prevent double start
    if (loading) return;
    setLoading(true);
    setError('');
    setProgress(0);
    setCompressedSize(null);

    try {
      // pdfjsLib is imported at module level and workerSrc was set to the CDN URL

      const { jsPDF } = await import('jspdf');

      // Read file as arrayBuffer
      const arrayBuffer = await targetFile.arrayBuffer();

      let pdf = null;
      try {
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        pdf = await loadingTask.promise;
      } catch (err) {
        console.warn('pdfjs worker failed, retrying with disableWorker', err);
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer, disableWorker: true });
        pdf = await loadingTask.promise;
      }

      const [jpegQuality, renderScale] = getQualityAndScale(compressionLevel);

      let doc = null;
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: renderScale });

        // Render to canvas
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;

        // Convert canvas to JPEG image with specified quality
        const imgData = canvas.toDataURL('image/jpeg', jpegQuality);

        // Build PDF with jsPDF (px units match canvas pixels)
        if (!doc) {
          doc = new jsPDF({ unit: 'px', format: [canvas.width, canvas.height] });
          doc.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
        } else {
          doc.addPage([canvas.width, canvas.height]);
          doc.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
        }

        setProgress(Math.round((i / pdf.numPages) * 100));
        await new Promise((r) => setTimeout(r, 50)); // give UI a chance to update
      }

      if (!doc) throw new Error('Failed to build compressed PDF');

      const blob = doc.output('blob');
      const sizeStr = (blob.size / (1024 * 1024)).toFixed(2);
      setCompressedSize(sizeStr);

      // Trigger download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = targetFile.name.replace(/\.pdf$/i, '') + '-compressed.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      // show success toast
      showTemporaryToast(`Compression complete: ${sizeStr} MB`, 'success');

      setLoading(false);
      setProgress(100);
    } catch (err) {
      console.error(err);
      setError(
        "Compression failed. Ensure you've installed 'pdfjs-dist' and 'jspdf' (npm install pdfjs-dist jspdf) or check console for details."
      );
      showTemporaryToast('Compression failed. Check console for details.', 'error');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Compress PDF</h1>
          <p className="text-gray-600">Upload a PDF, choose a compression level, then compress & download</p>
        </div>

        {/* Debug panel: pdfjs info + last two errors */}
        

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging ? 'border-red-400 bg-red-50' : 'border-gray-300'
            }`}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setIsDragging(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const dt = e.dataTransfer;
              if (dt && dt.files && dt.files[0]) {
                const dropped = dt.files[0];
                // Only accept PDFs
                if (dropped.type === 'application/pdf' || dropped.name.match(/\.pdf$/i)) {
                  setFile(dropped);
                  setCompressedSize(null);
                  setProgress(0);
                  setError('');
                  // start compression immediately
                  setTimeout(() => {
                    handleCompress(dropped);
                  }, 0);
                } else {
                  setError('Please drop a valid PDF file');
                  showTemporaryToast('Please drop a valid PDF file', 'error');
                }
              }
            }}
          >
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Select PDF File
            </label>
            <p className="mt-2 text-sm text-gray-500">{isDragging ? 'Drop PDF to compress' : 'or drag and drop a PDF file here'}</p>
          </div>
        </div>

        {/* File Info */}
        {file && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Selected File</h2>
            <div className="text-sm text-gray-600">
              <p>Name: {file.name}</p>
              <p>Size: {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
          </div>
        )}

        {/* Compression Options */}
        {file && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Compression Level</h2>
            <div className="flex space-x-4">
              {['low', 'medium', 'high'].map((level) => (
                <button
                  key={level}
                  onClick={() => setCompressionLevel(level)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    compressionLevel === level
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Compress Button + Progress */}
        {file && (
          <div className="text-center">
            <button
              onClick={handleCompress}
              disabled={loading}
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {loading ? 'Compressing...' : 'Compress & Download'}
            </button>

            {loading && (
              <div className="mt-4 text-sm text-gray-600">
                <p>Progress: {progress}%</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {compressedSize && !loading && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                <p className="text-sm text-green-700">Compressed file size: {compressedSize} MB (download started)</p>
              </div>
            )}
          </div>
        )}
      </div>
    {showToast && (
      <div
        role="status"
        aria-live="polite"
        onMouseEnter={() => {
          // pause hide timer while hovered
          if (toastTimerRef.current) {
            clearTimeout(toastTimerRef.current);
            toastTimerRef.current = null;
          }
        }}
        onMouseLeave={() => {
          // restart hide timer
          if (!toastTimerRef.current) {
            toastTimerRef.current = setTimeout(() => setShowToast(false), 5000);
          }
        }}
        className={`fixed bottom-6 right-6 shadow-lg rounded-md px-4 py-3 flex items-center gap-3 ${
          toastType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}
      >
        <p className="text-sm">{toastMessage}</p>
        <button
          aria-label="Close"
          onClick={() => {
            setShowToast(false);
            if (toastTimerRef.current) {
              clearTimeout(toastTimerRef.current);
              toastTimerRef.current = null;
            }
          }}
          className="ml-2 text-white opacity-90 hover:opacity-100"
        >
          ✕
        </button>
      </div>
    )}
    </div>
  );
};

export default CompressPDF;