import React from 'react';

function TabContent({ activeTab }) {
  return (
    <>
      {activeTab === 'description' && (
        <div className="tab-content p-4 rounded-lg" id="description" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>
          <h3 className="text-xl font-semibold mb-2">Video Description</h3>
          <p className="text-gray-400">This is a detailed description of the video content. It provides an overview of what the video covers and any additional information that might be useful to the viewer.</p>
        </div>
      )}
      {activeTab === 'notes' && (
        <div className="tab-content p-4 rounded-lg" id="notes" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>
          <h3 className="text-xl font-semibold mb-2">Notes</h3>
          <p className="text-gray-400">These are the notes for the video. They include important points and key takeaways from the video content.</p>
        </div>
      )}
      {activeTab === 'recommendations' && (
        <div className="tab-content p-4 rounded-lg" id="recommendations" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>
          <h3 className="text-xl font-semibold mb-2">Recommendations</h3>
          <p className="text-gray-400">These are the recommendations based on the current video. They suggest other videos or content that might be of interest to the viewer.</p>
        </div>
      )}
    </>
  );
}

export default TabContent;
