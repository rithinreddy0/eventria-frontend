import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand Name */}
          <div className="flex items-center" onClick={()=>{navigate('/organizer/dashboard')}}>
            {/* <img
              className="h-8 w-8"
              src="https://via.placeholder.com/40x40.png?text=E"
              alt="Eventria Logo"
            /> */}
            <span className="ml-3 text-xl font-bold text-indigo-600">
              Eventria
            </span>
          </div>

          {/* Links for larger screens */}
          <div className="hidden md:flex items-center space-x-4">
            <a onClick={()=>{navigate('/organizer/dashboard')}} href="#" className="text-gray-600 hover:text-indigo-600">
              Home
            </a>
            <a onClick={()=>{navigate('/organizer/validate-entry')}} className="text-gray-600 hover:text-indigo-600">
              Validate Entry
            </a>
            
          </div>

          {/* Hamburger icon for mobile screens */}
          <div className="flex items-center md:hidden">
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
              onClick={()=>{navigate('/organizer/dashboard')}}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-600"
            >
              Home
            </a>
            <a onClick={()=>{navigate('/organizer/validate-entry')}} className="text-gray-600 hover:text-indigo-600">
              Validate Entry
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
