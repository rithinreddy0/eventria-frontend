import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { checkCookie } from '../utils/Checkcookie';
const Tauth = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [staffno, setStaffno] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    // useEffect(()=>{
    //     const verify = async()=>{
    //         const response = await fetch("https://backend-eventria-10.onrender.com/teacher/verify",{
    //             method:"POST",
    //             credentials:"include"
    //         })
    //         console.log(response)
    //         if(response.ok){

    //             navigate("/teacher/dashboard");
    //         }
    //     }
    //     verify();

    // },[name])
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://backend-eventria-10.onrender.com/teacher/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ staffno, password }),
            });
            const data = await response.json();
            console.log(data);
            
            if(data.success==true){
                Cookies.set('teacherAuthToken', data.token, { expires: 7 });
            
            setName("");;
            setStaffno("");
            setEmail("");
            
            navigate("/teacher/dashboard")
            }

        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://backend-eventria-10.onrender.com/teacher/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, staffno }),
            });
            const data = await response.json();
            console.log(data);
            // console.log(data);
            setName("");;
            setStaffno("");
            setEmail("");
            setPassword("");
            
            

        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
                        <label className="block text-gray-700">Staff Number</label>
                        <input
                            type="text"
                            value={staffno}
                            onChange={(e) => setStaffno(e.target.value)}
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
            </div>
        </div>
    );
};

export default Tauth;
