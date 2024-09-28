

import React, { useDebugValue, useEffect, useState } from 'react';
import hod from '../assets/hod.jpg';
import student from '../assets/student.png';
import teacher from '../assets/teacher.jpg';
import event from '../assets/event.avif';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';

const HomePage = () => {
  const [loading,setLoading] =useState(true)
  const navigate = useNavigate();
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },1000);
  })
  if(loading){
    return (
      <div className='pt-8'>
        <Loading />
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 p-8">
      {/* Header */}
      <header className="text-center text-white mb-12 animate-fade-in-down">
        <h1 className="text-5xl font-extrabold tracking-wider">Welcome to Eventria</h1>
        <p className="mt-4 text-xl animate-pulse">Organize and Manage Events, Attendance, and Requests with Ease</p>
      </header>

      {/* Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* HOD Login */}
        <div onClick={() => navigate('/hod/auth')} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition duration-500 ease-in-out transform flex justify-center items-center flex-col">
          <img 
            src={hod} 
            alt="HOD Login"
            className="w-[90%] h-32 object-cover mb-4 rounded-lg transition-transform duration-300 hover:rotate-3"
          />
          <h2 className="text-xl font-semibold mb-2 text-blue-900">HOD </h2>
          <p className="text-center text-gray-600">Manage and approve requests, letters, and attendance submissions.</p>
        </div>

        {/* Student Login */}
        <div onClick={() => navigate('/student/auth')} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition duration-500 ease-in-out transform flex justify-center items-center flex-col">
          <img 
            src={student}
            alt="Student Login"
            className="w-[40%] object-cover mb-4 rounded-full transition-transform duration-300 hover:rotate-3"
          />
          <h2 className="text-xl font-semibold mb-2 text-blue-900">Student </h2>
          <p className="text-center text-gray-600">View and apply for events, submit letters, and check attendance status.</p>
        </div>

        {/* Teacher Login */}
        <div onClick={() => navigate('/teacher/auth')} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition duration-500 ease-in-out transform flex justify-center items-center flex-col">
          <img 
            src={teacher}
            alt="Teacher Login"
            className="w-[80%] object-cover mb-4 rounded-lg transition-transform duration-300 hover:rotate-3"
          />
          <h2 className="text-xl font-semibold mb-2 text-blue-900">Teacher </h2>
          <p className="text-center text-gray-600">Manage event attendance and oversee student participation.</p>
        </div>

        {/* Event Organizer Login */}
        <div onClick={() => navigate('/organizer/auth')} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition duration-500 ease-in-out transform flex justify-center items-center flex-col">
          <img 
            src={event} 
            alt="Event Organizer Login"
            className="w-full h-32 object-cover mb-4 rounded-lg transition-transform duration-300 hover:rotate-3"
          />
          <h2 className="text-xl font-semibold mb-2 text-blue-900">Event Organizer</h2>
          <p className="text-center text-gray-600">Organize events, manage attendance, and communicate with participants.</p>
        </div>
      </div>
      

      {/* Footer */}
      <footer className="text-center text-white mt-12 animate-fade-in-up">
        <p className="tracking-wide">&copy; 2024 Eventria. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
