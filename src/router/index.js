import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        },
        {
            path: '/analyze',
            name: 'analyze',
            component: () => import('../views/AnalyzeView.vue')
        },
        {
            path: '/kit',
            name: 'kit',
            component: () => import('../views/KitView.vue')
        },
        {
            path: '/search',
            name: 'search',
            component: () => import('../views/SearchView.vue')
        },
        {
            path: '/project',
            name: 'project',
            component: () => import('../views/ProjectView.vue')
        },
        {
            path: '/project/detail/:id',
            name: 'projectdetail',
            component: () => import('../views/ProjectDetailView.vue')
        },
        {
            path: '/project/detail/:projectId/task/save',
            name: 'taskInput',
            component: () => import('../views/TaskInputView.vue')
        },
        {
            path: '/project/detail/:projectId/task/:taskId/edit',
            name: 'taskedit',
            component: () => import('../views/TaskInputView.vue'),
            props: true
        },
        {
            path: '/dashboard',
            name: 'dashBoard',
            component: () => import('../views/DashboardView.vue'),
            beforeEnter: (to, from, next) => {
                if (sessionStorage.getItem('NM') != null) {
                    next()
                } else {
                    next('/login')
                }
            }
        }
    ]
})

export default router
