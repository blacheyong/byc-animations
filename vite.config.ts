import { defineConfig } from 'vite'
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'
// visualizer removed to avoid TS type mismatch with Rollup types

// Dist build: replicate current outputs in ./dist
export default defineConfig({
  publicDir: false,
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
            // Map to browser globals when consumers include UMD scripts via <script>
            // Lenis exposes window.Lenis (capitalized)
            lenis: 'Lenis',
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
  ],
})
