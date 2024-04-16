<script>
import axios from 'axios'
import BarChartUserTaskStatus from '../components/chart/BarChartUserTaskStatus.vue'
import BarChartUserTaskPriority from '../components/chart/BarChartUserTaskPriority.vue'
import PieChartUserProjectTask from '../components/chart/PieChartUserProjectTask.vue'
import TaskTable from '../components/TaskTable.vue'
import ProjectTable from '../components/ProjectTable.vue'
import PaginationView from '../components/PaginationView.vue'
import { useProjects } from '@/composables/useProjects'
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
    components: {
        BarChartUserTaskStatus,
        BarChartUserTaskPriority,
        PieChartUserProjectTask,
        TaskTable,
        ProjectTable,
        PaginationView
    },

    setup() {
        const route = useRoute()
        const profileEno = ref(history.state.eno) // URL에서 프로필 사번을 가져옵니다.
        const profileName = ref(history.state.name)
        // const profileDept = ref('') // 초기 부서 정보는 비어 있습니다.

        const { projects, fetchProjects } = useProjects()
        const filteredProjects = ref([]) // 필터링된 프로젝트를 저장할 새로운 반응형 참조

        const tasks = ref([])

        const currentPage = ref(1) // 현재 페이지 번호를 설정합니다.
        const pageSize = ref(10) // 페이지당 업무 수를 10으로 설정합니다.
        const totalPages = computed(() => Math.ceil(todoTasks.value.length / pageSize.value)) // 전체 페이지 수를 계산합니다.

        const paginatedTodoTasks = computed(() => {
            // paginatedTodoTasks 계산된 속성을 추가합니다.
            const start = (currentPage.value - 1) * pageSize.value
            const end = currentPage.value * pageSize.value
            return todoTasks.value.slice(start, end)
        })

        // "진행예정(TODO)" 상태의 업무만 필터링하여 저장하는 computed 속성
        const todoTasks = computed(() => {
            return tasks.value.filter((task) => task.task_status === 'TODO')
        })

        // 모든 업무 데이터를 가져와서 현재 사용자에게 할당된 업무로 필터링하는 함수
        async function fetchTasks() {
            try {
                const apiUrl = import.meta.env.VITE_API_URL
                const response = await axios.get(`${apiUrl}/task/taskAll`)
                // 현재 사용자에게 할당된 업무만 필터링
                const userTasks = response.data.filter((task) => task.assignee_eno === profileEno.value)
                tasks.value = userTasks
            } catch (error) {}
        }

        // 랜덤 이미지 경로 계산
        const randomProfileImagePath = computed(() => {
            let randomNumber = getRandomInt(1, 20) // 1부터 20까지의 숫자 중 랜덤 선택

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
            await fetchProjects()
            filteredProjects.value = projects.value.filter((project) => project.participants.some((participant) => participant.eno === profileEno.value))
            await fetchTasks() // 사용자에게 할당된 업무 데이터를 가져옵니다
            // 여기에서 userProfile 데이터 페치 로직을 추가합니다.
            // const userProfile = await fetchUserProfile(profileName.value)
            // profileDept.value = userProfile.dept // 부서 정보를 설정합니다.
        })

        // 현재 페이지가 변경될 때마다 호출됩니다.
        const changePage = (newPage) => {
            currentPage.value = newPage
        }

        // currentPage가 변경될 때마다 todoTasks의 데이터를 재계산합니다.
        watch(currentPage, () => {})

        return {
            profileEno,
            profileName,
            // profileDept, // 컴포넌트에 profileDept 추가
            projects: filteredProjects, // 수정된 부분: 필터링된 프로젝트 데이터를 전달
            tasks, // TaskTable 컴포넌트로 전달되는 업무 데이터
            todoTasks,
            currentPage,
            totalPages,
            paginatedTodoTasks,
            changePage,
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
                            <p class="text-body-tertiary lh-sm mb-3">{{ profileEno }}님의 마이페이지 입니다.</p>
                        </div>
                    </div>
                </div>

                <div class="row mb-5">
                    <div class="col-xl-5">
                        <h3 class="h3 chart-title">나의 업무 진행 상태 분포</h3>
                        <BarChartUserTaskStatus :assigneeName="profileName.value" />
                    </div>
                    <div class="col-xl-5">
                        <h3 class="h3 chart-title">나의 우선순위별 업무 분포</h3>
                        <BarChartUserTaskPriority :assigneeName="profileName.value" />
                    </div>
                </div>

                <div class="row mb-5">
                    <div class="col-xl-5">
                        <h3 class="h3 chart-title">나의 참여 프로젝트 분포</h3>
                        <PieChartUserProjectTask :assigneeName="profileName.value" />
                    </div>
                    <div class="col-xl-5">
                        <h3 class="h3 chart-title">나의 진행예정 업무 목록</h3>
                        <TaskTable :tasks="paginatedTodoTasks" :isDashBoard="true" :showAssignee="false" :showStatus="false" :showProgress="false" :showWriteDate="false" />
                        <PaginationView :currentPage="currentPage" :totalPages="totalPages" @update:currentPage="changePage" />
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
    margin-bottom: 30px; /* 원하는 여백 크기로 조절하세요 */
}
</style>
