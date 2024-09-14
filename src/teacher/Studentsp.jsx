import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Tnavbar from './Tnavbar';
import Loading from '../Loading';

const Studentp = ({ className, section, year, handle }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('teacherAuthToken');
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/teacher/getstudents`,
          { className, section, year },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEvents(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [className, section, year]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="text-center py-10">
        <h2 className="text-lg font-semibold text-gray-600">No students found.</h2>
      </div>
    );
  }

  return (
    <>
      <Tnavbar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        <div className="flex justify-center mb-6">
          <button
            onClick={handle}
            className="bg-gradient-to-r from-blue-400 to-purple-600 text-white p-3 rounded-lg hover:from-blue-500 hover:to-purple-700 transition duration-300"
          >
            Check Another Class
          </button>
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Students Participating in Events</h1>
        {events.map((event) => (
          <div key={event._id} className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Event Name: {event.name}</h2>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Date:</span>{' '}
              {new Date(event.stime).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Start Time:</span>{' '}
              {new Date(event.stime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">End Time:</span>{' '}
              {new Date(event.etime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Students Attended:</h3>
            <ul className="list-disc list-inside text-gray-600">
              {event.students_attended.map((student, index) => (
                <li key={index} className="mb-1">
                  Name: {student.name} - Roll No: {student.rollno}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default Studentp;
