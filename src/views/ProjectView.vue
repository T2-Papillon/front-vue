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
                const response = await axios.get(`${apiUrl}/search`) // API 호출 주소 수정

                projects.value = response.data.map((project) => ({
                    id: project.projNo,
                    title: project.projTitle,
                    pm: [`${project.projPm.charAt(0)}`],
                    participants: [`${project.projPm.charAt(0)}`],
                    startDate: project.projStartDate,
                    endDate: project.projEndDate,
                    status: project.projectStatus ? project.projectStatus.toLowerCase() : 'unknown', // '전체','진행중', '완료'
                    progress: project.projPercent,
                    priority: project.projectPriority, // '긴급', '높음', '보통', '낮음'
                    writeDate: project.projCreateDate
                }))
                console.log('Loaded Projects:', projects.value) // 전체 프로젝트 데이터 로깅
            } catch (error) {
                console.error('Error fetching projects:', error)
            }
        }

        onMounted(fetchProjects)

        const todoProjects = computed(() => projects.value.filter((project) => project.status === 'todo'))
        const doingProjects = computed(() => projects.value.filter((project) => project.status === 'doing'))
        const doneProjects = computed(() => projects.value.filter((project) => project.status === 'done'))
        const holdProjects = computed(() => projects.value.filter((project) => project.status === 'hold'))

        onMounted(() => {
            fetchProjects().then(() => {
                console.log('Todo Projects:', todoProjects.value)
                console.log('Doing Projects:', doingProjects.value)
                console.log('Done Projects:', doneProjects.value)
                console.log('Hold Projects:', holdProjects.value)
            })
        })

        return {
            projects,
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

        <section v-if="todoProjects.length > 0">
            <h2>진행예정 프로젝트</h2>
            <ProjectTable :projects="todoProjects" />
        </section>

        <section v-if="doingProjects.length > 0">
            <h2>진행중 프로젝트</h2>
            <ProjectTable :projects="doingProjects" />
        </section>

        <section v-if="doneProjects.length > 0">
            <h2>완료 프로젝트</h2>
            <ProjectTable :projects="doneProjects" />
        </section>

        <section v-if="holdProjects.length > 0">
            <h2>보류 프로젝트</h2>
            <ProjectTable :projects="holdProjects" />
        </section>
    </div>
</template>

<style scoped></style>
