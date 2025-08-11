
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiCopy } from "react-icons/fi";
import { api } from "../apis/api";

const SERVER = api;

export default function DownloadSection() {
  const [code, setCode] = useState("");
  const [files, setFiles] = useState([]);
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [expiresAt, setExpiresAt] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);

  const handleGetFile = async () => {
    if (!code.trim()) {
      toast.error("Please enter a code.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`${SERVER}/share/${code.trim()}`);
      if (res.data?.files || res.data?.text) {
        setFiles(res.data.files || []);
        setText(res.data.text || "");
        setExpiresAt(res.data.expiresAt);
        startCountdown(res.data.expiresAt);
        toast.success("Files loaded!");
        console.log(expiresAt);
      } else {
        setFiles([]);
        setText("");
        toast.error("File not found or expired.");
      }
    } catch {
      toast.error("File not found or expired.");
    }
    setLoading(false);
  };

  const startCountdown = (expiry) => {
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((expiry - Date.now()) / 1000));
      setRemainingTime(remaining);
      if (remaining <= 0) clearInterval(interval);
    }, 1000);
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    toast.info("Copied text to clipboard!");
  };

  const renderFilePreview = (url) => {
    const ext = url.split(".").pop().toLowerCase();
    const commonClass = "w-full h-[300px] object-contain rounded border";
    if (["jpg", "jpeg", "png", "gif"].includes(ext))
      return <img src={url} alt="preview" className={commonClass} />;
    if (["mp4", "webm"].includes(ext))
      return <video src={url} controls className={commonClass} />;
    if (["mp3", "wav"].includes(ext))
      return (
        <div className="w-full h-[300px] flex items-center justify-center border rounded bg-gray-100">
          <audio src={url} controls />
        </div>
      );
    if (ext === "pdf") return <iframe src={url} title="PDF" className={commonClass} />;
    return (
      <div className="w-full h-[300px] flex items-center justify-center border rounded bg-gray-100">
        <a href={url} target="_blank" rel="noreferrer" className="text-blue-600 underline">
          Open File
        </a>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">📥 Download File</h2>
      <div className="flex items-center gap-3 mb-4">
        <input
          type="text"
          className="border px-3 py-2 rounded w-full"
          placeholder="Enter File Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          onClick={handleGetFile}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {loading ? "⏳ Loading..." : "Get File"}
        </button>
      </div>
        
      { text && (
  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-300 rounded flex justify-between items-start max-h-48 overflow-y-auto">
    <div className="flex-1 pr-2">
      <p className="text-gray-800 font-medium mb-2">📝 Message:</p>
      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">{text}</pre>
    </div>
    <button onClick={copyText} className="text-gray-700 hover:text-black flex-shrink-0">
      <FiCopy size={20} />
    </button>
  </div>
)}



    
      

      {files.length > 0 && (
        <div className="mt-4 border p-4 rounded bg-gray-50">
          {renderFilePreview(files[currentIndex])}
          {files.length > 1 && (
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setCurrentIndex((prev) => (prev - 1 + files.length) % files.length)}
                className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
              >
                ⬅ Prev
              </button>
              <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % files.length)}
                className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
              >
                Next ➡
              </button>
            </div>
          )}
          <div className="mt-4 text-center">
            <a
              href={files[currentIndex]}
              download
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              ⬇️ Download Current File
            </a>
          </div>
          {remainingTime !== null && (
            <p className="text-sm text-gray-500 mt-3 text-center">
              ⏳ Expires in: {Math.floor(remainingTime / 60)}m {remainingTime % 60}s
            </p>
          )}
        </div>
      )}
    </div>
  );
}
