<template>
    <span :class="`priority ${priorityClass}`">{{ priorityText }}</span>
</template>

<script>
export default {
    props: {
        priority: String
    },
    computed: {
        priorityClass() {
            return `lv${this.priorityLevel}`
        },
        priorityLevel() {
            const levels = {
                긴급: '0',
                높음: '1',
                보통: '2',
                낮음: '3'
            }
            return levels[this.priority] || ''
        },
        priorityText() {
            return this.priority
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
