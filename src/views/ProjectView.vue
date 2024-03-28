<script>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import ProjectTable from '../components/ProjectTable.vue'

export default {
    components: {
        ProjectTable
    },
    setup() {
        const projects = ref([])

        // 프로젝트 데이터를 API에서 가져오는 함수
        async function fetchProjects() {
            try {
                const apiUrl = import.meta.env.VITE_API_URL
                const response = await axios.get(`${apiUrl}/search`)
                projects.value = response.data
            } catch (error) {
                console.error('Error fetching projects:', error)
            }
        }

        onMounted(fetchProjects)
        const todoProjects = computed(() => projects.value.filter((p) => p.status === 'todo'))
        const doingProjects = computed(() => projects.value.filter((p) => p.status === 'doing'))
        const doneProjects = computed(() => projects.value.filter((p) => p.status === 'done'))
        const holdProjects = computed(() => projects.value.filter((p) => p.status === 'hold'))

        return {
            todoProjects,
            doingProjects,
            doneProjects,
            holdProjects
        }
    }
}
</script>
<template>
    <div class="inner">
        <div class="row align-items-start justify-content-between g-3">
            <div class="col-auto">
                <div class="title-area">
                    <h2 class="h2">프로젝트 목록 👋</h2>
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

        <div class="row">
            <div class="col">
                <h3 class="h3 pb-4 fw-light">진행예정 <span class="h3 fw-bold">3</span> 건</h3>
                <ProjectTable :projects="todoProjects" />
            </div>
        </div>

        <!-- 진행예정 프로젝트 목록 -->
        <div v-if="todoProjects.length > 0">
            <h2>진행예정 프로젝트</h2>
            <ProjectTable :projects="todoProjects" />
        </div>

        <!-- 진행중 프로젝트 목록 -->
        <div v-if="doingProjects.length > 0">
            <h2>진행중 프로젝트</h2>
            <ProjectTable :projects="doingProjects" />
        </div>

        <!-- 완료 프로젝트 목록 -->
        <div v-if="doneProjects.length > 0">
            <h2>완료 프로젝트</h2>
            <ProjectTable :projects="doneProjects" />
        </div>

        <!-- 보류 프로젝트 목록 -->
        <div v-if="holdProjects.length > 0">
            <h2>보류 프로젝트</h2>
            <ProjectTable :projects="holdProjects" />
        </div>
    </div>
</template>

<style scoped></style>
