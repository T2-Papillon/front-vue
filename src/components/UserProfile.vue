<script scoped>
import router from '@/router'
import { nextTick } from 'vue'

export default {
    props: ['name', 'dept', 'eno'],
    computed: {
        displayName() {
            if (this.name && this.name.length === 3) {
                return this.name[0]
            } else {
                return this.name
            }
        },
        checkSession() {
            return sessionStorage.getItem('NM') === this.name
        }
    },
    methods: {
        logout() {
            if (confirm('로그아웃 하시겠습니까?')) {
                sessionStorage.clear()
                router.push('/login')
            }
        },
        goProfile() {
            // console.log('Profile routing for:', this.eno)
            this.$router.push({ name: 'profile', state: { eno: this.eno, name: this.name, dept: this.dept } })
        }
    }
}
</script>
<template>
    <div class="profile">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="프로필">{{ displayName }}</button>
        <ul class="dropdown-menu">
            <li>
                <button @click="goProfile" class="dropdown-item">{{ dept }} / {{ name }}</button>
            </li>
            <li class="dropdown-item" style="cursor: pointer" v-show="checkSession" v-on:click="logout">로그아웃</li>
        </ul>
    </div>
</template>

<style scoped>
.profile {
    display: inline-block;
}
.profile + .profile {
    margin-left: -10px;
}
.profile .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 100%;
}

.profile .btn::after {
    display: none;
}
</style>
