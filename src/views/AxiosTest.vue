<script>
import axios from 'axios'
export default {
    data() {
        return { data: 'null' }
    },
    methods: {
        onClickGetData() {
            axios
                .get(`https://reqres.in/api/users?/page=1`, {})
                .then((res) => {
                    console.log('---axios Get 성공---- ')
                    this.data = res.data
                })
                .catch((res) => {
                    console.error(res)
                })
        }
    }
}
</script>
<template>
    <h2 class="boxTest">axios Test</h2>
    <button type="button" @click="onClickGetData(getDataId)">axios Get</button>
    <ul>
        <li v-for="(v, i) in data.data" :key="`data${i}`">
            <p>id : {{ v.id }}</p>
            <p>email : {{ v.email }}</p>
            <p>first_name : {{ v.first_name }}</p>
            <p>last_name : {{ v.last_name }}</p>
            <p>avatar : {{ v.avatar }}</p>
        </li>
    </ul>
    {{ data }}
</template>
<style scoped>
.boxTest {
    width: 200px;
    height: 50px;
    text-align: center;
    border: 1px solid #000;
}
</style>
