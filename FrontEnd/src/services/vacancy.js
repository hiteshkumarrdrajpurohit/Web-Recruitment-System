import axios from 'axios';
import { API_BASE_URL } from '../config';

const VACANCY_API = `${API_BASE_URL}/vacancies`;

export const vacancyService = {
    // Get all vacancies with pagination and search
    getAllVacancies: async (searchTerm = '', page = 0, size = 10, sortBy = 'id') => {
        try {
            const response = await axios.get(`${VACANCY_API}`, {
                params: { searchTerm, page, size, sortBy }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching vacancies:', error);
            throw error;
        }
    },

    // Get active job listings with filters and pagination
    getActiveJobListings: async (searchTerm = '', location = '', jobType = '', page = 0, size = 10, sortBy = 'createdAt') => {
        try {
            const response = await axios.get(`${VACANCY_API}/active`, {
                params: { searchTerm, location, jobType, page, size, sortBy }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching active job listings:', error);
            throw error;
        }
    },

    // Get vacancy by ID
    getVacancyById: async (id) => {
        try {
            const response = await axios.get(`${VACANCY_API}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching vacancy by ID:', error);
            throw error;
        }
    },

    // Create new vacancy
    createVacancy: async (vacancyData, hrManagerId) => {
        try {
            console.log('Sending vacancy data:', JSON.stringify(vacancyData, null, 2));
            const response = await axios.post(`${VACANCY_API}?hrManagerId=${hrManagerId}`, vacancyData);
            return response.data;
        } catch (error) {
            console.error('Error creating vacancy:', error);
            console.error('Error response data:', error.response?.data);
            console.error('Error response status:', error.response?.status);
            console.error('Error response headers:', error.response?.headers);
            throw error;
        }
    },

    // Update vacancy
    updateVacancy: async (id, vacancyData) => {
        try {
            const response = await axios.put(`${VACANCY_API}/${id}`, vacancyData);
            return response.data;
        } catch (error) {
            console.error('Error updating vacancy:', error);
            throw error;
        }
    },

    // Delete vacancy
    deleteVacancy: async (id) => {
        try {
            const response = await axios.delete(`${VACANCY_API}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting vacancy:', error);
            throw error;
        }
    }
};
