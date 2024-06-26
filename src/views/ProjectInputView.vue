<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import EmployeeSearchModal from '../components/EmployeeSearchModal.vue'

const router = useRouter()
const username = sessionStorage.getItem('NM')
const usereno = sessionStorage.getItem('EN')
const apiUrl = import.meta.env.VITE_API_URL
const project_title = ref('')
const start_date = ref('')
const end_date = ref('')
const project_status = ref('TODO')
const project_priority = ref('LV2')
const project_percent = ref(0)
const proj_desc = ref('')
const participants = ref([{ name: username, eno: usereno }])

const pmInfo = {
    name: username,
    eno: usereno
}
const employeeModalRef = ref(null)

onMounted(() => {
    if (employeeModalRef.value) {
    }
})

const addParticipant = (employee) => {
    if (!participants.value.some((part) => part.eno === employee.eno)) {
        participants.value.push({
            name: employee.name,
            eno: employee.eno
        })
    }
}

function openEmployeeSearchModal() {
    if (employeeModalRef.value) {
        employeeModalRef.value.openModal()
    }
}

const validateInput = () => {
    if (!project_title.value || !start_date.value || !end_date.value) {
        alert('모든 필드를 채워주세요.')
        return false
    }
    return true
}
const submitForm = async () => {
    if (!validateDates() || !validateInput()) return
    const projectData = {
        projTitle: project_title.value,
        projStartDate: convertLocaleTime(start_date.value),
        projEndDate: convertLocaleTime(end_date.value),
        projDesc: proj_desc.value,
        projectStatus: project_status.value,
        projectPriority: project_priority.value,
        projPmEno: usereno,
        projCreateDate: convertLocaleTime(new Date()),
        contributors: participants.value.map((participant) => participant.eno)
    }
    try {
        const response = await axios.post(`${apiUrl}/project/create`, projectData)
        alert('저장되었습니다.')
        router.push(`/project`)
    } catch (error) {
        console.error('저장에 실패했습니다.', error.response?.data || error.message)
        alert(`저장 실패: ${error.response?.data || error.message}`)
    }
}
function removeParticipant(index) {
    participants.value.splice(index, 1)
}
function determineProjectStatus() {
    return project_percent.value > 0 && project_percent.value < 100 ? 'DOING' : project_percent.value === 100 ? 'DONE' : 'TODO'
}
function confirmProjectStatusChange(status) {
    if (project_status.value !== status) {
        const confirmMsg = `진행율이 ${project_percent.value}%이므로 프로젝트 상태가 자동으로 변경됩니다. 계속하시겠습니까?`
        return confirm(confirmMsg)
    }
    return true
}
function validateDates() {
    const startDate = new Date(start_date.value)
    const endDate = new Date(end_date.value)
    if (endDate < startDate) {
        alert('종료 날짜는 시작 날짜보다 늦어야 합니다.')
        return false
    }
    return true
}
function convertLocaleTime(time) {
    const newTime = new Date(time).toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' })
    let splitTime = newTime.split('.')
    let year = splitTime[0].trim()
    let month = splitTime[1].trim()
    let day = splitTime[2].trim()
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
}
function handleApiResponse(response) {
    if (!response || !response.data) {
        throw new Error('응답 객체 또는 응답 데이터가 유효하지 않습니다.')
    }
    alert('저장되었습니다.')
    clearFields()
}
function clearFields() {
    project_title.value = ''
    start_date.value = ''
    end_date.value = ''
    project_status.value = 'TODO'
    project_priority.value = 'LV2'
    project_percent.value = 0
    proj_desc.value = ''
    participants.value = []
}
const goBack = () => {
    router.back()
}
</script>

<template>
    <div class="container">
        <div class="row align-items-center justify-content-center text-center g-3">
            <div class="col-auto">
                <div class="title-area">
                    <h2 class="h2">프로젝트 작성</h2>
                    <p class="text-body-tertiary lh-sm mb-0">프로젝트 작성해주세요</p>
                </div>
            </div>
        </div>
        <div class="row align-items-center justify-content-between g-3 pb-4">
            <div class="col-auto">
                <div class="title-area">
                    <p class="text-body-tertiary lh-sm mb-3"></p>
                    <h2 class="h2 d-flex">📌 <input type="text" v-model="project_title" class="form-control h2" id="title" placeholder="제목을 입력해주세요." required /></h2>
                </div>
            </div>
            <div class="col-auto">
                <div class="top-btn-area"></div>
            </div>
        </div>

        <div class="row">
            <form @submit.prevent="submitForm">
                <div class="col-xl">
                    <div class="mb-3">
                        <label for="title" class="form-label">작성자</label>
                        <input type="text" class="form-control" id="pm" :value="username" readonly />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">프로젝트 기간</label>
                        <div class="d-flex align-items-center">
                            <input type="date" v-model="start_date" class="form-control" id="startDate" required />&nbsp;~&nbsp;<input type="date" v-model="end_date" class="form-control" id="endDate" required />
                        </div>
                        <div v-if="end_date && start_date && new Date(end_date) < new Date(start_date)" class="text-danger">종료 날짜를 다시 선택해주세요.</div>
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
                                <input class="form-check-input" type="radio" v-model="project_priority" :id="`lv${index}`" :value="priority.value" :checked="index === 2" />
                                <label class="form-check-label" :for="`lv${index}`">{{ priority.text }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">참여자</label>
                        <div>
                            <employee-search-modal ref="employeeModalRef" @add-participant="addParticipant"></employee-search-modal>
                            <button type="button" class="btn btn-secondary me-2" @click="openEmployeeSearchModal">직원 검색</button>
                            <ul v-if="participants.length > 0" class="list-unstyled mt-2">
                                <li v-for="(participant, index) in participants" :key="index">
                                    {{ participant.name }}
                                    <span v-if="participant.eno !== pmInfo.eno" class="remove-participant" @click="removeParticipant(index)">X</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">참여자</label>
                        <div class="d-flex align-items-start">
                            <div
                                class="form-check me-4"
                                v-for="(value, key) in [
                                    { text: '진행예정', value: 'TODO' },
                                    { text: '진행중', value: 'DOING' },
                                    { text: '완료', value: 'DONE' },
                                    { text: '보류', value: 'HOLD' }
                                ]"
                                :key="key"
                            >
                                <input class="form-check-input" type="radio" v-model="project_status" :id="value.value.toLowerCase()" :value="value.value" />
                                <label class="form-check-label" :for="value.value.toLowerCase()">{{ value.text }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">내용</label>
                        <textarea v-model="proj_desc" class="form-control textarea" id="description" rows="3" placeholder="내용을 입력해주세요"></textarea>
                    </div>
                </div>

                <div class="btn-area text-center d-flex align-items-center justify-content-center">
                    <button type="button" class="btn btn-secondary me-2" @click="goBack">취소</button>
                    <button type="submit" class="btn btn-primary">저장</button>
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>
.table-borderless {
    border-top: 2px solid #e6eef4;
}

.table-borderless th,
.table-borderless td {
    padding: 15px 0;
    font-size: 14px !important;
    text-align: left;
}
.table-borderless th {
    border-bottom: 0;
    color: #384554;
    font-weight: 700;
}

.table-borderless td {
    border-bottom: 0 !important;
    color: #656f7d;
}
.table-borderless th:nth-child(3) {
    padding-left: 30px;
}

.dash-line {
    margin: 0;
    border: 0;
    border-top: 1px dashed #d2dce5;
    opacity: 0.6;
}
.text-area {
    padding: 30px;
    padding-left: 0;
    font-size: 14px;
    color: #333;
    line-height: 1.8;
}
.btn {
    display: flex;
    align-items: center;
}
.remove-participant {
    margin-left: 10px;
    color: red;
    cursor: pointer;
}
.remove-participant:hover {
    font-weight: bold;
}
</style>
