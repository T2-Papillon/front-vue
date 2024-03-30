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

    return { projects, fetchProjects, sortByLatest, sortByPriority, isLoading }
}
