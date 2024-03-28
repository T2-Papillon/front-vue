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
            <div class="col-6">
                <ProjectOutline />
            </div>
            <div class="col-6">
                <PieChart />
            </div>
            <div class="col-6">
                <TaskTable />
            </div>
            <div class="col-6">
                <ProjectThisWeek />
            </div>
        </div>
    </div>
</template>
<script>
import PieChart from '../components/PieChart.vue'
import ProjectOutline from '../components/ProjectOutline.vue'
import TaskTable from '../components/TaskTable.vue'
import ProjectThisWeek from '../components/ProjectThisWeek.vue'

export default {
    components: {
        PieChart,
        ProjectOutline,
        TaskTable,
        ProjectThisWeek
    },
    data() {
        return {
            project: {
                title: '메인페이지 리뉴얼 프로젝트',
                startDate: '2024.03.03',
                endDate: '2024.04.25',
                participants: ['홍길동(PM)', '김철수', '이영희', '박보검'],
                progress: 70,
                writeDate: '2024.03.03'
            }
        }
    }
}
</script>
<style></style>
