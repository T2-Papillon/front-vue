<script>
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
import { Scatter } from 'vue-chartjs'

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

export default {
    components: {
        Scatter
    },
    data() {
        return {
            data: {
                datasets: [
                    {
                        label: 'Scatter Dataset 1',
                        fill: false,
                        borderColor: '#f87979',
                        backgroundColor: '#f87979',
                        data: [
                            { x: -2, y: 4 },
                            { x: -1, y: 1 },
                            { x: 0, y: 0 },
                            { x: 1, y: 1 },
                            { x: 2, y: 4 }
                        ]
                    },
                    {
                        label: 'Scatter Dataset 2',
                        fill: false,
                        borderColor: '#7acbf9',
                        backgroundColor: '#7acbf9',
                        data: [
                            { x: -2, y: -4 },
                            { x: -1, y: -1 },
                            { x: 0, y: 1 },
                            { x: 1, y: -1 },
                            { x: 2, y: -4 }
                        ]
                    }
                ]
            },
            options: {
                responsive: false, //움직임
                maintainAspectRatio: false
            }
        }
    }
}
</script>
<template>
    <Scatter :data="data" :options="options" />
</template>
