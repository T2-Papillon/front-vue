<template>
    <div class="inner">
        <div class="row align-items-start justify-content-between g-3">
            <div class="col-auto">
                <div class="title-area">
                    <h2 class="h2">환영합니다! {{ username }}님💡</h2>
                </div>
            </div>
        </div>
        <!-- 프로젝트 목록 -->
        <div class="row pb-4">
            <div class="col">
                <ProjectTable :projects="projects"></ProjectTable>
            </div>
        </div>
        <!-- 업무 목록 -->
        <div class="row pb-4">
            <div class="col">
                <TaskTable :initialTasks="tasks"></TaskTable>
            </div>
        </div>
    </div>
</template>

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
