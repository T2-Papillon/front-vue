<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ProjectTable from '../components/ProjectTable.vue'
import { useProjects } from '@/composables/useProjects'
import SortFilter from '../components/SortFilter.vue'
import globalInfo from '@/utils/globalInfoUtils.js'
import PaginationView from '../components/PaginationView.vue'

const { projects, fetchProjectsForUser, sortByLatest, sortByPriority, currentPage, totalPages } = useProjects()

// 로그인한 사용자의 이름을 저장하기 위한 반응형 참조
const userName = ref(sessionStorage.getItem('NM') || '사용자')

// 프로젝트 상태별로 필터링된 목록을 저장하기 위한 반응형 참조
const todoProjects = ref([])
const doingProjects = ref([])
const doneProjects = ref([])
const holdProjects = ref([])

// 프로젝트 상태별로 필터링하는 함수, projects를 사용하여 필터링합니다.
function filterProjects() {
    todoProjects.value = projects.value.filter((p) => p.status === 'todo')
    doingProjects.value = projects.value.filter((p) => p.status === 'doing')
    doneProjects.value = projects.value.filter((p) => p.status === 'done')
    holdProjects.value = projects.value.filter((p) => p.status === 'hold')
}

onMounted(async () => {
    await fetchProjectsForUser()
    filterProjects()
})
</script>

<template>
    <div class="container">
        <div class="row align-items-start justify-content-between g-3">
            <div class="col-auto">
                <div class="title-area">
                    <h2 class="h2">{{ userName }} 님의 프로젝트 목록 👋</h2>
                    <p class="text-body-tertiary lh-sm mb-0">텍스트텍스트텍스트텍스트</p>
                </div>
            </div>
            <div class="col-auto">
                <div class="top-btn-area">
                    <button class="btn btn-outline-dark me-4">대시보드</button>
                    <button class="btn btn-dark">통계분석</button>
                </div>
            </div>
        </div>

        <section class="row pt-5">
            <div class="col">
                <div class="row align-items-center justify-content-between mb-4 g-3 project-list">
                    <div class="col-auto">
                        <h3 class="h3 fw-light">
                            📌 진행예정 <span class="h3 fw-bold">{{ todoProjects.length }}</span> 건
                        </h3>
                    </div>
                    <!-- <div class="col-auto"> -->
                    <!-- 정렬기준 필터 -->
                    <!-- <SortFilter :sortByLatest="() => sortByLatest(todoProjects)" :sortByPriority="() => sortByPriority(todoProjects)" />
                    </div> -->
                </div>
                <ProjectTable v-if="todoProjects.length > 0" :projects="todoProjects" />
                <PaginationView v-if="todoProjects.length > 0" :currentPage="currentPage" :totalPages="totalPages" />
                <p v-else>프로젝트가 없습니다.</p>
            </div>
        </section>

        <section class="row pt-5">
            <div class="col">
                <div class="row align-items-center justify-content-between mb-4 g-3 project-list">
                    <div class="col-auto">
                        <h3 class="h3 fw-light">
                            📌 진행중 <span class="h3 fw-bold">{{ doingProjects.length }}</span> 건
                        </h3>
                    </div>
                    <!-- <div class="col-auto"> -->
                    <!-- 정렬기준 필터 -->
                    <!-- <SortFilter :sortByLatest="() => sortByLatest(doingProjects)" :sortByPriority="() => sortByPriority(doingProjects)" />
                    </div> -->
                </div>
                <ProjectTable v-if="doingProjects.length > 0" :projects="doingProjects" />
                <PaginationView v-if="doingProjects.length > 0" :currentPage="currentPage" :totalPages="totalPages" />
                <p v-else>프로젝트가 없습니다.</p>
            </div>
        </section>

        <section class="row pt-5">
            <div class="col">
                <div class="row align-items-center justify-content-between mb-4 g-3 project-list">
                    <div class="col-auto">
                        <h3 class="h3 fw-light">
                            📌 완료 <span class="h3 fw-bold">{{ doneProjects.length }}</span> 건
                        </h3>
                    </div>
                    <!-- <div class="col-auto"> -->
                    <!-- 정렬기준 필터 -->
                    <!-- <SortFilter :sortByLatest="() => sortByLatest(doneProjects)" :sortByPriority="() => sortByPriority(doneProjects)" />
                    </div> -->
                </div>
                <ProjectTable v-if="doneProjects.length > 0" :projects="doneProjects" />
                <PaginationView v-if="doneProjects.length > 0" :currentPage="currentPage" :totalPages="totalPages" />
                <p v-else>프로젝트가 없습니다.</p>
            </div>
        </section>

        <section class="row pt-5">
            <div class="col">
                <div class="row align-items-center justify-content-between mb-4 g-3 project-list">
                    <div class="col-auto">
                        <h3 class="h3 fw-light">
                            📌 보류 <span class="h3 fw-bold">{{ holdProjects.length }}</span> 건
                        </h3>
                    </div>
                    <!-- <div class="col-auto"> -->
                    <!-- 정렬기준 필터 -->
                    <!-- <SortFilter :sortByLatest="() => sortByLatest(holdProjects)" :sortByPriority="() => sortByPriority(holdProjects)" />
                    </div> -->
                </div>
                <ProjectTable v-if="holdProjects.length > 0" :projects="holdProjects" />
                <PaginationView v-if="holdProjects.length > 0" :currentPage="currentPage" :totalPages="totalPages" />
                <p v-else>프로젝트가 없습니다.</p>
            </div>
        </section>
    </div>
</template>

<style scoped></style>
