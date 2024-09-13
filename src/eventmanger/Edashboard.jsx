import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import EventManager from './EventManager'

import { checkCookie } from '../utils/Checkcookie'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

export default function Edashboard() {
  const [x,logout] = useState(true);
  const navigate = useNavigate();
  // const navigate = useNavigate();
 useEffect(()=>{
    const token = localStorage.getItem('organizerAuthToken');   
      const verify = async()=>{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/organizer/verify`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        }).catch(()=>{
          navigate('/organizer/login')
        })
    }
    verify();

},[x])
  return (
    <div>
      <Navbar logout={logout} />
      <div className="container">
        <EventManager/>
      </div>
    </div>
  )
}
