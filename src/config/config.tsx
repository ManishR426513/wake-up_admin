import axios, { AxiosInstance } from "axios";

const appurl="http://localhost:8080"

export const authAxios = (token?: string): AxiosInstance => {
    return axios.create({
        baseURL: `${appurl}/api/admin`,
        headers: {
            'Authorization': `${token ? `${token}` : ''}`,
        },
    });
};