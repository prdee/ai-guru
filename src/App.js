import React, { useCallback, useState, useEffect , useRef} from 'react';
import './App.css';
import SearchContainer from './components/searchPage/SearchContainer';
import ResultsSection from './components/searchPage/ResultsSection';
import Header from './components/searchPage/Header';
import Loading from './components/services/loader';
import { fetchSearchResults, getRecomendedVideos as fetchRecommendedVideos } from './api/search';
import LiveChatWidget from './components/chatbot/LiveChatWidget';
import { userlearningData } from './api/users';

const App = () => {
  const [results, setResults] = useState([]);
  const [searchDataLoading, setSearchDataLoading] = useState(false);
  const [searchDetailsLoading, setSearchDetailsLoading] = useState(false);
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [myLearningVideos, setMyLearningVideos] = useState([]);
  const userDetails = useRef(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videos = await fetchRecommendedVideos();
        if(userDetails.current){
          const myLearningVideos = await userlearningData(userDetails.current.uuid);
          setMyLearningVideos(myLearningVideos)
        }
        setRecommendedVideos(videos);
      } catch (error) {
        console.error('Failed to fetch recommended videos:', error);
      }
    };

    fetchVideos();
  }, [userDetails.current]);

  const handleSearch = useCallback(async (query) => {
    localStorage.setItem('search', query);
    setSearchDataLoading(true);
    try {
      const apiResults = await fetchSearchResults(query);
      setResults(apiResults);
    } catch (error) {
      console.error('Failed to fetch search results:', error);
    } finally {
      setSearchDataLoading(false);
    }
  }, []);

  return (
    <>
      {(searchDataLoading || searchDetailsLoading) && 
        <div className="position-absolute d-flex align-items-center justify-content-center bg-secondary bg-opacity-75 w-100 h-100 text-center z-1" style={{left:0, top:0}}>
          <Loading />
        </div>
      }
      <div className="container-fluid p-3">
        <div className='row' style={{height:'12vh'}}>
          <Header />
        </div>
        <section className='row' style={{height: '82vh'}}>
          <div className='row align-items-center' style={{height: '25%'}}>
            <SearchContainer onSearch={handleSearch} />
          </div>

          <div className="row position-relative justify-content-center" style={{height: '75%'}}>
            {!searchDataLoading && 
              <ResultsSection 
                results={results} 
                setSearchDetailsLoading={setSearchDetailsLoading} 
                recommendedVideos={recommendedVideos}
                myLearningVideos={myLearningVideos}
              />
            }
          </div>
        </section>
      </div>
      <LiveChatWidget/>
    </>
  );
};

export default App;