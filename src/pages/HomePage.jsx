import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">🔒 Secure File Share</h1>
      <p className="text-gray-600 mb-6">
        Easily share files or text with anyone. All content auto-expires after 10 minutes.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/upload"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          📤 Upload Now
        </Link>
        <Link
          to="/download"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          📥 Access Files
        </Link>
      </div>
    </div>
  );
}
