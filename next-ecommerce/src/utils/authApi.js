// utils/authAPI.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4444'; // Replace with your API URL

export const registerUser = async (username, email, password) => {
  const hashedPassword = btoa(password); // Simple base64 encoding, replace with real encryption if needed
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      username,
      email,
      password: hashedPassword,
    });
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw new Error(error.response?.data?.message || 'Registration error');
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error(error.response?.data?.message || 'Login error');
  }
};

export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Fetching user failed:', error);
    throw new Error(error.response?.data?.message || 'Error fetching user');
  }
};
