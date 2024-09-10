import React from 'react';
import hod from '../assets/hod.jpg'
import student from '../assets/student.png'
import teacher from '../assets/teacher.jpg'
import event from '../assets/event.avif'
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 p-8">
      {/* Header */}
      <header className="text-center text-white mb-12">
        <h1 className="text-4xl font-bold">Welcome to Eventria</h1>
        <p className="mt-4 text-lg">Organize and Manage Events, Attendance, and Requests with Ease</p>
      </header>

      {/* Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" >
        {/* HOD Login */}
        <div onClick={()=>{navigate('/hod/auth')}} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition duration-300 flex justify-center items-center flex-col">
          <img 
            src={hod} 
            alt="HOD Login"
            className="w-[90%] h-32 object-cover mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">HOD </h2>
          <p>Manage and approve requests, letters, and attendance submissions from students and teachers.</p>
        </div>

        {/* Student Login */}
        <div onClick={()=>{navigate('/student/auth')}}  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition duration-300 flex justify-center items-center flex-col">
          <img 
            src={student}
            alt="Student Login"
            className="w-[40%] object-cover mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">Student </h2>
          <p>View and apply for events, submit letters to HOD, and check attendance status.</p>
        </div>

        {/* Teacher Login */}
        <div onClick={()=>{navigate('/teacher/auth')}}  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition duration-300 flex justify-center items-center flex-col">
          <img 
            src={teacher}
            alt="Teacher Login"
            className="w-[80%] object-cover mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">Teacher </h2>
          <p>Manage event attendance, submit letters, and oversee student participation in events.</p>
        </div>

        {/* Event Organizer Login */}
        <div onClick={()=>{navigate('/organizer/login')}}  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition duration-300 flex justify-center items-center flex-col">
          <img 
            src={event} 
            alt="Event Organizer Login"
            className="w-full h-32 object-cover mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">Event Organizer</h2>
          <p>Organize and create events, manage attendance, and communicate with participants.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-white mt-12">
        <p>© 2024 Eventria. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
