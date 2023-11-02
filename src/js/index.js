import BycAnimations from './byc-animations.js';

//------------------------------------------------------------------------
// Import Prims.js
//------------------------------------------------------------------------
import 'prismjs';
import 'prismjs/components/prism-sass.js';
import 'prismjs/components/prism-scss.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/unescaped-markup/prism-unescaped-markup.js';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js';
import 'prismjs/plugins/toolbar/prism-toolbar.js';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js';

//------------------------------------------------------------------------
// Import SCSS
//------------------------------------------------------------------------
import '../sass/main.scss'

let animations
function initBycAnimations() {
  animations = new BycAnimations({
    animateMarkers: true
  })
}

// animations.destroy(false, true);
// const btnToggle = document.querySelector('.btn-toggle-lenis');
// btnToggle.addEventListener('click', () => {
//   animations.start();
// })

// const btnAnchor = document.querySelector('.btn-anchor');
// const anchor = document.querySelector('#reveal');
// btnAnchor.addEventListener('click', () => {
//   animations.scrollTo(anchor, { offset: 150 })
// })

window.onload = function () {
  initBycAnimations();
}