<script>
import axios from 'axios'
import globalInfo from '@/utils/globalInfoUtils.js'

export default {
    props: {
        projectId: Number,
        taskId: Number,
        createdBy: String,
        currentUserEno: String
    },
    methods: {
        async handleEdit() {
            try {
                if (!this.projectId || !this.taskId) {
                    console.error('Project ID 또는 Task ID가 유효하지 않습니다.')
                    return
                }

                const apiUrl = import.meta.env.VITE_API_URL
                const response = await axios.get(`${apiUrl}/task/project/${this.projectId}/task/${this.taskId}`)
                const taskData = response.data
                this.$router.push({
                    name: 'taskedit',
                    params: {
                        projectId: this.projectId,
                        taskId: this.taskId
                    },
                    query: {
                        taskData: JSON.stringify(this.taskData)
                    }
                })
            } catch (error) {
                console.error('태스크 데이터를 가져오는 중 에러가 발생했습니다.', error)
            }
        },
        async handleDelete() {
            if (confirm('정말 삭제하시겠습니까?')) {
                try {
                    if (!this.projectId || !this.taskId) {
                        console.error('Project ID 또는 Task ID가 유효하지 않습니다.')
                        return
                    }

                    const apiUrl = import.meta.env.VITE_API_URL
                    await axios.delete(`${apiUrl}/task/project/${this.projectId}/task/${this.taskId}`)

                    this.$emit('taskDeleted', this.taskId)
                } catch (error) {
                    console.error('태스크 삭제 중 에러가 발생했습니다.', error)
                }
            }
        }
    },
    computed: {
        isCurrentUser() {
            return this.currentUserEno === this.createdBy
        }
    }
}
</script>

<template>
    <div class="btn-group" v-if="isCurrentUser">
        <button class="btn btn-outline-secondary" @click="handleEdit"><i class="bi bi-pencil"></i> 수정</button>
        <button class="btn btn-outline-secondary" @click="handleDelete"><i class="bi bi-trash"></i> 삭제</button>
    </div>
</template>

<style></style>
