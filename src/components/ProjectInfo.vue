<script>
import UserProfile from '../components/UserProfile.vue'
import ProgressBar from '../components/ProgressBar.vue'
import StatusBadge from '../components/StatusBadge.vue'
import PriorityBadge from '../components/PriorityBadge.vue'

export default {
    components: {
        UserProfile,
        ProgressBar,
        StatusBadge,
        PriorityBadge
    },
    props: {
        project: {
            type: Object,
            required: true
        }
    }
}
</script>
<template>
    <div class="row align-items-start justify-content-between g-3">
        <div class="col-auto">
            <div class="title-area">
                <h2 class="h2">📌 {{ project.projTitle }}</h2>
                <p class="text-body-tertiary lh-sm mb-0">ProjectNo.00000001</p>
            </div>
        </div>
        <div class="col-auto">
            <div class="top-btn-area">
                <button class="btn btn-outline-dark me-4">대시보드 바로가기</button>
                <button class="btn btn-dark">통계분석 바로가기</button>
            </div>
        </div>
    </div>
    <table class="table table-borderless fs-9 mb-5 border-top border-translucent">
        <colgroup>
            <col style="width: 154px" />
            <col />
            <col style="width: 154px" />
            <col />
        </colgroup>
        <tbody>
            <tr>
                <th>작성자</th>
                <td><UserProfile :name="project.projPm" /></td>
                <th>작성일</th>
                <td>{{ project.projCreateDate }}</td>
            </tr>
            <tr>
                <th>프로젝트 기간</th>
                <td>{{ project.projStartDate }} ~ {{ project.projEndDate }}</td>
                <th>우선순위</th>
                <td><PriorityBadge :priority="project.projectPriority" /></td>
            </tr>

            <tr>
                <th>참여자</th>
                <td>
                    참여자 수정해야해수정해야해
                    <!-- <div v-for="(participant, index) in formatParticipants(project.participants).visibleParticipants" :key="index">
                        <UserProfile :name="participant" />
                    </div>
                    <span v-if="formatParticipants(project.participants).overflowCount > 0">...</span> -->
                </td>
                <th>프로젝트 상태</th>
                <td><StatusBadge :status="project.projectStatus" /></td>
            </tr>
            <tr>
                <th>진행률</th>
                <td><ProgressBar :progress="project.projPercent" /></td>
                <th></th>
                <td></td>
            </tr>
            <tr>
                <th>내용</th>
                <td colspan="3">
                    <div class="text-area">{{ project.projDesc }}</div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<style scoped>
.table-borderless {
    border-top: 2px solid #e6eef4;
}

.table-borderless th,
.table-borderless td {
    padding: 15px 0;
    font-size: 14px !important;
    text-align: left;
}
.table-borderless th {
    border-bottom: 0;
    color: #384554;
    font-weight: 700;
}

.table-borderless td {
    border-bottom: 0 !important;
    color: #656f7d;
}
.table-borderless th:nth-child(3) {
    padding-left: 30px;
}

.dash-line {
    margin: 0;
    border: 0;
    border-top: 1px dashed #d2dce5;
    opacity: 0.6;
}
.text-area {
    padding: 30px;
    padding-left: 0;
    font-size: 14px;
    color: #333;
    line-height: 1.8;
}
</style>
