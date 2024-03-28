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
.project-table {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    width: 100%;
    border-collapse: collapse;
}

.project-table thead {
    background-color: #f3f3f3;
}

.project-table th,
.project-table td {
    border: 1px solid #e1e1e1;
    padding: 12px 15px;
    text-align: left;
}

.project-table th {
    font-weight: 600;
    color: #333;
}

.project-table tr:nth-child(even) {
    background-color: #fafafa;
}

.project-table td {
    color: #666;
}
</style>
