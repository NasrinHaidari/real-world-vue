import axios from 'axios'
import NProgress from 'nprogress'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', //The single Axios instance we use for calls
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 20000
})

apiClient.interceptors.request.use(config => {
  NProgress.start()
  return config
})

apiClient.interceptors.response.use(response => {
  NProgress.done()
  return response
})

export default {
  // getEvents() {
  //   return apiClient.get('/events')
  // },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  postEvent(event) {
    return apiClient.post('/events/', event)
  },
  getEvents(perPage, page) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  }
}
