<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import ProjectInfo from '../components/ProjectInfo.vue'
// import TaskTable from '../components/TaskTable.vue' // 추가 예정
import BarChartProjectTaskStatus from '../components/chart/BarChartProjectTaskStatus.vue'
import LineChartTaskAssignee from '../components/chart/LineChartTaskAssignee.vue'
import BarChartProjectTaskPriority from '../components/chart/BarChartProjectTaskPriority.vue'
import LineChartProjectTaskTime from '../components/chart/LineChartProjectTaskTime.vue'

export default {
    components: {
        ProjectInfo,
        BarChartProjectTaskStatus,
        LineChartTaskAssignee,
        BarChartProjectTaskPriority,
        LineChartProjectTaskTime
    },
    setup() {
        const tasks = ref([])
        const project = ref({})
        const isLoading = ref(true) // 데이터 로딩 상태 추적
        const route = useRoute()
        const projectNo = ref(null)

        const checkboxItems = ref([
            { id: 'todo', name: '진행예정' },
            { id: 'doing', name: '진행중' },
            { id: 'done', name: '완료' },
            { id: 'hold', name: '보류' }
        ])

        async function fetchTasks() {
            isLoading.value = true
            const projectId = route.params.id
            try {
                const apiUrl = import.meta.env.VITE_API_URL
                const response = await axios.get(`${apiUrl}/task/project/${projectId}/task`)
                tasks.value = response.data
            } catch (error) {
                console.error('프로젝트 데이터를 가져오는데 실패했습니다:', error)
            } finally {
                isLoading.value = false
            }
        }

        onMounted(() => {
            fetchTasks()
        })

        return {
            tasks,
            project,
            isLoading, // 로딩 상태를 반환하여 템플릿에서 접근 가능하게 함
            checkboxItems,
            projectNo
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="row mt-4">
            <ProjectInfo :project="project" fromView="AnalyzeView" />
        </div>

        <div class="row mt-4">
            <div class="col">
                <h3 class="h3 chart-title">업무 진행 상태 분포</h3>
                <BarChartProjectTaskStatus :tasks="tasks" v-if="!isLoading" />
            </div>
            <div class="col">
                <h3 class="h3 chart-title">우선순위별 업무 분포</h3>
                <BarChartProjectTaskPriority :tasks="tasks" v-if="!isLoading" />
            </div>
        </div>

        <div class="row mt-4">
            <div class="col">
                <h3 class="h3 chart-title">담당자별 업무 분포</h3>
                <LineChartTaskAssignee :tasks="tasks" v-if="!isLoading" />
            </div>
            <div class="col">
                <h3 class="h3 chart-title">기간별 업무 분포</h3>
                <LineChartProjectTaskTime :tasks="tasks" v-if="!isLoading" />
            </div>
        </div>
    </div>
</template>

<style>
.chart-title {
    margin-bottom: 30px;
}
</style>
