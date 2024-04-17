<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    name: 'DeptChart',
    components: {
        Doughnut
    },
    data() {
        return {
            data: {
                // labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs', 'NodeJs', 'Python', 'Java', 'C#', 'Ruby', 'PHP', 'Swift', 'TypeScript'],
                datasets: [
                    {
                        backgroundColor: [
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
                        ],
                        borderColor: [
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
                        ],
                        borderWidth: 1,
                        data: [0, 20, 80, 10, 40, 30, 15, 25, 50, 35, 45, 55]
                    }
                ]
            },
            options: {
                responsive: false,
                maintainAspectRatio: false
            }
        }
    }
}
</script>

<template>
    <Doughnut :data="data" :options="options" />
</template>
