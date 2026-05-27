import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-5">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-10 animate-[slideUp_0.4s_ease-out]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Portal</h1>
          <p className="text-slate-500 text-sm">Super Admin</p>
        </div>
        <form onSubmit={handleNext}>
          <div className="mb-5 text-left">
            <label className="block text-sm font-medium mb-2 text-slate-900" htmlFor="schoolName">School Name</label>
            <input
              type="text"
              id="schoolName"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-[15px] text-slate-900 transition-all duration-200 focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10"
              placeholder="Enter your school name"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full py-3.5 bg-blue-600 text-white rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 hover:bg-blue-700 active:scale-[0.98] mt-2">
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default SchoolName;