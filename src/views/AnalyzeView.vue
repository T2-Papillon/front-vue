<script>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import ProjectInfo from '../components/ProjectInfo.vue'
// import TaskTable from '../components/TaskTable.vue' // 추가 예정
import BarChartProjectTaskStatus from '../components/chart/BarChartProjectTaskStatus.vue'
import BarChartTaskAssignee from '../components/chart/BarChartTaskAssignee.vue'
import BarChartProjectTaskPriority from '../components/chart/BarChartProjectTaskPriority.vue'

export default {
    components: {
        ProjectInfo,
        BarChartProjectTaskStatus,
        BarChartTaskAssignee,
        BarChartProjectTaskPriority
    },
    setup() {
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


        // 프로젝트 상세 정보를 불러오는 함수
        async function fetchProjectDetail() {
            isLoading.value = true // 데이터 로딩 시작
            const projectId = route.params.id
            try {
                const apiUrl = import.meta.env.VITE_API_URL
                const response = await axios.get(`${apiUrl}/project/detail?projNo=${projectId}`)
                project.value = response.data
                projectNo.value = projectId
                console.log(project) // 디버깅
            } catch (error) {
                console.error('프로젝트 데이터를 가져오는데 실패했습니다:', error)
            } finally {
                isLoading.value = false // 데이터 로딩 완료
            }
        }

        onMounted(() => {
            fetchProjectDetail()
        })

        return {
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
            <ProjectInfo :project="project" />
        </div>

        <div class="row mt-4">
            <div class="col">
                <h3 class="h3">업무 진행 상태 분포</h3>
                <BarChartProjectTaskStatus />
            </div>
        </div>

        <div class="row mt-4">
            <div class="col">
                <h3 class="h3">담당자별 업무 분포</h3>
                <BarChartTaskAssignee />
            </div>
            <div class="col">
                <h3 class="h3">우선순위별 업무 분포</h3>
                <BarChartProjectTaskPriority />
            </div>
        </div>
    </div>
</template>

<style></style>
