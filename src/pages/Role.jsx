import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import superAdminImage from "../assets/superadmin.jpeg";

const Role = () => {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState("super_admin");

    const handleContinue = () => {
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex font-sans bg-white">
            
            {/* Left Side Image Container - Hidden on small screens */}
            <div className="hidden lg:block lg:w-[55%] bg-gray-100 relative overflow-hidden">
                <img 
                    src={superAdminImage} 
                    alt="Digital Diary Administration" 
                    className="absolute inset-0 w-full h-full object-cover object-right"
                />
            </div>

            {/* Right Side Form Container */}
            <div className="w-full lg:w-[45%] flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md">
                    <p className="text-[#0A1629] font-bold text-[13px] tracking-[0.15em] mb-3">
                        ROLE BASED ACCESS
                    </p>
                    <h1 className="text-[44px] font-extrabold text-[#131d27] mb-10 leading-none tracking-tight">
                        Sign in
                    </h1>
                    
                    <div className="mb-6">
                        <label className="block text-[#131d27] font-extrabold text-[17px] mb-2">
                            Panel
                        </label>
                        <div className="relative">
                            <select 
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-[17px] text-gray-800 appearance-none focus:outline-none focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] bg-white cursor-pointer"
                            >
                                <option value="super_admin">Super Admin</option>
                                <option value="school_admin">School Admin</option>
                            </select>
                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <button 
                            onClick={handleContinue}
                            className="bg-[#0A1629] hover:bg-[#112443] text-white font-bold text-[17px] py-3.5 px-6 rounded-xl transition duration-200 inline-block"
                        >
                            Open {selectedRole === 'super_admin' ? 'Super Admin' : 'School Admin'} Panel
                        </button>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Role;