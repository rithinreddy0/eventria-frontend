import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import MNavbar from '../home/MNavbar';
const api = import.meta.env.VITE_API_URL;

const Tauth = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [staffno, setStaffno] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false); // New state for show password

    useEffect(() => {
        const verify = async () => {
            const token = localStorage.getItem('teacherAuthToken');
            const response = await axios.post(`${api}/teacher/verify`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(() => {
                navigate('/teacher/dashboard');
            });
        };
        verify();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        toast.loading('Logging in, please wait...');
        const token = localStorage.getItem("teacherAuthToken");
        const response = await axios.post(`${api}/teacher/login`, {
            staffno, password
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res);
            setName('');
            setStaffno('');
            setEmail('');
            toast.dismiss();
            toast.success("Login Successful");
            localStorage.setItem('teacherAuthToken', res.data.token);
            navigate("/teacher/dashboard");
        }).catch((e) => {
            toast.dismiss();
            toast.error("Please enter correct details");
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        toast.loading("Creating new account...");
        const response = await axios.post(`${api}/teacher/signup`, { name, email, password, staffno })
            .then(() => {
                toast.dismiss();
                toast.success("Signup Successful");
            })
            .catch((e) => {
                toast.dismiss();
                toast.error("Please enter correct details");
            });
        setName('');
        setStaffno('');
        setEmail('');
        setPassword('');
    };

    return (
        <>
            <MNavbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <Toaster />
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-4">
                        {isLogin ? 'Teacher Login' : 'Teacher Sign Up'}
                    </h2>

                    <form onSubmit={isLogin ? handleLogin : handleSignup}>
                        {!isLogin && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value.toLowerCase().trim())}
                                        className="w-full p-2 border border-gray-300 rounded mt-2"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
                                        className="w-full p-2 border border-gray-300 rounded mt-2"
                                        required
                                    />
                                </div>
                            </>
                        )}
                        <div className="mb-4">
                            <label className="block text-gray-700">Staff Number</label>
                            <input
                                type="text"
                                value={staffno}
                                onChange={(e) => setStaffno(e.target.value.trim().toLowerCase())}
                                className="w-full p-2 border border-gray-300 rounded mt-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'} // Toggle type based on showPassword
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded mt-2"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-500"
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
                        >
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <p>
                            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-blue-500 underline"
                            >
                                {isLogin ? 'Sign Up' : 'Login'}
                            </button>
                        </p>
                    </div>
                    <div className='flex justify-center items-center '>
          {
              <button
              onClick={() => navigate('/forgetpassword/teacher')}
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

export default Tauth;
