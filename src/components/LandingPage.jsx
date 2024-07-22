import React from 'react';
import { useNavigate } from 'react-router-dom';
import BrandingLogo from './BrandingLogo';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Welcome to MasterJi Assignments</h1>
      <div className="flex flex-col items-center space-y-4 w-full max-w-md">
        <button
          onClick={() => navigate('/otp-form')}
          className="w-full py-4 px-6 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition"
        >
          OTP Form
        </button>
        <button
          onClick={() => navigate('/course-list')}
          className="w-full py-4 px-6 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-700 transition"
        >
          Course List
        </button>
        <button
          onClick={() => navigate('/batches')}
          className="w-full py-4 px-6 text-lg font-semibold text-white bg-violet-700 rounded-lg shadow-lg hover:bg-violet-900 transition"
        >
          Batches
        </button>
      </div>
      <BrandingLogo />
    </div>
  );
}

export default LandingPage;
