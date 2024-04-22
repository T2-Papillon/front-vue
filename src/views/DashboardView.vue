<script setup>
import axios from 'axios'
import { ref } from 'vue'
import ProjectTable from '../components/ProjectTable.vue'
import TaskTable from '../components/TaskTable.vue'
import TodoList from '../components/TodoList.vue'
import { formatProjectData } from '@/utils/projectUtils'
import { formatDate } from '@/utils/dateUtils'
import DeptChart from '../components/chart/DoughnutDept.vue'

const username = sessionStorage.getItem('NM')
const projects = ref([])
const tasks = ref([])

const prjToday = ref(0)
const prjYesterday = ref(0)
const prjWeek = ref(0)
const taskToday = ref(0)
const taskYesterday = ref(0)
const taskWeek = ref(0)
const todayDate = ref(formatDate(new Date()))
const totalContributors = ref(0)

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
    } catch (e) {}
}

dashboardData()
</script>
<template>
    <div class="dashboard-wrap">
        <div class="container">
            <div class="row align-items-start justify-content-between g-3">
                <div class="col-auto">
                    <div class="title-area">
                        <h3 class="h2">
                            환영합니다!<br class="only-mobile" />
                            {{ username }}님💡
                        </h3>
                        <p class="text-body-tertiary lh-sm mb-3"></p>
                    </div>
                </div>
            </div>
            <div class="row today-area g-5 g-xl-10 mb-5 mb-xl-10">
                <div class="col-xl-6">
                    <div class="today-box">
                        <h3 class="text">Today</h3>
                        <p class="fw-bold">{{ todayDate }}</p>
                    </div>
                </div>
                <div class="col-xl-6 mt-0">
                    <div class="today-box"><TodoList /></div>
                </div>
                <div class="blur-box"></div>
            </div>

            <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title h3 mb-4">이번주 마감예정 프로젝트</h3>
                            <div class="card-text">
                                <div class="overflow-auto">
                                    <ProjectTable :projects="projects" :show-upcoming-deadlines="true" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
                <div class="col-xl-4">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">오늘 완료 프로젝트 건수</p>
                            <h3 class="card-text fw-bold">{{ prjToday }} 건</h3>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">전일 완료 프로젝트 건수</p>
                            <h3 class="card-text fw-bold">{{ prjYesterday }} 건</h3>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">전주 완료 프로젝트 건수</p>
                            <h3 class="card-text fw-bold">{{ prjYesterday }} 건</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title h3 mb-4">진행중인 프로젝트</h3>
                            <div class="card-text">
                                <div class="overflow-auto">
                                    <ProjectTable :projects="projects" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 업무 -->
            <div class="row g-5 g-xl-10 mb-5 mb-xl-10" style="margin-top: 60px">
                <div class="col-xl-4">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">오늘 완료 업무 건수</p>
                            <h3 class="card-text fw-bold">{{ taskToday }} 건</h3>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">전일 완료 업무 건수</p>
                            <h3 class="card-text fw-bold">{{ taskYesterday }} 건</h3>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">전주 완료 업무 건수</p>
                            <h3 class="card-text fw-bold">{{ taskWeek }} 건</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title h3 mb-4">진행중인 담당 업무</h3>
                            <div class="card-text">
                                <div class="overflow-auto">
                                    <TaskTable :initialTasks="tasks" :isDashBoard="true" :showAssignee="true" :showStatus="true" :showProgress="true" :showWriteDate="true" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- deco -->
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
    background: linear-gradient(90deg, #54c9c2, #b0dea6);
    z-index: 1;
}

.dashboard-wrap .container {
    position: relative;
    z-index: 2;
}

.card-title {
    font-size: 15px;
    margin-bottom: revert-layer;
}

.card.today {
    text-align: center;
}
.today-area {
    position: relative;
    max-width: 1180px;
    margin: 30px auto 0;
    border-radius: 12px;
    border: solid 1px #e6eef4;
    box-shadow: 0px 6px 20px 0 rgba(193, 207, 217, 0.14);
    background-color: rgba(255, 255, 255, 0.1);
    background-color: #fff;
}
.today-box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    z-index: 1;
    text-align: center;
    border: 0;
    height: 100%;
    margin-bottom: var(--bs-gutter-y);
}

.today-box h3 {
    margin-bottom: 6px;
    font-weight: 300;
    font-size: 20px;
}
.today-box p {
    font-size: 24px;
}
.today-area .blur-box {
    position: absolute;
    border-radius: 12px;
    backdrop-filter: blur(10px);
    width: 95%;
    height: 90%;
    top: 5%;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
}
/* wave */
.wave {
    background: rgb(255 255 255 / 25%);
    border-radius: 1000% 1000% 0 0;
    position: absolute;
    width: 500%;
    height: 120em;
    animation: wave 10s -3s linear infinite;
    transform: translate3d(0, 0, 0);
    opacity: 0.9;
    top: 234px;
    left: 0;
    z-index: -1;
}

.wave:nth-of-type(2) {
    border-radius: 1000% 500% 0 0;
    top: 150px;
    bottom: -1.25em;
    height: 40em;
    animation: wave 20s linear reverse infinite;
    opacity: 0.8;
}

.wave:nth-of-type(3) {
    border-radius: 700% 700% 0 0;
    bottom: -2.5em;
    height: 12em;
    transform: translate3d(80px, 0, 0);
    animation: wave 8s -1s reverse infinite;
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
::v-deep .owner-row td {
    background-color: #fff;
}
</style>
