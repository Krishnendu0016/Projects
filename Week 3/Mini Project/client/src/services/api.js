const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = (token, extraHeaders = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...extraHeaders,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  });

  return response.json();
};

export const loginUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  });

  return response.json();
};

export const getTasks = async (token) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'GET',
    headers: getAuthHeaders(token),
  });

  return response.json();
};

export const getTask = async (token, id) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'GET',
    headers: getAuthHeaders(token),
  });

  return response.json();
};

export const createTask = async (token, taskData) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(taskData),
  });

  return response.json();
};

export const updateTask = async (token, id, taskData) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: JSON.stringify(taskData),
  });

  return response.json();
};

export const deleteTask = async (token, id) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(token),
  });

  return response.json();
};
