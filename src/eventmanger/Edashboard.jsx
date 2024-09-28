import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import EventManager from './EventManager'
import loading1 from '../assets/loading.svg'
import { checkCookie } from '../utils/Checkcookie'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

export default function Edashboard() {
  const changeLoading = ()=>{
    setLoading(!loading);
  }
  const [loading,setLoading ] = useState(true);
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
          navigate('/organizer/auth')
        })
    }
    verify();

},[x])
    // if(setLoading){
    //   return <div><img src={loading1} alt="" /></div>
    // }
  return (
    <div>
      <Navbar logout={logout} />
      <div className="container">
        <EventManager setLoading={changeLoading}/>
      </div>
    </div>
  )
}
