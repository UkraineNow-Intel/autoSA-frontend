import axios from "axios";
import { ElNotification } from 'element-plus'

const instance = axios.create({
  baseURL: '',
  headers: {
    "Content-type": "application/json"
  },
  xsrfHeaderName: 'x-csrftoken',
  xsrfCookieName: 'csrftoken',
  withCredentials: true
});

instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if ("responseURL" in error.request && !error.request.responseURL.includes('whoami') && !error.request.responseURL.includes('login')) {
    ElNotification({
      title: 'Error',
      message: `${error}`,
      type: 'error',
    })
  }
  return Promise.reject(error);
});

export default instance
