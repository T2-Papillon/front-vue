<template>
    <Pie v-if="loaded" :data="chartData" :options="chartOptions" />
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import { ref, onMounted } from 'vue'
import axios from 'axios'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    name: 'PieChartTaskStatus',
    components: {
        Pie
    },
    setup() {
        const chartData = ref({
            labels: ['TODO', 'DOING', 'DONE', 'HOLD', 'TEST'],
            datasets: [{
                label: 'Task Status Counts',
                data: [], // 상태 별 업무 개수를 담을 배열
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)', 
                    'rgba(54, 162, 235, 0.2)', 
                    'rgba(255, 206, 86, 0.2)', 
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)', 
                    'rgba(54, 162, 235, 1)', 
                    'rgba(255, 206, 86, 1)', 
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
            }]
        })

        const chartOptions = ref({
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: '4번 프로젝트에 대한 업무 진행 상황'
                }
            }
        })

        const loaded = ref(false) // 데이터 로딩 상태

        async function fetchTasksByProject() {
            const apiUrl = import.meta.env.VITE_API_URL
            try {
                const response = await axios.get(`${apiUrl}/task/project/4/task`)
                const tasks = response.data
                // 상태별로 업무를 필터링하고 개수를 계산
                const counts = chartData.value.labels.map(status =>
                    tasks.filter(task => task.status === status).length
                )
                chartData.value.datasets[0].data = counts;
                console.log(counts); // 상태 별 프로젝트 개수 확인
                loaded.value = true;
            } catch (error) {
                console.error(`Error fetching tasks by project:`, error)
            }
            
        }

        onMounted(fetchTasksByProject)

        return {
            chartData,
            chartOptions,
            loaded
        }
    }
}
</script>

<style scoped>
canvas {
width: 340px !important;
height: 340px !important;
}
</style>
