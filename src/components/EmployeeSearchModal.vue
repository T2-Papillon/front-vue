<template>
    <div class="modal" v-if="isVisible">
        <div class="modal-content">
            <span @click="closeModal" class="close">&times;</span>
            <h2>직원 검색</h2>
            <input type="text" v-model="searchQuery" placeholder="직원 이름 검색" />
            <button @click="searchEmployees">검색</button>
            <ul>
                <li v-for="employee in employees" :key="employee.id" @click="selectEmployee(employee)">
                    {{ employee.name }}
                </li>
            </ul>
        </div>
        <button @click="closeModal">Close</button>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import axios from 'axios'

const emits = defineEmits(['add-participant'])
const isVisible = ref(false)
const searchQuery = ref('')
const employees = ref([])

const apiUrl = import.meta.env.VITE_API_URL

function searchEmployees() {
    axios
        .get(`${apiUrl}/employees/search?query=${searchQuery.value}`)
        .then((response) => {
            employees.value = response.data
        })
        .catch((error) => {
            console.error('Search failed:', error)
        })
}

function selectEmployee(employee) {
    emits('add-participant', employee)
    closeModal()
}

function closeModal() {
    isVisible.value = false
}

function openModal() {
    isVisible.value = true
}

// export { openModal, closeModal }
</script>

<style scoped>
.modal {
    display: flex;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
}
.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
}
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}
.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
</style>
