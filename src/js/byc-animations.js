//------------------------------------------------------------------------
// Import Main Styles
//------------------------------------------------------------------------
import '../sass/library/byc-animations.scss';

//------------------------------------------------------------------------
// Import GSAP + Default options
//------------------------------------------------------------------------
import Lenis from '@studio-freight/lenis';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { defaults } from './options';

//------------------------------------------------------------------------
// Import Custom Modules
//------------------------------------------------------------------------
import SmoothScroll from './modules/smooth-scroll';
import AnimateContent from './modules/animate-content';
import Parallax from './modules/parallax';

export default class BycAnimations {
    constructor(options = {}) {
        this.options = options;
        // Override default options with given ones
        Object.assign(this, defaults, options);

        // SSR guard
        this._isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

        if (this._isBrowser) {
            gsap.registerPlugin(ScrollTrigger);
        }

        this.init();
    }

    init() {
        if (!this._isBrowser) return; // No-op on server

        const prefersMotion = typeof window.matchMedia === 'function'
          ? window.matchMedia('(prefers-reduced-motion: no-preference)')
          : { matches: true };

        if (prefersMotion.matches) {
            if(this.smoothScroll) {
                // Keep a reference so we can destroy/stop RAF later
                this._smooth = new SmoothScroll(this.options, Lenis);
            }
            this.initAnimations();
        }

    }

    initAnimations() {
        new AnimateContent(this.options, gsap, ScrollTrigger);
        new Parallax(this.options, gsap, ScrollTrigger);
    }

    destroy(animate = true, scroll = true) {
        if (!this._isBrowser) return; // No-op on server
        if (animate) {
            ScrollTrigger.killAll();
        }
        if (scroll) {
            // Stop RAF loop and destroy lenis cleanly if SmoothScroll was initialized
            if (this._smooth && typeof this._smooth.destroy === 'function') {
                this._smooth.destroy();
            } else if (window.lenis && typeof window.lenis.destroy === 'function') {
                window.lenis.destroy();
            }
        }
    }

    refresh() {
        if (!this._isBrowser) return; // No-op on server
        ScrollTrigger.refresh();
    }

    scrollTo(target, options) {
        if (!this._isBrowser) return; // No-op on server
        if (window.lenis && typeof window.lenis.scrollTo === 'function') {
            window.lenis.scrollTo(target, options);
        }
    }

    start() {
        if (!this._isBrowser) return; // No-op on server
        if (window.lenis && typeof window.lenis.start === 'function') {
            window.lenis.start();
        }
        // this.initAnimations();
    }

    stop() {
        if (!this._isBrowser) return; // No-op on server
        if (window.lenis && typeof window.lenis.stop === 'function') {
            window.lenis.stop();
        }
    }
}
