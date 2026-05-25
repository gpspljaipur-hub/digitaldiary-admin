import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Grid, LogOut } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminData');
    navigate('/');
  };

  return (
    <header className="w-full h-[72px] bg-white border-b border-gray-200 sticky top-0 z-50 flex items-center justify-between px-6">
      
      {/* Left side - Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-[22px] font-bold text-[#0A1629] tracking-tight whitespace-nowrap">
          DSDS Education Administration
        </h1>
      </div>

      {/* Middle - Search Bar */}
      <div className="flex-1 max-w-[600px] mx-8">
        <div className="flex items-center gap-3 bg-[#F4F7F9] px-4 py-2.5 rounded-xl border border-transparent focus-within:border-blue-200 focus-within:bg-white transition-all">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search schools, codes, or records..."
            className="bg-transparent w-full focus:outline-none text-[15px] text-gray-700 placeholder:text-gray-500 font-medium"
          />
        </div>
      </div>

      {/* Right side - Actions & Profile */}
      <div className="flex items-center gap-6">
        
        {/* Icons */}
        <div className="flex items-center gap-5">
          <button className="relative text-[#0A1629] hover:text-blue-600 transition-colors">
            <Bell size={22} strokeWidth={2.5} />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
          
          <button className="text-[#0A1629] hover:text-blue-600 transition-colors">
            <Grid size={22} strokeWidth={2.5} />
          </button>
        </div>

        {/* Separator */}
        <div className="w-px h-8 bg-gray-200"></div>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={handleLogout} title="Click to logout">
          <div className="flex flex-col items-end">
            <span className="text-[15px] font-bold text-[#0A1629] leading-tight group-hover:text-blue-600 transition-colors">
              Admin User
            </span>
            <span className="text-[10px] font-bold text-gray-500 tracking-wider">
              SUPER ADMINISTRATOR
            </span>
          </div>
          
          <img 
            src="https://ui-avatars.com/api/?name=Admin+User&background=0A1629&color=fff&rounded=true&bold=true" 
            alt="Admin User" 
            className="w-10 h-10 rounded-xl object-cover border border-gray-200 shadow-sm"
          />
        </div>

      </div>

    </header>
  );
};

export default Header;