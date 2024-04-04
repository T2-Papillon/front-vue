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

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'TaskStatusByAssigneeChart',
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
            },
            assigneeName: "서현우" // 이 부분을 동적으로 설정할 수 있도록 수정할 수 있습니다.
        }
    },
    async mounted() {
        await this.fetchTasks();
    },
    methods: {
        async fetchTasks() {
            const apiUrl = import.meta.env.VITE_API_URL;
            try {
                const response = await axios.get(`${apiUrl}/task/taskAll`);
                const tasks = response.data;
                this.processChartData(tasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        },
        processChartData(tasks) {
            const statusMapping = {
                'TODO': '진행예정',
                'DOING': '진행중',
                'DONE': '완료',
                'HOLD': '보류'
            };

            // 특정 assignee의 task만 필터링
            const filteredTasks = tasks.filter(task => task.assignee === this.assigneeName);

            const tasksPerStatus = filteredTasks.reduce((acc, task) => {
                const status = statusMapping[task.task_status] || task.task_status; // 매핑된 상태 사용, 또는 기본 값
                if (!acc[status]) {
                    acc[status] = 0;
                }
                acc[status]++;
                return acc;
            }, {});

            this.chartData = {
                labels: Object.keys(tasksPerStatus),
                datasets: [
                    {
                        label: `${this.assigneeName}님의 업무 상태별 개수`,
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
