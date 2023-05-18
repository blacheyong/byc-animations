import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function () {
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
            start: target.dataset.parallaxStart ? target.dataset.parallaxStart : '75% bottom',
            end: target.dataset.parallaxEnd ? target.dataset.parallaxEnd : '',
            scrub: isScrubString ? isScrub : true,
            animation: thisTranslate,
          })
        } else {
          console.log('ERROR: data-parallax-to value is missing');
        }
    });
}