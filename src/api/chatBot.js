import axios from 'axios'

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000',
});

export const getMessages = async (topic, params = {}) => {
    try {
        const response = await api.get(`?topic=${topic}`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const sendMessage = async (body, params = {}) => {
    try {
        const response = await api.post(`chatbot`,body, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};