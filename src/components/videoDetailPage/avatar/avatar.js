import React, { useRef, useState, useEffect } from 'react';
import TextAnimationWithBoard from './TextAnimationWithBoard';
import TextToSpeech from '../audio/audio';
import { ALIGNMENTS, BOARD_TEXT_ALIGNMENTS } from '../../../constants';
//import { getSlidesExampleData } from '../../../api/search';
import VideoDetailPagePopup from '../../VideoDetailPagePopup';
import './avatar.css';

const Board = ({ scenes }) => {
  const astronautRef = useRef(null);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const audioRef = useRef(new Audio());
  const [videoCompleted, setVideoCompleted] = useState(false);
  const updateVideoCompleted = (value) => {
    setVideoCompleted(value);
  };
  useEffect(() => {
    window.updateVideoCompleted = updateVideoCompleted;
    return () => {
      delete window.updateVideoCompleted;
    };
  }, []);

  useEffect(() => {
    const randomMusic = Math.floor(Math.random() * 10) + 1;
    const backgroundMusic = require(`../../../assests/audio/${randomMusic}.mp3`);
    const audio = audioRef.current;
    audio.src = backgroundMusic;
    audio.loop = true;
    audio.volume = 0.05;
    audio.play().catch(error => {
      console.error('Auto-play failed:', error);
    });

    return () => {
      audio.pause();
    };
  }, []);
  const handleSpeechEnd = () => {
    // if (currentSceneIndex === Math.floor(scenes.length / 2)) {
    //   fetchExampleData();
    // }

    if(currentSceneIndex+1 === scenes.length){
      // audioRef.current.pause();
      setVideoCompleted(true)
    }

    if (currentSceneIndex < scenes.length - 1) {
      setTimeout(() => {
        setCurrentSceneIndex(prevIndex => prevIndex + 1);
      }, 1000);
    }
  };

  const renderBackground = () => {
    if (!scenes || scenes.length === 0 || !scenes[currentSceneIndex]?.image) return null;
    const backgroundPath = require(`../../../assests/backgrounds/${scenes[currentSceneIndex]?.image}`);
    return backgroundPath;
  };

  const getAlignItemClass = () => {
    return scenes[currentSceneIndex]?.textAlign === ALIGNMENTS.BOTTOM_LEFT || scenes[currentSceneIndex]?.textAlign === ALIGNMENTS.BOTTOM_RIGHT ? 'align-items-end' : '';
  };

  const getTextHeightClass = () => {
    return scenes[currentSceneIndex]?.textAlign === ALIGNMENTS.BOTTOM_LEFT || scenes[currentSceneIndex]?.textAlign === ALIGNMENTS.BOTTOM_RIGHT || scenes[currentSceneIndex]?.textAlign === ALIGNMENTS.TOP_MIDDLE ? 'h-50' : 'h-100';
  };

  const getTextAlignmentClass = () => {
    return scenes[currentSceneIndex]?.textAlign === ALIGNMENTS.RIGHT || scenes[currentSceneIndex]?.textAlign === ALIGNMENTS.BOTTOM_RIGHT ? 'text-end' : scenes[currentSceneIndex]?.textAlign === ALIGNMENTS.MIDDLE || scenes[currentSceneIndex]?.textAlign === ALIGNMENTS.TOP_MIDDLE ? 'text-center' : 'text-start';
  };

  const getAnimatedTextAlignmentClass = () => {
    return scenes[currentSceneIndex]?.textAlign === BOARD_TEXT_ALIGNMENTS.TOP_MIDDLE ? 
    'd-flex justify-content-center animated-text-top-middle align-items-start' : 

    scenes[currentSceneIndex]?.textAlign === BOARD_TEXT_ALIGNMENTS.BOTTOM_MIDDLE ? 'd-flex justify-content-center animated-text-bottom-middle align-items-end' :

    scenes[currentSceneIndex]?.textAlign === BOARD_TEXT_ALIGNMENTS.MIDDLE_RIGHT ? 'd-flex justify-content-end animated-text-middle-right align-items-center' :

    scenes[currentSceneIndex]?.textAlign === BOARD_TEXT_ALIGNMENTS.MIDDLE_LEFT ? 'd-flex justify-content-start animated-text-middle-left align-items-center' :

    scenes[currentSceneIndex]?.textAlign === BOARD_TEXT_ALIGNMENTS.BOTTOM_RIGHT ? 'd-flex justify-content-end animated-text-bottom-right align-items-end' :

    scenes[currentSceneIndex]?.textAlign === BOARD_TEXT_ALIGNMENTS.BOTTOM_LEFT ? 'd-flex justify-content-start animated-text-bottom-left align-items-end' :

    scenes[currentSceneIndex]?.textAlign === BOARD_TEXT_ALIGNMENTS.TOP_RIGHT ? 'd-flex justify-content-end animated-text-top-right align-items-start' :
    
    'd-flex justify-content-start animated-text-top-left align-items-start';
  };

  const getAnimatedTextClass = () => {
    return scenes[currentSceneIndex]?.textAlign === BOARD_TEXT_ALIGNMENTS.TOP_MIDDLE || scenes[currentSceneIndex]?.textAlign === BOARD_TEXT_ALIGNMENTS.BOTTOM_MIDDLE || scenes[currentSceneIndex]?.textAlign === BOARD_TEXT_ALIGNMENTS.MIDDLE_RIGHT || scenes[currentSceneIndex]?.textAlign === BOARD_TEXT_ALIGNMENTS.MIDDLE_LEFT ? 'w-70': 'w-50';
  }

  const renderOverlay = () => {
    const current = scenes[currentSceneIndex];
    if (!current) {
      audioRef.current.pause();
      return null;
    }

    let SVGPath = "";
    if (current.icon?.[0]) {
      SVGPath = require(`../../../assests/SVG/${current.icon[0]}.svg`);
    }

    return (
      <div className={`overlay-container p-1 position-absolute d-flex ${getAlignItemClass()}`} style={{ top: 0, left: 0, width: '100%', height: '100%' }}>
        <div ref={astronautRef} className={`w-100 ${getTextHeightClass()} ${getTextAlignmentClass()}  mh-100 object-fit-cover`}>
          <img className='mh-100 mw-100' src={SVGPath} alt="" />
        </div>
      
        <div className={`overlay-text text-white position-absolute h-100 w-100 text-center ${getAnimatedTextAlignmentClass()}`}>
          <div className={`overlay-text text-white h-50 ${getAnimatedTextClass()}`}>
            <TextAnimationWithBoard scene={current} />
          </div>
        </div>
      </div>
    );
  };

  if (!scenes || scenes.length === 0) {
    return null;
  }

  return (
    <div className="board-container position-relative w-100 h-100">
      <div className="board-background w-100 h-100" style={{ backgroundImage: `url(${renderBackground()})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      </div>
      <div className="gif-overlay">
        {renderOverlay()}
      </div>

      <div className="text-container">
        <TextToSpeech text={scenes[currentSceneIndex]?.audio || scenes[currentSceneIndex]?.audio} onSpeechEnd={handleSpeechEnd} />
      </div>

      {videoCompleted && <VideoDetailPagePopup />}
    </div>
  );
};

export default Board;