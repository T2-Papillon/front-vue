<template>
    <header>
        <div class="inner">
            <div class="d-flex align-items-center justify-content-between">
                <h1 class="logo"><a href="#">logo</a></h1>

                <nav class="navbar navbar-expand-lg">
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <router-link to="/" class="nav-link">Home</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/about" class="nav-link">About</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/login" class="nav-link">login</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/project" class="nav-link">project</router-link>
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
                        <ul class="me-auto mb-2 mb-lg-0">
                            <li class="dropdown">
                                <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> 홍길동 </a>
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
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </header>
</template>

<script>
export default {}
</script>

<style scoped>
header {
    border-bottom: 1px solid #eaeaea;
}
</style>
