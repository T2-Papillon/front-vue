<template>
    <div v-if="chartData">
        <Pie :id="chartId" :options="chartOptions" :data="chartData" />
    </div>
    <div v-else>데이터를 불러오는 중입니다...</div>
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { ref, onMounted } from 'vue'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

export default {
    name: 'PieChartUserWeeklyProject',
    components: { Pie },
    props: {
        tasks: Array,
        projects: Array,
        assigneeName: String
    },
    setup(props) {
        const chartData = ref(null)
        const chartOptions = { responsive: true }

        const processChartData = () => {
            const projectMapping = props.projects.reduce((acc, project) => {
                acc[project.projNo] = project.projTitle;
                return acc;
            }, {});
            console.log('프로젝트 매핑:', projectMapping);

            // 해당 사용자가 참여하는 태스크만 필터링합니다.
            const userTasks = props.tasks.filter(task => task.assignee_name === props.assigneeName);
            console.log('사용자 태스크:', userTasks);

            // 프로젝트별 태스크 개수를 집계합니다.
            const projectTaskCounts = userTasks.reduce((acc, task) => {
                const projectName = projectMapping[task.proj_no];
                if (projectName) { // projectName이 존재하는 경우에만 집계
                    acc[projectName] = (acc[projectName] || 0) + 1;
                }
                return acc;
            }, {});
            console.log('프로젝트별 태스크 수:', projectTaskCounts);

            chartData.value = {
                labels: Object.keys(projectTaskCounts),
                datasets: [{
                    label: `${props.assigneeName}님의 주간 프로젝트 참여 분포`,
                    data: Object.values(projectTaskCounts),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)', 
                        'rgba(54, 162, 235, 0.2)', 
                        'rgba(255, 206, 86, 0.2)', 
                        'rgba(75, 192, 192, 0.2)', 
                        'rgba(153, 102, 255, 0.2)', 
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            };
            console.log('차트 데이터:', chartData.value);
        }

        onMounted(processChartData);

        return {
            chartData,
            chartOptions
        }
    }
}
</script>
