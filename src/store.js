// store.js
import { createStore } from 'vuex'

export default createStore({
    state: {
        isLoading: false,
        g_userInfo: null
    },
    mutations: {
        setUserInfo(state, g_userInfo) {
            state.g_userInfo = g_userInfo
        },
        deleteUserInfo(state) {
            state.g_userInfo = null
        },
        setLoading(state, isLoading) {
            state.isLoading = isLoading
        }
    },
    getters: {
        g_userInfo: (state) => state.g_userInfo,
        isLoading: (state) => state.isLoading
    }
})
