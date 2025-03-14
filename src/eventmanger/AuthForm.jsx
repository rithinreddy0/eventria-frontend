import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import toast from 'react-hot-toast';
import MNavbar from '../home/MNavbar';
import showimage from '../assets/visibility1.png';
import hideimage from '../assets/visibility2.png'; // Add an icon for hiding password
const api = import.meta.env.VITE_API_URL;

const AuthForm = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false); // Toggle between login/signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setUsername] = useState(''); // For signup only
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem('organizerAuthToken');
      console.log(api);
      await axios
        .post(`${api}/organizer/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setRedirect(true);
        });
    };
    verify();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const apiUrl = isSignup
      ? `${api}/organizer/signup`
      : `${api}/organizer/login`;

    const payload = {
      email,
      password,
      ...(isSignup && { name }), // Include name only in signup
    };

    try {
      const response = await axios.post(apiUrl, payload);
      // Handle success response
      if (!isSignup) {
        localStorage.setItem('organizerAuthToken', response.data.token);
        navigate('/organizer/dashboard');
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (redirect) {
    return <Navigate to="/organizer/dashboard" />;
  }

  return (
    <>
      <MNavbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-cover bg-center h-screen">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
            {isSignup ? 'Organizer Sign Up' : 'Organizer Login'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignup && (
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Club / Society Name
                </label>
                <input
                  type="text"
                  id="username"
                  value={name}
                  onChange={(e) => setUsername(e.target.value.toLowerCase())}
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
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
                className="absolute right-3 top-9 focus:outline-none"
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
              {loading ? 'Submitting...' : isSignup ? 'Sign Up' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center ">
          
            <button
              onClick={() => setIsSignup((prev) => !prev)}
              className="text-indigo-600 hover:underline focus:outline-none"
            >
              {isSignup
                ? 'Already have an account? Login'
                : "Don't have an account? Sign Up"}
            </button>
          </div>
          <div className='flex justify-center items-center '>
          {
              <button
              onClick={() => navigate('/forgetpassword/organizer')}
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

export default AuthForm;
