import React from 'react';

const DangerAlert = ({ onClose }) => {
  const baseStyles = "flex items-center p-4 rounded-md shadow-md max-w-sm mx-auto mt-4 text-sm";
  
  const dangerStyles = "bg-red-100 text-red-800 border border-red-400";

  return (
    <div className={`${baseStyles} ${dangerStyles}`}>
      <div className="flex-1">
        
        ThresHold Breach Detected! Immediate action required.
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-gray-600 hover:text-gray-800"
      >
        &times;
      </button>
    </div>
  );
};

export default DangerAlert;  
