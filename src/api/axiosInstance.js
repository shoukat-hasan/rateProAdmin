// /api/axiosInstance.js
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===== // Attach token dynamically from localStorage before each request =====
axiosInstance.interceptors.request.use(
  (config) => {
    const authUser = localStorage.getItem("authUser");
    if (authUser) {
      const user = JSON.parse(authUser);
      if (user.accessToken) {
        config.headers['Authorization'] = `Bearer ${user.accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ===== Response interceptor with refresh token logic =====
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshRes = await axiosInstance.post("/auth/refresh", {}, { withCredentials: true });
        const newAccessToken = refreshRes.data.accessToken;
        // Update localStorage and axios headers
        const authUser  = JSON.parse(localStorage.getItem("authUser") || "{}");
        localStorage.setItem("authUser", JSON.stringify({ ...authUser, accessToken: newAccessToken }));
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("authUser");
        window.location.href = "/login"; // or your logout logic
        return Promise.reject(refreshError);
      }
    }
    // Specific silent fail for login verification
    if (status === 401 && message?.includes("Login verification required")) {
      return Promise.reject(error);
    }
    console.error("📦 API Error:", {
      status,
      message,
      url: originalRequest?.url,
      method: originalRequest?.method,
    });
    return Promise.reject(error);
  }
);

export default axiosInstance;

// ------------------- Auth APIs -------------------
export const forgotPassword = ({ email }) =>
  axiosInstance.post("/auth/forgot-password", { email });

export const verifyResetCode = ({ email, code }) => {
  const payload = {
    email: email.trim(),
    code: code.trim(),
  };
  return axiosInstance.post("/auth/verify-reset-code", payload);
};

export const resetPassword = ({ email, code, newPassword }) =>
  axiosInstance.post("/auth/reset-password", { email, code, newPassword });

export const verifyEmail = ({ email, code }) =>
  axiosInstance.post("/auth/verify-email", { email, code });

export const getCurrentUser = () => axiosInstance.get("/auth/me", { withCredentials: true });

export const updateProfile = (data) =>
  axiosInstance.put("/users/me", data, { withCredentials: true });

export const updateUserProfile = (formData) =>
  axiosInstance.put("/auth/update-profile", formData, { withCredentials: true });

export const uploadAvatar = (file) => {
  const formData = new FormData();
  formData.append("avatar", file);

  return axiosInstance.put("/users/me", formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ------------------- User APIs -------------------
export const toggleUserActiveStatus = (userId) =>
  axiosInstance.put(`/users/toggle/${userId}`);

export const deleteUserById = (id) =>
  axiosInstance.delete(`/users/${id}`);

export const getUserById = (id) =>
  axiosInstance.get(`/users/${id}`);

export const updateUser = (id, data) =>
  axiosInstance.put(`/users/${id}`, data);

export const exportUserPDF = async (userId) => {
  if (!userId) throw new Error("User ID is required for export");
  return await axiosInstance.get(`/users/export/${userId}`, {
    responseType: "blob",
  });
};

export const sendUserNotification = (userId, subject, message) =>
  axiosInstance.post(`/users/notify/${userId}`, {
    subject,
    message,
  });

// ------------------- Company APIs -------------------
export const getCompanyById = (companyId) =>
  axiosInstance.get(`/api/company/${companyId}`);
