// src/composables/useProjects.js
import { ref, computed } from 'vue'
import axios from 'axios'
import { formatProjectData } from '@/utils/projectUtils'

export function useProjects() {
    const projects = ref([])
    const isLoading = ref(false)
    const searchQuery = ref('')
    const filteredProjects = ref([])
    const apiUrl = import.meta.env.VITE_API_URL

    // 전체 프로젝트 검색
    async function fetchProjects(searchTerm = '') {
        isLoading.value = true
        searchQuery.value = searchTerm
        try {
            const searchPath = searchTerm ? `/search/project?term=${searchTerm}` : '/project'
            const response = await axios.get(`${apiUrl}${searchPath}`)

            // 데이터가 없는 경우 메시지 출력
            if (response.data.length === 0) {
                projects.value = []
                return
            }

            projects.value = response.data.map((project) => formatProjectData(project))
            filteredProjects.value = projects.value
        } catch (error) {
            console.error('Error fetching projects:', error)
        } finally {
            isLoading.value = false
        }
    }

    // 대시보드 사용자 정보 가져오기
    async function fetchProjectsForUser() {
        isLoading.value = true
        const eno = sessionStorage.getItem('EN')
        try {
            const userProjectsUrl = `${apiUrl}/dashboard/emp/${eno}/projects`
            const response = await axios.get(userProjectsUrl)

            projects.value = response.data.map((project) => formatProjectData(project))
        } catch (error) {
        } finally {
            isLoading.value = false
        }
    }

    // 통합검색
    async function searchProjects() {
        if (!searchQuery.value.trim()) {
            alert('검색어를 입력하세요')
            return
        }

        isLoading.value = true
        try {
            const response = await axios.get(`${apiUrl}/project/search`, {
                params: {
                    term: searchQuery.value
                }
            })
            projects.value = response.data.map((project) => formatProjectData(project))
        } catch (error) {
            console.log('error')
        } finally {
            isLoading.value = false
        }
    }

    // 프로젝트 상태값
    async function fetchProjectsByStatus(statusList, searchTerm = '') {
        isLoading.value = true
        try {
            if (statusList.includes('all')) {
                await fetchProjects(searchTerm)
            } else {
                await fetchProjects(searchTerm)
                const filteredProjectsByStatus = projects.value.filter((project) => statusList.includes(project.status))
                projects.value = filteredProjectsByStatus
            }
        } catch (error) {
            console.error('Error fetching projects by status:', error)
        } finally {
            isLoading.value = false
        }
    }

    // 최신순
    function sortByLatest() {
        projects.value.sort((a, b) => {
            return new Date(b.writeDate) - new Date(a.writeDate)
        })

        projects.value = [...projects.value]
    }

    //우선순위순
    function sortByPriority() {
        const priorityOrder = { LV0: 0, LV1: 1, LV2: 2, LV3: 3 }
        projects.value.sort((a, b) => {
            const priorityA = priorityOrder[a.priority] ?? Number.MAX_SAFE_INTEGER
            const priorityB = priorityOrder[b.priority] ?? Number.MAX_SAFE_INTEGER
            return priorityA - priorityB
        })

        projects.value = [...projects.value]
    }

    async function updateProjectProgress(projectId, newProgress) {
        try {
            const updateUrl = `${apiUrl}/project/${projectId}/updateProgress`
            await axios.post(updateUrl, { progress: newProgress })

            const projectIndex = projects.value.findIndex((project) => project.id === projectId)
            if (projectIndex !== -1) {
                projects.value[projectIndex].progress = newProgress
            }
        } catch (error) {
            console.error('프로젝트 진도율 업데이트 중 오류가 발생했습니다:', error)
        }
    }

    return {
        projects,
        fetchProjects,
        fetchProjectsForUser,
        fetchProjectsByStatus,
        sortByLatest,
        sortByPriority,
        updateProjectProgress,
        isLoading,
        searchQuery,
        searchProjects
    }
}
