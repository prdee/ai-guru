//import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { fetchVideoDetails } from '../../api/search';
import ImagePlaceholder from '../common/ImagePlaceholder';


const Topic = ({ title, setSearchDetailsLoading }) => {
    const [visibleTopics, setVisibleTopics] = useState();
    const topicWiseData = useRef([]);
    const navigate = useNavigate();
    const handleVideoClick = (video) => {
        localStorage.setItem('selectedVideo', JSON.stringify(video));
        localStorage.setItem('subTopicTitle',video.subTopics?.[0])
        navigate('/guru');
    };

    const toggleVisibility = async () => {
        setSearchDetailsLoading(true)
        let topicData = topicWiseData.current.find(topic => topic.title === title);
        if(!topicData){
            topicData =  await fetchVideoDetails(title);
            topicWiseData.current.push({title, lessonplan: topicData?.lessonplan})
        }
        localStorage.setItem('videoDetails', JSON.stringify(topicData));
        setVisibleTopics(topicData?.lessonplan)
        setSearchDetailsLoading(false)
    };

    return (
        <div className="mb-6">
            <Accordion className='mb-2 border-radius-10' style={{backgroundColor: 'rgba(255, 255, 255, 0.09)'}}>
            {/* backgroundColor: '#1d1e1f' */}
                <Accordion.Header onClick={toggleVisibility}>
                    <div className='row'>
                        <div className="fw-bold text-left">
                            {title}
                        </div>
                    </div>
                </Accordion.Header>
                <Accordion.Body className='p-3 pt-0'>
                {/* style={{ backgroundColor: '#212529' }} */}
                    {visibleTopics && visibleTopics.map((video, subIndex) => (
                        <div key={subIndex} className="col-md-12">
                             {/* p-4 */}
                            <div className="card border-0 mb-2" onClick={() => handleVideoClick(video)} style={{backgroundColor: 'transparent'}}>
                                <div className="card-body text-white p-2 border-radius-10" role="button" style={{backgroundColor: 'rgba(255, 255, 255, 0.08)'}}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <ImagePlaceholder />

                                            {/* <img
                                                src="https://placehold.co/160x90"
                                                alt={video.topic}
                                                className="img-responsive rounded"
                                            /> */}
                                        </div>
                                        <div className="col-md-8 pt-2 pb-2">
                                            <h5 className="card-title">{video.topic}</h5>
                                            <div className='overflow-hidden text-truncate text-nowrap' style={{maxHeight: '20px'}}>
                                                {video.description}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Accordion.Body>
            </Accordion>
        </div>
    );
};

export default Topic;
