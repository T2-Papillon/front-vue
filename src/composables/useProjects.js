// src/composables/useProjects.js
import { ref, computed } from 'vue'
import axios from 'axios'
import { formatProjectData } from '@/utils/projectUtils'

const PAGE_SIZE = 10

export function useProjects() {
    const projects = ref([])
    const isLoading = ref(false)
    const currentPage = ref(1)
    const totalPages = ref(1)
    const searchQuery = ref('')
    const filteredProjects = ref([])
    const apiUrl = import.meta.env.VITE_API_URL

    // 전체 프로젝트 검색
    async function fetchProjects(searchTerm = '') {
        isLoading.value = true
        searchQuery.value = searchTerm // 현재 검색어 업데이트
        try {
            const searchPath = searchTerm ? `/search/project?term=${searchTerm}` : '/project'
            const pageSize = PAGE_SIZE

            const response = await axios.get(`${apiUrl}${searchPath}`, {
                params: {
                    page: currentPage.value - 1,
                    size: pageSize
                }
            })

            // 데이터가 없는 경우 메시지 출력
            if (response.data.length === 0) {
                projects.value = []
                totalPages.value = 0
                return
            }

            projects.value = response.data.map((project) => formatProjectData(project))
            filteredProjects.value = projects.value
            totalPages.value = Math.ceil(response.data.totalCount / pageSize)
        } catch (error) {
            console.error('Error fetching projects:', error)
        } finally {
            isLoading.value = false
        }
    }

    const changePage = async (page) => {
        if (page < 1 || page > totalPages.value) {
            return
        }

        currentPage.value = page

        const isNextButtonEnabled = currentPage.value < totalPages.value
        if (!isNextButtonEnabled) {
            alert('마지막 페이지입니다.')
        }

        await fetchProjects()
    }

    async function fetchProjectsForUser() {
        isLoading.value = true
        const eno = sessionStorage.getItem('EN')
        try {
            const userProjectsUrl = `${apiUrl}/dashboard/emp/${eno}/projects`
            const response = await axios.get(userProjectsUrl)

            projects.value = response.data.map((project) => formatProjectData(project))
        } catch (error) {
            console.log('error')
        } finally {
            isLoading.value = false
        }
    }

    // 프로젝트목록 페이지에서 프로젝트 검색 함수
    async function searchProjects() {
        if (!searchQuery.value.trim()) {
            alert('검색어를 입력하세요')
            return
        }

        isLoading.value = true
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/project/search`, {
                params: {
                    term: searchQuery.value,
                    page: currentPage.value - 1,
                    pageSize: PAGE_SIZE
                }
            })
            // 검색 결과를 바로 projects 상태에 할당
            projects.value = response.data.map((project) => formatProjectData(project))
        } catch (error) {
        } finally {
            isLoading.value = false
        }
    }

    async function fetchProjectsByStatus(statusList, searchTerm = '') {
        isLoading.value = true
        try {
            if (statusList.includes('all')) {
                await fetchProjects(searchTerm)
            } else {
                await fetchProjects(searchTerm)
                const filteredProjectsByStatus = projects.value.filter((project) => statusList.includes(project.status))
                projects.value = filteredProjectsByStatus // 필터링된 프로젝트를 저장
                totalPages.value = Math.ceil(filteredProjectsByStatus.length / PAGE_SIZE)
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
        isLoading: computed(() => store.state.isLoading),
        currentPage,
        totalPages,
        searchQuery,
        changePage,
        searchProjects
    }
}
