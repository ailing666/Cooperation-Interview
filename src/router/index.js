import VueRouter from 'vue-router'
import Vue from 'vue'
import login from '@/views/login/login.vue'
import layout from "@/views/home/layout.vue";
import business from "@/views/home/business/business.vue"
import question from "@/views/home/question/question.vue"
import chart from "@/views/home/chart/chart.vue"
import subject from "@/views/home/subject/subject.vue"
import userlist from "@/views/home/userlist/userlist.vue"


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
        component: login
        , meta: { title: '登录' }
    }, {
        path: "/layout",
        redirect: "/layout/business",
        component: layout,
        children: [
            { path: '/layout/chart', component: chart, meta: { title: '数据概览' } },
            { path: '/layout/userlist', component: userlist, meta: { title: '用户列表' } },
            { path: '/layout/question', component: question, meta: { title: '题库列表' } },
            { path: '/layout/business', component: business, meta: { title: '企业列表' } },
            { path: '/layout/subject', component: subject, meta: { title: '学科列表' } },
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