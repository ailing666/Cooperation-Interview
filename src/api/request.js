// 提取出axios副本
import axios from 'axios'
// 单独引入 element的message  Message代表this.$message
import { Message } from 'element-ui'
import { getLocal, removeLocal } from '@/utils/local.js'
// 导入路由
import router from '@/router/index.js'
// 创建axios副本
let _fetch = axios.create({
  // 基地址
  baseURL: process.env.VUE_APP_URL,
  // 跨域携带cookie
  withCredentials: true
})
// 添加请求拦截器
_fetch.interceptors.request.use(
  function (config) {
    // 在发送请求之前获取用户的token并赋值给请求头的token
    config.headers.token = getLocal()
    return config
  }, function (error) {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
_fetch.interceptors.response.use(
  function (response) {
    // 当返回码是200时,说明是正确的
    if (response.data.code == 200) {
      return response.data
      // 如果是206,说明是非法请求
    } else if (response.data.code == 206) {
      // 删除token
      removeLocal()
      //跳转至登陆页
      router.push('/login')
      // 抛出异常
      return Promise.reject('error')
    } else {
      // 弹出错误信息
      Message.error(response.data.message)
      // 不执行后面的.then,抛出一个错误中止后面.then的执行
      return Promise.reject('error')
    }
  }, function (error) {
    return Promise.reject(error)
  }
)
// 只有一个文件需要暴露时,用export default
export default _fetch
