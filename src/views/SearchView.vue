<script setup>
import { ref, watch, onMounted } from 'vue'
import { useProjects } from '@/composables/useProjects'

import CheckboxSelector from '../components/CheckboxSelector.vue'
import ProjectTable from '../components/ProjectTable.vue'
import SortFilter from '../components/SortFilter.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const searchTerm = ref('')
const checkboxItems = ref([
    { id: 'all', name: '전체' },
    { id: 'todo', name: '진행예정' },
    { id: 'doing', name: '진행중' },
    { id: 'done', name: '완료' },
    { id: 'hold', name: '보류' }
])

const selectedCheckboxes = ref(['all'])
const { projects, fetchProjects, isLoading, fetchProjectsByStatus, sortByLatest, sortByPriority } = useProjects()

// 검색 제출 핸들러
const submitSearch = () => {
    if (!searchTerm.value.trim()) {
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
watch(searchTerm, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        fetchProjects(newVal, selectedCheckboxes.value)
    }
})
watch(selectedCheckboxes, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        if (newVal.includes('all')) {
            fetchProjects(searchTerm.value, newVal)
        } else {
            fetchProjectsByStatus(newVal)
        }
    }
})
const handleSelectedItems = (selectedItems) => {
    if (selectedItems.includes('all')) {
        fetchProjects(searchTerm.value, selectedItems)
    } else {
        fetchProjectsByStatus(selectedItems, searchTerm.value)
    }
}
</script>
<template>
    <div class="container">
        <div class="row align-items-center justify-content-center g-3">
            <div class="col d-flex justify-content-center align-items-center">
                <div class="search-area">
                    <div class="title-area">
                        <h2 class="h2 text-center">통합 검색 🔍</h2>
                        <p class="text-body-tertiary lh-sm mb-0"></p>
                    </div>
                </div>
            </div>
        </div>

        <div class="row d-flex align-items-center justify-content-center mx-auto w-50">
            <form @submit.prevent="submitSearch" class="d-flex align-items-center position-relative">
                <input v-model="searchTerm" class="form-control input-search" type="search" placeholder="프로젝트명 또는 이름으로 검색해주세요" aria-label="Search" />
                <button class="btn btn-search" type="submit" aria-label="검색"><i class="bi bi-search"></i></button>
            </form>
        </div>

        <div class="row align-items-center justify-content-between mb-4 g-3 project-list">
            <div class="col-auto">
                <div>
                    <CheckboxSelector :items="checkboxItems" :selected="selectedCheckboxes" @change="handleSelectedItems" />
                </div>
            </div>
            <div class="col-auto d-flex">
                <SortFilter :sortByLatest="sortByLatest" :sortByPriority="sortByPriority" />
            </div>
        </div>

        <!-- 로딩 스피너 및 프로젝트 목록 -->
        <div class="row pb-4">
            <LoadingSpinner v-if="isLoading" />
            <div v-else class="col overflow-auto">
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

.input-search {
    height: 40px;
    border-radius: 30px;
    padding: 10px 60px 10px 20px;
    background-color: #f3f2f2;
}
.btn-search {
    position: absolute;
    right: 21px;
    border-radius: 100%;
    background-color: #f3f2f2;
}
</style>
