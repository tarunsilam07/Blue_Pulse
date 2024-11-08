import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import homeImage from '/home.png';
import { useLogData } from '../context/LogContext';
import Navbar from './NavBar';

const Home = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const logData = useLogData();

  useEffect(() => {
    const token = Cookies.get('token');
    let isVerified = JSON.parse(localStorage.getItem('isVerified'));

    if (!isVerified && logData?.user?.user?.emailVerified) {
      isVerified = logData.user.user.emailVerified;
      localStorage.setItem('isVerified', JSON.stringify(isVerified));
    }

    if (!token && !isVerified) {
      navigate('/signin');
    } else {
      axios.get('http://localhost:3000/home', {
        withCredentials: true
      })
      .then(res => setUserData(res.data.user))
      .catch(err => {
        console.log(err);
        Cookies.remove('token', { path: '/' });
        navigate('/signin');
      });
    }
  }, [navigate, logData]);

  const handleLogout = () => {
    Cookies.remove('token', { path: '/' });
    localStorage.removeItem('isVerified');
    navigate('/signin');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <Navbar/>

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
