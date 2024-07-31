import React, { useState, useEffect } from "react";
import { fetchVideoDetails } from "../../api/search";

const SubTopics = ({ video }) => {
    const [subTopics, setSubTopics] = useState([]);

    useEffect(() => {
        // Fetch subtopic details when `video` changes
        fetchVideoDetails(video.id)
            .then(data => {
                setSubTopics(data); // Assuming data is an array of subtopics
            })
            .catch(error => {
                console.error('Error fetching video details:', error);
            });
    }, [video.id]);

    return (
        <div className="card">
            <div className="card-body bg-dark text-white">
                <h5 className="card-title">{video.title}</h5>
                <div className="card-text">
                    {subTopics.map((subTopic, index) => (
                        <div key={index}>
                            <p>{subTopic.title}</p> {/* Display subtopic details */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubTopics;
