<script scoped>
export default {
    props: ['name', 'dept'],
    computed: {
        displayName() {
            if (this.name && this.name.length === 3) {
                return this.name[0]
            } else {
                return this.name
            }
        }
    }
}
</script>
<template>
    <div class="profile">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{{ displayName }}</button>
        <ul class="dropdown-menu">
            <li>
                <router-link :to="`/mypage/${name}`" class="dropdown-item">{{ name }}</router-link>
            </li>
            <li>
                <span class="dropdown-item">{{ dept }}</span>
            </li>
            <li><a class="dropdown-item" href="#">로그아웃</a></li>
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
    font-size: 14px;
}

.profile .btn::after {
    display: none;
}
</style>
