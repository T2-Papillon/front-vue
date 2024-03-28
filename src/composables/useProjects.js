// src/composables/useProjects.js
import { ref } from 'vue'
import axios from 'axios'

export function useProjects() {
    const projects = ref([])

    async function fetchProjects() {
        try {
            const apiUrl = import.meta.env.VITE_API_URL
            const response = await axios.get(`${apiUrl}/search`)
            projects.value = response.data.map((project) => ({
                // 데이터 매핑 로직
                id: project.id,
                title: project.title,
                pm: project.pm,
                startDate: project.startDate,
                endDate: project.endDate,
                status: project.status,
                participants: project.participants,
                progress: project.progress,
                priority: project.priority,
                writeDate: project.writeDate
            }))
        } catch (error) {
            console.error('Error fetching projects:', error)
        }
    }

    return { projects, fetchProjects }
}
