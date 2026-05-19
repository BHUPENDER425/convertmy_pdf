import React, { useState } from 'react';

const ProtectPDF = () => {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [protectionType, setProtectionType] = useState('view');

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleProtect = () => {
    // Implement PDF protection functionality here
    console.log('Protecting file:', file);
    console.log('Protection type:', protectionType);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Protect PDF</h1>
          <p className="text-gray-600">Secure your PDF with password protection</p>
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

        {/* Protection Options */}
        {file && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Protection Settings</h2>
            
            {/* Protection Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What do you want to protect?
              </label>
              <div className="flex space-x-4">
                <button
                  onClick={() => setProtectionType('view')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    protectionType === 'view'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Viewing
                </button>
                <button
                  onClick={() => setProtectionType('edit')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    protectionType === 'edit'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Editing
                </button>
              </div>
            </div>

            {/* Password Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                  placeholder="Confirm password"
                />
              </div>
            </div>
          </div>
        )}

        {/* Protect Button */}
        {file && password && confirmPassword && password === confirmPassword && (
          <div className="text-center">
            <button
              onClick={handleProtect}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Protect PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProtectPDF;