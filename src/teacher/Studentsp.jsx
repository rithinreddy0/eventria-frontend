import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Tnavbar from './Tnavbar';
import Loading from '../Loading';

const Studentp = ({className ,section,year,handle}) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchEvents = async () => {
        const token= localStorage.getItem('teacherAuthToken')
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/teacher/getstudents`, {className,section,year},{
           headers:{
                Authorization: `Bearer ${token}`
           }
        })
      .then((res)=>{
        setEvents(res.data);
        setLoading(false);
      })
      .catch((error) => {
          setLoading(false)
          console.error(error);
        }); 
        console.log(events)
      }
    fetchEvents();
  }, []);

  if (loading) {
    return <div className="text-center py-10"><Loading/></div>;
  }

//   if (!events.length) {
//     return <div className="text-center py-10">No students found.</div>;
//   }

  return (
    <><Tnavbar/>
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-3">
      <button onClick={handle}  className="w-[25vw] mx-auto bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300">Check Another class</button>
      <h1 className="text-2xl font-bold mb-6 text-center">Students Participating in Events</h1>
      {events.map((event) => (
        <div key={event._id} className="mb-6 p-4 bg-gray-100 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-2">Event Name: {event.name}</h2>
          <p className="text-gray-600 mb-4">
            <span><span className="font-semibold">Date :</span>{' '}</span>
            {new Date(event.stime).toLocaleDateString([], { })}
          </p>
          <p className="text-gray-700">           
            <span className="font-semibold">Start Time:</span>{' '}
            
            {new Date(event.stime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">End Time:</span>{' '}
            {new Date(event.etime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>

          <h3 className="font-semibold mb-2">Students Attended:</h3>
          <ul className="list-disc list-inside text-gray-600">
            {event.students_attended.map((student, index) => (
              <li key={index}>Name : {student.name} Roll No: {student.rollno}</li>

            ))}
          </ul>
         
        </div>
      ))}
    </div>
    </>


  );
};

export default Studentp;
