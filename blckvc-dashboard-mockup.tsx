import React from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, ComposedChart, Area 
} from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Check, DollarSign, Clock, PieChart, BarChart2 } from 'lucide-react';

const data = [
  { month: 'Apr', revenue: 62100, expenses: 112875, cashBalance: 1749225, runway: 34.5, target: 75000 },
  { month: 'May', revenue: 66866, expenses: 93875, cashBalance: 1722216, runway: 63.8, target: 75000 },
  { month: 'Jun', revenue: 293933, expenses: 213125, cashBalance: 1803024, runway: 999, target: 275000 },
  { month: 'Jul', revenue: 51045, expenses: 93875, cashBalance: 1760193, runway: 41.1, target: 75000 },
  { month: 'Aug', revenue: 100601, expenses: 93875, cashBalance: 1766920, runway: 999, target: 125000 },
  { month: 'Sep', revenue: 171443, expenses: 141875, cashBalance: 1796487, runway: 999, target: 175000 },
  { month: 'Oct', revenue: 6235, expenses: 93875, cashBalance: 1708847, runway: 19.5, target: 50000 },
  { month: 'Nov', revenue: 10089, expenses: 93875, cashBalance: 1625061, runway: 19.4, target: 50000 },
  { month: 'Dec', revenue: 4914, expenses: 93875, cashBalance: 1536101, runway: 17.3, target: 50000 },
];

const revenueStreams = [
  { 
    name: 'BVI Revenue',
    Apr: 0, May: 0, Jun: 0, Jul: 0, Aug: 0, Sep: 80000, Oct: 0, Nov: 0, Dec: 0,
  },
  { 
    name: 'BVI Sponsorship',
    Apr: 0, May: 0, Jun: 0, Jul: 0, Aug: 0, Sep: 50000, Oct: 0, Nov: 0, Dec: 0,
  },
  { 
    name: 'SOBVR Lead',
    Apr: 25000, May: 0, Jun: 0, Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0,
  },
  { 
    name: 'SOBVR Secondary',
    Apr: 30000, May: 0, Jun: 0, Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0,
  },
  { 
    name: 'Gala',
    Apr: 0, May: 0, Jun: 212500, Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0,
  },
  { 
    name: 'Dinners',
    Apr: 0, May: 15000, Jun: 0, Jul: 15000, Aug: 15000, Sep: 15000, Oct: 0, Nov: 0, Dec: 0,
  },
  { 
    name: 'Corporate',
    Apr: 0, May: 40000, Jun: 45000, Jul: 25000, Aug: 30000, Sep: 15000, Oct: 0, Nov: 0, Dec: 0,
  },
  { 
    name: 'Foundation',
    Apr: 0, May: 0, Jun: 30000, Jul: 0, Aug: 50000, Sep: 0, Oct: 0, Nov: 0, Dec: 0,
  },
  { 
    name: 'Merchandise',
    Apr: 1250, May: 1250, Jun: 1250, Jul: 1250, Aug: 1250, Sep: 1250, Oct: 1250, Nov: 1250, Dec: 1250,
  },
  { 
    name: 'Curriculum',
    Apr: 0, May: 5000, Jun: 0, Jul: 5000, Aug: 0, Sep: 5000, Oct: 0, Nov: 5000, Dec: 0,
  },
  { 
    name: 'Money Market',
    Apr: 5850, May: 5616, Jun: 5183, Jul: 4795, Aug: 4351, Sep: 4193, Oct: 3985, Nov: 3839, Dec: 3664,
  },
];

const programs = [
  { name: 'BVI Cohort', margin: 35, target: 35 },
  { name: 'SOBVR', margin: 60, target: 35 },
  { name: 'Gala', margin: 50, target: 35 },
  { name: 'Fundraising Dinners', margin: 80, target: 35 },
  { name: 'Merchandise', margin: 30, target: 35 },
  { name: 'Curriculum Licensing', margin: 95, target: 35 },
];

// Transform revenueStreams data for stacked bar chart
const stackedBarData = data.map(item => {
  const month = item.month;
  const result = { month };
  
  revenueStreams.forEach(stream => {
    result[stream.name] = stream[month];
  });
  
  return result;
});

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

const ScenarioSelector = () => (
  <div className="flex justify-end mb-4">
    <div className="relative inline-block">
      <select className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500">
        <option>Base Case</option>
        <option>Optimistic</option>
        <option>Conservative</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 20 20" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </div>
);

const RevenueGapChart = () => {
  const gapData = data.map(item => ({
    month: item.month,
    actual: item.revenue,
    target: item.target,
    gap: item.target - item.revenue > 0 ? item.target - item.revenue : 0
  }));

  return (
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
  );
};

const CashRunwayChart = () => (
  <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
    <h3 className="text-lg font-medium mb-4">Cash Balance & Runway</h3>
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data}>
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
      <span className="text-gray-600">Warning threshold: 9 months runway</span>
    </div>
  </div>
);

const RevenueStreamChart = () => {
  // Process the data to get monthly totals
  const monthlyRevenue = data.map(d => ({
    month: d.month,
    revenue: d.revenue,
  }));

  // Get unique revenue stream names
  const streamNames = revenueStreams.map(stream => stream.name);

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium mb-4">Revenue by Stream</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={stackedBarData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          <Legend />
          {streamNames.map((name, index) => (
            <Bar 
              key={name} 
              dataKey={name} 
              stackId="a" 
              fill={`hsl(${210 + index * 30}, 70%, 50%)`} 
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const ContributionMarginChart = () => (
  <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
    <h3 className="text-lg font-medium mb-4">Program Contribution Margin</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={programs} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
        <YAxis dataKey="name" type="category" width={120} />
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
        <Bar dataKey="margin" name="Contribution Margin %" fill="#4F46E5">
          {programs.map((entry, index) => (
            <rect 
              key={`rect-${index}`}
              x={0}
              y={0}
              width={entry.margin}
              height={0}
              fill={entry.margin >= entry.target ? "#4ADE80" : "#F87171"}
            />
          ))}
        </Bar>
        <Bar dataKey="target" name="Target %" fill="#D1D5DB" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const OpportunityTable = () => (
  <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
    <h3 className="text-lg font-medium mb-4">Top Opportunities to Close Revenue Gap</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opportunity</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Potential</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probability</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weighted</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">MacArthur Grant</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$250,000</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20%</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$50,000</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Follow up on LOI</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Deloitte Sponsorship</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$100,000</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">30%</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$30,000</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Schedule meeting</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">BVI Additional Seats</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$20,000</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">75%</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$15,000</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Launch waitlist</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Delta Sponsorship</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$50,000</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">30%</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$15,000</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Send proposal</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">NY Dinner Revenue</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$25,000</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">60%</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$15,000</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Confirm Candice hosting</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const BVCRevenueForecastDashboard = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">BLCK VC Revenue Forecast Dashboard</h1>
            <p className="text-gray-500">April - December 2025</p>
          </div>
          <ScenarioSelector />
        </div>
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatusCard 
            title="Current Cash Balance" 
            value="$1.75M" 
            target="$1.5M" 
            icon={DollarSign}
            isPositive={true} 
            status="success" 
          />
          <StatusCard 
            title="Runway" 
            value="34.5" 
            suffix=" months" 
            target="9" 
            icon={Clock}
            isPositive={true} 
            status="success" 
          />
          <StatusCard 
            title="Burn Multiple" 
            value="0.82" 
            target="< 2" 
            icon={BarChart2}
            isPositive={true} 
            status="success" 
          />
          <StatusCard 
            title="YTD Revenue" 
            value="$62.1K" 
            target="$75K" 
            icon={PieChart}
            isPositive={false} 
            status="warning" 
          />
        </div>
        
        {/* Charts - First Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <CashRunwayChart />
          <RevenueStreamChart />
        </div>
        
        {/* Charts - Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <RevenueGapChart />
          <ContributionMarginChart />
        </div>
        
        {/* Opportunity Table */}
        <OpportunityTable />
        
        {/* Update Info */}
        <div className="mt-6 text-sm text-gray-500 flex justify-between items-center">
          <span>Last updated: April 5, 2025 by Kareema</span>
          <span>Scenario: Base Case</span>
        </div>
      </div>
    </div>
  );
};

export default BVCRevenueForecastDashboard;