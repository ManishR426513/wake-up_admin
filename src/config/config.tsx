import axios, { AxiosInstance } from "axios";


export const authAxios = (token?: string): AxiosInstance => {
    return axios.create({
        baseURL: `https://wake-up-backend.onrender.com/api/admin`,
        headers: {
            'Authorization': `${token ? `${token}` : ''}`,
        },
    });
};