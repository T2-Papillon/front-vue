<script>
import UserProfile from '@/components/UserProfile.vue'
export default {
    components: {
        UserProfile
    },
    data() {
        return {
            userInfo: '',
            name: '홍길동',
            email: ''
        }
    },
    mounted() {
        this.userInfo = this.$cookies.get('user')
        if (this.userInfo) {
            this.name = this.userInfo['name']
            this.email = this.userInfo['email']
        }
    }
}
</script>
<template>
    <header>
        <div class="inner">
            <div class="d-flex align-items-center justify-content-between">
                <h1 class="logo">
                    <a href="/"><img src="/public/images/logo.svg" alt="boogle logo" /></a>
                </h1>

                <nav class="navbar navbar-expand-lg">
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <router-link to="/" class="nav-link">x</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/about" class="nav-link">x</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/login" class="nav-link">로그인</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/project" class="nav-link">프로젝트</router-link>
                            </li>

                            <li class="nav-item">
                                <router-link to="/analyze" class="nav-link">analyze</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/kit" class="nav-link">kit</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/search" class="nav-link">search</router-link>
                            </li>
                        </ul>
                        <form class="d-flex mr-2">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit"><i class="bi bi-search"></i></button>
                        </form>
                        <ul class="me-auto mb-2 mb-lg-0" v-if="$cookies.get('user') !== null">
                            <li class="dropdown">
                                <UserProfile />
                            </li>
                            <!-- <li class="dropdown">
                                <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> 홍길동 </a>

                                <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{{ name }}</a>

                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><span class="dropdown-item">개발 1팀</span></li>
                                    <li><a class="dropdown-item" href="#">마이페이지</a></li>
                                    <li><a class="dropdown-item" href="#">로그아웃</a></li>
                                    <li>
                                        <hr class="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#">Something else here</a>
                                    </li>
                                </ul>
                            </li> -->
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </header>
</template>
