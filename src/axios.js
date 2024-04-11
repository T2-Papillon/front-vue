// src/axios.js
import axios from 'axios'
import store from './store'

const apiUrl = import.meta.env.VITE_API_URL

const instance = axios.create({
    baseURL: apiUrl
})

// 요청 인터셉터
instance.interceptors.request.use(
    (config) => {
        store.commit('setLoading', true) // 요청 시작 시 로딩 상태 true로 설정
        return config
    },
    (error) => {
        store.commit('setLoading', false) // 요청 에러 시 로딩 상태 false로 설정
        return Promise.reject(error)
    }
)

// 응답 인터셉터
instance.interceptors.response.use(
    (response) => {
        store.commit('setLoading', false) // 응답 성공 시 로딩 상태 false로 설정
        return response
    },
    (error) => {
        store.commit('setLoading', false) // 응답 에러 시 로딩 상태 false로 설정
        console.error('Response Error:', error) // 콘솔에 에러 출력
        return Promise.reject(error)
    }
)

export default instance
