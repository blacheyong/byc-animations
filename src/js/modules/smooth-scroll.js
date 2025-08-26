import { defaults } from "../options";
// import Lenis from '@studio-freight/lenis'

export default class SmoothScroll {
  constructor(options = {}, Lenis) {
    Object.assign(this, defaults, options);
    this.Lenis = Lenis;
  this._rafId = null;
  this._running = false;
  this._isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

    this.init();
  }

  init() {
    if (!this._isBrowser) return; // No-op on server

    // Resolve DOM-related options at runtime with safe fallbacks
    const content = this.scrollContent || document.documentElement;
    const wrapper = this.scrollWrapper || window;

    window.lenis = new this.Lenis({
      content,
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
      wrapper,
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

    // Start RAF loop and keep a handle so we can cancel it on destroy
    this._running = true;
    const raf = (time) => {
      if (!this._running) return;
      // lenis is exposed globally by this module; guard in case it was destroyed elsewhere
      if (window.lenis && typeof window.lenis.raf === 'function') {
        lenis.raf(time);
      }
      this._rafId = requestAnimationFrame(raf);
    };
    this._rafId = requestAnimationFrame(raf);
  }

  destroy() {
  if (!this._isBrowser) return; // No-op on server
    // Stop the RAF loop
    this._running = false;
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
    // Destroy lenis instance if present
    if (window.lenis && typeof window.lenis.destroy === 'function') {
      window.lenis.destroy();
    }
    // Clean up global
    try {
      delete window.lenis;
    } catch (_) {
      window.lenis = undefined;
    }
  }
}
