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
    name: 'BarChartProjectTaskPriority',
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

            const priorityMapping = {
                LV0: '긴급',
                LV1: '높음',
                LV2: '보통',
                LV3: '낮음'
            };

            // 모든 우선순위에 대한 초기화
            const tasksPerPriority = {
                '긴급': 0,
                '높음': 0,
                '보통': 0,
                '낮음': 0
            };

            this.tasks.forEach(task => {
                const priorityLabel = priorityMapping[task.task_priority] || '기타';
                tasksPerPriority[priorityLabel] = (tasksPerPriority[priorityLabel] || 0) + 1;
            });

            this.chartData = {
                labels: Object.keys(tasksPerPriority),
                datasets: [{
                        label: '우선순위별 업무 분포',
                        data: Object.values(tasksPerPriority),
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
