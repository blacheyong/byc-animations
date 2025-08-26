import { defaults } from "../options";

export default class Parallax {
  constructor(options = {}, gsap, ScrollTrigger) {
    Object.assign(this, defaults, options);
    this.gsap = gsap;
    this.ScrollTrigger = ScrollTrigger;
    // SSR guard + lazy wrapper resolution
    this._isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
    // Scope queries to wrapper (string selector) like AnimateContent does
    this.wrapper = this._isBrowser
      ? (options.wrapper ? document.querySelector(options.wrapper) : document)
      : null;

    this.init();
  }

  init() {
  if (!this._isBrowser || !this.wrapper) return;
  const nodes = this.wrapper.querySelectorAll('[data-parallax-from]');
  this.gsap.utils.toArray(nodes).forEach((target) => {
      const toAttr = target.getAttribute("data-parallax-to");
      if (toAttr) {
        const fromAttr = target.getAttribute("data-parallax-from");
        let fromObject = {};
        let toObject = null;

        // Safely parse JSON values
        if (fromAttr) {
          try {
            fromObject = JSON.parse(fromAttr);
          } catch (e) {
            console.warn("byc-animations: invalid JSON in data-parallax-from:", fromAttr, target, e);
            fromObject = {};
          }
        }

        try {
          toObject = JSON.parse(toAttr);
        } catch (e) {
          console.warn("byc-animations: invalid JSON in data-parallax-to:", toAttr, target, e);
          toObject = null;
        }

        if (!toObject) {
          console.warn("byc-animations: skipping parallax, data-parallax-to is missing or invalid:", target);
          return;
        }

        // Normalize scrub value: boolean, number, or fallback to default option
        const isScrubString = target.getAttribute("data-parallax-scrub");
        let isScrub = this.parallaxScrub;
        if (isScrubString !== null) {
          const v = isScrubString.trim();
          if (v === "true" || v === "false") {
            isScrub = v === "true";
          } else {
            const n = Number(v);
            isScrub = Number.isNaN(n) ? this.parallaxScrub : n;
          }
        }

        const thisTranslate = this.gsap.fromTo(target, fromObject, toObject);

        // Resolve trigger relative to wrapper when a selector is provided; fallback to global selector or the element itself
        const triggerSelector = target.dataset.parallaxTrigger;
        const resolvedTrigger = triggerSelector
          ? (this.wrapper.querySelector(triggerSelector) || triggerSelector)
          : target;

        // Resolve markers: allow per-element override via data-parallax-markers
        let markersOpt = this.parallaxMarkers;
        if (Object.prototype.hasOwnProperty.call(target.dataset, 'parallaxMarkers')) {
          const raw = target.dataset.parallaxMarkers;
          if (raw === '' || raw === 'true') {
            markersOpt = true;
          } else if (raw === 'false') {
            markersOpt = false;
          } else if (raw && raw.trim().startsWith('{')) {
            try {
              markersOpt = JSON.parse(raw);
            } catch (e) {
              console.warn('byc-animations: invalid JSON in data-parallax-markers:', raw, target, e);
              // keep fallback markersOpt
            }
          } else {
            // Any other non-empty value: treat as truthy boolean
            markersOpt = true;
          }
        }

        this.ScrollTrigger.create({
          trigger: resolvedTrigger,
          start: target.dataset.parallaxStart
            ? target.dataset.parallaxStart
            : this.parallaxStart,
          end: target.dataset.parallaxEnd
            ? target.dataset.parallaxEnd
            : this.parallaxEnd,
          scrub: isScrub,
          animation: thisTranslate,
          markers: markersOpt,
        });
      } else {
        console.warn("byc-animations: data-parallax-to value is missing:", target);
      }
    });
  }
}
