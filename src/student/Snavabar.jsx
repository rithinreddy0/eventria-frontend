import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import logo1 from '../assets/logo1.png'

const Snavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const logout_handle = ()=>{
    Cookies.remove("studentAuthToken");
    navigate("/student/auth");

  }

  return (
    <nav className="bg-white shadow-lg  w-[100%] mt-0 text-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-8 py-3">
        <div className="flex justify-between h-16">
          {/* Logo and Brand Name */}
          <div className="flex items-center">
            <img
              className="h-[70px] "
              src={logo1}
              alt="Eventria Logo"
            />
            <span className="ml-3 text-2xl font-bold text-indigo-600 ">
              Eventria
            </span>
          </div>

          {/* Links for larger screens */}
          <div className="hidden md:flex items-center space-x-4">
            <a onClick={()=>{navigate('/student/dashboard')}} className="text-gray-600 hover:text-indigo-600">
              Home
            </a>
            <a onClick={()=>{navigate("/student/newletter")}} className="text-gray-600 hover:text-indigo-600">
              Create new letter
            </a>
            <a
              onClick={()=>navigate("/student/appliedevents")}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-600"
            >
                Applied events
            </a>
            
            <a onClick={logout_handle}  className="text-gray-600 hover:text-indigo-600">
              Logout
            </a>
          </div>

          {/* Hamburger icon for mobile screens */}
          <div className="flex items-center md:hidden ">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
                 onClick={()=>{navigate("/student/dashboard")}}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-600"
            >
              Home
            </a>
            <a
                 onClick={()=>{navigate("/student/newletter")}}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-600"
            >
              Create New Letter
            </a>
            <a
              onClick={()=>navigate("/student/appliedevents")}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-600"
            >
                Applied events
            </a>
            <a
              onClick={logout_handle}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-600"
            >
                logout
            </a>
            
          </div>
        </div>
      )}
    </nav>
  );
};

export default Snavbar;
