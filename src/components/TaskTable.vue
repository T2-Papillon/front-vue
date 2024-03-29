<script>
import { onMounted } from 'vue'
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
    setup() {
        const { projects, fetchProjects } = useProjects()

        // 참여자 목록을 포맷하는 함수 정의
        const formatParticipants = (participants) => {
            const maxVisible = 3
            const visibleParticipants = participants.slice(0, maxVisible)
            const overflowCount = participants.length - maxVisible

            return { visibleParticipants, overflowCount }
        }

        onMounted(fetchProjects)

        return {
            projects,
            formatParticipants
        }
    }
}
</script>
<template>
    <table class="table fs-9 mb-5 border-top border-translucent">
        <colgroup>
            <col />
            <col style="width: 80px" />
            <col style="width: 126px" />
            <col style="width: 126px" />
            <col style="width: 100px" />
            <col style="width: 180px" />
            <col style="width: 80px" />
            <col style="width: 126px" />
        </colgroup>
        <thead>
            <tr>
                <th class="sort white-space-nowrap align-middle" scope="col" data-sort="project_title">프로젝트명</th>
                <th class="sort align-middle" scope="col" data-sort="">담당자</th>
                <th class="sort align-middle" scope="col" data-sort="start_date">시작일</th>
                <th class="sort align-middle" scope="col" data-sort="end_date">종료일</th>
                <th class="sort text-start ps-5 align-middle" scope="col" data-sort="status">진행상태</th>
                <th class="sort text-end align-middle" scope="col" data-sort="progress">진행률</th>
                <th class="sort text-end align-middle" scope="col" data-sort="priority">우선순위</th>
                <th class="sort text-end pe-0 align-middle" scope="write_date">작성일</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(task, index) in tasks" :key="index">
                <td>
                    <a href="#" class="tb-project-title">{{ task.title }}</a>
                </td>
                <td class="text-start">
                    <UserProfile v-for="participant in task.participants" :key="participant" :name="participant" />
                </td>
                <td>{{ task.start_date }}</td>
                <td>{{ task.end_date }}</td>
                <td><StatusBadge :status="task.status" /></td>
                <td><ProgressBar :progress="task.progress" /></td>
                <td class="text-end"><PriorityBadge :priority="task.priority" /></td>
                <td class="text-end text-secondary" style="font-size: 12px">{{ task.write_date }}</td>

            </tr>
        </tbody>
    </table>
</template>


