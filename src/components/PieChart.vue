<template>
    <Pie :data="chartData" :options="chartOptions" />
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { ref, onMounted } from 'vue'
import axios from 'axios'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    components: {
        Pie
    },
    setup() {
        const chartData = ref({
            labels: [],
            datasets: [
                {
                    label: 'Task Status Counts',
                    data: statusCounts,
                    backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                    borderWidth: 1
                }
            ]
        })

        async function fetchTasks() {
            try {
                // `projNo=1`에 해당하는 업무 데이터를 가져옵니다.
                const apiUrl = `${import.meta.env.VITE_API_URL}/task/project/1/tasks`
                const response = await axios.get(apiUrl)
                const tasks = response.data

                // 업무 상태별로 개수를 계산합니다.
                const statusCounts = tasks.reduce((acc, task) => {
                    const status = task.status
                    acc[status] = (acc[status] || 0) + 1
                    return acc
                }, {})

                // Object.keys()를 사용하여 statusCounts 객체의 키를 배열로 변환합니다.
                // 이 배열은 차트의 labels로 사용됩니다.
                chartData.value.labels = Object.keys(statusCounts)

                // Object.values()를 사용하여 statusCounts 객체의 값(각 상태의 개수)을 배열로 변환합니다.
                // 이 배열은 차트 데이터 포인트로 사용됩니다.
                chartData.value.datasets[0].data = Object.values(statusCounts)
            } catch (error) {
                console.error('업무 데이터를 가져오는데 실패했습니다:', error)
            }
        }
        onMounted(fetchTasks)

        return {
            chartData
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
