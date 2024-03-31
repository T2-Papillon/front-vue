<template>
    <div class="profile">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{{ displayName }}</button>
        <!-- <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" :style="{ 'background-color': randomColor }">{{ displayName }}</button> -->
        <ul class="dropdown-menu">
            <li>
                <span class="dropdown-item fw-bold">{{ name }}</span>
            </li>
            <li><span class="dropdown-item">개발 1팀</span></li>
            <li><a class="dropdown-item" href="#">대시보드</a></li>
            <li><a class="dropdown-item" href="#">마이페이지</a></li>
            <li><a class="dropdown-item" href="#">로그아웃</a></li>
        </ul>
    </div>
</template>

<script scoped>
export default {
    props: ['name'],
    computed: {
        displayName() {
            if (this.name && this.name.length === 3) {
                return this.name[0]
            } else {
                return this.name
            }
        }
        // randomColor() {
        //     return '#' + Math.floor(Math.random() * 16777215).toString(16)
        // }
    }
}
</script>

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
    font-size: 14px;
}

.profile .btn::after {
    display: none;
}
</style>
