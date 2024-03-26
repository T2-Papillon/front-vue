<template>
    <div>
        <div v-for="item in items" :key="item.id" class="form-check">
            <input type="checkbox" class="form-check-input" :id="`checkbox-${item.id}`" :value="item.id" @change="onChange($event, item.id)" :checked="selected.includes(item.id)" />
            <label class="form-check-label" :for="`checkbox-${item.id}`">{{ item.name }}</label>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        items: Array,
        selected: Array
    },
    methods: {
        onChange(event, id) {
            this.$emit('update:selected', event.target.checked ? [...this.selected, id] : this.selected.filter((sid) => sid !== id))
        }
    }
}
</script>
