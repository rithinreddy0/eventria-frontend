import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkCookie } from '../utils/Checkcookie';
import Loading from '../Loading'
import Snavbar from './Snavabar';
import Revents from './Revents';
import axios from 'axios';
const StudentDashboard = () => {
    const [loading,setLoading] =useState(true);
    const [showRegisteredEvents, setShowRegisteredEvents] = useState(false);
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const [studentDetails, setStudentDetails] = useState({});
    const navigate = useNavigate();
    function convertTo12HourFormat(dateTimeStr) {
        const date = new Date(dateTimeStr);
      
        // Extract hours, minutes, and AM/PM
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
      
        // Convert to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // Adjust "0" hour to "12"
      
        // Add leading zero to minutes if needed
        const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
      
        // Format date and time in MM/DD/YYYY hh:mm AM/PM format
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        const formattedTime = `${hours}:${minutesStr} ${ampm}`;
      
        return `${formattedDate} ${formattedTime}`;
      }
      
      // Example usage:
      const dateTimeStr = '2024-09-10T14:30:00';
    //   console.log(convertTo12HourFormat(dateTimeStr)); // Output: "9/10/2024 2:30 PM"
      
    useEffect(()=>{
        const verify = async()=>{
            const token = localStorage.getItem('studentAuthToken');
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/student/verify`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            .catch(()=>{
                navigate('/student/auth')
            })
        }
        verify();
        // Fetch all events
        const fetchAllEvents = async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/student/events`, {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('studentAuthToken')}`
                    }
                });
                const data = response.data
                // console.log(data);
                if(data){
                    setAllEvents(data.data);
                }
                //   console.log(data.data);
            } catch (error) {
                console.error('Error fetching all events:', error);
            }
        };
        
        // Fetch student details
        const fetchStudentDetails = async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/student/info`, {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('studentAuthToken')}`
                    }
                })
                // console.log(response.data.data)
                setStudentDetails(response.data.data)
            } catch (error) {
                console.error('Error fetching student details:', error);
            }
        };

        // fetchRegisteredEvents();
        fetchAllEvents();
        fetchStudentDetails();
            setLoading(false);  // Stop loading animation after 2 seconds
          
    }, []);
    if(loading){
        return(
            <div>
                <Loading/>
            </div>
        )
    }
    return (
        <>
        <Snavbar/>
        <div className="min-h-screen bg-gray-100 p-6">
            
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-4">Student Dashboard</h2>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold">Student Details</h3>
                    <p><strong>Name:</strong> {studentDetails.name}</p>
                    <p><strong>Roll Number:</strong> {studentDetails.rollno}</p>
                    <p><strong>Email:</strong> {studentDetails.email}</p>
                    <p><strong>Class:</strong> {studentDetails.className}</p>
                    <p><strong>Section:</strong> {studentDetails.section}</p>
                    <p><strong>Year:</strong> {studentDetails.year}</p>
                </div>

                <div className="mb-6">
                    <button
                        onClick={() => setShowRegisteredEvents(!showRegisteredEvents)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                    >
                        {showRegisteredEvents ? 'Show All Events to Apply' : 'Show Registered Events'}
                    </button>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4">
                        {showRegisteredEvents ? 'Registered Events' : 'All Events to Apply'}
                    </h3>
                    <div className="space-y-4">
                        {showRegisteredEvents && <div><Revents/></div> }
                        {!showRegisteredEvents && allEvents.map((event,index) => (
                            <div
                            
                                key={index}
                                className="p-4 bg-gray-50 border border-gray-300 rounded-lg"
                            >
                                <h4 className="text-lg font-bold">{event.name}</h4>
                                <p><strong>Date:</strong> {event.date.split("T")[0]}</p>
                                <p><strong>Time:</strong> {convertTo12HourFormat(event.stime).split(' ')[1] + " " + convertTo12HourFormat(event.stime).split(' ')[2]} - {convertTo12HourFormat(event.etime).split(' ')[1] + " " + convertTo12HourFormat(event.etime).split(' ')[2]}</p>
                                <p><strong>Description:</strong> {event.description}</p>
                                {!showRegisteredEvents && (
                                    <button
                                        className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-300"
                                        onClick={()=>navigate(`/student/apply/${event._id}`)}>
                                        Apply
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default StudentDashboard;
