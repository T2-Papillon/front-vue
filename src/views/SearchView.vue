<script>
import axios from 'axios'
import CheckboxSelector from '../components/CheckboxSelector.vue'
import ProjectTable from '../components/ProjectTable.vue'

export default {
    components: {
        CheckboxSelector,
        ProjectTable
    },
    data() {
        return {
            searchTerm: '', // 검색어를 저장하는 상태
            checkboxItems: [
                { id: 'all', name: '전체' },
                { id: 'todo', name: '진행예정' },
                { id: 'doing', name: '진행중' },
                { id: 'done', name: '완료' },
                { id: 'hold', name: '보류' }
            ],
            selectedCheckboxes: [],
            projects: []
        }
    },
    methods: {
        async fetchProjects() {
            try {
                const apiUrl = import.meta.env.VITE_API_URL
                // 검색어가 있을 경우 검색 API 호출, 없을 경우 전체 프로젝트 목록 호출
                const searchPath = this.searchTerm ? `/search/project?searchTerm=${this.searchTerm}` : '/search'
                const response = await axios.get(`${apiUrl}${searchPath}`)
                this.projects = response.data
                const response = await axios.get(`${apiUrl}/search`)
                const formattedProjects = response.data.map(project => ({
                    title: project.projTitle,
                    participants: project.projParticipants,
                    startDate: project.projStartDate,
                    endDate: project.projEndDate,
                    status: project.projStatus,
                    progress: project.projProgress,
                    priority: project.projPriority,
                    writeDate: project.projWriteDate
                }))
                this.projects = formattedProjects
            } catch (error) {
                console.error(error)
            }
        },
        searchProjects() {
            this.fetchProjects() // 검색어 상태를 기반으로 프로젝트 목록을 다시 불러옵니다.
        }
    },
    mounted() {
        this.fetchProjects() // 컴포넌트가 마운트된 후 데이터 호출
    }
}
</script>
<template>
    <div class="inner">
        <!-- 통합검색 영역 -->
        <div class="row align-items-center justify-content-center g-3">
            <div class="col text-center d-flex justify-content-center align-items-center">
                <div class="search-area">
                    <div class="title-area">
                        <h2 class="h2">통합 검색</h2>
                        <p class="text-body-tertiary lh-sm mb-0">검색어를 입력해주세요</p>
                    </div>
                </div>
            </div>
        </div>

        <form @submit.prevent="searchProjects" class="d-flex me-4">
            <input v-model="searchTerm" class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-outline-success" type="submit"><i class="bi bi-search"></i></button>
        </form>
        <!-- 진행상태별 필터링, 정렬기준 필터 기능 -->
        <div class="row align-items-center justify-content-between mb-4 g-3 project-list">
            <div class="col-auto">
                <div>
                    <CheckboxSelector :items="checkboxItems" selectAllId="flexCheckDefault" />
                </div>
            </div>
            <div class="col-auto d-flex">
                <div class="btn-group">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-funnel"></i> 정렬</button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">최신순</a></li>
                        <li><a class="dropdown-item" href="#">우선순위순</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 프로젝트 목록 -->
        <div class="row pb-4">
            <div class="col">
                <!-- 프로젝트 table -->
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
