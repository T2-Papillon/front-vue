<template>
    <div class="not-found-container">
        <div class="not-found-content">
            <h1>404!</h1>
            <p>페이지를 찾을 수 없어요.</p>
            <router-link to="/" class="home-link">홈으로 돌아가기</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFound'
}
</script>

<style>
.not-found-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
}

.not-found-content {
    text-align: center;
    width: 70%;
    max-width: 400px;
    padding: 20px;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.not-found-content h1 {
    font-size: 6em;
    color: #1bd689;
    margin-bottom: 20px;
}

.not-found-content p {
    font-size: 1.2em;
    color: #333;
    margin-bottom: 30px;
}

.home-link {
    display: inline-block;
    background-color: #1bd689;
    color: white;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.home-link:hover {
    background-color: #1bd689;
}
</style>
