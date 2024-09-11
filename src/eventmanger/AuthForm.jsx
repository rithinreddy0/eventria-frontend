import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const AuthForm = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false); // Toggle between login/signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setUsername] = useState(''); // For signup only
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const verify = async()=>{
      const response = await fetch("https://backend-eventria-10.onrender.comorganizer/verify",{
          method:"POST",
          credentials:"include"
      })
      
      if(response.ok){
          navigate("/organizer/dashboard");
      }
  }
  verify();
  }, [] );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const apiUrl = isSignup
      ? 'https://backend-eventria-10.onrender.comorganizer/signup'
      : 'https://backend-eventria-10.onrender.comorganizer/login';

    const payload = {
      email,
      password,
      ...(isSignup && { name }) // Include name only in signup
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials:'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-cover bg-center h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          {isSignup ? 'Sign Up' : 'Login'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignup && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Club / Societie Name
              </label>
              <input
                type="text"
                id="username"
                value={name}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}

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

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 text-white rounded-md transition ease-in-out duration-300
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}
            `}
          >
            {loading ? 'Submitting...' : isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignup((prev) => !prev)}
            className="text-indigo-600 hover:underline focus:outline-none"
          >
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
