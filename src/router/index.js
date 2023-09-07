import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    //
    {
        path: '/finance',
        name: 'finance',
        component: () => import(/* webpackChunkName: "about" */ '../views/FinanceView.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
    },
    // {
    //     path: '/students',
    //     name: 'students',
    //     component: () => import('../views/Students.vue')
    // },
    // {
    //     path: '/students/:id',
    //     name: 'studentInfo',
    //     component: () => import('../views/StudentInfo.vue'),
    //     props:true
    // },
    // {
    //     path: '/student',
    //     redirect:'/students'
    // },
    // {
    //     path: '/:catchAll(.*)',
    //     name: 'notFound',
    //     component: () => import('../views/NotFound.vue')
    // }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router