<template>
    <div v-if="chartData">
        <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
    <div v-else>데이터를 불러오는 중입니다...</div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import axios from 'axios'
import { ref, onMounted, watch } from 'vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChartUserTaskPriority',
    components: { Bar },
    props: {
        assigneeName: String,
        tasks: Array
    },
    setup(props) {
        const chartData = ref(null)
        const isLoading = ref(false)
        const chartOptions = {
            responsive: true,
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
        }

        const processChartData = (tasks, assigneeName) => {
            if (!tasks || tasks.length === 0) return
            const priorityMapping = {
                LV0: '긴급',
                LV1: '높음',
                LV2: '보통',
                LV3: '낮음'
            }

            const tasksPerPriority = tasks.reduce((acc, task) => {
                const priority = priorityMapping[task.task_priority] || task.task_priority // Use mapped priority or raw value
                acc[priority] = (acc[priority] || 0) + 1
                return acc
            }, {})

            chartData.value = {
                labels: Object.keys(tasksPerPriority),
                datasets: [
                    {
                        label: false,
                        data: Object.values(tasksPerPriority),
                        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                        borderWidth: 1
                    }
                ]
            }
            isLoading.value = false
        }

        onMounted(() => {
            processChartData(props.tasks, props.assigneeName)
        })

        watch(
            () => props.tasks,
            (newVal, oldVal) => {
                processChartData(props.tasks, props.assigneeName)
            },
            { immediate: true }
        )

        return {
            chartData,
            chartOptions,
            isLoading
        }
    }
}
</script>
