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

        // 프로젝트 상태별로 필터링하는 함수
        function filterProjects() {
            todoProjects.value = projects.value.filter((p) => p.status === 'todo')
            doingProjects.value = projects.value.filter((p) => p.status === 'doing')
            doneProjects.value = projects.value.filter((p) => p.status === 'done')
            holdProjects.value = projects.value.filter((p) => p.status === 'hold')
        }

        onMounted(async () => {
            await fetchProjects()
            filterProjects()
        })

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

        <section class="row pt-5" v-if="todoProjects.length > 0">
            <div class="col">
                <h3 class="h3 pb-4 fw-light">
                    📌 진행예정 <span class="h3 fw-bold">{{ todoProjects.length }}</span> 건
                </h3>
                <ProjectTable :projects="todoProjects" />
            </div>
        </section>

        <section class="row pt-5" v-if="doingProjects.length > 0">
            <div class="col">
                <h2 class="h3 pb-4 fw-light">
                    📌 진행중 <span class="h3 fw-bold">{{ doingProjects.length }}</span> 건
                </h2>
                <ProjectTable :projects="doingProjects" />
            </div>
        </section>

        <section class="row pt-5" v-if="doneProjects.length > 0">
            <div class="col">
                <h2 class="h3 pb-4 fw-light">
                    📌 완료 <span class="h3 fw-bold">{{ doneProjects.length }}</span> 건
                </h2>
                <ProjectTable :projects="doneProjects" />
            </div>
        </section>

        <section class="row pt-5" v-if="holdProjects.length > 0">
            <div class="col">
                <h2 class="h3 pb-4 fw-light">
                    📌 보류 <span class="h3 fw-bold">{{ holdProjects.length }}</span> 건
                </h2>
                <ProjectTable :projects="holdProjects" />
            </div>
        </section>
    </div>
</template>

<style scoped></style>
