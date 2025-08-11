
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import DownloadPage from "./pages/DownloadPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "./App.css";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <section className="relative w-full h-screen overflow-hidden flex justify-center items-center min-h-screen font-poppins bg-animated-gradient-image">
        {/* Wave animation background */}
        <div className="wave absolute left-0 top-0 w-full h-full bg-[#4973ff] shadow-inner transition duration-500 z-0">
          <span className="wave-span wave1 absolute top-0 left-1/2 w-[325vh] h-[325vh] rounded-[45%] bg-[rgba(20,20,20,1)]" />
          <span className="wave-span wave2 absolute top-0 left-1/2 w-[325vh] h-[325vh] rounded-[40%] bg-[rgba(20,20,20,0.5)]" />
          <span className="wave-span wave3 absolute top-0 left-1/2 w-[325vh] h-[325vh] rounded-[42.5%] bg-[rgba(20,20,20,0.5)]" />
        </div>

        {/* Main app content */}
        <div className="relative z-10 w-full min-h-screen flex flex-col">
          <nav className="bg-white bg-opacity-80 border-b border-gray-200 dark:bg-gray-900 dark:bg-opacity-80 dark:border-gray-700 backdrop-blur-sm">
            <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  alt="Logo"
                  className="h-8"
                />
                <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                  MyApp
                </span>
              </Link>

              {/* Hamburger button */}
              <button
                onClick={toggleMenu}
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
                aria-controls="mobile-menu"
                aria-expanded={menuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {menuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>

              {/* Menu items */}
              <div
                className={`w-full md:flex md:items-center md:w-auto ${
                  menuOpen ? "block" : "hidden"
                }`}
                id="mobile-menu"
              >
                <ul className="flex flex-col mt-4 space-y-2 md:flex-row md:space-y-0 md:space-x-8 md:mt-0">
                  <li>
                    <Link
                      to="/"
                      onClick={() => setMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-700 md:bg-transparent md:text-blue-700 hover:bg-blue-800 md:hover:bg-transparent md:hover:text-blue-800 dark:text-white dark:md:text-blue-400"
                      aria-current="page"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/upload"
                      onClick={() => setMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Upload
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/download"
                      onClick={() => setMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Download
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <main className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 mb-10 flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/download" element={<DownloadPage />} />
            </Routes>
          </main>

          <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>

        {/* Animation styles */}
  
      </section>
    </>
  );
};

export default App;

