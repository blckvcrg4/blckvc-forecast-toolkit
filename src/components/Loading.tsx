import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
        <h2 className="mt-6 text-2xl font-semibold text-gray-800">Loading BLCK VC Forecast Toolkit</h2>
        <p className="mt-2 text-gray-600">Initializing your financial forecast model...</p>
      </div>
    </div>
  );
};

export default Loading;
