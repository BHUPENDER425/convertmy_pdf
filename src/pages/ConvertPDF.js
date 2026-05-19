import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// We'll attempt to prefer a local worker served from /pdf.worker.min.mjs (copied into public by postinstall);
// if it's not available we'll fall back to the CDN version matching the installed package version.

// Fast client-side PDF → JPG implementation using pdfjs-dist, jszip and file-saver
// Install: npm install pdfjs-dist jszip file-saver

const ConvertPDF = () => {
  const [file, setFile] = useState(null);
  const [convertTo, setConvertTo] = useState('jpg');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  React.useEffect(() => {
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


  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
      setProgress(0);
    }
  };

   
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
      const dropped = e.dataTransfer.files[0];
      if (dropped.type === 'application/pdf' || dropped.name.match(/\.pdf$/i)) {
        setFile(dropped);
        setError('');
        setProgress(0);
      } else {
        setError('Please drop a valid PDF file');
      }
    }
  };

  const handleConvert = async () => {
    setError('');
    if (!file) {
      setError('Please select a PDF file first');
      return;
    }

    if (convertTo !== 'jpg') {
      setError('Only PDF → JPG is implemented quickly for now');
      return;
    }

    setLoading(true);
    setProgress(0);

    try {
      // pdfjsLib is imported at module level and workerSrc was set to the CDN URL

      const JSZip = (await import('jszip')).default;
      const { saveAs } = await import('file-saver');

      const arrayBuffer = await file.arrayBuffer();
      let pdf = null;
      try {
        // Try to load using the worker (preferred)
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        pdf = await loadingTask.promise;
      } catch (err) {
        console.warn('pdfjs worker failed, retrying with disableWorker', err);
        // Fallback: disable worker which uses main thread rendering
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer, disableWorker: true });
        pdf = await loadingTask.promise;
      }

      const zip = new JSZip();

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);

        await page.render({ canvasContext: ctx, viewport }).promise;

        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        const base64 = dataUrl.split(',')[1];
        const prefixName = file.name.replace(/\.pdf$/i, '');
        zip.file(`${prefixName}_page_${i}.jpg`, base64, { base64: true });

        setProgress(Math.round((i / pdf.numPages) * 100));
        await new Promise((r) => setTimeout(r, 20));
      }

      const blob = await zip.generateAsync({ type: 'blob' }, (meta) => {
        setProgress(Math.round(meta.percent));
      });

      saveAs(blob, `${file.name.replace(/\.pdf$/i, '')}_images.zip`);
      setProgress(100);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Conversion failed. Ensure 'pdfjs-dist', 'jszip' and 'file-saver' are installed.");
      setLoading(false);
    }
  };

  const conversionOptions = [
    { id: 'word', label: 'Word Document', icon: '📄' },
    { id: 'powerpoint', label: 'PowerPoint', icon: '📊' },
    { id: 'excel', label: 'Excel Spreadsheet', icon: '📑' },
    { id: 'jpg', label: 'JPG Images', icon: '🖼️' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Convert PDF</h1>
          <p className="text-gray-600">Convert your PDF to other file formats</p>
        </div>

        <div className="max-w-4xl mx-auto mb-4">
          <div className="text-xs text-gray-500">pdfjs: {pdfjsLib.version} — workerSrc: <span className="font-mono">{pdfjsLib.GlobalWorkerOptions.workerSrc}</span></div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div
            className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
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
            <p className="mt-2 text-sm text-gray-500">or drag and drop a PDF file here</p>
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

        {/* Conversion Options */}
        {file && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Convert To</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {conversionOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setConvertTo(option.id)}
                  className={`p-4 rounded-lg text-center transition-all ${
                    convertTo === option.id
                      ? 'bg-red-50 border-2 border-red-500'
                      : 'bg-gray-50 border-2 border-transparent hover:bg-red-50'
                  }`}
                >
                  <div className="text-2xl mb-2">{option.icon}</div>
                  <div className="text-sm font-medium text-gray-900">{option.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Convert Button */}
        {file && (
          <div className="text-center">
            <button
              onClick={() => handleConvert()}
              disabled={loading}
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {loading ? `Converting... (${progress}%)` : 'Convert & Download JPGs'}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConvertPDF;