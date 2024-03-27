<template>
    <div class="container">
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
import axios from 'axios'

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
            let url = 'http://localhost:8080/api/signin'
            console.log(this.username + ' / ' + this.password)
            let data = {
                email: this.username,
                password: this.password
            }
            axios
                .post(url, data, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true
                })
                .then((res) => {
                    if (res.status == 200) {
                        console.log('login 성공')
                        this.$cookies.set('user', res.data)
                        this.$router.push('/').then(() => {
                            location.reload()
                        })
                    } else {
                        console.log(res.status)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}
</script>
