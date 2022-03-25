/* 

import { axios } from 'axios'

// Might be used eventuelly, but not used for now

const developmentURL = 'http://localhost:3000/'
const productionURL = 'https://api.example.com/'

function axiosClient(baseURL) {
  let axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })

  return {
    get(url, params) {
      return axiosInstance.get(url, { params: params }).then(response => response.data).catch(error => console.log(error))
    },
    post(url, data) {
      return axiosInstance.post(url, data).then(response => response.data).catch(error => console.log(error))
    },
    put(url, data) {
      return axiosInstance.put(url, data).then(response => response.data).catch(error => console.log(error))
    },
    delete(url) {
      return axiosInstance.delete(url).then(response => response.data).catch(error => console.log(error))
    },
    patch(url, data) {
      return axiosInstance.patch(url, data).then(response => response.data).catch(error => console.log(error))
    },
  }
}

const apiClient = axiosClient(productionURL)
*/
