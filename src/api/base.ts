import axios from 'axios'
import { ElMessage } from 'element-plus'

const instance = axios.create({
  baseURL: 'https://uat-api.51cheyaoshi.com',
  //baseURL: 'https://api.51cheyaoshi.com',
  //baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 20000
})

instance.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('token')) {
      config.headers.authorization = localStorage.getItem('token')
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  (response) => {
    const { data: _data } = response
    const { code, msg } = _data
    if (code !== 0) {
      ElMessage.error({
        message: msg
      })

      return Promise.reject(msg)
    }

    return _data
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default instance
