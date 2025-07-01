import axios, { AxiosInstance } from "axios";


export const authAxios = (token?: string): AxiosInstance => {
    
    return axios.create({
      //  baseURL: `https://wake-up-backend.onrender.com/api/admin`,
       // baseURL: `https://wakeup.tok.works/api/admin`,
       baseURL:`${import.meta.env.VITE_BASE_URL}/api/admin`,
        headers: {
            'Authorization': `${token ? `${token}` : ''}`,
        },
    });
};