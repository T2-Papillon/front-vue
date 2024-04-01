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
                const response = await axios.get(`${apiUrl}/search/project`, {
                    params: { term: '' } // 'all'이 선택된 경우, 모든 프로젝트를 가져오기 위해 빈 검색어를 전송
                })
                projects.value = response.data.map((project) => formatProjectData(project))
            } else {
                // 단일 상태에 대한 프로젝트 목록을 요청합니다.
                // 현재 백엔드 구현상, statusList 배열의 첫 번째 요소만 사용합니다.
                const statusId = statusList[0]
                const response = await axios.get(`http://localhost:8080/api/search`, {
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
        projects.value.sort((a, b) => {
            return new Date(b.writeDate) - new Date(a.writeDate)
        })
    }

    function sortByPriority() {
        const priorityOrder = { 긴급: 0, 높음: 1, 보통: 2, 낮음: 3 }
        projects.value.sort((a, b) => {
            return priorityOrder[a.priority] - priorityOrder[b.priority]
        })
    }

    return { projects, fetchProjects, fetchProjectsByStatus, sortByLatest, sortByPriority, isLoading }
}
