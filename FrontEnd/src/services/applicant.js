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
    //create the url for the server
    const url = `${config.serverURL}/user/profile`;
    const token = sessionStorage.getItem("token");

    //create the request body
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
    //send the request to the server and update the user
    const response = await axios.put(url, body, {
      headers: { token },
    });
    if (response.status == 200) {
      return response.data; //return the data from the response
    }
  } catch (ex) {
    console.log(`exception: `, ex);
  }
}
export async function getProfile() {
  try {
    const url = `${config.serverURL}/user/profile`;
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
    let url = `${config.serverURL}/jobs`;
    if (searchTerm.length > 0) {
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
const API_BASE_URL = "http://your-api-base-url.com/api";

export const fetchVacancies = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/vacancies`);
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
    const response = await fetch(`${API_BASE_URL}/vacancies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    const response = await fetch(`${API_BASE_URL}/vacancies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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
    const response = await fetch(`${API_BASE_URL}/vacancies/${id}`, {
      method: "DELETE",
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
