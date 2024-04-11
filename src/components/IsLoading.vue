<template>
    <div>
        <div v-if="isLoading" class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-else>
            <!-- 데이터 -->
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const isLoading = computed(() => store.getters.isLoading)

console.log('Loading component is mounted') // 컴포넌트가 마운트되었을 때 콘솔 출력
</script>
