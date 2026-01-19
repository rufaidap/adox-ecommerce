
import axios from 'axios';

const restClient = axios.create({
  baseURL: 'http://localhost:4000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

restClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors here if needed
    return Promise.reject(error);
  }
);

export default restClient;
