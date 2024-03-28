<script>
import axios from 'axios'
import CheckboxSelector from '../components/CheckboxSelector.vue'
import ProjectTable from '../components/ProjectTable.vue'
import SortFilter from '../components/SortFilter.vue'

export default {
    components: {
        CheckboxSelector,
        ProjectTable,
        SortFilter
    },
    data() {
        return {
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
                const response = await axios.get(`${apiUrl}/search`)
                const formattedProjects = response.data.map((project) => ({
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
            <form class="d-flex align-items-center">
                <input class="form-control me-2" type="search" placeholder="프로젝트명 또는 이름으로 검색해주세요" aria-label="Search" />
                <button class="btn btn-outline-success" type="submit"><i class="bi bi-search"></i></button>
            </form>
        </div>

        <div class="row align-items-center justify-content-between mb-4 g-3 project-list">
            <div class="col-auto">
                <div>
                    <!-- 체크박스 -->
                    <CheckboxSelector :items="checkboxItems" selectAllId="flexCheckDefault" />
                </div>
            </div>
            <div class="col-auto d-flex">
                <!-- 정렬기준 필터 -->
                <!-- <SortFilter /> -->
                <SortFilter :sortByLatest="sortByLatest" :sortByPriority="sortByPriority" />
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
