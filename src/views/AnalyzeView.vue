<script>
import PieChartProjectStatus from '../components/PieChartProjectStatus.vue'
import PieChartTaskStatus from '../components/PieChartTaskStatus.vue'
import BarChartTaskCount from '../components/BarChartTaskCount.vue'
import BarChartTaskThisWeek from '../components/BarChartTaskThisWeek.vue'


export default {
    components: {
        PieChartProjectStatus,
        PieChartTaskStatus,
        BarChartTaskCount,
        BarChartTaskThisWeek
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
        <!-- 프로젝트 정보 -->
        <ProjectInfo :project="project" />
        <div class="row align-items-start justify-content-between g-3">
            <div class="col-auto">
                <div class="title-area">
                    <h2 class="h2">통계분석</h2>
                    <p class="text-body-tertiary lh-sm mb-0">4번 프로젝트</p>
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
            <AnalyzeProjectInfo :project="project" />
        </div>

        <div class="row mt-4">
            <div class="col">
                <h3 class="h3">전체 프로젝트 진행 상태</h3>
                <PieChartProjectStatus />
            </div>
            <div class="col">
                <h3 class="h3">업무별 진행 상태</h3>
                <PieChartTaskStatus />
            </div>
        </div>

        <div class="row mt-4">
            <div class="col">
                <h3 class="h3">담당자별 업무 개수</h3>
                <BarChartTaskCount />
            </div>
            <div class="col">
                <h3 class="h3">이번주 각 담당자별 업무 개수</h3>
                <BarChartTaskThisWeek />
            </div>
        </div>
    </div>
</template>

<style></style>
