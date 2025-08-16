import axios from "axios";
import { config } from "../config";
import { getAuthHeaders } from "./auth";

/**
 * Applicant service functions
 * Handles applicant-specific operations like profile, job applications, etc.
 */

/**
 * Update user profile
 */
export async function updateProfile(profileData) {
  try {
    const url = `${config.serverURL}/users/profile`;
    const response = await axios.put(url, profileData, {
      headers: getAuthHeaders(),
    });
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (ex) {
    console.log(`exception: `, ex);
    return { success: false, error: ex.response?.data?.message || "Profile update failed" };
  }
}

/**
 * Get user profile
 */
export async function getProfile() {
  try {
    const url = `${config.serverURL}/users/profile`;
    const response = await axios.get(url, {
      headers: getAuthHeaders(),
    });
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (ex) {
    console.log(`exception: `, ex);
    return { success: false, error: ex.response?.data?.message || "Failed to fetch profile" };
  }
}

/**
 * Get all available job vacancies
 */
export async function getAllJobs(searchTerm = "") {
  try {
    let url = `${config.serverURL}/vacancies`;
    if (searchTerm.length > 0) {
      url += `/search?title=${encodeURIComponent(searchTerm)}`;
    }
    
    const response = await axios.get(url);
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (ex) {
    console.log(`exception: `, ex);
    return { success: false, error: ex.response?.data?.message || "Failed to fetch jobs" };
  }
}

/**
 * Get job vacancy by ID
 */
export async function getJobById(jobId) {
  try {
    const url = `${config.serverURL}/vacancies/${jobId}`;
    const response = await axios.get(url);
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (ex) {
    console.log(`exception: `, ex);
    return { success: false, error: ex.response?.data?.message || "Failed to fetch job details" };
  }
}

/**
 * Apply for a job
 */
export async function applyForJob(vacancyId, coverLetter = "") {
  try {
    const url = `${config.serverURL}/applications/apply`;
    const params = new URLSearchParams({
      vacancyId: vacancyId.toString(),
      ...(coverLetter && { coverLetter })
    });
    
    const response = await axios.post(`${url}?${params}`, {}, {
      headers: getAuthHeaders(),
    });
    
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (ex) {
    console.log(`exception: `, ex);
    return { success: false, error: ex.response?.data?.message || "Failed to apply for job" };
  }
}

/**
 * Get user's applications
 */
export async function getMyApplications() {
  try {
    const url = `${config.serverURL}/applications/my`;
    const response = await axios.get(url, {
      headers: getAuthHeaders(),
    });
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (ex) {
    console.log(`exception: `, ex);
    return { success: false, error: ex.response?.data?.message || "Failed to fetch applications" };
  }
}

/**
 * Get interviews by application ID (applicant-accessible)
 */
export async function getInterviewsByApplication(applicationId) {
  try {
    const url = `${config.serverURL}/interviews/application/${applicationId}`;
    const response = await axios.get(url, {
      headers: getAuthHeaders(),
    });
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (ex) {
    console.log(`exception: `, ex);
    return { success: false, error: ex.response?.data?.message || "Failed to fetch interviews" };
  }
}

/**
 * Check if user has already applied for a specific vacancy
 */
export async function hasAppliedForVacancy(vacancyId) {
  try {
    const url = `${config.serverURL}/applications/check-applied/${vacancyId}`;
    const response = await axios.get(url, {
      headers: getAuthHeaders(),
    });
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (ex) {
    console.log(`exception: `, ex);
    return { success: false, error: ex.response?.data?.message || "Failed to check application status" };
  }
}

/**
 * Get dashboard statistics for applicant
 */
export async function getApplicantDashboardStats() {
  try {
    const url = `${config.serverURL}/dashboard/applicant/stats`;
    const response = await axios.get(url, {
      headers: getAuthHeaders(),
    });
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (ex) {
    console.log(`exception: `, ex);
    return { success: false, error: ex.response?.data?.message || "Failed to fetch dashboard stats" };
  }
}

/**
 * Search jobs by criteria
 */
export async function searchJobs(title, department, location) {
  try {
    const url = `${config.serverURL}/vacancies/search`;
    const params = new URLSearchParams();
    if (title) params.append('title', title);
    if (department) params.append('department', department);
    if (location) params.append('location', location);
    
    const response = await axios.get(`${url}?${params}`);
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (ex) {
    console.log(`exception: `, ex);
    return { success: false, error: ex.response?.data?.message || "Failed to search jobs" };
  }
}
