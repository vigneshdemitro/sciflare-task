import axios, { AxiosResponse } from 'axios';
import config from '../config';

const BASE_URL = config.apiUrl;

const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
}

export const get = async (endpoint: string, authenticate = true) => {
    const url = `${BASE_URL}/${endpoint}`
    let response;
    if (authenticate) {
        response = await axios.get(url, { ...headers })
    } else {
        response = await axios.get(url);
    }
    if (response?.data?.status) {
        return response.data.data;
    }
}

export const post = async (endpoint: string, data: any) => {
    const url = `${BASE_URL}/${endpoint}`
    const response = await axios.post(url, { ...data });
    if (response?.data?.status) {
        if (endpoint === 'auth/login' || '/auth/register') {
            let user = { ...response.data.data };
            delete user.token;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('role', response.data.data.role);
            localStorage.setItem('userId', response.data.data._id);
            return user;
        }
        return response.data.data
    }
}

