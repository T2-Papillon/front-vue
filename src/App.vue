<script setup>
import { RouterLink, RouterView } from 'vue-router'

import Header from './components/common/layout/HeaderApp.vue'
import Footer from './components/common/layout/FooterApp.vue'
</script>

<template>
    <div class="wrapper">
        <Header></Header>

        <div class="inner">
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
            </nav>

            <RouterView />
        </div>
        <Footer></Footer>
    </div>
</template>

<style scoped></style>
./components/common/layout/HeaderApp.vue./components/common/layout/FooterApp.vue
