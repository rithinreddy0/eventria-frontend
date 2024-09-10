import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Auth = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [rollno, setRollno] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [year, setYear] = useState('');
    const [className, setClassName] = useState('');
    const [section, setSection] = useState('');

    // Effect for verifying login status
    useEffect(() => {
        const verify = async () => {
            const response = await fetch("https://backend-eventria-10.onrender.com/student/verify", {
                method: "POST",
                credentials: "include"
            });
            if (response.ok) {
                navigate("/student/dashboard");
            }
        };
        verify();
    }, [isLogin, navigate]);

    // Helper function to validate input fields
    const validate = () => {
        if (!rollno || rollno.trim().length === 0) {
            toast.error("Roll Number is required");
            return false;
        }
        if (!password || password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return false;
        }
        if (!isLogin) {
            if (!name || name.trim().length === 0) {
                toast.error("Name is required");
                return false;
            }
            if (!email || !/\S+@\S+\.\S+/.test(email)) {
                toast.error("Valid Email is required");
                return false;
            }
            if (!year) {
                toast.error("Year is required");
                return false;
            }
            if (!className) {
                toast.error("Class is required");
                return false;
            }
            if (!section) {
                toast.error("Section is required");
                return false;
            }
            setRollno(rollno.trim());
            setName(name.trim());
            setEmail(email.trim());
            
        }
        return true;
    };

    // Handle login submission
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validate()) return; // Run validation

        toast.loading("Logging In...");
        try {
            const response = await fetch('https://backend-eventria-10.onrender.com/student/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rollno, password }),
            });

            if (!response.ok) {
                toast.dismiss();
                return toast.error("Invalid Login Details");
            }

            const data = await response.json();
            if (data.success) {
                toast.dismiss();
                toast.success("Login Successful");
                Cookies.set('studentAuthToken', data.token, { expires: 7 });
                resetForm();
                navigate("/student/dashboard");
            }
        } catch (error) {
            toast.dismiss();
            toast.error('Error logging in.');
            console.error('Error:', error);
        }
    };

    // Handle signup submission
    const handleSignup = async (e) => {
        e.preventDefault();
        if (!validate()) return; // Run validation

        toast.loading("Creating Account...");
        try {
            const response = await fetch('https://backend-eventria-10.onrender.com/student/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, rollno, className, section, year }),
            });

            if (!response.ok) {
                toast.dismiss();
                return toast.error("Error creating account");
            }

            toast.dismiss();
            toast.success("Account Created Successfully");
            resetForm();
            setIsLogin(true); // Switch to login mode
        } catch (error) {
            toast.dismiss();
            toast.error('Error signing up.');
            console.error('Error:', error);
        }
    };

    // Reset form fields
    const resetForm = () => {
        setName('');
        setRollno('');
        setEmail('');
        setPassword('');
        setYear('');
        setClassName('');
        setSection('');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Toaster />
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4">
                    {isLogin ? 'Login' : 'Sign Up'}
                </h2>

                <form onSubmit={isLogin ? handleLogin : handleSignup}>
                    {!isLogin && (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded mt-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded mt-2"
                                    required
                                />
                            </div>
                        </>
                    )}
                    <div className="mb-4">
                        <label className="block text-gray-700">Roll Number</label>
                        <input
                            type="text"
                            value={rollno}
                            onChange={(e) => setRollno(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                            required
                        />
                    </div>
                    {!isLogin && (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-700">Select Year</label>
                                <select
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                >
                                    <option value="">--Select Year--</option>
                                    <option value="1">1st Year</option>
                                    <option value="2">2nd Year</option>
                                    <option value="3">3rd Year</option>
                                    <option value="4">4th Year</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Select Class</label>
                                <select
                                    value={className}
                                    onChange={(e) => setClassName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                >
                                    <option value="">--Select Class--</option>
                                    <option value="iot">IOT</option>
                                    <option value="aiml">AIML</option>
                                    <option value="cse">CSE</option>
                                    <option value="aids">AIDS</option>
                                    <option value="automobile">Automobile</option>
                                    <option value="mechanical">Mechanical</option>
                                    <option value="eee">EEE</option>
                                    <option value="ece">ECE</option>
                                    <option value="csbs">CSBS</option>
                                    <option value="eie">EIE</option>
                                    <option value="ds">DS</option>
                                    <option value="cys">Cyber Security</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Select Section</label>
                                <select
                                    value={section}
                                    onChange={(e) => setSection(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                >
                                    <option value="">--Select Section--</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </select>
                            </div>
                        </>
                    )}

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
                            className="text-blue-500 hover:underline"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
