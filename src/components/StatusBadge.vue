<template>
    <span v-if="status !== 'unknown'" :class="`status-badge ${statusClass}`">{{ statusName }}</span>
</template>

<script>
export default {
    props: {
        status: {
            type: String,
            default: 'unknown' // 기본값 설정
        }
    },
    computed: {
        statusName() {
            const statusMap = {
                todo: '진행예정',
                doing: '진행중',
                done: '완료',
                hold: '보류',
                unknown: '' // 'unknown' 상태의 텍스트도 정의
            }
            return statusMap[this.status.toLowerCase()] || '알 수 없음'
        },
        statusClass() {
            const classMap = {
                todo: 'todo',
                doing: 'doing',
                done: 'done',
                hold: 'hold',
                unknown: '' // 'unknown' 상태의 클래스도 정의
            }
            return classMap[this.status.toLowerCase()] || 'todo'
        }
    }
}
</script>

<style scoped>
.status-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 110px;
    height: 26px;
    border-radius: 5px;
    border: 1px solid transparent;
    font-weight: 500;
    padding: 0 10px;
}

.doing {
    background-color: #eafff5;
    color: #38c172;
}
.done {
    background-color: #e9ebf1;
    color: #6c757d;
}
.hold {
    border: 1px solid #e9ebf1;
    color: #6c757d;
}
.todo {
    background-color: #fedddb;
    color: #e3342f;
}
.unknown {
    display: none; /* 'unknown' 상태일 때 아무것도 보여주지 않음 */
}
</style>
