import React from 'react';

function VideoContainer() {
  return (
    <div className="video-container p-4 rounded-lg mb-4" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>
      <video controls className="w-full rounded-lg">
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoContainer;
