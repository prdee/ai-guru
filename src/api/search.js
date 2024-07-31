import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000',
});

export const getData = async (endpoint, params = {}) => {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const postData = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const fetchSearchResults = async (topic) => {
  try {
    const response = await api.get(`/search/` + topic);
    return response?.data?.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
};

export const fetchVideoDetails = async (title) => {
  try {
    const response = await api.get(`/search/` + title + '/explanation');
    return response?.data?.data?.[0];
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }

}

export const topicActivity = async (payload) => {
  console.log('calling TopicActivity API')
  try {
    const response = await api.post("search/topic/activity", payload);
    return response?.data?.data;
  } catch (e) {
    throw e;
  }
}

export const getPdfData = async (payload) => {
  try {
    const response = await api.post("search/topic/downloadNotes", payload);
    return response?.data?.data;
  } catch (e) {
    throw e;
  }
}

export const getSlidesExplanationData = async (payload) => {
  try {
    const response = await api.post("search/topic/getSlidesExplanationData", payload);
    return response?.data?.data;
  } catch (e) {
    throw e;
  }
}

export const getSlidesExampleData = async (payload) => {
  try {
    const response = await api.post("search/topic/getSlidesExampleData", payload);
    return response?.data?.data;
  } catch (e) {
    throw e;
  }
}

export const getSuggestionData = async (topic) => {
  try {
    const response = await api.get(`/search/` + topic + '/suggestions');
    return response?.data?.data?.[0];
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
}

export const getRecomendedVideos = async () => {
  try {
    const response = await api.get(`search/randomTopics`);
    return response?.data?.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
}

export const getQuizesQuestions = async (body) => {
  try {
    const response = await api.post(`search/topic/quiz`,body);
    return response?.data?.data?.[0] || [];
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
}