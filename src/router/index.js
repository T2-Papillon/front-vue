import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
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
            path: '/mypage',
            name: 'mypage',
            component: () => import('../views/MypageView.vue')
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
