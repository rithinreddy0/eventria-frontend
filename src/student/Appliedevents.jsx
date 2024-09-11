import React, { useEffect, useState } from 'react';

import Event from './Event';
import Snavbar from './Snavabar';

const Appliedevents = () => {
    const [events,setevent] = useState([]);
  
    useEffect(()=>{
        const response = async()=>{
            const response = await fetch('https://backend-eventria-10.onrender.comstudent/appliedevents',{
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
