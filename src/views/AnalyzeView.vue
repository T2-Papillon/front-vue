<script>
import PieChartProjectStatus from '../components/PieChartProjectStatus.vue';
import PieChartTaskStatus from '../components/PieChartTaskStatus.vue';


export default {
    components: {
        PieChartProjectStatus,
        PieChartTaskStatus
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
            <AnalyzeProjectInfo :project="project" />
        </div>

        <div class="row mt-4">
            <div class="col">
                <PieChartProjectStatus />
            </div>
        </div>

        <div class="row mt-4">
            <div class="col">
                <PieChartTaskStatus />
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
