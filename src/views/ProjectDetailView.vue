<script>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import ProjectInfo from '../components/ProjectInfo.vue'
import TaskTable from '../components/TaskTable.vue'
import SortFilter from '../components/SortFilter.vue'
import CheckboxSelector from '../components/CheckboxSelector.vue'
import useProjectTasks from '@/composables/useProjectTasks'

export default {
    components: {
        ProjectInfo,
        TaskTable,
        SortFilter,
        CheckboxSelector
    },
    setup() {
        const project = ref({})
        const route = useRoute()
        const projectNo = ref(null)
        const searchTerm = ref('')
        const selectedCheckboxes = ref(['all'])
        const { tasks, error, fetchProjectTasks } = useProjectTasks(import.meta.env.VITE_API_URL, route.params.id)

        const checkboxItems = ref([
            { id: 'all', name: '전체' },
            { id: 'todo', name: '진행예정' },
            { id: 'doing', name: '진행중' },
            { id: 'done', name: '완료' },
            { id: 'hold', name: '보류' }
        ])

        const filteredTasks = computed(() => {
            if (selectedCheckboxes.value.includes('all')) {
                return tasks.value
            } else {
                return tasks.value.filter((task) => task.task_status && selectedCheckboxes.value.includes(task.task_status.toLowerCase()))
            }
        })

        function handleSelectedItems(newSelection) {
            selectedCheckboxes.value = newSelection
        }

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

        onMounted(() => {
            fetchProjectDetail()
            fetchProjectTasks(route.params.id)
        })

        watch(
            () => route.params.id,
            (newVal, oldVal) => {
                if (newVal !== oldVal) {
                    fetchProjectTasks()
                }
            }
        )

        function addNewTask(newTask) {
            tasks.value.push(newTask)
        }

        // 최신순으로 정렬하는 함수
        function sortByLatest() {
            tasks.value.sort((a, b) => new Date(b.create_date) - new Date(a.create_date))
            tasks.value = [...tasks.value]
        }

        // 우선순위순으로 정렬하는 함수
        function sortByPriority() {
            const priorityOrder = { LV0: 0, LV1: 1, LV2: 2, LV3: 3 } // 우선순위 숫자로 매핑
            tasks.value.sort((a, b) => {
                const priorityA = priorityOrder[a.task_priority] ?? Number.MAX_SAFE_INTEGER
                const priorityB = priorityOrder[b.task_priority] ?? Number.MAX_SAFE_INTEGER
                return priorityA - priorityB
            })
            tasks.value = [...tasks.value]
        }

        // 업무 검색하는 함수
        async function searchTasks() {
            const projectId = route.params.id
            const apiUrl = import.meta.env.VITE_API_URL

            if (!searchTerm.value.trim()) {
                alert('검색어를 입력하세요')
                return
            } else {
                try {
                    const response = await axios.get(`${apiUrl}/task/project/${projectId}/task/search`, {
                        params: {
                            term: searchTerm.value,
                            page: 0,
                            pageSize: 10
                        }
                    })
                    tasks.value = response.data
                } catch (error) {
                    console.error('업무 검색 실패:', error)
                }
            }
            selectedCheckboxes.value = ['all']
        }

        return {
            project,
            tasks,
            checkboxItems,
            projectNo,
            addNewTask,
            sortByLatest,
            sortByPriority,
            searchTasks,
            searchTerm,
            selectedCheckboxes,
            handleSelectedItems,
            filteredTasks
        }
    }
}
</script>

<template>
    <div class="container">
        <!-- 프로젝트 정보 -->
        <div class="row mt-4">
            <ProjectInfo :project="project" fromView="ProjectDetailView" />
        </div>

        <!-- 정렬 -->
        <div class="row align-items-start justify-content-between mb-4 g-3 border-top" style="margin-top: 40px; padding-top: 80px">
            <div class="col-auto"><h3 class="h3">✔ 담당업무</h3></div>
            <div class="col-auto">
                <router-link :to="`/project/detail/${projectNo}/task/save`" class="btn btn-primary"><i class="bi bi-plus-circle"></i> 업무추가</router-link>
            </div>
        </div>

        <div class="row align-items-start justify-content-between mb-4 g-3">
            <div class="col-auto">
                <CheckboxSelector :items="checkboxItems" :selected="selectedCheckboxes" @change="handleSelectedItems" />
            </div>
            <div class="col-auto d-flex">
                <form class="d-flex me-4" @submit.prevent="searchTasks">
                    <input class="form-control me-2" type="search" placeholder="프로젝트명, 이름으로 검색" aria-label="Search" v-model="searchTerm" />
                    <button class="btn btn-outline-success" type="submit" aria-label="검색"><i class="bi bi-search"></i></button>
                </form>

                <!-- 최신순/우선순위 -->
                <SortFilter :sortByLatest="sortByLatest" :sortByPriority="sortByPriority" />
            </div>
        </div>

        <!-- 하위업무 -->
        <div class="row">
            <div class="col">
                <div class="overflow-auto">
                    <TaskTable v-if="tasks.length > 0" :projectId="parseInt(projectNo)" :tasks="filteredTasks" :addNewTask="addNewTask" :showAssignee="true" :showStatus="true" :showProgress="true" :showWriteDate="true" />
                    <p v-else class="empty">아직 비어있어요.👻</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
