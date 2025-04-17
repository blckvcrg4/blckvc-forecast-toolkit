import React from 'react';
import { useForecast } from '../context/ForecastContext';
import { months } from '../models/forecastModels';

const RevModelTab: React.FC = () => {
  const { revModelData } = useForecast();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Revenue Model</h2>
        <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          Auto-calculated
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="data-grid">
          <thead>
            <tr>
              <th>Revenue Stream</th>
              <th>Formula</th>
              {months.map(month => (
                <th key={month}>{month.substring(0, 3)}</th>
              ))}
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {revModelData.map((item, index) => (
              <tr key={item.Revenue_Stream}>
                <td>{item.Revenue_Stream}</td>
                <td className="text-xs font-mono">{item.Formula}</td>
                {months.map(month => {
                  const value = typeof item[month] === 'number' 
                    ? item[month] 
                    : parseFloat(item[month] as string);
                  
                  const formatted = !isNaN(value) 
                    ? new Intl.NumberFormat('en-US', { 
                        style: 'currency', 
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      }).format(value)
                    : item[month];
                    
                  // Add special highlighting for total row
                  const isTotal = item.Revenue_Stream === 'Total_Revenue';
                  
                  return (
                    <td 
                      key={month}
                      className={`${isTotal ? 'font-bold bg-gray-100' : ''}`}
                    >
                      {formatted}
                    </td>
                  );
                })}
                <td>{item.Notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6">
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Understanding the Revenue Model</h3>
          <p className="text-sm text-gray-700">
            The Revenue Model calculates expected income based on the driver inputs. Each row represents a different revenue stream with its own calculation formula.
          </p>
          <ul className="mt-2 text-sm text-gray-700 list-disc pl-5">
            <li>Values are automatically calculated based on your inputs in the Drivers tab</li>
            <li>The "Formula" column shows the equation used to derive each value</li>
            <li>Probability-weighted values account for close likelihood</li>
            <li>The Total Revenue row sums all revenue streams for each month</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RevModelTab;
