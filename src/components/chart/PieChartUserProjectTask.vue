<template>
    <div class="d-flex align-items-center justify-content-center" v-if="chartData">
        <Pie id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
    <div v-else>데이터를 불러오는 중입니다...</div>
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { ref, onMounted, watch } from 'vue'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

export default {
    name: 'PieChartUserProjectTask',
    components: { Pie },
    props: {
        assigneeName: String,
        tasks: Array,
        projects: Array
    },
    setup(props) {
        const chartData = ref(null)
        const chartOptions = { responsive: true }

        const processChartData = (tasks, projects, assigneeName) => {
            const projectMapping = projects.reduce((acc, project) => {
                acc[project.id] = project.title
                return acc
            }, {})

            const userTasks = tasks.filter((task) => task.assignee_name === props.assigneeName)

            const projectTaskCounts = userTasks.reduce((acc, task) => {
                const projectName = projectMapping[task.proj_no]
                if (projectName) {
                    acc[projectName] = (acc[projectName] || 0) + 1
                }
                return acc
            }, {})

            chartData.value = {
                labels: Object.keys(projectTaskCounts),
                datasets: [
                    {
                        data: Object.values(projectTaskCounts),
                        // label: `${props.assigneeName}님의 주간 프로젝트 참여 분포`,
                        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                        borderWidth: 1
                    }
                ]
            }
        }

        onMounted(() => {
            processChartData(props.tasks, props.projects, props.assigneeName)
        })

        watch(
            () => props.tasks,
            (newVal, oldVal) => {
                processChartData(props.tasks, props.projects, props.assigneeName)
            },
            { immediate: true }
        )

        return {
            chartData,
            chartOptions
        }
    }
}
</script>
<style scoped>
#my-chart-id {
    width: 80% !important;
    height: auto !important;
}
</style>
