import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockVacancies } from '../../data/mockData';

export default function JobListings() {
  const [search, setSearch] = useState('');
  // Filter jobs based on search input (case-insensitive)
  const jobs = mockVacancies.filter(job => {
    const searchLower = search.toLowerCase();
    const title = job.title ? job.title.toLowerCase() : '';
    const department = job.department ? job.department.toLowerCase() : '';
    const location = job.location ? job.location.toLowerCase() : '';
    const description = job.description ? job.description.toLowerCase() : '';
    return (
      title.includes(searchLower) ||
      department.includes(searchLower) ||
      location.includes(searchLower) ||
      description.includes(searchLower)
    );
  });
  const [appliedJobs, setAppliedJobs] = useState([]);

  const handleApply = (jobId) => {
    setAppliedJobs((prev) => [...prev, jobId]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Gradient Header */}
      <div className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white max-w-6xl mx-auto mt-8 mb-6">
        <h2 className="text-2xl font-bold mb-1">Find Your Dream Job</h2>
        <p className="mb-2">Discover {jobs.length} opportunities from top companies</p>
      </div>
      {/* Search and Filters */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-4 mb-6 px-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded focus:outline-none"
          placeholder="Search jobs, companies, or keywords..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="px-4 py-2 border rounded bg-white">All Locations</button>
        <button className="px-4 py-2 border rounded bg-white">All Types</button>
      </div>
      {/* Job List */}
      <div className="max-w-6xl mx-auto px-2">
        <div className="text-gray-500 text-sm mb-2">Showing {jobs.length} of {mockVacancies.length} jobs</div>
        <div className="space-y-6">
          {jobs.map((job, idx) => (
            <div key={job.id || idx} className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between border">
              <div className="flex-1">
                <div className="font-bold text-lg mb-1">{job.title}</div>
                <div className="text-gray-600 text-sm mb-1">{job.department} {job.location ? '| ' + job.location : ''}</div>
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                  <span>{job.location}</span>
                </div>
                <div className="mb-2 text-gray-700">{job.description}</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {job.requirements && job.requirements.map((req, i) => (
                    <span key={i} className="bg-gray-100 text-xs px-2 py-1 rounded">{req}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{job.salary ? `$${job.salary.min.toLocaleString()} - $${job.salary.max.toLocaleString()}` : ''}</span>
                  <span>Posted {job.postedDate}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 mt-4 md:mt-0 md:ml-6">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${job.type === 'Full-time' ? 'bg-green-100 text-green-700' : job.type === 'contract' ? 'bg-purple-100 text-purple-700' : 'bg-gray-200 text-gray-700'}`}>{(job.type || 'FULL TIME').toUpperCase()}</span>
                {appliedJobs.includes(job.id) ? (
                  <div className="flex gap-2 items-center">
                    <button
                      className="mt-2 px-4 py-2 rounded font-semibold bg-gray-400 text-white cursor-not-allowed"
                      disabled
                    >
                      Applied
                    </button>
                    <button
                      className="mt-2 px-3 py-2 rounded font-semibold bg-red-500 text-white hover:bg-red-700"
                      onClick={() => setAppliedJobs(prev => prev.filter(id => id !== job.id))}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="mt-2 px-4 py-2 rounded font-semibold bg-blue-600 text-white hover:bg-blue-700"
                    onClick={() => handleApply(job.id)}
                  >
                    Apply
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 