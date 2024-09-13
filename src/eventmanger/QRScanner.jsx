import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import QrScanner from 'react-qr-scanner';
const QRScanner = ({after_scan}) => {
  const [qrData, setQrData] = useState(null);
  const [error, setError] = useState(null);
  const update = async (qrData)=>{
    toast.loading("Scanned .please wait...")
    const response = await fetch('https://localhost:4000/organizer/validate',{
      method: 'POST',
      credentials:'include',
      headers:{
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({qrData})
    })
    if(!response.ok){
      toast.dismiss();
      toast.error("Try Again")
      return
    }
    const data = await response.json();
    toast.dismiss();
    toast.success('Updated in data base');
    

    setQrData(null)
    after_scan(data.student);
  }
  const handleScan = (data) => {
    if (data) {
      setQrData(data.text);
      update(data.text)  // Fetch data based on the scanned QR code
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError('Error scanning the QR code.');
  };


  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (

    <>
    <Toaster/>
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-center">Scan QR Code</h1>

      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
        <QrScanner
          delay={300}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
        />
      </div>

      {qrData && (
        <div className="mt-4 p-4 bg-green-100 rounded-md w-full max-w-md text-center">
          <h2 className="text-xl font-bold">Scanned Data:</h2>
          <p>{qrData}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 rounded-md w-full max-w-md text-center">
          <p>{error}</p>
        </div>
      )}
    </div>
    </>
  );
};

export default QRScanner;
