import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-order-app-c5f57.firebaseio.com/'
});

export default instance;