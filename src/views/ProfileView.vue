<script>
import axios from 'axios'
import BarChartUserTaskStatus from '../components/chart/BarChartUserTaskStatus.vue'
import BarChartUserTaskPriority from '../components/chart/BarChartUserTaskPriority.vue'
import PieChartUserProjectTask from '../components/chart/PieChartUserProjectTask.vue'
import DeptChart from '../components/chart/DoughnutDept.vue'
import TaskTable from '../components/TaskTable.vue'
import ProjectTable from '../components/ProjectTable.vue'
import ScrollToTop from '../components/ScrollToTop.vue'

import { formatProjectData } from '@/utils/projectUtils'
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
    components: {
        BarChartUserTaskStatus,
        BarChartUserTaskPriority,
        PieChartUserProjectTask,
        TaskTable,
        ProjectTable,
        DeptChart,
        ScrollToTop
    },

    setup() {
        const route = useRoute()
        const router = useRouter()
        const loading = ref(false)
        const error = ref(null)
        const profileEno = ref(history.state.eno)
        const profileName = ref(history.state.name)
        const profileDept = ref(history.state.dept)

        const filteredProjects = ref([])

        const tasks = ref([])
        const projects = ref([])

        const todoTasks = computed(() => {
            return tasks.value.filter((task) => task.task_status === 'TODO')
        })

        async function fetchTasks() {
            loading.value = true
            error.value = null
            try {
                const apiUrl = import.meta.env.VITE_API_URL
                const response = await axios.get(`${apiUrl}/profile/emp/${profileEno.value}`)
                tasks.value = response.data.tasks
                projects.value = response.data.projects.map((project) => formatProjectData(project))
                loading.value = false
            } catch (error) {
                error.value = 'Failed to load tasks'
                loading.value = false
            }
        }

        // 랜덤 이미지 경로 계산
        const randomProfileImagePath = computed(() => {
            let randomNumber = getRandomInt(1, 20)

            if (randomNumber < 10) {
                randomNumber = '0' + randomNumber
            }

            return `/images/profile-img${randomNumber}.png`
        })

        // 랜덤 이미지 선택하는 함수
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min
        }

        onMounted(async () => {
            await fetchTasks()
            // console.log(projects.value)

            if (!error.value) {
                router.push('/profile') // 다음 뷰로 전환하는 예시 로직
            }
        })

        return {
            loading,
            error,
            profileEno,
            profileName,
            profileDept,
            projects,
            tasks,
            todoTasks,
            randomProfileImagePath
        }
    }
}
</script>
<template>
    <div class="mypage-wrap">
        <div class="top-area">
            <div class="container">
                <div class="profile">
                    <img :src="randomProfileImagePath" alt="프로필 이미지" />
                    <div class="info">
                        <h3 class="info-name">{{ profileDept }} / {{ profileName }}</h3>
                    </div>
                </div>
            </div>
        </div>

        <div class="btm-area">
            <div class="container">
                <div class="row mt-80">
                    <div class="col-xl-6 px-5">
                        <h3 class="h3">참여 프로젝트 분포</h3>
                        <PieChartUserProjectTask :assigneeName="profileName" :tasks="tasks" :projects="projects" />
                    </div>
                    <div class="col-xl-6 px-5">
                        <DeptChart :projects="projects" />
                    </div>
                </div>

                <div class="row mt-80">
                    <div class="col-xl-6 px-5">
                        <h3 class="h3">우선순위별 업무 분포</h3>
                        <BarChartUserTaskPriority :assigneeName="profileName" :tasks="tasks" />
                    </div>
                    <div class="col-xl-6 px-5">
                        <h3 class="h3">업무 진행 상태 분포</h3>
                        <BarChartUserTaskStatus :assigneeName="profileName" :tasks="tasks" />
                    </div>
                </div>
                <div class="row mt-80">
                    <div class="col-xl-12">
                        <div class="overflow-auto">
                            <TaskTable :tasks="tasks" :isDashBoard="true" :showAssignee="true" :showStatus="true" :showProgress="true" :showWriteDate="true" />
                        </div>
                    </div>
                </div>

                <div class="row mt-80">
                    <div class="col">
                        <h3 class="h3">이번주 마감예정 프로젝트</h3>
                        <div class="overflow-auto">
                            <ProjectTable v-if="projects.length > 0" :projects="projects" :show-upcoming-deadlines="true" />
                            <p v-else class="empty">아직 비어있어요 👻</p>
                        </div>
                    </div>
                </div>

                <div class="row mt-80">
                    <div class="col">
                        <h3 class="h3">전체 프로젝트 목록</h3>
                        <div class="overflow-auto">
                            <ProjectTable :projects="projects" :show-upcoming-deadlines="false" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <ScrollToTop />
    </div>
</template>

<style scoped>
.h3 {
    margin-bottom: 30px;
}
.top-area {
    position: relative;
    height: 280px;
    background-color: #dbf6eb;
    background-image: url('../../public/images/img-mypage.png');
    background-position: 100% 185%;
    background-repeat: no-repeat;
    background-size: 800px;
}
.profile {
    display: flex;
    align-items: flex-end;
    justify-content: start;
}
.profile i {
    display: inline-block;
    width: 160px;
    height: 160px;
    margin-top: 160px;
    margin-left: 60px;
    border-radius: 100%;
    border: 4px solid #fff;
    background-color: #d9d9d9;
}

.profile .info {
    padding-bottom: 22px;
    padding-left: 20px;
}

.profile .info-text {
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 300;
}
.profile .info-name {
    font-size: 36px;
    font-weight: bold;
}

.mt-80 {
    margin-top: 80px;
}
@media (max-width: 768px) {
    .profile {
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .info-name {
        margin-top: 1.2rem;
    }
}
::v-deep .owner-row td {
    background-color: #fff;
}
</style>
