import React, { useState } from 'react';

const EditPDF = () => {
  const [file, setFile] = useState(null);
  const [selectedTool, setSelectedTool] = useState('text');

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleEdit = () => {
    // Implement PDF editing functionality here
    console.log('Editing file:', file);
    console.log('Selected tool:', selectedTool);
  };

  const editingTools = [
    { id: 'text', label: 'Edit Text', icon: '✏️' },
    { id: 'image', label: 'Add Image', icon: '🖼️' },
    { id: 'draw', label: 'Draw', icon: '✒️' },
    { id: 'highlight', label: 'Highlight', icon: '🖍️' },
    { id: 'signature', label: 'Add Signature', icon: '✍️' },
    { id: 'shapes', label: 'Add Shapes', icon: '⬜' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit PDF</h1>
          <p className="text-gray-600">Modify your PDF content with our editing tools</p>
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

        {/* Editing Tools */}
        {file && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Editing Tools</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {editingTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`p-4 rounded-lg text-center transition-all ${
                    selectedTool === tool.id
                      ? 'bg-red-50 border-2 border-red-500'
                      : 'bg-gray-50 border-2 border-transparent hover:bg-red-50'
                  }`}
                >
                  <div className="text-2xl mb-2">{tool.icon}</div>
                  <div className="text-xs font-medium text-gray-900">{tool.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Edit Button */}
        {file && (
          <div className="text-center">
            <button
              onClick={handleEdit}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Edit PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPDF;