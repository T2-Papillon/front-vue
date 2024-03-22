import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectDetailsView from '../views/ProjectDetailsView.vue'

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
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        },
        {
            path: '/kit',
            name: 'kit',
            component: () => import('../views/KitView.vue')
        },

        {
            path: '/project',
            name: 'project',
            component: () => import('../views/ProjectView.vue'),
            children: [
                {
                    path: ':id',
                    name: 'project-details',
                    component: ProjectDetailsView // 새로운 하위 페이지 컴포넌트 지정
                }
            ]
        },
        {
            path: '/test',
            name: 'test',
            component: () => import('../views/AxiosTest.vue')
        }
    ]
})

export default router
