import React, { useState } from "react";
import QrReader from 'react-qr-scanner'

import { useMediaQuery } from 'react-responsive';
const EventDetails = () => {
    const eventData = {
        name: "Tech Conference 2024",
        description: "An event for tech enthusiasts",
        formcode: "TC2024",
        stime: "10:00 AM",
        etime: "4:00 PM",
        date: "2024-10-01"
      };
      const [qr,setqr] = useState(null);
      const updateEvent = (updatedEvent) => {
      }
        const onScanQRCode = () => {
          };
        
    
    const studentsApplied = ["Alice Johnson", "Bob Smith", "Charlie Brown"];
    
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({ ...eventData });

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = () => {

    setEditMode(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">{editMode ? "Edit Event Details" : "Event Details"}</h2>
        <button
          onClick={() => setEditMode(!editMode)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editMode ? "Cancel" : "Edit"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {["name", "description", "formcode", "stime", "etime", "date"].map((field) => (
          <div key={field} className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
            {editMode ? (
              <input
                type="text"
                name={field}
                value={formValues[field]}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              />
            ) : (
              <p className="mt-1 p-2 block w-full bg-gray-100 border border-gray-300 rounded-md">
                {formValues[field]}
              </p>
            )}
          </div>
        ))}
      </div>

      {editMode && (
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save Changes
        </button>
      )}

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Scan QR Code to Update Attendance</h3>
        <button
          onClick={onScanQRCode}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Scan QR Code
        </button>
        <div className="mt-4">
        
        <QrReader
        onScan={(result, error) => {
          if (!!result) {
            setqr(result?.text);
          }

          if (!!error) {
            handleError(error);
          }
        }}
        // constraints={{ facingMode: 'environment' }}
        // containerStyle={{ width: '100%' }}
      />


      <p>{qr}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Students Applied</h3>
        <ul className="list-disc list-inside">
          {studentsApplied.map((student, index) => (
            <li key={index}>{student}</li>
          ))}
        </ul>
      </div> 
    </div>
  );
};

export default EventDetails;
