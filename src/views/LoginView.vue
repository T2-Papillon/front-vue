<template>
    <main class="login-wrap">
        <div class="inner">
            <div class="title-area">
                <h2 class="title">로그인</h2>
                <p class="title">더미텍스트더미텍스트더미텍스트</p>
            </div>

            <div class="form-area">
                <form action="">
                    <div class="card">
                        <div class="card-body">
                            <div class="mb-3">
                                <label for="email" class="form-label">이메일</label>
                                <input type="email" class="form-control" id="email" placeholder="name@example.com" />
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">비밀번호</label>
                                <input type="password" class="form-control" id="password" />
                            </div>
                            <div class="btn-area">
                                <button class="btn btn-primary">로그인</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </main>
</template>

<script>
export default {}
</script>

<style scoped>
body {
    background: #333;
}
.login-wrap {
    min-height: 100vh;
}

.card {
    background: #fff;
    border-radius: 12px;
    border: solid 1px #e6eef4;
    background-color: #fff;
    box-shadow: 0px 6px 20px 0 rgba(193, 207, 217, 0.14);
}

.card-body {
    padding: 30px;
}
</style>
