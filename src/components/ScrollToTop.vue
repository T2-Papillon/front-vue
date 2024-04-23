<template>
    <button v-show="visible" class="scroll-to-top" @click="scrollToTop">↑</button>
</template>

<script>
export default {
    data() {
        return {
            visible: false
        }
    },
    methods: {
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        },
        handleScroll() {
            this.visible = window.scrollY > 200
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }
}
</script>

<style scoped>
.scroll-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 15px;
    font-size: 20px;
    background-color: #1bd689;
    color: white;
    border: none;
    border-radius: 100%;
    cursor: pointer;
    z-index: 1000;
    display: inline-block;
    animation: all 0.6s;
}

.scroll-to-top:hover {
    background-color: #1b9a65;
}
</style>
