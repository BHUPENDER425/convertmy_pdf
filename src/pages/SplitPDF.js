import React, { useState } from 'react';

const SplitPDF = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSplit = () => {
    // Implement PDF splitting functionality here
    console.log('Splitting file:', file);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Split PDF</h1>
          <p className="text-gray-600">Split your PDF into separate files by pages</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
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

        {/* Split Options */}
        {file && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Split Options</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="split-option"
                  id="split-all"
                  className="text-red-600 focus:ring-red-500"
                  defaultChecked
                />
                <label htmlFor="split-all" className="ml-2 text-sm text-gray-700">
                  Split into separate pages
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="split-option"
                  id="split-range"
                  className="text-red-600 focus:ring-red-500"
                />
                <label htmlFor="split-range" className="ml-2 text-sm text-gray-700">
                  Split by page range
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Split Button */}
        {file && (
          <div className="text-center">
            <button
              onClick={handleSplit}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Split PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SplitPDF;