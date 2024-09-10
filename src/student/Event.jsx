import React from 'react'
import { useState } from 'react';
import Qrgenerate from './Qrgenerate'
export default function Event({event}) {
    const [showQRCode, setShowQRCode] = useState(null);
    const handleQRCodeToggle = (eventId) => {
        setShowQRCode(showQRCode === eventId ? null : eventId);
      };
  return (
    <div>
      <div
            key={event.id}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <h3 className="text-xl font-semibold mb-2">{event.eventId.name}</h3>
            <p className="text-gray-600 mb-4">{event.eventId.description}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
              onClick={() => handleQRCodeToggle(event.id)}
            >
              {showQRCode === event.id ? 'Hide QR Code' : 'Show QR Code'}
            </button>
            {showQRCode === event.id && (
                <div className=''><Qrgenerate value={event.token}/></div>
            )}
          </div>
    </div>
  )
}
