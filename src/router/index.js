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
            component: () => import('../views/ProjectView.vue'),
<<<<<<< HEAD
        },
        {
            path: '/project/detail/:id',
            name: 'projectdetail',
=======
            children: [
                {
                    // '/project/detail/:id' 형태로 경로를 정의
                    path: 'detail/:id',
                    name: 'projectDetail',
                    component: () => import('../views/ProjectDetailView.vue')
                },
                {
                    path: 'detail/:id/task',
                    name: 'task',
                    component: () => import('../views/TaskInput.vue')
                }
            ]
        },
        {
            path: '/project/detail',
            name: 'detail',
>>>>>>> 5c3314cf127f3b8cfa4a83f4f979777734ea302f
            component: () => import('../views/ProjectDetailView.vue')
        }
    ]
})

export default router
