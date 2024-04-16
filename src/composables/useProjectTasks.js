// composables/useProjectTasks.js
import { ref } from 'vue'
import axios from 'axios'

export default function useProjectTasks(apiUrl, projectId) {
    const tasks = ref([])
    const error = ref(null)

    async function fetchProjectTasks(projectId) {
        console.log('js통합')
        try {
            const response = await axios.get(`${apiUrl}/task/project/${projectId}/task`)
            tasks.value = response.data
        } catch (err) {
            console.error('프로젝트 태스크 데이터를 가져오는데 실패했습니다:', err)
            error.value = '프로젝트 태스크 데이터를 가져오는데 실패했습니다.'
            tasks.value = []
        }
    }

    return {
        tasks,
        error,
        fetchProjectTasks
    }
}
