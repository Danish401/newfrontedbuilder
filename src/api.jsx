// src/api.js
import axios from 'axios';
const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://newbackendformbuilder.onrender.com"
    : "http://localhost:5000";
const API_BASE_URL = `${BACKEND_URL}/api/forms`;

export const getForms = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching forms:', error);
    throw error;
  }
};

export const getFormById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching form by ID:', error);
    throw error;
  }
};

export const createForm = async (formData) => {
  try {
    const response = await axios.post(API_BASE_URL, formData);
    return response.data;
  } catch (error) {
    console.error('Error creating form:', error);
    throw error;
  }
};

export const updateForm = async (id, formData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error('Error updating form:', error);
    throw error;
  }
};

export const deleteForm = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting form:', error);
    throw error;
  }
};
