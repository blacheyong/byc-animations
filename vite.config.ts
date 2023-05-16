import { defineConfig } from 'vite'
import {resolve} from 'path'
import copy from 'rollup-plugin-copy'

export default defineConfig({
    build: {
        minify: true,
        lib: {
            entry: resolve(__dirname, 'js/main.js'),
            name: 'bell-vue-components',
            fileName: (format) => `byc-animations.${format}.js`,
        },
        rollupOptions: {
            external: [],
            output: {
                exports: 'named',
                assetFileNames: `byc-animations.[ext]`,
            },
            plugins: [
                copy({
                    targets: [
                        { src: 'sass/main.scss', dest: 'dist' }
                    ]
                })
            ]
        },
    }
})