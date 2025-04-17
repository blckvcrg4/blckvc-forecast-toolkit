import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ForecastProvider } from './context/ForecastContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ForecastProvider>
      <App />
    </ForecastProvider>
  </React.StrictMode>
);
