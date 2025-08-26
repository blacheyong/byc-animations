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
// Prism CSS moved here to avoid Sass @import deprecation warnings
import 'prismjs/themes/prism.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

//------------------------------------------------------------------------
// Import SCSS
//------------------------------------------------------------------------
import '../sass/main.scss';

//------------------------------------------------------------------------
// Initiate BycAnimations
//------------------------------------------------------------------------
// Small on-screen scroll indicator for testing scrollCallback
const _makeScrollIndicator = () => {
  const el = document.createElement('div');
  el.id = 'byc-scroll-indicator';
  el.style.position = 'fixed';
  el.style.right = '12px';
  el.style.bottom = '12px';
  el.style.zIndex = '9999';
  el.style.padding = '6px 8px';
  el.style.borderRadius = '6px';
  el.style.background = 'rgba(0,0,0,.6)';
  el.style.color = '#fff';
  el.style.font = '12px/1.2 -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif';
  el.style.pointerEvents = 'none';
  el.textContent = 'scroll: 0% (↓ 0.00)';
  document.addEventListener('DOMContentLoaded', () => document.body.appendChild(el));
  return el;
};
const _indicator = _makeScrollIndicator();

// Small on-screen visibility indicator for testing page-visibility pause/resume
const _makeVisibilityIndicator = () => {
  const el = document.createElement('div');
  el.id = 'byc-visibility-indicator';
  el.style.position = 'fixed';
  el.style.right = '12px';
  el.style.bottom = '42px';
  el.style.zIndex = '9999';
  el.style.padding = '6px 8px';
  el.style.borderRadius = '6px';
  el.style.background = 'rgba(0,0,0,.6)';
  el.style.color = '#fff';
  el.style.font = '12px/1.2 -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif';
  el.style.pointerEvents = 'none';
  el.textContent = 'visibility: active';
  document.addEventListener('DOMContentLoaded', () => document.body.appendChild(el));
  return el;
};
const _visIndicator = _makeVisibilityIndicator();
const _updateVisibility = () => {
  if (!_visIndicator) return;
  const isHidden = typeof document.hidden === 'boolean' ? document.hidden : false;
  _visIndicator.textContent = `visibility: ${isHidden ? 'paused' : 'active'}`;
  _visIndicator.style.background = isHidden ? 'rgba(200,0,0,.7)' : 'rgba(0,128,0,.7)';
};
document.addEventListener('visibilitychange', _updateVisibility);
document.addEventListener('DOMContentLoaded', _updateVisibility);

let animations
animations = new BycAnimations({
  // animateMarkers: true,
  // Test: throttled scroll callback from SmoothScroll
  scrollCallback: ({ direction, progress, velocity }) => {
    if (!_indicator) return;
    const arrow = direction === 1 ? '↓' : '↑';
    const pct = Math.round((progress || 0) * 100);
    const vel = Number.isFinite(velocity) ? velocity.toFixed(2) : '0.00';
    _indicator.textContent = `scroll: ${pct}% (${arrow} ${vel})`;
  }
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