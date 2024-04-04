<template>
    <Line :data="data" :options="options" />
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'
import axios from 'axios'
import { ref, onMounted } from 'vue'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default {
    name: 'WeeklyTaskChart',
    components: {
        'line-chart': Line
    },
    setup() {
        const chartData = ref({
            labels: [], // 주차별 라벨
            datasets: [
                // 데이터 세트는 fetchTasks에서 동적으로 채워짐
            ]
        })
        
        const chartOptions = {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: true
                }
            }
        }

        const fetchTasks = async () => {
            const apiUrl = import.meta.env.VITE_API_URL;
            try {
                const response = await axios.get(`${apiUrl}/task/taskAll`);
                const tasks = response.data;

                // 여기에 주차별 데이터 집계 로직을 구현하세요.
                // 예시 코드에서는 단순한 집계 로직을 사용하였으며, 실제 구현에 따라 달라질 수 있습니다.

                // 임시로 모든 날짜를 '1주차'로 분류하였습니다. 실제 로직에서는 태스크의 start_date 또는 end_date를 사용하여 주차를 결정해야 합니다.
                const completedTasksCounts = tasks.filter(task => task.task_status === '완료').length;
                const onHoldTasksCounts = tasks.filter(task => task.task_status === '보류').length;

                chartData.value.labels = ['1주차']
                chartData.value.datasets = [
                    {
                        label: '완료 업무 개수',
                        data: [completedTasksCounts], // 완료 업무 개수 데이터
                        borderColor: 'rgba(75, 192, 192, 1)',
                        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                        fill: false
                    },
                    {
                        label: '보류 업무 개수',
                        data: [onHoldTasksCounts], // 보류 업무 개수 데이터
                        borderColor: 'rgba(153, 102, 255, 1)',
                        pointBackgroundColor: 'rgba(153, 102, 255, 1)',
                        fill: false
                    }
                ];
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }

        onMounted(fetchTasks)

        return {
        chartData,
        chartOptions
        }
    }
}
</script>
