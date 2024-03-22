<script setup>
import { RouterLink, RouterView } from 'vue-router'

import Header from './components/common/layout/HeaderApp.vue'
import Footer from './components/common/layout/FooterApp.vue'
</script>

<template>
    <Header />
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/login">로그인</RouterLink>
        <RouterLink to="/kit">UI Kit</RouterLink>
        <RouterLink to="/project">프로젝트</RouterLink>
    </nav>
    <RouterView />
    <Footer />
</template>

<style scoped></style>
