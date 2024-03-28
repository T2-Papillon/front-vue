<script>
import { ref } from 'vue'
import UserProfile from '../components/UserProfile.vue'
import ProgressBar from '../components/ProgressBar.vue'
import StatusBadge from '../components/StatusBadge.vue'
import PriorityBadge from '../components/PriorityBadge.vue'
import { useProjects } from '@/composables/useProjects'

export default {
    components: {
        UserProfile,
        ProgressBar,
        StatusBadge,
        PriorityBadge
    },

    props: {
        project: Object // props로 project를 받아옴
    },

    setup() {
        const { projects, fetchProjects } = useProjects()

        return {
            projects
        }
    }
}
</script>
<template>
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
                    <div v-for="(participant, index) in formatParticipants(project.participants).visibleParticipants" :key="index">
                        <UserProfile :name="participant" />
                    </div>
                    <span v-if="formatParticipants(project.participants).overflowCount > 0">...</span>
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
