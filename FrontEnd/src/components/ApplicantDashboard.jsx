import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ApplicantDashboard() {
  const [applicant, setApplicant] = useState(null);
  const [applications, setApplications] = useState([]);
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const applicantRes = await axios.get("/api/applicant");
        setApplicant(applicantRes.data);

        const applicationsRes = await axios.get("/api/applications");
        setApplications(applicationsRes.data?.applications || []);

        const jobsRes = await axios.get("/api/featured-jobs");
        setFeaturedJobs(jobsRes.data?.jobs || []);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading dashboard...
      </div>
    );
  }

  if (!applicant) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">
        Failed to load applicant data.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
            R
          </div>
          <span className="font-bold text-lg">RecruitPro</span>
        </div>
        <div className="flex gap-6 items-center">
          <Link
            to="/applicant-dashboard"
            className="font-medium text-blue-600 px-2 py-1 rounded bg-blue-50"
          >
            Dashboard
          </Link>
          <Link
            to="/jobs"
            className="font-medium text-gray-700 hover:text-blue-600"
          >
            Browse Jobs
          </Link>
          <Link
            to="/my-applications"
            className="font-medium text-gray-700 hover:text-blue-600"
          >
            My Applications
          </Link>
          <Link
            to="/applicant-profile"
            className="font-medium text-gray-700 hover:text-blue-600"
          >
            Profile
          </Link>
          <Link
            to="/settings"
            className="font-medium text-gray-700 hover:text-blue-600"
          >
            Settings
          </Link>
          <div className="ml-4 flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700">
              {applicant.firstName?.[0] || "?"}
            </div>
            <span className="font-medium text-gray-700">
              {applicant.firstName} {applicant.lastName}
            </span>
          </div>
        </div>
      </nav>

      {/* Welcome Card */}
      <div className="max-w-6xl mx-auto mt-8">
        <div className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Welcome back, {applicant.firstName} {applicant.lastName}!
            </h2>
            <p className="mb-4">
              Ready to find your next opportunity? Let's explore the latest job
              openings.
            </p>
            <Link
              to="/jobs"
              className="inline-block px-5 py-2 bg-white text-blue-600 font-semibold rounded shadow hover:bg-blue-50"
            >
              Browse Jobs
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 flex flex-col items-center shadow">
            <span className="text-2xl font-bold">{applications.length}</span>
            <span className="text-gray-500 text-sm mt-1">
              Applications Sent
            </span>
          </div>
          <div className="bg-white rounded-lg p-4 flex flex-col items-center shadow">
            <span className="text-2xl font-bold">
              {applications.filter((app) => app.status === "reviewed").length}
            </span>
            <span className="text-gray-500 text-sm mt-1">In Review</span>
          </div>
          <div className="bg-white rounded-lg p-4 flex flex-col items-center shadow">
            <span className="text-2xl font-bold">
              {applications.filter((app) => app.status === "interview").length}
            </span>
            <span className="text-gray-500 text-sm mt-1">Interviews</span>
          </div>
          
        </div>

        {/* Applications & Featured Jobs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Recent Applications */}
          <div className="bg-white rounded-lg p-6 shadow flex-1">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Recent Applications</h3>
              <Link
                to="/my-applications"
                className="text-blue-600 text-sm hover:underline"
              >
                View all
              </Link>
            </div>
            <div>
              {applications.map((app, idx) => (
                <div
                  key={idx}
                  className="border rounded p-4 flex flex-col gap-1 mb-2 bg-gray-50"
                >
                  <div className="font-medium">{app.job}</div>
                  <div className="text-sm text-gray-500">{app.company}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                      {app.status}
                    </span>
                    <span className="text-xs text-gray-400">
                      Applied {app.applied}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Jobs */}
          <div className="bg-white rounded-lg p-6 shadow flex-1">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Featured Jobs</h3>
              <Link
                to="/jobs"
                className="text-blue-600 text-sm hover:underline"
              >
                View all
              </Link>
            </div>
            <div>
              {featuredJobs.map((job, idx) => (
                <div
                  key={idx}
                  className="border rounded p-4 flex flex-col gap-1 mb-2 bg-gray-50"
                >
                  <div className="font-medium">{job.title}</div>
                  <div className="text-sm text-gray-500">
                    {job.department} {job.location ? "| " + job.location : ""}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                      {job.type || "full-time"}
                    </span>
                    <span className="text-xs text-gray-400">
                      {job.salary
                        ? `${job.salary.currency || "$"}${job.salary.min} - ${
                            job.salary.currency || "$"
                          }${job.salary.max}`
                        : ""}
                    </span>
                  </div>
                  <Link
                    to="/jobs"
                    className="text-blue-600 text-xs hover:underline mt-1"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link
            to="/jobs"
            className="flex items-center gap-3 bg-white rounded-lg p-4 shadow hover:bg-blue-50"
          >
            <span className="bg-blue-100 p-2 rounded">🔍</span>
            <span className="font-medium">Browse Jobs</span>
          </Link>
          <Link
            to="/applicant-profile"
            className="flex items-center gap-3 bg-white rounded-lg p-4 shadow hover:bg-green-50"
          >
            <span className="bg-green-100 p-2 rounded">👤</span>
            <span className="font-medium">Update Profile</span>
          </Link>
          <Link
            to="/my-applications"
            className="flex items-center gap-3 bg-white rounded-lg p-4 shadow hover:bg-purple-50"
          >
            <span className="bg-purple-100 p-2 rounded">📄</span>
            <span className="font-medium">Track Applications</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
