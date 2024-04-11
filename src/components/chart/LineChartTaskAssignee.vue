<template>
    <div v-if="chartData">
        <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
    <div v-else>데이터를 불러오는 중입니다...</div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import axios from 'axios'
import { useRoute } from 'vue-router'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default {
    name: 'LineChartTaskAssignee',
    components: { Line },
    data() {
        return {
            chartData: null, // 차트 데이터를 null로 초기화
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
        }
    },
    async mounted() {
        await this.fetchTasks();
    },
    methods: {
        async fetchTasks() {
            const route = useRoute();
            const projectId = route.params.id;
            try {
                const apiUrl = import.meta.env.VITE_API_URL;
                const response = await axios.get(`${apiUrl}/task/project/${projectId}/task`); // 수정된 API URL 사용
                const tasks = response.data;
                this.processChartData(tasks);
            } catch (error) {
                console.error("Error fetching tasks from:", apiUrl, error);
            }
        },
        processChartData(tasks) {
            const tasksPerAssignee = tasks.reduce((acc, task) => {
                const assigneeName = task.assignee;
                if (!acc[assigneeName]) {
                    acc[assigneeName] = 0;
                }
                acc[assigneeName]++;
                return acc;
            }, {});

            this.chartData = {
                labels: Object.keys(tasksPerAssignee),
                datasets: [
                    {
                        // label: '업무 개수',
                        data: Object.values(tasksPerAssignee),
                        fill: false,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        tension: 0.1
                    }
                ]
            };
        }
    }
}
</script>
