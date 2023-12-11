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

  setAnimateAttributes(target, parent = null, callback) {
    let thisTarget = target;

    if (parent) {
      thisTarget = parent;
    }

    if (thisTarget.hasAttribute('data-animate-easing')) {
      target.style.setProperty(`--${this.prefix}-animate-easing`, thisTarget.getAttribute('data-animate-easing'));
    }
    if (thisTarget.hasAttribute('data-animate-duration')) {
      target.style.setProperty(`--${this.prefix}-animate-duration`, thisTarget.getAttribute('data-animate-duration') + 's');
    }
    if (thisTarget.hasAttribute('data-animate-delay')) {
      target.style.setProperty(`--${this.prefix}-animate-delay`, thisTarget.getAttribute('data-animate-delay') + 's');
    }
    if (thisTarget.hasAttribute('data-animate-delay-mobile')) {
      target.style.setProperty(`--${this.prefix}-animate-delay-mobile`, thisTarget.getAttribute('data-animate-delay-mobile'));
    }
    /* Fade / Opacity */
    if (thisTarget.hasAttribute('data-animate-opacity-duration')) {
      target.style.setProperty(`--${this.prefix}-animate-opacity-duration`, thisTarget.getAttribute('data-animate-opacity-duration') + 's');
    }
    if (thisTarget.hasAttribute('data-animate-opacity-start')) {
      target.style.setProperty(`--${this.prefix}-animate-opacity-start`, thisTarget.getAttribute('data-animate-opacity-start'));
    }
    if (thisTarget.hasAttribute('data-animate-opacity-end')) {
      target.style.setProperty(`--${this.prefix}-animate-opacity-end`, thisTarget.getAttribute('data-animate-opacity-end'));
    }
    /* Reveal */
    if (thisTarget.hasAttribute('data-animate-border-radius')) {
      target.style.setProperty(`--${this.prefix}-animate-border-radius`, thisTarget.getAttribute('data-animate-border-radius'));
    }
    if (thisTarget.hasAttribute('data-animate-background')) {
      target.style.setProperty(`--${this.prefix}-animate-background-color`, thisTarget.getAttribute('data-animate-background'));
    }
    if (thisTarget.hasAttribute('data-animate-foreground')) {
      target.style.setProperty(`--${this.prefix}-animate-foreground-color`, thisTarget.getAttribute('data-animate-foreground'));
    }
    if (thisTarget.hasAttribute('data-animate-reveal-delay')) {
      target.style.setProperty(`--${this.prefix}-animate-reveal-delay-extra`, thisTarget.getAttribute('data-animate-reveal-delay') + 's' );
    }
    if (thisTarget.hasAttribute('data-animate-reveal-duration')) {
      target.style.setProperty(`--${this.prefix}-animate-reveal-duration`, thisTarget.getAttribute('data-animate-reveal-duration') + 's');
    }
    /* Slide */
    if (thisTarget.hasAttribute('data-animate-slide-duration')) {
      target.style.setProperty(`--${this.prefix}-animate-slide-duration`, thisTarget.getAttribute('data-animate-slide-duration') + 's');
    }
    if (thisTarget.hasAttribute('data-animate-slide-offset')) {
      target.style.setProperty(`--${this.prefix}-animate-slide-offset`, thisTarget.getAttribute('data-animate-slide-offset'));
    }
    /* Zoom */
    if (thisTarget.hasAttribute('data-animate-zoom-start')) {
      target.style.setProperty(`--${this.prefix}-animate-zoom-start`, thisTarget.getAttribute('data-animate-zoom-start'));
    }
    if (thisTarget.hasAttribute('data-animate-zoom-end')) {
      target.style.setProperty(`--${this.prefix}-animate-zoom-end`, thisTarget.getAttribute('data-animate-zoom-end'));
    }

    // After setting attributes, call the callback if it exists
    if (callback && typeof callback === 'function') {
      callback();
    }
  }

  init() {
    const myBlocks = document.querySelectorAll('[data-animate]');

    if (myBlocks) {
      this.gsap.utils.toArray(myBlocks).forEach((target) => {

        const isRepeatableString = target.getAttribute('data-animate-repeat');
        const isRepeatable = (isRepeatableString === 'true');

        this.setAnimateAttributes(target);

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

    const batches = document.querySelectorAll('[data-animate-batch]'); // TODO: by default has opacity: 0;
    if ( batches ) {
      batches.forEach((batch) => {
        const targets = batch.querySelectorAll(batch.dataset.animateBatch);
        const effect = batch.dataset.animateEffect;
        const inView = this.inViewClass;
        const outView = this.outViewClass;
        let animateDelay = 0;
        let isRepeatable = false;

        if (targets) {
          targets.forEach((target, index) => {
            target.setAttribute('data-animate', effect);

            const isRepeatableString = batch.getAttribute('data-animate-repeat');
            isRepeatable = (isRepeatableString === 'true');

            animateDelay = batch.getAttribute('data-animate-delay');

            this.setAnimateAttributes(target, batch, () => {
              if (index === targets.length - 1) {
                batch.classList.add('is-ready');
              }
            });
          })

          this.ScrollTrigger.batch(targets, {
            onEnter: (elements) => {
              this.gsap.to(elements, {
                stagger: {
                  each: animateDelay,
                  onComplete() {
                    this.targets()[0].classList.add(inView); // <= the current target
                  }
                }
              })
            },
            onEnterBack: (elements) => {
              this.gsap.to(elements, {
                stagger: {
                  each: animateDelay,
                  onComplete() {
                    this.targets()[0].classList.add(inView);
                    this.targets()[0].classList.remove(outView);
                  }
                }
              })
            },
            onLeave: (elements) => {
              if (isRepeatable == true) {
                this.gsap.to(elements, {
                  stagger: {
                    each: animateDelay,
                    onComplete() {
                      this.targets()[0].classList.add(outView);
                    }
                  }
                })
              }
            },
            onLeaveBack: (elements) => {
              if (isRepeatable) {
                this.gsap.to(elements, {
                  stagger: {
                    each: animateDelay,
                    onComplete() {
                      this.targets()[0].classList.remove(inView);
                    }
                  }
                })
              }
            },
          });
        }
        // TODO: Here add class to parent 'is-ready' opacity: 1;
        // batch.classList.add('is-ready');
      });
    }
  }
}