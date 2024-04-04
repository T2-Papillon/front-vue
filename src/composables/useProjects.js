// src/composables/useProjects.js
import { ref } from 'vue'
import axios from 'axios'
import { formatProjectData } from '@/utils/projectUtils'

const PAGE_SIZE = 10

export function useProjects() {
    const projects = ref([])
    const isLoading = ref(false)
    const currentPage = ref(1)
    const totalPages = ref(1)
    const searchQuery = ref('')
    const filteredProjects = ref([]) // 검색 결과를 저장할 새로운 ref

    // 전체 프로젝트 검색
    async function fetchProjects(searchTerm = '') {
        isLoading.value = true
        console.log('Fetching projects...')
        searchQuery.value = searchTerm // 현재 검색어 업데이트
        try {
            const apiUrl = import.meta.env.VITE_API_URL
            const searchPath = searchTerm ? `/search/project?term=${searchTerm}` : '/project'
            const pageSize = PAGE_SIZE

            const response = await axios.get(`${apiUrl}${searchPath}`, {
                params: {
                    page: currentPage.value - 1,
                    size: pageSize
                }
            })

            if (response.data.length === 0) {
                // 데이터가 없는 경우 메시지 출력
                projects.value = []
                totalPages.value = 0
                console.log('No projects found.')
                return
            }

            projects.value = response.data.map((project) => formatProjectData(project))
            // 검색된 프로젝트를 filteredProjects에 저장
            filteredProjects.value = projects.value
            // 직접 숫자를 사용하여 전체 페이지 수 계산
            totalPages.value = Math.ceil(response.data.totalCount / pageSize)
            console.log('Projects loaded:', projects.value)
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

        // 페이지가 마지막 페이지인 경우 다음 버튼 비활성화
        const isNextButtonEnabled = currentPage.value < totalPages.value
        if (!isNextButtonEnabled) {
            console.log('마지막 페이지입니다. 다음 버튼이 비활성화됩니다.')
        }

        // currentPage 값을 변경한 후에 프로젝트를 다시 불러옵니다.
        await fetchProjects()
    }

    async function fetchProjectsForUser() {
        isLoading.value = true
        const eno = sessionStorage.getItem('EN') // 로그인한 사용자의 사번 불러오기
        try {
            const apiUrl = `${import.meta.env.VITE_API_URL}/dashboard/emp/${eno}/projects`
            const response = await axios.get(apiUrl)
            projects.value = response.data.map((project) => formatProjectData(project))
            console.log('User-specific projects loaded:', projects.value)
        } catch (error) {
            console.error('Error fetching user-specific projects:', error)
        } finally {
            isLoading.value = false
        }
    }

    // 프로젝트목록 페이지에서 프로젝트 검색 함수
    async function searchProjects() {
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
            console.log('Search results:', projects.value)
        } catch (error) {
            console.error('Error searching projects:', error)
        } finally {
            isLoading.value = false
        }
    }

    async function fetchProjectsByStatus(statusList, searchTerm = '') {
        isLoading.value = true
        try {
            if (statusList.includes('all')) {
                // '전체'를 선택한 경우 모든 프로젝트를 다시 불러옴
                await fetchProjects(searchTerm)
            } else {
                // 전체 프로젝트 목록을 먼저 불러온 후, 필터링을 수행
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

    return { projects, fetchProjects, fetchProjectsForUser, fetchProjectsByStatus, sortByLatest, sortByPriority, isLoading, currentPage, totalPages, searchQuery, changePage, searchProjects }
}
