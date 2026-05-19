import React, { useState } from 'react';

const MergePDF = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleMerge = () => {
    // Implement PDF merging functionality here
    console.log('Merging files:', files);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Merge PDF Files</h1>
          <p className="text-gray-600">Combine multiple PDF files into a single document</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              multiple
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Select PDF Files
            </label>
            <p className="mt-2 text-sm text-gray-500">or drag and drop PDF files here</p>
          </div>
        </div>

        {/* Selected Files List */}
        {files.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Selected Files</h2>
            <ul className="divide-y divide-gray-200">
              {files.map((file, index) => (
                <li key={index} className="py-3 flex justify-between items-center">
                  <span className="text-sm text-gray-600">{file.name}</span>
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Merge Button */}
        {files.length > 1 && (
          <div className="text-center">
            <button
              onClick={handleMerge}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Merge PDF Files
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MergePDF;