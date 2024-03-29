// src/utils/taskUtils.js
import { formatDate } from '@/utils/dateUtils'

export function formatTaskData(task) {
    return {
        id: task.taskNo,
        projectId: task.project.projNo,
        title: task.taskTitle,
        assignee: task.assignee,
        startDate: formatDate(task.taskStartDate),
        endDate: formatDate(task.taskEndDate),
        percent: task.taskPercent,
        createDate: formatDate(task.taskCreateDate),
        test: task.taskTest,
        updateDate: task.taskUpdateDate ? formatDate(task.taskUpdateDate) : null,
        description: task.taskDesc,
        status: task.taskStatus.taskStatusId, // 예를 들어 taskStatusId가 상태를 나타내는 고유한 식별자일 경우
        priority: task.taskPriority.taskPriorityId // 역시 taskPriorityId가 우선순위를 나타내는 고유한 식별자일 경우
    }
}
