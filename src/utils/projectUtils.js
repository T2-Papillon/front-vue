// src/utils/projectUtils.js
import { formatDate } from '@/utils/dateUtils'

export function formatProjectData(project) {
    return {
        id: project.projNo,
        title: project.projTitle,
        pm: [`${project.projPm.charAt(0)}`],
        participants: [`${project.projPm.charAt(0)}`],
        startDate: formatDate(project.projStartDate),
        endDate: formatDate(project.projEndDate),
        status: project.projectStatus ? project.projectStatus.toLowerCase() : 'unknown',
        progress: project.projPercent,
        priority: project.projectPriority,
        writeDate: formatDate(project.projCreateDate)
    }
}
