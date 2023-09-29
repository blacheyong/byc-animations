export const defaults = {
  // Animate Content
  animateStart: 'top 70%',
  animateEnd: '',
  animateMarkers: false,
  inViewClass: 'in-view',
  outViewClass: 'out-view',
  // Parallax
  parallaxStart: 'top bottom',
  parallaxEnd: '',
  parallaxMarkers: false,
  parallaxScrub: true,
  // Smooth Scroll
  smoothScroll: true,
  smoothTouch: false,
  smoothWheel: true,
  scrollContent: document.documentElement,
  scrollOrientation: 'vertical', // todo: testing, doesnt seem to work as intended
  scrollGestureOrientation: 'vertical', // todo: testing, doesnt seem to work as intended
  scrollDuration: 1.2,
  scrollEasing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  scrollInfinite: false,
  scrollLerp: 0.1,
  scrollNormalizeWheel: true,
  scrollTouchMultiplier: 2,
  scrollWheelMultiplier: 1,
  scrollWrapper: window
}