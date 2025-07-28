import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Briefcase, Calendar, TrendingUp, Plus, ArrowRight, Target } from 'lucide-react';
import { useAuth } from '../../App';
import { mockApplicants, mockVacancies, mockInterviews } from '../../data/mockData';

function StatusBadge({ status }) {
  let colorClass = 'bg-gray-300 text-gray-700';
  if (status === 'Active') colorClass = 'bg-green-100 text-green-800';
  else if (status === 'Pending') colorClass = 'bg-yellow-100 text-yellow-800';
  else if (status === 'Rejected') colorClass = 'bg-red-100 text-red-800';

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colorClass}`}
    >
      {status}
    </span>
  );
}

function HRDashboard() {
  const { user } = useAuth();
  const [vacancies, setVacancies] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setVacancies(mockVacancies);
      setApplicants(mockApplicants);
      setInterviews(mockInterviews);
      setLoading(false);
    }, 500);
  }, []);


  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        <div className="text-xl font-medium">Loading dashboard data...</div>
      </div>
    );
  }

  const stats = [
    {
      name: 'Open Vacancies',
      value: vacancies.filter((v) => v.status === 'Open').length,
      icon: Briefcase,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'increase',
      description: 'Active job postings',
    },
    {
      name: 'Total Applicants',
      value: applicants.length,
      icon: Users,
      color: 'bg-green-500',
      change: '+18%',
      changeType: 'increase',
      description: 'Applications received',
    },
    {
      name: 'Interviews Scheduled',
      value: interviews.filter((i) => i.status === 'Scheduled').length,
      icon: Calendar,
      color: 'bg-purple-500',
      change: '+5%',
      changeType: 'increase',
      description: 'This week',
    },
  ];

  const recentApplicants = applicants
    .slice()
    .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
    .slice(0, 5);

  const upcomingInterviews = interviews
    .filter((i) => i.status === 'Scheduled')
    .slice()
    .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate))
    .slice(0, 4);

  const urgentTasks = [
    {
      id: 1,
      task: 'Review 5 new applications for Senior Engineer',
      priority: 'high',
      dueDate: 'Today',
    },
    {
      id: 2,
      task: 'Schedule interview with Sarah Wilson',
      priority: 'medium',
      dueDate: 'Tomorrow',
    },
    {
      id: 3,
      task: 'Send offer letter to Emily Rodriguez',
      priority: 'high',
      dueDate: 'Today',
    },
    {
      id: 4,
      task: 'Update job posting for Marketing Specialist',
      priority: 'low',
      dueDate: 'This week',
    },
  ];

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Welcome back! Here's what's happening with your recruitment process.
          </p>
        </div>
        {user && (
          <div className="mt-4 sm:mt-0 text-right">
            <span className="font-semibold text-blue-700 text-lg">{user.name}</span>
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 w-full">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white border border-gray-200 overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-5 flex items-center">
                <div
                  className={`p-3 rounded-lg shadow-sm flex-shrink-0 ${stat.color}`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </div>             
                    </dd>
                    <dd className="text-xs text-gray-500 mt-1">
                      {stat.description}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Applicants
              </h3>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-500"
              onClick={() => navigate('/layout/applicants')}
              >
                View all <ArrowRight className="h-4 w-4 inline ml-1" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {recentApplicants.map((applicant) => (
                <div
                  key={applicant.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 flex items-center justify-center rounded-full shadow-sm bg-gradient-to-br from-blue-500 to-blue-600">
                      <span className="text-sm font-bold text-white">
                        {applicant.firstName[0]}
                        {applicant.lastName[0]}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {applicant.firstName} {applicant.lastName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {applicant.position}
                      </p>
                      <p className="text-xs text-gray-500">
                        {applicant.experience} years experience
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <StatusBadge status={applicant.status} />
                    <span className="text-xs text-gray-500">
                      {new Date(applicant.appliedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Upcoming Interviews
              </h3>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-500"
              onClick={() => navigate('/layout/interviews')}
              >
                View all <ArrowRight className="h-4 w-4 inline ml-1" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {upcomingInterviews.map((interview) => (
                <div
                  key={interview.id}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <p className="text-sm font-semibold text-gray-900">
                    {interview.applicantName}
                  </p>
                  <p className="text-xs text-gray-600">
                    {new Date(interview.scheduledDate).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    Position: {interview.position}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default HRDashboard;
