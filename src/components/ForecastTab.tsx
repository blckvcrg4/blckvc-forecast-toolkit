import React from 'react';
import { useForecast } from '../context/ForecastContext';
import { months } from '../models/forecastModels';

const ForecastTab: React.FC = () => {
  const { forecastData, targetsData } = useForecast();
  
  // Find target metrics for conditional formatting
  const getThresholds = (metricName: string) => {
    const metric = targetsData.find(t => t.Metric === metricName);
    return {
      target: metric ? parseFloat(metric.Target as string) : null,
      warning: metric ? parseFloat(metric.Warning_Threshold as string) : null,
      critical: metric ? parseFloat(metric.Critical_Threshold as string) : null
    };
  };
  
  // Get status color based on value compared to thresholds
  const getStatusColor = (metricName: string, value: number, inverted: boolean = false) => {
    const { target, warning, critical } = getThresholds(metricName);
    
    if (target === null) return '';
    
    if (!inverted) {
      if (value >= target) return 'bg-green-100 text-green-800';
      if (value >= warning!) return 'bg-yellow-100 text-yellow-800';
      if (value >= critical!) return 'bg-orange-100 text-orange-800';
      return 'bg-red-100 text-red-800';
    } else {
      if (value <= target) return 'bg-green-100 text-green-800';
      if (value <= warning!) return 'bg-yellow-100 text-yellow-800';
      if (value <= critical!) return 'bg-orange-100 text-orange-800';
      return 'bg-red-100 text-red-800';
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Forecast</h2>
        <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          Auto-calculated
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="data-grid">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Formula</th>
              {months.map(month => (
                <th key={month}>{month.substring(0, 3)}</th>
              ))}
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {forecastData.map((item) => {
              return (
                <tr key={item.Metric}>
                  <td>{item.Metric}</td>
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
                    
                    // Apply conditional formatting based on metric type
                    let cellClass = '';
                    if (item.Metric === 'Revenue_Gap' && !isNaN(value)) {
                      cellClass = getStatusColor('Monthly_Revenue', value, true);
                    } else if (item.Metric === 'Runway_Months' && !isNaN(value)) {
                      cellClass = getStatusColor('Minimum_Runway', value, false);
                    } else if (item.Metric === 'Burn_Multiple' && !isNaN(value)) {
                      cellClass = getStatusColor('Maximum_Burn_Multiple', value, true);
                    } else if (item.Metric === 'Ending_Cash_Balance' && !isNaN(value)) {
                      cellClass = getStatusColor('Minimum_Cash_Balance', value, false);
                    }
                    
                    return (
                      <td 
                        key={month}
                        className={cellClass}
                      >
                        {formatted}
                      </td>
                    );
                  })}
                  <td>{item.Notes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6">
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Understanding the Forecast</h3>
          <p className="text-sm text-gray-700">
            The Forecast tab summarizes the financial projections, showing revenue, expenses, cash flow, and key performance indicators.
          </p>
          <ul className="mt-2 text-sm text-gray-700 list-disc pl-5">
            <li><span className="bg-green-100 px-2 py-0.5 rounded text-green-800">Green</span>: Meeting or exceeding targets</li>
            <li><span className="bg-yellow-100 px-2 py-0.5 rounded text-yellow-800">Yellow</span>: Below target but above warning threshold</li>
            <li><span className="bg-orange-100 px-2 py-0.5 rounded text-orange-800">Orange</span>: Below warning threshold but above critical</li>
            <li><span className="bg-red-100 px-2 py-0.5 rounded text-red-800">Red</span>: Below critical threshold</li>
          </ul>
          <div className="mt-4 text-sm text-gray-700">
            <p><strong>Key metrics to watch:</strong></p>
            <ul className="list-disc pl-5">
              <li><strong>Runway Months:</strong> Target ≥9 months to avoid urgent fundraising pressure</li>
              <li><strong>Burn Multiple:</strong> Cash consumed ÷ new revenue (lower is better)</li>
              <li><strong>Revenue Gap:</strong> Shortfall against target (negative means exceeding target)</li>
              <li><strong>Ending Cash Balance:</strong> Should stay above minimum threshold</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastTab;
