import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login/login.vue'
import Layout from "@/views/home/layout.vue";
import Business from "@/views/home/business/Business.vue"
import Question from "@/views/home/question/Question.vue"
import Chart from "@/views/home/chart/Chart.vue"
import Subject from "@/views/home/subject/Subject.vue"
import Userlist from "@/views/home/userlist/Userlist.vue"


Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  routes: [{
    path: '/',
    redirect: '/login'
    , meta: { title: '登录' }
  }, {
    path: "/login",
    component: Login
    , meta: { title: '登录' }
  }, {
    path: "/layout",
    redirect: "/layout/business",
    component: Layout,
    children: [
      { path: '/layout/chart', component: Chart, meta: { title: '数据概览' } },
      { path: '/layout/userlist', component: Userlist, meta: { title: '用户列表' } },
      { path: '/layout/question', component: Question, meta: { title: '题库列表' } },
      { path: '/layout/business', component: Business, meta: { title: '企业列表' } },
      { path: '/layout/subject', component: Subject, meta: { title: '学科列表' } },
    ]
  }]
})
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
})
router.afterEach((to) => {
  NProgress.done()
  document.title = to.meta.title
})
export default router
