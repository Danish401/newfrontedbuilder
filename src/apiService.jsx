import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/forms`;

export const fetchForms = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching forms:', error);
    throw error;
  }
};

export const fetchForm = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching form:', error);
    throw error;
  }
};

export const createForm = async (form) => {
  try {
    const response = await axios.post(API_URL, form);
    return response.data;
  } catch (error) {
    console.error('Error creating form:', error);
    throw error;
  }
};

export const updateForm = async (id, form) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, form);
    return response.data;
  } catch (error) {
    console.error('Error updating form:', error);
    throw error;
  }
};

export const deleteForm = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting form:', error);
    throw error;
  }
};
