<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import CheckboxSelector from '../components/CheckboxSelector.vue'
import ProjectInfo from '../components/ProjectInfo.vue'
import TaskTable from '../components/TaskTable.vue'

export default {
    components: {
        CheckboxSelector,
        ProjectInfo,
        TaskTable
    },
    data() {
        return {
            projects: []
        }
    },
    setup() {
        const project = ref({})
        const checkboxItems = ref([
            { id: 'todo', name: '진행예정' },
            { id: 'doing', name: '진행중' },
            { id: 'done', name: '완료' },
            { id: 'hold', name: '보류' }
        ])

        async function fetchProjectDetail() {
            try {
                const apiUrl = import.meta.env.VITE_API_URL
                const response = await axios.get(`${apiUrl}/search`)
                console.log(response.data)

                project.value = response.data
            } catch (error) {
                console.error('프로젝트 데이터를 가져오는데 실패했습니다:', error)
            }
        }

        onMounted(() => {
            fetchProjectDetail()
        })

        return {
            project,
            checkboxItems
        }
    },

    mounted() {
        this.fetchProjectDetail()
    }
}
</script>

<template>
    <div class="inner">
        <!-- 프로젝트 정보 -->
        <ProjectInfo :project="project" />

        <!-- 정렬 -->
        <div class="row align-items-start justify-content-between mb-4 g-3 border-top">
            <div class="col-auto"><h3 class="h3">담당업무</h3></div>
            <div class="col-auto">
                <a href="#" class="btn btn-primary" @click="openTaskInputModal"> <i class="bi bi-plus-circle"></i> 업무추가</a>
            </div>
        </div>
        <div class="row align-items-start justify-content-between mb-4 g-3">
            <div class="col-auto">
                <div>
                    <CheckboxSelector :items="checkboxItems" selectAllId="flexCheckDefault" />
                </div>
            </div>
            <div class="col-auto d-flex">
                <form class="d-flex me-4">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button class="btn btn-outline-success" type="submit"><i class="bi bi-search"></i></button>
                </form>

                <div class="btn-group">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-funnel"></i> 정렬</button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">최신순</a></li>
                        <li><a class="dropdown-item" href="#">우선순위순</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 하위업무 -->
        <div class="row">
            <div class="col">
                <TaskTable />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
