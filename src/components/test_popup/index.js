import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import './index.css';
import { getQuizesQuestions } from '../../api/search';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement);

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  width: 90%;
  max-width: 800px;
  height: 80vh;
  max-height: 100%;
  border-radius: 20px;
  // background: rgba(255, 255, 255, 0.1);
  background: #282828;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 20px, rgba(0, 0, 0, 0.15) 0px 4px 6px inset;
  backdrop-filter: blur(5px);
  overflow-y: auto;
  scrollbar-width: thin;
  padding: 20px;
  position: relative;
  color: white;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #fff;
`;

const QuizPopup = ({ isOpen, onClose }) => {
  const [stage, setStage] = useState('quiz');
  const [quizState, setQuizState] = useState({
    currentQuestion: 0,
    score: 0,
    selectedOption: null,
    showHint: false,
    questionScores: [],
  });
  const [topic, setTopics] = useState({});

  useEffect(() => {
    const fetchQuizData = async () => {
      const selectedVideo = JSON.parse(localStorage.getItem('selectedVideo'));
      const fetchQuizQuestions = await getQuizesQuestions(selectedVideo);
      setTopics(fetchQuizQuestions);
    };

    fetchQuizData();
  }, []);

  useEffect(() => {
    if (isOpen) {
      resetQuiz();
    }
  }, [isOpen]);

  const resetQuiz = () => {
    setStage('quiz');
    setQuizState({
      currentQuestion: 0,
      score: 0,
      selectedOption: null,
      showHint: false,
      questionScores: [],
    });
  };

  const handleOptionSelect = (index) => {
    setQuizState(prev => ({ ...prev, selectedOption: index }));
  };

  const handleSubmit = () => {
    const currentQuestion = topic.quizData[quizState.currentQuestion];
    const isCorrect = quizState.selectedOption === currentQuestion.correct;

    setQuizState(prev => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      questionScores: [...prev.questionScores, isCorrect ? 1 : 0],
      currentQuestion: prev.currentQuestion + 1,
      selectedOption: null,
      showHint: false,
    }));

    if (quizState.currentQuestion + 1 >= topic.quizData.length) {
      setStage('report');
    }
  };

  const handleReplayQuiz = () => {
    resetQuiz();
  };

  const renderContent = () => {
    switch (stage) {
      case 'quiz':
        const currentQuestion = topic.quizData[quizState.currentQuestion];
        return (
          <div className="quiz-component pt-2">
            <h4  className='pb-1'>Question {quizState.currentQuestion + 1} of {topic.quizData.length}</h4>
            <h5 className='pb-1'>{currentQuestion.question}</h5>
            <div className="options">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`option text-start ${quizState.selectedOption === index ? 'selected' : ''}`}
                  onClick={() => handleOptionSelect(index)}
                >
                  {option}
                </button>
              ))}
            </div>
            {quizState.showHint && <p className="hint">{currentQuestion.hint}</p>}
            <button className='theme-button' onClick={() => setQuizState(prev => ({ ...prev, showHint: true }))}>
              Get Hint
            </button> &nbsp;
            <button className='theme-button' onClick={handleSubmit} disabled={quizState.selectedOption === null}>
              Submit
            </button>
          </div>
        );
      case 'report':
        const totalQuestions = topic.quizData.length;
        const percentageScore = (quizState.score / totalQuestions) * 100;

        const doughnutData = {
          labels: ['Correct', 'Incorrect'],
          datasets: [{
            data: [quizState.score, totalQuestions - quizState.score],
            backgroundColor: ['#00ffff', '#ff00ff']
          }]
        };

        const barData = {
          labels: ['Score'],
          datasets: [{
            label: 'Your Score',
            data: [quizState.score],
            backgroundColor: '#00ffff'
          }, {
            label: 'Maximum Score',
            data: [totalQuestions],
            backgroundColor: '#ff00ff'
          }]
        };

        const lineData = {
          labels: quizState.questionScores.map((_, index) => `Q${index + 1}`),
          datasets: [{
            label: 'Performance by Question',
            data: quizState.questionScores,
            borderColor: '#00ffff',
            fill: false
          }]
        };

        return (
          <div className="report-component pt-2">
            <h2>Quiz Report: {topic.name}</h2>
            <p>Score: {quizState.score} / {totalQuestions}</p>
            <p>Percentage: {percentageScore.toFixed(2)}%</p>
            <div className="charts-container">
              <div className="chart">
                <h3>Overall Performance</h3>
                <Doughnut data={doughnutData} />
              </div>
              <div className="chart">
                <h3>Score Comparison</h3>
                <Bar data={barData} />
              </div>
              <div className="chart">
                <h3>Question-by-Question Performance</h3>
                <Line data={lineData} />
              </div>
            </div>
            {percentageScore >= 80 ? (
              <div className="feedback positive">
                <h3>Excellent work!</h3>
                <p>You've mastered this topic. Great job!</p>
              </div>
            ) : (
              <div className="feedback needs-improvement">
                <h3>Good effort, but there's room for improvement.</h3>
                <p>Would you like to review the material and try again?</p>
                <button onClick={handleReplayQuiz}>Replay Quiz</button>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <PopupOverlay onClick={onClose}>
      <PopupContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>{topic.name} Quiz</h2>
        {renderContent()}
      </PopupContent>
    </PopupOverlay>
  );
};

export default QuizPopup;
