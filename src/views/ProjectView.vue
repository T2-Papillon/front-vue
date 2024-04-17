<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import ProjectTable from '../components/ProjectTable.vue'
import { useProjects } from '@/composables/useProjects'
import SortFilter from '../components/SortFilter.vue'
import globalInfo from '@/utils/globalInfoUtils.js'
import PaginationView from '../components/PaginationView.vue'
import { useRouter } from 'vue-router'

const { projects, fetchProjectsForUser, currentPage, totalPages, searchQuery, changePage, searchProjects } = useProjects()

const userName = ref(sessionStorage.getItem('NM') || '사용자')

// 프로젝트 상태별로 필터링된 목록을 저장하기 위한 반응형 참조
const todoProjects = ref([])
const doingProjects = ref([])
const doneProjects = ref([])
const holdProjects = ref([])

function filterProjects() {
    todoProjects.value = projects.value.filter((p) => p.status === 'todo')
    doingProjects.value = projects.value.filter((p) => p.status === 'doing')
    doneProjects.value = projects.value.filter((p) => p.status === 'done')
    holdProjects.value = projects.value.filter((p) => p.status === 'hold')
}

watch(projects, () => {
    filterProjects()
})

const router = useRouter()
const goToProjectCreatePage = () => {
    router.push({ name: 'projectCreate' })
}

onMounted(async () => {
    await fetchProjectsForUser()
})
</script>

<template>
    <div class="container">
        <div class="row align-items-start justify-content-between g-3">
            <div class="col-auto">
                <div class="title-area mb-3">
                    <h2 class="h2">
                        {{ userName }} 님의<br class="only-mobile" />
                        프로젝트 목록 👋
                    </h2>
                    <p class="text-body-tertiary lh-sm mb-0">참여하신 프로젝트를 진행 상태별로 손쉽게 관리하고 파악하세요!</p>
                </div>
            </div>
            <div class="col-auto d-flex">
                <form class="d-flex me-4" @submit.prevent="searchProjects">
                    <input class="form-control me-2" type="search" placeholder="프로젝트명, 이름으로 검색" aria-label="Search" v-model="searchQuery" />
                    <button class="btn btn-outline-success" type="submit" aria-label="검색"><i class="bi bi-search"></i></button>
                </form>
            </div>
            <!-- <div class="btn-area mt-3 mb-5">
                <button type="button" class="btn btn-primary" @click="goToProjectCreatePage">프로젝트 생성</button>
            </div> -->
        </div>

        <section class="row pt-5">
            <div class="col">
                <div class="row align-items-center justify-content-between mb-4 g-3 project-list">
                    <div class="col-auto">
                        <h3 class="h3 fw-light">
                            📬 진행예정 <span class="h3 fw-bold">{{ todoProjects.length }}</span> 건
                        </h3>
                    </div>
                </div>
                <div class="overflow-auto">
                    <ProjectTable v-if="todoProjects.length > 0" :projects="todoProjects" />
                    <p v-else-if="todoProjects.length === 0" class="empty">아직 비어있어요 👻</p>
                </div>
            </div>
        </section>

        <section class="row pt-5">
            <div class="col">
                <div class="row align-items-center justify-content-between mb-4 g-3 project-list">
                    <div class="col-auto">
                        <h3 class="h3 fw-light">
                            🚗 진행중 <span class="h3 fw-bold">{{ doingProjects.length }}</span> 건
                        </h3>
                    </div>
                </div>
                <div class="overflow-auto">
                    <ProjectTable v-if="doingProjects.length > 0" :projects="doingProjects" />
                    <p v-else-if="doingProjects.length === 0" class="empty">아직 비어있어요 👻</p>
                </div>
            </div>
        </section>

        <section class="row pt-5">
            <div class="col">
                <div class="row align-items-center justify-content-between mb-4 g-3 project-list">
                    <div class="col-auto">
                        <h3 class="h3 fw-light">
                            🎉 완료 <span class="h3 fw-bold">{{ doneProjects.length }}</span> 건
                        </h3>
                    </div>
                </div>
                <div class="overflow-auto">
                    <ProjectTable v-if="doneProjects.length > 0" :projects="doneProjects" />
                    <p v-else-if="doneProjects.length === 0" class="empty">아직 비어있어요 👻</p>
                </div>
            </div>
        </section>

        <section class="row pt-5">
            <div class="col">
                <div class="row align-items-center justify-content-between mb-4 g-3 project-list">
                    <div class="col-auto">
                        <h3 class="h3 fw-light">
                            🧩 보류 <span class="h3 fw-bold">{{ holdProjects.length }}</span> 건
                        </h3>
                    </div>
                </div>
                <div class="overflow-auto">
                    <ProjectTable v-if="holdProjects.length > 0" :projects="holdProjects" />
                    <p v-else-if="holdProjects.length === 0" class="empty">아직 비어있어요 👻</p>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped></style>
