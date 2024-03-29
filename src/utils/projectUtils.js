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
        status: project.projectStatus ? project.projectStatus.toLowerCase() : 'unknown', // '전체','진행중', '완료'
        progress: project.projPercent,
        priority: project.projectPriority, // '긴급', '높음', '보통', '낮음'
        writeDate: formatDate(project.projCreateDate)
    }
}
