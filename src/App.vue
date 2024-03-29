<script setup>
import { RouterView } from 'vue-router'

import Header from './components/layout/HeaderApp.vue'
import Footer from './components/layout/FooterApp.vue'
</script>

<template>
    <div id="wrap">
        <Header />
        <main>
            <RouterView />
        </main>
        <Footer />
    </div>
</template>

<style scoped>
#wrap {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
header {
    border-bottom: 1px solid #eaeaea;
}
main {
    flex-grow: 1;
}
</style>
