
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token',{ path: '/' });
    navigate('/signin');
  };

  return (
    <nav className="fixed w-full top-0 bg-[#1E2A38] shadow-lg z-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-white tracking-wide">
          <a href="/home" className="hover:text-[#4FC3F7] transition-all">Blue Pulse</a>
        </div>
        <ul className="flex space-x-8">
          <li>
            <a
              href="/home"
              className="text-lg text-white hover:text-[#4FC3F7] hover:border-b-2 border-[#4FC3F7] transition-all duration-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="text-lg text-white hover:text-[#4FC3F7] hover:border-b-2 border-[#4FC3F7] transition-all duration-300"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/analysis"
              className="text-lg text-white hover:text-[#4FC3F7] hover:border-b-2 border-[#4FC3F7] transition-all duration-300"
            >
              Analysis
            </a>
          </li>
          <li>
            <a
              href="/team"
              className="text-lg text-white hover:text-[#4FC3F7] hover:border-b-2 border-[#4FC3F7] transition-all duration-300"
            >
              Team
            </a>
          </li>
          <li>
            <button
              className="bg-[#4FC3F7] text-white px-5 py-2 rounded-lg shadow-lg hover:bg-opacity-90 transition duration-300 ease-in-out"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
