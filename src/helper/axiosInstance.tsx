import axios from 'axios';
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
axios.interceptors.request.use(
  config=>{
    if(!(config.data instanceof FormData)){
      config.headers['Content-Type']='application/json'
    }
    return config
  }
)