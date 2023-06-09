import BycAnimations from './byc-animations.js';
import '../sass/main.scss'


const animations = new BycAnimations({
  // scrollDirection: 'horizontal',
  // scrollGestureDirection: 'horizontal',
  // scrollWrapper: document.querySelector('.lenis-wrapper'),
  // animateMarkers: {startColor: "green", endColor: "yellow", fontSize: "12px"}
});

animations.destroy(false, true);
const btnToggle = document.querySelector('.btn-toggle-lenis');
btnToggle.addEventListener('click', () => {
  animations.start();
})

const btnAnchor = document.querySelector('.btn-anchor');
const anchor = document.querySelector('#reveal');
btnAnchor.addEventListener('click', () => {
  animations.scrollTo(anchor, { offset: 150 })
})