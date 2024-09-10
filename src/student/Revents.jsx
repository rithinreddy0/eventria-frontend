import React from 'react'
import { useState ,useEffect } from 'react';
import Event from './Event';
export default function Revents() {
    const [events,setevent] = useState([]);
  
    useEffect(()=>{
        const response = async()=>{
            const response = await fetch('https://backend-eventria-10.onrender.com/student/appliedevents',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    },
                    credentials:'include',
            });
            const data = await response.json();
            setevent(data.data)
            // console.log(data.data)
        }
        response();
    },[])
  return (
    <div className="container mx-auto p-4 ">
      <h2 className="text-xl font-semibold mb-4 text-center">Regestered Events Events</h2>
      <div className="flex flex-col">
        {events && (
          events.map((event,index)=>{
            return <Event key={index} event={event}/>
          })
        )}
      </div>
    </div>
  )
}
