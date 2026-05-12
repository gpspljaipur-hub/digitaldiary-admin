import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide header on the login page
  if (location.pathname === '/') {
    return null;
  }

  const handleLogout = () => {
    // Perform any logout logic here if needed (clear tokens, etc.)
    navigate('/');
  };

  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-blue-700 tracking-tight">DigitalDiary</h1>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={handleLogout}
          className="bg-red-50 hover:bg-red-100 text-red-600 px-5 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
