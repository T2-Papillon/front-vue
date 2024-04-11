<script setup>
import axios from 'axios'
import { ref } from 'vue'
import ProjectTable from '../components/ProjectTable.vue'
import TaskTable from '../components/TaskTable.vue'
import { formatProjectData } from '@/utils/projectUtils'

const username = sessionStorage.getItem('NM')
const projects = ref([])
const tasks = ref([])

const prjToday = ref(0)
const prjYesterday = ref(0)
const prjWeek = ref(0)
const taskToday = ref(0)
const taskYesterday = ref(0)
const taskWeek = ref(0)

async function dashboardData() {
    try {
        const eno = sessionStorage.getItem('EN')
        const url = import.meta.env.VITE_API_URL + `/dashboard/emp/${eno}`
        const res = await axios.get(url)
        projects.value = res.data.projects.map((project) => formatProjectData(project))

        tasks.value = res.data.tasks

        prjToday.value = res.data.prj_today
        prjYesterday.value = res.data.prj_yesterday
        prjWeek.value = res.data.prj_week
        taskToday.value = res.data.task_today
        taskYesterday.value = res.data.task_yesterday
        taskWeek.value = res.data.task_week
    } catch (e) {
        //this.$router.replace('/')
        console.log(e)
    }
}

dashboardData()
</script>
<template>
    <div class="dashboard-wrap">
        <div class="container">
            <div class="row align-items-start justify-content-between g-3">
                <div class="col-auto">
                    <div class="title-area">
                        <h2 class="h2">환영합니다! {{ username }}님💡</h2>
                        <p class="text-body-tertiary lh-sm mb-3"></p>
                    </div>
                </div>
            </div>
            <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
                <div class="col-xl-4">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">오늘 완료 프로젝트 건수</p>
                            <h3 class="card-text">{{ prjToday }} 건</h3>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">전일 완료 프로젝트 건수</p>
                            <h3 class="card-text">{{ prjYesterday }} 건</h3>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">전주 완료 프로젝트 건수</p>
                            <h3 class="card-text">{{ prjWeek }} 건</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
                <div class="col-xl-4">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">오늘 완료 업무 건수</p>
                            <h3 class="card-text">{{ taskToday }} 건</h3>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">전일 완료 업무 건수</p>
                            <h3 class="card-text">{{ taskYesterday }} 건</h3>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">전주 완료 업무 건수</p>
                            <h3 class="card-text">{{ taskWeek }} 건</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title mb-4">현재 진행중인 프로젝트</h3>
                            <div class="card-text">
                                <div class="overflow-auto">
                                    <ProjectTable :projects="projects" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title mb-4">현재 진행중인 담당 업무</h3>
                            <div class="card-text">
                                <div class="overflow-auto">
                                    <TaskTable :initialTasks="tasks" :isDashBoard="true" showAssignee="true" :showStatus="true" :showProgress="true" :showWriteDate="true" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wave-group">
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dashboard-wrap {
    overflow: hidden;
    position: relative;
    background-color: #f7fafc;
}
.dashboard-wrap::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 390px;
    background-color: #b7eca2;
    z-index: 1;
}

.dashboard-wrap .container {
    position: relative;
    z-index: 2;
}

/* wave */

.wave {
    background: rgb(255 255 255 / 25%);
    border-radius: 1000% 1000% 0 0;
    position: absolute;
    width: 500%;
    height: 12em;
    animation: wave 10s -3s linear infinite;
    transform: translate3d(0, 0, 0);
    opacity: 0.8;
    top: 234px;
    left: 0;
    z-index: -1;
}

.wave:nth-of-type(2) {
    bottom: -1.25em;
    animation: wave 18s linear reverse infinite;
    opacity: 0.8;
}

.wave:nth-of-type(3) {
    bottom: -2.5em;
    animation: wave 20s -1s reverse infinite;
    opacity: 0.9;
}
@keyframes wave {
    2% {
        transform: translateX(1);
    }

    25% {
        transform: translateX(-25%);
    }

    50% {
        transform: translateX(-50%);
    }

    75% {
        transform: translateX(-25%);
    }

    100% {
        transform: translateX(1);
    }
}
</style>
