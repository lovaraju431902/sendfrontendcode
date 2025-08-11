
import React, { useState, useEffect } from "react";
import axios from "axios";
import FileDropZone from "./FileDropZone";
import { toast } from "react-toastify";
import { api } from "../apis/api";
import { FiCopy } from "react-icons/fi";

const SERVER = api;

export default function UploadSection() {
  const [code, setCode] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [text, setText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [expiresAt, setExpiresAt] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    if (!expiresAt) return;
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
      setRemainingTime(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        setCode(null);
        setExpiresAt(null);
        setRemainingTime(null);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  const handleUpload = async () => {
    if (selectedFiles.length === 0 && text.trim() === "") {
      toast.error("Please add a file or enter some text.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));
    if (text !== "") formData.append("text", text);

    try {
      setUploading(true);
      const res = await axios.post(`${SERVER}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCode(res.data.code);
      setExpiresAt(res.data.expiresAt);
      toast.success("Upload successful!");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast.info("Copied to clipboard!");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">📤 Upload Files or Send Text</h2>


      <textarea
  placeholder="Optional: Add a message..."
  value={text}
  onChange={(e) => setText(e.target.value)}
  rows={5} // a bit taller for better UX
  className="w-full p-4 mb-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 max-h-48 overflow-y-auto resize-y text-gray-900 placeholder-gray-400 shadow-sm transition duration-200"
/>







      <FileDropZone onFilesSelected={setSelectedFiles} uploading={uploading} />

      <button
        onClick={handleUpload}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        disabled={uploading}
      >
        {uploading ? "⏳ Uploading..." : "📨 Send"}
      </button>

      {code && (
        <div className="mt-4 bg-green-50 border border-green-400 p-4 rounded flex items-center justify-between">
          <div className="flex-1 pr-2">
            <p className="font-semibold text-green-700 mb-1">✅ Share this code:</p>
            <pre className="font-mono text-lg text-blue-700 select-all">{code}</pre>
            {remainingTime !== null && (
              <p className="text-sm text-gray-600 mt-1">
                ⏳ Expires in: {Math.floor(remainingTime / 60)}m {remainingTime % 60}s
              </p>
            )}
          </div>
          <button onClick={copyCode} className="text-gray-700 hover:text-black flex-shrink-0">
            <FiCopy size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
