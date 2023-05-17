import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function () {
    gsap.utils.toArray('[data-parallax-from]').forEach((el)=> {
        const fromObject = JSON.parse(el.getAttribute('data-parallax-from'));
        const toObject = JSON.parse(el.getAttribute('data-parallax-to'));

        // const thisTranslate = gsap.fromTo(el, { opacity: '1', translateY: '0'}, { opacity: '0.25', translateY: '-250px'});
        const thisTranslate = gsap.fromTo(el, fromObject, toObject);
        ScrollTrigger.create({
          trigger: el,
          start: '75% bottom',
          scrub: true,
          animation: thisTranslate,
        })
    });
}