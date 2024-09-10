import React, { useState } from 'react';
import Studentp from './Studentsp';

const classOptions = {
  '1st Year': ["IOT",'AIML','AIDS','DS','CYS','ECE','CSE','EEE','AUT','MECH','CIVIL'],
  '2nd Year': ["IOT",'AIML','AIDS','DS','CYS','ECE','CSE','EEE','AUT','MECH','CIVIL'],
  '3rd Year': ["IOT",'AIML','AIDS','DS','CYS','ECE','CSE','EEE','AUT','MECH','CIVIL'],
  '4th Year': ["IOT",'AIML','AIDS','DS','CYS','ECE','CSE','EEE','AUT','MECH','CIVIL'],
};

const sectionOptions = ['A', 'B', 'C' ,'D'];

const ClassSelector = () => {
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const yearOptions = Object.keys(classOptions);

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setSelectedClass(''); // Reset class and section when year changes
    setSelectedSection('');
  };

  const handleClassSelect = (className) => {
    setSelectedClass(className);
    setSelectedSection(''); // Reset section when class changes
  };

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
    // console.log(`Selected Year:${selectedYear.charAt(0)}, Class: ${selectedClass}, Section: ${selectedSection}`)
    
    console.log(selectedClass,selectedSection,selectedYear)
  };
  if(selectedYear && selectedClass && selectedSection ){
     return <div>
      <Studentp className={selectedClass.toLowerCase()} section={selectedSection} year={selectedYear.charAt(0)}/>
     </div>
  }
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className='text-3xl font-bold mb-5'>Get all the Deatils of Permmison and Event Participation </h1>
      <h1 className="text-xl font-bold mb-6">Select Year</h1>

      {/* Year selection grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {yearOptions.map((year, index) => (
          <button
            key={index}
            onClick={() => handleYearSelect(year)}
            className={`p-4 border rounded-lg 
              ${selectedYear === year ? 'bg-blue-500 text-white' : 'bg-gray-200'}
              hover:bg-blue-300 transition`}
          >
            {year}
          </button>
        ))} 
      </div>

      {selectedYear && (
        <>
          <h2 className="text-lg font-semibold mb-4">Select Class for {selectedYear}</h2>

          {/* Class selection grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {classOptions[selectedYear].map((className, index) => (
              <button
                key={index}
                onClick={() => handleClassSelect(className)}
                className={`p-4 border rounded-lg 
                  ${selectedClass === className ? 'bg-green-500 text-white' : 'bg-gray-200'}
                  hover:bg-green-300 transition`}
              >
                {className}
              </button>
            ))}
          </div>
        </>
      )}

      {selectedClass && (
        <>
          <h3 className="text-lg font-semibold mb-4">Select Section for {selectedClass}</h3>

          {/* Section selection grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {sectionOptions.map((section, index) => (
              <button
                key={index}
                onClick={() => handleSectionSelect(section)}
                className={`p-4 border rounded-lg 
                  ${selectedSection === section ? 'bg-yellow-500 text-white' : 'bg-gray-200'}
                  hover:bg-yellow-300 transition`}
              >
                Section {section}
              </button>
            ))}
          </div>
        </>
      )}

      
    </div>
  );
};

export default ClassSelector;
