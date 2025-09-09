import { defineConfig } from 'vite'
import { resolve } from 'path'

// Bundled (unminified) UMD + CSS into ./bundled
export default defineConfig({
  publicDir: false,
  build: {
    outDir: 'bundled',
    emptyOutDir: false,
    sourcemap: false,
    minify: false,
    lib: {
      entry: resolve(__dirname, 'src/js/byc-animations.js'),
      name: 'BycAnimations', // UMD global for bundled build
      formats: ['umd'],
      fileName: () => 'byc-animations.js',
    },
    rollupOptions: {
      // Bundle all deps to mimic `--external none`
      external: [],
      output: {
        assetFileNames: 'byc-animations.[ext]', // byc-animations.css
        exports: 'named',
      },
    },
  },
})
