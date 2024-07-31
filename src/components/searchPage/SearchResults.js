import React from 'react';
import Topic from './Topic';

function SearchResults() {
  return (
    <section className="search-results p-4 rounded-lg w-full" id="results-section" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>
      <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
      <Topic title="Topic 1" topicId="topic1" videos={[
        { title: "Video Title 1", description: "Video description 1", duration: "3:45", thumbnail: "https://placehold.co/160x90" },
        { title: "Video Title 2", description: "Video description 2", duration: "4:20", thumbnail: "https://placehold.co/160x90" }
      ]} />
      <Topic title="Topic 2" topicId="topic2" videos={[
        { title: "Video Title 3", description: "Video description 3", duration: "5:10", thumbnail: "https://placehold.co/160x90" },
        { title: "Video Title 4", description: "Video description 4", duration: "2:30", thumbnail: "https://placehold.co/160x90" }
      ]} />
    </section>
  );
}

export default SearchResults;
