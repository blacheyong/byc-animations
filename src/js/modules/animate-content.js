import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function () {
    gsap.registerPlugin(ScrollTrigger);

    const myBlocks = document.querySelectorAll('[data-animate]');
    if (myBlocks) {
        gsap.utils.toArray(myBlocks).forEach((target) => {

            if (target.hasAttribute('data-animate-duration')) {
                target.style.setProperty('--animate-duration', target.getAttribute('data-animate-duration') + 's');
            }
            if (target.hasAttribute('data-opacity-duration')) {
                target.style.setProperty('--animate-opacity-duration', target.getAttribute('data-opacity-duration') + 's');
            }
            if (target.hasAttribute('data-slide-duration')) {
                target.style.setProperty('--animate-slide-duration', target.getAttribute('data-slide-duration') + 's');
            }
            if (target.hasAttribute('data-animate-delay')) {
                target.style.setProperty('--animate-delay', target.getAttribute('data-animate-delay') + 's');
            }
            if (target.hasAttribute('data-animate-easing')) {
                target.style.setProperty('--animate-easing', target.getAttribute('data-animate-easing'));
            }
            if (target.hasAttribute('data-animate-offset')) {
                target.style.setProperty('--animate-slide-offset', target.getAttribute('data-animate-offset'));
            }
            if (target.hasAttribute('data-background-color')) {
                target.style.setProperty('--animate-background-color', target.getAttribute('data-background-color'));
            }
            if (target.hasAttribute('data-border-radius')) {
                target.style.setProperty('--animate-border-radius', target.getAttribute('data-border-radius'));
            }
            if (target.hasAttribute('data-foreground-color')) {
                target.style.setProperty('--animate-foreground-color', target.getAttribute('data-foreground-color'));
            }

            const isRepeatable = target.getAttribute('data-animate-repeat');

            ScrollTrigger.create({
              trigger: target,
              start: target.dataset.animateStart ? target.dataset.animateStart : 'top 70%',
              onEnter: () => { 
                console.log('onEnter: add .in-view')
                target.classList.add('in-view')
              },
              onEnterBack: () => {
                console.log('onEnterBack: add .in-view; remove .out-view')
                target.classList.add('in-view')
                target.classList.remove('out-view')
              },
              onLeave: () => {
                console.log('onLeave: add .out-view if not repeatable')
                if (isRepeatable) {
                    target.classList.add('out-view')
                }
              },
              onLeaveBack: () => {
                console.log('onLeaveBack: remove .in-view if not repeatable')
                if (isRepeatable) {
                    target.classList.remove('in-view')
                }
              },
              once: !isRepeatable,
              markers: true
            });
        });
    }

    // Parallax
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