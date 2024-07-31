import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import VideoDetailPage from './pages/VideoDetailPage';

const RouterComponent = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/guru" element={<VideoDetailPage />} />
    </Routes>
  </Router>
);

export default RouterComponent;
