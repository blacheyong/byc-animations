import { defineConfig } from 'vite'
import { resolve } from 'path'

// Bundled (minified) UMD + minified CSS into ./bundled
export default defineConfig({
  publicDir: false,
  build: {
    outDir: 'bundled',
    emptyOutDir: false,
    sourcemap: false,
    minify: true,
    cssMinify: true,
    lib: {
      entry: resolve(__dirname, 'src/js/byc-animations.js'),
      name: 'BycAnimations', // UMD global for bundled build
      formats: ['umd'],
      fileName: () => 'byc-animations.min.js',
    },
    rollupOptions: {
      external: [],
      output: {
        assetFileNames: 'byc-animations.min.[ext]', // byc-animations.min.css
        exports: 'named',
      },
    },
  },
})
