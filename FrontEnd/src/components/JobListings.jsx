import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllJobsFromServer } from "../services/applicant";
import { getProfile } from "../services/applicant";
import { toast } from "react-toastify";

export default function JobListings() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [applicant, setApplicant] = useState({
    firstName: "",
    lastName: "",
  });
  const [jobs, setJobs] = useState([]);

  const getAllJobs = async () => {
    try {
      const result = await getAllJobsFromServer(search);
      if (!result) {
        toast.error("Error while loading jobs");
      } else {
        if (result["status"] == "success") {
          setJobs(result["data"]);
        } else {
          toast.error(result["error"]);
        }
      }
    } catch (error) {
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    try {
      const result = await getProfile();
      if (result?.status === "success") {
        setApplicant({
          firstName: result.data.firstName,
          lastName: result.data.lastName,
        });
      }
    } catch (error) {
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    getAllJobs();
    fetchProfile();
  }, []);

  useEffect(() => {
    getAllJobs();
  }, [search]);

  const filteredJobs = jobs.filter((job) => {
    if (!job) return false;
    const searchLower = search.toLowerCase();
    return (
      (job.title && job.title.toLowerCase().includes(searchLower)) ||
      (job.description &&
        job.description.toLowerCase().includes(searchLower)) ||
      (job.department && job.department.toLowerCase().includes(searchLower)) ||
      (job.designation &&
        job.designation.toLowerCase().includes(searchLower)) ||
      (job.location && job.location.toLowerCase().includes(searchLower))
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar  */}
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
            className="font-medium text-gray-700 hover:text-blue-600"
          >
            Dashboard
          </Link>
          <Link
            to="/jobs"
            className="font-medium text-blue-600 px-2 py-1 rounded bg-blue-50"
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
              {applicant.firstName?.[0] || "U"}
            </div>
            <span className="font-medium text-gray-700">
              {applicant.firstName} {applicant.lastName}
            </span>
          </div>
        </div>
      </nav>

      {/*  Header  */}
      <div className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white max-w-6xl mx-auto mt-8 mb-6">
        <h2 className="text-2xl font-bold mb-1">Find Your Dream Job</h2>
        <p className="mb-2">Discover new opportunities from top companies</p>
      </div>

      {/* Search and Filters  */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-4 mb-6 px-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded focus:outline-none"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Job List */}
      <div className="max-w-6xl mx-auto px-2">
        <div className="text-gray-500 text-sm mb-2">
          Showing {filteredJobs.length} of {jobs.length} jobs
        </div>
        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              No jobs found matching your search
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id || job._id}
                className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between border"
              >
                <div className="flex-1">
                  <div className="font-bold text-lg mb-1">{job.title}</div>
                  <div className="text-gray-600 text-sm mb-1">
                    {job.department} {job.location ? "| " + job.location : ""}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                    <span>{job.location}</span>
                  </div>
                  <div className="mb-2 text-gray-700">{job.description}</div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {job.responsibilities?.split(",").map((resp, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-xs px-2 py-1 rounded"
                      >
                        {resp.trim()}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>
                      {job.offeredSalary
                        ? `$${job.offeredSalary.toLocaleString()}`
                        : "Salary not specified"}
                    </span>
                    <span>{job.shiftDetails || "Full-time"}</span>
                    <span>
                      {job.requiredEducation || "Education not specified"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 mt-4 md:mt-0 md:ml-6">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      job.shiftDetails === "Full-time"
                        ? "bg-green-100 text-green-700"
                        : job.shiftDetails === "Part-time"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {(job.shiftDetails || "FULL TIME").toUpperCase()}
                  </span>
                  <Link
                    to={`/apply/${job.id || job._id}`}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
                  >
                    Apply
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
