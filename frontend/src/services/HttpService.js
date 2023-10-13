// AxiosService.js

import Axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://trebello-production.up.railway.app/api/'
    : '//localhost:3030/api/'

const axios = Axios.create({
    withCredentials: true
});

async function ajax(endpoint, method = 'get', data = null) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data
        })
        return res.data;
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`);
        console.dir(err);
        if (err.response && err.response.status === 401) {
            throw err;
        }
        throw err;
    }
}

export function get(endpoint, data) {
    return ajax(endpoint, 'GET', data)
}

export function post(endpoint, data) {
    return ajax(endpoint, 'POST', data)
}

export function put(endpoint, data) {
    return ajax(endpoint, 'PUT', data)
}

export function del(endpoint, data) {
    return ajax(endpoint, 'DELETE', data)
}
