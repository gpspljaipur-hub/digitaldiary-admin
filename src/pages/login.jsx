import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../config/apiService';
import { Landmark, Shield,Lock, Eye, EyeOff, LogIn, UserCheck, ShieldCheck, Phone } from 'lucide-react';
import loginImage from '../assets/login.png';

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNaviagte = () => {
    const role = localStorage.getItem("role");
    if(role === "school_admin"){
      console.log("Home");
      navigate("/home");
    } else{
      console.log("Dashboard");
      navigate("/dashboard");
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (mobileNumber.trim() !== '' && password.trim() !== '') {
      try {
        setLoading(true);
        const response = await loginUser({ mobile: mobileNumber, password });
        
        if (response?.success) {
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
          if (response.data) {
            localStorage.setItem('adminData', JSON.stringify(response.data));
          }
          
          const schoolId = response.data?.schoolId?._id || response.data?.schoolId;
          if (schoolId) {
            localStorage.setItem('schoolId', schoolId);
          }
          
        } else {
          alert(response?.message || 'Login failed');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert(error.response?.data?.message || 'Failed to login. Please check your credentials.');
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
     
      <header className="w-full bg-white border-b border-gray-200 px-8 py-3 flex justify-between items-center z-10">
        <div className="flex items-center gap-2 text-[#0A2240]">
          <Landmark size={24} />
          <span className="text-xl font-bold tracking-tight">DSDS Admin</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">
          <span>GOVT. OF PUNJAB</span>
          <div className="w-8 h-px bg-gray-300"></div>
        </div>
      </header>

    
      <div className="flex-1 max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row items-center justify-between p-4 lg:px-12 lg:py-4 gap-8">
        
       
        <div className="flex-1 w-full max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-[#F0F5FF] px-3 py-1.5 rounded-full mb-4">
            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            <span className="text-xs font-bold text-blue-700 tracking-wider">EDUCATION DEPARTMENT PORTAL</span>
          </div>
          
          <h1 className="text-4xl lg:text-[46px] font-bold text-[#0A1629] leading-tight mb-3 tracking-tight">
            Digital School Diary System
          </h1>
          
          <p className="text-base text-gray-600 mb-4 max-w-xl leading-relaxed">
            Transforming School Governance through Digital Integration. A centralized, secure hub for managing educational data with precision and authority.
          </p>

          <div className="rounded-2xl overflow-hidden bg-[#0A1B35] max-w-[420px] mx-auto lg:mx-0 shadow-2xl border border-gray-100">
            <img 
              src={loginImage} 
              alt="Digital Integration Illustration" 
              className="w-full h-auto object-cover opacity-90"
            />
          </div>
        </div>

  
        <div className="w-full max-w-[440px] lg:mt-0 mt-6">
          <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 relative overflow-hidden">
            
         
            <div className="absolute top-6 right-6 text-gray-100">
              <Shield size={80} strokeWidth={1} />
            </div>

            <div className="relative z-10">
              <h2 className="text-[28px] font-bold text-[#0A1629] mb-1">Authorized Login</h2>
              <p className="text-gray-500 text-sm mb-6">Access your administrative dashboard</p>

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
                  <div className="relative flex items-center">
                    <div className="absolute left-4 text-gray-400">
                      <Phone size={18} />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 font-medium text-gray-900"
                      placeholder="Enter your mobile number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>

               
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-semibold text-gray-700">Password</label>
                    <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700">Forgot password?</a>
                  </div>
                  <div className="relative flex items-center">
                    <div className="absolute left-4 text-gray-400">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full pl-11 pr-12 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 font-medium text-gray-900 tracking-wider"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <p className="text-sm font-medium text-gray-600">
                    Don't have an account?{' '}
                    <span 
                      onClick={() => navigate('/schoolname')} 
                      className="text-blue-600 hover:text-blue-700 font-bold cursor-pointer transition-colors"
                    >
                      Register here
                    </span>
                  </p>
                </div>
                

               
                <button
                  type="submit"
                  disabled={loading}
                  onClick={handleNaviagte}
                  className="w-full py-3.5 bg-[#091F3C] hover:bg-[#112d54] text-white rounded-xl text-[15px] font-bold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#091F3C]/20 active:scale-[0.98]"
                >
                  {loading ? "Authenticating..." : "Access Portal"}
                  {!loading && <LogIn size={18} className="ml-1" />}
                </button>
              </form>
            </div>

     
            <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col items-center gap-3">
              <span className="text-[11px] font-semibold text-gray-500 tracking-wide uppercase">Secured with AES-256 Encryption</span>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400">
                  <UserCheck size={16} />
                </div>
                <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400">
                  <ShieldCheck size={16} />
                </div>
              </div>
            </div>


           

          </div>
        </div>
      </div>

  
      <footer className="w-full text-center py-4 mt-auto border-t border-gray-200">
        <p className="text-xs font-semibold text-gray-500 tracking-wide">
          © 2024 Punjab Education Department. Secure Government Portal. Powered by Optatech Innovations
        </p>
      </footer>
    </div>
  );
};

export default Login;