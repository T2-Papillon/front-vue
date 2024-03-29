<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import CheckboxSelector from '../components/CheckboxSelector.vue'
import ProjectInfo from '../components/ProjectInfo.vue'
import TaskTable from '../components/TaskTable.vue'
import SortFilter from '@/components/SortFilter.vue'

export default {
    components: {
        CheckboxSelector,
        ProjectInfo,
        TaskTable,
        SortFilter
    },
    created() {
        console.log(this.$route)
    },
    setup() {
        const route = useRoute()
        const project = ref({})
<<<<<<< HEAD
        const route = useRoute()
=======

>>>>>>> 5c3314cf127f3b8cfa4a83f4f979777734ea302f
        const checkboxItems = ref([
            { id: 'todo', name: '진행예정' },
            { id: 'doing', name: '진행중' },
            { id: 'done', name: '완료' },
            { id: 'hold', name: '보류' }
        ])

        async function fetchProjectDetail() {
            const projectId = route.params.id
            try {
                const projNo = route.params.id
                const apiUrl = import.meta.env.VITE_API_URL
<<<<<<< HEAD
                const response = await axios.get(`${apiUrl}/project/${projectId}`)
=======
                // const apiUrl2 = `${apiUrl}/project/${projNo}?projNo=${projNo}`
                const apiUrl2 = `${apiUrl}/project/${projNo}?projNo=${projNo}`

                const response = await axios.get(apiUrl2)
>>>>>>> 5c3314cf127f3b8cfa4a83f4f979777734ea302f
                project.value = response.data
            } catch (error) {
                console.error('프로젝트 데이터를 가져오는데 실패했습니다:', error)
            }
        }

        onMounted(fetchProjectDetail)

        return {
            project,
            checkboxItems
        }
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
                <!-- <a href="#" class="btn btn-primary" @click="openTaskInputModal"> <i class="bi bi-plus-circle"></i> 업무추가</a> -->
                <!-- <router-link to="/taskinput" class="btn btn-primary"><i class="bi bi-plus-circle"></i> 업무추가</router-link> -->
                <router-link :to="`/project/detail/${project.id}/task`" class="btn btn-primary"><i class="bi bi-plus-circle"></i> 업무추가</router-link>
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

                <!-- 최신순/우선순위 -->
                <SortFilter />
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
