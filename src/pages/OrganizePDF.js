import React, { useState } from 'react';

const OrganizePDF = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleOrganize = () => {
    // Implement PDF organization functionality here
    console.log('Organizing files:', files);
  };

  const moveFile = (index, direction) => {
    const newFiles = [...files];
    const temp = newFiles[index];
    newFiles[index] = newFiles[index + direction];
    newFiles[index + direction] = temp;
    setFiles(newFiles);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Organize PDF</h1>
          <p className="text-gray-600">Rearrange and organize pages in your PDF files</p>
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

        {/* Files List */}
        {files.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Organize Pages</h2>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm text-gray-600">{file.name}</span>
                  <div className="flex space-x-2">
                    {index > 0 && (
                      <button
                        onClick={() => moveFile(index, -1)}
                        className="text-sm text-gray-600 hover:text-red-600"
                      >
                        ↑ Move Up
                      </button>
                    )}
                    {index < files.length - 1 && (
                      <button
                        onClick={() => moveFile(index, 1)}
                        className="text-sm text-gray-600 hover:text-red-600"
                      >
                        ↓ Move Down
                      </button>
                    )}
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Organize Button */}
        {files.length > 0 && (
          <div className="text-center">
            <button
              onClick={handleOrganize}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Organize PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizePDF;