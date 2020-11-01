import axios from 'axios';

const uri = "https://myburger-6e2b7.firebaseio.com/";



const instance = axios.create({
    baseURL: uri
});

export default instance;