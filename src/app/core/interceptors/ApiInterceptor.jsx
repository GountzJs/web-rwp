import axios from "axios";
import { useNavigate } from "react-router-dom";
import { environment } from '../../../environments/env.local.js';
import { LocalStorageService } from '../services/LocalStorageService';

export function ApiInterceptor() {
  const axiosInstance = axios.create({ baseURL: environment.url });
  const { isLogin, getToken, logOut } = LocalStorageService();
  const navigate = useNavigate();

  axiosInstance.interceptors.request.use(req => {
    const headers = { ...req.headers, 'Content-Type': 'application/json' };
    if(isLogin()) headers.authorization = 'Bearer ' + getToken();
    req.headers = headers;
    return req;
  });

  axiosInstance.interceptors.response.use( res => res.data, (err) => {
    if(err.response.status === 401) {
      logOut();
      navigate('/');
    };
    return Promise.reject(err.response)
  });

  return axiosInstance;
}