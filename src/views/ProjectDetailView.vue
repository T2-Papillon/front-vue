<script>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import ProjectInfo from '../components/ProjectInfo.vue'
import TaskTable from '../components/TaskTable.vue'
import SortFilter from '@/components/SortFilter.vue'

export default {
    components: {
        ProjectInfo,
        TaskTable,
        SortFilter
    },
    setup() {
        const project = ref({})
        const tasks = ref([])
        const route = useRoute()
        const projectNo = ref(null)

        const checkboxItems = ref([
            { id: 'todo', name: '진행예정' },
            { id: 'doing', name: '진행중' },
            { id: 'done', name: '완료' },
            { id: 'hold', name: '보류' }
        ])

        // 프로젝트 상세 정보를 불러오는 함수
        async function fetchProjectDetail() {
            const projectId = route.params.id
            try {
                const apiUrl = import.meta.env.VITE_API_URL
                const response = await axios.get(`${apiUrl}/project/detail?projNo=${projectId}`)

                project.value = response.data
                projectNo.value = projectId
            } catch (error) {
                console.error('프로젝트 데이터를 가져오는데 실패했습니다:', error)
            }
        }

        // 프로젝트 태스크 정보를 불러오는 함수
        async function fetchProjectTasks() {
            const projectId = route.params.id
            try {
                const apiUrl = import.meta.env.VITE_API_URL
                const response = await axios.get(`${apiUrl}/task/project/${projectId}/task`)
                tasks.value = response.data

                console.log('디테일페이지', tasks.value)
            } catch (error) {
                console.error('프로젝트 태스크 데이터를 가져오는데 실패했습니다:', error)
            }
        }

        onMounted(() => {
            fetchProjectDetail()
            fetchProjectTasks()
        })

        watch(
            () => route.params.id,
            () => {
                fetchProjectTasks()
            }
        )

        function addNewTask(newTask) {
            tasks.value.push(newTask)
        }

        return {
            project,
            tasks,
            checkboxItems,
            projectNo,
            addNewTask
        }
    }
}
</script>

<template>
    <div class="inner">
        <!-- 프로젝트 정보 -->
        <ProjectInfo :project="project" />

        <!-- 정렬 -->
        <div class="row align-items-start justify-content-between mb-4 g-3 border-top" style="margin-top: 40px; padding-top: 80px">
            <div class="col-auto"><h3 class="h3">✔ 담당업무</h3></div>
            <div class="col-auto">
                <router-link :to="`/project/detail/${projectNo}/task/save`" class="btn btn-primary"><i class="bi bi-plus-circle"></i> 업무추가</router-link>
            </div>
        </div>

        <div class="row align-items-start justify-content-between mb-4 g-3">
            <div class="col-auto"></div>
            <div class="col-auto d-flex">
                <form class="d-flex me-4">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button class="btn btn-outline-success" type="submit"><i class="bi bi-search"></i></button>
                </form>

                <!-- 최신순/우선순위 -->
                <SortFilter />
            </div>
        </div>

        <!-- 하위업무 -->
        <div class="row">
            <div class="col">
                <!-- <TaskTable :projectId="parseInt(projectNo)" :tasks="tasks" /> -->
                <TaskTable :projectId="parseInt(projectNo)" :tasks="tasks" :addNewTask="addNewTask" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
