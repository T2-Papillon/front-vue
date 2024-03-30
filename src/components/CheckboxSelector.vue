<template>
    <div class="sort-area">
        <div class="option-group">
            <div v-for="(item, index) in items" :key="index" class="form-check">
                <input class="form-check-input" type="checkbox" :value="item.id" :id="'flexCheck' + index" :checked="isChecked(item.id)" @change="handleChange(item.id)" />
                <label class="form-check-label" :for="'flexCheck' + index">{{ item.name }}</label>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    // 체크박스 목록을 받아오는 props
    items: {
        type: Array,
        required: true
    },
    // 선택된 항목들을 받아오는 props
    selected: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['change'])

// 각 항목의 선택 여부를 저장하는 객체
const isCheckedMap = ref({})

// 체크박스가 선택되었는지 여부를 확인하는 함수
const isChecked = (id) => isCheckedMap.value[id] === true

// 체크박스 변경 이벤트 핸들러
const handleChange = (id) => {
    // 선택된 항목들을 초기화하고 현재 선택된 항목만 저장
    Object.keys(isCheckedMap.value).forEach((key) => {
        isCheckedMap.value[key] = false
    })
    isCheckedMap.value[id] = true

    emit(
        'change',
        Object.keys(isCheckedMap.value).filter((key) => isCheckedMap.value[key])
    ) // 선택된 항목들을 배열로 변환하여 상위 컴포넌트로 emit
}

// props.selected가 변경될 때마다 isCheckedMap 업데이트
watch(
    () => props.selected,
    (newSelected) => {
        // isCheckedMap 초기화
        isCheckedMap.value = {}
        // 변경된 항목들만 추가
        newSelected.forEach((id) => {
            isCheckedMap.value[id] = true
        })
    },
    { immediate: true }
)
</script>

<style scoped>
.sort-area {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding-bottom: 13px;
}
.sort-area .option-group {
    display: flex;
}
.form-check {
    padding-right: 15px;
}
label {
    cursor: pointer;
}
</style>
