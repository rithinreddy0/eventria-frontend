import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import MNavbar from '../home/MNavbar';
import toast, { Toaster } from 'react-hot-toast';
import showimage from '../assets/visibility1.png';
import hideimage from '../assets/visibility2.png';
import axios from 'axios';

const Hodauth = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    toast.loading('Logging in Please Wait');
    const apiUrl = `${import.meta.env.VITE_API_URL}/hod/login`;

    const payload = {
      email,
      password,
    };

    try {
      const response = await axios.post(apiUrl, payload);
      localStorage.setItem('hodAuthToken', response.data.token);
      toast.dismiss();
      toast.success('Logged in');
      navigate('/hod/dashboard');
    } catch (error) {
      toast.dismiss();
      toast.error('Invalid Email or Password');
    }
  };

  return (
    <>
      <MNavbar />
      <Toaster />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-cover bg-center h-screen b12">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 focus:outline-none"
              >
                <img
                  src={showPassword ? hideimage : showimage}
                  alt="Toggle Password Visibility"
                  className="w-5 h-5"
                />
              </button>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 text-white rounded-md transition ease-in-out duration-300 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
              }`}
            >
              Login
            </button>
          </form>
          <div className='flex justify-center items-center '>
          {
              <button
              onClick={() => navigate('/forgetpassword/hod')}
              className="text-indigo-600 hover:underline focus:outline-none mt-3 text-center"
            >Reset Password
            </button>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Hodauth;
