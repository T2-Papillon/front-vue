<script>
import axios from 'axios'
import BarChartUserTaskStatus from '../components/chart/BarChartUserTaskStatus.vue'
import BarChartUserTaskPriority from '../components/chart/BarChartUserTaskPriority.vue'
import PieChartUserProjectTask from '../components/chart/PieChartUserProjectTask.vue'
import TaskTable from '../components/TaskTable.vue'
import ProjectTable from '../components/ProjectTable.vue'
import { formatProjectData } from '@/utils/projectUtils'
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
    components: {
        BarChartUserTaskStatus,
        BarChartUserTaskPriority,
        PieChartUserProjectTask,
        TaskTable,
        ProjectTable
    },

    setup() {
        const route = useRoute()
        const profileEno = ref(history.state.eno) // URL에서 프로필 사번을 가져옵니다.
        const profileName = ref(history.state.name)
        const profileDept = ref(history.state.dept)

        // const { projects, fetchProjects } = useProjects()
        const filteredProjects = ref([])

        const tasks = ref([])
        const projects = ref([])

        // "진행예정(TODO)" 상태의 업무만 필터링하여 저장하는 computed 속성
        const todoTasks = computed(() => {
            return tasks.value.filter((task) => task.task_status === 'TODO')
        })

        async function fetchTasks() {
            try {
                const apiUrl = import.meta.env.VITE_API_URL
                //const response = await axios.get(`${apiUrl}/task/emp/${profileEno.value}`)
                const response = await axios.get(`${apiUrl}/mypage/emp/${profileEno.value}`)
                tasks.value = response.data.tasks
                projects.value = response.data.projects.map((project) => formatProjectData(project))
            } catch (error) {}
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
        })

        return {
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
                        <h3 class="info-name">{{ profileDept }} /</h3>
                    </div>
                    <div class="info">
                        <h3 class="info-name">{{ profileName }}</h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="btm-area">
            <div class="container">
                <div class="row align-items-center justify-content-between g-3 pb-5">
                    <div class="col-auto">
                        <div class="title-area">
                            <h2 class="h2">[개인통계]마이페이지</h2>
                            <p class="text-body-tertiary lh-sm mb-3">{{ profileName }}님의 마이페이지 입니다.</p>
                        </div>
                    </div>
                </div>

                <div class="row mb-5">
                    <div class="col-xl-5">
                        <h3 class="h3 chart-title">나의 업무 진행 상태 분포</h3>
                        <BarChartUserTaskStatus :assigneeName="profileName" :tasks="tasks" />
                    </div>
                    <div class="col-xl-5">
                        <h3 class="h3 chart-title">나의 우선순위별 업무 분포</h3>
                        <BarChartUserTaskPriority :assigneeName="profileName" :tasks="tasks" />
                    </div>
                </div>

                <div class="row mb-5">
                    <div class="col-xl-5">
                        <h3 class="h3 chart-title">나의 참여 프로젝트 분포</h3>
                        <PieChartUserProjectTask :assigneeName="profileName" :tasks="tasks" :projects="projects" />
                    </div>
                    <div class="col-xl-5">
                        <h3 class="h3 chart-title">나의 진행예정 업무 목록</h3>
                        <TaskTable :tasks="todoTasks" :isDashBoard="true" :showAssignee="false" :showStatus="false" :showProgress="false" :showWriteDate="false" />
                    </div>
                </div>

                <div class="row mb-5">
                    <div class="col">
                        <h3 class="h3 chart-title">일주일 내로 마감될 프로젝트 목록</h3>
                        <ProjectTable :projects="projects" :show-upcoming-deadlines="true" />
                    </div>
                </div>

                <div class="row mb-5">
                    <div class="col">
                        <h3 class="h3 chart-title">나의 전체 프로젝트 목록</h3>
                        <ProjectTable :projects="projects" :show-upcoming-deadlines="false" />
                    </div>
                </div>

                <div class="row mb-5">
                    <div class="col">
                        <h3 class="h3 chart-title">나의 전체 업무 목록</h3>
                        <TaskTable :tasks="tasks" :isDashBoard="true" :showAssignee="true" :showStatus="true" :showProgress="true" :showWriteDate="true" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 기존 스타일 유지하면서 추가된 클래스를 정의 */
.btm-area .row.pb-5 {
    padding-bottom: 6rem; /* 여백을 3rem으로 늘림 */
}

.col-xl-5 {
    padding: 0 15px; /* 좌우 패딩 조정 */
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
.btm-area {
    padding-top: 120px;
}

.chart-title {
    margin-bottom: 30px;
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
</style>
