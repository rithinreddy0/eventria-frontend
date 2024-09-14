import React, { useEffect, useState } from 'react';

const PermissionLetter = (props) => {
    const letter = props.letter;
    const id = props.letter._id;


  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };


  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center">
        <div>
            <h1>hello</h1>
          <h2 className="text-lg font-bold text-gray-800">{letter.subject}</h2>
          <p className="text-gray-600">
            {/* Created by: {letter.createdBy.name} ({letter.createdBy.department}, Year {letter.createdBy.year}) */}
          </p>
        </div>
        <button
          onClick={toggleDetails}
          className="text-blue-500 font-semibold hover:underline"
        >
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>
      </div>

      {showDetails && (
        <div className="mt-4">
          <p className="text-gray-600"><strong>Body:</strong> {letter.body}</p>
          {/* <p className="text-gray-600"><strong>Email:</strong> {letter.createdBy.email}</p> */}
          <p className="text-gray-600"><strong>Status:</strong> {letter.status ? 'Approved' : 'Pending'}</p>

          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => props.onApprove(letter._id)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Approve
            </button>
            <button
              onClick={() => props.onDisapprove(letter._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Disapprove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PermissionLetter;
