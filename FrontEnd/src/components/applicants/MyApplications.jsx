import React, { useState, useEffect } from 'react';
import { getMyApplications, getProfile } from '../../services/applicant';

export default function MyApplications() {
  const [applicant, setApplicant] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Get user profile
        const profileResponse = await getProfile();
        if (profileResponse && profileResponse.success) {
          setApplicant(profileResponse.data);
        }

        // Get user applications
        const applicationsResponse = await getMyApplications();
        if (applicationsResponse && applicationsResponse.success) {
          setApplications(applicationsResponse.data || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading your applications...
      </div>
    );
  }

  // Calculate stats
  const totalApplications = applications.length;
  const pendingApplications = applications.filter(app => app.status === 'SUBMITTED' || app.status === 'UNDER_REVIEW').length;
  const reviewedApplications = applications.filter(app => app.status === 'UNDER_REVIEW').length;
  const shortlistedApplications = applications.filter(app => app.status === 'SHORTLISTED').length;
  const interviewedApplications = applications.filter(app => app.status === 'INTERVIEWED').length;
  const hiredApplications = applications.filter(app => app.status === 'SELECTED').length;
  const rejectedApplications = applications.filter(app => app.status === 'REJECTED').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Gradient Header */}
      <div className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white max-w-6xl mx-auto mt-8 mb-6">
        <h2 className="text-2xl font-bold mb-1">My Applications</h2>
        <p className="mb-2">Track the progress of your {totalApplications} job application{totalApplications !== 1 ? 's' : ''}</p>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold">{totalApplications}</span>
          <span className="text-gray-500 text-sm mt-1">Total</span>
        </div>
        <div className="bg-white rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold">{pendingApplications}</span>
          <span className="text-gray-500 text-sm mt-1">Pending</span>
        </div>
        <div className="bg-white rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold">{reviewedApplications}</span>
          <span className="text-gray-500 text-sm mt-1">Reviewed</span>
        </div>
        <div className="bg-white rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold">{shortlistedApplications}</span>
          <span className="text-gray-500 text-sm mt-1">Shortlisted</span>
        </div>
        <div className="bg-white rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold">{interviewedApplications}</span>
          <span className="text-gray-500 text-sm mt-1">Interviewed</span>
        </div>
        <div className="bg-white rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold">{hiredApplications}</span>
          <span className="text-gray-500 text-sm mt-1">Hired</span>
        </div>
        <div className="bg-white rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold">{rejectedApplications}</span>
          <span className="text-gray-500 text-sm mt-1">Rejected</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="max-w-6xl mx-auto flex items-center gap-4 mb-4 px-2">
        <button className="px-4 py-2 border rounded bg-white">All Applications</button>
        <span className="text-gray-500 text-sm">Showing {totalApplications} of {totalApplications} applications</span>
      </div>

      {/* Application Cards */}
      <div className="max-w-6xl mx-auto mb-8 px-2">
        {applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-500">No applications found. Start applying for jobs!</p>
          </div>
        ) : (
          applications.map((application, index) => (
            <div key={application.id || index} className="bg-white rounded-lg shadow p-6 mb-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-bold text-lg">{application.vacancy?.title || 'No title'}</div>
                  <div className="text-gray-600 text-sm">{application.vacancy?.department || 'N/A'}</div>
                  <div className="text-gray-400 text-xs">Applied on {new Date(application.createdAt).toLocaleDateString()}</div>
                </div>
                <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                  {application.status}
                </span>
              </div>
              <div className="bg-gray-50 rounded p-3 mb-4 text-gray-700 text-sm">
                Application has been {application.status?.toLowerCase()?.replace('_', ' ') || 'unknown'}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="font-semibold mb-1">Application Details</div>
                  <div className="text-sm mb-1">Resume: {application.resumeFileName || 'Not uploaded'}</div>
                  <div className="font-semibold mt-3 mb-1">Cover Letter</div>
                  <div className="text-sm text-gray-700">{application.coverLetter || 'No cover letter provided'}</div>
                </div>
                <div>
                  <div className="font-semibold mb-1">Job Details</div>
                  <div className="text-sm mb-1">Department: {application.vacancy?.department || 'N/A'}</div>
                  <div className="text-sm mb-1">Job Type: {application.vacancy?.jobType || 'N/A'}</div>
                  <div className="text-sm mb-1">Salary: {application.vacancy?.salary || 'N/A'}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
