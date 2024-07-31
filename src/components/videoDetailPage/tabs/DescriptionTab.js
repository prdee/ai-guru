import React from 'react';

function DescriptionTab({ data }) {
  return (
    <div className="col-md-12 p-3 tab-inner-content text-gray-400">
      <h5 className="text-xl fw-bold">Description</h5>
      <div>
        {data}
      </div>  
    </div>
  );
}

export default DescriptionTab;
