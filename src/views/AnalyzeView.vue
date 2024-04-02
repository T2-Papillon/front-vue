<script>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import AnalyzeProjectDetail from '../components/AnalyzeProjectDetail.vue'
import PieChartProjectStatus from '../components/PieChartProjectStatus.vue'
import BarChartTaskStatus from '../components/BarChartTaskStatus.vue'
import BarChartTaskAssignee from '../components/BarChartTaskAssignee.vue'
import BarChartTaskPriority from '../components/BarChartTaskPriority.vue'


export default {
    components: {
        AnalyzeProjectDetail,
        PieChartProjectStatus,
        BarChartTaskStatus,
        BarChartTaskAssignee,
        BarChartTaskPriority
    },
    setup() {
        const project = ref({})
        const isLoading = ref(true) // 데이터 로딩 상태 추적
        const route = useRoute()

        // 프로젝트 상세 정보를 불러오는 함수
        async function fetchProjectDetail() {
            isLoading.value = true; // 데이터 로딩 시작
            const projectId = route.params.id
            try {
                const apiUrl = import.meta.env.VITE_API_URL
                const response = await axios.get(`${apiUrl}/project/detail?projNo=4`)
                project.value = response.data
                console.log(project);
            } catch (error) {
                console.error('프로젝트 데이터를 가져오는데 실패했습니다:', error)
            } finally {
                isLoading.value = false; // 데이터 로딩 완료
            }
        }

        onMounted(() => {
            fetchProjectDetail()
        })

        return {
            project,
            isLoading // 로딩 상태를 반환하여 템플릿에서 접근 가능하게 함
        }
    },
    data() {
        return {
            projects: []
        }
    },
    mounted() {
        // this.fetchProjectDetail()
    }
}
</script>
<template>
    <div class="inner">
        <div class="row align-items-start justify-content-between g-3">
            <div class="col-auto">
                <div class="top-btn-area">
                    <button class="btn btn-outline-dark me-4">대시보드</button>
                    <button class="btn btn-dark">통계분석</button>
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <AnalyzeProjectInfo :project="project" />
        </div>

        <div class="row mt-4">
            <div v-if="!isLoading" class="col"> <!-- 로딩이 완료되었을 때만 내용을 표시 -->
                <AnalyzeProjectDetail :project="project" />
            </div>
        </div>

        <div class="row mt-4">
            <div class="col">
                <h3 class="h3">전체 프로젝트 진행 상태</h3>
                <PieChartProjectStatus />
            </div>
            <div class="col">
                <h3 class="h3">업무 진행 상태 분포</h3>
                <BarChartTaskStatus />
            </div>
        </div>

        <div class="row mt-4">
            <div class="col">
                <h3 class="h3">담당자별 업무 분포</h3>
                <BarChartTaskAssignee />
            </div>
            <div class="col">
                <h3 class="h3">우선순위별 업무 분포</h3>
                <BarChartTaskPriority />
            </div>
        </div>
    </div>
</template>

<style></style>
