import axios from 'axios';

// Create an instance of Axios with a base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
