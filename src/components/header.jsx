import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Grid, LogOut, Menu, User } from 'lucide-react';

const Header = ({ toggleSidebar, showSidebarToggle }) => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);


  const savedData = localStorage.getItem('adminData');
  const adminData = savedData ? JSON.parse(savedData) : {};
  const role = localStorage.getItem('role') || '';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminData');
    navigate('/');
  };

  const handleProfileClick = () => {
    setIsProfileOpen(false);
    navigate('/profile');
  };

  return (
    <header className="w-full h-[72px] bg-white border-b border-gray-200 sticky top-0 z-50 flex items-center justify-between px-6">
      
    
      <div className="flex items-center gap-3">
        {showSidebarToggle && (
          <button 
            onClick={toggleSidebar} 
            className="p-2 -ml-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            <Menu size={24} strokeWidth={2.5} />
          </button>
        )}
        <h1 className="text-[22px] font-bold text-[#0A1629] tracking-tight whitespace-nowrap">
          DSDS Education Administration
        </h1>
      </div>


     
      <div className="flex items-center gap-6">
        
        <div className="flex items-center gap-5">
          <button className="relative text-[#0A1629] hover:text-blue-600 transition-colors">
            <Bell size={22} strokeWidth={2.5} />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
          
          <button className="text-[#0A1629] hover:text-blue-600 transition-colors">
            <Grid size={22} strokeWidth={2.5} />
          </button>
        </div>

        <div className="w-px h-8 bg-gray-200"></div>

       
        <div className="relative">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setIsProfileOpen(!isProfileOpen)} 
            title="Account settings"
          >
            <div className="flex flex-col items-end">
              <span className="text-[15px] font-bold text-[#0A1629] leading-tight group-hover:text-blue-600 transition-colors">
                {adminData.firstName ? `${adminData.firstName} ${adminData.lastName || ''}`.trim() : 'Admin User'}
              </span>
              <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                {role ? role.replace(/_/g, ' ') : 'SUPER ADMINISTRATOR'}
              </span>
            </div>
            
            <img 
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(adminData.firstName ? `${adminData.firstName} ${adminData.lastName || ''}`.trim() : 'Admin User')}&background=0A1629&color=fff&rounded=true&bold=true`}
              alt="Admin User" 
              className="w-10 h-10 rounded-xl object-cover border border-gray-200 shadow-sm"
            />
          </div>

          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <button 
                onClick={handleProfileClick}
                className="w-full px-4 py-2 text-left flex items-center gap-3 text-[15px] font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
              >
                <User size={18} />
                Profile
              </button>
              <div className="h-px bg-gray-100 my-1"></div>
              <button 
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left flex items-center gap-3 text-[15px] font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={18} />
                Log out
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
};

export default Header;