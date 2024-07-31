import React from 'react';
import ImagePlaceholder from './ImagePlaceholder';

function VideoItem({ title, description, onClick, currentSubTopic }) {
  return (
    <div 
      className="col-md-12 mb-4 border-radius-10" 
      style={title === currentSubTopic 
        ? { backgroundImage: 'linear-gradient(90deg, #57b9ff52, #e673d96e)' } 
        : { backgroundColor: 'rgba(255, 255, 255, 0.09)' }}     
      role='button' 
      onClick={onClick}
    >
      <div className='row p-2'>
        <div className='col-md-6'>
          <ImagePlaceholder />
        </div>
        <div className='col-md-6' style={{ wordBreak: 'break-all' }}>
          <h6 className="fw-bold">{title}</h6>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(VideoItem);
