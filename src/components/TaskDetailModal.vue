<script>
import { formatDate } from '@/utils/dateUtils.js'
import EditDeleteButtonGroup from '../components/EditDeleteButtonGroup.vue'
import StatusBadge from '../components/StatusBadge.vue'
import PriorityBadge from '../components/PriorityBadge.vue'

export default {
    components: {
        EditDeleteButtonGroup,
        StatusBadge,
        PriorityBadge
    },
    emits: ['closeModal', 'refreshTasks'],
    props: {
        isActive: Boolean,
        task: Object,
        currentUserEno: String
    },
    methods: {
        closeModal() {
            this.$emit('closeModal')
        },
        handleTaskDeleted() {
            this.closeModal()
            this.$emit('refreshTasks')
        },
        formatDate
    },
    computed: {
        isCurrentUser() {
            return this.task.createdBy === this.currentUserEno
        }
    }
}
</script>

<template>
    <div v-if="isActive" class="modal show" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">담당업무 상세보기</h5>
                    <button class="btn"><i class="bi bi-copy"></i></button>
                    <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
                </div>

                <div class="modal-body">
                    <div class="modal-body">
                        <!-- 수정/삭제 버튼 -->
                        <EditDeleteButtonGroup v-if="isCurrentUser" :projectId="task.proj_no" :taskId="task.task_no" @taskDeleted="handleTaskDeleted" />
                        <!-- list -->
                        <ul class="list">
                            <li>
                                <span class="title">업무명</span>
                                <span class="value">{{ task.task_title }}</span>
                            </li>
                            <li>
                                <span class="title">담당자</span>
                                <span class="value">{{ task.assignee }}</span>
                            </li>
                            <li>
                                <span class="title">작성일</span>
                                <span class="value">{{ formatDate(task.create_date) }}</span>
                            </li>
                            <li>
                                <span class="title">업무 기간</span>
                                <span class="value">{{ formatDate(task.start_date) }} ~ {{ formatDate(task.end_date) }}</span>
                            </li>
                            <li>
                                <span class="title">진행상태</span>
                                <span class="value"><StatusBadge :status="task.task_status" /></span>
                            </li>
                            <li>
                                <span class="title">진행률</span>
                                <span class="value">{{ task.task_percent }} %</span>
                            </li>
                            <li>
                                <span class="title">우선순위</span>
                                <span class="value"> <PriorityBadge :priority="task.task_priority" /></span>
                            </li>
                            <li>
                                <span class="title">테스트</span>
                                <span class="value">{{ task.task_test }}</span>
                            </li>
                            <li>
                                <span class="title">url</span>
                                <span class="value">
                                    <a :href="task.task_test_url" target="_blank">{{ task.task_test_url }}</a>
                                </span>
                            </li>
                            <li>
                                <span class="title">내용</span>
                                <span class="value">{{ task.task_desc }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-if="isActive" class="modal-backdrop fade show" @click="closeModal"></div>
</template>

<style scoped>
.modal {
    display: none;
    z-index: 1050;
    overflow: hidden;
    outline: 0;
}

.modal.show {
    display: block;
}

.modal.fade .modal-dialog {
    transition: transform 0.3s ease-out;
    transform: translate(0, -50px);
}

.modal-header {
    padding: 1rem 1rem;
    border-bottom: 1px solid #dee2e6;
    background-color: #f7f7f7;
}

.modal-body {
    position: relative;
    flex: 1 1 auto;
    padding: 1rem;
    overflow-y: auto;
    background-color: #fff;
}

.modal-backdrop {
    display: none;
}

.modal-backdrop.fade.show {
    display: block;
    opacity: 0.5;
    z-index: 100;
}

.list {
    list-style-type: none;
    padding: 0;
}
.list li {
    margin-bottom: 13px;
}
.list li span {
    display: inline-flex;
}
.title {
    width: 110px;
    font-weight: bold;
}
.value {
    margin-left: 10px;
}
</style>
