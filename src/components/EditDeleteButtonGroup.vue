<script>
import axios from 'axios'

export default {
    props: {
        projectId: Number,
        taskId: Number
    },
    methods: {
        handleEdit() {
            alert('준비중입니다.')
        },
        async handleDelete() {
            if (confirm('정말 삭제하시겠습니까?')) {
                try {
                    const apiUrl = import.meta.env.VITE_API_URL
                    await axios.delete(`${apiUrl}/task/project/${this.projectId}/task/${this.taskId}`)

                    console.log('태스크가 성공적으로 삭제되었습니다.')
                    this.$emit('taskDeleted', this.taskId)
                } catch (error) {
                    console.error('태스크 삭제 중 에러가 발생했습니다.', error)
                }
            }
        }
    }
}
</script>

<template>
    <div class="btn-group">
        <button class="btn btn-outline-secondary" @click="handleEdit"><i class="bi bi-pencil"></i> 수정</button>
        <button class="btn btn-outline-secondary" @click="handleDelete"><i class="bi bi-trash"></i> 삭제</button>
    </div>
</template>

<style></style>
