
import React from 'react';
import { Link } from 'react-router-dom';

const DesktopNavigation = () => {
  return (
    <div className="hidden md:ml-6 md:flex space-x-8">
      <Link to="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-white text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
        Home
      </Link>
      <Link to="/plans" className="inline-flex items-center px-1 pt-1 border-b-2 border-white text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
        Plans
      </Link>
      <Link to="/gallery" className="inline-flex items-center px-1 pt-1 border-b-2 border-white text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
        Gallery
      </Link>
      <Link to="/store" className="inline-flex items-center px-1 pt-1 border-b-2 border-white text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
        Store
      </Link>
      <Link to="/social" className="inline-flex items-center px-1 pt-1 border-b-2 border-white text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
        Community
      </Link>
    </div>
  );
};

export default DesktopNavigation;
