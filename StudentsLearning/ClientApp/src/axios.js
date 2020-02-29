import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:44385/api/'
});

export default instance;