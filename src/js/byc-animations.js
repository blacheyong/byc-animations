//------------------------------------------------------------------------
// Import Main Styles
//------------------------------------------------------------------------
import '../sass/library/animations.scss'

//------------------------------------------------------------------------
// Import Custom Modules
//------------------------------------------------------------------------
import AnimateContent from './modules/animate-content';
import Parallax from './modules/parallax';

function BycAnimations() {
    AnimateContent();
    Parallax();
}

export default BycAnimations
