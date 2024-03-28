<script>
import { ref, onMounted } from 'vue'
import ProjectTable from '../components/ProjectTable.vue'
import { useProjects } from '@/composables/useProjects'

export default {
    components: {
        ProjectTable
    },
    setup() {
        const { projects, fetchProjects } = useProjects()

        const todoProjects = ref([])
        const doingProjects = ref([])
        const doneProjects = ref([])
        const holdProjects = ref([])

        onMounted(async () => {
            await fetchProjects()
            todoProjects.value = projects.value.filter((p) => p.status === 'todo')
            doingProjects.value = projects.value.filter((p) => p.status === 'doing')
            doneProjects.value = projects.value.filter((p) => p.status === 'done')
            holdProjects.value = projects.value.filter((p) => p.status === 'hold')
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
