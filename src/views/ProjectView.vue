<script>
import ProjectTable from '../components/ProjectTable.vue'

export default {
    components: {
        ProjectTable
    }
}
</script>
<template>
    <div class="inner">
        <div class="row align-items-start justify-content-between g-3">
            <div class="col-auto">
                <div class="title-area">
                    <h2 class="h2">프로젝트 목록 👋</h2>
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
                <h3 class="h3 pb-4 fw-light">진행예정 <span class="h3 fw-bold">3</span> 건</h3>
                <!-- 프로젝트 table -->
                <ProjectTable :projects="projects" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
