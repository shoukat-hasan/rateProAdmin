// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Optional: Request interceptor (if token based header lagana ho future me)
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem('accessToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// // Response interceptor for centralized error handling
// // axiosInstance.interceptors.response.use(
// //   (response) => response,
// //   (error) => {
// //     console.error('API Error:', error.response?.data?.message || error.message);
// //     return Promise.reject(error);
// //   }
// // );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const message = error.response?.data?.message || error.message;

//     // ✅ Don't log if it's OTP login verification message
//     if (
//       error.response?.status === 401 &&
//       message?.includes("Login verification required")
//     ) {
//       // Optional: log softly or do nothing
//       return Promise.reject(error); // silent fail, frontend will handle
//     }

//     // All other errors log normally
//     console.error("API Error:", message);
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

// export const forgotPassword = ({ email }) =>
//   axiosInstance.post("/auth/forgot-password", { email });

// export const verifyResetCode = ({ email, code }) => {
//   const payload = {
//     email: email.trim(),
//     code: code.trim(),
//   };
//   console.log("Sending to backend:", payload);
//   return axiosInstance.post("/auth/verify-reset-code", payload); // ✅ Return it!
// };

// export const resetPassword = ({ email, code, newPassword }) =>
//   axiosInstance.post("/auth/reset-password", { email, code, newPassword });

// export const verifyEmail = ({ email, code }) =>
//   axiosInstance.post("/auth/verify-email", { email, code });

// export const toggleUserActiveStatus = (userId) =>
//   axiosInstance.put(`/users/toggle/${userId}`);

// export const deleteUserById = (id) => {
//   return axiosInstance.delete(`/users/${id}`);
// };

// export const getUserById = (id) => axiosInstance.get(`/users/${id}`)

// // export const updateUser = (id, data) => {
// //   const formData = new FormData();

// //   if (data.name) formData.append("name", data.name);
// //   if (data.role) formData.append("role", data.role);

// //   // 👇 This ensures only boolean is sent
// //   if (typeof data.isActive === "boolean") {
// //     formData.append("isActive", data.isActive);
// //   }

// //   // 👇 Only send avatar if it's a File instance
// //   if (data.avatar instanceof File) {
// //     formData.append("avatar", data.avatar);
// //   }

// //   return axiosInstance.put(`/users/${id}`, formData, {
// //     headers: {
// //       "Content-Type": "multipart/form-data",
// //     },
// //   });
// // };.

// // export const updateUser = (id, data) => {
// //   return axios.put(`/users/${id}`, data, {
// //     headers: {
// //       "Content-Type": "multipart/form-data",
// //     },
// //   });
// // };


// export const updateUser = (id, data) => axiosInstance.put(`/users/${id}`, data);
// // export const updateUser = (id, data) => {
// //   const formData = new FormData();

// //   formData.append("name", data.name);
// //   formData.append("email", data.email);
// //   formData.append("role", data.role);
// //   formData.append("isActive", data.status === "Active");

// //   // Only include password if it's being updated
// //   if (data.password) {
// //     formData.append("password", data.password);
// //   }

// //   // Only include avatar if it was changed
// //   if (data.avatar instanceof File) {
// //     formData.append("avatar", data.avatar);
// //   }

// //   return axiosInstance.put(`/users/${id}`, formData, {
// //     headers: {
// //       "Content-Type": "multipart/form-data",
// //     },
// //   });
// // };

// export const exportUserPDF = async (userId) => {
//   if (!userId) throw new Error("User ID is required for export");
//   const response = await axiosInstance.get(`/users/export/${userId}`, {
//     responseType: "blob",
//   });
//   return response;
// };

// export const getCurrentUser = () => axiosInstance.get("/auth/me")

// export const updateProfile = (data) =>
//   axiosInstance.put("/users/me", data, {
//     withCredentials: true,
//     headers: {
//       "Content-Type": "application/json"
//     }
//   });


// export const updateUserProfile = (formData) =>
//   axiosInstance.put("/auth/update-profile", formData, {
//     withCredentials: true,
//     headers: {
//       // "Content-Type": "multipart/form-data", // Required if avatar is included
//       "Content-Type": "application/json",
//     },
//   });

// export const sendUserNotification = async (userId, subject, message) => {
//   return await axiosInstance.post(`/users/notify/${userId}`, {
//     subject,
//     message,
//   });
// };

// export const uploadAvatar = async (file) => {
//   const formData = new FormData();
//   formData.append("avatar", file);

//   const response = await axiosInstance.put("/auth/upload-avatar", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return response.data;
// };

// export const getCompanyById = (companyId) =>
//   axios.get(`/api/company/${companyId}`);

// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   withCredentials: true, // send cookies
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Optional: Add token manually in future if needed
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // const token = localStorage.getItem('accessToken');
//     // if (token) {
//     //   config.headers.Authorization = `Bearer ${token}`;
//     // }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // 🔄 Refresh token logic
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) prom.reject(error);
//     else prom.resolve(token);
//   });
//   failedQueue = [];
// };

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const originalRequest = error.config;
//     const message = error.response?.data?.message || error.message;

//     // Silent fail for specific OTP login message
//     if (
//       error.response?.status === 401 &&
//       message?.includes("Login verification required")
//     ) {
//       return Promise.reject(error);
//     }

//     // 👉 If 401 AND not already retried — refresh logic temporarily disabled
//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry
//     ) {
//       console.warn("Access token expired or unauthorized. Refresh logic disabled for now.");
//       // You could optionally redirect to login here if needed
//       // window.location.href = "/login";
//       return Promise.reject(error);
//     }

//     // Other errors
//     console.error("API Error:", message);
//     return Promise.reject(error);
//   }
// );


// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     const message = error.response?.data?.message || error.message;

//     // Silent fail for specific OTP login message
//     if (
//       error.response?.status === 401 &&
//       message?.includes("Login verification required")
//     ) {
//       return Promise.reject(error);
//     }

//     // 👉 If 401 AND not already retried
//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then(() => axiosInstance(originalRequest))
//           .catch((err) => Promise.reject(err));
//       }

//       isRefreshing = true;

//       try {
//         await axiosInstance.get("/auth/refresh-token"); // 🔁 get new accessToken via cookie
//         processQueue(null);
//         return axiosInstance(originalRequest); // ✅ Retry original request
//       } catch (refreshErr) {
//         processQueue(refreshErr, null);
//         // ❌ Refresh failed → logout
//         console.error("Refresh token expired or invalid.");
//         // Optional: redirect to login
//         // window.location.href = "/login";
//         return Promise.reject(refreshErr);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     // Other errors
//     console.error("API Error:", message);
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===== Optional: Authorization Header if needed later =====
axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('accessToken');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ===== Clean Response Interceptor (No Refresh Token) =====
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    // 🎯 Specific silent fail (e.g. login OTP verification)
    if (status === 401 && message?.includes("Login verification required")) {
      return Promise.reject(error);
    }

    // 🧨 Other errors
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

export const getCurrentUser = () => axiosInstance.get("/auth/me");

export const updateProfile = (data) =>
  axiosInstance.put("/users/me", data);

export const updateUserProfile = (formData) =>
  axiosInstance.put("/auth/update-profile", formData);

export const uploadAvatar = (file) => {
  const formData = new FormData();
  formData.append("avatar", file);

  return axiosInstance.put("/auth/upload-avatar", formData, {
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
