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
                <button class="page-link" @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPages">Next</button>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import { useProjects } from '@/composables/useProjects'

const { fetchProjects, totalPages } = useProjects()

const props = defineProps({
    currentPage: {
        type: Number,
        required: true
    },
    totalPages: {
        type: Number,
        required: true
    }
})

const emit = defineEmits(['update:currentPage'])

const pages = ref([])

for (let i = 1; i <= props.totalPages; i++) {
    pages.value.push(i)
}

const router = useRouter()
</script>

<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
}

.pagination li button {
    padding: 5px 10px;
    border: 1px solid #ccc;
    background-color: #fff;
    cursor: pointer;
}

.pagination li button:hover {
    background-color: #f0f0f0;
}

.pagination li.active button {
    background-color: #007bff;
    color: #fff;
    border-color: #007bff;
}

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
