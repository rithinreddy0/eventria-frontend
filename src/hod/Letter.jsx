import React, { useEffect, useState } from 'react';
import Hnavbar from './Hnavbar';

const Letter = (props) => {
    const letter = props.letter;
    const id = props.letter._id;
    




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
    </div>
    </div>

  );
};

export default Letter;
