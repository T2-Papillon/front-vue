<template>
    <div class="progress-wrap">
        <div class="progress">
            <div class="progress-bar" :style="{ width: progress + '%' }" role="progressbar" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100">{{ progress }}%</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        progress: {
            type: Number,
            default: 0
        }
    }
}
</script>

<style scoped>
.progress-bar {
    background-color: #1bd689;
}
</style>
