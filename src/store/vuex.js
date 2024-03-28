// store.js
import { createStore } from 'vuex'

export default createStore({
    state: {
        userInfo: null
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
        }
    },
    actions: {
        updateUserInfo({ commit }, userInfo) {
            commit('setUserInfo', userInfo) // 쿠키 값 업데이트
        }
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo // 쿠키 값 리턴
        }
    }
})
