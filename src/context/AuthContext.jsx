// src/context/AuthContext.js

import React, { createContext, useState } from 'react';


// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated1  , setIsAuthenticated1] = useState(false);
  const [isAuthenticated2  , setIsAuthenticated2] = useState(false);
  const [isAuthenticated3  , setIsAuthenticated3] = useState(false);
 

  // Function to log in
  const login1 = () => {
    setIsAuthenticated1(true);
  
    }
  const logout1 = () => {
    setIsAuthenticated1(false);

     }
  const login2 = () => {
    setIsAuthenticated2(true);
    }
  const logout2 = () => {
    setIsAuthenticated2(false);
    }
  const login3 = () => {
    setIsAuthenticated3(true);
    }
  const logout3 = () => {
    setIsAuthenticated3(false);
  }


  return (
    <AuthContext.Provider value={{ isAuthenticated1,isAuthenticated2,isAuthenticated3,setIsAuthenticated1,setIsAuthenticated2,setIsAuthenticated3,login1,login2,login3,logout1,logout2,logout3 }}>
      {children}
    </AuthContext.Provider>
  );
};
