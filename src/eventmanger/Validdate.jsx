import React, { useState } from 'react'
import QRScanner from './QRScanner'
import Navbar from './Navbar';
import toast from 'react-hot-toast';

export default function Validdate() {
    const [scan ,setScan ]= useState(false);
    const [student, showStudent] = useState(false)
    const[data,setdata] = useState();
    const [show,setshow] = useState(false)
    const after_scan = (student)=>{
      if(!scan&&!show){
        toast.success("Updated");
      }
        setdata(student)
        setshow(!show);

    }
  return (
    <div>
      <Navbar/>
      <div flex justify-center items-center >
      <h1 className='text-3xl text-red-600 pt-4 flex justify-center items-center '>Scan the QR and validate the entry </h1>
      <button className='mx-auto' onClick={()=>{setScan(!scan)}}>{scan? <p>Stop Scanning</p> : <p>Start Scanning</p>}</button>
      {
        (scan&&!show)&&<QRScanner after_scan={after_scan}/>
      }
      {
        
        (scan&&show)&& <div>
          <div>
           
        <div className="  flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Student Details</h2>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Roll Number:</strong> {data.rollno}</p>
            <p><strong>Class:</strong> {data.className}</p>
            
          </div>
        </div>
      
          </div>
          <button onClick={after_scan} className='p-2 bg-blue-400 rounded-lg mx-auto'>Scan Another</button></div>
      }
      
      </div>
      
    </div>
  )
}
