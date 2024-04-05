<script>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import ProjectInfo from '../components/ProjectInfo.vue'
import TaskTable from '../components/TaskTable.vue'
import EditDeleteButtonGroup from '../components/EditDeleteButtonGroup.vue'
import SortFilter from '@/components/SortFilter.vue'
import CheckboxSelector from '../components/CheckboxSelector.vue'
import StatusBadge from '../components/StatusBadge.vue'

export default {
    components: {
        ProjectInfo,
        TaskTable,
        SortFilter,
        EditDeleteButtonGroup,
        CheckboxSelector,
        StatusBadge
    },
    setup() {
        const project = ref({})
        const allTasks = ref([])
        const tasks = ref([])
        const route = useRoute()
        const projectNo = ref(null)
        const searchTerm = ref('')
        const selectedCheckboxes = ref(['all'])
        const isSearchMode = ref(false)

        const checkboxItems = ref([
            { id: 'all', name: '전체' },
            { id: 'todo', name: '진행예정' },
            { id: 'doing', name: '진행중' },
            { id: 'done', name: '완료' },
            { id: 'hold', name: '보류' }
        ])

        // 선택된 체크박스에 따라 태스크를 필터링하는 함수
        function applyFilters() {
            let filtered = allTasks.value
            if (!selectedCheckboxes.value.includes('all')) {
                filtered = filtered.filter((task) => selectedCheckboxes.value.includes(task.task_status.toLowerCase()))
            }
            tasks.value = filtered
        }
        watch([selectedCheckboxes, allTasks], applyFilters, { immediate: true })

        // 체크박스 선택 핸들러
        function handleSelectedItems(updatedSelection) {
            selectedCheckboxes.value = updatedSelection
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

        // 프로젝트 태스크 정보를 불러오는 함수
        async function fetchProjectTasks() {
            const projectId = route.params.id
            try {
                const apiUrl = import.meta.env.VITE_API_URL
                const response = await axios.get(`${apiUrl}/task/project/${projectId}/task`)
                allTasks.value = response.data
                applyFilters()
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
            applyFilters()
        }

        // 최신순으로 정렬하는 함수
        function sortByLatest() {
            console.log('Sorting by latest')
            tasks.value.sort((a, b) => new Date(b.create_date) - new Date(a.create_date))
            tasks.value = [...tasks.value]
        }

        // 우선순위순으로 정렬하는 함수
        function sortByPriority() {
            console.log('Sorting by priority')
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
            selectedCheckboxes.value = ['all']
            isSearchMode.value = true // 검색 모드 활성화

            const projectId = route.params.id
            const apiUrl = import.meta.env.VITE_API_URL

            // 검색어가 비어있으면 전체 업무 목록을 가져옵니다.
            try {
                const response = await axios.get(`${apiUrl}/task/project/${projectId}/task/search`, {
                    params: {
                        term: searchTerm.value,
                        page: 0,
                        pageSize: 10
                    }
                })
                allTasks.value = response.data // 검색 결과 저장
                applyFilters() // 필터링 적용
            } catch (error) {
                console.error('업무 검색 실패:', error)
            }
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
            handleSelectedItems,
            selectedCheckboxes,
            isSearchMode
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="row mb-4">
            <div class="col d-flex align-items-center justify-content-end">
                <!--  게시글 수정/삭제 버튼 -->
                <EditDeleteButtonGroup />
            </div>
        </div>

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
            <div class="col-auto">
                <!-- 체크박스 -->
                <CheckboxSelector :items="checkboxItems" :selected="selectedCheckboxes" @change="handleSelectedItems" />
            </div>
            <div class="col-auto d-flex">
                <form class="d-flex me-4" @submit.prevent="searchTasks">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="searchTerm" />
                    <button class="btn btn-outline-success" type="submit"><i class="bi bi-search"></i></button>
                </form>

                <!-- 최신순/우선순위 -->
                <SortFilter :sortByLatest="sortByLatest" :sortByPriority="sortByPriority" />
            </div>
        </div>

        <!-- 하위업무 -->
        <div class="row">
            <div class="col">
                <!-- <TaskTable :projectId="parseInt(projectNo)" :tasks="tasks" /> -->
                <TaskTable v-if="tasks.length > 0" :projectId="parseInt(projectNo)" :tasks="tasks" :addNewTask="addNewTask" />
                <p v-else>업무 데이터가 없습니다.</p>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
