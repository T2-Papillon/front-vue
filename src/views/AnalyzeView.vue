<script>
import PieChart from '../components/PieChart.vue'
import TaskTable from '../components/TaskTable.vue'
import ProjectThisWeek from '../components/ProjectThisWeek.vue'

export default {
    components: {
        PieChart,
        TaskTable,
        ProjectThisWeek
    },
    data() {
        return {}
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
        <div class="row">
            <div class="col">
                <!-- 프로젝트상세info 컴포넌트 들어올 예정 -->
            </div>
        </div>
        <div class="row">
            <div class="col">
                <PieChart />
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <TaskTable />
            </div>
            <div class="col-6">
                <ProjectThisWeek />
            </div>
        </div>
    </div>
</template>

<style></style>
