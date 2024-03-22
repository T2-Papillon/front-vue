<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="login">
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" />
            </div>
            <button type="submit">Login</button>
        </form>
        <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            errorMessage: ''
        }
    },
    methods: {
        login() {
            // 예시: 실제로는 서버로 인증 요청을 보내야 합니다.
            if (this.username === 'admin' && this.password === 'password') {
                // 로그인 성공 시 처리
                this.$router.push('/dashboard') // 대시보드 페이지로 이동
            } else {
                // 로그인 실패 시 에러 메시지 표시
                this.errorMessage = 'Invalid username or password'
            }
        }
    }
}
</script>
