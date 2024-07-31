import axios from 'axios'

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000',
});

export const users = async (body, params = {}) => {
    try {
        const response = await api.post(`users`, body, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const userDetailsById = async (id, params = {}) => {
    try {
        const response = await api.post(`users/login/${id}`, {}, { params });
        return response.data?.data || {};
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const updateLearning = async (body) => {
    try {
        const response = await api.post('/learning/rewatches', body);
        return response.data?.data || {};
    }
    catch (err) {
        throw err;
    }
}

export const userlearningData = async (userId) => {
    try {
        const response = await api.get(`/learning/rewatches/recent/${userId}`);
        return response.data || [];
    }
    catch (err) {
        throw err;
    }
}