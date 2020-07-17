// 获取_fetch
import _fetch from './request.js'
// 请求头的token已经在请求拦截中设置
// 获取用户信息
export function getUserInfo() {
  return _fetch({
    url: '/info'
  })
}

// 退出接口
export function logout() {
  return _fetch({
    url: '/logout'
  })
}

