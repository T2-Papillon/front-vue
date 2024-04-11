<template>
    <div v-if="chartData">
        <Line id="project-task-timeline" :options="chartOptions" :data="chartData" />
    </div>
    <div v-else>데이터를 불러오는 중입니다...</div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import axios from 'axios'
import { onMounted, reactive, toRefs, watch } from 'vue'
import { useRoute } from 'vue-router'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default {
    name: 'LineChartProjectTaskTime',
    components: { Line },
    setup() {
        const route = useRoute()
        const state = reactive({
            chartData: null,
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false // 범례가 표시되지 않도록
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        })

        async function fetchTasks() {
            const projectId = route.params.id
            try {
                const apiUrl = import.meta.env.VITE_API_URL
                const response = await axios.get(`${apiUrl}/task/project/${projectId}/task`)
                const tasks = response.data
                processChartData(tasks)
            } catch (error) {
                console.error('Error fetching tasks:', error)
            }
        }

        function processChartData(tasks) {
            // 날짜별 업무 카운트
            const taskCountsByDate = {}
            tasks.forEach((task) => {
                let currentDate = new Date(task.start_date)
                const endDate = new Date(task.end_date)

                while (currentDate <= endDate) {
                    const dateString = currentDate.toISOString().split('T')[0]
                    taskCountsByDate[dateString] = (taskCountsByDate[dateString] || 0) + 1
                    currentDate.setDate(currentDate.getDate() + 1)
                }
            })

            // 정렬된 날짜와 카운트
            const sortedDates = Object.keys(taskCountsByDate).sort()
            const sortedCounts = sortedDates.map((date) => taskCountsByDate[date])

            state.chartData = {
                labels: sortedDates,
                datasets: [
                    {
                        // label: '',
                        data: sortedCounts,
                        fill: false,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        tension: 0.1
                    }
                ]
            }
        }

        onMounted(() => {
            fetchTasks(route.params.id)
        })

        watch(
            () => route.params.id,
            (newId) => {
                fetchTasks(newId)
            }
        )

        return { ...toRefs(state) }
    }
}
</script>
