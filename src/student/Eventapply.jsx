import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import Snavbar from './Snavabar';
import axios from 'axios';

const Eventapply = () => {
  const [event, setEvent] = useState(null);
  // const [loading, setLoading] = useState(true);
  const { eventId } = useParams();
  useEffect(() => {
    const fetchEvent = async () => {
      console.log("object")
      const token = localStorage.getItem("studentAuthToken")
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/student/apply/${eventId}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((data) => {
        console.log(data.data)
        setEvent(data.data.data);
        // setLoading(false);
        console.log(data.data)
      })
      .catch((error) => {
        console.error(error);
        console.error('Error fetching event:', error);
        // setLoading(false);
      }).finally(()=>{
        // setLoading(false)
      })
      
  }
  fetchEvent();
}, []);




  const handleUpdate = async () => {

      toast.loading("Updating Please wait ..")
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/student/update/${eventId}`, {
       headers:{
        Authorization: `Bearer ${localStorage.getItem("studentAuthToken")}`
       }
      })
      .then(()=>{
        toast.dismiss()
      toast.success('Event updated successfully!');
      })
      .catch((error)=>{
        if(error.status==303){
          toast.dismiss();
          toast.error("Already Applied for the event")
        }
        else{
          toast.dismiss();
          toast.error("please trry again")
        }
      })
      
      
    
  };



  // if (loading) {
  //   return <div className="text-center py-10">Loading...</div>;
  // }

  if (!event) {
    return <div className="text-center py-10">No event found.</div>;
  }

  return (
    <>
      <Snavbar/>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <Toaster/>
      <h1 className="text-3xl font-bold mb-4 text-center">{event.name}</h1>
      <p className="text-gray-700 mb-6 text-center">{event.description}</p>
      
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <p className="text-gray-500">
          <span className="font-semibold">Date:</span> {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="text-gray-500">
          <span className="font-semibold">Time:</span>{' '}
          {new Date(event.stime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
          {new Date(event.etime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      <div className='flex justify-center items-center'>
        <iframe src={event.formcode} className='w-[50vw] h-[100vh]' frameborder="0"></iframe>
      </div>
      

      <div className="text-center  mt-10">
        <p>Please click on update only after applying to the event QR will be generated</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md mt-8"
          onClick={handleUpdate}
        >
          Update for Event
        </button>
      </div>
    </div>
    </>
  );
};

export default Eventapply;
