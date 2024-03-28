<script>
import axios from 'axios'
import UserProfile from '../components/UserProfile.vue'
import ProgressBar from '../components/ProgressBar.vue'
import StatusBadge from '../components/StatusBadge.vue'
import PriorityBadge from '../components/PriorityBadge.vue'
// import { useProjects } from '@/composables/useProjects'

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
    },
    methods: {
        async fetchProjects() {
            try {
                const apiUrl = import.meta.env.VITE_API_URL
                const response = await axios.get(`${apiUrl}/search`)

                const formattedProjects = response.data.map((project) => ({
                    id: project.projNo,
                    title: project.projTitle,
                    pm: [`${project.projPm.charAt(0)}`],
                    participants: [`${project.projPm.charAt(0)}`],
                    startDate: project.projStartDate,
                    endDate: project.projEndDate,
                    status: project.projectStatus ? project.projectStatus.toLowerCase() : 'unknown', // '전체','진행중', '완료'
                    progress: project.projPercent,
                    priority: project.projectPriority, // '긴급', '높음', '보통', '낮음'
                    writeDate: project.projCreateDate
                }))
                this.projects = formattedProjects
            } catch (error) {
                console.error(error)
            }
        }
    },
    mounted() {
        this.fetchProjects() // 컴포넌트가 마운트된 후 데이터 호출
    }
}
</script>
<template>
    <div class="row align-items-start justify-content-between g-3">
        <div class="col-auto">
            <div class="title-area">
                <h2 class="h2">{{ project.projTitle }}</h2>
                <h2 class="h2">타이틀타이틀</h2>
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
                <td><UserProfile :name="project.pm" /></td>
                <th>작성일</th>
                <td>{{ project.writeDate }}</td>
            </tr>
            <tr>
                <th>프로젝트 기간</th>
                <td>{{ project.startDate }} ~ {{ project.endDate }}</td>
                <th>우선순위</th>
                <td><PriorityBadge :priority="project.priority" /></td>
            </tr>

            <tr>
                <th>참여자</th>
                <td>
                    <!-- <div v-for="(participant, index) in formatParticipants(project.participants).visibleParticipants" :key="index">
                        <UserProfile :name="participant" />
                    </div>
                    <span v-if="formatParticipants(project.participants).overflowCount > 0">...</span> -->
                </td>
                <th>프로젝트 상태</th>
                <td><StatusBadge :status="project.status" /></td>
            </tr>

            <tr>
                <th>진행률</th>
                <td><ProgressBar :progress="project.progress" /></td>
                <th></th>
                <td></td>
            </tr>
        </tbody>
    </table>
</template>
