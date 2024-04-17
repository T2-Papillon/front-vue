<script setup>
import { ref, defineProps, onMounted, watch, defineEmits } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { formatDate } from '@/utils/dateUtils.js'

import UserProfile from '../components/UserProfile.vue'
import ProgressBar from '../components/ProgressBar.vue'
import StatusBadge from '../components/StatusBadge.vue'
import PriorityBadge from '../components/PriorityBadge.vue'
import TaskDetailModal from '../components/TaskDetailModal.vue'

const emits = defineEmits(['closeModal', 'refreshTasks'])
const props = defineProps({
    initialTasks: Array,
    newTaskData: Object,
    addNewTask: Function,
    showAssignee: Boolean,
    showStatus: Boolean,
    showProgress: Boolean,
    showWriteDate: Boolean,
    projectId: Number,
    tasks: Array,
    isDashBoard: {
        type: Boolean,
        default: false
    }
})

const currentUserEno = ref(Number(sessionStorage.getItem('EN')))

const tasks = ref(props.initialTasks)
const route = useRoute()
const isModalActive = ref(false)
const selectedTask = ref(null)
const error = ref(null)

async function fetchProjectTasks() {
    const projectId = route.params.id || props.projectId

    try {
        const apiUrl = import.meta.env.VITE_API_URL
        const response = await axios.get(`${apiUrl}/task/project/${projectId}/task`)
        tasks.value = response.data
        error.value = null
    } catch (error) {
        console.error('프로젝트 태스크 데이터를 가져오는데 실패했습니다:', error)
        error.value = '프로젝트 태스크 데이터를 가져오는데 실패했습니다.'
        tasks.value = []
    }
}

const handleCloseModal = () => {
    isModalActive.value = false
}

watch(
    () => props.newTaskData,
    (newVal) => {
        if (newVal) {
            tasks.value.push(newVal)
            tasks.value = [...tasks.value]
        }
    }
)

onMounted(() => {
    if (!props.isDashBoard) {
        fetchProjectTasks()
    }
})

const openModal = (event, task) => {
    event.preventDefault()
    selectedTask.value = task
    isModalActive.value = true
}

// 초기 데이터 또는 태스크 변경 감시
watch(
    () => props.initialTasks,
    () => {
        tasks.value = props.initialTasks
    }
)

watch(
    () => props.tasks,
    () => {
        tasks.value = props.tasks
    }
)
</script>

<template>
    <div v-if="error">{{ error }}</div>
    <table class="table fs-9 mb-5 border-top border-translucent">
        <colgroup>
            <col style="min-width: 300px" />
            <col style="width: 80px" v-if="showAssignee" />
            <col style="width: 100px" />
            <col style="width: 100px" />
            <col style="width: 100px" v-if="showStatus" />
            <col style="width: 180px" v-if="showProgress" />
            <col style="width: 80px" />
            <col style="width: 50px" />
            <col style="width: 100px" v-if="showWriteDate" />
        </colgroup>
        <thead>
            <tr>
                <th class="sort white-space-nowrap align-middle" scope="col" data-sort="project_title">업무명</th>
                <th class="sort align-middle" scope="col" data-sort="" v-if="showAssignee">담당자</th>
                <th class="sort align-middle" scope="col" data-sort="start_date">시작일</th>
                <th class="sort align-middle" scope="col" data-sort="end_date">종료일</th>
                <th class="sort text-start ps-5 align-middle" scope="col" data-sort="status" v-if="showStatus">진행상태</th>
                <th class="sort text-center align-middle" scope="col" data-sort="progress" v-if="showProgress">진행률</th>
                <th class="sort text-end align-middle" scope="col" data-sort="priority">우선순위</th>
                <th class="sort text-end align-middle" scope="col" data-sort="test">TEST</th>
                <th class="sort text-end pe-0 align-middle" scope="write_date" v-if="showWriteDate">작성일</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(task, index) in tasks" :key="index" :class="{ 'owner-row': currentUserEno === task.assignee_eno }">
                <td>
                    <a href="#" class="tb-project-title" @click="openModal($event, task)">{{ task.task_title }}</a>
                </td>
                <td class="text-start" v-if="showAssignee">
                    <UserProfile :name="task.assignee_name" :dept="task.assignee_dept" :eno="task.assignee_eno" />
                </td>
                <td>{{ formatDate(task.start_date) }}</td>
                <td>{{ formatDate(task.end_date) }}</td>
                <td v-if="showStatus"><StatusBadge :status="task.task_status" /></td>
                <td class="text-end" v-if="showProgress"><ProgressBar :progress="task.task_percent" /></td>
                <td class="text-end"><PriorityBadge :priority="task.task_priority" /></td>
                <td class="text-end text-secondary">
                    <template v-if="task.task_test">
                        <a :href="task.task_test_url" class="link-underline" target="_blank">{{ task.task_test ? 'T' : '-' }}</a>
                    </template>
                    <template v-else> - </template>
                </td>
                <td class="text-end text-secondary" style="font-size: 12px" v-if="showWriteDate">{{ formatDate(task.create_date) }}</td>
            </tr>

            <!-- 새로운 업무 표시 -->
            <tr v-if="newTaskData" :key="newTaskData.id" :class="{ 'owner-row': currentUserEno === task.assignee_eno }">
                <td>
                    <a href="#" class="tb-project-title" @click="openModal($event, newTaskData)">{{ newTaskData.task_title }}</a>
                </td>
                <td>{{ newTaskData.assignee_name }}</td>
                <td>{{ formatDate(newTaskData.start_date) }}</td>
                <td>{{ formatDate(newTaskData.end_date) }}</td>
                <td>{{ newTaskData.task_status }}</td>
                <td>{{ newTaskData.task_percent }}</td>
                <td>{{ newTaskData.task_priority }}</td>
                <td>
                    <template v-if="newTaskData.task_test">
                        <a :href="newTaskData.task_test_url" class="link-underline" target="_blank">{{ newTaskData.task_test ? 'T' : '-' }}</a>
                    </template>
                    <template v-else> - </template>
                </td>
                <td>{{ formatDate(newTaskData.create_date) }}</td>
            </tr>
        </tbody>
    </table>

    <!-- 모달 : 하위업무 상세내용  -->
    <TaskDetailModal v-if="selectedTask" :is-active="isModalActive" :task="selectedTask" :current-user-eno="currentUserEno" @close-modal="handleCloseModal" @refresh-tasks="fetchProjectTasks" />
</template>

<style scoped>
.tb-project-title {
    position: relative;
    padding-left: 15px;
    cursor: pointer;
}
.tb-project-title::after {
    display: block;
    content: 'ㄴ';
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.7;
    font-weight: 300;
}
.owner-row td {
    background-color: rgba(223, 240, 216, 0.3);
}
</style>
