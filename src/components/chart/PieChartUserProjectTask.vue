<template>
    <div v-if="chartData">
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
            console.log('Processing chart data...');
            console.log('Received projects:', props.projects); // 프로젝트 데이터 확인
            console.log('Received tasks:', props.tasks); // 태스크 데이터 확인

            // 프로젝트 번호와 이름의 매핑을 생성합니다.
            const projectMapping = projects.reduce((acc, project) => {
                acc[project.id] = project.title;
                return acc;
            }, {});
            console.log('Project mapping completed:', projectMapping);

            // 특정 사용자가 참여하는 태스크만 필터링합니다.
            const userTasks = tasks.filter(task => task.assignee_name === props.assigneeName);
            console.log('Filtered tasks:', userTasks);

            // 프로젝트별 태스크 개수를 집계합니다.
            const projectTaskCounts = userTasks.reduce((acc, task) => {
                const projectName = projectMapping[task.proj_no];
                if (projectName) {
                    acc[projectName] = (acc[projectName] || 0) + 1;
                }
                return acc;
            }, {});

            console.log('Project task counts:', projectTaskCounts);

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
            console.log('차트 데이터:', chartData.value);
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