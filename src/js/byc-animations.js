//------------------------------------------------------------------------
// Import Main Styles
//------------------------------------------------------------------------
import '../sass/library/byc-animations.scss'

//------------------------------------------------------------------------
// Import GSAP + Default options
//------------------------------------------------------------------------
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

    destroyScrollTrigger() {
        ScrollTrigger.killAll();
    }
    refreshScrollTrigger() {
        ScrollTrigger.refresh()
    }

    // destroyScroll() {
    //     lenis
    // }

    init() {
        console.log(this.options);
        if(this.smoothScroll) {
            new SmoothScroll(this.options);
        }

        new AnimateContent(this.options, gsap, ScrollTrigger);
        new Parallax(this.options, gsap, ScrollTrigger);
    }
}
