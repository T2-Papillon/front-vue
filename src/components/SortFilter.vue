<script>
export default {
    props: {
        sortByLatest: Function, // 최신순 정렬 함수를 props로 받음
        sortByPriority: Function // 우선순위순 정렬 함수를 props로 받음
    }
}
</script>

<template>
    <div class="btn-group">
        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-funnel"></i> 정렬</button>
        <ul class="dropdown-menu">
            <li><a href="#" class="dropdown-item" @click.prevent="sortByLatest">최신순</a></li>
            <li><a href="#" class="dropdown-item" @click.prevent="sortByPriority">우선순위순</a></li>
        </ul>
    </div>
</template>
