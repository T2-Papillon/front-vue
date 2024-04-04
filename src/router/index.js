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
            path: '/mypage/:profileName',
            name: 'Mypage',
            component: () => import('../views/MypageView.vue'),
            props: true // 컴포넌트에 URL 파라미터를 props로 전달
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
            name: 'NotFound',
            component: () => import('../views/NotFound.vue')
        },
        {
            path: '/analyze/:id', // `:id`는 프로젝트 번호가 될 동적 세그먼트입니다.
            name: 'Analyze',
            component: () => import('../views/AnalyzeView.vue'),
            props: true // 컴포넌트에 URL 파라미터를 props로 전달하도록 설정
        }
    ]
})

export default router
