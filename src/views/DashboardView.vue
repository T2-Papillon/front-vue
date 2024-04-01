<template>
    <div class="inner">
        <div class="row align-items-start justify-content-between g-3">
            <div class="col-auto">
                <div class="title-area">
                    <h2 class="h2">환영합니다! {{ username }}님💡</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        username: ''
    },
    methods: {
        async dashboardData() {
            try {
                const eno = sessionStorage.getItem('EN')
                const url = import.meta.env.VITE_API_URL + `/dashboard/emp/${eno}`
                const res = await axios.get(url)
                console.log(res)
            } catch (e) {
                //this.$router.replace('/')
                console.log(e)
            }
        }
    },
    mounted() {
        this.username = sessionStorage.getItem('NM')
        this.dashboardData()
    }
}
</script>
