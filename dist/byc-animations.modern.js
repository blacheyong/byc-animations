import b from "lenis";
import { gsap as p } from "gsap";
import { ScrollTrigger as u } from "gsap/ScrollTrigger";
const y = {
  prefix: "byc",
  wrapper: null,
  // Defer DOM resolution to runtime to be SSR-safe
  // Animate Content
  animateStart: "top 94%",
  animateMobileStart: "top bottom",
  animateEnd: "",
  animateMarkers: !1,
  inViewClass: "in-view",
  outViewClass: "out-view",
  // Parallax
  parallaxStart: "top bottom",
  parallaxEnd: "",
  parallaxMarkers: !1,
  parallaxScrub: !0,
  // Smooth Scroll
  smoothScroll: !0,
  smoothTouch: !1,
  smoothWheel: !0,
  scrollCallback: null,
  // todo: testing
  scrollContent: null,
  // Defer DOM resolution to runtime to be SSR-safe
  scrollOrientation: "vertical",
  // todo: testing
  scrollGestureOrientation: "vertical",
  // todo: testing
  scrollDuration: 1.2,
  scrollEasing: (f) => Math.min(1, 1.001 - Math.pow(2, -10 * f)),
  scrollInfinite: !1,
  scrollLerp: 0.1,
  scrollNormalizeWheel: !0,
  scrollTouchMultiplier: 2,
  scrollWheelMultiplier: 1,
  scrollWrapper: null
  // Defer DOM resolution to runtime to be SSR-safe
};
class g {
  constructor(e = {}, a) {
    Object.assign(this, y, e), this.Lenis = a, this._rafId = null, this._running = !1, this._isBrowser = typeof window < "u" && typeof document < "u", this._onVisibilityChange = null, this.init();
  }
  init() {
    if (!this._isBrowser) return;
    const e = this.scrollContent || document.documentElement, a = this.scrollWrapper || window;
    window.lenis = new this.Lenis({
      content: e,
      duration: this.scrollDuration,
      easing: this.scrollEasing,
      infinite: this.scrollInfinite,
      lerp: this.scrollLerp,
      orientation: this.scrollOrientation,
      gestureOrientation: this.scrollGestureOrientation,
      normalizeWheel: this.scrollNormalizeWheel,
      smoothTouch: this.smoothTouch,
      smoothWheel: this.smoothWheel,
      touchMultiplier: this.scrollTouchMultiplier,
      wheelMultiplier: this.scrollWheelMultiplier,
      wrapper: a
    }), window.scrollDirection = "down";
    let t = !1;
    const o = (s) => {
      if (typeof this.scrollCallback == "function")
        try {
          this.scrollCallback(s);
        } catch (l) {
          console.warn("scrollCallback error:", l);
        }
    };
    lenis.on("scroll", ({ direction: s, progress: l, scroll: m, limit: d, velocity: c }) => {
      s === 1 ? window.scrollDirection = "down" : window.scrollDirection = "up", t || (t = !0, requestAnimationFrame(() => {
        t = !1, o({ direction: s, progress: l, scroll: m, limit: d, velocity: c });
      }));
    }), this._running = !0;
    const n = (s) => {
      this._running && (window.lenis && typeof window.lenis.raf == "function" && lenis.raf(s), this._rafId = requestAnimationFrame(n));
    };
    this._rafId = requestAnimationFrame(n), this._onVisibilityChange = () => {
      document.hidden ? (this._running = !1, this._rafId && (cancelAnimationFrame(this._rafId), this._rafId = null), window.lenis && typeof window.lenis.stop == "function" && window.lenis.stop()) : window.lenis && typeof window.lenis.start == "function" && typeof window.lenis.raf == "function" && (window.lenis.start(), this._running || (this._running = !0, this._rafId = requestAnimationFrame(n)));
    }, document.addEventListener("visibilitychange", this._onVisibilityChange);
  }
  destroy() {
    if (this._isBrowser) {
      this._running = !1, this._rafId && (cancelAnimationFrame(this._rafId), this._rafId = null), this._onVisibilityChange && (document.removeEventListener("visibilitychange", this._onVisibilityChange), this._onVisibilityChange = null), window.lenis && typeof window.lenis.destroy == "function" && window.lenis.destroy();
      try {
        const e = document.documentElement, a = document.body;
        ["lenis", "lenis-smooth", "lenis-stopped"].forEach((t) => {
          e && e.classList && e.classList.remove(t), a && a.classList && a.classList.remove(t);
        });
      } catch {
      }
      try {
        delete window.lenis;
      } catch {
        window.lenis = void 0;
      }
    }
  }
}
class A {
  constructor(e = {}, a, t) {
    this.options = e, Object.assign(this, y, e), this.gsap = a, this.ScrollTrigger = t, this.mm = a.matchMedia(), this._isBrowser = typeof window < "u" && typeof document < "u", this._isBrowser ? e.wrapper instanceof Element ? this.wrapper = e.wrapper : typeof e.wrapper == "string" ? this.wrapper = document.querySelector(e.wrapper) || document : this.wrapper = document : this.wrapper = null, this.prefix = e.prefix ? e.prefix : y.prefix, this.init();
  }
  async setAnimateAttributes(e, a = null) {
    let t = e;
    a && (t = a), t.hasAttribute("data-animate-easing") && e.style.setProperty(`--${this.prefix}-animate-easing`, t.getAttribute("data-animate-easing")), t.hasAttribute("data-animate-duration") && e.style.setProperty(`--${this.prefix}-animate-duration`, t.getAttribute("data-animate-duration") + "s"), t.hasAttribute("data-animate-delay") && e.style.setProperty(`--${this.prefix}-animate-delay`, t.getAttribute("data-animate-delay") + "s"), t.hasAttribute("data-animate-delay-mobile") && e.style.setProperty(`--${this.prefix}-animate-delay-mobile`, t.getAttribute("data-animate-delay-mobile")), t.hasAttribute("data-animate-opacity-duration") && e.style.setProperty(`--${this.prefix}-animate-opacity-duration`, t.getAttribute("data-animate-opacity-duration") + "s"), t.hasAttribute("data-animate-opacity-start") && e.style.setProperty(`--${this.prefix}-animate-opacity-start`, t.getAttribute("data-animate-opacity-start")), t.hasAttribute("data-animate-opacity-end") && e.style.setProperty(`--${this.prefix}-animate-opacity-end`, t.getAttribute("data-animate-opacity-end")), t.hasAttribute("data-animate-border-radius") && e.style.setProperty(`--${this.prefix}-animate-border-radius`, t.getAttribute("data-animate-border-radius")), t.hasAttribute("data-animate-background") && e.style.setProperty(`--${this.prefix}-animate-background-color`, t.getAttribute("data-animate-background")), t.hasAttribute("data-animate-foreground") && e.style.setProperty(`--${this.prefix}-animate-foreground-color`, t.getAttribute("data-animate-foreground")), t.hasAttribute("data-animate-reveal-delay") && e.style.setProperty(`--${this.prefix}-animate-reveal-delay-extra`, t.getAttribute("data-animate-reveal-delay") + "s"), t.hasAttribute("data-animate-reveal-duration") && e.style.setProperty(`--${this.prefix}-animate-reveal-duration`, t.getAttribute("data-animate-reveal-duration") + "s"), t.hasAttribute("data-animate-reveal-translate-y") && e.style.setProperty(`--${this.prefix}-animate-reveal-translate-y`, t.getAttribute("data-animate-reveal-translate-y")), t.hasAttribute("data-animate-slide-duration") && e.style.setProperty(`--${this.prefix}-animate-slide-duration`, t.getAttribute("data-animate-slide-duration") + "s"), t.hasAttribute("data-animate-slide-offset") && e.style.setProperty(`--${this.prefix}-animate-slide-offset`, t.getAttribute("data-animate-slide-offset")), t.hasAttribute("data-animate-zoom-start") && e.style.setProperty(`--${this.prefix}-animate-zoom-start`, t.getAttribute("data-animate-zoom-start")), t.hasAttribute("data-animate-zoom-end") && e.style.setProperty(`--${this.prefix}-animate-zoom-end`, t.getAttribute("data-animate-zoom-end"));
  }
  init() {
    if (!this._isBrowser || !this.wrapper) return;
    const e = this.wrapper.querySelectorAll("[data-animate]");
    e && this.gsap.utils.toArray(e).forEach((t) => {
      const n = t.getAttribute("data-animate-repeat") === "true";
      let s = t.dataset.animateStart ? t.dataset.animateStart : this.animateStart;
      this.mm.add("(max-width: 767.98px)", () => {
        s = t.getAttribute("data-animate-mobile-start") ? t.getAttribute("data-animate-mobile-start") : this.animateMobileStart;
      }), this.setAnimateAttributes(t), this.ScrollTrigger.create({
        trigger: t.dataset.animateTrigger ? t.dataset.animateTrigger : t,
        start: s,
        end: t.dataset.animateEnd ? t.dataset.animateEnd : this.animateEnd,
        markers: t.dataset.showMarkers ? t.dataset.showMarkers : this.animateMarkers,
        onEnter: () => {
          t.classList.add(this.inViewClass);
        },
        onEnterBack: () => {
          t.classList.add(this.inViewClass), t.classList.remove(this.outViewClass);
        },
        onLeave: () => {
          n == !0 && t.classList.add(this.outViewClass);
        },
        onLeaveBack: () => {
          n && t.classList.remove(this.inViewClass);
        },
        once: !n
      });
    });
    const a = this.wrapper.querySelectorAll("[data-animate-batch]");
    if (a)
      for (const t of a) {
        const o = t.querySelectorAll(t.dataset.animateBatch), n = t.dataset.animateEffect, s = this.inViewClass, l = this.outViewClass;
        let m = t.dataset.animateStart ? t.dataset.animateStart : this.animateStart, d = t.getAttribute("data-animate-delay") ? t.getAttribute("data-animate-delay") : 0, c = !1;
        if (o) {
          for (const i of o)
            i.setAttribute("data-animate", n), t.dataset.animateEasing && i.setAttribute("data-animate-easing", t.dataset.animateEasing), t.dataset.animateDuration && i.setAttribute("data-animate-duration", t.dataset.animateDuration), t.dataset.animateStart && i.setAttribute("data-animate-start", t.dataset.animateStart), t.dataset.animateEnd && i.setAttribute("data-animate-end", t.dataset.animateEnd), t.dataset.animateOpacityDuration && i.setAttribute("data-animate-opacity-duration", t.dataset.animateOpacityDuration), t.dataset.animateOpacityStart && i.setAttribute("data-animate-opacity-start", t.dataset.animateOpacityStart), t.dataset.animateOpacityEnd && i.setAttribute("data-animate-opacity-end", t.dataset.animateOpacityEnd), t.dataset.animateBorderRadius && i.setAttribute("data-animate-border-radius", t.dataset.animateBorderRadius), t.dataset.animateBackground && i.setAttribute("data-animate-background", t.dataset.animateBackground), t.dataset.animateForeground && i.setAttribute("data-animate-foreground", t.dataset.animateForeground), t.dataset.animateRevealDelay && i.setAttribute("data-animate-reveal-delay", t.dataset.animateRevealDelay), t.dataset.animateRevealDuration && i.setAttribute("data-animate-reveal-duration", t.dataset.animateRevealDuration), t.dataset.animateRevealTranslateY && i.setAttribute("data-animate-reveal-translate-y", t.dataset.animateRevealTranslateY), t.dataset.animateSlideDuration && i.setAttribute("data-animate-slide-duration", t.dataset.animateSlideDuration), t.dataset.animateSlideOffset && i.setAttribute("data-animate-slide-offset", t.dataset.animateSlideOffset), t.dataset.animateZoomStart && i.setAttribute("data-animate-zoom-start", t.dataset.animateZoomStart), t.dataset.animateZoomEnd && i.setAttribute("data-animate-zoom-end", t.dataset.animateZoomEnd), c = t.getAttribute("data-animate-repeat") === "true", this.mm.add("(max-width: 767.98px)", () => {
              d = t.getAttribute("data-animate-mobile-delay") ? t.getAttribute("data-animate-mobile-delay") : d, m = t.getAttribute("data-animate-mobile-start") ? t.getAttribute("data-animate-mobile-start") : this.animateMobileStart;
            }), this.setAnimateAttributes(i);
          this.ScrollTrigger.batch(o, {
            start: m,
            end: t.dataset.animateEnd ? t.dataset.animateEnd : this.animateEnd,
            markers: t.dataset.showMarkers ? t.dataset.showMarkers : this.animateMarkers,
            onEnter: (i) => {
              this.gsap.to(i, {
                stagger: {
                  each: d,
                  onComplete() {
                    this.targets()[0].classList.add(s);
                  }
                }
              });
            },
            onEnterBack: (i) => {
              this.gsap.to(i, {
                stagger: {
                  each: d,
                  onComplete() {
                    this.targets()[0].classList.add(s), this.targets()[0].classList.remove(l);
                  }
                }
              });
            },
            onLeave: (i) => {
              c == !0 && this.gsap.to(i, {
                stagger: {
                  each: d,
                  onComplete() {
                    this.targets()[0].classList.add(l);
                  }
                }
              });
            },
            onLeaveBack: (i) => {
              c && this.gsap.to(i, {
                stagger: {
                  each: d,
                  onComplete() {
                    this.targets()[0].classList.remove(s);
                  }
                }
              });
            }
          });
        }
        t.classList.add("is-ready");
      }
  }
}
class S {
  constructor(e = {}, a, t) {
    Object.assign(this, y, e), this.gsap = a, this.ScrollTrigger = t, this._isBrowser = typeof window < "u" && typeof document < "u", this._isBrowser ? e.wrapper instanceof Element ? this.wrapper = e.wrapper : typeof e.wrapper == "string" ? this.wrapper = document.querySelector(e.wrapper) || document : this.wrapper = document : this.wrapper = null, this.init();
  }
  init() {
    if (!this._isBrowser || !this.wrapper) return;
    const e = this.wrapper.querySelectorAll("[data-parallax-from]");
    this.gsap.utils.toArray(e).forEach((a) => {
      const t = a.getAttribute("data-parallax-to");
      if (t) {
        const o = a.getAttribute("data-parallax-from");
        let n = {}, s = null;
        if (o)
          try {
            n = JSON.parse(o);
          } catch (r) {
            console.warn("byc-animations: invalid JSON in data-parallax-from:", o, a, r), n = {};
          }
        try {
          s = JSON.parse(t);
        } catch (r) {
          console.warn("byc-animations: invalid JSON in data-parallax-to:", t, a, r), s = null;
        }
        if (!s) {
          console.warn("byc-animations: skipping parallax, data-parallax-to is missing or invalid:", a);
          return;
        }
        const l = a.getAttribute("data-parallax-scrub");
        let m = this.parallaxScrub;
        if (l !== null) {
          const r = l.trim();
          if (r === "true" || r === "false")
            m = r === "true";
          else {
            const w = Number(r);
            m = Number.isNaN(w) ? this.parallaxScrub : w;
          }
        }
        const d = this.gsap.fromTo(a, n, s), c = a.dataset.parallaxTrigger, i = c ? this.wrapper.querySelector(c) || c : a;
        let h = this.parallaxMarkers;
        if (Object.prototype.hasOwnProperty.call(a.dataset, "parallaxMarkers")) {
          const r = a.dataset.parallaxMarkers;
          if (r === "" || r === "true")
            h = !0;
          else if (r === "false")
            h = !1;
          else if (r && r.trim().startsWith("{"))
            try {
              h = JSON.parse(r);
            } catch (w) {
              console.warn("byc-animations: invalid JSON in data-parallax-markers:", r, a, w);
            }
          else
            h = !0;
        }
        this.ScrollTrigger.create({
          trigger: i,
          start: a.dataset.parallaxStart ? a.dataset.parallaxStart : this.parallaxStart,
          end: a.dataset.parallaxEnd ? a.dataset.parallaxEnd : this.parallaxEnd,
          scrub: m,
          animation: d,
          markers: h
        });
      } else
        console.warn("byc-animations: Data-parallax-to value is missing:", a);
    });
  }
}
class E {
  constructor(e = {}) {
    this.options = e, Object.assign(this, y, e), this._isBrowser = typeof window < "u" && typeof document < "u", this._isBrowser && p.registerPlugin(u), this.init();
  }
  init() {
    if (!this._isBrowser) return;
    (typeof window.matchMedia == "function" ? window.matchMedia("(prefers-reduced-motion: no-preference)") : { matches: !0 }).matches && (this.smoothScroll && (this._smooth = new g(this.options, b)), this.initAnimations()), this._onVisibilityChange = () => {
      if (document.hidden) {
        try {
          p.ticker.sleep();
        } catch {
        }
        try {
          u.getAll().forEach((a) => a.disable());
        } catch {
        }
      } else {
        try {
          p.ticker.wake();
        } catch {
        }
        try {
          u.getAll().forEach((a) => a.enable());
        } catch {
        }
        try {
          u.refresh();
        } catch {
        }
      }
    }, document.addEventListener("visibilitychange", this._onVisibilityChange);
  }
  initAnimations() {
    new A(this.options, p, u), new S(this.options, p, u);
  }
  destroy(e = !0, a = !0) {
    this._isBrowser && (this._onVisibilityChange && (document.removeEventListener(
      "visibilitychange",
      this._onVisibilityChange
    ), this._onVisibilityChange = null), e && u.killAll(), a && (this._smooth && typeof this._smooth.destroy == "function" ? this._smooth.destroy() : window.lenis && typeof window.lenis.destroy == "function" && window.lenis.destroy()));
  }
  refresh() {
    this._isBrowser && u.refresh();
  }
  scrollTo(e, a) {
    if (this._isBrowser) {
      if (window.lenis && typeof window.lenis.scrollTo == "function") {
        window.lenis.scrollTo(e, a);
        return;
      }
      try {
        const t = typeof e == "string" ? document.querySelector(e) : e;
        if (t && typeof t.getBoundingClientRect == "function") {
          const o = t.getBoundingClientRect(), n = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, s = a && typeof a.offset == "number" ? a.offset : 0, l = o.top + n + s;
          window.scrollTo({
            top: l,
            behavior: a && a.behavior || "smooth"
          });
        }
      } catch {
      }
    }
  }
  start() {
    this._isBrowser && window.lenis && typeof window.lenis.start == "function" && window.lenis.start();
  }
  stop() {
    this._isBrowser && window.lenis && typeof window.lenis.stop == "function" && window.lenis.stop();
  }
}
export {
  E as default
};
//# sourceMappingURL=byc-animations.modern.js.map
