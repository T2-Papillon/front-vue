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
    name: 'BarChartTaskPriority',
    components: { Bar },
    data() {
        return {
            chartData: null,
            chartOptions: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1 // y축의 값이 1 단위로 나오도록 설정
                        }
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
            const apiUrl = import.meta.env.VITE_API_URL;
            try {
                const response = await axios.get(`${apiUrl}/task/project/4/task`); // 프로젝트 ID가 4인 업무 조회
                const tasks = response.data;
                console.log(tasks); // tasks 배열의 구조와 taskPriority 값 확인
                this.processChartData(tasks);
            } catch (error) {
                console.error("Error fetching tasks from:", apiUrl, error);
            }
        },
        processChartData(tasks) {
            const tasksPerPriority = tasks.reduce((acc, task) => {
                const priority = task.task_priority; // 우선순위 필드명
                if (!acc[priority]) {
                    acc[priority] = 0;
                }
                acc[priority]++;
                return acc;
            }, {});

            // 우선순위별 데이터를 차트 데이터 형식에 맞춰 업데이트
            this.chartData = {
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
            };
        }
    }
}
</script>
