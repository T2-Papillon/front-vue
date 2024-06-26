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
            path: '/profile',
            name: 'profile',
            component: () => import('../views/ProfileView.vue'),
            props: true
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
            path: '/project/create',
            name: 'projectCreate',
            component: () => import('../views/ProjectInputView.vue')
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
            path: '/',
            name: 'dashBoard',
            component: () => import('../views/DashboardView.vue'),
            beforeEnter: (to, from, next) => {
                if (sessionStorage.getItem('NM') != null) {
                    next()
                } else {
                    next('/login')
                }
            }
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            component: () => import('../views/404.vue')
        },
        {
            path: '/analyze/:id',
            name: 'analyze',
            component: () => import('../views/AnalyzeView.vue'),
            props: true
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.name === 'login') {
        if (sessionStorage.getItem('NM') != null) {
            next('/')
        } else {
            next()
        }
    } else {
        if (sessionStorage.getItem('NM') != null) {
            next()
        } else {
            next('/login')
        }
    }
})

export default router
