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
        tasks: Array // 부모 컴포넌트로부터 받은 tasks 데이터
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
        this.processChartData(); // 차트 데이터 가공
    },
    watch: {
        tasks: {
            immediate: true,
            handler(newVal) {
                this.processChartData(); // tasks 데이터가 변경될 때마다 차트 데이터를 다시 가공
            }
        }
    },
    methods: {
        processChartData() {
            if (!this.tasks) return; // tasks 데이터가 없으면 처리 중단

            const priorityMapping = {
                LV0: '긴급',
                LV1: '높음',
                LV2: '보통',
                LV3: '낮음'
            };

            const tasksPerPriority = this.tasks.reduce((acc, task) => {
                const priorityLabel = priorityMapping[task.task_priority] || '기타';
                acc[priorityLabel] = (acc[priorityLabel] || 0) + 1;
                return acc;
            }, {});

            this.chartData = {
                labels: Object.keys(tasksPerPriority),
                datasets: [{
                        label: '우선순위별 업무 분포',
                        data: Object.values(tasksPerPriority),
                        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                        borderWidth: 1
                    }
                ]
            };

            console.log("차트 데이터", this.chartData);
        }
    }
}
</script>
