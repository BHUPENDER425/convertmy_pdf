import React, { useState } from 'react';

const ScanToPDF = () => {
  const [files, setFiles] = useState([]);
  const [scanQuality, setScanQuality] = useState('300');
  const [colorMode, setColorMode] = useState('color');

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleScan = () => {
    // Implement PDF scanning functionality here
    console.log('Scanning files:', files);
    console.log('Quality:', scanQuality, 'DPI');
    console.log('Color mode:', colorMode);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Scan to PDF</h1>
          <p className="text-gray-600">Convert scanned documents into searchable PDF files</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Select Images
            </label>
            <p className="mt-2 text-sm text-gray-500">or drag and drop image files here</p>
          </div>
        </div>

        {/* Scan Settings */}
        {files.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Scan Settings</h2>
            
            {/* Quality Settings */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scan Quality (DPI)
              </label>
              <select
                value={scanQuality}
                onChange={(e) => setScanQuality(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
              >
                <option value="150">150 DPI (Draft)</option>
                <option value="300">300 DPI (Normal)</option>
                <option value="600">600 DPI (High Quality)</option>
              </select>
            </div>

            {/* Color Mode */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Mode
              </label>
              <div className="flex space-x-4">
                <button
                  onClick={() => setColorMode('color')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    colorMode === 'color'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Color
                </button>
                <button
                  onClick={() => setColorMode('grayscale')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    colorMode === 'grayscale'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Grayscale
                </button>
                <button
                  onClick={() => setColorMode('blackwhite')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    colorMode === 'blackwhite'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Black & White
                </button>
              </div>
            </div>

            {/* Selected Files */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Files</h3>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                    <span className="text-sm text-gray-600">{file.name}</span>
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Scan Button */}
        {files.length > 0 && (
          <div className="text-center">
            <button
              onClick={handleScan}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Scan to PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanToPDF;