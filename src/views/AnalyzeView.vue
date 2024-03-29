<script>
import PieChartExample from '../components/PieChartExample.vue'


export default {
    components: {
        PieChartExample
    },
    data() {
        return {
            projects: []
        }
    },
    mounted() {
        // this.fetchProjectDetail()
    }
}
</script>
<template>
    <div>
        <PieChartExample />
    </div>
</template>

<style></style>
