import { defaults } from "../options";

export default class Parallax {
  constructor(options = {}, gsap, ScrollTrigger) {
    Object.assign(this, defaults, options);
    this.gsap = gsap;
    this.ScrollTrigger = ScrollTrigger;

    // SSR guard + lazy wrapper resolution
    this._isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
    
    // Scope queries to wrapper; accept Element or selector string
    if (this._isBrowser) {
      if (options.wrapper instanceof Element) {
        this.wrapper = options.wrapper;
      } else if (typeof options.wrapper === 'string') {
        this.wrapper = document.querySelector(options.wrapper) || document;
      } else {
        this.wrapper = document;
      }
    } else {
      this.wrapper = null;
    }

    this.init();
  }

  init() {
  if (!this._isBrowser || !this.wrapper) return;
  const parallaxNodes = this.wrapper.querySelectorAll('[data-parallax-from]');
  this.gsap.utils.toArray(parallaxNodes).forEach((element) => {
      const parallaxToAttr = element.getAttribute("data-parallax-to");
      if (parallaxToAttr) {
        const parallaxFromAttr = element.getAttribute("data-parallax-from");
        let fromProps = {};
        let toProps = null;

        // Safely parse JSON values
        if (parallaxFromAttr) {
          try {
            fromProps = JSON.parse(parallaxFromAttr);
          } catch (err) {
            console.warn("byc-animations: invalid JSON in data-parallax-from:", parallaxFromAttr, element, err);
            fromProps = {};
          }
        }

        try {
          toProps = JSON.parse(parallaxToAttr);
        } catch (err) {
          console.warn("byc-animations: invalid JSON in data-parallax-to:", parallaxToAttr, element, err);
          toProps = null;
        }

        if (!toProps) {
          console.warn("byc-animations: skipping parallax, data-parallax-to is missing or invalid:", element);
          return;
        }

        // Normalize scrub value: boolean, number, or fallback to default option
        const scrubAttr = element.getAttribute("data-parallax-scrub");
        let scrubValue = this.parallaxScrub;
        if (scrubAttr !== null) {
          const scrubRaw = scrubAttr.trim();
          // Treat empty attribute (e.g. <div data-parallax-scrub>) as "use default"
          if (scrubRaw === "") {
            scrubValue = this.parallaxScrub;
          } else if (scrubRaw === "true" || scrubRaw === "false") {
            scrubValue = scrubRaw === "true";
          } else {
            const scrubNumber = Number(scrubRaw);
            scrubValue = Number.isNaN(scrubNumber) ? this.parallaxScrub : scrubNumber;
          }
        }

        const parallaxTween = this.gsap.fromTo(element, fromProps, toProps);

        // Resolve trigger relative to wrapper when a selector is provided; fallback to global selector or the element itself
        const triggerSelector = element.dataset.parallaxTrigger;
        const resolvedTrigger = triggerSelector
          ? (this.wrapper.querySelector(triggerSelector) || triggerSelector)
          : element;

        // Resolve markers: allow per-element override via data-parallax-markers
        let markersOption = this.parallaxMarkers;
        if (Object.prototype.hasOwnProperty.call(element.dataset, 'parallaxMarkers')) {
          const markersRaw = element.dataset.parallaxMarkers;
          if (markersRaw === '' || markersRaw === 'true') {
            markersOption = true;
          } else if (markersRaw === 'false') {
            markersOption = false;
          } else if (markersRaw && markersRaw.trim().startsWith('{')) {
            try {
              markersOption = JSON.parse(markersRaw);
            } catch (err) {
              console.warn('byc-animations: invalid JSON in data-parallax-markers:', markersRaw, element, err);
              // keep fallback markersOpt
            }
          } else {
            // Any other non-empty value: treat as truthy boolean
            markersOption = true;
          }
        }

        this.ScrollTrigger.create({
          trigger: resolvedTrigger,
          start: element.dataset.parallaxStart
            ? element.dataset.parallaxStart
            : this.parallaxStart,
          end: element.dataset.parallaxEnd
            ? element.dataset.parallaxEnd
            : this.parallaxEnd,
          scrub: scrubValue,
          animation: parallaxTween,
          markers: markersOption,
        });
      } else {
        console.warn("byc-animations: Data-parallax-to value is missing:", element);
      }
    });
  }
}
