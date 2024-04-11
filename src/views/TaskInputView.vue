<script>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

export default {
    setup() {
        const route = useRoute()
        const router = useRouter()
        const username = sessionStorage.getItem('NM')

        const isEditing = ref(false)
        const task_title = ref('')
        const assignee = ref('')
        const start_date = ref('')
        const end_date = ref('')
        const task_status = ref('TODO')
        const task_priority = ref('LV2')
        const task_percent = ref(0)
        const task_test = ref('')
        const url = ref('')
        const task_desc = ref('')

        // 현재 경로가 'save'인지 확인하는 계산된 속성
        const isSaveRoute = computed(() => {
            return route.path.endsWith('/save')
        })

        // 'save' 경로일 때 username을 사용하고, 그렇지 않으면 assignee를 사용
        const inputFieldValue = computed(() => {
            return isSaveRoute.value ? username : assignee.value
        })

        // 데이터를 불러오는 함수 수정
        async function fetchData() {
            const apiUrl = import.meta.env.VITE_API_URL
            const projectId = route.params.projectId
            const taskId = route.params.taskId

            if (taskId) {
                isEditing.value = true // 수정 모드 활성화
                try {
                    const response = await axios.get(`${apiUrl}/task/project/${projectId}/task/${taskId}`)
                    const taskData = response.data

                    task_title.value = taskData.task_title
                    assignee.value = taskData.assignee
                    start_date.value = convertLocaleTime(taskData.start_date)
                    end_date.value = convertLocaleTime(taskData.end_date)
                    task_status.value = taskData.task_status
                    task_priority.value = taskData.task_priority
                    task_percent.value = taskData.task_percent
                    task_test.value = taskData.task_test ? 'true' : 'false'
                    url.value = taskData.url || ''
                    task_desc.value = taskData.task_desc
                } catch (error) {
                    console.error('데이터를 불러오는 데 실패했습니다.', error)
                }
            }
        }

        async function saveOrUpdateTask() {
            assignee.value = inputFieldValue.value

            if (isEditing.value) {
                await updateTask()
            } else {
                await saveTask()
            }
        }

        //글수정
        async function updateTask() {
            const projectId = route.params.projectId
            const taskId = route.params.taskId
            const apiUrl = import.meta.env.VITE_API_URL

            if (!projectId || !taskId) {
                alert('Project ID or Task ID is missing.')
                return
            }

            const currentTaskStatus = determineTaskStatus()

            try {
                const postData = {
                    assignee: inputFieldValue.value,
                    proj_no: projectId,
                    task_title: task_title.value,
                    task_status: currentTaskStatus,
                    task_priority: task_priority.value,
                    start_date: new Date(start_date.value).getTime(),
                    end_date: new Date(end_date.value).getTime(),
                    task_percent: task_percent.value,
                    task_test: task_test.value === 'true',
                    task_test_url: task_test.value === 'true' ? url.value : null,
                    create_date: new Date().getTime(),
                    update_date: new Date().getTime(),
                    task_desc: task_desc.value
                }

                // 업무 상태 변경 여부 확인
                const status = determineTaskStatus()

                if (confirmTaskStatusChange(status)) {
                    const response = await axios.post(`${apiUrl}/task/project/${projectId}/task/${taskId}`, postData)
                    handleApiResponse(response, projectId)
                }
            } catch (error) {
                console.error('데이터를 업데이트하는 데 실패했습니다.', error.response?.data || error)
                alert('데이터 업데이트에 실패했습니다. 오류를 확인해주세요.')
            }
        }

        // 글작성
        async function saveTask() {
            try {
                const projectId = route.params.projectId
                const apiUrl = import.meta.env.VITE_API_URL
                const currentTaskStatus = determineTaskStatus()

                const postData = {
                    assignee: inputFieldValue.value,
                    proj_no: projectId,
                    task_title: task_title.value,
                    task_status: currentTaskStatus,
                    task_priority: task_priority.value,
                    start_date: new Date(start_date.value).getTime(),
                    end_date: new Date(end_date.value).getTime(),
                    task_percent: task_percent.value,
                    task_test: task_test.value === 'true',
                    task_test_url: task_test.value === 'true' ? url.value : null,
                    create_date: new Date().getTime(),
                    task_desc: task_desc.value
                }

                // 업무 상태 변경 여부 확인
                const status = determineTaskStatus()

                if (confirmTaskStatusChange(status)) {
                    const response = await axios.post(`${apiUrl}/task/project/${projectId}/task`, postData)
                    handleApiResponse(response, projectId)
                }
            } catch (error) {
                console.error('저장에 실패했습니다.', error.response.data)
            }
        }

        // 업무 상태 결정 함수
        function determineTaskStatus() {
            return task_percent.value > 0 && task_percent.value < 100 ? 'DOING' : task_percent.value === 100 ? 'DONE' : 'TODO'
        }

        // 업무 상태 변경 확인 함수
        function confirmTaskStatusChange(status) {
            if (task_status.value !== status) {
                const confirmMsg = `진행율이 ${task_percent.value}%이므로 업무 상태가 자동으로 변경됩니다. 계속하시겠습니까?`
                return confirm(confirmMsg)
            }
            return true
        }

        // input date 포맷 함수
        function convertLocaleTime(time) {
            const newTime = new Date(time).toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' })
            let splitTime = newTime.split('. ')
            let year = splitTime[0]
            let month = splitTime[1]
            let day = splitTime[2]

            if (month.length === 1) {
                month = '0' + month
            }

            if (day.length === 1) {
                day = '0' + day
            }
            let formattedDate = year + '-' + month + '-' + day
            if (formattedDate.endsWith('.')) {
                formattedDate = formattedDate.slice(0, -1)
            }
            return formattedDate
            //let date = new Date(parseInt(splitTime[0]), parseInt(splitTime[1]) - 1, parseInt(splitTime[2]))
            //return date.toISOString().substring(0, 10)
        }

        // API 응답 처리 함수
        function handleApiResponse(response, projectId) {
            if (!response || !response.data) {
                throw new Error('응답 객체 또는 응답 데이터가 유효하지 않습니다.')
            }
            alert('저장되었습니다.')
            clearFields()
            router.push(`/project/detail/${projectId}`)
        }

        // 필드 초기화
        function clearFields() {
            task_title.value = ''
            assignee.value = ''
            start_date.value = ''
            end_date.value = ''
            task_status.value = 'TODO'
            task_priority.value = 'LV2'
            task_percent.value = 0
            task_test.value = 'false'
            task_desc.value = ''
        }

        // test 가 true 이면 url 필드 노출
        function toggleUrlInput() {
            if (task_test.value === 'true') {
                url.value = ''
            }
        }

        //뒤로가기
        function goBack() {
            router.back()
        }

        onMounted(() => {
            fetchData()
        })

        return {
            task_title,
            assignee,
            start_date,
            end_date,
            task_status,
            task_priority,
            task_percent,
            task_test,
            task_desc,
            saveOrUpdateTask,
            fetchData,
            updateTask,
            url,
            toggleUrlInput,
            goBack,
            isEditing,
            username,
            inputFieldValue,
            isSaveRoute
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="row align-items-center justify-content-center text-center g-3">
            <div class="col-auto">
                <div class="title-area">
                    <h2 class="h2">{{ isEditing ? '업무 수정하기' : '업무 작성하기' }}</h2>
                    <p class="text-body-tertiary lh-sm mb-0">{{ isEditing ? '업무를 수정해주세요.' : '예정된 업무를 적어주세요.' }}</p>
                </div>
            </div>
        </div>

        <div class="row">
            <form @submit.prevent="saveOrUpdateTask">
                <div>
                    <div class="mb-3">
                        <label for="title" class="form-label">업무명</label>
                        <input type="text" v-model="task_title" class="form-control" id="title" placeholder="제목을 입력해주세요." required />
                    </div>

                    <div class="mb-3">
                        <label for="assignee" class="form-label">담당자</label>
                        <input type="text" :value="inputFieldValue" class="form-control" id="assignee" readonly />
                    </div>

                    <div class="d-flex mb-3">
                        <div class="me-2">
                            <label for="startDate" class="form-label">시작 날짜</label>
                            <input type="date" v-model="start_date" class="form-control" id="startDate" required />
                        </div>

                        <div>
                            <label for="endDate" class="form-label">종료 날짜</label>
                            <input type="date" v-model="end_date" class="form-control" id="endDate" required />
                        </div>
                        <div v-if="end_date && start_date && new Date(end_date) < new Date(start_date)" class="text-danger">종료 날짜를 다시 선택해주세요.</div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">진행율</label>
                        <input type="number" v-model="task_percent" class="form-control" min="0" max="100" step="1" placeholder="0부터 100까지의 숫자를 입력하세요." />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">진행 상태</label>
                        <div class="d-flex align-items-start">
                            <div
                                v-for="(value, key) in [
                                    { text: '진행예정', value: 'TODO' },
                                    { text: '진행중', value: 'DOING' },
                                    { text: '완료', value: 'DONE' },
                                    { text: '보류', value: 'HOLD' }
                                ]"
                                :key="key"
                                class="form-check me-4"
                            >
                                <input class="form-check-input" type="radio" v-model="task_status" :id="value.value.toLowerCase()" :value="value.value" />
                                <label class="form-check-label" :for="value.value.toLowerCase()">{{ value.text }}</label>
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">우선순위</label>
                        <div class="d-flex align-items-start">
                            <div
                                v-for="(priority, index) in [
                                    { text: '긴급', value: 'LV0' },
                                    { text: '높음', value: 'LV1' },
                                    { text: '보통', value: 'LV2' },
                                    { text: '낮음', value: 'LV3' }
                                ]"
                                :key="index"
                                class="form-check me-4"
                            >
                                <input class="form-check-input" type="radio" v-model="task_priority" :id="`lv${index}`" :value="priority.value" :checked="index === 2" />
                                <label class="form-check-label" :for="`lv${index}`">{{ priority.text }}</label>
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">테스트</label>
                        <div class="d-flex align-items-start">
                            <div class="form-check me-4">
                                <input class="form-check-input" type="radio" v-model="task_test" id="test_true" value="true" />
                                <label class="form-check-label" for="test_true">True</label>
                            </div>
                            <div class="form-check me-4">
                                <input class="form-check-input" type="radio" v-model="task_test" id="test_false" value="false" checked />
                                <label class="form-check-label" for="test_false">False</label>
                            </div>
                        </div>
                    </div>
                    <div v-if="task_test === 'true'" class="mb-3">
                        <label for="url" class="form-label">URL 입력</label>
                        <input type="text" v-model="url" class="form-control" id="url" required />
                    </div>

                    <div class="mb-3">
                        <label for="description" class="form-label">설명</label>
                        <textarea v-model="task_desc" class="form-control textarea" id="description" rows="3" placeholder="업무내용을 입력하세요"></textarea>
                    </div>
                </div>

                <!-- 버튼영역 -->
                <div class="btn-area">
                    <button type="button" class="btn btn-secondary me-2" @click="goBack">취소</button>
                    <button type="submit" class="btn btn-primary">저장</button>
                </div>
            </form>
        </div>
    </div>
</template>
