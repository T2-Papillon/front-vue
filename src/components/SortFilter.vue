<template>
    <div class="btn-group">
        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-funnel"></i> 정렬</button>
        <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">최신순</a></li>
            <li><a class="dropdown-item" href="#">우선순위순</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isOpen: false
        }
    },
    methods: {
        sortByLatest() {
            this.projects.sort((a, b) => {
                return new Date(b.writeDate) - new Date(a.writeDate)
            })
        },
        sortByPriority() {
            const priorityOrder = { 긴급: 0, 높음: 1, 보통: 2, 낮음: 3 }
            this.projects.sort((a, b) => {
                return priorityOrder[a.priority] - priorityOrder[b.priority]
            })
        }
    }
}
</script>
