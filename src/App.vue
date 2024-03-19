<script setup>
import { RouterLink, RouterView } from 'vue-router'

import Header from './components/common/layout/HeaderApp.vue'
import Footer from './components/common/layout/FooterApp.vue'
</script>

<template>
    <div class="wrap">
        <Header />
        <div class="inner">
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
            </nav>

            <RouterView />
        </div>
        <Footer />
    </div>
</template>

<style scoped></style>
