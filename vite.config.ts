export default {
    plugins: [],
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
}