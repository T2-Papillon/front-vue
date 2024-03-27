<template>
    <div class="inner">
        <div class="card">
            <div class="card-body">
                <div class="title-area">
                    <h2 class="h3">로그인</h2>
                    <p class="h5">로그인을 해주세요.</p>
                </div>
                <form @submit.prevent="login" class="mt-3">
                    <div class="mb-3">
                        <input type="email" id="username" v-model="username" placeholder="example@boogle.com" class="form-control" />
                    </div>
                    <div class="mb-3">
                        <input type="password" id="password" v-model="password" placeholder="비밀번호를 입력해주세요" class="form-control" />
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
                <p v-if="errorMessage" class="mt-3 text-danger">{{ errorMessage }}</p>
            </div>
        </div>
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
