import React from 'react';
import { useForecast } from '../context/ForecastContext';
import { months } from '../models/forecastModels';

const CostModelTab: React.FC = () => {
  const { costModelData } = useForecast();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Cost Model</h2>
        <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          Auto-calculated
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="data-grid">
          <thead>
            <tr>
              <th>Expense Category</th>
              <th>Type</th>
              {months.map(month => (
                <th key={month}>{month.substring(0, 3)}</th>
              ))}
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {costModelData.map((item) => {
              // Determine row styling based on cost type
              let typeClass = '';
              if (item.Type === 'Fixed') typeClass = 'bg-gray-50';
              if (item.Type === 'Variable') typeClass = 'bg-blue-50';
              if (item.Type === 'Semi-Fixed') typeClass = 'bg-yellow-50';
              
              // Special styling for total row
              const isTotal = item.Expense_Category === 'Total_Expenses';
              if (isTotal) typeClass = 'font-bold bg-gray-100';
              
              return (
                <tr key={item.Expense_Category} className={typeClass}>
                  <td>{item.Expense_Category}</td>
                  <td>{item.Type}</td>
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
                      
                    return <td key={month}>{formatted}</td>;
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">Understanding the Cost Structure</h3>
          <p className="text-sm text-gray-700">
            The Cost Model breaks down expenses by type and timing, categorizing each as Fixed, Semi-Fixed, or Variable.
          </p>
          <ul className="mt-2 text-sm text-gray-700 list-disc pl-5">
            <li><span className="bg-gray-50 px-2 py-0.5 rounded">Fixed Costs</span>: Relatively constant regardless of activity level (e.g., salaries, overhead)</li>
            <li><span className="bg-yellow-50 px-2 py-0.5 rounded">Semi-Fixed Costs</span>: Can be adjusted but not directly tied to revenue (e.g., contractors)</li>
            <li><span className="bg-blue-50 px-2 py-0.5 rounded">Variable Costs</span>: Directly tied to revenue generation (e.g., COGS, event expenses)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CostModelTab;
