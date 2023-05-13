import axios from 'axios';

const service = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 5000,
});

// 添加请求拦截器
service.interceptors.request.use(
    (config) => {
        // 登录请求不需要携带 token
        if (config.url === '/login') {
            return config;
        }

        const token = localStorage.getItem(('token'));
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

// 对 axios 进行二次封装
export function request(config) {
    return new Promise((resolve, reject) => {
        service(config)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}