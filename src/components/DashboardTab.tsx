import React from 'react';
import { useForecast } from '../context/ForecastContext';
import { convertToChartData } from '../utils/calculationUtils';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, ComposedChart, Area 
} from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Check, DollarSign, Clock, PieChart, BarChart2 } from 'lucide-react';

const DashboardTab: React.FC = () => {
  const { forecastData, revModelData, targetsData } = useForecast();
  
  // Convert data to chart format
  const chartData = convertToChartData(forecastData);
  
  // Get target threshold for runway
  const runwayTarget = targetsData.find(t => t.Metric === 'Minimum_Runway')?.Target as number || 9;
  const runwayWarning = targetsData.find(t => t.Metric === 'Minimum_Runway')?.Warning_Threshold as number || 6;
  
  // Get revenue targets
  const revenueTarget = targetsData.find(t => t.Metric === 'Monthly_Revenue')?.Target as number || 75000;
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Calculate current month's values
  const currentMonth = chartData[0]; // For this example, using first month
  
  // Extract values for KPI cards
  const currentRevenue = currentMonth?.revenue || 0;
  const currentExpenses = currentMonth?.expenses || 0;
  const currentCashBalance = currentMonth?.cashBalance || 0;
  const currentRunway = currentMonth?.runway || 0;
  
  // Determine status colors based on thresholds
  const getRunwayStatus = (runway: number) => {
    if (runway >= runwayTarget) return 'success';
    if (runway >= runwayWarning) return 'warning';
    return 'danger';
  };
  
  const getRevenueStatus = (revenue: number, target: number) => {
    if (revenue >= target) return 'success';
    if (revenue >= target * 0.7) return 'warning';
    return 'danger';
  };
  
  const getCashStatus = (cash: number) => {
    const minCash = targetsData.find(t => t.Metric === 'Minimum_Cash_Balance')?.Target as number || 1500000;
    if (cash >= minCash) return 'success';
    if (cash >= minCash * 0.8) return 'warning';
    return 'danger';
  };
  
  // Prepare data for revenue gap chart
  const gapData = chartData.map(item => ({
    month: item.month,
    actual: item.revenue,
    target: item.target,
    gap: item.target - item.revenue > 0 ? item.target - item.revenue : 0
  }));
  
  // Create program margin data
  const programs = [
    { name: 'BVI Cohort', margin: 35, target: 35 },
    { name: 'SOBVR', margin: 60, target: 35 },
    { name: 'Gala', margin: 50, target: 35 },
    { name: 'Fundraising Dinners', margin: 80, target: 35 },
    { name: 'Merchandise', margin: 30, target: 35 },
    { name: 'Curriculum Licensing', margin: 95, target: 35 },
  ];
  
  // Status card component
  const StatusCard = ({ title, value, target, suffix, icon: Icon, isPositive = true, status = 'neutral' }) => {
    let statusColor = 'bg-gray-100 text-gray-600';
    if (status === 'success') statusColor = 'bg-green-100 text-green-600';
    if (status === 'warning') statusColor = 'bg-yellow-100 text-yellow-600';
    if (status === 'danger') statusColor = 'bg-red-100 text-red-600';
    
    return (
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center mb-2">
          <div className={`p-2 rounded-md ${statusColor} mr-3`}>
            <Icon size={20} />
          </div>
          <span className="text-gray-500 font-medium">{title}</span>
        </div>
        <div className="flex items-baseline">
          <span className="text-2xl font-bold mr-2">{value}</span>
          {suffix && <span className="text-gray-500">{suffix}</span>}
        </div>
        {target && (
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500 mr-2">Target: {target}{suffix}</span>
            {isPositive ? 
              <TrendingUp size={16} className="text-green-500" /> : 
              <TrendingDown size={16} className="text-red-500" />
            }
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Scenario:</span>
          <select className="block w-32 px-2 py-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option>Base Case</option>
            <option>Optimistic</option>
            <option>Conservative</option>
          </select>
        </div>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatusCard 
          title="Monthly Revenue" 
          value={formatCurrency(currentRevenue)} 
          target={formatCurrency(revenueTarget)}
          icon={DollarSign}
          status={getRevenueStatus(currentRevenue, revenueTarget)}
          isPositive={currentRevenue >= revenueTarget}
        />
        
        <StatusCard 
          title="Cash Balance" 
          value={formatCurrency(currentCashBalance)} 
          icon={DollarSign}
          status={getCashStatus(currentCashBalance)}
          isPositive={true}
        />
        
        <StatusCard 
          title="Runway" 
          value={currentRunway.toFixed(1)} 
          suffix=" months"
          target={runwayTarget}
          icon={Clock}
          status={getRunwayStatus(currentRunway)}
          isPositive={currentRunway >= runwayTarget}
        />
        
        <StatusCard 
          title="Break-Even" 
          value={currentRevenue >= currentExpenses ? "Yes" : "No"} 
          icon={currentRevenue >= currentExpenses ? Check : AlertTriangle}
          status={currentRevenue >= currentExpenses ? 'success' : 'warning'}
          isPositive={currentRevenue >= currentExpenses}
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Gap Chart */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Revenue Gap to Target</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={gapData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="actual" name="Actual Revenue" fill="#4F46E5" />
              <Bar dataKey="target" name="Target Revenue" fill="#E5E7EB" />
              <Line type="monotone" dataKey="gap" name="Gap" stroke="#EF4444" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        {/* Cash & Runway Chart */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Cash Balance & Runway</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip formatter={(value, name) => {
                if (name === 'cashBalance') return `$${value.toLocaleString()}`;
                if (name === 'runway') return `${value} months`;
                return value;
              }} />
              <Legend />
              <Area yAxisId="left" type="monotone" dataKey="cashBalance" name="Cash Balance" fill="#C7D2FE" stroke="#4F46E5" />
              <Line yAxisId="right" type="monotone" dataKey="runway" name="Runway (months)" stroke="#10B981" />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="flex items-center text-sm mt-2">
            <div className="bg-yellow-100 text-yellow-600 p-1 rounded mr-2">
              <AlertTriangle size={16} />
            </div>
            <span className="text-gray-600">Warning threshold: {runwayWarning} months runway</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Program Contribution Margins */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Program Contribution Margins</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={programs}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Bar dataKey="margin" name="Margin %" fill="#8884d8" />
              <Bar dataKey="target" name="Target %" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Opportunity Table */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Revenue Opportunities</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opportunity</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probability</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">MacArthur Grant</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$250,000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$50,000</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Deloitte Sponsorship</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$100,000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">30%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$30,000</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Google DEI Grant</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$75,000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">60%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$45,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
