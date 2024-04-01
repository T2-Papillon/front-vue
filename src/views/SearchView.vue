<script setup>
import axios from 'axios'
import CheckboxSelector from '../components/CheckboxSelector.vue'
import ProjectTable from '../components/ProjectTable.vue'
import SortFilter from '../components/SortFilter.vue'
import { formatProjectData } from '@/utils/projectUtils'
import { ref, watch, onMounted } from 'vue'
import { useProjects } from '@/composables/useProjects'
import PaginationView from '../components/PaginationView.vue'

const searchTerm = ref('')
const checkboxItems = ref([
    { id: 'all', name: '전체' },
    { id: 'todo', name: '진행예정' },
    { id: 'doing', name: '진행중' },
    { id: 'done', name: '완료' },
    { id: 'hold', name: '보류' }
])
const selectedCheckboxes = ref(['all']) // '전체'가 기본값
const { projects, fetchProjects, fetchProjectsByStatus, sortByLatest, sortByPriority, currentPage, totalPages, changePage } = useProjects()

// 페이지 변경 이벤트를 처리하는 메서드를 정의합니다.
const handlePageChange = (page) => {
    // 페이지 변경 시 수행할 작업을 정의합니다.
    console.log('Page changed:', page)
    // 예시로 currentPage 값을 변경하는 작업을 수행합니다.
    currentPage.value = page
}

onMounted(() => {
    fetchProjects()
})

// 올바른 검색어 입력까지 프로젝트 데이터가 없다는 문구 출력됨
watch(
    searchTerm,
    (newVal) => {
        fetchProjects(newVal)
    },
    { immediate: true }
)
watch(
    selectedCheckboxes,
    () => {
        if (selectedCheckboxes.value.includes('all')) {
            fetchProjects()
        } else {
            // 선택된 진행 상태에 따라 필터링된 프로젝트 목록을 불러오기
            fetchProjectsByStatus(selectedCheckboxes.value)
        }
    },
    { immediate: true }
)
const handleSelectedItems = (selectedItems) => {
    // 중복 선택 방지를 위해 기존 선택된 항목들을 초기화합니다.
    selectedCheckboxes.value = []

    // 새롭게 선택된 항목만 저장합니다.
    selectedCheckboxes.value.push(selectedItems[selectedItems.length - 1])

    // 선택된 항목을 기반으로 프로젝트를 필터링합니다.
    if (selectedItems.includes('all')) {
        fetchProjects()
    } else {
        fetchProjectsByStatus(selectedItems)
    }
}
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
                    <CheckboxSelector :items="checkboxItems" :selected="selectedCheckboxes" @change="handleSelectedItems" />
                </div>
            </div>
            <div class="col-auto d-flex">
                <!-- 정렬기준 필터 -->
                <SortFilter :sortByLatest="sortByLatest" :sortByPriority="sortByPriority" />
            </div>
        </div>

        <!-- 프로젝트 목록 -->
        <div class="row pb-4">
            <div class="col">
                <ProjectTable :projects="projects" />
            </div>
        </div>

        <!-- 페이지네이션 -->
        <PaginationView :currentPage="currentPage" :totalPages="totalPages" @page-changed="handlePageChange" />
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
