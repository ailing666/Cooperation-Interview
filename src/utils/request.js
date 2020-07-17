import axios from 'axios'
import { Message } from 'element-ui'
import { getLocal, removeToken } from '@/utils/local.js'
import router from '@/router/index.js'

var _fetch = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
})
_fetch.interceptors.request.use(
    function (config) {
        config.headers.token = getLocal()
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)
_fetch.interceptors.response.use(
    function (response) {
        if (response.data.code == 200) {
            return response.data
        } else if (response.data.code == 206) {
            removeToken()
            router.push('/login')
            return Promise.reject('error')
        } else {
            Message.error(response.data.message)
            return Promise.reject('error')
        }
    },
    function (error) {
        return Promise.reject(error)
    }
)
export default _fetch