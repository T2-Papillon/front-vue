<template>
    <div class="modal" v-if="isVisible">
        <form @submit.prevent="searchEmployees" class="modal-content">
            <span @click="closeModal" class="close-button">&times;</span>
            <h2 class="modal-header">직원 검색</h2>
            <div class="search-bar">
                <input type="text" v-model="searchQuery" @keyup.enter="searchEmployees" class="search-input" placeholder="직원 이름 검색" />
                <button type="button" class="btn btn-primary search-button" @click="searchEmployees">검색</button>
            </div>
            <div class="employee-list-wrapper">
                <ul class="employee-list">
                    <li v-for="employee in employees" :key="employee.id" @click="selectEmployee(employee)" class="employee-item">{{ employee.dept_no }} / {{ employee.name }}</li>
                </ul>
            </div>
        </form>
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
    if (!searchQuery.value.trim()) {
        alert('직원 이름을 입력해주세요.')
        return
    }
    axios
        .get(`${apiUrl}/search/emp?name=${searchQuery.value.trim()}`)
        .then((response) => {
            employees.value = response.data
            if (employees.value.length === 0) {
                alert('검색 결과가 없습니다.')
            }
        })
        .catch((error) => {
            console.error('Search failed:', error)
            alert(`검색 실패: ${error.response?.data || error.message}`)
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

defineExpose({ openModal, closeModal })
</script>

<style scoped>
.modal {
    display: flex;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
}
.modal-content {
    position: relative;
    background-color: #fff;
    margin: 10% auto;
    padding: 20px;
    border: 1px solid #ddd;
    width: 50%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.close-button {
    position: absolute;
    right: 20px;
    top: 10px;
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}
.close-button:hover,
.close-button:focus {
    color: black;
    text-decoration: none;
}
.modal-header {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
}
.search-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}
.search-input {
    flex-grow: 1;
    padding: 10px;
    box-sizing: border-box;
}
.search-button {
    padding: 10px 20px;
    background-color: #0056b3;
    border: none;
    color: white;
    cursor: pointer;
}
.search-button:hover {
    background-color: #004494;
}
.employee-list-wrapper {
    max-height: 300px;
    overflow-y: auto;
}
.employee-list {
    list-style: none;
    padding-left: 0;
}
.employee-item {
    padding: 10px;
    background-color: #f9f9f9;
    border-bottom: 1px solid #eee;
    cursor: pointer;
}
.employee-item:hover {
    background-color: #e9e9e9;
}
@media (max-width: 768px) {
    .modal-content {
        width: 92%;
    }
}
</style>
