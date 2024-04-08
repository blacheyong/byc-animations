import { defaults } from "../options";
// import Lenis from '@studio-freight/lenis'

export default class SmoothScroll {
  constructor(options = {}, Lenis) {
    Object.assign(this, defaults, options);
    this.Lenis = Lenis;

    this.init();
  }

  init() {
    window.lenis = new this.Lenis({
      content: this.scrollContent,
      duration: this.scrollDuration,
      easing: this.scrollEasing,
      infinite: this.scrollInfinite,
      lerp: this.scrollLerp,
      orientation: this.scrollOrientation,
      gestureOrientation: this.scrollGestureOrientation,
      normalizeWheel: this.scrollNormalizeWheel,
      smoothTouch: this.smoothTouch,
      smoothWheel: this.smoothWheel,
      touchMultiplier: this.scrollTouchMultiplier,
      wheelMultiplier: this.scrollWheelMultiplier,
      wrapper: this.scrollWrapper,
      // scrollCallback: onScroll // remove from readme / doc
    });

    // get scroll value
    window.scrollDirection = "down";

    lenis.on("scroll", ({ direction, progress }) => {
      if (direction === 1) {
        window.scrollDirection = "down";
      } else {
        window.scrollDirection = "up";
      }
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }
}
