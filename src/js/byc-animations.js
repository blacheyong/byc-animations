//------------------------------------------------------------------------
// Import Main Styles
//------------------------------------------------------------------------
import '../sass/library/byc-animations.scss'

//------------------------------------------------------------------------
// Import GSAP + Default options
//------------------------------------------------------------------------
import Lenis from '@studio-freight/lenis' // testing
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
        gsap.registerPlugin(ScrollTrigger);
        this.options = options;
        // Override default options with given ones
        Object.assign(this, defaults, options);
        this.init();
    }

    init() {
        console.log(this.options);
        if(this.smoothScroll) {
            // const scrollLenis = new SmoothScroll(this.options, Lenis);
            new SmoothScroll(this.options, Lenis);
        }

        // new AnimateContent(this.options, gsap, ScrollTrigger);
        // new Parallax(this.options, gsap, ScrollTrigger);
        this.initAnimations();
    }

    initAnimations() {
        new AnimateContent(this.options, gsap, ScrollTrigger);
        new Parallax(this.options, gsap, ScrollTrigger);
    }

    destroy(animate = true, scroll = true) {
        if (animate) {
            ScrollTrigger.killAll();
        }
        if (scroll) {
            window.lenis.destroy();
        }
    }

    refresh() {
        ScrollTrigger.refresh();
    }

    scrollTo(target, options) {
        window.lenis.scrollTo(target, options);
    }

    start() {
        window.lenis.start();
        // this.initAnimations();
    }

    stop() {
        window.lenis.stop();
    }
}
