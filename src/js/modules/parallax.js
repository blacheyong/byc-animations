import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function () {
    gsap.utils.toArray('[data-parallax-from]').forEach((target)=> {
        const fromObject = JSON.parse(target.getAttribute('data-parallax-from'));
        const toObject = JSON.parse(target.getAttribute('data-parallax-to'));

        const isScrubString = target.getAttribute('data-parallax-scrub');
        const isScrub = (isScrubString === 'true');

        const thisTranslate = gsap.fromTo(target, fromObject, toObject);
        console.log(target.dataset.parallaxTrigger)
        ScrollTrigger.create({
          trigger: target.dataset.parallaxTrigger ? target.dataset.parallaxTrigger : target,
          start: target.dataset.parallaxStart ? target.dataset.parallaxStart : '75% bottom',
          end: target.dataset.parallaxEnd ? target.dataset.parallaxEnd : '',
          scrub: isScrubString ? isScrub : true,
          animation: thisTranslate,
        })
    });
}