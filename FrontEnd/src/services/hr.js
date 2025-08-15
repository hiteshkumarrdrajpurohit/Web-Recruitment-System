import axios from "axios";
import { config } from "../config";
import { getAuthHeaders } from "./auth";

/**
 * HR service functions
 * Handles HR-specific operations like vacancy management, applications, interviews, etc.
 */

/**
 * Get all vacancies for HR dashboard
 */
export async function getAllVacancies() {
  try {
    const url = `${config.serverURL}/vacancies/all`;
    const response = await axios.get(url, {
      headers: getAuthHeaders(),
    });
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (ex) {
    console.log(`exception: `, ex);
    return { success: false, error: ex.response?.data?.message || "Failed to fetch vacancies" };
  }
}

/**
 * Create new vacancy
 */
export async function createVacancy(vacancyData) {
  try {
    const url = `${config.serverURL}/vacancies`;
    const response = await axios.post(url, vacancyData, {
      headers: getAuthHeaders(),
    });
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (ex) {
    console.log(`exception: `, ex);
    return { success: false, error: ex.response?.data?.message || "Failed to create vacancy" };
  }
}

/**
 * Update vacancy
 */
export async function updateVacancy(id, vacancyData) {
  try {
    const url = `${config.serverURL}/vacancies/${id}`;
    const response = await axios.put(url, vacancyData, {
      headers: getAuthHeaders(),
    });
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (ex) {
    console.log(`exception: `, ex);
    return { success: false, error: ex.response?.data?.message || "Failed to update vacancy" };
  }
}

/**
 * Delete vacancy
 */
export async function deleteVacancy(id) {
  try {
    const url = `${config.serverURL}/vacancies/${id}`;
    const response = await axios.delete(url, {
      headers: getAuthHeaders(),
    });
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (ex) {
    console.log(`exception: `, ex);
    return { success: false, error: ex.response?.data?.message || "Failed to delete vacancy" };
  }
}

/**
 * Get all applications
 */
export async function getAllApplications() {
  try {
    const url = `${config.serverURL}/applications`;
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
 * Get applications for a specific vacancy
 */
export async function getApplicationsByVacancy(vacancyId) {
  try {
    const url = `${config.serverURL}/applications/vacancy/${vacancyId}`;
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
 * Update application status
 */
export async function updateApplicationStatus(applicationId, status) {
  try {
    const url = `${config.serverURL}/applications/${applicationId}/status/${status}`;
    const response = await axios.put(url, {}, {
      headers: getAuthHeaders(),
    });
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (ex) {
    console.log(`exception: `, ex);
    return { success: false, error: ex.response?.data?.message || "Failed to update application status" };
  }
}

/**
 * Get HR dashboard statistics
 */
export async function getHRDashboardStats() {
  try {
    const url = `${config.serverURL}/dashboard/hr/stats`;
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
 * Get interviews
 */
export async function getAllInterviews() {
  try {
    const url = `${config.serverURL}/interviews`;
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
 * Schedule a new interview
 */
export async function scheduleInterview(interviewData) {
  try {
    const url = `${config.serverURL}/interviews`;
    const response = await axios.post(url, interviewData, {
      headers: getAuthHeaders(),
    });
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (ex) {
    console.log(`exception: `, ex);
    return { success: false, error: ex.response?.data?.message || "Failed to schedule interview" };
  }
}

/**
 * Update interview status
 */
export async function updateInterviewStatus(interviewId, status) {
  try {
    const url = `${config.serverURL}/interviews/${interviewId}/status/${status}`;
    const response = await axios.put(url, {}, {
      headers: getAuthHeaders(),
    });
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (ex) {
    console.log(`exception: `, ex);
    return { success: false, error: ex.response?.data?.message || "Failed to update interview status" };
  }
}

/**
 * Update interview details
 */
export async function updateInterview(interviewId, interviewData) {
  try {
    const url = `${config.serverURL}/interviews/${interviewId}`;
    const response = await axios.put(url, interviewData, {
      headers: getAuthHeaders(),
    });
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (ex) {
    console.log(`exception: `, ex);
    return { success: false, error: ex.response?.data?.message || "Failed to update interview" };
  }
}

/**
 * Delete interview
 */
export async function deleteInterview(interviewId) {
  try {
    const url = `${config.serverURL}/interviews/${interviewId}`;
    const response = await axios.delete(url, {
      headers: getAuthHeaders(),
    });
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (ex) {
    console.log(`exception: `, ex);
    return { success: false, error: ex.response?.data?.message || "Failed to delete interview" };
  }
}

/**
 * Get interviews by status
 */
export async function getInterviewsByStatus(status) {
  try {
    const url = `${config.serverURL}/interviews/status/${status}`;
    const response = await axios.get(url, {
      headers: getAuthHeaders(),
    });
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (ex) {
    console.log(`exception: `, ex);
    return { success: false, error: ex.response?.data?.message || "Failed to fetch interviews by status" };
  }
}

/**
 * Get interview by ID
 */
export async function getInterviewById(interviewId) {
  try {
    const url = `${config.serverURL}/interviews/${interviewId}`;
    const response = await axios.get(url, {
      headers: getAuthHeaders(),
    });
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (ex) {
    console.log(`exception: `, ex);
    return { success: false, error: ex.response?.data?.message || "Failed to fetch interview details" };
  }
}

/**
 * Create hiring decision
 */
export async function createHiringDecision(decisionData) {
  try {
    const url = `${config.serverURL}/hirings`;
    const response = await axios.post(url, decisionData, {
      headers: getAuthHeaders(),
    });
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (ex) {
    console.log(`exception: `, ex);
    return { success: false, error: ex.response?.data?.message || "Failed to create hiring decision" };
  }
}

/**
 * Get all candidates (users with USER role)
 */
export async function getAllCandidates() {
  try {
    const url = `${config.serverURL}/users/candidates`;
    const response = await axios.get(url, {
      headers: getAuthHeaders(),
    });
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (ex) {
    console.log(`exception: `, ex);
    return { success: false, error: ex.response?.data?.message || "Failed to fetch candidates" };
  }
}

/**
 * Get hiring decisions
 */
export async function getAllHirings() {
  try {
    const url = `${config.serverURL}/hirings`;
    const response = await axios.get(url, {
      headers: getAuthHeaders(),
    });
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (ex) {
    console.log(`exception: `, ex);
    return { success: false, error: ex.response?.data?.message || "Failed to fetch hirings" };
  }
}
