import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { School, ArrowRight, Building2 } from 'lucide-react';

const SchoolName = () => {
  const [schoolName, setSchoolName] = useState('');
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    if (schoolName.trim() !== '') {
      navigate('/registration', { state: { schoolName } });
    } else {
      alert("Please enter the school name first.");
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col bg-[#f8f9fc] relative overflow-hidden rounded-[32px]">
  
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full h-full p-6 md:p-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col items-center justify-center">
        <div className="text-center mb-10">
          <div className="mx-auto w-16 h-16 bg-[#0A1629] text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#0A1629]/20 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
            <Building2 size={32} />
          </div>
          <h1 className="text-3xl font-bold text-[#0B132B] mb-2 tracking-tight">Setup School</h1>
          <p className="text-gray-500 text-[15px] font-medium">Enter your school name to continue</p>
        </div>
        
        <form onSubmit={handleNext} className="space-y-6 w-full max-w-md">
          <div className="text-left group">
            <label className="block text-[13px] uppercase tracking-wider font-bold mb-2 text-gray-500 group-focus-within:text-[#0A1629] transition-colors" htmlFor="schoolName">
              School Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#0A1629] transition-colors">
                <School size={20} />
              </div>
              <input
                type="text"
                id="schoolName"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white text-[15px] text-[#0B132B] font-medium transition-all duration-200 focus:outline-none focus:border-[#0A1629] focus:ring-4 focus:ring-[#0A1629]/10 shadow-sm"
                placeholder="e.g. SVVM Public School"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-[#0A1629] hover:bg-[#112443] text-white rounded-xl text-[15px] font-bold tracking-wide transition-all duration-300 shadow-lg shadow-[#0A1629]/20 hover:shadow-[#0A1629]/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group/btn"
          >
            Continue to Registration
            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center">
            <p className="text-xs text-gray-400 font-medium">Step 1 of 2 • Super Admin Setup</p>
        </div>
      </div>
    </div>
  );
};

export default SchoolName;