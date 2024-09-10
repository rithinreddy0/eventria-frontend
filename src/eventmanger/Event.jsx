import { data } from 'autoprefixer';
import React, { useState ,useEffect } from 'react'
import { useParams } from 'react-router-dom';
export default function Event() {
    const [event,setevent] = useState({});
    const { eventId } = useParams();
    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`https://backend-eventria-10.onrender.com/organizer/event/${eventId}`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        },
                    credentials:"include"
                });
                const data = await response.json();
                setevent(data.data[0]);
            } catch (error) {
                console.error('Error fetching event details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEventDetails();
    }, [eventId]);
    return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-4">
            <h1 className="text-3xl font-bold">{event.name}</h1>
            <p className="text-lg text-gray-700">Date: {event.date}</p>
            <p className="text-lg text-gray-700">Start Time: {event.startTime}</p>
            <p className="text-lg text-gray-700">End Time: {event.endTime}</p>
    <p className="text-lg text-gray-700">Description: {event.description}</p>
    {/* <button
        onClick={() => setShowStudents(!showStudents)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
        {showStudents ? 'Hide Students' : 'Show Students'}
    </button>
    {showStudents && (
        <ul className="mt-4 list-disc list-inside space-y-2">
            {event.studentsApplied.map((student, index) => (
                <li key={index} className="text-gray-700">{student}</li>
            ))}
        </ul>
    )} */}
    </div>
  )
}
