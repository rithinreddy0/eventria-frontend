import React, { useEffect, useState } from 'react';
import QRScanner from './QRScanner'
import { useNavigate, useParams } from 'react-router-dom';
export default function Fullevent() {
    const navigate = useNavigate();
    const {eventId} = useParams();
    const [show,setshow] = useState(false);
    // eventId = "66db4342a35add438e55c378"
    useEffect(()=>{
        getandverify();
    },[])
    const getandverify = async ()=>{
        const response = await fetch(`https://localhost:4000/organizer/event/${eventId}`,{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json",
            },
        })
        if(!response.ok){
            // return navigate(-1);
        }
        const data = await response.json();
       

    }
  return (
    <div>
      <button onClick={()=>setshow(!show)}>Scan QR and Verify entry</button>
      {show&&<QRScanner/>}
    </div>
  )
}
