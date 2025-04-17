import React, { useState, useEffect } from 'react';
import { useForecast } from './context/ForecastContext';
import Navbar from './components/Navbar';
import DriversTab from './components/DriversTab';
import RevModelTab from './components/RevModelTab';
import CostModelTab from './components/CostModelTab';
import ForecastTab from './components/ForecastTab';
import ScenariosTab from './components/ScenariosTab';
import DashboardTab from './components/DashboardTab';
import GitHubAuth from './components/GitHubAuth';
import Loading from './components/Loading';

const App: React.FC = () => {
  const { loading, authenticated, initializeApp } = useForecast();
  const [activeTab, setActiveTab] = useState('drivers');

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  if (loading) {
    return <Loading />;
  }

  if (!authenticated) {
    return <GitHubAuth />;
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'drivers':
        return <DriversTab />;
      case 'revModel':
        return <RevModelTab />;
      case 'costModel':
        return <CostModelTab />;
      case 'forecast':
        return <ForecastTab />;
      case 'scenarios':
        return <ScenariosTab />;
      case 'dashboard':
        return <DashboardTab />;
      default:
        return <DriversTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          BLCK VC Budgeting & Revenue Forecasting Toolkit
        </h1>
        
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-6">
              <button
                className={`tab-button ${activeTab === 'drivers' ? 'active' : ''}`}
                onClick={() => setActiveTab('drivers')}
              >
                Drivers
              </button>
              <button
                className={`tab-button ${activeTab === 'revModel' ? 'active' : ''}`}
                onClick={() => setActiveTab('revModel')}
              >
                Revenue Model
              </button>
              <button
                className={`tab-button ${activeTab === 'costModel' ? 'active' : ''}`}
                onClick={() => setActiveTab('costModel')}
              >
                Cost Model
              </button>
              <button
                className={`tab-button ${activeTab === 'forecast' ? 'active' : ''}`}
                onClick={() => setActiveTab('forecast')}
              >
                Forecast
              </button>
              <button
                className={`tab-button ${activeTab === 'scenarios' ? 'active' : ''}`}
                onClick={() => setActiveTab('scenarios')}
              >
                Scenarios
              </button>
              <button
                className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                Dashboard
              </button>
            </nav>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          {renderTab()}
        </div>
      </div>
    </div>
  );
};

export default App;
