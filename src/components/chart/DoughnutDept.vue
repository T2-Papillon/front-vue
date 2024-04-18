<template>
    <div class="d-flex align-items-center justify-content-center" v-if="chartData">
        <Doughnut :data="chartData" :options="chartOptions" />
    </div>
    <div v-else>데이터를 불러오는 중입니다...</div>
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    name: 'DeptChart',
    components: {
        Doughnut
    },
    props: {
        projects: Array
    },
    setup(props) {
        const chartData = ref(null)
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true
                }
            }
        }

        const processChartData = () => {
            const departmentCounts = {}

            props.projects.forEach(project => {
                project.contributors.forEach(contributor => {
                    const dept = contributor.dept_no
                    if (dept) {
                        departmentCounts[dept] = (departmentCounts[dept] || 0) + 1
                    }
                })
            })

            chartData.value = {
                labels: Object.keys(departmentCounts),
                datasets: [
                    {
                        data: Object.values(departmentCounts),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)',
                            'rgba(199, 199, 199, 0.2)', 'rgba(83, 102, 255, 0.2)',
                            'rgba(255, 129, 102, 0.2)', 'rgba(175, 162, 235, 0.2)',
                            'rgba(255, 230, 186, 0.2)', 'rgba(195, 192, 192, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',
                            'rgba(199, 199, 199, 1)', 'rgba(83, 102, 255, 1)',
                            'rgba(255, 129, 102, 1)', 'rgba(175, 162, 235, 1)',
                            'rgba(255, 230, 186, 1)', 'rgba(195, 192, 192, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            }
        }

        onMounted(() => {
            processChartData()
        })

        return { chartData, chartOptions }
    }
}
</script>
