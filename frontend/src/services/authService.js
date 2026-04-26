import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Add Authorization header for authenticated requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Only set Content-Type for non-FormData requests
    if (!(config.data instanceof FormData) && !config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json';
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const authService = {
    register: (data) => {
        // For registration with file upload, use FormData
        if (data instanceof FormData) {
            return api.post('/auth/register', data);
        }
        // Fallback for non-FormData (shouldn't happen after fix)
        return api.post('/auth/register', data);
    },
    login: (data) => api.post('/auth/login', data),
    adminLogin: (data) => api.post('/auth/admin-login', data),
};

export const userService = {
    getAllUsers: () => api.get('/users'),
    getUserById: (id) => api.get(`/users/${id}`),
    updateUser: (id, data) => api.put(`/users/${id}`, data),
    deleteUser: (id) => api.delete(`/users/${id}`),
};

export default api;
