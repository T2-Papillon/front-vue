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

<script>
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
    name: 'CheckboxSelector',
    props: {
        items: {
            type: Array,
            required: true
        },
        selectAllId: {
            type: String,
            required: false,
            default: 'flexCheckDefault'
        }
    },
    setup(props, { emit }) {
        // emit 추가
        const selectedItems = ref([])
        const selectAll = ref(true)

        const selectAllItems = () => {
            if (selectAll.value) {
                selectedItems.value = props.items.map((item) => item.id)
            } else {
                selectedItems.value = []
            }
            emit('change', selectedItems.value) // 선택된 상태를 상위 컴포넌트로 전달
        }

        watch(selectedItems, () => {
            selectAll.value = selectedItems.value.length === props.items.length
            emit('change', selectedItems.value) // 선택된 상태를 상위 컴포넌트로 전달
        })

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
</style>
