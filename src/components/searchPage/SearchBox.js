import React from 'react';

function SearchBox({ onSearch }) {
  return (
    <div className="relative w-1/2 mb-16" id="search-container">
      <input type="text" className="search-box w-full p-3 rounded-full text-lg text-white" placeholder="Search..." id="search-input" style={{ backgroundColor: '#1f1f1f', border: '2px solid #3f3f3f' }} />
      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-2xl" onClick={onSearch}>
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
}

export default SearchBox;
