import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PermissionLetter from './PermissionLetter';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
const api = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const [letters, setLetters] = useState([]);
    const navigate = useNavigate();
  const [v,setv] = useState("");
    const verify = async()=>{
      const token = localStorage.getItem('hodAuthToken')
        const response = await axios.post(`${api}/hod/getallletters`,{
          headers:{
            Authorization : `Bearer ${token}`
          }
        })
        .then((data)=>{
          console.log(data.data.data)
          
          setLetters(data.data.data)
        })
        .catch(()=>{
          navigate("/hod/auth")
      })
    }
    const onApprove = async(id)=>{
      const token = localStorage.getItem("hodAuthToken")
      const response = await axios.post(`${api}/hod/approve`,id,{
          headers:{
            Authorization:`Bearer ${token}`
          }
      })
      .then(()=>{
        toast.success("Approved")
        setv("hi")
        })
      .catch(()=>{
        toast.error("Failed to approve")
        setv("hello")
        })

    }
    const onDisapprove = async(id)=>{
      const token = localStorage.getItem("hodAuthToken")
      const response = await axios.post(`${api}/hod/disapprove`,{id},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      .then(()=>{
        toast.success("DisApproved")
        setv("hi")
        })
      .catch(()=>{
        toast.error("Failed to Disapprove")
        setv("hello")
        })
    }
    useEffect(()=>{
      verify();
   },[v])


  return (
    <div className="container mx-auto p-4">
      <Toaster/>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {letters.map((letter)=><PermissionLetter 
        letter={letter}   
        onApprove={onApprove}
        onDisapprove={onDisapprove}
      />)}
      
    </div>
  );
};

export default AdminDashboard;
