import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold">RCT</div>
          <div className="lg:hidden">
            {!isMenuOpen && (
              <button
                onClick={toggleMenu}
                className="text-white focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="hidden lg:flex space-x-8">
            <a href="#" className="text-white">
              Markets
            </a>
            <a href="#" className="text-white">
              Tickers
            </a>
            <a href="#" className="text-white">
              History
            </a>
            <a href="#" className="text-white">
              NTF
            </a>
          </div>
        </div>
      </div>

      {/* Full-screen overlay menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-0 left-0 w-full h-full bg-blue-400 z-50">
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <button
              onClick={toggleMenu}
              className="text-white absolute top-4 right-4 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <a href="#" className="text-white">
              Markets
            </a>
            <a href="#" className="text-white">
              Tickers
            </a>
            <a href="#" className="text-white">
              History
            </a>
            <a href="#" className="text-white">
              NFT
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
