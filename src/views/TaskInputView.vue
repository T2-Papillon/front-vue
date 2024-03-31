<script>
import axios from 'axios'

export default {
    data() {
        return {
            title: '',
            assignee: '',
            startDate: '',
            endDate: '',
            status: '',
            priority: '',
            description: ''
        }
    },
    methods: {
        async saveTask() {
            try {
                const apiUrl = import.meta.env.VITE_API_URL
                const response = await axios.get(`${apiUrl}/task/project/${proNo}/task`)

                if (!response || !response.data) {
                    throw new Error('응답 객체 또는 응답 데이터가 유효하지 않습니다.')
                }

                const postData = {
                    title: this.title,
                    assignee: this.assignee,
                    startDate: this.startDate,
                    endDate: this.endDate,
                    status: this.status,
                    priority: this.priority,
                    description: this.description
                }
                const saveResponse = await axios.post(`${apiUrl}/task/project/${proNo}/task`, postData)
                console.log('저장되었습니다.', saveResponse.data)

                // 저장 후 입력 필드 초기화
                this.title = ''
                this.assignee = ''
                this.startDate = ''
                this.endDate = ''
                this.status = ''
                this.priority = ''
                this.description = ''
            } catch (error) {
                // console.error('저장에 실패했습니다.', error.response.data)
            }
        },
        // 저장 후 추가 기능
        saveAndAddTask() {
            this.saveTask()
                .then(() => {
                    // 새로운 업무 데이터를 부모 컴포넌트로 emit하여 전달
                    this.$emit('new-task-added', {
                        title: this.title,
                        assignee: this.assignee,
                        startDate: this.startDate,
                        endDate: this.endDate,
                        status: this.status,
                        priority: this.priority,
                        description: this.description
                    })
                })
                .catch((error) => {
                    console.error('저장에 실패했습니다.', error.response.data)
                })
        }
    }
}
</script>
<template>
    <div class="inner">
        <div class="row align-items-start justify-content-between g-3">
            <div class="col-auto">
                <div class="title-area">
                    <h2 class="h2">업무작성</h2>
                    <p class="text-body-tertiary lh-sm mb-0">예정된 업무를 적어주세요.</p>
                </div>
            </div>
            <!-- <div class="col-auto">
                <div class="top-btn-area">
                    <button class="btn btn-outline-dark me-4">대시보드</button>
                    <button class="btn btn-dark">통계분석</button>
                </div>
            </div> -->
        </div>

        <div class="row">
            <form @submit.prevent="saveTask">
                <div class="mb-3">
                    <label for="title" class="form-label">업무명</label>
                    <input type="text" v-model="title" class="form-control" id="title" />
                </div>
                <div class="mb-3">
                    <label for="assignee" class="form-label">담당자</label>
                    <input type="text" v-model="assignee" class="form-control" id="assignee" />
                </div>
                <div class="d-flex mb-3">
                    <div class="me-2">
                        <label for="startDate" class="form-label">시작 날짜</label>
                        <input type="date" v-model="startDate" class="form-control" id="startDate" />
                    </div>
                    <div>
                        <label for="endDate" class="form-label">종료 날짜</label>
                        <input type="date" v-model="endDate" class="form-control" id="endDate" />
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label">진행 상태</label>
                    <div class="d-flex align-items-start">
                        <div class="form-check me-4">
                            <input class="form-check-input" type="radio" v-model="status" id="todo" value="todo" checked />
                            <label class="form-check-label" for="todo"> 진행예정 </label>
                        </div>
                        <div class="form-check me-4">
                            <input class="form-check-input" type="radio" v-model="status" id="doing" value="doing" />
                            <label class="form-check-label" for="doing"> 진행중 </label>
                        </div>
                        <div class="form-check me-4">
                            <input class="form-check-input" type="radio" v-model="status" id="done" value="done" />
                            <label class="form-check-label" for="done"> 완료 </label>
                        </div>
                        <div class="form-check me-4">
                            <input class="form-check-input" type="radio" v-model="status" id="hold" value="hold" />
                            <label class="form-check-label" for="hold"> 보류 </label>
                        </div>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label">우선순위</label>
                    <div class="d-flex align-items-start">
                        <div class="form-check me-4">
                            <input class="form-check-input" type="radio" v-model="priority" id="lv0" value="lv0" />
                            <label class="form-check-label" for="lv0">긴급</label>
                        </div>
                        <div class="form-check me-4">
                            <input class="form-check-input" type="radio" v-model="priority" id="lv1" value="lv1" />
                            <label class="form-check-label" for="lv1">높음</label>
                        </div>
                        <div class="form-check me-4">
                            <input class="form-check-input" type="radio" v-model="priority" id="lv2" value="lv2" checked />
                            <label class="form-check-label" for="lv2">보통</label>
                        </div>
                        <div class="form-check me-4">
                            <input class="form-check-input" type="radio" v-model="priority" id="lv3" value="lv3" />
                            <label class="form-check-label" for="lv3">낮음</label>
                        </div>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">설명</label>
                    <textarea v-model="description" class="form-control textarea" id="description" rows="3"></textarea>
                </div>
                <div class="btn-area">
                    <button class="btn btn-secondary me-2">취소</button>
                    <button type="submit" class="btn btn-primary">저장</button>
                </div>
            </form>
        </div>
    </div>
</template>
