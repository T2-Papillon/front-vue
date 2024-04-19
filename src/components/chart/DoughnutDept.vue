<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
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
        const eno = parseInt(sessionStorage.getItem('EN'))
        const username = sessionStorage.getItem('NM')
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

        const processChartData = (departmentCounts) => {
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

        const fetchData = () => {
            try {
                const contributorsSet = new Set()
                const departmentCounts = {}
                props.projects.forEach((project) => {
                    project.participants.forEach((contributor) => {
                        const contributorEno = parseInt(contributor.eno)
                        const department = contributor.dept_no
                        if (contributorEno !== eno) {
                            contributorsSet.add(contributorEno)
                            departmentCounts[department] = (departmentCounts[department] || 0) + 1
                        }
                    })
                })
                totalContributors.value = contributorsSet.size

                processChartData(departmentCounts)
            } catch (e) {
                console.error('Error fetching dashboard data: ', e)
                // alert('데이터를 불러오는 중 문제가 발생했습니다. 콘솔 로그를 확인해주세요.')
            }
        }

        onMounted(() => {
            //fetchData(props.projects)
        })

        watch(
            () => props.projects,
            (newVal) => {
                fetchData()
            },
            { immediate: true }
        )

        return {
            chartData,
            chartOptions,
            username,
            totalContributors
        }
    }
}
</script>

<template>
    <h4 class="card-title">{{ username }}님과 프로젝트를 협업하는 직원 수 및 부서별 현황</h4>
    <h3 class="card-text fw-bold">{{ totalContributors }}명</h3>
    <div class="d-flex align-items-center justify-content-center" v-if="chartData">
        <div>
            <Doughnut :data="chartData" :options="chartOptions" />
        </div>
    </div>
    <div v-else>데이터를 불러오는 중입니다...</div>
</template>
