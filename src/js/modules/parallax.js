import { defaults } from '../options';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default class Parallax {

  constructor(options = {}) {
    Object.assign(this, defaults, options);

    this.init();
  }

  init() {
    gsap.utils.toArray('[data-parallax-from]').forEach((target)=> {
        if (target.getAttribute('data-parallax-to')) {
          const fromObject = JSON.parse(target.getAttribute('data-parallax-from'));
          const toObject = JSON.parse(target.getAttribute('data-parallax-to'));
  
          const isScrubString = target.getAttribute('data-parallax-scrub');
          let isScrub = isScrubString
  
          if (isScrubString === 'true' || isScrubString === 'false') {
            isScrub = (isScrubString === 'true');
          } else {
            isScrub = Number(isScrubString)
          }
  
          const thisTranslate = gsap.fromTo(target, fromObject, toObject);
  
          ScrollTrigger.create({
            trigger: target.dataset.parallaxTrigger ? target.dataset.parallaxTrigger : target,
            start: target.dataset.parallaxStart ? target.dataset.parallaxStart : this.parallaxStart,
            end: target.dataset.parallaxEnd ? target.dataset.parallaxEnd : this.parallaxEnd,
            scrub: isScrubString ? isScrub : this.parallaxScrub,
            animation: thisTranslate,
            markers: this.parallaxMarkers
          })
        } else {
          console.log('ERROR: data-parallax-to value is missing');
        }
    });
  }
}