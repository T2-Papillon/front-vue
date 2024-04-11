<script>
import { useProjects } from '@/composables/useProjects'
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import BarChartUserTaskStatus from '../components/chart/BarChartUserTaskStatus.vue'
import BarChartUserTaskPriority from '../components/chart/BarChartUserTaskPriority.vue'
import PieChartUserProjectTask from '../components/chart/PieChartUserProjectTask.vue'
import TaskTable from '../components/TaskTable.vue'
import ProjectTable from '../components/ProjectTable.vue'
import PaginationView from '../components/PaginationView.vue'

import profileImg1 from '@/assets/images/profile-img01.png'
import profileImg2 from '@/assets/images/profile-img02.png'
import profileImg3 from '@/assets/images/profile-img03.png'
import profileImg4 from '@/assets/images/profile-img04.png'

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
        const profileName = ref(route.params.profileName)

        const { projects, fetchProjects } = useProjects()
        const filteredProjects = ref([])

        const tasks = ref([])

        const currentPage = ref(1)
        const pageSize = ref(10)
        const totalPages = computed(() => Math.ceil(todoTasks.value.length / pageSize.value))

        const paginatedTodoTasks = computed(() => {
            const start = (currentPage.value - 1) * pageSize.value
            const end = currentPage.value * pageSize.value
            return todoTasks.value.slice(start, end)
        })

        const todoTasks = computed(() => {
            return tasks.value.filter((task) => task.task_status === 'TODO')
        })

        async function fetchTasks() {
            try {
                const apiUrl = import.meta.env.VITE_API_URL
                const response = await axios.get(`${apiUrl}/task/taskAll`)
                // 현재 사용자에게 할당된 업무만 필터링
                const userTasks = response.data.filter((task) => task.assignee === profileName.value)
                tasks.value = userTasks
            } catch (error) {}
        }

        onMounted(async () => {
            await fetchProjects()
            filteredProjects.value = projects.value.filter((project) => project.participants.some((participant) => participant.name === profileName.value))
            await fetchTasks() // 사용자에게 할당된 업무 데이터를 가져옵니다
        })

        const changePage = (newPage) => {
            currentPage.value = newPage
        }

        watch(currentPage, () => {
            // 여기에 필요한 로직을 추가합니다. 예를 들어, 서버로부터 새로운 데이터를 불러오는 등의 작업을 수행할 수 있습니다.
        })

        const imageList = [profileImg1, profileImg2, profileImg3, profileImg4]

        // 랜덤 이미지 선택
        const getRandomImage = () => {
            const randomIndex = Math.floor(Math.random() * imageList.length)
            return imageList[randomIndex]
        }

        // 프로필 이미지 설정
        const profileImage = ref(getRandomImage())

        return {
            profileName,
            profileImage,
            projects: filteredProjects,
            tasks,
            todoTasks,
            currentPage,
            totalPages,
            paginatedTodoTasks,
            changePage
        }
    }
}
</script>
<template>
    <div class="mypage-wrap">
        <div class="top-area">
            <div class="inner">
                <div class="profile">
                    <i :style="{ backgroundImage: `url(${profileImage})` }"></i>

                    <div class="info">
                        <h3 class="info-name">{{ profileName }}</h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="btm-area">
            <div class="inner">
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
                        <BarChartUserTaskStatus :assigneeName="profileName" />
                    </div>
                    <div class="col-xl-5">
                        <h3 class="h3 chart-title">나의 우선순위별 업무 분포</h3>
                        <BarChartUserTaskPriority :assigneeName="profileName" />
                    </div>
                </div>

                <div class="row mb-5">
                    <div class="col-xl-5">
                        <h3 class="h3 chart-title">나의 참여 프로젝트 분포</h3>
                        <PieChartUserProjectTask :assigneeName="profileName" />
                    </div>
                    <div class="col-xl-5">
                        <h3 class="h3 chart-title">나의 진행예정 업무 목록</h3>
                        <TaskTable :tasks="paginatedTodoTasks" :showAssignee="false" :showStatus="false" :showProgress="false" :showWriteDate="false" />
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
                        <TaskTable :tasks="tasks" :showAssignee="true" :showStatus="true" :showProgress="true" :showWriteDate="true" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.btm-area .row.pb-5 {
    padding-bottom: 6rem;
}

.col-xl-5 {
    padding: 0 15px;
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
    background-size: cover;
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
