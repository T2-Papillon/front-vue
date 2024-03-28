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
        const project = ref({}) // `reactive` 대신 `ref` 사용
        const checkboxItems = ref([
            // 배열도 `ref`로 반응형 만들기
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

                project.value = response.data // `ref`의 값에 접근할 때는 `.value` 사용
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
        this.fetchProjectDetail() // 특정 프로젝트 정보를 가져오는 메서드 호출
    }
}
</script>

<template>
    <div class="inner">
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

<style scoped>
.table-borderless {
    border-top: 2px solid #e6eef4;
}

.table-borderless th,
.table-borderless td {
    padding: 15px 0;
    font-size: 14px !important;
    text-align: left;
}
.table-borderless th {
    border-bottom: 0;
    color: #384554;
    font-weight: 700;
}

.table-borderless td {
    border-bottom: 0 !important;
    color: #656f7d;
}
.table-borderless th:nth-child(3) {
    padding-left: 30px;
}

.dash-line {
    margin: 0;
    border: 0;
    border-top: 1px dashed #d2dce5;
    opacity: 0.6;
}
.text-area {
    padding: 30px;
    padding-left: 0;
    font-size: 14px;
    color: #333;
    line-height: 1.8;
}
</style>
