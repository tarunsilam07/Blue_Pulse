import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import homeImage from '/home.png';
import { useLogData } from '../context/LogContext';

const Home = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const logData=useLogData()

  useEffect(() => {
    const token = Cookies.get('token');
    const user=logData?.user;
        console.log(user);
        const isverified=user?.user?.emailVerified;
    if (!token && !isverified) {
      navigate('/signin');
    } else {
      axios.get('http://localhost:3000/home', {
        withCredentials: true
      })
      .then(res => setUserData(res.data.user)) 
      .catch(err => {
        console.log(err);
        Cookies.remove('token',{ path: '/' });
        navigate('/signin');
      });
    }
  }, [navigate,logData]);

  const handleLogout = () => {
    Cookies.remove('token',{ path: '/' });
    navigate('/signin');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
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

      
      <div className="flex-grow flex items-center justify-center p-0 mt-16">
        
          <section
            className="w-full h-full flex items-center justify-center"
            style={{
              backgroundImage: `url(${homeImage})`,
              backgroundSize: 'cover', 
              backgroundPosition: 'center', 
              backgroundRepeat: 'no-repeat', 
              minHeight: '100vh', 
              margin: '0', 
              padding: '0', 
            }}
          >
            <div className="text-center text-white">
              <h1 className="text-6xl font-bold mb-4">
                Welcome to the Water Monitoring Project
              </h1>
              <p className="text-xl mb-6">
                Ensuring water quality and safety for a better tomorrow.
              </p>
              <a
                href="/about"
                className="bg-[#4FC3F7] text-white px-4 py-2 rounded-lg text-lg hover:bg-opacity-90 transition duration-300"
              >
                Learn More
              </a>
            </div>
          </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4 text-center">
        <p>© 2024 BluePulse. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
