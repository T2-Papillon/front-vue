<template>
    <div v-if="chartData">
        <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
    <div v-else>데이터를 불러오는 중입니다...</div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChartProjectTaskStatus',
    components: { Bar },
    props: {
        tasks: Array
    },
    data() {
        return {
            chartData: null,
            chartOptions: {
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
        }
    },
    mounted() {
        this.processChartData()
    },
    watch: {
        tasks: {
            immediate: true,
            handler(newVal) {
                this.processChartData();
            }
        }
    },
    methods: {
        processChartData() {
            if (!this.tasks) return;
            const statusMapping = {
                'TODO': '진행예정',
                'DOING': '진행중',
                'DONE': '완료',
                'HOLD': '보류'
            };

            const tasksPerStatus = {
                '진행예정': 0,
                '진행중': 0,
                '완료': 0,
                '보류': 0
            };

            this.tasks.forEach(task => {
                const status = statusMapping[task.task_status] || task.task_status;
                tasksPerStatus[status] = (tasksPerStatus[status] || 0) + 1;
            });


            this.chartData = {
                labels: Object.keys(tasksPerStatus),
                datasets: [
                    {
                        label: '업무 상태별 개수',
                        data: Object.values(tasksPerStatus),
                        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)'],
                        borderWidth: 1
                    }
                ]
            };
        }
    }
}
</script>

