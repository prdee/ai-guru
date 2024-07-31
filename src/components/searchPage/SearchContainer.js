import React, { useRef } from 'react';
const SearchContainer = ({ onSearch }) => {
    const query = useRef("");

    const handleInputChange = (event) => {
        query.current = event.target.value;
    };

    const handleSearchClick = (e) => {
        e.preventDefault();
        if(query.current){
            onSearch(query.current);
        }
    };
    return (
        <>
        {/* <div className="relative w-1/2 mb-16" id="search-container">
            <input type="text" value={query} onChange={handleInputChange} className="search-box w-full p-3 rounded-full text-lg text-white" placeholder="Search..." id="search-input" />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-2xl" onClick={handleSearchClick}>
                <i className="fas fa-search"></i>
            </button>
        </div> */}
        <div className='col-md-6 offset-md-3'>
            <div className='position-relative' id='search-container'>
                <form onSubmit={handleSearchClick}>
                    <input type="text" onChange={handleInputChange} autoComplete='off' className="search-box form-control py-3 px-5 text-lg text-white border-0" placeholder="What you want to learn today..." id="search-input" />
                    <span className="search-icon position-absolute" style={{left: '1rem', top: '50%'}}>
                        <i className="fas fa-search"></i>
                    </span>
                </form>    
            </div>
        </div>
        </>
    );
};

export default React.memo(SearchContainer);
