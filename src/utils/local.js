// 保存token
export function saveLocal(value) {
  window.localStorage.setItem('token', value)
}

// 获取用户的token
export function getLocal() {
  return window.localStorage.getItem('token')
}

// 移除用户的token
export function removeLocal() {
  window.localStorage.removeItem('token')
}