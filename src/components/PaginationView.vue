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

<script>
export default {
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        }
    },
    computed: {
        pages() {
            let pages = []
            for (let i = 1; i <= this.totalPages; i++) {
                pages.push(i)
            }
            return pages
        }
    },
    methods: {
        changePage(page) {
            if (page < 1 || page > this.totalPages) {
                return
            }
            this.$emit('page-changed', page)
        }
    }
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
