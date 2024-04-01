// src/composables/useProjects.js
import { ref } from 'vue'
import axios from 'axios'
import { formatProjectData } from '@/utils/projectUtils'

export function useProjects() {
    const projects = ref([])
    const isLoading = ref(false)

    async function fetchProjects(searchTerm = '') {
        isLoading.value = true
        console.log('Fetching projects...')
        try {
            const apiUrl = import.meta.env.VITE_API_URL
            const searchPath = searchTerm ? `/search/project?term=${searchTerm}` : '/project'
            const response = await axios.get(`${apiUrl}${searchPath}`)

            projects.value = response.data.map((project) => formatProjectData(project))
            console.log('Projects loaded:', projects.value)
        } catch (error) {
            console.error('Error fetching projects:', error)
        } finally {
            isLoading.value = false
        }
    }

    async function fetchProjectsByStatus(statusList) {
        isLoading.value = true
        try {
            // 'all'이 선택된 경우 모든 프로젝트를 불러옵니다.
            if (statusList.includes('all')) {
                const apiUrl = import.meta.env.VITE_API_URL
                const response = await axios.get(`${apiUrl}/search/project`, {
                    params: { term: '' } // 'all'이 선택된 경우, 모든 프로젝트를 가져오기 위해 빈 검색어를 전송
                })
                projects.value = response.data.map((project) => formatProjectData(project))
            } else {
                const apiUrl = import.meta.env.VITE_API_URL
                const statusId = statusList[0]
                const response = await axios.get(`${apiUrl}/search`, {
                    params: { projectStatusId: statusId }
                })
                projects.value = response.data.map((project) => formatProjectData(project))
            }
        } catch (error) {
            console.error('Error fetching projects by status:', error)
        } finally {
            isLoading.value = false
        }
    }

    function sortByLatest() {
        console.log('Sorting by latest')
        projects.value.sort((a, b) => {
            return new Date(b.writeDate) - new Date(a.writeDate)
        })

        projects.value = [...projects.value]
    }

    function sortByPriority() {
        console.log('Sorting by priority')
        const priorityOrder = { LV0: 0, LV1: 1, LV2: 2, LV3: 3 } // 우선순위 숫자로 매핑
        projects.value.sort((a, b) => {
            const priorityA = priorityOrder[a.priority] ?? Number.MAX_SAFE_INTEGER
            const priorityB = priorityOrder[b.priority] ?? Number.MAX_SAFE_INTEGER
            return priorityA - priorityB
        })

        projects.value = [...projects.value]
    }

    return { projects, fetchProjects, fetchProjectsByStatus, sortByLatest, sortByPriority, isLoading }
}
