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
const { projects, fetchProjects, fetchProjectsByStatus, sortByLatest, sortByPriority, currentPage, totalPages, changePage: changePageMethod } = useProjects()

const changePage = async (page) => {
    if (page < 1 || page > totalPages.value) {
        return
    }

    currentPage.value = page

    // 현재 진행 상태와 검색어를 고려하여 다음 버튼의 활성화 여부를 결정합니다.
    const isNextButtonEnabled = currentPage.value < totalPages.value
    if (!isNextButtonEnabled) {
    }

    // currentPage 값을 변경한 후에 프로젝트를 다시 불러옵니다.
    await fetchProjects(searchTerm.value, selectedCheckboxes.value)
}

// 페이지 변경 이벤트를 처리하는 메서드를 정의합니다.
const handlePageChange = (page) => {
    // currentPage 값을 변경합니다.
    currentPage.value = page
    // fetchProjects 함수를 호출하여 해당 페이지의 프로젝트를 불러옵니다.
    fetchProjects(searchTerm.value, selectedCheckboxes.value)

    // 페이지 변경 시 다음 버튼의 활성화 여부를 결정합니다.
    const isNextButtonEnabled = currentPage.value < totalPages.value
    if (!isNextButtonEnabled) {
    }
}

// 검색 제출 핸들러
const submitSearch = () => {
    if (!searchTerm.value.trim()) {
        // 검색어가 비어있거나 공백만 있는 경우 알림 표시
        alert('검색어를 입력하세요')
        return
    }
    selectedCheckboxes.value = ['all']
    fetchProjects(searchTerm.value, selectedCheckboxes.value)
}

onMounted(() => {
    fetchProjects(searchTerm.value, selectedCheckboxes.value)
})

// 올바른 검색어 입력까지 프로젝트 데이터가 없다는 문구 출력됨
watch(
    searchTerm,
    (newVal) => {
        fetchProjects(newVal, selectedCheckboxes.value)
    },
    { immediate: true }
)
watch(
    selectedCheckboxes,
    () => {
        if (selectedCheckboxes.value.includes('all')) {
            fetchProjects(searchTerm.value, selectedCheckboxes.value)
        } else {
            // 선택된 진행 상태에 따라 필터링된 프로젝트 목록을 불러오기
            fetchProjectsByStatus(selectedCheckboxes.value)
        }
    },
    { immediate: true }
)
const handleSelectedItems = (selectedItems) => {
    // 선택된 항목을 기반으로 프로젝트를 필터링합니다.
    if (selectedItems.includes('all')) {
        fetchProjects(searchTerm.value, selectedItems) // '전체'를 선택한 경우 검색어와 함께 모든 프로젝트를 불러옴
    } else {
        fetchProjectsByStatus(selectedItems, searchTerm.value)
    }
}
</script>
<template>
    <div class="container">
        <!-- 통합검색 영역 -->
        <div class="row align-items-center justify-content-center g-3">
            <div class="col d-flex justify-content-center align-items-center">
                <div class="search-area">
                    <div class="title-area">
                        <h2 class="h2 text-center">통합 검색 🔍</h2>
                        <p class="text-body-tertiary lh-sm mb-0"><br />프로젝트명 또는 이름을 입력하면 모든 프로젝트를 손쉽게 검색할 수 있습니다!</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="row d-flex align-items-center justify-content-center mx-auto w-50">
            <form @submit.prevent="submitSearch" class="d-flex align-items-center">
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
        <div v-if="projects.length >= 10 || totalPages.value > 1">
            <PaginationView :currentPage="currentPage" :totalPages="totalPages" @update:currentPage="handlePageChange" />
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
