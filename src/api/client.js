import axios from "axios";
import { ElNotification } from 'element-plus'

axios.defaults.xsrfHeaderName = 'x-csrftoken'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.withCredentials = true

const instance = axios.create({
  baseURL: '',
  headers: {
    "Content-type": "application/json"
  }
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
