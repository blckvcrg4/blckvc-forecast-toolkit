import React, { useState, useEffect } from 'react';
import { useForecast } from '../context/ForecastContext';
import { ScenariosData } from '../models/forecastModels';

const ScenariosTab: React.FC = () => {
  const { scenariosData, updateScenariosData, driversData, updateDriversData } = useForecast();
  const [localData, setLocalData] = useState<ScenariosData[]>([]);
  const [activeScenario, setActiveScenario] = useState<string>('Base_Case');
  
  useEffect(() => {
    setLocalData(scenariosData);
  }, [scenariosData]);
  
  const handleDataChange = (index: number, column: string, value: string) => {
    const newData = [...localData];
    newData[index][column] = value;
    setLocalData(newData);
  };
  
  const handleSave = async () => {
    await updateScenariosData(localData);
    alert('Scenario data saved and model recalculated');
  };
  
  const applyScenario = async () => {
    // Update the scenario toggle in drivers data
    const updatedDriversData = [...driversData];
    const scenarioToggleIndex = updatedDriversData.findIndex(
      d => d.Category === 'Scenario' && d.Driver === 'Toggle'
    );
    
    if (scenarioToggleIndex >= 0) {
      const scenarioValue = activeScenario === 'Optimistic' ? 1 : activeScenario === 'Base_Case' ? 2 : 3;
      
      // Update all months to the same scenario
      months.forEach(month => {
        updatedDriversData[scenarioToggleIndex][month] = scenarioValue;
      });
      
      await updateDriversData(updatedDriversData);
      alert(`${activeScenario.replace('_', ' ')} scenario applied to all months`);
    } else {
      alert('Scenario toggle not found in drivers data');
    }
  };
  
  // List of months for column headers
  const months = ['Apr-25', 'May-25', 'Jun-25', 'Jul-25', 'Aug-25', 'Sep-25', 'Oct-25', 'Nov-25', 'Dec-25'];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Scenarios</h2>
        <div className="flex space-x-4">
          <select 
            className="block w-48 px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={activeScenario}
            onChange={(e) => setActiveScenario(e.target.value)}
          >
            <option value="Base_Case">Base Case</option>
            <option value="Optimistic">Optimistic</option>
            <option value="Conservative">Conservative</option>
          </select>
          <button
            onClick={applyScenario}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Apply Scenario
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Scenario Data
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="data-grid">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Base Case</th>
              <th>Optimistic</th>
              <th>Conservative</th>
              <th>Current</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {localData.map((item, index) => (
              <tr key={item.Parameter}>
                <td>{item.Parameter}</td>
                <td>
                  <input
                    type="text"
                    value={item.Base_Case || ''}
                    onChange={(e) => handleDataChange(index, 'Base_Case', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.Optimistic || ''}
                    onChange={(e) => handleDataChange(index, 'Optimistic', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.Conservative || ''}
                    onChange={(e) => handleDataChange(index, 'Conservative', e.target.value)}
                  />
                </td>
                <td className="bg-gray-100">{item.Current}</td>
                <td>
                  <input
                    type="text"
                    value={item.Notes || ''}
                    onChange={(e) => handleDataChange(index, 'Notes', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6">
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Working with Scenarios</h3>
          <p className="text-sm text-gray-700">
            The Scenarios tab allows you to define different forecast cases and quickly switch between them.
          </p>
          <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-3 rounded shadow-sm border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-1">Base Case</h4>
              <p className="text-gray-600">Most likely outcome, aligned with internal targets.</p>
              <div className="mt-2 text-xs text-gray-500">Example: 50% sponsor close rate</div>
            </div>
            <div className="bg-green-50 p-3 rounded shadow-sm border border-green-200">
              <h4 className="font-medium text-green-800 mb-1">Optimistic Case</h4>
              <p className="text-green-600">Upside potential if key drivers exceed expectations.</p>
              <div className="mt-2 text-xs text-green-500">Example: 70% sponsor close rate</div>
            </div>
            <div className="bg-orange-50 p-3 rounded shadow-sm border border-orange-200">
              <h4 className="font-medium text-orange-800 mb-1">Conservative Case</h4>
              <p className="text-orange-600">Downside risk if key drivers underperform.</p>
              <div className="mt-2 text-xs text-orange-500">Example: 30% sponsor close rate</div>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-700">
            <p><strong>How to use scenarios:</strong></p>
            <ol className="list-decimal pl-5">
              <li>Define your parameter values for each scenario</li>
              <li>Select the scenario you want to apply from the dropdown</li>
              <li>Click "Apply Scenario" to update all driver values accordingly</li>
              <li>View the impact on your revenue, expenses, and KPIs in other tabs</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenariosTab;
