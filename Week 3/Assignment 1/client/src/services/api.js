const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    const message = payload?.message || 'Something went wrong.';
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return payload;
};

const buildHeaders = (token, body) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return {
    headers,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  };
};

export const registerUser = async (data) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    ...buildHeaders(null, data),
  });

  return handleResponse(response);
};

export const loginUser = async (data) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    ...buildHeaders(null, data),
  });

  return handleResponse(response);
};

export const getTasks = async (token) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(response);
};

export const createTask = async (data, token) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    ...buildHeaders(token, data),
  });

  return handleResponse(response);
};

export const updateTask = async (id, data, token) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    ...buildHeaders(token, data),
  });

  return handleResponse(response);
};

export const deleteTask = async (id, token) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(response);
};

export const getTask = async (id, token) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(response);
};
