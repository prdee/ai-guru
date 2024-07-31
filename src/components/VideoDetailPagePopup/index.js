import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import jsPDF from 'jspdf';
import './index.css';
import { getPdfData, getSuggestionData } from '../../api/search';
import Loading from '../services/loader';
import TestPopup from '../test_popup';
import ImagePlaceholder from '../common/ImagePlaceholder';

const VideoDetailPagePopup = ({ onClose }) => {
    const [suggestionData, setSuggestionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(true);
    const [downloadStatus, setDownloadStatus] = useState('idle');
    const [isTestOpen, setIsTestOpen] = useState(false);
    const subTopicTitle = localStorage.getItem('subTopicTitle');
    const notesData = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSuggestionData(subTopicTitle);
                setSuggestionData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [subTopicTitle]);

    const generatePDF = (elementHTML, title) => {
        return new Promise((resolve, reject) => {
            const doc = new jsPDF();
            doc.html(elementHTML, {
                callback: function (doc) {
                    try {
                        doc.save(title + '.pdf');
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                },
                margin: [10, 10, 10, 10],
                autoPaging: 'text',
                x: 0,
                y: 0,
                width: 190,
                windowWidth: 675
            });
        });
    }

    const downloadPDF = async () => {
        setDownloadStatus('downloading');
        try {
            if (!notesData.current) {
                const apiData = JSON.parse(localStorage.getItem('apiData'));
                if (apiData) {
                    const getPdfDataFromAPi = await getPdfData(apiData?.[0]);
                    notesData.current = getPdfDataFromAPi[0];
                }
            }
            if (!notesData.current.content) {
                throw new Error('No content available');
            }

            const htmlContent = notesData.current.content;
            const element = document.createElement('div');
            element.innerHTML = htmlContent;
            element.style.color = '#000000';

            await generatePDF(element, notesData.current?.title);
            setDownloadStatus('success');
        } catch (error) {
            console.error("Error downloading PDF:", error);
            setDownloadStatus('error');
        }
    };

    // const handleTopicClick = (topic) => {
    //     localStorage.setItem('subTopicTitle', topic);
    //     window.location.reload();
    // };

    const handleClose = () => {
        setShow(false);
        if (onClose) onClose();
    };

    const openTestPopup = () => {
        setShow(false);
        setIsTestOpen(true);
    };

    const closeTestPopup = () => {
        setIsTestOpen(false);
    };

    const nextVideoClick = () => {
        console.log("Next video clicked!");
    };

    const handleClick = (title) => {
        localStorage.setItem('subTopicTitle', title);
        window.location.reload();
    };

    return (
        <>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={handleClose}
                className="popup"
            >
                <Modal.Header closeButton className='border-0 pt-1 pb-2'>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span className='gradient-text'>Recommended Videos</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='pt-0 border-0 position-relative'>
                    {loading && (
                        <div className="position-absolute d-flex align-items-center justify-content-center bg-secondary bg-opacity-75 w-100 h-100 text-center z-1" style={{ left: 0, top: 0 }}>
                            <Loading />
                        </div>
                    )}

                    {!loading && (
                        <>
                            <div className='row'>
                                {suggestionData?.youTubeUrls?.map((url, key) => (
                                    <div className='col-md-6 pb-3' key={key}>
                                        <iframe
                                            width="100%"
                                            height="315"
                                            src={`https://www.youtube.com/embed/${url.split('v=')[1]}`}
                                            title={`YouTube video ${key + 1}`}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                ))}
                            </div>

                            <div className='pt-4'>
                                <div className='row pb-2'>
                                    <div>
                                        <span className='gradient-text'>Releated Topics</span>
                                    </div>
                                </div>
                                <div className="row">
                                    {suggestionData?.Recommended_Topics?.length > 0 ? (
                                        suggestionData.Recommended_Topics.map((data, index) => (
                                            <div className='col-md-6 pb-3' key={index} role='button' onClick={() => handleClick(data?.topic)}>
                                                <div className='row p-2'>
                                                    <div className='recommended-videos d-flex p-2' style={{ backgroundColor: 'rgba(255, 255, 255, 0.09)', borderRadius: '20px'}}>
                                                        <div className='col-md-6 p-2'>
                                                            <ImagePlaceholder />
                                                        </div>
                                                        <div className='col-md-6 p-2'> {data?.topic} </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className='col-12'>
                                            <div className='p-4 border-radius-10' style={{ backgroundColor: "rgba(255, 255, 255, 0.09)" }}>No Recommended Topics found</div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className='pt-4'>
                                <div className='row pb-2'>
                                    <div>
                                        <span className='gradient-text'>Official Documentation</span>
                                    </div>
                                </div>
                                <div className='row'>
                                    {suggestionData?.offical_documentation_urls?.length > 0 ? (
                                        suggestionData.offical_documentation_urls.map((doc, key) => (
                                            <div className='col-md-12 mb-2' key={key}>
                                                <a
                                                    href={doc.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-outline-light btn-block text-start"
                                                >
                                                    <i className="fas fa-external-link-alt me-2"></i>
                                                    {doc.description}
                                                </a>
                                            </div>
                                        ))
                                    ) : (
                                        <div className='col-md-12'>
                                            <div className='p-3 border-radius-10' style={{ backgroundColor: "rgba(255, 255, 255, 0.09)" }}>
                                                No official documentation links available
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className='row pt-3'>
                                <div className='col-md-6'>
                                    <button
                                        className='btn download-notes-btn border-0'
                                        onClick={downloadPDF}
                                        disabled={downloadStatus === 'downloading'}
                                    >
                                        {downloadStatus === 'idle' && (
                                            <>Notes &nbsp;<i className="fas fa-download"></i></>
                                        )}
                                        {downloadStatus === 'downloading' && (
                                            <>Downloading... &nbsp;<i className="fas fa-spinner fa-spin"></i></>
                                        )}
                                        {downloadStatus === 'success' && (
                                            <>Downloaded &nbsp;<i className="fas fa-check-circle text-success"></i></>
                                        )}
                                        {downloadStatus === 'error' && (
                                            <>Retry Download &nbsp;<i className="fas fa-exclamation-circle text-danger"></i></>
                                        )}
                                    </button>
                                </div>
                                <div className='col-md-3'>
                                    <button
                                        className='btn replay-btn border-0'
                                        onClick={openTestPopup}
                                    >
                                        Attempt Quiz &nbsp;
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>
                                </div>
                                <div className='col-md-3 text-end'>
                                    <button
                                        className='btn next-video-btn border-0'
                                        onClick={nextVideoClick}
                                    >
                                        Next Video &nbsp;
                                        <i className="fas fa-fast-forward"></i>
                                    </button>
                                </div>
                                {/* <div className='col-md-6'>
                                    <div className='row'>
                                        <button
                                            className='btn replay-btn border-0'
                                            onClick={openTestPopup}
                                        >
                                            Take a Test &nbsp;
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <div className='col-md-7'>
                                            <button
                                                className='btn next-video-btn border-0'
                                                onClick={nextVideoClick}
                                            >
                                                Next Video &nbsp;
                                                <i className="fas fa-fast-forward"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div> */}

                            </div>
                        </>
                    )}
                </Modal.Body>
            </Modal>

            <TestPopup isOpen={isTestOpen} onClose={closeTestPopup} />
        </>
    );
}

export default VideoDetailPagePopup;
