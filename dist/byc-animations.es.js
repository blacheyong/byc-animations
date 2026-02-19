import b from "lenis";
import { gsap as p } from "gsap";
import { ScrollTrigger as m } from "gsap/ScrollTrigger";
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
  syncTouch: void 0,
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
  constructor(a = {}, e) {
    Object.assign(this, y, a), this.Lenis = e, this._rafId = null, this._running = !1, this._isBrowser = typeof window < "u" && typeof document < "u", this._onVisibilityChange = null, this.init();
  }
  init() {
    if (!this._isBrowser) return;
    const a = this.scrollContent || document.documentElement, e = this.scrollWrapper || window;
    window.lenis = new this.Lenis({
      content: a,
      duration: this.scrollDuration,
      easing: this.scrollEasing,
      infinite: this.scrollInfinite,
      lerp: this.scrollLerp,
      orientation: this.scrollOrientation,
      gestureOrientation: this.scrollGestureOrientation,
      normalizeWheel: this.scrollNormalizeWheel,
      // Lenis v1 uses `syncTouch`; keep backward compatibility with existing `smoothTouch` option.
      syncTouch: typeof this.syncTouch == "boolean" ? this.syncTouch : this.smoothTouch,
      smoothWheel: this.smoothWheel,
      touchMultiplier: this.scrollTouchMultiplier,
      wheelMultiplier: this.scrollWheelMultiplier,
      wrapper: e
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
    lenis.on("scroll", ({ direction: s, progress: l, scroll: c, limit: d, velocity: u }) => {
      s === 1 ? window.scrollDirection = "down" : window.scrollDirection = "up", t || (t = !0, requestAnimationFrame(() => {
        t = !1, o({ direction: s, progress: l, scroll: c, limit: d, velocity: u });
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
      this._running = !1, this._rafId && (cancelAnimationFrame(this._rafId), this._rafId = null), this._onVisibilityChange && (document.removeEventListener(
        "visibilitychange",
        this._onVisibilityChange
      ), this._onVisibilityChange = null), window.lenis && typeof window.lenis.destroy == "function" && window.lenis.destroy();
      try {
        const a = document.documentElement, e = document.body;
        ["lenis", "lenis-smooth", "lenis-stopped"].forEach((t) => {
          a && a.classList && a.classList.remove(t), e && e.classList && e.classList.remove(t);
        });
      } catch {
        console.error("Error removing Lenis CSS classes");
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
  constructor(a = {}, e, t) {
    this.options = a, Object.assign(this, y, a), this.gsap = e, this.ScrollTrigger = t, this.mm = e.matchMedia(), this._isBrowser = typeof window < "u" && typeof document < "u", this._isBrowser ? a.wrapper instanceof Element ? this.wrapper = a.wrapper : typeof a.wrapper == "string" ? this.wrapper = document.querySelector(a.wrapper) || document : this.wrapper = document : this.wrapper = null, this.prefix = a.prefix ? a.prefix : y.prefix, this.init();
  }
  async setAnimateAttributes(a, e = null) {
    let t = a;
    e && (t = e), t.hasAttribute("data-animate-easing") && a.style.setProperty(`--${this.prefix}-animate-easing`, t.getAttribute("data-animate-easing")), t.hasAttribute("data-animate-duration") && a.style.setProperty(`--${this.prefix}-animate-duration`, t.getAttribute("data-animate-duration") + "s"), t.hasAttribute("data-animate-delay") && a.style.setProperty(`--${this.prefix}-animate-delay`, t.getAttribute("data-animate-delay") + "s"), t.hasAttribute("data-animate-delay-mobile") && a.style.setProperty(`--${this.prefix}-animate-delay-mobile`, t.getAttribute("data-animate-delay-mobile")), t.hasAttribute("data-animate-opacity-duration") && a.style.setProperty(`--${this.prefix}-animate-opacity-duration`, t.getAttribute("data-animate-opacity-duration") + "s"), t.hasAttribute("data-animate-opacity-start") && a.style.setProperty(`--${this.prefix}-animate-opacity-start`, t.getAttribute("data-animate-opacity-start")), t.hasAttribute("data-animate-opacity-end") && a.style.setProperty(`--${this.prefix}-animate-opacity-end`, t.getAttribute("data-animate-opacity-end")), t.hasAttribute("data-animate-border-radius") && a.style.setProperty(`--${this.prefix}-animate-border-radius`, t.getAttribute("data-animate-border-radius")), t.hasAttribute("data-animate-background") && a.style.setProperty(`--${this.prefix}-animate-background-color`, t.getAttribute("data-animate-background")), t.hasAttribute("data-animate-foreground") && a.style.setProperty(`--${this.prefix}-animate-foreground-color`, t.getAttribute("data-animate-foreground")), t.hasAttribute("data-animate-reveal-delay") && a.style.setProperty(`--${this.prefix}-animate-reveal-delay-extra`, t.getAttribute("data-animate-reveal-delay") + "s"), t.hasAttribute("data-animate-reveal-duration") && a.style.setProperty(`--${this.prefix}-animate-reveal-duration`, t.getAttribute("data-animate-reveal-duration") + "s"), t.hasAttribute("data-animate-reveal-translate-y") && a.style.setProperty(`--${this.prefix}-animate-reveal-translate-y`, t.getAttribute("data-animate-reveal-translate-y")), t.hasAttribute("data-animate-slide-duration") && a.style.setProperty(`--${this.prefix}-animate-slide-duration`, t.getAttribute("data-animate-slide-duration") + "s"), t.hasAttribute("data-animate-slide-offset") && a.style.setProperty(`--${this.prefix}-animate-slide-offset`, t.getAttribute("data-animate-slide-offset")), t.hasAttribute("data-animate-zoom-start") && a.style.setProperty(`--${this.prefix}-animate-zoom-start`, t.getAttribute("data-animate-zoom-start")), t.hasAttribute("data-animate-zoom-end") && a.style.setProperty(`--${this.prefix}-animate-zoom-end`, t.getAttribute("data-animate-zoom-end"));
  }
  init() {
    if (!this._isBrowser || !this.wrapper) return;
    const a = this.wrapper.querySelectorAll("[data-animate]");
    a && this.gsap.utils.toArray(a).forEach((t) => {
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
    const e = this.wrapper.querySelectorAll("[data-animate-batch]");
    if (e)
      for (const t of e) {
        const o = t.querySelectorAll(t.dataset.animateBatch), n = t.dataset.animateEffect, s = this.inViewClass, l = this.outViewClass;
        let c = t.dataset.animateStart ? t.dataset.animateStart : this.animateStart, d = t.getAttribute("data-animate-delay") ? t.getAttribute("data-animate-delay") : 0, u = !1;
        if (o) {
          for (const i of o)
            i.setAttribute("data-animate", n), t.dataset.animateEasing && i.setAttribute("data-animate-easing", t.dataset.animateEasing), t.dataset.animateDuration && i.setAttribute("data-animate-duration", t.dataset.animateDuration), t.dataset.animateStart && i.setAttribute("data-animate-start", t.dataset.animateStart), t.dataset.animateEnd && i.setAttribute("data-animate-end", t.dataset.animateEnd), t.dataset.animateOpacityDuration && i.setAttribute("data-animate-opacity-duration", t.dataset.animateOpacityDuration), t.dataset.animateOpacityStart && i.setAttribute("data-animate-opacity-start", t.dataset.animateOpacityStart), t.dataset.animateOpacityEnd && i.setAttribute("data-animate-opacity-end", t.dataset.animateOpacityEnd), t.dataset.animateBorderRadius && i.setAttribute("data-animate-border-radius", t.dataset.animateBorderRadius), t.dataset.animateBackground && i.setAttribute("data-animate-background", t.dataset.animateBackground), t.dataset.animateForeground && i.setAttribute("data-animate-foreground", t.dataset.animateForeground), t.dataset.animateRevealDelay && i.setAttribute("data-animate-reveal-delay", t.dataset.animateRevealDelay), t.dataset.animateRevealDuration && i.setAttribute("data-animate-reveal-duration", t.dataset.animateRevealDuration), t.dataset.animateRevealTranslateY && i.setAttribute("data-animate-reveal-translate-y", t.dataset.animateRevealTranslateY), t.dataset.animateSlideDuration && i.setAttribute("data-animate-slide-duration", t.dataset.animateSlideDuration), t.dataset.animateSlideOffset && i.setAttribute("data-animate-slide-offset", t.dataset.animateSlideOffset), t.dataset.animateZoomStart && i.setAttribute("data-animate-zoom-start", t.dataset.animateZoomStart), t.dataset.animateZoomEnd && i.setAttribute("data-animate-zoom-end", t.dataset.animateZoomEnd), u = t.getAttribute("data-animate-repeat") === "true", this.mm.add("(max-width: 767.98px)", () => {
              d = t.getAttribute("data-animate-mobile-delay") ? t.getAttribute("data-animate-mobile-delay") : d, c = t.getAttribute("data-animate-mobile-start") ? t.getAttribute("data-animate-mobile-start") : this.animateMobileStart;
            }), this.setAnimateAttributes(i);
          this.ScrollTrigger.batch(o, {
            start: c,
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
              u == !0 && this.gsap.to(i, {
                stagger: {
                  each: d,
                  onComplete() {
                    this.targets()[0].classList.add(l);
                  }
                }
              });
            },
            onLeaveBack: (i) => {
              u && this.gsap.to(i, {
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
  constructor(a = {}, e, t) {
    Object.assign(this, y, a), this.gsap = e, this.ScrollTrigger = t, this._isBrowser = typeof window < "u" && typeof document < "u", this._isBrowser ? a.wrapper instanceof Element ? this.wrapper = a.wrapper : typeof a.wrapper == "string" ? this.wrapper = document.querySelector(a.wrapper) || document : this.wrapper = document : this.wrapper = null, this.init();
  }
  init() {
    if (!this._isBrowser || !this.wrapper) return;
    const a = this.wrapper.querySelectorAll("[data-parallax-from]");
    this.gsap.utils.toArray(a).forEach((e) => {
      const t = e.getAttribute("data-parallax-to");
      if (t) {
        const o = e.getAttribute("data-parallax-from");
        let n = {}, s = null;
        if (o)
          try {
            n = JSON.parse(o);
          } catch (r) {
            console.warn("byc-animations: invalid JSON in data-parallax-from:", o, e, r), n = {};
          }
        try {
          s = JSON.parse(t);
        } catch (r) {
          console.warn("byc-animations: invalid JSON in data-parallax-to:", t, e, r), s = null;
        }
        if (!s) {
          console.warn("byc-animations: skipping parallax, data-parallax-to is missing or invalid:", e);
          return;
        }
        const l = e.getAttribute("data-parallax-scrub");
        let c = this.parallaxScrub;
        if (l !== null) {
          const r = l.trim();
          if (r === "")
            c = this.parallaxScrub;
          else if (r === "true" || r === "false")
            c = r === "true";
          else {
            const w = Number(r);
            c = Number.isNaN(w) ? this.parallaxScrub : w;
          }
        }
        const d = this.gsap.fromTo(e, n, s), u = e.dataset.parallaxTrigger, i = u ? this.wrapper.querySelector(u) || u : e;
        let h = this.parallaxMarkers;
        if (Object.prototype.hasOwnProperty.call(e.dataset, "parallaxMarkers")) {
          const r = e.dataset.parallaxMarkers;
          if (r === "" || r === "true")
            h = !0;
          else if (r === "false")
            h = !1;
          else if (r && r.trim().startsWith("{"))
            try {
              h = JSON.parse(r);
            } catch (w) {
              console.warn("byc-animations: invalid JSON in data-parallax-markers:", r, e, w);
            }
          else
            h = !0;
        }
        this.ScrollTrigger.create({
          trigger: i,
          start: e.dataset.parallaxStart ? e.dataset.parallaxStart : this.parallaxStart,
          end: e.dataset.parallaxEnd ? e.dataset.parallaxEnd : this.parallaxEnd,
          scrub: c,
          animation: d,
          markers: h
        });
      } else
        console.warn("byc-animations: Data-parallax-to value is missing:", e);
    });
  }
}
class E {
  constructor(a = {}) {
    this.options = a, Object.assign(this, y, a), this._isBrowser = typeof window < "u" && typeof document < "u", this._isBrowser && p.registerPlugin(m), this.init();
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
          m.getAll().forEach((e) => e.disable());
        } catch {
        }
      } else {
        try {
          p.ticker.wake();
        } catch {
        }
        try {
          m.getAll().forEach((e) => e.enable());
        } catch {
        }
        try {
          m.refresh();
        } catch {
        }
      }
    }, document.addEventListener("visibilitychange", this._onVisibilityChange);
  }
  initAnimations() {
    new A(this.options, p, m), new S(this.options, p, m);
  }
  destroy(a = !0, e = !0) {
    this._isBrowser && (this._onVisibilityChange && (document.removeEventListener(
      "visibilitychange",
      this._onVisibilityChange
    ), this._onVisibilityChange = null), a && m.killAll(), e && (this._smooth && typeof this._smooth.destroy == "function" ? this._smooth.destroy() : window.lenis && typeof window.lenis.destroy == "function" && window.lenis.destroy()));
  }
  refresh() {
    this._isBrowser && m.refresh();
  }
  scrollTo(a, e) {
    if (this._isBrowser) {
      if (window.lenis && typeof window.lenis.scrollTo == "function") {
        window.lenis.scrollTo(a, e);
        return;
      }
      try {
        const t = typeof a == "string" ? document.querySelector(a) : a;
        if (t && typeof t.getBoundingClientRect == "function") {
          const o = t.getBoundingClientRect(), n = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, s = e && typeof e.offset == "number" ? e.offset : 0, l = o.top + n + s;
          window.scrollTo({
            top: l,
            behavior: e && e.behavior || "smooth"
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
//# sourceMappingURL=byc-animations.es.js.map
