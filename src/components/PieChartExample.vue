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
    name: 'PieChart',
    components: {
        Pie
    },
    setup() {
        const chartData = ref({
            labels: ['TODO', 'DOING', 'DONE', 'HOLD'],
            datasets: [{
                label: 'Project Status Counts',
                data: [], // 상태 별 프로젝트 개수를 담을 배열
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)', 
                    'rgba(54, 162, 235, 0.2)', 
                    'rgba(255, 206, 86, 0.2)', 
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)', 
                    'rgba(54, 162, 235, 1)', 
                    'rgba(255, 206, 86, 1)', 
                    'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
            }]
        })

        const chartOptions = ref({
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Project Status Distribution'
                }
            }
        })

        const loaded = ref(false) // 데이터 로딩 상태

        async function fetchProjectsByStatus() {
            const statuses = ['TODO', 'DOING', 'DONE', 'HOLD']
            const apiUrl = import.meta.env.VITE_API_URL

        const counts = await Promise.all(statuses.map(async (status) => {
            try {
                const response = await axios.get(`${apiUrl}/project/status?status=${status}`);
                return response.data.length // 각 상태에 대한 프로젝트 개수
            } catch (error) {
                console.error(`Error fetching projects for status ${status}:`, error)
                return 0
            }
        }))
        console.log(counts); // 상태 별 프로젝트 개수 확인
        chartData.value.datasets[0].data = counts
        loaded.value = true // 데이터 로딩 완료
        }

        onMounted(fetchProjectsByStatus)

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
