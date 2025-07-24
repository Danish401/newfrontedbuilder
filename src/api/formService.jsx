// src/api/formService.js
import axios from 'axios';
const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://newbackendformbuilder.onrender.com"
    : "http://localhost:5000";
const API_URL = `${BACKEND_URL}/api/forms`;

export const getForms = async (userId) => {
  let url = API_URL;
  if (userId) {
    url += `?userId=${userId}`;
  }
  const response = await axios.get(url);
  return response.data;
};

export const getFormById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createForm = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error;
    }
    throw new Error('Network error');
  }
};

export const updateForm = async (id, formData) => {
  const response = await axios.put(`${API_URL}/${id}`, formData);
  return response.data;
};

export const deleteForm = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
