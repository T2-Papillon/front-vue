<script>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import UserProfile from '../components/UserProfile.vue'
import ProgressBar from '../components/ProgressBar.vue'
import StatusBadge from '../components/StatusBadge.vue'
import PriorityBadge from '../components/PriorityBadge.vue'
import { formatDate } from '@/utils/dateUtils.js'

export default {
    components: {
        UserProfile,
        ProgressBar,
        StatusBadge,
        PriorityBadge,
        formatDate
    },
    props: {
        projectId: {
            type: Number,
            required: true
        },
        // 새로운 업무 데이터를 받아오는 props
        newTaskData: {
            type: Object,
            default: null
        },
        addNewTask: {
            type: Function,
            required: true
        }
    },
    setup(props) {
        const tasks = ref([])
        const route = useRoute()

        // 프로젝트 태스크 정보를 불러오는 함수
        async function fetchProjectTasks() {
            const projectId = route.params.id

            try {
                const apiUrl = import.meta.env.VITE_API_URL
                const response = await axios.get(`${apiUrl}/task/project/${projectId}/tasks`)

                tasks.value = response.data

                console.log('tasktable', tasks.value)
            } catch (error) {
                console.error('프로젝트 태스크 데이터를 가져오는데 실패했습니다:', error)
            }
        }

        // 데이터를 가져온 후에 테이블에 새로운 태스크가 추가되었는지 확인하는 함수
        function checkNewTask() {
            console.log('New Task:', props.newTaskData)
            // 새로운 태스크가 존재하면 addNewTask 함수를 호출하여 tasks 배열에 추가
            if (props.newTaskData) {
                props.addNewTask(props.newTaskData)
            }
        }

        // newTask 데이터가 변경될 때마다 해당 데이터를 추가
        watch(
            () => props.newTaskData,
            (newVal) => {
                if (newVal) {
                    props.addNewTask(newVal)
                }
            }
        )

        onMounted(() => {
            fetchProjectTasks()
        })

        return {
            tasks,
            formatDate,
            checkNewTask
        }
    }
}
</script>
<template>
    <table class="table fs-9 mb-5 border-top border-translucent">
        <colgroup>
            <col />
            <col style="width: 80px" />
            <col style="width: 100px" />
            <col style="width: 100px" />
            <col style="width: 100px" />
            <col style="width: 180px" />
            <col style="width: 80px" />
            <col style="width: 50px" />
            <col style="width: 100px" />
        </colgroup>
        <thead>
            <tr>
                <th class="sort white-space-nowrap align-middle" scope="col" data-sort="project_title">업무명</th>
                <th class="sort align-middle" scope="col" data-sort="">담당자</th>
                <th class="sort align-middle" scope="col" data-sort="start_date">시작일</th>
                <th class="sort align-middle" scope="col" data-sort="end_date">종료일</th>
                <th class="sort text-start ps-5 align-middle" scope="col" data-sort="status">진행상태</th>
                <th class="sort text-center align-middle" scope="col" data-sort="progress">진행률</th>
                <th class="sort text-end align-middle" scope="col" data-sort="priority">우선순위</th>
                <th class="sort text-end align-middle" scope="col" data-sort="test">TEST</th>
                <th class="sort text-end pe-0 align-middle" scope="write_date">작성일</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(task, index) in tasks" :key="index">
                <td>
                    <a href="#" class="tb-project-title">{{ task.task_title }}</a>
                </td>
                <td class="text-start">
                    <UserProfile :name="task.assignee" />
                </td>
                <td>{{ formatDate(task.start_date) }}</td>
                <td>{{ formatDate(task.end_date) }}</td>
                <td><StatusBadge :status="task.task_status" /></td>
                <td class="text-end"><ProgressBar :progress="task.task_percent" /></td>
                <td class="text-end"><PriorityBadge :priority="task.task_priority" /></td>
                <td class="text-end text-secondary">{{ task.task_test }}</td>
                <td class="text-end text-secondary" style="font-size: 12px">{{ formatDate(task.create_date) }}</td>
            </tr>

            <!-- 새로운 업무 표시 -->
            <tr v-if="newTaskData" :key="newTaskData.id">
                <td>{{ newTaskData.task_title }}</td>
                <td>{{ newTaskData.assignee }}</td>
                <td>{{ formatDate(newTaskData.start_date) }}</td>
                <td>{{ formatDate(newTaskData.end_date) }}</td>
                <td>{{ newTaskData.task_status }}</td>
                <td>{{ newTaskData.task_percent }}</td>
                <td>{{ newTaskData.task_priority }}</td>
                <td>{{ newTaskData.task_test }}</td>
                <td>{{ formatDate(newTaskData.create_date) }}</td>
            </tr>
        </tbody>
    </table>
</template>
<style scoped>
.tb-project-title {
    position: relative;
    padding-left: 15px;
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
</style>
