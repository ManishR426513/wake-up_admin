import axios, { AxiosInstance } from "axios";

export const authAxios = (): AxiosInstance => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api/admin`,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};
