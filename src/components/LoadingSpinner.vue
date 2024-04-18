<template>
    <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
</template>

<script>
export default {
    name: 'LoadingSpinner'
}
</script>

<style scoped>
.spinner-border {
    width: 3rem;
    height: 3rem;
}
</style>
