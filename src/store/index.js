import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //共享数据
    userInfo: "",   //用户信息
    roleObj: {//角色
      1: "超级管理员",
      2: "管理员",
      3: "老师",
      4: "学生"
    },
  }
})
export default store