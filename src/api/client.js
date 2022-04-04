import axios from "axios";

axios.defaults.xsrfHeaderName = 'x-csrftoken'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.withCredentials = true

export default axios.create({
  baseURL: '',
  headers: {
    "Content-type": "application/json"
  }
});