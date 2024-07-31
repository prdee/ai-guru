import React, { useState } from 'react';
import Logo from '../components/common/Logo';
import SearchBox from '../components/searchPage/SearchBox';
import SearchResults from '../components/searchPage/SearchResults';

function SearchPage() {
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    setShowResults(true);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4" style={{ backgroundColor: '#0f0f0f', color: '#e0e0e0', fontFamily: "'Orbitron', sans-serif" }}>
      <header className="w-full max-w-4xl flex justify-between items-center py-4">
        <Logo />
      </header>
      <main className={`w-full max-w-4xl flex flex-col items-center ${showResults ? 'mt-4' : 'mt-16'} transition-all duration-300`} id="main-content">
        <SearchBox onSearch={handleSearch} />
        {showResults && <SearchResults />}
      </main>
    </div>
  );
}

export default SearchPage;
