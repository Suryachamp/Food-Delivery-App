import axios from 'axios';

/**
 * Centered Axios Instance for Production Deployment
 * Base URL is read from environment variables (.env)
 * In development (Vite), this is prefixed with VITE_
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    withCredentials: true,
});

export default api;
