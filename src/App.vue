<script setup>
import { RouterView } from 'vue-router'

import Header from './components/common/layout/HeaderApp.vue'
import Footer from './components/common/layout/FooterApp.vue'
</script>

<template>
    <Header />
    <main>
        <RouterView />
    </main>
    <Footer />
</template>

<style scoped></style>
