import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' }); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post('http://localhost:3000/signin', formData, {
        withCredentials: true
      });
      // localStorage.setItem('token', res.data.token);
      setTimeout(() => {
        navigate('/home');
      }, 1500); 
    } catch (error) {
      setAlert({ message: 'Invalid credentials', type: 'error' }); 
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-600">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full relative transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h1 className="text-center text-3xl font-bold text-blue-600 mb-6 animate-bounce">Welcome Back!</h1>

        
        {alert.message && (
          <div className={`mb-4 p-3 rounded ${alert.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
            {alert.message}
          </div>
        )}

        
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-4 rounded-full shadow-md">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.24 7l.25.24A7.73 7.73 0 0119 12.24l.24.25m0 0A7.74 7.74 0 0112.26 19l-.25-.25M7.75 16.24l-.24-.25A7.73 7.73 0 015 12.26l-.25-.25m0 0A7.74 7.74 0 0111.74 5l.25.25M16.24 7L7.75 16.24"></path></svg>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 animate-fadeInUp">
          <div className="relative">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 text-lg border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.24 7l.25.24A7.73 7.73 0 0119 12.24l.24.25m0 0A7.74 7.74 0 0112.26 19l-.25-.25M7.75 16.24l-.24-.25A7.73 7.73 0 015 12.26l-.25-.25m0 0A7.74 7.74 0 0111.74 5l.25.25M16.24 7L7.75 16.24"></path></svg>
            </span>
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 text-lg border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12v.01M12 18h.01M12 6v.01M12 18h.01M6 12v.01M18 12h.01M6 6h.01"></path></svg>
            </span>
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-lg text-white transition-all duration-300 ease-in-out 
            ${isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 hover:-translate-y-1 transform'}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">Don't have an account? 
          <a href="/signup" className="text-blue-600 hover:text-blue-500 transition-colors"> Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
