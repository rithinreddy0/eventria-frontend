import React, { useState } from 'react';

const StudentRollNumbers = ({ rollNumbers, setRollNumbers }) => {
  const [newRollNumber, setNewRollNumber] = useState('');

  const handleAddRollNumber = () => {
    if (newRollNumber && !rollNumbers.includes(newRollNumber)) {
      setRollNumbers([...rollNumbers, newRollNumber]);
      setNewRollNumber('');
    }
  };

  const handleRemoveRollNumber = (rollNumberToRemove) => {
    setRollNumbers(rollNumbers.filter(rollNumber => rollNumber !== rollNumberToRemove));
  };

  return (
    <div>
      <label htmlFor="roll-numbers" className="block text-sm font-medium text-gray-700">Student Roll Numbers</label>
      <div className="mt-1 space-y-2">
        <input
          type="text"
          id="roll-numbers"
          value={newRollNumber}
          onChange={(e) => setNewRollNumber(e.target.value)}
          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          placeholder="Enter roll number"
        />
        <button
          type="button"
          onClick={handleAddRollNumber}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Add Roll Number
        </button>
        <ul className="mt-2 space-y-1">
          {rollNumbers.map((rollNumber, index) => (
            <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md shadow-sm">
              {rollNumber}
              <button
                type="button"
                onClick={() => handleRemoveRollNumber(rollNumber)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentRollNumbers;
