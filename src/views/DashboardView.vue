<script setup>
import axios from 'axios'
import { ref } from 'vue'
import ProjectTable from '../components/ProjectTable.vue'
import TaskTable from '../components/TaskTable.vue'
import { formatProjectData } from '@/utils/projectUtils'

const username = sessionStorage.getItem('NM')
const projects = ref([])
const tasks = ref([])

async function dashboardData() {
    try {
        const eno = sessionStorage.getItem('EN')
        const url = import.meta.env.VITE_API_URL + `/dashboard/emp/${eno}`
        const res = await axios.get(url)
        projects.value = res.data.projects.map((project) => formatProjectData(project))
        tasks.value = res.data.tasks
        console.log(tasks.value)
    } catch (e) {
        //this.$router.replace('/')
        console.log(e)
    }
}

dashboardData()
</script>
<template>
    <div class="dashboard-wrap">
        <div class="container inner">
            <div class="row align-items-start justify-content-between g-3">
                <div class="col-auto">
                    <div class="title-area">
                        <h2 class="h2">환영합니다! {{ username }}님💡</h2>
                        <p class="text-body-tertiary lh-sm mb-3">어쩌구저쩌구저쩌구어쩌구</p>
                    </div>
                </div>
            </div>
            <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
                <div class="col-xl-4">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">오늘 프로젝트 건수</p>
                            <h3 class="card-text">1 건</h3>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">전일 프로젝트 건수</p>
                            <h3 class="card-text">1 건</h3>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">전주 프로젝트 건수</p>
                            <h3 class="card-text">1 건</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
                <div class="col-xl-4">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">오늘 프로젝트 건수</p>
                            <h3 class="card-text">1 건</h3>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">전일 프로젝트 건수</p>
                            <h3 class="card-text">1 건</h3>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">전주 프로젝트 건수</p>
                            <h3 class="card-text">1 건</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title mb-4">프로젝트 목록</h3>
                            <div class="card-text">
                                <ProjectTable :projects="projects" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title mb-4">담당 업무 목록</h3>
                            <div class="card-text">
                                <TaskTable :initialTasks="tasks" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
                <div class="col-xl-6">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">data</p>
                            <h3 class="card-text">1 건</h3>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">data</p>
                            <h3 class="card-text">1 건</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dashboard-wrap {
    background-color: #f7fafc;
}
</style>
