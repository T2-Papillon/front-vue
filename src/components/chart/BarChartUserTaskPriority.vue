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
        assigneeName: String // assigneeName을 prop으로 받습니다.
    },
    setup(props) {
        const chartData = ref(null)
        const chartOptions = {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1 // Ensure y-axis values are whole numbers
                    }
                }
            }
        }

        // assigneeName에 따라 태스크를 가져오는 함수
        const fetchTasks = async () => {
            const apiUrl = import.meta.env.VITE_API_URL;
            try {
                const response = await axios.get(`${apiUrl}/task/taskAll`);
                const tasks = response.data;
                processChartData(tasks, props.assigneeName);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }

        const processChartData = (tasks, assigneeName) => {
            const priorityMapping = {
                'LV0': '긴급',
                'LV1': '높음',
                'LV2': '보통',
                'LV3': '낮음'
            }

            // Filter tasks for the logged-in assignee and count by priority
            const filteredTasks = tasks.filter(task => task.assignee === assigneeName);

            const tasksPerPriority = filteredTasks.reduce((acc, task) => {
                const priority = priorityMapping[task.task_priority] || task.task_priority; // Use mapped priority or raw value
                acc[priority] = (acc[priority] || 0) + 1;
                return acc;
            }, {});

            chartData.value = {
                labels: Object.keys(tasksPerPriority),
                datasets: [
                    {
                        label: `${assigneeName}님의 우선순위별 업무 분포`,
                        data: Object.values(tasksPerPriority),
                        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                        borderWidth: 1
                    }
                ]
            };
        }

        onMounted(fetchTasks)
        watch(() => props.assigneeName, fetchTasks) // assigneeName prop이 바뀔 때마다 fetchTasks 함수를 호출합니다.

        return {
            chartData,
            chartOptions
        }
    }
}
</script>
