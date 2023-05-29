import { defaults } from '../options';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default class AnimateContent {

  constructor(options = {}) {
    Object.assign(this, defaults, options);

    this.init();
  }

  init() {
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
        if (target.hasAttribute('data-animate-background')) {
          target.style.setProperty('--animate-background-color', target.getAttribute('data-animate-background'));
        }
        if (target.hasAttribute('data-animate-border-radius')) {
          target.style.setProperty('--animate-border-radius', target.getAttribute('data-animate-border-radius'));
        }
        if (target.hasAttribute('data-animate-foreground')) {
          target.style.setProperty('--animate-foreground-color', target.getAttribute('data-animate-foreground'));
        }

        const isRepeatableString = target.getAttribute('data-animate-repeat');
        const isRepeatable = (isRepeatableString === 'true');

        ScrollTrigger.create({
          trigger: target.dataset.animateTrigger ? target.dataset.animateTrigger : target,
          start: target.dataset.animateStart ? target.dataset.animateStart : this.animateStart,
          end: target.dataset.animateEnd ? target.dataset.animateEnd : '',
          onEnter: () => {
            // console.log('onEnter: add .in-view')
            target.classList.add('in-view')
          },
          onEnterBack: () => {
            // console.log('onEnterBack: add .in-view; remove .out-view')
            target.classList.add('in-view')
            target.classList.remove('out-view')
          },
          onLeave: () => {
            // console.log('onLeave: add .out-view if not repeatable')
            if (isRepeatable == true) {
              target.classList.add('out-view')
            }
          },
          onLeaveBack: () => {
            // console.log('onLeaveBack: remove .in-view if not repeatable')
            if (isRepeatable) {
              target.classList.remove('in-view')
            }
          },
          once: !isRepeatable,
        });
      });
    }
  }
}