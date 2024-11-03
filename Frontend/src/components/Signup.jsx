import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:3000/signup', formData, {
        withCredentials: true
      });
      alert('User created successfully. Please sign in.');
      navigate('/signin');
    } catch (error) {
      setErrorMessage(error.response.data || 'An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-600">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full relative transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h1 className="text-center text-3xl font-bold text-green-600 mb-6 animate-bounce">Create Your Account</h1>

        
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">User Already Exits</strong>
          </div>
        )}

        
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-4 rounded-full shadow-md">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.24 7l.25.24A7.73 7.73 0 0119 12.24l.24.25m0 0A7.74 7.74 0 0112.26 19l-.25-.25M7.75 16.24l-.24-.25A7.73 7.73 0 015 12.26l-.25-.25m0 0A7.74 7.74 0 0111.74 5l.25.25M16.24 7L7.75 16.24"></path></svg>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 animate-fadeInUp">
          <div className="relative">
            <label htmlFor="userName" className="block text-gray-700 font-medium mb-2">Username</label>
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="Username"
              value={formData.userName}
              onChange={handleChange}
              required
              className="w-full p-3 text-lg border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500 transition-all duration-300"
            />
          </div>

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
              className="w-full p-3 text-lg border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500 transition-all duration-300"
            />
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
              className="w-full p-3 text-lg border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500 transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-lg text-white transition-all duration-300 ease-in-out 
            ${isSubmitting ? 'bg-green-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500 hover:-translate-y-1 transform'}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">Already have an account? 
          <a href="/signin" className="text-green-600 hover:text-green-500 transition-colors"> Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
