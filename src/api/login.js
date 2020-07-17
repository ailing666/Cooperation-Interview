import _fetch from './request.js'
// 获取短信验证码接口,post.传入参数data
export function getRcode(data) {
  return _fetch({
    url: '/sendsms',
    data,
    method: 'post'
  })
}
// 验证
export function registerUser(data) {
  return _fetch({
    url: '/register',
    method: 'post',
    data //data:data
  })
}
// 登录接口
export function toLogin(data) {
  return _fetch({
    url: '/login',
    data,
    method: 'post'
  })
}