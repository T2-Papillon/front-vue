<template>
    <div v-if="isLoading" class="loading-spinner">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isLoading: {
            type: Boolean,
            required: true
        }
    }
}
</script>

<style scoped>
.loading-spinner {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8); /* 반투명한 흰색 배경 */
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
