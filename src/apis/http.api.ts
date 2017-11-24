import axios from 'axios'

export function getData (type) {
  return axios.get(`https://jsonplaceholder.typicode.com/${type}`)
    .then(function ajax (response) {
      return response.data
    })
    .catch(function errorAjax (data) {
      console.error(data)
    })
}

export function getSuggestions (search) {
  debugger
  return request('get', 'suggestions', {params: {search}})
}

export function request (type = 'get', endpoint, data = null) {
  return axios[type](`/api/${endpoint}`, data)
    .then(function ajax (response) {
      return response.data
    })
    .catch(function errorAjax (data) {
      console.error(data)
    })
}