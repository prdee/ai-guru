import React from 'react';
import Topic from './Topic';
import { Placeholder } from 'rsuite';
//import styled from 'styled-components';
import ImagePlaceholder from '../common/ImagePlaceholder';

// const MyLearningCards = styled.div`
//   width: 100%;
//   height: 525px;
//   border-radius: 20px;
//   background: rgba(255, 255, 255, 0.1);
//   box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 20px, rgba(0, 0, 0, 0.15) 0px 4px 6px inset;
//   backdrop-filter: blur(5px);
//   margin-top: 20px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
//   color: white;
// `;

// const MyLearningScrollableSection = styled.div`
//   height: 90%;
//   overflow-y: auto;
//   scrollbar-width: thin;
//   scrollbar-color: rgba(255, 255, 255, 0.5) transparent;

//   &::-webkit-scrollbar {
//     width: 6px;
//   }

//   &::-webkit-scrollbar-track {
//     background: transparent;
//   }

//   &::-webkit-scrollbar-thumb {
//     background-color: rgba(255, 255, 255, 0.5);
//     border-radius: 3px;
//   }
// `;

// const ResultsCard = styled.div`
//   width: 90%;
//   height: 90%;
//   border-radius: 20px;
//   background: rgba(255, 255, 255, 0.1);
//   box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 20px, rgba(0, 0, 0, 0.15) 0px 4px 6px inset;
//   backdrop-filter: blur(5px);
//   margin-top: 20px;
// `;

// const RecommendedVideosCard = styled.div`
//   width: 90%;
//   height: 90%;
//   border-radius: 20px;
//   background: rgba(255, 255, 255, 0.1);
//   box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 20px, rgba(0, 0, 0, 0.15) 0px 4px 6px inset;
//   backdrop-filter: blur(5px);
//   margin-top: 20px;
//   margin-left: 60px;
//   padding: 20px;
//   color: white;
// `;

const SearchResultsSection = ({ results, setSearchDetailsLoading }) => (
    <>
        <div style={{ height: '10%' }}>
            <span className='gradient-text'>Search Results</span>
        </div>
        <div className='mh-100' style={{ height: '90%', overflowY: 'auto', scrollbarWidth: 'none' }}>
            {results.map((result, index) => (
                <Topic
                    key={index}
                    title={result.title}
                    lessonplan={result.lessonplan}
                    defaultVisible={index === 0}
                    setSearchDetailsLoading={setSearchDetailsLoading}
                />
            ))}
        </div>
    </>
);

const RecommendedVideosSection = ({ recommendedVideos, setSearchDetailsLoading }) => (
    <>
        <div style={{ height: '10%' }}>
            <span className='gradient-text'>Recommended Videos</span>
        </div>
        <div className='mh-100' style={{ height: '90%', overflowY: 'auto', scrollbarWidth: 'none' }}>
            {recommendedVideos?.length > 0 ? (
                recommendedVideos.map((video, index) => (
                    <Topic
                        key={index}
                        title={video.title}
                        lessonplan={video.lessonplan}
                        defaultVisible={index === 0}
                        setSearchDetailsLoading={setSearchDetailsLoading}
                    />
                ))
            ) : (
                <div className="h-full flex items-center justify-center">
                    <Placeholder.Paragraph rows={8} />
                </div>
            )}
        </div>
    </>
);

const MyLearningSection = ({ myLearningVideos }) => (
    <div className='mb-4 h-100'>
        <div style={{ height: '10%' }}>
            <span className='gradient-text'>My Learnings</span>
        </div>

        <div className='mh-100' style={{ height: '90%', overflowY: 'auto', scrollbarWidth: 'none' }}>
        {myLearningVideos?.length > 0 ? (
                    myLearningVideos.map((video, index) => (
                        <div className="mb-3" key={index}>
                            <div className="card-body text-white p-3 border-radius-10" role="button" style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}>
                                <div className="row">
                                    <div className="col-md-4">
                                        <ImagePlaceholder />
                                    </div>
                                    <div className="col-md-8 pt-2 pb-2">
                                        <h5 className="card-title">{video.activities}</h5>
                                        <div className='overflow-hidden text-truncate text-nowrap' style={{ maxHeight: '10px' }}>
                                            {video.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="h-full flex items-center justify-center">
                        <Placeholder.Paragraph rows={8} />
                    </div>
                )}
        </div>

        {/* <MyLearningCards>
            <MyLearningScrollableSection>
                {myLearningVideos?.length > 0 ? (
                    myLearningVideos.map((video, index) => (
                        <div className="mb-3" key={index}>
                            <div className="card-body text-white p-3 border-radius-10" role="button" style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}>
                                <div className="row">
                                    <div className="col-md-4">
                                        <ImagePlaceholder />
                                    </div>
                                    <div className="col-md-8 pt-2 pb-2">
                                        <h5 className="card-title">{video.activities}</h5>
                                        <div className='overflow-hidden text-truncate text-nowrap' style={{ maxHeight: '10px' }}>
                                            {video.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="h-full flex items-center justify-center">
                        <Placeholder.Paragraph rows={8} />
                    </div>
                )}
            </MyLearningScrollableSection>
        </MyLearningCards> */}
    </div>
);

const ResultsSection = ({ results, setSearchDetailsLoading, recommendedVideos, myLearningVideos }) => {
    const isUserLoggedIn = Boolean(localStorage.getItem('user'));

    return (
        <div className='col-md-12 h-100'>
            <div className='row h-100'>
                {isUserLoggedIn ? 
                <>
                    <div className='col-md-8 h-100'>
                        {results.length > 0 ? (
                            <div className='my-content-background h-100'>
                                <section className="col-md-12 search-results relative p-4 h-100">
                                    <SearchResultsSection
                                        results={results}
                                        setSearchDetailsLoading={setSearchDetailsLoading}
                                    />
                                </section>
                            </div>
                        ) : (
                            <div className='my-content-background h-100'>
                                <section className="col-md-12 search-results relative p-4 h-100">
                                    <RecommendedVideosSection
                                        recommendedVideos={recommendedVideos}
                                        setSearchDetailsLoading={setSearchDetailsLoading}
                                    />
                                </section>
                            </div>
                        )}
                    </div>

                    <div className='col-md-4 h-100'>
                        <div className='my-content-background h-100'>
                            <section className="col-md-12 search-results relative p-4 h-100">
                                <MyLearningSection myLearningVideos={myLearningVideos} />
                            </section>
                        </div>    
                    </div>
                </>
                :
                <>
                    <div className='col-md-8 h-100 offset-md-2'>
                        {results.length > 0 ? (
                            <div className='my-content-background h-100'>
                                <section className="col-md-12 search-results relative p-4 h-100">
                                    <SearchResultsSection
                                        results={results}
                                        setSearchDetailsLoading={setSearchDetailsLoading}
                                    />
                                </section>
                            </div>
                        ) : (
                            <div className='my-content-background h-100'>
                                <section className="col-md-12 search-results relative p-4 h-100">
                                    <RecommendedVideosSection
                                        recommendedVideos={recommendedVideos}
                                        setSearchDetailsLoading={setSearchDetailsLoading}
                                    />
                                </section>
                            </div>
                        )}
                    </div>
                </>
                }
                {/* <div className='col-md-8 h-100'>
                    {results.length > 0 ? (
                        <ResultsCard>
                            <section className="col-md-12 search-results relative p-4 h-100">
                                <SearchResultsSection
                                    results={results}
                                    setSearchDetailsLoading={setSearchDetailsLoading}
                                />
                            </section>
                        </ResultsCard>
                    ) : (
                        <RecommendedVideosCard>
                            <RecommendedVideosSection
                                recommendedVideos={recommendedVideos}
                                setSearchDetailsLoading={setSearchDetailsLoading}
                            />
                        </RecommendedVideosCard>
                    )}
                </div>
                {isUserLoggedIn && (
                    <div className='col-md-4'>
                        <MyLearningSection myLearningVideos={myLearningVideos} />
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default React.memo(ResultsSection);
