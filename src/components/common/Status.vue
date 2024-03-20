<template>
    <select class="form-select status" id="">
        <option value="todo" selected="selected">진행예정</option>
        <option value="doing">진행중</option>
        <option value="done">완료</option>
        <option value="hold">보류</option>
    </select>
    <div class="status">
        <span class="todo">진행예정</span>
        <span class="doing">진행중</span>
        <span class="done">완료</span>
        <span class="hod">보류</span>
    </div>
</template>
<script>
export default {}
</script>
<style scoped>
.status {
}
.status span {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
}
.status .todo {
    background-color: #fedddb;
    color: #ef5c51;
}
.status .dogin {
    background-color: #e9f1ec;
}
.status .done {
    background-color: #e9ebf1;
}
.status .hold {
    background-color: #e9ebf1;
}
</style>
