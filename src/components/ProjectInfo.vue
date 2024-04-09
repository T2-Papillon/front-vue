<script>
import { watch, ref } from 'vue'
import UserProfile from '../components/UserProfile.vue'
import ProgressBar from '../components/ProgressBar.vue'
import StatusBadge from '../components/StatusBadge.vue'
import PriorityBadge from '../components/PriorityBadge.vue'
import { formatDate } from '@/utils/dateUtils.js'
import { formatProjectData } from '@/utils/projectUtils.js'

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
        },
        fromView: {
            type: String,
            required: false,
            default: ''
        }
    },
    setup(props) {
        // 프로젝트 데이터 포맷팅
        const formattedProject = ref(formatProjectData(props.project))

        // 참여자 정보 가져오기
        const participants = ref(formattedProject.value.participants || [])

        // PM 정보 가져오기
        const findPMDepartment = (pmName) => {
            const pm = participants.value.find((participant) => participant.name === pmName)
            return pm ? pm.dept_no : '부서 미정'
        }

        watch(
            () => props.project,
            () => {
                formattedProject.value = formatProjectData(props.project)
                participants.value = formattedProject.value.participants || []
            }
        )

        return {
            formatDate,
            formattedProject,
            participants,
            findPMDepartment
        }
    }
}
</script>

<template>
    <div class="row align-items-center justify-content-between g-3 pb-4">
        <div class="col-auto">
            <div class="title-area">
                <p class="text-body-tertiary lh-sm mb-3">ProjectNo.000{{ project.projNo }}</p>
                <h2 class="h2">📌 {{ project.projTitle }}</h2>
            </div>
        </div>
        <div class="col-auto">
            <div class="top-btn-area">
                <!-- 조건부 렌더링을 사용하여 다른 버튼 표시 -->
                <router-link v-if="fromView === 'ProjectDetailView'" :to="{ name: 'Analyze', params: { id: project.projNo } }" class="btn btn-dark">통계분석 바로가기</router-link>
                <router-link v-else-if="fromView === 'AnalyzeView'" :to="{ name: 'ProjectDetail', params: { id: project.projNo } }" class="btn btn-dark">프로젝트 상세보기</router-link>
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
                <td><UserProfile :name="project.projPm" :dept="findPMDepartment(project.projPm)" /></td>
                <th>작성일</th>
                <td>{{ formatDate(project.projCreateDate) }}</td>
            </tr>
            <tr>
                <th>프로젝트 기간</th>
                <td>{{ formatDate(project.projStartDate) }} ~ {{ formatDate(project.projEndDate) }}</td>
                <th>우선순위</th>
                <td><PriorityBadge :priority="project.projectPriority" /></td>
            </tr>

            <tr>
                <th>참여자</th>
                <td>
                    <div>
                        <UserProfile v-for="participant in participants" :key="participant.eno" :name="participant.name" :dept="participant.dept_no" />
                    </div>
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
.btn {
    display: flex;
    align-items: center;
}
</style>
