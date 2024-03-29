// src/composables/useProjects.js
import { ref } from 'vue'
import axios from 'axios'
import { formatDate } from '@/utils/dateUtils'

export function useProjects() {
    const projects = ref([])

    async function fetchProjects() {
        try {
            const apiUrl = import.meta.env.VITE_API_URL
            const response = await axios.get(`${apiUrl}/search`)

            projects.value = response.data.map((project) => ({
                id: project.projNo,
                title: project.projTitle,
                pm: [`${project.projPm.charAt(0)}`],
                participants: [`${project.projPm.charAt(0)}`],
                startDate: formatDate(project.projStartDate),
                endDate: formatDate(project.projEndDate),
                status: project.projectStatus ? project.projectStatus.toLowerCase() : 'unknown', // '전체','진행중', '완료'
                progress: project.projPercent,
                priority: project.projectPriority, // '긴급', '높음', '보통', '낮음'
                writeDate: formatDate(project.projCreateDate)
            }))

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
