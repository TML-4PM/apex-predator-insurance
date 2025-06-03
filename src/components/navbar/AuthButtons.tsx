
import React from 'react';
import { Link } from 'react-router-dom';

const AuthButtons = () => {
  return (
    <div className="hidden md:flex items-center space-x-2">
      <Link to="/auth" className="text-sm font-medium text-gray-500 hover:text-gray-700">
        Sign in
      </Link>
      <Link to="/auth" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-apex-red hover:bg-apex-red/80">
        Sign up
      </Link>
    </div>
  );
};

export default AuthButtons;
