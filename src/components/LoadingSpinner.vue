<template>
    <div>
        <loading-spinner v-if="isLoading" />
        <div v-else>
            <!-- 데이터가 로드되면 보여질 내용 -->
            Content goes here...
        </div>
    </div>
</template>

<script>
import LoadingSpinner from './components/LoadingSpinner.vue'

export default {
    components: {
        LoadingSpinner
    },
    data() {
        return {
            isLoading: true
        }
    },
    mounted() {
        setTimeout(() => {
            this.isLoading = false
        }, 3000) // 예시로 3초 후 로딩 상태 변경
    }
}
</script>
