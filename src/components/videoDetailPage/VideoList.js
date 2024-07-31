import React from 'react';
import VideoItem from '../common/VideoItem';

function VideoList({ lessonplan }) {

  let videoDetails = lessonplan?.subTopics?.map((s) => {
    return {
      title: s
    };
  });

  const currentSubTopic = localStorage.getItem('subTopicTitle');
  // if(currentSubTopic){
  //   videoDetails = videoDetails?.filter((v)=> v.title !== currentSubTopic);
  // }
  


  const handleClick = (video) => {
    localStorage.setItem('subTopicTitle', video.title);
    window.location.reload();
  };

  return (
    <div className="col-md-12 video-list">
      <div className='row'>
        <div className='pb-2'>
          <span className='gradient-text'>Subtopics </span>
        </div>
      </div>
      <div className="">
        {videoDetails?.length > 0 ? 
          videoDetails.map((video, index) => (
            <VideoItem key={index} {...video} onClick={() => handleClick(video)} currentSubTopic={currentSubTopic} />
          ))
          :
          <div className='p-4 border-radius-10' style={{ backgroundColor: "rgba(255, 255, 255, 0.09)" }}>No Subtopic found</div>
        }
      </div>
    </div>
  );
}

export default VideoList;
