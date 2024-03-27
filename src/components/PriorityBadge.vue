<template>
    <div :class="[priorityClassName, 'priority']">{{ priorityText }}</div>
</template>

<script>
export default {
    props: {
        priority: String
    },
    data() {
        return {
            priorityLevels: {
                LV0: '긴급',
                LV1: '높음',
                LV2: '보통',
                LV3: '낮음'
            }
        }
    },
    computed: {
        priorityClassName() {
            return `lv${this.priority.substring(2)}`
        },
        priorityText() {
            return this.priorityLevels[this.priority] || '알수없음'
        }
    }
}
</script>

<style scoped>
.priority {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid;
    border-radius: 5px;
    min-width: 40px;
    height: 23px;
    padding: 0 10px;
    color: #fff;
}
.lv0 {
    border-color: #ffbebe;
    background-color: #ffe5e5;
    color: #f05353;
}
.lv1 {
    border-color: #ffc350;
    background-color: #ffe4b2;
    color: #e88600;
}
.lv2 {
    border-color: #9ce8c5;
    background-color: #eafff5;
    color: #10aa64;
}
.lv3 {
    border-color: #bfd2ff;
    background-color: #edf2ff;
    color: #336cfa;
}
</style>
