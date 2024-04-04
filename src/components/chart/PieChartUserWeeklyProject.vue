<template>
    <div v-if="chartData">
        <Pie :id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
    <div v-else>데이터를 불러오는 중입니다...</div>
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import axios from 'axios'
import { ref, onMounted } from 'vue'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

export default {
    name: 'PieChartUserWeeklyProject',
    components: { Pie },
    setup() {
        const chartData = ref(null)
        const chartOptions = { responsive: true }
        const assigneeName = ref(sessionStorage.getItem('NM'))

        const fetchProjectsAndTasks = async () => {
            const apiUrl = import.meta.env.VITE_API_URL;
            try {
                // 동시에 프로젝트와 태스크 데이터를 불러옵니다.
                const [projectResponse, taskResponse] = await Promise.all([
                    axios.get(`${apiUrl}/project`),
                    axios.get(`${apiUrl}/task/taskAll`)
                ]);
                
                const projects = projectResponse.data;
                const tasks = taskResponse.data;

                // 프로젝트 번호와 이름의 매핑을 생성합니다.
                const projectMapping = projects.reduce((acc, project) => {
                    acc[project.projectNo] = project.projectName;
                    return acc;
                }, {});

                processChartData(tasks, projectMapping);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        const processChartData = (tasks, projectMapping) => {
            // 로그인한 사용자가 참여하는 태스크만 필터링합니다.
            const userTasks = tasks.filter(task => task.assignee === assigneeName.value);
            
            // 프로젝트별 태스크 개수를 집계합니다.
            const projectTaskCounts = userTasks.reduce((acc, task) => {
                const projectName = projectMapping[task.projectNo];
                if (projectName) { // projectName이 존재하는 경우에만 집계
                    acc[projectName] = (acc[projectName] || 0) + 1;
                }
                return acc;
            }, {});

            chartData.value = {
                labels: Object.keys(projectTaskCounts),
                datasets: [{
                    label: `${assigneeName.value}님의 주간 프로젝트 참여 분포`,
                    data: Object.values(projectTaskCounts),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)', 
                            'rgba(54, 162, 235, 0.2)', 
                            'rgba(255, 206, 86, 0.2)', 
                            'rgba(75, 192, 192, 0.2)', 
                            'rgba(153, 102, 255, 0.2)', 
                            'rgba(255, 159, 64, 0.2)',
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
        }

        onMounted(fetchProjectsAndTasks);

        return {
            chartData,
            chartOptions,
            assigneeName
        }
    }
}
</script>
