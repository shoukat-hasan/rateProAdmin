import axiosInstance from "./axiosInstance";

export const createUser = async (userData) => {
  const response = await axiosInstance.post('/auth/register', userData);
  return response.data;
};
