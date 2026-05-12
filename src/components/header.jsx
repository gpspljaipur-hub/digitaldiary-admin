import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');

    navigate('/');
  };

  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 flex items-center justify-between px-6">

      <h1 className="text-2xl font-bold text-blue-700 tracking-tight">
        DigitalDiary
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-50 hover:bg-red-100 text-red-600 px-5 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm"
      >
        Logout
      </button>

    </header>
  );
};

export default Header;