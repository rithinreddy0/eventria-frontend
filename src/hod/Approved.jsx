import React from 'react'
import Hnavbar from './Hnavbar';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const api = import.meta.env.VITE_API_URL;
import Letter from './Letter';
export default function Disapproved() {
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
            console.log(data)
            // const permissions = data.data.data.filter((letter1)=>{
            //   // console.log(letter1)
            //   return letter1.status == "approved"
            // })
            // console.log(data.data)
            setLetters(data.data.data)
          })
          .catch(()=>{
            navigate("/hod/auth")
        })
      }
      useEffect(()=>{
        verify();
      },[])
  return (
    <><Hnavbar/>
    <div className="container mx-auto p-4">
      
      <h1 className="text-2xl font-bold mb-4 text-blue-500">Admin Dashboard</h1>
      <h1 className="text-xl font-bold mb-4">Approved Permissions</h1>
      {letters.map((letter,index)=> <Letter
      key={index}
        letter={letter}   
      />
    )}
      
    </div>
    </>
  )
}
