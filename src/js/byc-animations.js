//------------------------------------------------------------------------
// Import Main Styles
//------------------------------------------------------------------------
import '../sass/library/animations.scss'

//------------------------------------------------------------------------
// Import Custom Modules
//------------------------------------------------------------------------
import SmoothScroll from './modules/smooth-scroll';
import AnimateContent from './modules/animate-content';
import Parallax from './modules/parallax';

function BycAnimations() {
    SmoothScroll();
    AnimateContent();
    Parallax();
}

export default BycAnimations
