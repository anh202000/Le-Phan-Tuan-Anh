import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 0,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json, multipart/form-data',
  },
});

apiClient.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  (error) => {
    return Promise.reject(error);
  }
);
export { apiClient };
