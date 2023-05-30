//------------------------------------------------------------------------
// Import Main Styles
//------------------------------------------------------------------------
import '../sass/library/byc-animations.scss'

//------------------------------------------------------------------------
// Import Default options
//------------------------------------------------------------------------
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
        this.init();
    }

    init() {
        console.log(this.options);
        if(this.smoothScroll) {
            new SmoothScroll(this.options);
        }

        new AnimateContent(this.options);
        new Parallax(this.options);
    }
}
