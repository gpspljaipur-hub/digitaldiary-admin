import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, MapPin, RefreshCw, CalendarDays, BadgeCheck, School } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate(); 
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    location: '',
    dob: '',
    employeeId: '',
    schoolName: ''
  });
  const [loading, setLoading] = useState(false);

  
  const loadProfileData = async () => {
    setLoading(true);
    try {
    
      const saved = localStorage.getItem("adminData");
      if (saved) {
        const parsed = JSON.parse(saved);
        setProfileData({
          firstName: parsed.firstName ||'N/A',
          lastName: parsed.lastName || 'N/A',
          phone:parsed.mobile || parsed.mobileNumber || 'N/A',
          email: parsed.email || 'N/A',
          location: parsed.location || 'N/A',
          dob: parsed.dob || 'N/A',
          employeeId: parsed.employeeId || 'N/A',
          schoolName: parsed.schoolName || 'N/A'
        });
      } else {
        
        setProfileData({
          firstName: 'Sidesh',
          lastName: 'Saini',
          phone: '9876543210',
          email: 'admin@gmail.com',
          location: 'Jaipur, Rajasthan',
          dob: '1990-01-01',
          employeeId: 'EMP12345',
          schoolName: 'Govt Senior Secondary School'
        });
      }
      
    } catch (error) {
      console.error("Failed to load profile data:", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    loadProfileData();
  }, []);

  const handleBack = () => {
    const role = localStorage.getItem("role");
    if (role === "super_admin") {
      navigate("/dashboard");
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Main Profile */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        
        {/* Card Header */}
        <div className="bg-gradient-to-r from-[#0A1629] to-[#122744] px-8 py-12 text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl transform -translate-x-1/3 translate-y-1/3"></div>
          
          <div className="relative z-10 flex flex-col items-center">

            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl font-bold mb-4 shadow-inner">
              <User size={28} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-center">
              {profileData.firstName} {profileData.lastName}
            </h1>
            <p className="text-gray-300 text-xs mt-1 uppercase tracking-wider font-semibold">
              Administrator Profile
            </p>
          </div>
        </div>

        
        <div className="px-8 py-8 space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400 gap-2">
              <RefreshCw size={24} className="animate-spin text-blue-600" />
              <span className="text-xs font-semibold">Loading profile...</span>
            </div>
          ) : (
            <>
              
              <div className="p-4 bg-[#F8F9FA] border border-gray-100 rounded-2xl flex items-center gap-4 transition-all hover:bg-gray-50">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <School size={20} />
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">School Name</span>
                  <span className="text-sm font-bold text-[#0A1629]">{profileData.schoolName || 'Not Set'}</span>
                </div>
              </div>

              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* First Name */}
                <div className="p-4 bg-[#F8F9FA] border border-gray-100 rounded-2xl flex items-center gap-4 transition-all hover:bg-gray-50">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <User size={20} />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">First Name</span>
                    <span className="text-sm font-bold text-[#0A1629]">{profileData.firstName || 'Not Set'}</span>
                  </div>
                </div>

                {/* Last Name */}
                <div className="p-4 bg-[#F8F9FA] border border-gray-100 rounded-2xl flex items-center gap-4 transition-all hover:bg-gray-50">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <User size={20} />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Last Name</span>
                    <span className="text-sm font-bold text-[#0A1629]">{profileData.lastName || 'Not Set'}</span>
                  </div>
                </div>

              </div>

          
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Employee ID */}
                <div className="p-4 bg-[#F8F9FA] border border-gray-100 rounded-2xl flex items-center gap-4 transition-all hover:bg-gray-50">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                    <BadgeCheck size={20} />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Employee ID</span>
                    <span className="text-sm font-bold text-[#0A1629]">{profileData.employeeId || 'Not Set'}</span>
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="p-4 bg-[#F8F9FA] border border-gray-100 rounded-2xl flex items-center gap-4 transition-all hover:bg-gray-50">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                    <CalendarDays size={20} />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Date of Birth</span>
                    <span className="text-sm font-bold text-[#0A1629]">{profileData.dob || 'Not Set'}</span>
                  </div>
                </div>

    


                <div className="p-4 bg-[#F8F9FA] border border-gray-100 rounded-2xl flex items-center gap-4 transition-all hover:bg-gray-50">
                  <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Phone Number</span>
                    <span className="text-sm font-bold text-[#0A1629]">{profileData.phone || 'Not Set'}</span>
                  </div>
                </div>




                <div className="p-4 bg-[#F8F9FA] border border-gray-100 rounded-2xl flex items-center gap-4 transition-all hover:bg-gray-50">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Email ID</span>
                    <span className="text-sm font-bold text-[#0A1629]">{profileData.email || 'Not Set'}</span>
                  </div>
                </div>

          
             
             
             
                <div className="p-4 bg-[#F8F9FA] border border-gray-100 rounded-2xl flex items-center gap-4 transition-all hover:bg-gray-50 md:col-span-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Location</span>
                    <span className="text-sm font-bold text-[#0A1629]">{profileData.location || 'Not Set'}</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                        
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 py-3.5 border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold rounded-xl text-[15px] transition-colors"
                >
                  Go to Dashboard
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;