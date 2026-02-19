export const defaults = {
  prefix: 'byc',
  wrapper: null, // Defer DOM resolution to runtime to be SSR-safe
  
  // Animate Content
  animateStart: 'top 94%',
  animateMobileStart: 'top bottom',
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
  syncTouch: undefined,
  smoothTouch: false,
  smoothWheel: true,
  scrollCallback: null, // todo: testing
  scrollContent: null, // Defer DOM resolution to runtime to be SSR-safe
  scrollOrientation: 'vertical', // todo: testing
  scrollGestureOrientation: 'vertical', // todo: testing
  scrollDuration: 1.2,
  scrollEasing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  scrollInfinite: false,
  scrollLerp: 0.1,
  scrollNormalizeWheel: true,
  scrollTouchMultiplier: 2,
  scrollWheelMultiplier: 1,
  scrollWrapper: null // Defer DOM resolution to runtime to be SSR-safe
}
