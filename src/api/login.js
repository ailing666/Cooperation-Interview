import axios from 'axios'
import { Message } from 'element-ui'

var _fetch = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
})
_fetch.interceptors.request.use(
    function (config) {
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
        } else {
            Message.error(response.data.message)
            return Promise.reject('error')
        }
    },
    function (error) {
        return Promise.reject(error)
    }
)
function getRcode(data) {
    return _fetch({
        url: '/sendsms',
        data: data,
        method: 'post'
    })
}
function registerUser(data) {
    return _fetch({
        url: '/register',
        method: 'post',
        data: data
    })
}
function toLogin(data) {
    return _fetch({
        url: '/login',
        method: 'post',
        data: data
    })
}
export { getRcode, registerUser, toLogin }
