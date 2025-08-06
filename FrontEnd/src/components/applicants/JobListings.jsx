import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getActiveJobListings, applyForJob, checkUserApplication, getUserAppliedJobs } from '../../services/applicant';

export default function JobListings() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load jobs and applied jobs on component mount
  useEffect(() => {
    loadJobs();
    loadAppliedJobs();
  }, []);

  // Load jobs when search, location, or jobType changes
  useEffect(() => {
    loadJobs();
  }, [search, location, jobType]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const response = await getActiveJobListings(search, location, jobType);
      if (response && response.success) {
        setJobs(response.data || []);
      } else {
        setError('Failed to load jobs');
      }
    } catch (error) {
      console.error('Error loading jobs:', error);
      setError('Error loading jobs');
    } finally {
      setLoading(false);
    }
  };

  const loadAppliedJobs = async () => {
    try {
      const response = await getUserAppliedJobs();
      if (response && response.success) {
        const appliedJobIds = response.data.map(app => app.vacancy.id);
        setAppliedJobs(appliedJobIds);
      }
    } catch (error) {
      console.error('Error loading applied jobs:', error);
    }
  };

  const handleApply = async (jobId) => {
    try {
      // Check if already applied
      const checkResponse = await checkUserApplication(jobId);
      if (checkResponse && checkResponse.success && checkResponse.data) {
        alert('You have already applied for this job!');
        return;
      }

      // Apply for the job
      const response = await applyForJob(jobId, '', 'resume.pdf', '/uploads/resume.pdf');
      if (response && response.success) {
        setAppliedJobs(prev => [...prev, jobId]);
        alert('Application submitted successfully!');
      } else {
        alert(response?.message || 'Failed to apply for job');
      }
    } catch (error) {
      console.error('Error applying for job:', error);
      alert('Error applying for job. Please try again.');
    }
  };

  const handleCancelApplication = async (jobId) => {
    // For now, just remove from local state
    // In a real app, you'd want to call an API to cancel the application
    setAppliedJobs(prev => prev.filter(id => id !== jobId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading jobs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Gradient Header */}
      <div className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white max-w-6xl mx-auto mt-8 mb-6">
        <h2 className="text-2xl font-bold mb-1">Find Your Dream Job</h2>
        <p className="mb-2">Discover {jobs.length} opportunities from top companies</p>
      </div>

      {error && (
        <div className="max-w-6xl mx-auto mb-4 px-2">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-4 mb-6 px-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded focus:outline-none"
          placeholder="Search jobs, companies, or keywords..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select 
          className="px-4 py-2 border rounded bg-white"
          value={location}
          onChange={e => setLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Chennai">Chennai</option>
          <option value="Remote">Remote</option>
        </select>
        <select 
          className="px-4 py-2 border rounded bg-white"
          value={jobType}
          onChange={e => setJobType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="FULL_TIME">Full Time</option>
          <option value="PART_TIME">Part Time</option>
          <option value="CONTRACT">Contract</option>
          <option value="INTERNSHIP">Internship</option>
        </select>
      </div>

      {/* Job List */}
      <div className="max-w-6xl mx-auto px-2">
        <div className="text-gray-500 text-sm mb-2">Showing {jobs.length} jobs</div>
        <div className="space-y-6">
          {jobs.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-500">No jobs found matching your criteria.</p>
            </div>
          ) : (
            jobs.map((job, idx) => (
              <div key={job.id || idx} className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between border">
                <div className="flex-1">
                  <div className="font-bold text-lg mb-1">{job.title}</div>
                  <div className="text-gray-600 text-sm mb-1">{job.department} {job.location ? '| ' + job.location : ''}</div>
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                    <span>{job.location}</span>
                  </div>
                  <div className="mb-2 text-gray-700">{job.jobDescription || job.description}</div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {job.reponsibilites && job.reponsibilites.split(',').map((req, i) => (
                      <span key={i} className="bg-gray-100 text-xs px-2 py-1 rounded">{req.trim()}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{job.minSalary && job.maxSalary ? `₹${job.minSalary.toLocaleString()} - ₹${job.maxSalary.toLocaleString()}` : ''}</span>
                    <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 mt-4 md:mt-0 md:ml-6">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${job.employementType === 'FULL_TIME' ? 'bg-green-100 text-green-700' : job.employementType === 'CONTRACT' ? 'bg-purple-100 text-purple-700' : 'bg-gray-200 text-gray-700'}`}>
                    {job.employementType ? job.employementType.replace('_', ' ') : 'FULL TIME'}
                  </span>
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
                        onClick={() => handleCancelApplication(job.id)}
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
            ))
          )}
        </div>
      </div>
    </div>
  );
} 