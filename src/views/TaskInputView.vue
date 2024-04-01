<script>
import { ref } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

export default {
    setup() {
        const task_title = ref('')
        const assignee = ref('')
        const start_date = ref('')
        const end_date = ref('')
        const task_status = ref('TODO')
        const task_priority = ref('LV2')
        const task_desc = ref('')
        const route = useRoute()
        const router = useRouter()

        async function saveTask() {
            try {
                const projectId = route.params.id
                const apiUrl = import.meta.env.VITE_API_URL
                console.log('projectId:', projectId)

                const postData = {
                    assignee: assignee.value,
                    proj_no: projectId,
                    task_title: task_title.value,
                    task_status: task_status.value,
                    task_priority: task_priority.value,
                    start_date: new Date(start_date.value).getTime(),
                    end_date: new Date(end_date.value).getTime(),
                    task_percent: 0,
                    task_test: false,
                    create_date: new Date().getTime(),
                    task_desc: task_desc.value
                }

                console.log(postData, '저장할데이터')

                const response = await axios.post(`${apiUrl}/task/project/${projectId}/task`, postData)

                if (!response || !response.data) {
                    throw new Error('응답 객체 또는 응답 데이터가 유효하지 않습니다.')
                }

                console.log('저장되었습니다.', response.data)

                clearFields()

                router.push(`/project/detail/${projectId}`)
            } catch (error) {
                console.error('저장에 실패했습니다.', error.response.data)
            }
        }

        function clearFields() {
            task_title.value = ''
            assignee.value = ''
            start_date.value = ''
            end_date.value = ''
            task_status.value = 'TODO'
            task_priority.value = 'LV2'
            task_desc.value = ''
        }

        return {
            task_title,
            assignee,
            start_date,
            end_date,
            task_status,
            task_priority,
            task_desc,
            saveTask
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
        </div>

        <div class="row">
            <form @submit.prevent="saveTask">
                <div class="mb-3">
                    <label for="title" class="form-label">업무명</label>
                    <input type="text" v-model="task_title" class="form-control" id="title" />
                </div>
                <div class="mb-3">
                    <label for="assignee" class="form-label">담당자</label>
                    <input type="text" v-model="assignee" class="form-control" id="assignee" />
                </div>
                <div class="d-flex mb-3">
                    <div class="me-2">
                        <label for="startDate" class="form-label">시작 날짜</label>
                        <input type="date" v-model="start_date" class="form-control" id="startDate" />
                    </div>
                    <div>
                        <label for="endDate" class="form-label">종료 날짜</label>
                        <input type="date" v-model="end_date" class="form-control" id="endDate" />
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label">진행 상태</label>
                    <div class="d-flex align-items-start">
                        <div class="form-check me-4">
                            <input class="form-check-input" type="radio" v-model="task_status" id="todo" value="TODO" checked />
                            <label class="form-check-label" for="todo"> 진행예정 </label>
                        </div>
                        <div class="form-check me-4">
                            <input class="form-check-input" type="radio" v-model="task_status" id="doing" value="DOING" />
                            <label class="form-check-label" for="doing"> 진행중 </label>
                        </div>
                        <div class="form-check me-4">
                            <input class="form-check-input" type="radio" v-model="task_status" id="done" value="DONE" />
                            <label class="form-check-label" for="done"> 완료 </label>
                        </div>
                        <div class="form-check me-4">
                            <input class="form-check-input" type="radio" v-model="task_status" id="hold" value="HOLD" />
                            <label class="form-check-label" for="hold"> 보류 </label>
                        </div>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label">우선순위</label>
                    <div class="d-flex align-items-start">
                        <div class="form-check me-4">
                            <input class="form-check-input" type="radio" v-model="task_priority" id="lv0" value="LV0" />
                            <label class="form-check-label" for="lv0">긴급</label>
                        </div>
                        <div class="form-check me-4">
                            <input class="form-check-input" type="radio" v-model="task_priority" id="lv1" value="LV1" />
                            <label class="form-check-label" for="lv1">높음</label>
                        </div>
                        <div class="form-check me-4">
                            <input class="form-check-input" type="radio" v-model="task_priority" id="lv2" value="LV2" checked />
                            <label class="form-check-label" for="lv2">보통</label>
                        </div>
                        <div class="form-check me-4">
                            <input class="form-check-input" type="radio" v-model="task_priority" id="lv3" value="LV3" />
                            <label class="form-check-label" for="lv3">낮음</label>
                        </div>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="description" class="form-label">설명</label>
                    <textarea v-model="task_desc" class="form-control textarea" id="description" rows="3"></textarea>
                </div>
                <div class="btn-area">
                    <button type="button" class="btn btn-secondary me-2">취소</button>
                    <button type="submit" class="btn btn-primary">저장</button>
                </div>
            </form>
        </div>
    </div>
</template>
