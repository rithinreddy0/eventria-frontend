// src/EventManager.js
import React, { useEffect, useState } from "react";
import { Await, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const   EventManager = () => {
  const navigate = useNavigate();
    const [id,setId] = useState();
    const [name,setname] = useState("");
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [formcode,setFormcode] = useState("");
    const [image,setImage] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const token = localStorage.getItem('organizerAuthToken');
    const [events,setEvents] = useState([]);
    const currentDate = new Date();
      const upcomingEvents = events.filter(event => new Date(event.stime) > currentDate  && new Date(event.etime)>currentDate);
      const ongoingEvents = events.filter(event => new Date(event.stime) <= currentDate && new Date(event.etime) >= currentDate);
      const completedEvents = events.filter(event => new Date(event.etime) < currentDate);
    useEffect(()=>{
        all_events(); 
        console.log(token)
    },[showForm]);

    const onclick_handle = (id)=>{
      navigate(`/organizer/event/${id}`)
    }
    const all_events = async()=>{
      console.log(`${import.meta.env.VITE_URL}/organizer/getallevents`)
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/organizer/getallevents`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('organizerAuthToken')}`
        }
      })
      
      const data = response.data
      console.log(data)
      setname(data.name);
      setId(data.id)
      if(data.data){
        setEvents(data.data);
      }   
    }
//   const [events, setEvents] = useState([]);


  const handleAddEvent = () => {
    if (eventName && eventDate && startTime && endTime) {
      const startDateTime = new Date(`${eventDate}T${startTime}`);
      const endDateTime = new Date(`${eventDate}T${endTime}`);
      const newEvent = { name: eventName,description:eventDescription,date:eventDate, stime: startDateTime, etime: endDateTime,formcode,id:id,image };
      console.log(newEvent)
      api_call(newEvent);
      // setEventName("");
      // setEventDate("");
      // setStartTime("");
      // setEndTime("");
      setShowForm(false);
      const currentDate = new Date();
      const upcomingEvents = events.filter(event => new Date(event.stime) > currentDate  && new Date(event.etime)>currentDate);
      const ongoingEvents = events.filter(event => new Date(event.stime) <= currentDate && new Date(event.etime) >= currentDate);
      const completedEvents = events.filter(event => new Date(event.etime) < currentDate);
    }
  };
  const api_call = async(event)=>{
        
        const token = localStorage.getItem('organizerAuthToken');
        // console.log(token)
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/organizer/createevent`,event)
        .then(()=>{
          toast.success("New event Created");
        })
  }

  

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Toaster/>
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">{name}</h2>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {showForm ? "Close" : "Create New Event"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Event Description"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              value={formcode}
              placeholder="Enter src code"
              onChange={(e) => setFormcode(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="time"
              value={startTime}
              placeholder="Start Time"
              onChange={(e) => setStartTime(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <label htmlFor="file" onChange={(e)=>{setImage(e.target.files[0]);console.log(image)}}>Upload Image of Event</label>
          <input name="file" type="file" className="px-4 py-2  focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleAddEvent}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Add Event
            </button>
          </div>
        </div>
      )}
           <div>
            
              {ongoingEvents.length > 0 && (
                <div>
                  <h4 className="text-xl font-medium text-blue-500">Ongoing Events</h4>
                  <ul className="space-y-2">
                    {upcomingEvents.map((event, index) => (
                      <div onClick={()=>{onclick_handle(event._id)}}>
                        <li key={event._id} className="p-4 bg-blue-100 rounded-md shadow-md">
                        <p className="font-medium">{event.name}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(event.date).toLocaleDateString()} from {new Date(event.stime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
                          to {new Date(event.etime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-sm text-gray-500">{event.description}</p>
                      </li>
                      </div>
                    ))}
                  </ul>
                </div>
              )}
            
           </div>
           <div>
            {upcomingEvents.length > 0 && (
              <div>
                <h4 className="text-xl font-medium text-blue-500">Upcoming Events</h4>
                <ul className="space-y-2">
                  {upcomingEvents.map((event, index) => (
                     <div onClick={()=>{onclick_handle(event._id)}}>
                    <li key={event._id} className="p-4 bg-blue-100 rounded-md shadow-md">
                      <p className="font-medium">{event.name}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(event.date).toLocaleDateString()} from {new Date(event.stime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
                        to {new Date(event.etime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="text-sm text-gray-500">{event.description}</p>
                    </li>
                    </div>
                  ))}
                </ul>
              </div>
            )}
            </div>

            {ongoingEvents.length === 0 && upcomingEvents.length === 0 && (
              <p className="text-gray-500">No upcoming or ongoing events.</p>
            )}
          
        

        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-600">Completed Events</h3>
          {completedEvents.length > 0 ? (
            <ul className="space-y-2">
              {completedEvents.map((event, index) => (
                 <div onClick={()=>{onclick_handle(event._id)}}>
                <li key={event._id} className="p-4 bg-gray-100 rounded-md shadow-md">
                  <p className="font-medium">{event.name}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(event.date).toLocaleDateString()} from {new Date(event.stime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
                    to {new Date(event.etime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="text-sm text-gray-500">{event.description}</p>
                </li>
                </div>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No completed events.</p>
          )}
        </div>
      


      
    </div>
  );
};

export default EventManager;
