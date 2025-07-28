import React, { useEffect, useState } from 'react';
import {
  TrendingUp,
  Users,
  Briefcase,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Clock,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

 function HRReports() {
  const [vacancies, setVacancies] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [reportType, setReportType] = useState('overview');
  const [dateRange, setDateRange] = useState('30');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [vacRes, appRes, intRes] = await Promise.all([
          fetch('/api/vacancies'),
          fetch('/api/applicants'),
          fetch('/api/interviews'),
        ]);

        setVacancies(await vacRes.json());
        setApplicants(await appRes.json());
        setInterviews(await intRes.json());
      } catch (error) {
        console.error('Fetch error:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const totalVacancies = vacancies.length;
  const openVacancies = vacancies.filter((v) => v.status === 'Open').length;
  const totalApplicants = applicants.length;
  const hiredApplicants = applicants.filter((a) => a.status === 'Hired').length;
  const scheduledInterviews = interviews.filter((i) => i.status === 'Scheduled').length;
  const completedInterviews = interviews.filter((i) => i.status === 'Completed').length;

  const hiringRate = totalApplicants ? ((hiredApplicants / totalApplicants) * 100).toFixed(1) : '0';
  const interviewRate = completedInterviews ? ((hiredApplicants / completedInterviews) * 100).toFixed(1) : '0';

  const appStatusData = [
    { name: 'Hired', value: applicants.filter(a => a.status === 'Hired').length },
    { name: 'Pending', value: applicants.filter(a => a.status === 'Pending').length },
    { name: 'Rejected', value: applicants.filter(a => a.status === 'Rejected').length },
  ];
  const COLORS = ['#4ade80', '#facc15', '#f87171'];

  const topDepartments = [...new Set(applicants.map(a => a.department))]
    .map(dept => ({
      name: dept,
      count: applicants.filter(a => a.department === dept).length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const recentActivity = [...applicants]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5)
    .map((a) => ({
      id: a.id,
      action: `${a.name} - ${a.status}`,
      time: new Date(a.updatedAt).toLocaleString(),
    }));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading reports...</div>
      </div>
    );
  }

  return (
    <div className="px-6 py-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-sm text-gray-600">Track recruitment performance easily.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center px-4 py-2 text-sm border rounded-md text-gray-700 bg-white hover:bg-gray-100"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
         
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <MetricCard
          title="Total Vacancies"
          value={totalVacancies}
          subtitle={`${openVacancies} open`}
          icon={Briefcase}
          
        />
        <MetricCard
          title="Total Applicants"
          value={totalApplicants}
          subtitle="All applications"
          icon={Users}
        
        />
       
        <MetricCard
          title="Interview Conversion"
          value={`${interviewRate}%`}
          subtitle="Hires vs Interviews"
          icon={Calendar}
        
        />
      </div>

      {/* Filter */}
      <div className="mt-6 bg-white shadow rounded-md p-4 grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm"
          >
            <option value="overview">Overview</option>
            <option value="hiring">Hiring Metrics</option>
            <option value="department">Department Wise</option>
            <option value="timeline">Timeline</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
            <option value="365">Last year</option>
          </select>
        </div>
        <div className="flex items-end">
          <button className="w-full flex items-center justify-center px-4 py-2 border rounded-md text-sm text-gray-700 bg-white hover:bg-gray-100">
            <Filter className="w-4 h-4 mr-2" />
            Apply
          </button>
        </div>
      </div>

      {/* Application Status Pie Chart */}
      <div className="mt-6 grid lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-md shadow">
          <h3 className="text-lg font-semibold mb-2">Application Status Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={appStatusData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={80} label>
                {appStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Departments */}
        <div className="bg-white p-4 rounded-md shadow">
          <h3 className="text-lg font-semibold mb-2">Top Departments by Applications</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            {topDepartments.map((dept, i) => (
              <li key={i} className="flex justify-between border-b py-1">
                <span>{dept.name}</span>
                <span>{dept.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 bg-white p-4 rounded-md shadow">
        <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
        <ul className="text-sm text-gray-600 space-y-2">
          {recentActivity.map((item) => (
            <li key={item.id} className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>{item.action}</span>
              <span className="text-xs text-gray-400 ml-auto">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MetricCard({ title, value, subtitle, icon: Icon}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-start">
      <div className="p-2 bg-gray-100 rounded-full mr-4">
        <Icon className="w-6 h-6 text-gray-600" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-xl font-semibold text-gray-800">{value}</h3>
        <p className="text-sm text-gray-400">{subtitle}</p>
      
      </div>
    </div>
  );
}
export default HRReports;