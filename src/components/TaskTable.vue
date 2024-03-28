<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>전체 업무 목록</th>
                    <th>시작일</th>
                    <th>종료일</th>
                    <th>진행 상태</th>
                    <th>담당자</th>
                    <th>업무 진행률</th>
                    <th>우선 순위</th>
                    <th>테스트 URL</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="project in projects" :key="project.id">
                    <td>{{ project.title }}</td>
                    <td>{{ project.startDate }}</td>
                    <td>{{ project.endDate }}</td>
                    <td><StatusBadge :status="project.status" /></td>
                    <td>
                        <UserProfile v-for="(participant, index) in formatParticipants(project.participants).visibleParticipants" :key="index" :name="participant" />
                        <span v-if="formatParticipants(project.participants).overflowCount > 0">...</span>
                    </td>
                    <td><ProgressBar :progress="project.progress" /></td>
                    <td><PriorityBadge :priority="project.priority" /></td>
                    <td><a :href="project.testUrl">링크</a></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
// ... 컴포넌트 가져오기와 methods 정의
</script>

<style>
/* ... 테이블 스타일링 */
</style>
