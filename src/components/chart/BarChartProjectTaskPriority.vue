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
import { onMounted, reactive, toRefs, watch } from 'vue'
import { useRoute } from 'vue-router'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChartProjectTaskPriority',
    components: { Bar },
    setup() {
        const route = useRoute()
        const state = reactive({
            chartData: null,
            chartOptions: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false // 범례가 표시되지 않도록
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1 // y축의 값이 1 단위로 나오도록 설정
                        }
                    }
                }
            }
        })

        async function fetchTasks() {
            const route = useRoute()
            const projectId = route.params.id
            try {
                const apiUrl = import.meta.env.VITE_API_URL
                const response = await axios.get(`${apiUrl}/task/project/${projectId}/task`)
                const tasks = response.data
                processChartData(tasks)
            } catch (error) {}
        }

        function processChartData(tasks) {
            const priorityMapping = {
                LV0: '긴급',
                LV1: '높음',
                LV2: '보통',
                LV3: '낮음'
            }

            const tasksPerPriority = tasks.reduce((acc, task) => {
                const priorityLabel = priorityMapping[task.task_priority]
                acc[priorityLabel] = (acc[priorityLabel] || 0) + 1
                return acc
            }, {})

            state.chartData = {
                labels: Object.keys(tasksPerPriority),
                datasets: [
                    {
                        label: '우선순위별 업무 분포',
                        data: Object.values(tasksPerPriority),
                        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                        borderWidth: 1
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
