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
import { useRoute } from 'vue-router' // 라우트 파라미터에 접근하기 위해 useRoute를 사용합니다.

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChartProjectTaskStatus',
    components: { Bar },
    data() {
        return {
            chartData: null,
            chartOptions: {
                responsive: true,
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
            const route = useRoute(); // 현재 라우트를 가져옵니다.
            const projectId = route.params.id; // 라우트 파라미터에서 프로젝트 ID를 가져옵니다.
            try {
                const apiUrl = import.meta.env.VITE_API_URL;
                const response = await axios.get(`${apiUrl}/task/project/${projectId}/task`);
                const tasks = response.data;
                this.processChartData(tasks);
            } catch (error) {
                console.error("Error fetching tasks from:", apiUrl, error);
            }
        },
        processChartData(tasks) {
            const statusMapping = {
                'TODO': '진행예정',
                'DOING': '진행중',
                'DONE': '완료',
                'HOLD': '보류'
            };

            const tasksPerStatus = tasks.reduce((acc, task) => {
                const status = statusMapping[task.task_status] || task.task_status;
                acc[status] = (acc[status] || 0) + 1;
                return acc;
            }, {});

            this.chartData = {
                labels: Object.keys(tasksPerStatus),
                datasets: [
                    {
                        label: '업무 상태별 개수',
                        data: Object.values(tasksPerStatus),
                        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                        borderWidth: 1
                    }
                ]
            };
        }
    }
}
</script>

