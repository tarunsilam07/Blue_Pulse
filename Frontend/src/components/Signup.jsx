import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import firebaseapp from '../FireBase';

const auth = getAuth(firebaseapp);
const googleProvider = new GoogleAuthProvider();

const Signup = () => {
  const [formData, setFormData] = useState({ userName: '', email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:3000/signup', formData, { withCredentials: true });
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await sendEmailVerification(userCredential.user);
      alert('Verification email sent. Please check your inbox.');
      navigate('/signin');
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const googleSignIn = async () => {
    setIsSubmitting(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/signin');
    } catch (err) {
      console.error(err);
      setErrorMessage('Google sign-in failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full relative transform transition-transform duration-300 ease-in-out">
        <h1 className="text-center text-3xl font-bold text-green-600 mb-6">Create Your Account</h1>

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">{errorMessage}</strong>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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

        <div className="flex justify-center items-center my-4">
          <div className="border-b w-full border-gray-300"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="border-b w-full border-gray-300"></div>
        </div>

        <button
          onClick={googleSignIn}
          className="w-full mt-4 py-3 flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200 ease-in-out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.492 12.275c0-.787-.07-1.55-.201-2.285H12v4.334h6.552a5.59 5.59 0 01-2.423 3.666v3.074h3.909c2.288-2.106 3.453-5.211 3.453-8.789z"></path>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.933-2.933l-3.909-3.074a7.998 7.998 0 01-4.024 1.104A8.004 8.004 0 014.834 15.25H.79v3.137C2.773 21.69 7.155 24 12 24z"></path>
            <path fill="#FBBC05" d="M4.834 15.25a7.96 7.96 0 01-.492-2.5c0-.873.176-1.704.492-2.5V7.113H.79A12 12 0 000 12c0 1.915.446 3.72 1.24 5.387l3.594-2.137z"></path>
            <path fill="#EA4335" d="M12 4.84c1.754 0 3.323.607 4.56 1.799l3.43-3.43C17.95 1.37 15.24 0 12 0 7.155 0 2.773 2.31.79 5.612l3.596 2.137A8.004 8.004 0 0112 4.84z"></path>
          </svg>
          <span className="text-gray-600 font-medium">Signup with Google</span>
        </button>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?
          <a href="/signin" className="text-green-600 hover:text-green-500 transition-colors"> Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
