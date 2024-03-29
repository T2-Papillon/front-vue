<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import AnalyzeProjectInfo from '../components/AnalyzeProjectInfo.vue'
import PieChart from '../components/PieChart.vue'
import TaskTable from '../components/TaskTable.vue'
import ProjectTable from '../components/ProjectTable.vue'
import ProjectThisWeek from '../components/ProjectThisWeek.vue'

export default {
    components: {
        AnalyzeProjectInfo,
        PieChart,
        TaskTable,
        ProjectTable,
        ProjectThisWeek
    },
    data() {
        return {
            projects: []
        }
    },
    setup() {
        const project = ref({})
        const checkboxItems = ref([
            { id: 'todo', name: '진행예정' },
            { id: 'doing', name: '진행중' },
            { id: 'done', name: '완료' },
            { id: 'hold', name: '보류' }
        ])

        async function fetchProjectDetail() {
            try {
                const apiUrl = import.meta.env.VITE_API_URL
                const response = await axios.get(`${apiUrl}/search`)
                console.log(response.data)

                project.value = response.data
            } catch (error) {
                console.error('프로젝트 데이터를 가져오는데 실패했습니다:', error)
            }
        }

        onMounted(() => {
            fetchProjectDetail()
        })

        return {
            project,
            checkboxItems
        }
    },

    mounted() {
        this.fetchProjectDetail()
    }
}
</script>
<template>
    <div class="inner">
        <div class="row align-items-start justify-content-between g-3">
            <div class="col-auto">
                <div class="title-area">
                    <h2 class="h2">통계분석</h2>
                    <p class="text-body-tertiary lh-sm mb-0">텍스트텍스트텍스트텍스트</p>
                </div>
            </div>
            <div class="col-auto">
                <div class="top-btn-area">
                    <button class="btn btn-outline-dark me-4">대시보드</button>
                    <button class="btn btn-dark">통계분석</button>
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col">
                <AnalyzeProjectInfo :project="project" />
            </div>
        </div>

        <div class="row mt-4">
            <div class="col">
                <PieChart />
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-6"></div>
            <div class="col-6"></div>
        </div>

        <div class="row mt-4">
            <div class="col">
                <!-- 프로젝트 테이블이랑 project내 task 하위업무 이거 참고해서 projectThisWeek 만들어도 되지않을까 -->
                <TaskTable />
                <ProjectTable />
            </div>
        </div>
        <div class="row">
            <div class="col">
                <ProjectTable />
            </div>
        </div>
        <div class="row">
            <div class="col">
                <!-- 굿 -->
                <ProjectThisWeek />
            </div>
        </div>
    </div>
</template>

<style></style>
