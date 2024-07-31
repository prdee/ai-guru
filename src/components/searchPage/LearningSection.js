import React from 'react';

const LearningSection = ({ watchedVideos }) => {
    return (
        <section className="learning-section p-4 rounded-lg w-full bg-white shadow">
            <h2 className="text-2xl font-semibold mb-4">My Learning</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
                {watchedVideos.map((video, index) => (
                    <div key={index} className="p-4 bg-white rounded-lg shadow">
                        <img src={video.thumbnail} alt={video.title} className="w-full h-auto rounded-lg mb-2" />
                        <h4 className="text-lg font-medium">{video.title}</h4>
                        <p className="text-sm text-gray-600">{video?.description}</p>
                        <p className="text-sm text-gray-600">{video.duration}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LearningSection;
