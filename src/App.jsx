import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import OtpForm from './components/OtpForm';
import CourseList from './components/CourseList';
import Batches from './components/Batches';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/otp-form" element={<OtpForm />} />
        <Route path="/course-list" element={<CourseList />} />
        <Route path="/batches" element={<Batches />} />
      </Routes>
    </Router>
  );
}

export default App;
