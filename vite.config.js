import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        outDir: '../../../Spring/papplan/src/main/resources/static'
    },
    server: {
        proxy: {
            '/api': 'http://localhost:8081',
            changeOrigin: true
        }
    }
})
