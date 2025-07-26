import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function MyApplications() {
  const [applicant, setApplicant] = useState(null);
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const applicantRes = await axios.get('/api/applicant');
        setApplicant(applicantRes.data);

        const applicationRes = await axios.get('/api/application');
        setApplication(applicationRes.data);
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

  return (
    <div className="min-h-screen bg-gray-50">
     

      {/* Gradient Header */}
      <div className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white max-w-6xl mx-auto mt-8 mb-6">
        <h2 className="text-2xl font-bold mb-1">My Applications</h2>
        <p className="mb-2">Track the progress of your 1 job application</p>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold">1</span>
          <span className="text-gray-500 text-sm mt-1">Total</span>
        </div>
        <div className="bg-white rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold">0</span>
          <span className="text-gray-500 text-sm mt-1">Pending</span>
        </div>
        <div className="bg-white rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold">1</span>
          <span className="text-gray-500 text-sm mt-1">Reviewed</span>
        </div>
        <div className="bg-white rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold">0</span>
          <span className="text-gray-500 text-sm mt-1">Shortlisted</span>
        </div>
        <div className="bg-white rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold">0</span>
          <span className="text-gray-500 text-sm mt-1">Interviewed</span>
        </div>
        <div className="bg-white rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold">0</span>
          <span className="text-gray-500 text-sm mt-1">Hired</span>
        </div>
        <div className="bg-white rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold">0</span>
          <span className="text-gray-500 text-sm mt-1">Rejected</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="max-w-6xl mx-auto flex items-center gap-4 mb-4 px-2">
        <button className="px-4 py-2 border rounded bg-white">All Applications</button>
        <span className="text-gray-500 text-sm">Showing 1 of 1 applications</span>
      </div>

      {/* Application Card */}
      <div className="max-w-6xl mx-auto mb-8 px-2">
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="font-bold text-lg">{application.job?.title || 'No title'}</div>
              <div className="text-gray-600 text-sm">{application?.job?.department || 'N/A'} Inc.</div>
              <div className="text-gray-400 text-xs">Applied on {application.applied}</div>
            </div>
            <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
              {application.status}
            </span>
          </div>
          <div className="bg-gray-50 rounded p-3 mb-4 text-gray-700 text-sm">
            Application has been {application?.status?.toLowerCase() || 'unknown'}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="font-semibold mb-1">Application Details</div>
              <div className="text-sm mb-1">Experience: {application.experience}</div>
              <div className="text-sm mb-1">Resume: {application.resume}</div>
              <div className="font-semibold mt-3 mb-1">Cover Letter</div>
              <div className="text-sm text-gray-700">{application.coverLetter}</div>
            </div>
            <div>
              <div className="font-semibold mb-1">Skills</div>
              <div className="flex flex-wrap gap-2 mb-2">
             {(application.skills || []).map((skill, i) => (
              <span key={i} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
               {skill}
              </span>
            ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2">
          {(application.links || []).map((link, i) => (
           <a
              key={i}
              href={link.url}
              className="text-blue-600 text-sm hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
