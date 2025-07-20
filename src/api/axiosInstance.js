import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'https://rateprobackend-production.up.railway.app/api',
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Request interceptor (if token based header lagana ho future me)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor for centralized error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;

export const forgotPassword = ({ email }) =>
  axiosInstance.post("/auth/forgot-password", { email });

export const verifyResetCode = ({ email, code }) => {
  const payload = {
    email: email.trim(),
    code: code.trim(),
  };
  console.log("Sending to backend:", payload);
  return axiosInstance.post("/auth/verify-reset-code", payload); // ✅ Return it!
};

export const resetPassword = ({ email, code, newPassword }) =>
  axiosInstance.post("/auth/reset-password", { email, code, newPassword });

export const verifyEmail = ({ email, code }) =>
  axiosInstance.post("/auth/verify-email", { email, code });

export const toggleUserActiveStatus = (userId) =>
  axiosInstance.put(`/users/toggle/${userId}`);

export const deleteUserById = (id) => {
  return axiosInstance.delete(`/users/${id}`);
};