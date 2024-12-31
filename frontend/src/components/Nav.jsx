import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-500"
            >
              Data
            </Link>
            <Link
              to="/bar"
              className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-500"
            >
              Bar
            </Link>
            <Link
              to="/pie"
              className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-500"
            >
              Pie
            </Link>
            <Link
              to="/statistics"
              className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-500"
            >
              Monthly Statistics
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
