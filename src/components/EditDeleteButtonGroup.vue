<template>
    <div class="btn-group">
        <button class="btn btn-outline-secondary" @click="handleEdit"><i class="bi bi-pencil"></i> 수정</button>
        <button class="btn btn-outline-secondary" @click="handleDelete"><i class="bi bi-trash"></i> 삭제</button>
    </div>
</template>

<script>
export default {
    methods: {
        handleEdit() {
            // 수정 버튼을 클릭했을 때의 로직을 작성합니다.
            console.log('수정 버튼 클릭됨')
        },
        handleDelete() {
            // 삭제 버튼을 클릭했을 때의 로직을 작성합니다.
            console.log('삭제 버튼 클릭됨')
        }
    }
}
</script>

<style></style>
