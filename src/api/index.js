const API_URL = 'https://budget-tracker-ygmt.onrender.com/api'  || 'http://localhost:3000/api';

// Get token from localStorage
function getToken() {
  return localStorage.getItem('token');
}

// Set token to localStorage
export function setToken(token) {
  localStorage.setItem('token', token);
}

// Remove token from localStorage
export function removeToken() {
  localStorage.removeItem('token');
}

// API request helper
async function request(endpoint, options = {}) {
  const token = getToken();
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    }
  };
  
  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  
  return data;
}

// Auth API
export const authAPI = {
  register: (name, email, password) => {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
  },
  
  login: (email, password) => {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },
  
  getMe: () => {
    return request('/auth/me');
  }
};

// Transactions API
export const transactionsAPI = {
  getAll: () => {
    return request('/transactions');
  },
  
  add: (transaction) => {
    return request('/transactions', {
      method: 'POST',
      body: JSON.stringify(transaction)
    });
  },
  
  update: (id, transaction) => {
    return request(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(transaction)
    });
  },
  
  delete: (id) => {
    return request(`/transactions/${id}`, {
      method: 'DELETE'
    });
  }
};
