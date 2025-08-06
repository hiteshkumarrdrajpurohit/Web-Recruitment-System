import axios from "axios"
import { API_BASE_URL } from "../config"

export const handleSignIn = async (email, password) => {
    try {
        // create url
        const url = `${API_BASE_URL}/users/signin`
    
        // create a body
        const body = {
          email,
          password,
        }
    
        // call Post API
        const response = await axios.post(url, body)
    
        // check if response is OK and has data
        if (response.status === 200 && response.data) {
          if (!response.data.data || !response.data.data.token) {
            console.error('Invalid response format:', response.data);
            return { 
              success: false, 
              message: 'Invalid response from server' 
            };
          }
          return response.data;
        } else {
          return { 
            success: false, 
            message: 'Authentication failed' 
          };
        }
      } catch (ex) {
        console.error('Sign-in error:', ex);
        if (ex.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          return ex.response.data;
        } else if (ex.request) {
          // The request was made but no response was received
          return { success: false, message: 'No response from server. Please try again.' };
        } else {
          // Something happened in setting up the request
          return { success: false, message: 'Error occurred while signing in.' };
        }
      }
    }

export const handleSignUp = async (userData) => {
    try {
        // Validate required fields
        if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
            return {
                success: false,
                message: 'Please fill in all required fields'
            };
        }

        // create url
        const url = `${API_BASE_URL}/users/signup`
    
        // call Post API
        const response = await axios.post(url, userData)
    
        // check if response is OK
        if (response.status == 200) {
          // send the response body
          return response.data
        } else {
          // send null result
          return null
        }
      } catch (ex) {
        console.error('Sign-up error:', ex);
        if (ex.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          return ex.response.data;
        } else if (ex.request) {
          // The request was made but no response was received
          return { success: false, message: 'No response from server. Please try again.' };
        } else {
          // Something happened in setting up the request
          return { success: false, message: 'Error occurred while signing up.' };
        }
      }
    }

export const handleHrManagerSignUp = async (userData) => {
    try {
        // create url
        const url = `${API_BASE_URL}/users/hr-signup`
    
        // call Post API
        const response = await axios.post(url, userData)
    
        // check if response is OK
        if (response.status == 200) {
          // send the response body
          return response.data
        } else {
          // send null result
          return null
        }
      } catch (ex) {
        console.error('HR Manager sign-up error:', ex);
        if (ex.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          return ex.response.data;
        } else if (ex.request) {
          // Network error or server not running
          if (ex.code === 'ERR_NETWORK' || ex.code === 'ERR_CONNECTION_REFUSED') {
            return { 
              success: false, 
              message: 'Unable to connect to the server. Please ensure the backend server is running and try again.'
            };
          }
          return { success: false, message: 'No response from server. Please try again.' };
        } else {
          // Something happened in setting up the request
          return { success: false, message: 'Error occurred while signing up as HR Manager.' };
        }
      }
    }
