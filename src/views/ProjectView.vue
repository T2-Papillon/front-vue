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
    data() {
        return {
            projects: [
                { id: 1, title: '프로젝트 A', pm: ['영'], startDate: '2020.03.24', endDate: '2024.04.05', status: 'done', participants: ['최', '우', '단', '최', '우', '단'], progress: 100, priority: '보통', writeDate: '2024.03.26' },
                { id: 2, title: '프로젝트 B', pm: ['진'], startDate: '2024.03.24', endDate: '2024.04.05', status: 'doing', participants: ['고', '희'], progress: 50, priority: '높음', writeDate: '2024.03.26' }
            ]
        }
    },
    methods: {
        formatParticipants(participants) {
            const maxVisible = 3
            const visibleParticipants = participants.slice(0, maxVisible)
            const overflowCount = participants.length - maxVisible

            return {
                visibleParticipants,
                overflowCount
            }
        }
    }
}
</script>
<template>
    <div class="inner">
        <div class="row align-items-start justify-content-between g-3">
            <div class="col-auto">
                <div class="title-area">
                    <h2 class="h2">프로젝트 👋</h2>
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
                <table class="table fs-9 mb-5 border-top border-translucent">
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
                            <th class="sort text-end align-middle" scope="col" data-sort="contributor">참여자</th>
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
                            <td class="overflow-hidden text-nowrap text-end">
                                <UserProfile v-for="(participant, index) in formatParticipants(project.participants).visibleParticipants" :key="index" :name="participant" />
                                <span v-if="formatParticipants(project.participants).overflowCount > 0">...</span>
                            </td>
                            <td>
                                <ProgressBar :progress="project.progress" />
                            </td>
                            <td class="text-end"><PriorityBadge :priority="project.priority" /></td>
                            <td class="text-end">{{ project.writeDate }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style></style>
