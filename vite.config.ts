import { defineConfig } from 'vite'
export default defineConfig ({
    plugins: [],
    base: "/ParticleSimulator/",
    server: {
        open: '/index.html',
        port: 3000,
    },
    build: {
        rollupOptions: {
            input: {
                main: 'index.html'
            },
            output: {
                dir: './docs'
            }
        }
    }
})