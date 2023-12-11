import BycAnimations from '../../src/js/byc-animations.js';

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

//------------------------------------------------------------------------
// Initiate BycAnimations
//------------------------------------------------------------------------
let animations
animations = new BycAnimations({
  // animateMarkers: true
})


//------------------------------------------------------------------------
// Toggle animations / smooth scroll
//------------------------------------------------------------------------
let destroyAnimations = false;
let destroyScroll = false;

const scrollToggle = document.querySelector('.btn-toggle-lenis');
scrollToggle.addEventListener('click', () => {
  destroyScroll = !destroyScroll;
  if (destroyScroll) {
    animations.destroy(destroyAnimations, destroyScroll);
    scrollToggle.textContent = 'Toggle lenis scroll (Off)';
  } else {
    animations.init();
    scrollToggle.textContent = 'Toggle lenis scroll (On)';
  }
})

const animationsToggle = document.querySelector('.btn-toggle-animations');

animationsToggle.addEventListener('click', () => {
  destroyAnimations = !destroyAnimations;
  if (destroyAnimations) {
    animations.destroy(destroyAnimations, destroyScroll);
    animationsToggle.textContent = 'Toggle animations (Off)';
  } else {
    animations.init();
    animationsToggle.textContent = 'Toggle animations (On)';
  }
})

//------------------------------------------------------------------------
// Scroll to (anchors)
//------------------------------------------------------------------------
const anchors = document.querySelectorAll('.btn-anchor');
anchors.forEach((anchor) => {
  anchor.addEventListener('click', () => {
    const target = anchor.dataset.anchor;
    animations.scrollTo('#' + target, { offset: -50 });
  })
})