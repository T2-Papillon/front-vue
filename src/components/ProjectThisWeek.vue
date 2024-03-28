<template>
    <div class="project-table">
        <table>
            <thead>
                <tr>
                    <th>프로젝트 명</th>
                    <th>담당자</th>
                    <th>진행 상태</th>
                    <th>우선 순위</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="project in projects" :key="project.id">                
                    <td>
                        <user-profile :name="project.assignee" />
                    </td>
                    <td>
                        <status-badge :status="project.status" />
                    </td>
                    <td>
                        <priority-badge :priority="project.priority" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import UserProfile from '../components/UserProfile.vue'
import StatusBadge from '../components/StatusBadge.vue'
import PriorityBadge from '../components/PriorityBadge.vue'

export default {
  components: {
    UserProfile,
    StatusBadge,
    PriorityBadge
  },
  props: {
    projects: Array
  }
}
</script>

<style>
/* 이곳에 CSS 스타일을 추가하세요. */
.project-table {
  /* 테이블 스타일 */
}
.project-table table {
  /* 기본 테이블 스타일 */
}
.project-table th, .project-table td {
  /* 헤더와 셀 스타일 */
}
</style>
