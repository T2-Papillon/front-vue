<script setup>
import { ref, onMounted } from 'vue'

const todos = ref([])
const newTodo = ref('')

// 로컬 스토리지에서 todo 항목 가져오기
function getTodosFromStorage() {
    const storedTodos = localStorage.getItem('todos')
    if (storedTodos) {
        todos.value = JSON.parse(storedTodos)
    }
}

// 로컬 스토리지에 todo 항목 저장하기
function saveTodosToStorage() {
    localStorage.setItem('todos', JSON.stringify(todos.value))
}

// 컴포넌트가 마운트될 때 로컬 스토리지에서 todo 항목 가져오기
onMounted(() => {
    getTodosFromStorage()
})

// 새로운 todo 항목 추가
function addTodo() {
    if (newTodo.value.trim() === '') return
    todos.value.push({ text: newTodo.value, completed: false })
    newTodo.value = ''
    saveTodosToStorage()
}

// todo 항목 삭제
function removeTodo(index) {
    todos.value.splice(index, 1)
    saveTodosToStorage()
}

// 모든 todo 항목 초기화
function clearAllTodos() {
    todos.value = []
    localStorage.removeItem('todos')
}
</script>

<template>
    <div class="todo-app">
        <div class="d-flex align-items-center justify-content-end">
            <button class="btn" @click="clearAllTodos"><i class="bi bi-arrow-clockwise"></i> 초기화</button>
        </div>
        <input v-model="newTodo" class="form-control" @keyup.enter="addTodo" placeholder="리스트를 추가해주세요" />
        <div class="overflow-auto">
            <ul class="mt-2">
                <li v-for="(todo, index) in todos" :key="index">
                    <input type="checkbox" class="form-check-input me-2" v-model="todo.completed" />
                    <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
                    <button class="btn" @click="removeTodo(index)"><i class="bi bi-x-lg"></i></button>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.todo-app {
    width: 90%;
}

.overflow-auto {
    height: 130px;
}
.completed {
    text-decoration: line-through;
}
.form-control {
    padding: 10px 20px;
    border: 0;
    border-bottom: 2px solid var(--bs-border-color);
    border-radius: 0;
    background-color: transparent;
    font-size: 14px;
}
.form-control:focus {
    outline: none;
    box-shadow: none;
    border-color: #54c9c2;
    transition: 0.3s all;
}

li {
    display: flex;
    align-items: center;
}
</style>
