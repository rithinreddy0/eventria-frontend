import React, { useContext, useEffect } from 'react'
import Navbar from './Navbar'
import EventManager from './EventManager'
import { AuthContext } from '../context/AuthContext'
import { checkCookie } from '../utils/Checkcookie'
import { useNavigate } from 'react-router-dom'

export default function Edashboard() {
  const navigate = useNavigate();
  // const navigate = useNavigate();
  // const {login1,logout1,isAuthenticated1,setIsAuthenticated1} = useContext(AuthContext)
 /* useEffect(()=>{
    const verify = async()=>{
        const response = await fetch("https://backend-eventria-10.onrender.com/organizer/verify",{
            method:"POST",
            credentials:"include"
        })
        if(!response.ok){

            navigate("/organizer/login");
        }
    }
    verify();

},[])*/
  return (
    <div>
      <Navbar/>
      <div className="container">
        <EventManager/>
      </div>
    </div>
  )
}
