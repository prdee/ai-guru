import React from 'react';

const TabButton = ({ active, onClick, label }) => {
  return (
    <button className={`tab-button px-4 py-2 ${active ? 'bg-gray-800' : 'bg-gray-700'} text-white rounded-t-lg ml-2`} onClick={onClick}>
      {label}
    </button>
  );
};

export default TabButton;
