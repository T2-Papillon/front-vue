<template>
    <div class="profile">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">고</button>
        <ul class="dropdown-menu">
            <li><span class="dropdown-item">개발 1팀</span></li>
            <li><a class="dropdown-item" href="#">마이페이지</a></li>
            <li><a class="dropdown-item" href="#">로그아웃</a></li>
        </ul>
    </div>
</template>

<script scoped></script>

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
