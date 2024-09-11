import React, { useState ,useEffect} from 'react';
import StudentRollNumbers from './StudentRollNumbers';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Snavbar from './Snavabar';
const CreatePermissionLetter = () => {
    const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [department, setDepartment] = useState('');
  const [rollNumbers, setRollNumbers] = useState([]);
  useEffect(()=>{
    const verify = async()=>{
        const response = await fetch("https://backend-eventria-10.onrender.comstudent/verify",{
            method:"POST",
            credentials:"include"
        })
        console.log(response)
        if(!response.ok){

            navigate("/student/auth");
        }
    }
    verify();

},[])
  const handleSubmit = (event) => {
    event.preventDefault();
    // Process form data
    console.log({
      subject,
      body,
      department,
      rollNumbers,
    });
    create_api();
  };
  const create_api = async()=>{
    toast.loading("Submitting Request Letter");
    const reponse = await fetch("https://backend-eventria-10.onrender.comstudent/newletter",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            subject,
            body,
            department,
            members:rollNumbers
        }),
        credentials:"include"
    })
    if(!reponse.ok){
      toast.dismiss();
        toast.error("Can not Submit letter please Try Again")
        return
    }
    const letter = await reponse.json();
    toast.dismiss();
    toast.success("Request Letter Submitted");
    
  }

  return (
    <>
      <Snavbar/>
      <div className="container mx-auto p-4 mb-6">
      <Toaster/>
      <h1 className="text-2xl font-bold mb-4">Create Permission Letter</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4 space-y-4">
      <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
          <select
            id="department"
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value)
            }}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            <option value="---select Department---"></option>
            <option value="aimliot">CSE - AI ML & IOT</option>
            <option value="cys-ds"> CSE-(CyS, DS) and AI & DS </option>
            <option value="automobile">Automobile Engineering</option>
            <option value="mechanical">Mechanical Engineering</option>
            <option value="civil">Civil Engineering</option>
            <option value="ece">Electronics and Communication Engineering</option>
            <option value="eie">Electronics and Instrumentation Engineering</option>
            <option value="eee">Electrical and Electronics Engineering</option>
            <option value="cse">Computer Science and Engineering & CSBS</option>
            <option value="it">Information Technology</option>
          </select>
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium text-gray-700">Body</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows="4"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          ></textarea>
        </div>

        

        <StudentRollNumbers 
          rollNumbers={rollNumbers} 
          setRollNumbers={setRollNumbers} 
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
    </>
  );
};

export default CreatePermissionLetter;
