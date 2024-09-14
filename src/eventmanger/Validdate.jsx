import React, { useState } from 'react';
import QRScannerComponent from './QRScanner'; // Ensure this matches the updated component name
import Navbar from './Navbar';
import toast from 'react-hot-toast';

export default function Validdate() {
  const [scan, setScan] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);

  const after_scan = (student) => {
    if (!scan && !show) {
      toast.success("Updated");
    }
    setData(student);
    setShow(!show);
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen pt-5 bg-gray-100 p-6 pt-10">
     
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl  font-semibold text-blue-600 mb-4 text-center">
          Scan the QR and validate the entry
        </h1>
        <button
          onClick={() => setScan(!scan)}
          className={`mt-7  p-2 px-4 rounded-lg text-white transition duration-300 ease-in-out ${
            scan ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {scan ? 'Stop Scanning' : 'Start Scanning'}
        </button>
        {scan && !show && <QRScannerComponent after_scan={after_scan} />}
        {scan && show && data && (
          <div className="flex flex-col items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Student Details</h2>
              <p><strong>Name:</strong> {data.name}</p>
              <p><strong>Roll Number:</strong> {data.rollno}</p>
              <p><strong>Class:</strong> {data.className}</p>
            </div>
            <button
              onClick={() => setShow(false)}
              className="p-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Scan Another
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
