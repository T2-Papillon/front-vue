<template>
    <h4 class="card-title">{{ assigneeName }}님과 프로젝트를 협업하는 직원 수 및 부서별 현황</h4>
    <h3 class="card-text fw-bold">{{ totalContributors }}명</h3>
    <div class="d-flex align-items-center justify-content-center" v-if="chartData">
        <div>
            <Doughnut :data="chartData" :options="chartOptions" />
        </div>
    </div>
    <div v-else>데이터를 불러오는 중입니다...</div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { ref, onMounted, watch } from 'vue'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    name: 'DeptChart',
    components: {
        Doughnut
    },
    props: {
        assigneeName: String,
        projects: Array,
        tasks: Array
    },
    setup(props) {
        const chartData = ref(null)
        const totalContributors = ref(0)
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true
                }
            }
        }

        const processChartData = () => {
            const departmentCounts = {}
            props.tasks.forEach(task => {
                if (task.assignee_name === props.assigneeName) {
                    props.projects.forEach(project => {
                        project.participants.forEach(contributor => {
                            if (contributor.name === props.assigneeName) {
                                const department = contributor.dept_no
                                departmentCounts[department] = (departmentCounts[department] || 0) + 1
                            }
                        })
                    })
                }
            })

            const labels = Object.keys(departmentCounts)
            const data = Object.values(departmentCounts)
            const backgroundColor = [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(199, 199, 199, 0.2)',
                'rgba(83, 102, 255, 0.2)',
                'rgba(255, 129, 102, 0.2)',
                'rgba(175, 162, 235, 0.2)',
                'rgba(255, 230, 186, 0.2)',
                'rgba(195, 192, 192, 0.2)'
            ]
            const borderColor = [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(199, 199, 199, 1)',
                'rgba(83, 102, 255, 1)',
                'rgba(255, 129, 102, 1)',
                'rgba(175, 162, 235, 1)',
                'rgba(255, 230, 186, 1)',
                'rgba(195, 192, 192, 1)'
            ]

            chartData.value = {
                labels,
                datasets: [
                    {
                        data,
                        backgroundColor,
                        borderColor,
                        borderWidth: 1
                    }
                ]
            }
        }

        onMounted(() => {
            processChartData()
        })

        watch(
            () => props.tasks,
            () => {
                processChartData()
            },
            { immediate: true }
        )

        return {
            chartData,
            chartOptions,
            assigneeName,
            totalContributors
        }
    }
}
</script>
