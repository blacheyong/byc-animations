import Lenis from '@studio-freight/lenis'

export default function() {
  window.lenis = new Lenis({
    duration: 1.2,
    // easing: (t) => -(Math.cos(Math.PI *t) - 1) / 2, // https://www.desmos.com/calculator/brs54l4xou
    direction: 'vertical', // vertical, horizontal
    gestureDirection: 'vertical', // vertical, horizontal, both
    smooth: true,
    mouseMultiplier: 0.5,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  })
  
  // get scroll value
  window.scrollDirection = 'down';
  
  lenis.on('scroll', ({ direction, progress }) => {
    if (direction === 1) {
      window.scrollDirection = 'down';
    } else {
      window.scrollDirection = 'up';
    }
  })
  
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  
  requestAnimationFrame(raf)
}