import { defaults } from '../options';
// import Lenis from '@studio-freight/lenis'

export default class SmoothScroll {

  constructor(options = {}, Lenis) {
    Object.assign(this, defaults, options);
    this.Lenis = Lenis;

    this.init();
  }

  init() {
    window.lenis = new this.Lenis({
      duration: this.scrollDuration,
      easing: this.scrollEasing,
      infinite: this.scrollInfinite,
      orientation: this.scrollDirection,
      gestureOrientation: this.scrollGestureDirection,
      touchMultiplier: this.scrollTouchMultiplier,
      wheelMultiplier: this.scrollWheelMultiplier,
      wrapper: this.scrollWrapper
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
}