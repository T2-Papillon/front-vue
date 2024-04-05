<script>
import BarChartUserTaskStatus from '../components/chart/BarChartUserTaskStatus.vue'
import BarChartUserTaskPriority from '../components/chart/BarChartUserTaskPriority.vue'
import PieChartUserProjectTask from '../components/chart/PieChartUserProjectTask.vue'
import ChartWeeklyTask from '../components/chart/ChartWeeklyTask.vue'
import TaskTable from '../components/TaskTable.vue'
import ProjectTable from '../components/ProjectTable.vue'
import { useProjects } from '@/composables/useProjects'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
    components: {
        BarChartUserTaskStatus,
        BarChartUserTaskPriority,
        PieChartUserProjectTask,
        ChartWeeklyTask,
        TaskTable,
        ProjectTable
    },
    setup() {
        const route = useRoute()
        const profileName = ref(route.params.profileName) // URL에서 프로필 이름을 가져옵니다.
        // const profileDept = ref('') // 초기 부서 정보는 비어 있습니다.

        const { projects, fetchProjects } = useProjects()

        onMounted(async () => {
            console.log(`Fetching projects and data for ${profileName.value}...`)
            fetchProjects()
            // 여기에서 userProfile 데이터 페치 로직을 추가합니다.
            // const userProfile = await fetchUserProfile(profileName.value)
            // profileDept.value = userProfile.dept // 부서 정보를 설정합니다.
        })

        return {
            profileName, // userProfile 대신 profileName을 사용
            // profileDept, // 컴포넌트에 profileDept 추가
            projects
        }
    }
}
</script>
<template>
    <div class="mypage-wrap">
        <div class="top-area">
            <div class="container">
                <div class="profile">
                    <i class=""></i>
                    <div class="info">
                        <!-- <p class="info-text">{{ profileDept }}</p> -->
                        <h3 class="info-name">{{ profileName }}</h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="btm-area">
            <div class="container">
                <div class="row align-items-center justify-content-between g-3 pb-4">
                    <div class="col-auto">
                        <div class="title-area">
                            <h2 class="h2">[개인통계]마이페이지</h2>
                            <p class="text-body-tertiary lh-sm mb-3">testesttextext</p>
                        </div>
                    </div>
                </div>

                <div class="row mb-5">
                    <div class="col-xl-6">
                        <h3 class="h3">나의 업무 진행 상태 분포</h3>
                        <BarChartUserTaskStatus :assigneeName="profileName" />
                    </div>
                    <div class="col-xl-6">
                        <h3 class="h3">나의 우선순위별 업무 분포</h3>
                        <BarChartUserTaskPriority :assigneeName="profileName" />
                    </div>
                </div>

                <div class="row mb-5">
                    <div class="col">
                        <h3 class="h3">나의 참여 프로젝트 분포</h3>
                        <PieChartUserProjectTask :assigneeName="profileName" />
                    </div>
                    <div class="col-xl-6">
                        <h3 class="h3">나의 주차별 업무 현황</h3>
                        <ChartWeeklyTask />
                    </div>
                </div>

                <div class="row mb-5">
                    <div class="col">
                        <h3 class="h3">나의 전체 프로젝트 목록</h3>
                        <!-- <ProjectTable :projects="projects" /> -->
                    </div>
                </div>

                <div class="row mb-5">
                    <div class="col-xl-6">
                        <h3 class="h3">나의 전체 업무 목록</h3>
                        <!-- <TaskTable /> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.top-area {
    position: relative;
    height: 280px;
    background-color: #dbf6eb;
    background-image: url('/public/images/img-mypage.svg');
    background-position: 100% 140%;
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
    border: 3px solid #fff;
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
</style>