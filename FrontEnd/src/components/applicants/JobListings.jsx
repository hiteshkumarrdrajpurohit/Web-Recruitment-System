import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Indian-style mock applicants
const mockApplicants = [
  {
    firstName: "Amit",
    lastName: "Sharma",
    email: "amit.sharma@example.com",
    phone: "+91-9876543210",
  },
  {
    firstName: "Priya",
    lastName: "Patel",
    email: "priya.patel@example.com",
    phone: "+91-9123456780",
  },
];

const applicant = mockApplicants[0];

// Indian-style mock vacancies
const mockVacancies = [
  {
    id: 1,
    title: "Software Engineer",
    department: "IT",
    location: "Bangalore, Karnataka",
    description: "Develop and maintain web applications for Indian clients.",
    requirements: ["B.Tech/BE in CS/IT", "2+ years experience", "React.js", "Node.js"],
    salary: { min: 600000, max: 1200000 },
    postedDate: "2 days ago",
    type: "Full-time",
  },
  {
    id: 2,
    title: "Data Analyst",
    department: "Analytics",
    location: "Mumbai, Maharashtra",
    description: "Analyze data trends for Indian retail sector.",
    requirements: ["B.Sc/BA in Statistics", "Excel", "SQL", "Power BI"],
    salary: { min: 400000, max: 900000 },
    postedDate: "5 days ago",
    type: "Full-time",
  },
  {
    id: 3,
    title: "HR Executive",
    department: "Human Resources",
    location: "Delhi NCR",
    description: "Manage recruitment and employee engagement for a leading Indian MNC.",
    requirements: ["MBA in HR", "Good communication", "2+ years experience"],
    salary: { min: 350000, max: 700000 },
    postedDate: "1 week ago",
    type: "Full-time",
  },
  {
    id: 4,
    title: "Sales Manager",
    department: "Sales",
    location: "Chennai, Tamil Nadu",
    description: "Lead sales team for South India region.",
    requirements: ["MBA/PGDM", "5+ years experience", "Team management"],
    salary: { min: 800000, max: 1500000 },
    postedDate: "3 days ago",
    type: "Full-time",
  },
  {
    id: 5,
    title: "Content Writer",
    department: "Marketing",
    location: "Remote (India)",
    description: "Write blogs and articles for Indian startups.",
    requirements: ["BA in English", "Excellent writing skills", "SEO knowledge"],
    salary: { min: 250000, max: 500000 },
    postedDate: "Today",
    type: "Contract",
  },
];

export default function JobListings() {
  const [search, setSearch] = useState('');
  // For demo, no filtering logic
  const jobs = mockVacancies;

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
        <div className="text-gray-500 text-sm mb-2">Showing {jobs.length} of {jobs.length} jobs</div>
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
                <a href="#" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold">View Details</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 