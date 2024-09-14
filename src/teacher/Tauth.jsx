import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { checkCookie } from '../utils/Checkcookie';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
const api = import.meta.env.VITE_API_URL;

const Tauth = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [staffno, setStaffno] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    useEffect(()=>{
        const verify = async()=>{
            const token = localStorage.getItem('teacherAuthToken')
            console.log(api);
            const response = await axios.post(`${api}/teacher/verify`,{
              headers:{
                Authorization: `Bearer ${token}`
              }
            }).then(()=>{
                navigate('/teacher/dashboard')
            })   
        }
        verify();
    },[])
    
    const handleLogin = async (e) => {
        e.preventDefault();
        toast.loading('logging you please wait')
        const token = localStorage.getItem("teacherAuthToken")
        const response = await axios.post(`${api}/teacher/login`, {
            staffno,password},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }).then((res)=>{
                console.log(res)
                setName("");;
                setStaffno("");
                setEmail("");
                toast.dismiss();
                toast.success("Login Successfull")
                localStorage.setItem('teacherAuthToken',res.data.token)
                navigate("/teacher/dashboard")
            }).catch((e)=>{
                toast.dismiss();
                toast.error("Please enter correct details")
            })  
    };

    const handleSignup = async (e) => {
        e.preventDefault();
            toast.loading("creating new account")
            const response = await axios.post(`${api}/teacher/signup`, { name, email, password, staffno })
            .then(()=>{
                toast.dismiss()
                toast.success("Signup Successfull")
            })
            .catch((e)=>{
                toast.dismiss()
                toast.error("Please enter correct details")
            })
            setName("");;
            setStaffno("");
            setEmail("");
            setPassword("");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Toaster/>
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
