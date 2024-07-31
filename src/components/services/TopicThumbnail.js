import React from 'react';

const TopicThumbnail = ({ topic }) => {
  const generateThumbnail = (topic) => {
    switch (topic.toLowerCase()) {
      case 'node js':
        return (
          <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="#000" />
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#FFF" fontSize="24">
              PK
            </text>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="topic-thumbnail">
      {generateThumbnail(topic)}
      <p>{topic}</p>
    </div>
  );
};

export default TopicThumbnail;
