<template>
    <div v-if="isActive" class="modal show" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Task Detail</h5>
                    <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
                </div>
                <div class="modal-body">TaskDetailModal입니다.</div>
            </div>
        </div>
    </div>

    <!-- 배경 모달 -->
    <div v-if="isActive" class="modal-backdrop fade show" @click="closeModal"></div>
</template>

<script>
export default {
    props: {
        isActive: Boolean, // 모달 활성/비활성 상태
        task: Object // 선택된 작업 데이터
    },
    methods: {
        closeModal() {
            this.$emit('close-modal')
        }
    }
}
</script>

<style scoped>
.modal {
    display: none;
    z-index: 1050;
    overflow: hidden;
    outline: 0;
}

.modal.show {
    display: block;
}

.modal.fade .modal-dialog {
    transition: transform 0.3s ease-out;
    transform: translate(0, -50px);
}

.modal-header {
    padding: 1rem 1rem;
    border-bottom: 1px solid #dee2e6;
    background-color: #f7f7f7;
}

.modal-body {
    position: relative;
    flex: 1 1 auto;
    padding: 1rem;
    overflow-y: auto;
    background-color: #fff;
}

.modal-backdrop {
    display: none;
}

.modal-backdrop.fade.show {
    display: block;
    opacity: 0.5;
}
</style>
