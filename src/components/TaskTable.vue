<script>
import axios from 'axios'
import StatusBadge from '../components/StatusBadge.vue'
import ProgressBar from '../components/ProgressBar.vue'
import PriorityBadge from '../components/PriorityBadge.vue'

export default {
    components: {
        StatusBadge,
        ProgressBar,
        PriorityBadge
    },
    props: {
        tasks: Array
    },
    methods: {
    // ... 이전에 정의한 메서드들
    }
}
</script>

<template>
    <div>
        <table class="table fs-9 mb-5 border-top border-translucent">
            <thead>
                <tr>
                    <th>업무명</th>
                    <th>시작일</th>
                    <th>종료일</th>
                    <th>진행 상태</th>
                    <th>담당자</th>
                    <th>업무 진행률</th>
                    <th>우선 순위</th>
                    <th>테스트 URL</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="task in tasks" :key="task.taskNo">
                    <td>{{ task.taskTitle }}</td>
                    <td>{{ task.taskStartDate }}</td>
                    <td>{{ task.taskEndDate }}</td>
                    <td><StatusBadge :status="task.taskStatus.statusName" /></td>
                    <td>{{ task.assignee }}</td>
                    <td><ProgressBar :progress="task.taskPercent" /></td>
                    <td><PriorityBadge :priority="task.taskPriority.priorityName" /></td>
                    <td v-if="task.taskTest">
                        <a :href="`/test/${task.taskNo}`">테스트</a>
                    </td>
                    <td v-else>테스트 없음</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.table {
    width: 100%;
    border-collapse: collapse;
}

.table th {
    text-align: center;
    border: 1px solid #dee2e6;
    padding: 0;
    background-color: #f8f9fa;
    color: #212529;
}

.table td {
    vertical-align: middle;
    text-align: center;
    border: 1px solid #dee2e6;
    padding: 0;
}

.test-url-button {
    padding: 0.375rem·0 0;
    border-radius: 0;
    color: #fff;
    background-color: #007bff;
    border: none;
    cursor: pointer;
}

/* 참여자 이름 옆의 더 보기 표시에 대한 스타일 */
.overflow-indicator {
    color: #6c757d;
    cursor: pointer;
}

/* 정렬 상태를 나타내는 화살표 아이콘 스타일링 */
.sort-arrow {
    /* CSS 코드 작성 */
}

/* 우선순위 배지 색상 (이미지 예시에 따른) */
.priority-badge-high {
    background-color: #d9534f;
    color: white;
}

.priority-badge-medium {
    background-color: #f0ad4e;
    color: black;
}

.priority-badge-low {
    background-color: #5cb85c;
    color: white;
}

/* 반응형 디자인을 위한 미디어 쿼리 */
@media (max-width: 768px) {
    .table {
        display: block;
        overflow-x: auto;
        white-space: nowrap;
    }
}
</style>
