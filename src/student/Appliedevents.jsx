import React, { useEffect, useState } from 'react';

import Event from './Event';
import Snavbar from './Snavabar';
import axios from 'axios';

const Appliedevents = () => {
    const [events,setevent] = useState([]);
  
    useEffect(()=>{
      const token = localStorage.getItem('studentAuthToken')
        const response = async()=>{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/student/appliedevents`,{
                headers:{
                  Authorization:`Bearer ${token}`
                }
            })
            .then((data)=>{
              setevent(data.data.data)
            })
            
            // console.log(data.data)
        }
        response();
    },[])

  // if(events.length>=0){
  //   return(
  //     <div>
  //       <h2 className="text-2xl font-bold mb-4 text-center">Applied Events</h2>
  //       <h4>No Applied Events</h4>

  //     </div>
  //   )
  // }

  return (
    <>
      <Snavbar/>
      <div className="container mx-auto p-4 mt-5">
      <h2 className="text-2xl font-bold mb-4 text-center">Applied Events</h2>
      <div className="flex flex-col">
        {events && (
          events.map((event,index)=>{
            return <Event key={index} event={event}/>
          })
        )}
      </div>
    </div>
    </>
  );
};

export default Appliedevents;
