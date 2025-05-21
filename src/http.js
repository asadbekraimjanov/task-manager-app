import axios from "axios";
import store from "@/store";

const http = axios.create({
    baseURL: 'http://16.170.249.186:8080',
})

http.interceptors.request.use(config => {
    config => {
        const token = store.state.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, error => Promise.reject(error)
})

export default http;
