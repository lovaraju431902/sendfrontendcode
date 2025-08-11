
import React, { useState } from "react";

export default function FileDropZone({ onFilesSelected, uploading }) {
  const [fileList, setFileList] = useState([]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    setFileList(files);
    onFilesSelected(files);
  };

  return (
    <div className="border-dashed border-2 border-gray-400 p-6 rounded-lg text-center mb-4 bg-white">
      <input
        type="file"
        multiple
        onChange={handleChange}
        disabled={uploading}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer text-blue-600">
        📁 Click to select files (max 20MB each)
      </label>

      {fileList.length > 0 && (
        <div className="mt-4 text-left">
          <p className="font-semibold mb-2">📦 Selected Files:</p>
          <ul className="text-sm list-disc ml-6">
            {fileList.map((file, idx) => (
              <li key={idx}>
                {file.name} - {(file.size / (1024 * 1024)).toFixed(2)} MB
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
