import React, { useState, useEffect, useCallback, useRef } from 'react';
import TabContainer from '../components/videoDetailPage/TabContainer';
import VideoList from '../components/videoDetailPage/VideoList';
import Board from '../components/videoDetailPage/avatar/avatar';
import { getSlidesExplanationData, topicActivity } from '../api/search';
import Header from '../components/searchPage/Header';
import './VideoDetailPage.css'; // Import CSS file for animations/transitions
import Loading from '../components/services/loader';
import { updateLearning } from '../api/users';
import LiveChatWidget from '../components/chatbot/LiveChatWidget';

function VideoDetailPage() {
  const [scenes, setScenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoDetails = useRef(JSON.parse(localStorage.getItem('videoDetails')));
  const subTopics = useRef(JSON.parse(localStorage.getItem('selectedVideo')));
  const userDetails = JSON.parse(localStorage.getItem('user'));
  const apiPayloadRef = useRef({});

  const getVideoDetails = useCallback(async () => {
    const subTopicTitle = localStorage.getItem('subTopicTitle');
    const payload = {
      topic: subTopics.current?.topic,
      activities: subTopicTitle || subTopics.current?.subTopics?.[0],
      title: videoDetails.current?.title,
    };
    apiPayloadRef.current = payload; // Update the ref with the latest payload

    try {
      const apiData = await topicActivity(payload);
      localStorage.setItem('apiData', JSON.stringify(apiData));
      const getSlidesExplanation = await getSlidesExplanationData(apiData[0]);

      setScenes(getSlidesExplanation?.[0]?.slides || getSlidesExplanation);
    } catch (error) {
      console.error('Error fetching video details:', error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  }, []);

  useEffect(() => {
    getVideoDetails();
  }, [getVideoDetails]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // event.preventDefault();
      // event.returnValue = '';
      const payload = {
        userId: userDetails?.uuid,
        video: apiPayloadRef.current
      };
      if (payload.video.topic && payload.userId) {
        updateLearning(payload)
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [userDetails?.uuid]);

  return (
    <>
      <div className="container-fluid p-3">
        <div className='row' style={{ height: '12vh' }}>
          <Header />
        </div>
        <div className="row">
          <div className="col-md-8 p-5 pt-0 pb-3" style={{ height: '82vh' }}>
            <div className="row mw-100" style={{ height: '70%' }}>
              <div className="video-list p-0 rounded animated-board mh-100" style={{ backgroundColor: 'rgba(255, 255, 255, 0.09)', border: '1px solid #333' }}>
                {loading ? (
                  <Loading />
                ) : (
                  scenes?.length > 0 && <Board scenes={scenes} />
                )}
              </div>
            </div>
            <div className="row mw-100" style={{ height: '30%' }}>
              <TabContainer />
            </div>
          </div>
          <div className="col-md-4 p-5 pt-0 pb-3 ps-0 mh-100" style={{ height: '82vh', overflowY: 'auto', scrollbarWidth: 'thin' }}>
            <VideoList lessonplan={subTopics.current} />
          </div>
        </div>
      </div>
      <LiveChatWidget />
    </>
  );
}

export default VideoDetailPage;
