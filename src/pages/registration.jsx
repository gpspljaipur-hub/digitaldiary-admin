import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { adminRegister } from '../config/apiService';

import { UserPlus, User, Mail, Lock, Phone, CalendarDays, BadgeCheck, School, ArrowRight } from 'lucide-react';

const getYesterdayDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Registration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobileNumber: '',
    schoolName: location.state?.schoolName || '',
    dob: '',
    employeeId: ''
  });

  useEffect(() => {
    if (!location.state || !location.state.schoolName) {
      navigate('/');
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const payload = {
        mobile: formData.mobileNumber,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
        schoolName: formData.schoolName,
        dob: formData.dob,
        employeeId: formData.employeeId,
        email: formData.email
      };

      const response = await adminRegister(payload);
      
      if (response?.success || response?.message === 'Admin created successfully' || response?._id) {
        alert("Registration Successful!");
        navigate('/');
      } else {
        alert(response?.message || 'Registration failed');
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.response?.data?.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col bg-[#f8f9fc] relative overflow-hidden rounded-[32px]">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full h-full p-6 md:p-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col items-center justify-center">
        <div className="text-center mb-4 flex-shrink-0">
          <div className="mx-auto w-12 h-12 bg-[#0A1629] text-white rounded-2xl flex items-center justify-center mb-2 shadow-lg shadow-[#0A1629]/20 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
            <UserPlus size={24} />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#0B132B] mb-1 tracking-tight">Admin Registration</h1>
          <p className="text-gray-500 text-[14px] font-medium">Complete your profile for {formData.schoolName}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-2 custom-scrollbar w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div className="text-left group">
              <label className="block text-[13px] uppercase tracking-wider font-bold mb-2 text-gray-500 group-focus-within:text-[#0A1629] transition-colors" htmlFor="firstName">First Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#0A1629] transition-colors">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[15px] text-[#0B132B] font-medium transition-all duration-200 focus:outline-none focus:border-[#0A1629] focus:ring-4 focus:ring-[#0A1629]/10 shadow-sm"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="text-left group">
              <label className="block text-[13px] uppercase tracking-wider font-bold mb-2 text-gray-500 group-focus-within:text-[#0A1629] transition-colors" htmlFor="lastName">Last Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#0A1629] transition-colors">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[15px] text-[#0B132B] font-medium transition-all duration-200 focus:outline-none focus:border-[#0A1629] focus:ring-4 focus:ring-[#0A1629]/10 shadow-sm"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div className="text-left group">
              <label className="block text-[13px] uppercase tracking-wider font-bold mb-2 text-gray-500 group-focus-within:text-[#0A1629] transition-colors" htmlFor="email">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#0A1629] transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[15px] text-[#0B132B] font-medium transition-all duration-200 focus:outline-none focus:border-[#0A1629] focus:ring-4 focus:ring-[#0A1629]/10 shadow-sm"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="text-left group">
              <label className="block text-[13px] uppercase tracking-wider font-bold mb-2 text-gray-500 group-focus-within:text-[#0A1629] transition-colors" htmlFor="password">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#0A1629] transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[15px] text-[#0B132B] font-medium transition-all duration-200 focus:outline-none focus:border-[#0A1629] focus:ring-4 focus:ring-[#0A1629]/10 shadow-sm"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div className="text-left group">
              <label className="block text-[13px] uppercase tracking-wider font-bold mb-2 text-gray-500 group-focus-within:text-[#0A1629] transition-colors" htmlFor="mobileNumber">Mobile Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4  flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#0A1629] transition-colors">
                  <Phone size={20} />
                </div>
                <input
                  type="tel"
                  id="mobileNumber"
                  maxLength={10}
                  name="mobileNumber"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[15px] txext-[#0B132B] font-medium transition-all duration-200 focus:outline-none focus:border-[#0A1629] focus:ring-4 focus:ring-[#0A1629]/10 shadow-sm"
                  placeholder="Enter mobile number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="text-left group">
              <label className="block text-[13px] uppercase tracking-wider font-bold mb-2 text-gray-500 group-focus-within:text-[#0A1629] transition-colors" htmlFor="dob">Date of Birth</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#0A1629] transition-colors">
                  <CalendarDays size={20} />
                </div>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  max={getYesterdayDate()}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[15px] text-[#0B132B] font-medium transition-all duration-200 focus:outline-none focus:border-[#0A1629] focus:ring-4 focus:ring-[#0A1629]/10 shadow-sm"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div className="text-left group">
              <label className="block text-[13px] uppercase tracking-wider font-bold mb-2 text-gray-500 group-focus-within:text-[#0A1629] transition-colors" htmlFor="employeeId">Employee ID</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#0A1629] transition-colors">
                  <BadgeCheck size={20} />
                </div>
                <input
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[15px] text-[#0B132B] font-medium transition-all duration-200 focus:outline-none focus:border-[#0A1629] focus:ring-4 focus:ring-[#0A1629]/10 shadow-sm"
                  placeholder="Enter employee ID"
                  value={formData.employeeId}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="text-left group">
              <label className="block text-[13px] uppercase tracking-wider font-bold mb-2 text-gray-500" htmlFor="schoolName">School Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <School size={20} />
                </div>
                <input
                  type="text"
                  id="schoolName"
                  name="schoolName"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-[15px] text-gray-500 font-medium cursor-not-allowed opacity-80"
                  value={formData.schoolName}
                  readOnly
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 mt-2 flex-shrink-0">
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full md:w-auto md:min-w-[250px] mx-auto py-3 bg-[#0A1629] hover:bg-[#112443] text-white rounded-xl text-[15px] font-bold tracking-wide transition-all duration-300 shadow-lg shadow-[#0A1629]/20 hover:shadow-[#0A1629]/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group/btn disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              {loading ? 'Registering...' : 'Complete Registration'}
              {!loading && <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center flex-shrink-0">
            <p className="text-xs text-gray-400 font-medium">Step 2 of 2 • Super Admin Setup</p>
        </div>
      </div>
    </div>
  );
};

export default Registration;