<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    name: 'App',
    components: {
        Pie
    },
    data() {
        return {
            data: {
                labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
                datasets: [
                    {
                        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                        data: [40, 20, 80, 10]
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
    <Pie :data="data" :options="options" />
</template>
