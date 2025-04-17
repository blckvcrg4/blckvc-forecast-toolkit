import React from 'react';
import { useForecast } from '../context/ForecastContext';

const Navbar: React.FC = () => {
  const { saveAllData } = useForecast();
  
  const handleSave = async () => {
    await saveAllData();
    alert('All data has been saved to GitHub');
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-indigo-600">BLCK VC</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <span className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Forecast Toolkit
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save to GitHub
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
