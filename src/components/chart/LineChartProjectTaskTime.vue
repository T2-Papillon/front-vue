<template>
    <div v-if="chartData">
        <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
    <div v-else>데이터를 불러오는 중입니다...</div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { ref, onMounted, watch } from 'vue'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default {
    name: 'LineChartProjectTaskTime',
    components: { Line },
    props: {
        tasks: Array
    },
    setup(props) {
        const chartData = ref(null)
        const chartOptions = ref({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        })

        const processChartData = () => {
            if (!props.tasks || props.tasks.length === 0) return

            const taskCountsByDate = {}
            props.tasks.forEach((task) => {
                let currentDate = new Date(task.start_date)
                const endDate = new Date(task.end_date)

                while (currentDate <= endDate) {
                    const dateString = currentDate.toISOString().split('T')[0]
                    taskCountsByDate[dateString] = (taskCountsByDate[dateString] || 0) + 1
                    currentDate.setDate(currentDate.getDate() + 1)
                }
            })

            const sortedDates = Object.keys(taskCountsByDate).sort()
            const sortedCounts = sortedDates.map((date) => taskCountsByDate[date])

            chartData.value = {
                labels: sortedDates,
                datasets: [
                    {
                        label: 'Daily Task Counts',
                        data: sortedCounts,
                        fill: false,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        tension: 0.1
                    }
                ]
            }
        }

        onMounted(() => {
            processChartData()
        })

        watch(
            () => props.tasks,
            (newVal, oldVal) => {
                processChartData()
            },
            { immediate: true }
        )

        return {
            chartData,
            chartOptions
        }
    }
}
</script>
