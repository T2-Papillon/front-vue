<template>
    <div class="todo-app">
        <h2>Todo List</h2>
        <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Add new todo..." />
        <ul>
            <li v-for="(todo, index) in todos" :key="index">
                <input type="checkbox" v-model="todo.completed" />
                <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
                <button @click="removeTodo(index)">Remove</button>
            </li>
        </ul>
    </div>
</template>

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
</script>

<style>
.completed {
    text-decoration: line-through;
}
</style>
