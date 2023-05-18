import { defineConfig } from 'vite'
import {resolve} from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
    build: {
        minify: true,
        lib: {
            entry: resolve(__dirname, 'src/js/byc-animations.js'),
            name: 'bell-vue-components',
            fileName: (format) => `byc-animations.${format}.js`,
        },
        rollupOptions: {
            external: [
                new RegExp('/public/.*')
            ],
            output: {
                exports: 'named',
                assetFileNames: `byc-animations.[ext]`,
            }
        },
    },
    plugins: [
        viteStaticCopy({
            targets: [
              {
                src: 'src/sass/library/byc-animations.scss',
                dest: 'sass'
              }
            ]
        })
    ]
})