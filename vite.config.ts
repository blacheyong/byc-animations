import { defineConfig } from 'vite'
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { visualizer } from 'rollup-plugin-visualizer'

// Dist build: replicate current outputs in ./dist
export default defineConfig({
  publicDir: false,
  css: {
    // Ensure CSS sourcemaps are generated for production builds
    postcss: {
      map: { inline: false, annotation: true },
    },
    preprocessorOptions: {
      scss: {
        // Hint source maps for Sass preprocessing
        sourceMap: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: true,
    lib: {
      entry: resolve(__dirname, 'src/js/byc-animations.js'),
      name: 'bycAnimations', // UMD global for dist
      // fileName is overridden by explicit rollup outputs below
    },
    rollupOptions: {
      external: [
        'lenis',
        'gsap',
        'gsap/ScrollTrigger',
      ],
      output: [
        {
          format: 'es',
          entryFileNames: 'byc-animations.es.js',
          assetFileNames: 'byc-animations.[ext]',
          exports: 'named',
          sourcemap: true,
        },
        {
          // Extra modern ESM build to match .modern.js file
          format: 'es',
          entryFileNames: 'byc-animations.modern.js',
          assetFileNames: 'byc-animations.[ext]',
          exports: 'named',
          sourcemap: true,
        },
        {
          format: 'cjs',
          entryFileNames: 'byc-animations.cjs',
          assetFileNames: 'byc-animations.[ext]',
          exports: 'named',
          sourcemap: true,
        },
        {
          format: 'umd',
          entryFileNames: 'byc-animations.umd.js',
          name: 'bycAnimations',
          globals: {
            lenis: 'lenis',
            gsap: 'gsap',
            'gsap/ScrollTrigger': 'ScrollTrigger',
          },
          assetFileNames: 'byc-animations.[ext]',
          exports: 'named',
          sourcemap: true,
        },
      ],
    },
  },
  plugins: [
    // Copy SCSS into dist root to match current files
    viteStaticCopy({
      targets: [
        { src: 'src/sass/library/byc-animations.scss', dest: '' },
      ],
    }),
    visualizer(),
  ],
})
