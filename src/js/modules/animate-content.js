import { defaults } from '../options';

export default class AnimateContent {

  constructor(options = {}, gsap, ScrollTrigger) {
    this.options = options;
    Object.assign(this, defaults, options);
    this.gsap = gsap;
    this.ScrollTrigger = ScrollTrigger;
    this.mm = gsap.matchMedia();

    this._isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
    // Resolve wrapper lazily for SSR safety
    this.wrapper = this._isBrowser
      ? (options.wrapper ? document.querySelector(options.wrapper) : document)
      : null;

    this.prefix = options.prefix ? options.prefix : defaults.prefix;

    this.init();
  }

  async setAnimateAttributes(target, parent = null) {
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
    if (thisTarget.hasAttribute('data-animate-reveal-translate-y')) {
      target.style.setProperty(`--${this.prefix}-animate-reveal-translate-y`, thisTarget.getAttribute('data-animate-reveal-translate-y'));
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
  }

  init() {
  if (!this._isBrowser || !this.wrapper) return;
  const myBlocks = this.wrapper.querySelectorAll('[data-animate]');

    if (myBlocks) {
      this.gsap.utils.toArray(myBlocks).forEach((target) => {

        const isRepeatableString = target.getAttribute('data-animate-repeat');
        const isRepeatable = (isRepeatableString === 'true');

        let animateStart = target.dataset.animateStart ? target.dataset.animateStart : this.animateStart;

        this.mm.add("(max-width: 767.98px)", () => {
          animateStart = target.getAttribute('data-animate-mobile-start') ? target.getAttribute('data-animate-mobile-start') : this.animateMobileStart;
        });

        this.setAnimateAttributes(target);

        this.ScrollTrigger.create({
          trigger: target.dataset.animateTrigger ? target.dataset.animateTrigger : target,
          start: animateStart,
          end: target.dataset.animateEnd ? target.dataset.animateEnd : this.animateEnd,
          markers: target.dataset.showMarkers ? target.dataset.showMarkers : this.animateMarkers,
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

  const batches = this.wrapper.querySelectorAll('[data-animate-batch]');
    if ( batches ) {
      for (const batch of batches) {
        const targets = batch.querySelectorAll(batch.dataset.animateBatch);
        const effect = batch.dataset.animateEffect;
        const inView = this.inViewClass;
        const outView = this.outViewClass;
        let animateStart = batch.dataset.animateStart ? batch.dataset.animateStart : this.animateStart
        let animateDelay = batch.getAttribute('data-animate-delay') ? batch.getAttribute('data-animate-delay'): 0;
        let isRepeatable = false;

        if (targets) {
          for (const target of targets) {
            target.setAttribute('data-animate', effect);

            if (batch.dataset.animateEasing) {
              target.setAttribute('data-animate-easing', batch.dataset.animateEasing);
            }
            if (batch.dataset.animateDuration) {
              target.setAttribute('data-animate-duration', batch.dataset.animateDuration);
            }
            if (batch.dataset.animateStart) {
              target.setAttribute('data-animate-start', batch.dataset.animateStart);
            }
            if (batch.dataset.animateEnd) {
              target.setAttribute('data-animate-end', batch.dataset.animateEnd);
            }

            /* Opacity */
            if (batch.dataset.animateOpacityDuration) {
              target.setAttribute('data-animate-opacity-duration', batch.dataset.animateOpacityDuration);
            }
            if (batch.dataset.animateOpacityStart) {
              target.setAttribute('data-animate-opacity-start', batch.dataset.animateOpacityStart);
            }
            if (batch.dataset.animateOpacityEnd) {
              target.setAttribute('data-animate-opacity-end', batch.dataset.animateOpacityEnd);
            }

            /* Reveal */
            if (batch.dataset.animateBorderRadius) {
              target.setAttribute('data-animate-border-radius', batch.dataset.animateBorderRadius);
            }
            if (batch.dataset.animateBackground) {
              target.setAttribute('data-animate-background', batch.dataset.animateBackground);
            }
            if (batch.dataset.animateForeground) {
              target.setAttribute('data-animate-foreground', batch.dataset.animateForeground);
            }
            if (batch.dataset.animateRevealDelay) {
              target.setAttribute('data-animate-reveal-delay', batch.dataset.animateRevealDelay);
            }
            if (batch.dataset.animateRevealDuration) {
              target.setAttribute('data-animate-reveal-duration', batch.dataset.animateRevealDuration);
            }
            if (batch.dataset.animateRevealTranslateY) {
              target.setAttribute('data-animate-reveal-translate-y', batch.dataset.animateRevealTranslateY);
            }

            /* Slide */
            if (batch.dataset.animateSlideDuration) {
              target.setAttribute('data-animate-slide-duration', batch.dataset.animateSlideDuration);
            }
            if (batch.dataset.animateSlideOffset) {
              target.setAttribute('data-animate-slide-offset', batch.dataset.animateSlideOffset);
            }

            /* Zoom */
            if (batch.dataset.animateZoomStart) {
              target.setAttribute('data-animate-zoom-start', batch.dataset.animateZoomStart);
            }
            if (batch.dataset.animateZoomEnd) {
              target.setAttribute('data-animate-zoom-end', batch.dataset.animateZoomEnd);
            }


            const isRepeatableString = batch.getAttribute('data-animate-repeat');
            isRepeatable = (isRepeatableString === 'true');

            this.mm.add("(max-width: 767.98px)", () => {
              animateDelay = batch.getAttribute('data-animate-mobile-delay') ? batch.getAttribute('data-animate-mobile-delay') : animateDelay;
              animateStart = batch.getAttribute('data-animate-mobile-start') ? batch.getAttribute('data-animate-mobile-start') : this.animateMobileStart;
            });

            this.setAnimateAttributes(target);
          }

          this.ScrollTrigger.batch(targets, {
            start: animateStart,
            end: batch.dataset.animateEnd ? batch.dataset.animateEnd : this.animateEnd,
            markers: batch.dataset.showMarkers ? batch.dataset.showMarkers : this.animateMarkers,
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
        batch.classList.add('is-ready');
      };
    }
  }
}