import axios from "axios"
import { config } from "../config"

/**
 * Authentication service functions
 * Handles user sign in, sign up, and token management
 */

/**
 * Sign in user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} Response data with JWT token
 */
export const handleSignIn = async (email, password) => {
    try {
        // create url - updated to match backend endpoint
        const url = `${config.serverURL}/users/signin`
    
        // create a body
        const body = {
          email,
          password,
        }
    
        // call Post API
        const response = await axios.post(url, body)
    
        // check if response is OK
        if (response.status === 200) {
          // Store JWT token in sessionStorage
          const token = response.data;
          sessionStorage.setItem("token", token);
          
          // Return success indicator
          return { success: true, token: token }
        } else {
          // send null result
          return { success: false, error: "Invalid credentials" }
        }
      } catch (ex) {
        console.log(`exception: `, ex)
        return { success: false, error: ex.response?.data?.message || "Login failed" }
      }
}

/**
 * Sign up new user
 * @param {Object} userData - User registration data
 * @returns {Object} Response data with user details
 */
export const handleSignUp = async (userData) => {
    try {
        const url = `${config.serverURL}/users/signup`
        
        const response = await axios.post(url, userData)
        
        if (response.status === 200) {
            return { success: true, data: response.data }
        } else {
            return { success: false, error: "Registration failed" }
        }
    } catch (ex) {
        console.log(`exception: `, ex)
        return { success: false, error: ex.response?.data?.message || "Registration failed" }
    }
}

/**
 * Sign out user (clear tokens)
 */
export const handleSignOut = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("user");
}

/**
 * Get authorization headers with JWT token
 * @returns {Object} Headers object with Authorization
 */
export const getAuthHeaders = () => {
    const token = sessionStorage.getItem("token");
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
}

/**
 * Check if user is authenticated
 * @returns {boolean} True if user has valid token
 */
export const isAuthenticated = () => {
    const token = sessionStorage.getItem("token");
    return !!token;
}
