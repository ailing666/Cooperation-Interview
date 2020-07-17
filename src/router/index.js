// 1.导入
import VueRouter from 'vue-router'
import Vue from 'vue'

// 注册
Vue.use(VueRouter)
// 解决点击同一个路由报错
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
import Login from '@/view/login/Login.vue';
import Layout from '@/view/layout/Layout.vue';
import Subject from '@/view/layout/subject/Subject.vue';
import UserList from '@/view/layout/userList/UserList.vue';
import Chart from '@/view/layout/chart/Chart.vue';
import Business from '@/view/layout/business/Business.vue';
import Question from '@/view/layout/question/Question.vue';
//实例化
const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/Login'
    },
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/Layout',
      component: Layout,
      redirect: '/Layout/Chart',
      children: [
        {
          path: '/Layout/Subject',
          component: Subject,
          meta: {
            title: "学科列表"
          }
        },
        {
          path: '/Layout/UserList',
          component: UserList,
          meta: {
            title: "用户列表"
          }
        },
        {
          path: '/Layout/Chart',
          component: Chart,
          meta: {
            title: "数据概览"
          }
        },
        {
          path: '/Layout/Question',
          component: Question,
          meta: {
            title: "题库列表"
          }
        },
        {
          path: '/Layout/Business',
          component: Business,
          meta: {
            title: "企业列表"
          }
        }
      ]
    }
  ]
})
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 前置路由守卫
router.beforeEach((to, from, next) => {
  window.console.log(to);
  window.console.log(from);
  NProgress.start()
  next()
})
// 路由后置守卫
router.afterEach((to, from) => {
  document.title = to.meta.title
  window.console.log(from);
  NProgress.done()
})
// 注入到Vue
export default router

