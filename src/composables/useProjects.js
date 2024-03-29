// src/composables/useProjects.js
import { ref } from 'vue'
import axios from 'axios'
import { formatProjectData } from '@/utils/projectUtils'

export function useProjects() {
    const projects = ref([])

    async function fetchProjects() {
        try {
            const apiUrl = import.meta.env.VITE_API_URL
            const response = await axios.get(`${apiUrl}/search`)

            projects.value = response.data.map(formatProjectData)

            console.log('Projects:', projects.value)
        } catch (error) {
            console.error('Error fetching projects:', error)
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

    return { projects, fetchProjects, sortByLatest, sortByPriority }
}
