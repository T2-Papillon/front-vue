<template>
    <span :class="[priorityClassName, 'priority']">{{ priorityText }}</span>
</template>

<script>
export default {
    props: {
        priority: {
            type: String,
            default: ''
        }
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
            // priority prop에 기본값이 있으므로 항상 정의된 값을 사용
            return this.priority ? `lv${this.priority.substring(2)}` : ''
        },
        priorityText() {
            // priorityLevels에서 해당하는 텍스트를 찾아 반환
            return this.priority ? this.priorityLevels[this.priority] : '알수없음'
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
