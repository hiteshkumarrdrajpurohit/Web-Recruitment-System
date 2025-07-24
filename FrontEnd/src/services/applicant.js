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
