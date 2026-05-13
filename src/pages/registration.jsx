import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { adminRegister } from '../config/apiService';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-5">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-10 animate-[slideUp_0.4s_ease-out]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Registration</h1>
          <p className="text-slate-500 text-sm">Complete your profile for {formData.schoolName}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div className="text-left">
              <label className="block text-sm font-medium mb-2 text-slate-900" htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-[15px] text-slate-900 transition-all duration-200 focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="text-left">
              <label className="block text-sm font-medium mb-2 text-slate-900" htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-[15px] text-slate-900 transition-all duration-200 focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div className="text-left">
              <label className="block text-sm font-medium mb-2 text-slate-900" htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-[15px] text-slate-900 transition-all duration-200 focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="text-left">
              <label className="block text-sm font-medium mb-2 text-slate-900" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-[15px] text-slate-900 transition-all duration-200 focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div className="text-left">
              <label className="block text-sm font-medium mb-2 text-slate-900" htmlFor="mobileNumber">Mobile Number</label>
              <input
                type="tel"
                id="mobileNumber"
                maxLength={10}
                name="mobileNumber"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-[15px] text-slate-900 transition-all duration-200 focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10"
                placeholder="Enter mobile number"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="text-left">
              <label className="block text-sm font-medium mb-2 text-slate-900" htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                max={getYesterdayDate()}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-[15px] text-slate-900 transition-all duration-200 focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div className="text-left">
              <label className="block text-sm font-medium mb-2 text-slate-900" htmlFor="employeeId">Employee ID</label>
              <input
                type="text"
                id="employeeId"
                name="employeeId"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-[15px] text-slate-900 transition-all duration-200 focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10"
                placeholder="Enter employee ID"
                value={formData.employeeId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="text-left">
              <label className="block text-sm font-medium mb-2 text-slate-900" htmlFor="schoolName">School Name</label>
              <input
                type="text"
                id="schoolName"
                name="schoolName"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-200 text-[15px] text-slate-500 cursor-not-allowed opacity-70 transition-all duration-200"
                value={formData.schoolName}
                readOnly
                disabled
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full py-3.5 bg-blue-600 text-white rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 hover:bg-blue-700 active:scale-[0.98] mt-5 disabled:opacity-70 disabled:cursor-not-allowed">
            {loading ? 'Registering...' : 'Complete Registration'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;