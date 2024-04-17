<template>
    <div v-if="chartData">
        <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
    <div v-else>데이터를 불러오는 중입니다...</div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default {
    name: 'LineChartTaskAssignee',
    components: { Line },
    props: {
        tasks: Array
    },
    data() {
        return {
            chartData: null,
            chartOptions: {
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
            }
        }
    },
    mounted() {
        this.processChartData()
    },
    watch: {
        tasks: {
            immediate: true,
            handler(newVal) {
                this.processChartData()
            }
        }
    },
    methods: {
        processChartData() {
            console.log(this.tasks)
            if (!this.tasks) return

            const tasksPerAssignee = this.tasks.reduce((acc, task) => {
                const assigneeName = task.assignee_name
                if (!acc[assigneeName]) {
                    acc[assigneeName] = 0
                }
                acc[assigneeName]++
                return acc
            }, {})

            this.chartData = {
                labels: Object.keys(tasksPerAssignee),
                datasets: [
                    {
                        // label: '업무 개수',
                        data: Object.values(tasksPerAssignee),
                        fill: false,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        tension: 0.1
                    }
                ]
            }
        }
    }
}
</script>
