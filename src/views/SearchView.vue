<script setup>
import axios from 'axios'
import CheckboxSelector from '../components/CheckboxSelector.vue'
import ProjectTable from '../components/ProjectTable.vue'
import SortFilter from '../components/SortFilter.vue'
import { formatProjectData } from '@/utils/projectUtils'
import { ref, watch, onMounted } from 'vue'
import { useProjects } from '@/composables/useProjects'

const searchTerm = ref('')
const checkboxItems = ref([
    { id: 'all', name: '전체' },
    { id: 'todo', name: '진행예정' },
    { id: 'doing', name: '진행중' },
    { id: 'done', name: '완료' },
    { id: 'hold', name: '보류' }
])
const selectedCheckboxes = ref([])
const { projects, fetchProjects } = useProjects()

onMounted(() => {
    console.log('Component mounted, fetching projects...')
    fetchProjects()
})

watch(
    searchTerm,
    (newVal) => {
        fetchProjects(newVal)
    },
    { immediate: true }
)
</script>
<template>
    <div class="inner">
        <!-- 통합검색 영역 -->
        <div class="row align-items-center justify-content-center g-3">
            <div class="col d-flex justify-content-center align-items-center">
                <div class="search-area">
                    <div class="title-area">
                        <h2 class="h2 text-center">통합 검색 🔍</h2>
                        <p class="text-body-tertiary lh-sm mb-0">자유롭게 검색을 시작하세요! 알맞는 검색어를 입력해보세요. >> 멘트아무거나아무거나</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="row d-flex align-items-center justify-content-center mx-auto w-50">
            <form @submit.prevent="fetchProjects(searchTerm)" class="d-flex align-items-center">
                <input v-model="searchTerm" class="form-control me-2" type="search" placeholder="프로젝트명 또는 이름으로 검색해주세요" aria-label="Search" />
                <button class="btn btn-outline-success" type="submit"><i class="bi bi-search"></i></button>
            </form>
        </div>

        <!-- 진행상태별 필터링, 정렬기준 필터 기능 -->
        <div class="row align-items-center justify-content-between mb-4 g-3 project-list">
            <div class="col-auto">
                <div>
                    <!-- 체크박스 -->
                    <CheckboxSelector :items="checkboxItems" :selected="selectedCheckboxes" />
                </div>
            </div>
            <div class="col-auto d-flex">
                <!-- 정렬기준 필터 -->
                <!-- <SortFilter /> -->
                <!-- <SortFilter :sortByLatest="sortByLatest" :sortByPriority="sortByPriority" /> -->
            </div>
        </div>

        <!-- 프로젝트 목록 -->
        <div class="row pb-4">
            <div class="col">
                <ProjectTable :projects="projects" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.project-list {
    padding-top: 100px;
}
.sort-area {
    padding: 0;
}
</style>
