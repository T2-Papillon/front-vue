<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item" :class="{ disabled: currentPage <= 1 }">
                <button class="page-link" @click="changePage(currentPage - 1)">Previous</button>
            </li>
            <li class="page-item" v-for="page in pages" :key="page" :class="{ active: currentPage === page }">
                <button class="page-link" @click="changePage(page)">{{ page }}</button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
                <button class="page-link" @click="changePage(currentPage + 1)">Next</button>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { ref, defineProps, onMounted, watch } from 'vue'

const props = defineProps({
    currentPage: {
        type: Number,
        required: true
    },
    totalPages: {
        type: Number,
        required: true
    },
    onPageChanged: Function
})

const pages = []
for (let i = 1; i <= props.totalPages; i++) {
    pages.push(i)
}

const changePage = (page) => {
    if (page < 1 || page > props.totalPages) {
        return
    }
    // 페이지 변경 이벤트를 부모 컴포넌트로 전달합니다.
    props.onPageChanged(page)
}
</script>

<style scoped>
.pagination li.active .page-link {
    background-color: #007bff;
    border-color: #007bff;
    color: white;
}

.pagination li.disabled .page-link {
    color: grey;
}

.pagination li .page-link {
    cursor: pointer;
}
</style>
