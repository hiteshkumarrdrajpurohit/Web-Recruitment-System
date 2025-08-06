import axios from "axios";
import { config } from "../config";

export async function updateProfile(
  firstName,
  lastName,
  email,
  password,
  dateOfBirth,
  phoneNumber,
  skills,
  houseNo,
  streetNo,
  landmark,
  area,
  city,
  state,
  zip,
  country,
  nameOfOrganization,
  startDate,
  endDate,
  designation,
  summary
) {
  try {
    const url = `${config.serverURL}/users/profile`;
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");

    const body = {
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      phoneNumber,
      skills,
      houseNo,
      streetNo,
      landmark,
      area,
      city,
      state,
      zip,
      country,
      nameOfOrganization,
      startDate,
      endDate,
      designation,
      summary,
    };
    
    const response = await axios.put(`${url}/${userId}`, body, {
      headers: { token },
    });
    if (response.status == 200) {
      return response.data;
    }
  } catch (ex) {
    console.log(`exception: `, ex);
  }
}

export async function getProfile() {
  try {
    const userId = sessionStorage.getItem("userId");
    const url = `${config.serverURL}/users/profile/${userId}`;
    const token = sessionStorage.getItem("token");
    const response = await axios.get(url, {
      headers: { token },
    });
    if (response.status == 200) {
      return response.data;
    }
  } catch (ex) {
    console.log(`exception: `, ex);
  }
}

export async function getAllJobsFromServer(searchTerm) {
  try {
    let url = `${config.serverURL}/vacancies`;
    if (searchTerm && searchTerm.length > 0) {
      url += "?searchTerm=" + searchTerm;
    }
    const token = sessionStorage.getItem("token");
    const response = await axios.get(url, {
      headers: { token },
    });
    if (response.status == 200) {
      return response.data;
    }
  } catch (ex) {
    console.log(`exception: `, ex);
  }
}

// New method for getting active job listings
export async function getActiveJobListings(searchTerm, location, jobType) {
  try {
    let url = `${config.serverURL}/vacancies/active`;
    const params = new URLSearchParams();
    
    if (searchTerm && searchTerm.trim()) {
      params.append('searchTerm', searchTerm);
    }
    if (location && location.trim()) {
      params.append('location', location);
    }
    if (jobType && jobType.trim()) {
      params.append('jobType', jobType);
    }
    
    if (params.toString()) {
      url += '?' + params.toString();
    }
    
    const token = sessionStorage.getItem("token");
    const response = await axios.get(url, {
      headers: { token },
    });
    if (response.status == 200) {
      return response.data;
    }
  } catch (ex) {
    console.log(`exception: `, ex);
  }
}

export async function getMyApplications() {
  try {
    const userId = sessionStorage.getItem("userId");
    const url = `${config.serverURL}/applications/user/${userId}`;
    const token = sessionStorage.getItem("token");
    const response = await axios.get(url, {
      headers: { token },
    });
    if (response.status == 200) {
      return response.data;
    }
  } catch (ex) {
    console.log(`exception: `, ex);
  }
}

export async function getApplicationById(applicationId) {
  try {
    const url = `${config.serverURL}/applications/${applicationId}`;
    const token = sessionStorage.getItem("token");
    const response = await axios.get(url, {
      headers: { token },
    });
    if (response.status == 200) {
      return response.data;
    }
  } catch (ex) {
    console.log(`exception: `, ex);
  }
}

export async function createApplication(applicationData) {
  try {
    const url = `${config.serverURL}/applications`;
    const token = sessionStorage.getItem("token");
    const response = await axios.post(url, applicationData, {
      headers: { token },
    });
    if (response.status == 200) {
      return response.data;
    }
  } catch (ex) {
    console.log(`exception: `, ex);
  }
}

// New method for applying to a job
export async function applyForJob(vacancyId, coverLetter, resumeFileName, resumeFilePath) {
  try {
    const userId = sessionStorage.getItem("userId");
    const url = `${config.serverURL}/job-applications/apply`;
    const token = sessionStorage.getItem("token");
    
    const applicationData = {
      userId: parseInt(userId),
      vacancyId: vacancyId,
      coverLetter: coverLetter,
      resumeFileName: resumeFileName,
      resumeFilePath: resumeFilePath
    };
    
    const response = await axios.post(url, applicationData, {
      headers: { token },
    });
    if (response.status == 200) {
      return response.data;
    }
  } catch (ex) {
    console.log(`exception: `, ex);
    throw ex;
  }
}

// New method for checking if user has applied for a job
export async function checkUserApplication(vacancyId) {
  try {
    const userId = sessionStorage.getItem("userId");
    const url = `${config.serverURL}/job-applications/user/${userId}/vacancy/${vacancyId}`;
    const token = sessionStorage.getItem("token");
    const response = await axios.get(url, {
      headers: { token },
    });
    if (response.status == 200) {
      return response.data;
    }
  } catch (ex) {
    console.log(`exception: `, ex);
  }
}

// New method for getting user's applied jobs
export async function getUserAppliedJobs() {
  try {
    const userId = sessionStorage.getItem("userId");
    const url = `${config.serverURL}/job-applications/user/${userId}/applied`;
    const token = sessionStorage.getItem("token");
    const response = await axios.get(url, {
      headers: { token },
    });
    if (response.status == 200) {
      return response.data;
    }
  } catch (ex) {
    console.log(`exception: `, ex);
  }
}

export const fetchVacancies = async () => {
  try {
    const response = await fetch(`${config.serverURL}/vacancies`);
    if (!response.ok) {
      throw new Error("Failed to fetch vacancies");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching vacancies:", error);
    throw error;
  }
};

export const createVacancy = async (vacancyData) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${config.serverURL}/vacancies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": token
      },
      body: JSON.stringify(vacancyData),
    });
    if (!response.ok) {
      throw new Error("Failed to create vacancy");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating vacancy:", error);
    throw error;
  }
};

export const updateVacancy = async (id, vacancyData) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${config.serverURL}/vacancies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "token": token
      },
      body: JSON.stringify(vacancyData),
    });
    if (!response.ok) {
      throw new Error("Failed to update vacancy");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating vacancy:", error);
    throw error;
  }
};

export const deleteVacancy = async (id) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${config.serverURL}/vacancies/${id}`, {
      method: "DELETE",
      headers: {
        "token": token
      }
    });
    if (!response.ok) {
      throw new Error("Failed to delete vacancy");
    }
    return true;
  } catch (error) {
    console.error("Error deleting vacancy:", error);
    throw error;
  }
};
