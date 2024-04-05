<template>
    <div v-if="chartData">
        <Pie :id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
    <div v-else>데이터를 불러오는 중입니다...</div>
</template>

<script>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default {
    name: 'PieChartUserProjectTask',
    components: { Pie },
    props: {
        assigneeName: String,
    },
    setup(props) {
        const chartData = ref(null);
        const chartOptions = { responsive: true };

        const fetchProjectsAndTasks = async () => {
            const apiUrl = import.meta.env.VITE_API_URL;
            console.log("Fetching projects and tasks..."); // 디버깅: 데이터를 불러오기 시작
            try {
                const tasksResponse = await axios.get(`${apiUrl}/task/taskAll`);
                console.log("Tasks fetched:", tasksResponse.data); // 디버깅: 태스크 데이터 로그
                const tasks = tasksResponse.data;

                const projectsResponse = await axios.get(`${apiUrl}/project`);
                console.log("Projects fetched:", projectsResponse.data); // 디버깅: 프로젝트 데이터 로그
                const projects = projectsResponse.data;

                const projectMapping = projects.reduce((acc, project) => {
                    acc[project.projNo] = project.projTitle;
                    return acc;
                }, {});
                console.log("Project mapping:", projectMapping); // 디버깅: 프로젝트 매핑 로그
            
                processChartData(tasks, projectMapping);

            } catch (error) {
                console.error("Error fetching data:", error); // 디버깅: 에러 로그
            }
        };

        const processChartData = (tasks, projectMapping) => {
            console.log(`Processing chart data for assignee: ${props.assigneeName}`); // 디버깅: 데이터 처리 시작
            const filteredTasks = tasks.filter(task => task.assignee === props.assigneeName);
            console.log("Filtered tasks:", filteredTasks); // 디버깅: 필터링된 태스크 로그

            const projectTaskCounts = filteredTasks.reduce((acc, task) => {
                const projectName = projectMapping[task.proj_no];
                acc[projectName] = (acc[projectName] || 0) + 1;
                return acc;
            }, {});
            console.log("Project task counts:", projectTaskCounts); // 디버깅: 프로젝트별 태스크 개수 로그

            chartData.value = {
                labels: Object.keys(projectTaskCounts),
                datasets: [{
                    data: Object.values(projectTaskCounts),
                    // label: `${assigneeName}님의 주간 프로젝트 참여 분포`,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                }]
            };
            console.log("Final chart data:", chartData.value); // 디버깅: 최종 차트 데이터 로그
        };

        onMounted(fetchProjectsAndTasks);
        watch(() => props.assigneeName, () => {
            console.log(`Assignee name changed to: ${props.assigneeName}`); // 디버깅: assigneeName 변경 로그
            fetchProjectsAndTasks();
        });

        return {
            chartData,
            chartOptions,
        };
    },
};
</script>
