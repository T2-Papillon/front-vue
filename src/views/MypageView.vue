<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

// 랜덤 이미지 선택하는 함수
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export default {
    setup() {
        const route = useRoute()
        const profileEno = ref(route.params.profileEno)

        // 랜덤 이미지 경로 계산
        const randomProfileImagePath = computed(() => {
            let randomNumber = getRandomInt(1, 20) // 1부터 20까지의 숫자 중 랜덤 선택

            if (randomNumber < 10) {
                randomNumber = '0' + randomNumber
            }

            return `/images/profile-img${randomNumber}.png`
        })

        return {
            profileEno,
            randomProfileImagePath
        }
    }
}
</script>
<template>
    <div class="mypage-wrap">
        <div class="top-area">
            <div class="container">
                <div class="profile">
                    <img :src="randomProfileImagePath" alt="프로필 이미지" />
                    <div class="info">
                        <h3 class="info-name">{{ profileName }}</h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="btm-area">
            <div class="container">
                <div class="row align-items-center justify-content-between g-3 pb-5">
                    <div class="col-auto">
                        <div class="title-area">
                            <h2 class="h2">[개인통계]마이페이지</h2>
                            <p class="tet-body-tertiary lh-sm mb-3">{{ profileName }}님의 마이페이지 입니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.btm-area .row.pb-5 {
    padding-bottom: 6rem;
}

.col-xl-5 {
    padding: 0 15px;
}

.top-area {
    position: relative;
    height: 280px;
    background-color: #dbf6eb;
    background-image: url('../../public/images/img-mypage.png');
    background-position: 100% 185%;
    background-repeat: no-repeat;
    background-size: 800px;
}
.profile {
    display: flex;
    align-items: flex-end;
    justify-content: start;
}
.profile i {
    display: inline-block;
    width: 160px;
    height: 160px;
    margin-top: 160px;
    margin-left: 60px;
    border-radius: 100%;
    border: 4px solid #fff;
    background-color: #d9d9d9;
}

.profile .info {
    padding-bottom: 22px;
    padding-left: 20px;
}

.profile .info-text {
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 300;
}
.profile .info-name {
    font-size: 36px;
    font-weight: bold;
}
.btm-area {
    padding-top: 120px;
}

.chart-title {
    margin-bottom: 30px;
}
</style>
