import React, { useState, useEffect } from 'react';
import { useForecast } from '../context/ForecastContext';
import { DriversData, months } from '../models/forecastModels';

const DriversTab: React.FC = () => {
  const { driversData, updateDriversData } = useForecast();
  const [localData, setLocalData] = useState<DriversData[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('All');
  
  useEffect(() => {
    setLocalData(driversData);
  }, [driversData]);
  
  const categories = ['All', ...Array.from(new Set(driversData.map(d => d.Category)))];
  
  const handleDataChange = (index: number, month: string, value: string) => {
    const newData = [...localData];
    newData[index][month] = value;
    setLocalData(newData);
  };
  
  const handleSave = async () => {
    await updateDriversData(localData);
    alert('Driver data saved and model recalculated');
  };
  
  const filteredData = currentCategory === 'All' 
    ? localData 
    : localData.filter(d => d.Category === currentCategory);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Driver Inputs</h2>
        <div className="flex space-x-4">
          <select 
            className="block w-48 px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={currentCategory}
            onChange={(e) => setCurrentCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <button
            onClick={handleSave}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save & Calculate
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="data-grid">
          <thead>
            <tr>
              <th>Category</th>
              <th>Driver</th>
              {months.map(month => (
                <th key={month}>{month.substring(0, 3)}</th>
              ))}
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((driver, index) => (
              <tr key={`${driver.Category}-${driver.Driver}`}>
                <td>{driver.Category}</td>
                <td>{driver.Driver}</td>
                {months.map(month => (
                  <td key={month}>
                    <input
                      type="text"
                      value={driver[month] || ''}
                      onChange={(e) => handleDataChange(
                        localData.findIndex(d => d.Category === driver.Category && d.Driver === driver.Driver),
                        month, 
                        e.target.value
                      )}
                    />
                  </td>
                ))}
                <td>
                  <input
                    type="text"
                    value={driver.Notes || ''}
                    onChange={(e) => handleDataChange(
                      localData.findIndex(d => d.Category === driver.Category && d.Driver === driver.Driver),
                      'Notes', 
                      e.target.value
                    )}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6">
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Working with Driver Inputs</h3>
          <p className="text-sm text-gray-700">
            The Drivers tab is the control center for your forecasting model. All assumptions entered here will flow through to the calculations in the Revenue Model, Cost Model, and Forecast tabs.
          </p>
          <ul className="mt-2 text-sm text-gray-700 list-disc pl-5">
            <li>Enter numeric values without dollar signs or commas</li>
            <li>For percentages, enter the number (e.g., enter 40 for 40%)</li>
            <li>For toggle values, use 1 for yes/true and 0 for no/false</li>
            <li>Click "Save & Calculate" to update the entire model</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DriversTab;
