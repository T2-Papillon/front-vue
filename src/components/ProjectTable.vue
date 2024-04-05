<script setup>
import { defineProps } from 'vue'
import UserProfile from '../components/UserProfile.vue'
import ProgressBar from '../components/ProgressBar.vue'
import StatusBadge from '../components/StatusBadge.vue'
import PriorityBadge from '../components/PriorityBadge.vue'

const props = defineProps({
    projects: Array
})

const formatParticipants = (participants) => {
    const maxVisible = 3
    const visibleParticipants = participants.slice(0, maxVisible)
    const overflowCount = participants.length - maxVisible

    return { visibleParticipants, overflowCount }
}
</script>

<template>
    <table v-if="projects.length > 0" class="table fs-9 mb-5 border-top border-translucent">
        <colgroup>
            <col style="min-width: 300px" />
            <col style="width: 65px" />
            <col style="width: 126px" />
            <col style="width: 126px" />
            <col style="width: 100px" />
            <col style="width: 126px" />
            <col style="width: 150px" />
            <col style="width: 80px" />
            <col style="width: 126px" />
        </colgroup>
        <thead>
            <tr>
                <th class="sort white-space-nowrap align-middle" scope="col" data-sort="project_title">프로젝트명</th>
                <th class="sort align-middle" scope="col" data-sort="pm">PM</th>
                <th class="sort align-middle" scope="col" data-sort="start_date">시작일</th>
                <th class="sort align-middle" scope="col" data-sort="end_date">종료일</th>
                <th class="sort text-start ps-5 align-middle" scope="col" data-sort="status">진행상태</th>
                <th class="sort text-center align-middle" scope="col" data-sort="contributor">참여자</th>
                <th class="sort text-end align-middle" scope="col" data-sort="progress">진행률</th>
                <th class="sort text-end align-middle" scope="col" data-sort="priority">우선순위</th>
                <th class="sort text-end pe-0 align-middle" scope="write_date">작성일</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="project in projects" :key="project.id">
                <td>
                    <router-link :to="`/project/detail/${project.id}`" class="tb-project-title">{{ project.title }}</router-link>
                </td>
                <td>
                    <UserProfile v-for="pm in project.pm" :key="pm" :name="pm" />
                </td>
                <td>{{ project.startDate }}</td>
                <td>{{ project.endDate }}</td>
                <td><StatusBadge :status="project.status" /></td>
                <td class="overflow-hidden text-nowrap text-center">
                    <UserProfile v-for="participant in formatParticipants(project.participants).visibleParticipants" :key="participant.eno" :eno="participant.eno" :name="participant.name" :dept="participant.dept_no" />
                    <span v-if="formatParticipants(project.participants).overflowCount > 0">...</span>
                </td>
                <td>
                    <ProgressBar :progress="project.progress" />
                </td>
                <td class="text-end"><PriorityBadge :priority="project.priority" /></td>
                <td class="text-end text-secondary" style="font-size: 12px">{{ project.writeDate }}</td>
            </tr>
        </tbody>
    </table>
    <p v-else>프로젝트 데이터가 없습니다.</p>
</template>
