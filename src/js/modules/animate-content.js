import { defaults } from '../options';

export default class AnimateContent {

  constructor(options = {}, gsap, ScrollTrigger) {
    this.options = options;
    Object.assign(this, defaults, options);
    this.gsap = gsap;
    this.ScrollTrigger = ScrollTrigger;

    this.prefix = options.prefix ? options.prefix : defaults.prefix;

    this.init();
  }

  init() {
    const myBlocks = document.querySelectorAll('[data-animate]');
    if (myBlocks) {
      this.gsap.utils.toArray(myBlocks).forEach((target) => {

        if (target.hasAttribute('data-animate-duration')) {
          target.style.setProperty(`--${this.prefix}-animate-duration`, target.getAttribute('data-animate-duration') + 's');
        }
        if (target.hasAttribute('data-opacity-duration')) {
          target.style.setProperty(`--${this.prefix}-animate-opacity-duration`, target.getAttribute('data-opacity-duration') + 's');
        }
        if (target.hasAttribute('data-slide-duration')) {
          target.style.setProperty(`--${this.prefix}-animate-slide-duration`, target.getAttribute('data-slide-duration') + 's');
        }
        if (target.hasAttribute('data-animate-delay')) {
          target.style.setProperty(`--${this.prefix}-animate-delay`, target.getAttribute('data-animate-delay') + 's');
        }
        if (target.hasAttribute('data-animate-easing')) {
          target.style.setProperty(`--${this.prefix}-animate-easing`, target.getAttribute('data-animate-easing'));
        }
        if (target.hasAttribute('data-animate-offset')) {
          target.style.setProperty(`--${this.prefix}-animate-slide-offset`, target.getAttribute('data-animate-offset'));
        }
        if (target.hasAttribute('data-animate-border-radius')) {
          target.style.setProperty(`--${this.prefix}-animate-border-radius`, target.getAttribute('data-animate-border-radius'));
        }
        if (target.hasAttribute('data-animate-background')) {
          target.style.setProperty(`--${this.prefix}-animate-background-color`, target.getAttribute('data-animate-background'));
        }
        if (target.hasAttribute('data-animate-foreground')) {
          target.style.setProperty(`--${this.prefix}-reveal-foreground-color`, target.getAttribute('data-animate-foreground'));
        }
        if (target.hasAttribute('data-opacity-start')) {
          target.style.setProperty(`--${this.prefix}-opacity-start`, target.getAttribute('data-opacity-start'));
        }
        if (target.hasAttribute('data-opacity-end')) {
          target.style.setProperty(`--${this.prefix}-opacity-end`, target.getAttribute('data-opacity-end'));
        }
        if (target.hasAttribute('data-animate-zoom-end')) {
          target.style.setProperty(`--${this.prefix}-animate-zoom-end`, target.getAttribute('data-animate-zoom-end'));
        }
        if (target.hasAttribute('data-animate-zoom-start')) {
          target.style.setProperty(`--${this.prefix}-animate-zoom-start`, target.getAttribute('data-animate-zoom-start'));
        }
        if (target.hasAttribute('data-animate-zoom-end')) {
          target.style.setProperty(`--${this.prefix}-animate-zoom-end`, target.getAttribute('data-animate-zoom-end'));
        }

        const isRepeatableString = target.getAttribute('data-animate-repeat');
        const isRepeatable = (isRepeatableString === 'true');

        this.ScrollTrigger.create({
          trigger: target.dataset.animateTrigger ? target.dataset.animateTrigger : target,
          start: target.dataset.animateStart ? target.dataset.animateStart : this.animateStart,
          end: target.dataset.animateEnd ? target.dataset.animateEnd : this.animateEnd,
          markers: this.animateMarkers,
          onEnter: () => {
            target.classList.add(this.inViewClass)
          },
          onEnterBack: () => {
            target.classList.add(this.inViewClass)
            target.classList.remove(this.outViewClass)
          },
          onLeave: () => {
            if (isRepeatable == true) {
              target.classList.add(this.outViewClass)
            }
          },
          onLeaveBack: () => {
            if (isRepeatable) {
              target.classList.remove(this.inViewClass)
            }
          },
          once: !isRepeatable,
        });
      });
    }
  }
}