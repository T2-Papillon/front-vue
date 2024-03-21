<template>
    <div class="sort-area">
        <div class="option-group">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="selectAll" @change="selectAllItems" :id="selectAllId" />
                <label class="form-check-label" :for="selectAllId">전체</label>
            </div>
            <div v-for="(item, index) in items" :key="index" class="form-check">
                <input class="form-check-input" type="checkbox" v-model="selectedItems" :value="item.id" :id="'flexCheck' + index" />
                <label class="form-check-label" :for="'flexCheck' + index">{{ item.name }}</label>
            </div>
        </div>
    </div>
</template>

<script scoped>
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
    name: 'CheckboxSelector',
    props: {
        // 체크박스 목록을 받아오는 props
        items: {
            type: Array,
            required: true
        },
        // 전체 선택 체크박스의 id를 받아오는 props
        selectAllId: {
            type: String,
            required: false,
            default: 'flexCheckDefault'
        }
    },
    setup(props, { emit }) {
        // emit 추가
        const selectedItems = ref([]) // 선택된 항목들을 저장하는 ref
        const selectAll = ref(true) // 전체 선택 체크박스의 상태를 저장하는 ref

        const selectAllItems = () => {
            if (selectAll.value) {
                // 전체 선택 체크박스가 체크되었을 때, 모든 항목을 선택된 항목 배열에 추가
                selectedItems.value = props.items.map((item) => item.id)
            } else {
                selectedItems.value = []
            }
            emit('change', selectedItems.value) // 선택된 상태를 상위 컴포넌트로 전달
        }
        // selectedItems의 변경을 감지하고, selectAll의 상태를 업데이트하고 선택된 상태를 상위 컴포넌트로 전달하는 watch
        watch(selectedItems, () => {
            selectAll.value = selectedItems.value.length === props.items.length
            emit('change', selectedItems.value) // 선택된 상태를 상위 컴포넌트로 전달
        })

        // 컴포넌트에서 사용할 데이터와 메서드를 반환
        return {
            selectedItems,
            selectAll,
            selectAllItems
        }
    }
})
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
