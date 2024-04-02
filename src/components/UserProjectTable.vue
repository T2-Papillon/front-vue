<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { formatDate } from '@/utils/dateUtils.js'


const projects = ref([])

onMounted(async () => {
    try {
    const empNo = 8 // 현재 로그인한 사용자의 사번 예시(서현우)
    // 추후에 로그인한 사용자의 사번을 받아올 수 있도록 변경할 예정
    // 로그인한 사용자의 이름을 저장하기 위한 반응형 참조
    // const userName = ref(sessionStorage.getItem('NM') || '사용자')
    const response = await axios.get(`http://localhost:9090/api/project/contributor/id?empNo=8`)
    projects.value = response.data
    } catch (error) {
    console.error('프로젝트 데이터를 가져오는데 실패했습니다:', error)
    }
})
</script>

<template>
    <div class="project-table-container">
        <!-- <h2>참여 프로젝트 목록</h2> -->
        <table class="table">
            <thead>
            <tr>
                <th>#</th>
                <th>프로젝트명</th>
                <th>PM</th>
                <th>시작일</th>
                <th>종료일</th>
                <th>진행률</th>
                <th>우선순위</th>
                <th>상태</th>
                <th>참여자</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(project, index) in projects" :key="project.projNo">
                <td>{{ index + 1 }}</td>
                <td>{{ project.projTitle }}</td>
                <td>{{ project.projPm }}</td>
                <td>{{ formatDate(project.projStartDate) }}</td>
                <td>{{ formatDate(project.projEndDate) }}</td>
                <td>{{ project.projPercent }}%</td>
                <td>{{ project.projectPriority }}</td>
                <td>{{ project.projectStatus }}</td>
                <td>
                <ul>
                    <li v-for="contributor in project.contributors" :key="contributor.eno">
                    {{ contributor.name }}
                    </li>
                </ul>
                </td>
            </tr>
            </tbody>
        </table>
        </div>
</template>

<style>
.table {
    width: 100%;
    border-collapse: collapse;
}

.table thead th {
    background-color: #f5f5f5;
    padding: 10px;
}

.table tbody td {
    padding: 10px;
    border-top: 1px solid #ddd;
}

ul {
    padding-left: 0;
    list-style: none;
}
</style>
