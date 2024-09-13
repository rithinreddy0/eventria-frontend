import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PermissionLetter from './PermissionLetter';

const AdminDashboard = () => {
  const [letters, setLetters] = useState([]);
    const navigate = useNavigate();
  const [v,setv] = useState("");
    const verify = async()=>{
        const response = await fetch("https://localhost:4000/hod/getallletters",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
            credentials:'include'
        })
        if(!response.ok){
            navigate("/hod/auth")
        }
        const data = await response.json();
        setLetters(data.data)
    }
    const onApprove = async(id)=>{
      
      const response = await fetch("https://localhost:4000/hod/approve",{
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({id:id}),
          credentials:'include'
      })
      if(!response.ok){
      }
      else{
          setv("hello");
      }
    }
    const onDisapprove = async(id)=>{
      const response = await fetch("https://localhost:4000/hod/disapprove",{
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          credentials:'include',
          body: JSON.stringify({id:id})
      })
      if(!response.ok){
      }
      else{
          setv('hh');
      }
    }
    useEffect(()=>{
      verify();
   },[v])


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {letters.map((letter)=><PermissionLetter 
        letter={letter}   
        onApprove={onApprove}
        onDisapprove={onDisapprove}
      />)}
      
    </div>
  );
};

export default AdminDashboard;
