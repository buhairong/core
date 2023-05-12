import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router/index'

const instance = axios.create({
  //baseURL: 'https://uat-api.51cheyaoshi.com',
  //baseURL: 'https://api.51cheyaoshi.com',
  baseURL: import.meta.env.MODE === 'development' ? '/api' : 'https://api.51cheyaoshi.com',
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
    const { data, code, msg } = _data

    if (code === 401001) {
      ElMessage.error({
        message: msg
      })

      router.push('/login')
      return Promise.reject(msg)
    } else if (code !== 0) {
      ElMessage.error({
        message: msg
      })

      return Promise.reject(msg)
    }

    return data
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default instance
