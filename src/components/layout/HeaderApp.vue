<script>
import UserProfile from '@/components/UserProfile.vue'
import globalInfo from '@/utils/globalInfoUtils.js'

export default {
    components: {
        UserProfile
    },
    data() {
        return {
            userInfo: null,
            name: '',
            email: ''
        }
    },
    mounted() {
        this.fetchUserInfo()
    },
    methods: {
        fetchUserInfo() {
            const userInfo = globalInfo.UserInfo

            if (userInfo && userInfo.name) {
                this.userInfo = {
                    name: userInfo.name,
                    dept: userInfo.dept,
                    eno: userInfo.eno
                }
            } else {
                this.userInfo = null
            }
        }
    }
}
</script>
<template>
    <header>
        <div class="container">
            <div class="d-flex align-items-center justify-content-between">
                <h1 class="logo">
                    <a href="/"><img src="/public/images/logo.png" alt="boogle logo" /></a>
                </h1>
                <nav class="navbar navbar-expand-lg">
                    <div class="navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="userInfo">
                            <li class="nav-item">
                                <router-link to="/project" class="nav-link">프로젝트</router-link>
                            </li>
                            <li class="only-pc">
                                <div class="vertical-line"></div>
                            </li>
                            <li class="nav-item">
                                <router-link to="/search" class="nav-link">
                                    <button class="btn" type="submit" aria-label="검색"><i class="bi bi-search"></i></button>
                                </router-link>
                            </li>
                            <li class="only-pc">
                                <div class="vertical-line"></div>
                            </li>
                        </ul>
                    </div>
                    <ul class="me-auto mb-2 mb-lg-0" v-if="userInfo">
                        <li class="dropdown">
                            <UserProfile :name="userInfo.name" :dept="userInfo.dept" :eno="userInfo.eno" />
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
</template>

<style>
.logo {
    width: 120px;
}
.logo img {
    width: 100%;
}
.vertical-line {
    border-left: 1px solid #eaeaea;
    height: 40px;
    align-self: center;
    margin: 0 25px;
}

.navbar-nav.me-auto.mb-2.mb-lg-0 .nav-item:not(:last-child) {
    margin-right: 20px;
    align-self: center;
}

.navbar {
    flex-wrap: nowrap !important;
}
.navbar-nav {
    flex-direction: row !important;
}
</style>
