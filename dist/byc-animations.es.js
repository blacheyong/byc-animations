function ts() {
  return ts = Object.assign ? Object.assign.bind() : function(a) {
    for (var t = 1; t < arguments.length; t++) {
      var e = arguments[t];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (a[i] = e[i]);
    }
    return a;
  }, ts.apply(this, arguments);
}
function xn(a, t, e) {
  return Math.max(a, Math.min(t, e));
}
class Ja {
  advance(t) {
    var e;
    if (!this.isRunning)
      return;
    let i = !1;
    if (this.lerp)
      this.value = (r = this.value, n = this.to, (1 - (s = 1 - Math.exp(-60 * this.lerp * t))) * r + s * n), Math.round(this.value) === this.to && (this.value = this.to, i = !0);
    else {
      this.currentTime += t;
      const o = xn(0, this.currentTime / this.duration, 1);
      i = o >= 1;
      const l = i ? 1 : this.easing(o);
      this.value = this.from + (this.to - this.from) * l;
    }
    var r, n, s;
    (e = this.onUpdate) == null || e.call(this, this.value, i), i && this.stop();
  }
  stop() {
    this.isRunning = !1;
  }
  fromTo(t, e, { lerp: i = 0.1, duration: r = 1, easing: n = (l) => l, onStart: s, onUpdate: o }) {
    this.from = this.value = t, this.to = e, this.lerp = i, this.duration = r, this.easing = n, this.currentTime = 0, this.isRunning = !0, s == null || s(), this.onUpdate = o;
  }
}
class tl {
  constructor({ wrapper: t, content: e, autoResize: i = !0 } = {}) {
    if (this.resize = () => {
      this.onWrapperResize(), this.onContentResize();
    }, this.onWrapperResize = () => {
      this.wrapper === window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight);
    }, this.onContentResize = () => {
      this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth;
    }, this.wrapper = t, this.content = e, i) {
      const r = function(n, s) {
        let o;
        return function() {
          let l = arguments, u = this;
          clearTimeout(o), o = setTimeout(function() {
            n.apply(u, l);
          }, 250);
        };
      }(this.resize);
      this.wrapper !== window && (this.wrapperResizeObserver = new ResizeObserver(r), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(r), this.contentResizeObserver.observe(this.content);
    }
    this.resize();
  }
  destroy() {
    var t, e;
    (t = this.wrapperResizeObserver) == null || t.disconnect(), (e = this.contentResizeObserver) == null || e.disconnect();
  }
  get limit() {
    return { x: this.scrollWidth - this.width, y: this.scrollHeight - this.height };
  }
}
class Mo {
  constructor() {
    this.events = {};
  }
  emit(t, ...e) {
    let i = this.events[t] || [];
    for (let r = 0, n = i.length; r < n; r++)
      i[r](...e);
  }
  on(t, e) {
    var i;
    return (i = this.events[t]) != null && i.push(e) || (this.events[t] = [e]), () => {
      var r;
      this.events[t] = (r = this.events[t]) == null ? void 0 : r.filter((n) => e !== n);
    };
  }
  off(t, e) {
    var i;
    this.events[t] = (i = this.events[t]) == null ? void 0 : i.filter((r) => e !== r);
  }
  destroy() {
    this.events = {};
  }
}
class el {
  constructor(t, { wheelMultiplier: e = 1, touchMultiplier: i = 2, normalizeWheel: r = !1 }) {
    this.onTouchStart = (n) => {
      const { clientX: s, clientY: o } = n.targetTouches ? n.targetTouches[0] : n;
      this.touchStart.x = s, this.touchStart.y = o, this.lastDelta = { x: 0, y: 0 };
    }, this.onTouchMove = (n) => {
      const { clientX: s, clientY: o } = n.targetTouches ? n.targetTouches[0] : n, l = -(s - this.touchStart.x) * this.touchMultiplier, u = -(o - this.touchStart.y) * this.touchMultiplier;
      this.touchStart.x = s, this.touchStart.y = o, this.lastDelta = { x: l, y: u }, this.emitter.emit("scroll", { deltaX: l, deltaY: u, event: n });
    }, this.onTouchEnd = (n) => {
      this.emitter.emit("scroll", { deltaX: this.lastDelta.x, deltaY: this.lastDelta.y, event: n });
    }, this.onWheel = (n) => {
      let { deltaX: s, deltaY: o } = n;
      this.normalizeWheel && (s = xn(-100, s, 100), o = xn(-100, o, 100)), s *= this.wheelMultiplier, o *= this.wheelMultiplier, this.emitter.emit("scroll", { deltaX: s, deltaY: o, event: n });
    }, this.element = t, this.wheelMultiplier = e, this.touchMultiplier = i, this.normalizeWheel = r, this.touchStart = { x: null, y: null }, this.emitter = new Mo(), this.element.addEventListener("wheel", this.onWheel, { passive: !1 }), this.element.addEventListener("touchstart", this.onTouchStart, { passive: !1 }), this.element.addEventListener("touchmove", this.onTouchMove, { passive: !1 }), this.element.addEventListener("touchend", this.onTouchEnd, { passive: !1 });
  }
  on(t, e) {
    return this.emitter.on(t, e);
  }
  destroy() {
    this.emitter.destroy(), this.element.removeEventListener("wheel", this.onWheel, { passive: !1 }), this.element.removeEventListener("touchstart", this.onTouchStart, { passive: !1 }), this.element.removeEventListener("touchmove", this.onTouchMove, { passive: !1 }), this.element.removeEventListener("touchend", this.onTouchEnd, { passive: !1 });
  }
}
class il {
  constructor({ wrapper: t = window, content: e = document.documentElement, wheelEventsTarget: i = t, smoothWheel: r = !0, smoothTouch: n = !1, syncTouch: s = !1, syncTouchLerp: o = 0.1, __iosNoInertiaSyncTouchLerp: l = 0.4, touchInertiaMultiplier: u = 35, duration: f, easing: _ = (y) => Math.min(1, 1.001 - Math.pow(2, -10 * y)), lerp: c = f && 0.1, infinite: h = !1, orientation: p = "vertical", gestureOrientation: d = "vertical", touchMultiplier: m = 1, wheelMultiplier: v = 1, normalizeWheel: S = !1, autoResize: b = !0 } = {}) {
    this.onVirtualScroll = ({ deltaX: y, deltaY: T, event: k }) => {
      if (k.ctrlKey)
        return;
      const w = k.type.includes("touch"), C = k.type.includes("wheel");
      if (this.options.gestureOrientation === "both" && y === 0 && T === 0 || this.options.gestureOrientation === "vertical" && T === 0 || this.options.gestureOrientation === "horizontal" && y === 0 || w && this.options.gestureOrientation === "vertical" && this.scroll === 0 && !this.options.infinite && T <= 0)
        return;
      let P = k.composedPath();
      if (P = P.slice(0, P.indexOf(this.rootElement)), P.find((W) => {
        var B;
        return (W.hasAttribute == null ? void 0 : W.hasAttribute("data-lenis-prevent")) || w && (W.hasAttribute == null ? void 0 : W.hasAttribute("data-lenis-prevent-touch")) || C && (W.hasAttribute == null ? void 0 : W.hasAttribute("data-lenis-prevent-wheel")) || ((B = W.classList) == null ? void 0 : B.contains("lenis"));
      }))
        return;
      if (this.isStopped || this.isLocked)
        return void k.preventDefault();
      if (this.isSmooth = (this.options.smoothTouch || this.options.syncTouch) && w || this.options.smoothWheel && C, !this.isSmooth)
        return this.isScrolling = !1, void this.animate.stop();
      k.preventDefault();
      let M = T;
      this.options.gestureOrientation === "both" ? M = Math.abs(T) > Math.abs(y) ? T : y : this.options.gestureOrientation === "horizontal" && (M = y);
      const R = w && this.options.syncTouch, E = w && k.type === "touchend" && Math.abs(M) > 1;
      E && (M = this.velocity * this.options.touchInertiaMultiplier), this.scrollTo(this.targetScroll + M, ts({ programmatic: !1 }, R && { lerp: E ? this.syncTouchLerp : this.options.__iosNoInertiaSyncTouchLerp }));
    }, this.onScroll = () => {
      if (!this.isScrolling) {
        const y = this.animatedScroll;
        this.animatedScroll = this.targetScroll = this.actualScroll, this.velocity = 0, this.direction = Math.sign(this.animatedScroll - y), this.emit();
      }
    }, window.lenisVersion = "1.0.25", t !== document.documentElement && t !== document.body || (t = window), this.options = { wrapper: t, content: e, wheelEventsTarget: i, smoothWheel: r, smoothTouch: n, syncTouch: s, syncTouchLerp: o, __iosNoInertiaSyncTouchLerp: l, touchInertiaMultiplier: u, duration: f, easing: _, lerp: c, infinite: h, gestureOrientation: d, orientation: p, touchMultiplier: m, wheelMultiplier: v, normalizeWheel: S, autoResize: b }, this.animate = new Ja(), this.emitter = new Mo(), this.dimensions = new tl({ wrapper: t, content: e, autoResize: b }), this.toggleClass("lenis", !0), this.velocity = 0, this.isStopped = !1, this.isSmooth = r || n, this.isScrolling = !1, this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onScroll, { passive: !1 }), this.virtualScroll = new el(i, { touchMultiplier: m, wheelMultiplier: v, normalizeWheel: S }), this.virtualScroll.on("scroll", this.onVirtualScroll);
  }
  destroy() {
    this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onScroll, { passive: !1 }), this.virtualScroll.destroy(), this.dimensions.destroy(), this.toggleClass("lenis", !1), this.toggleClass("lenis-smooth", !1), this.toggleClass("lenis-scrolling", !1), this.toggleClass("lenis-stopped", !1);
  }
  on(t, e) {
    return this.emitter.on(t, e);
  }
  off(t, e) {
    return this.emitter.off(t, e);
  }
  setScroll(t) {
    this.isHorizontal ? this.rootElement.scrollLeft = t : this.rootElement.scrollTop = t;
  }
  resize() {
    this.dimensions.resize();
  }
  emit() {
    this.emitter.emit("scroll", this);
  }
  reset() {
    this.isLocked = !1, this.isScrolling = !1, this.velocity = 0, this.animate.stop();
  }
  start() {
    this.isStopped = !1, this.reset();
  }
  stop() {
    this.isStopped = !0, this.animate.stop(), this.reset();
  }
  raf(t) {
    const e = t - (this.time || t);
    this.time = t, this.animate.advance(1e-3 * e);
  }
  scrollTo(t, { offset: e = 0, immediate: i = !1, lock: r = !1, duration: n = this.options.duration, easing: s = this.options.easing, lerp: o = !n && this.options.lerp, onComplete: l = null, force: u = !1, programmatic: f = !0 } = {}) {
    if (!this.isStopped || u) {
      if (["top", "left", "start"].includes(t))
        t = 0;
      else if (["bottom", "right", "end"].includes(t))
        t = this.limit;
      else {
        var _;
        let c;
        if (typeof t == "string" ? c = document.querySelector(t) : (_ = t) != null && _.nodeType && (c = t), c) {
          if (this.options.wrapper !== window) {
            const p = this.options.wrapper.getBoundingClientRect();
            e -= this.isHorizontal ? p.left : p.top;
          }
          const h = c.getBoundingClientRect();
          t = (this.isHorizontal ? h.left : h.top) + this.animatedScroll;
        }
      }
      if (typeof t == "number") {
        if (t += e, t = Math.round(t), this.options.infinite ? f && (this.targetScroll = this.animatedScroll = this.scroll) : t = xn(0, t, this.limit), i)
          return this.animatedScroll = this.targetScroll = t, this.setScroll(this.scroll), this.reset(), this.emit(), void (l == null || l(this));
        if (!f) {
          if (t === this.targetScroll)
            return;
          this.targetScroll = t;
        }
        this.animate.fromTo(this.animatedScroll, t, { duration: n, easing: s, lerp: o, onStart: () => {
          r && (this.isLocked = !0), this.isScrolling = !0;
        }, onUpdate: (c, h) => {
          this.isScrolling = !0, this.velocity = c - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = c, this.setScroll(this.scroll), f && (this.targetScroll = c), h || this.emit(), h && requestAnimationFrame(() => {
            this.isScrolling = !1, this.velocity = 0, r && (this.isLocked = !1), this.emit(), l == null || l(this);
          });
        } });
      }
    }
  }
  get rootElement() {
    return this.options.wrapper === window ? this.options.content : this.options.wrapper;
  }
  get limit() {
    return this.dimensions.limit[this.isHorizontal ? "x" : "y"];
  }
  get isHorizontal() {
    return this.options.orientation === "horizontal";
  }
  get actualScroll() {
    return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop;
  }
  get scroll() {
    return this.options.infinite ? (this.animatedScroll % (t = this.limit) + t) % t : this.animatedScroll;
    var t;
  }
  get progress() {
    return this.limit === 0 ? 1 : this.scroll / this.limit;
  }
  get isSmooth() {
    return this.__isSmooth;
  }
  set isSmooth(t) {
    this.__isSmooth !== t && (this.__isSmooth = t, this.toggleClass("lenis-smooth", t));
  }
  get isScrolling() {
    return this.__isScrolling;
  }
  set isScrolling(t) {
    this.__isScrolling !== t && (this.__isScrolling = t, this.toggleClass("lenis-scrolling", t));
  }
  get isStopped() {
    return this.__isStopped;
  }
  set isStopped(t) {
    this.__isStopped !== t && (this.__isStopped = t, this.toggleClass("lenis-stopped", t));
  }
  get className() {
    let t = "lenis";
    return this.isStopped && (t += " lenis-stopped"), this.isScrolling && (t += " lenis-scrolling"), this.isSmooth && (t += " lenis-smooth"), t;
  }
  toggleClass(t, e) {
    this.rootElement.classList.toggle(t, e), this.emitter.emit("className change", this);
  }
}
function je(a) {
  if (a === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return a;
}
function Eo(a, t) {
  a.prototype = Object.create(t.prototype), a.prototype.constructor = a, a.__proto__ = t;
}
/*!
 * GSAP 3.11.5
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var ge = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, or = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, ks, Nt, yt, Te = 1e8, tt = 1 / Te, es = Math.PI * 2, rl = es / 4, nl = 0, Ao = Math.sqrt, sl = Math.cos, ol = Math.sin, Mt = function(t) {
  return typeof t == "string";
}, ht = function(t) {
  return typeof t == "function";
}, ei = function(t) {
  return typeof t == "number";
}, Cs = function(t) {
  return typeof t > "u";
}, He = function(t) {
  return typeof t == "object";
}, ie = function(t) {
  return t !== !1;
}, Os = function() {
  return typeof window < "u";
}, jr = function(t) {
  return ht(t) || Mt(t);
}, Do = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, Yt = Array.isArray, is = /(?:-?\.?\d|\.)+/gi, Ro = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Zi = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Bn = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, zo = /[+-]=-?[.\d]+/, Lo = /[^,'"\[\]\s]+/gi, al = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, at, we, rs, Ms, me = {}, wn = {}, Fo, Io = function(t) {
  return (wn = Ii(t, me)) && se;
}, Es = function(t, e) {
  return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
}, bn = function(t, e) {
  return !e && console.warn(t);
}, Bo = function(t, e) {
  return t && (me[t] = e) && wn && (wn[t] = e) || me;
}, Xr = function() {
  return 0;
}, ll = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, un = {
  suppressEvents: !0,
  kill: !1
}, ul = {
  suppressEvents: !0
}, As = {}, _i = [], ns = {}, No, ce = {}, Nn = {}, js = 30, fn = [], Ds = "", Rs = function(t) {
  var e = t[0], i, r;
  if (He(e) || ht(e) || (t = [t]), !(i = (e._gsap || {}).harness)) {
    for (r = fn.length; r-- && !fn[r].targetTest(e); )
      ;
    i = fn[r];
  }
  for (r = t.length; r--; )
    t[r] && (t[r]._gsap || (t[r]._gsap = new ua(t[r], i))) || t.splice(r, 1);
  return t;
}, Ai = function(t) {
  return t._gsap || Rs(Se(t))[0]._gsap;
}, Yo = function(t, e, i) {
  return (i = t[e]) && ht(i) ? t[e]() : Cs(i) && t.getAttribute && t.getAttribute(e) || i;
}, re = function(t, e) {
  return (t = t.split(",")).forEach(e) || t;
}, pt = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, Dt = function(t) {
  return Math.round(t * 1e7) / 1e7 || 0;
}, er = function(t, e) {
  var i = e.charAt(0), r = parseFloat(e.substr(2));
  return t = parseFloat(t), i === "+" ? t + r : i === "-" ? t - r : i === "*" ? t * r : t / r;
}, fl = function(t, e) {
  for (var i = e.length, r = 0; t.indexOf(e[r]) < 0 && ++r < i; )
    ;
  return r < i;
}, Tn = function() {
  var t = _i.length, e = _i.slice(0), i, r;
  for (ns = {}, _i.length = 0, i = 0; i < t; i++)
    r = e[i], r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0);
}, Xo = function(t, e, i, r) {
  _i.length && !Nt && Tn(), t.render(e, i, r || Nt && e < 0 && (t._initted || t._startAt)), _i.length && !Nt && Tn();
}, Wo = function(t) {
  var e = parseFloat(t);
  return (e || e === 0) && (t + "").match(Lo).length < 2 ? e : Mt(t) ? t.trim() : t;
}, Vo = function(t) {
  return t;
}, Ce = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, hl = function(t) {
  return function(e, i) {
    for (var r in i)
      r in e || r === "duration" && t || r === "ease" || (e[r] = i[r]);
  };
}, Ii = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, Zs = function a(t, e) {
  for (var i in e)
    i !== "__proto__" && i !== "constructor" && i !== "prototype" && (t[i] = He(e[i]) ? a(t[i] || (t[i] = {}), e[i]) : e[i]);
  return t;
}, Sn = function(t, e) {
  var i = {}, r;
  for (r in t)
    r in e || (i[r] = t[r]);
  return i;
}, Er = function(t) {
  var e = t.parent || at, i = t.keyframes ? hl(Yt(t.keyframes)) : Ce;
  if (ie(t.inherit))
    for (; e; )
      i(t, e.vars.defaults), e = e.parent || e._dp;
  return t;
}, cl = function(t, e) {
  for (var i = t.length, r = i === e.length; r && i-- && t[i] === e[i]; )
    ;
  return i < 0;
}, $o = function(t, e, i, r, n) {
  i === void 0 && (i = "_first"), r === void 0 && (r = "_last");
  var s = t[r], o;
  if (n)
    for (o = e[n]; s && s[n] > o; )
      s = s._prev;
  return s ? (e._next = s._next, s._next = e) : (e._next = t[i], t[i] = e), e._next ? e._next._prev = e : t[r] = e, e._prev = s, e.parent = e._dp = t, e;
}, Rn = function(t, e, i, r) {
  i === void 0 && (i = "_first"), r === void 0 && (r = "_last");
  var n = e._prev, s = e._next;
  n ? n._next = s : t[i] === e && (t[i] = s), s ? s._prev = n : t[r] === e && (t[r] = n), e._next = e._prev = e.parent = null;
}, mi = function(t, e) {
  t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove(t), t._act = 0;
}, Di = function(t, e) {
  if (t && (!e || e._end > t._dur || e._start < 0))
    for (var i = t; i; )
      i._dirty = 1, i = i.parent;
  return t;
}, dl = function(t) {
  for (var e = t.parent; e && e.parent; )
    e._dirty = 1, e.totalDuration(), e = e.parent;
  return t;
}, ss = function(t, e, i, r) {
  return t._startAt && (Nt ? t._startAt.revert(un) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, r));
}, _l = function a(t) {
  return !t || t._ts && a(t.parent);
}, Qs = function(t) {
  return t._repeat ? ar(t._tTime, t = t.duration() + t._rDelay) * t : 0;
}, ar = function(t, e) {
  var i = Math.floor(t /= e);
  return t && i === t ? i - 1 : i;
}, Pn = function(t, e) {
  return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur);
}, zn = function(t) {
  return t._end = Dt(t._start + (t._tDur / Math.abs(t._ts || t._rts || tt) || 0));
}, Ln = function(t, e) {
  var i = t._dp;
  return i && i.smoothChildTiming && t._ts && (t._start = Dt(i._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), zn(t), i._dirty || Di(i, t)), t;
}, Uo = function(t, e) {
  var i;
  if ((e._time || e._initted && !e._dur) && (i = Pn(t.rawTime(), e), (!e._dur || Kr(0, e.totalDuration(), i) - e._tTime > tt) && e.render(i, !0)), Di(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
    if (t._dur < t.duration())
      for (i = t; i._dp; )
        i.rawTime() >= 0 && i.totalTime(i._tTime), i = i._dp;
    t._zTime = -tt;
  }
}, We = function(t, e, i, r) {
  return e.parent && mi(e), e._start = Dt((ei(i) ? i : i || t !== at ? xe(t, i, e) : t._time) + e._delay), e._end = Dt(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), $o(t, e, "_first", "_last", t._sort ? "_start" : 0), os(e) || (t._recent = e), r || Uo(t, e), t._ts < 0 && Ln(t, t._tTime), t;
}, Ho = function(t, e) {
  return (me.ScrollTrigger || Es("scrollTrigger", e)) && me.ScrollTrigger.create(e, t);
}, Go = function(t, e, i, r, n) {
  if (Ls(t, e, n), !t._initted)
    return 1;
  if (!i && t._pt && !Nt && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && No !== _e.frame)
    return _i.push(t), t._lazy = [n, r], 1;
}, pl = function a(t) {
  var e = t.parent;
  return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || a(e));
}, os = function(t) {
  var e = t.data;
  return e === "isFromStart" || e === "isStart";
}, gl = function(t, e, i, r) {
  var n = t.ratio, s = e < 0 || !e && (!t._start && pl(t) && !(!t._initted && os(t)) || (t._ts < 0 || t._dp._ts < 0) && !os(t)) ? 0 : 1, o = t._rDelay, l = 0, u, f, _;
  if (o && t._repeat && (l = Kr(0, t._tDur, e), f = ar(l, o), t._yoyo && f & 1 && (s = 1 - s), f !== ar(t._tTime, o) && (n = 1 - s, t.vars.repeatRefresh && t._initted && t.invalidate())), s !== n || Nt || r || t._zTime === tt || !e && t._zTime) {
    if (!t._initted && Go(t, e, r, i, l))
      return;
    for (_ = t._zTime, t._zTime = e || (i ? tt : 0), i || (i = e && !_), t.ratio = s, t._from && (s = 1 - s), t._time = 0, t._tTime = l, u = t._pt; u; )
      u.r(s, u.d), u = u._next;
    e < 0 && ss(t, e, i, !0), t._onUpdate && !i && Pe(t, "onUpdate"), l && t._repeat && !i && t.parent && Pe(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === s && (s && mi(t, 1), !i && !Nt && (Pe(t, s ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
  } else
    t._zTime || (t._zTime = e);
}, ml = function(t, e, i) {
  var r;
  if (i > e)
    for (r = t._first; r && r._start <= i; ) {
      if (r.data === "isPause" && r._start > e)
        return r;
      r = r._next;
    }
  else
    for (r = t._last; r && r._start >= i; ) {
      if (r.data === "isPause" && r._start < e)
        return r;
      r = r._prev;
    }
}, lr = function(t, e, i, r) {
  var n = t._repeat, s = Dt(e) || 0, o = t._tTime / t._tDur;
  return o && !r && (t._time *= s / t._dur), t._dur = s, t._tDur = n ? n < 0 ? 1e10 : Dt(s * (n + 1) + t._rDelay * n) : s, o > 0 && !r && Ln(t, t._tTime = t._tDur * o), t.parent && zn(t), i || Di(t.parent, t), t;
}, Js = function(t) {
  return t instanceof ee ? Di(t) : lr(t, t._dur);
}, yl = {
  _start: 0,
  endTime: Xr,
  totalDuration: Xr
}, xe = function a(t, e, i) {
  var r = t.labels, n = t._recent || yl, s = t.duration() >= Te ? n.endTime(!1) : t._dur, o, l, u;
  return Mt(e) && (isNaN(e) || e in r) ? (l = e.charAt(0), u = e.substr(-1) === "%", o = e.indexOf("="), l === "<" || l === ">" ? (o >= 0 && (e = e.replace(/=/, "")), (l === "<" ? n._start : n.endTime(n._repeat >= 0)) + (parseFloat(e.substr(1)) || 0) * (u ? (o < 0 ? n : i).totalDuration() / 100 : 1)) : o < 0 ? (e in r || (r[e] = s), r[e]) : (l = parseFloat(e.charAt(o - 1) + e.substr(o + 1)), u && i && (l = l / 100 * (Yt(i) ? i[0] : i).totalDuration()), o > 1 ? a(t, e.substr(0, o - 1), i) + l : s + l)) : e == null ? s : +e;
}, Ar = function(t, e, i) {
  var r = ei(e[1]), n = (r ? 2 : 1) + (t < 2 ? 0 : 1), s = e[n], o, l;
  if (r && (s.duration = e[1]), s.parent = i, t) {
    for (o = s, l = i; l && !("immediateRender" in o); )
      o = l.vars.defaults || {}, l = ie(l.vars.inherit) && l.parent;
    s.immediateRender = ie(o.immediateRender), t < 2 ? s.runBackwards = 1 : s.startAt = e[n - 1];
  }
  return new xt(e[0], s, e[n + 1]);
}, xi = function(t, e) {
  return t || t === 0 ? e(t) : e;
}, Kr = function(t, e, i) {
  return i < t ? t : i > e ? e : i;
}, Bt = function(t, e) {
  return !Mt(t) || !(e = al.exec(t)) ? "" : e[1];
}, vl = function(t, e, i) {
  return xi(i, function(r) {
    return Kr(t, e, r);
  });
}, as = [].slice, qo = function(t, e) {
  return t && He(t) && "length" in t && (!e && !t.length || t.length - 1 in t && He(t[0])) && !t.nodeType && t !== we;
}, xl = function(t, e, i) {
  return i === void 0 && (i = []), t.forEach(function(r) {
    var n;
    return Mt(r) && !e || qo(r, 1) ? (n = i).push.apply(n, Se(r)) : i.push(r);
  }) || i;
}, Se = function(t, e, i) {
  return yt && !e && yt.selector ? yt.selector(t) : Mt(t) && !i && (rs || !ur()) ? as.call((e || Ms).querySelectorAll(t), 0) : Yt(t) ? xl(t, i) : qo(t) ? as.call(t, 0) : t ? [t] : [];
}, ls = function(t) {
  return t = Se(t)[0] || bn("Invalid scope") || {}, function(e) {
    var i = t.current || t.nativeElement || t;
    return Se(e, i.querySelectorAll ? i : i === t ? bn("Invalid scope") || Ms.createElement("div") : t);
  };
}, Ko = function(t) {
  return t.sort(function() {
    return 0.5 - Math.random();
  });
}, jo = function(t) {
  if (ht(t))
    return t;
  var e = He(t) ? t : {
    each: t
  }, i = Ri(e.ease), r = e.from || 0, n = parseFloat(e.base) || 0, s = {}, o = r > 0 && r < 1, l = isNaN(r) || o, u = e.axis, f = r, _ = r;
  return Mt(r) ? f = _ = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[r] || 0 : !o && l && (f = r[0], _ = r[1]), function(c, h, p) {
    var d = (p || e).length, m = s[d], v, S, b, y, T, k, w, C, P;
    if (!m) {
      if (P = e.grid === "auto" ? 0 : (e.grid || [1, Te])[1], !P) {
        for (w = -Te; w < (w = p[P++].getBoundingClientRect().left) && P < d; )
          ;
        P--;
      }
      for (m = s[d] = [], v = l ? Math.min(P, d) * f - 0.5 : r % P, S = P === Te ? 0 : l ? d * _ / P - 0.5 : r / P | 0, w = 0, C = Te, k = 0; k < d; k++)
        b = k % P - v, y = S - (k / P | 0), m[k] = T = u ? Math.abs(u === "y" ? y : b) : Ao(b * b + y * y), T > w && (w = T), T < C && (C = T);
      r === "random" && Ko(m), m.max = w - C, m.min = C, m.v = d = (parseFloat(e.amount) || parseFloat(e.each) * (P > d ? d - 1 : u ? u === "y" ? d / P : P : Math.max(P, d / P)) || 0) * (r === "edges" ? -1 : 1), m.b = d < 0 ? n - d : n, m.u = Bt(e.amount || e.each) || 0, i = i && d < 0 ? oa(i) : i;
    }
    return d = (m[c] - m.min) / m.max || 0, Dt(m.b + (i ? i(d) : d) * m.v) + m.u;
  };
}, us = function(t) {
  var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
  return function(i) {
    var r = Dt(Math.round(parseFloat(i) / t) * t * e);
    return (r - r % 1) / e + (ei(i) ? 0 : Bt(i));
  };
}, Zo = function(t, e) {
  var i = Yt(t), r, n;
  return !i && He(t) && (r = i = t.radius || Te, t.values ? (t = Se(t.values), (n = !ei(t[0])) && (r *= r)) : t = us(t.increment)), xi(e, i ? ht(t) ? function(s) {
    return n = t(s), Math.abs(n - s) <= r ? n : s;
  } : function(s) {
    for (var o = parseFloat(n ? s.x : s), l = parseFloat(n ? s.y : 0), u = Te, f = 0, _ = t.length, c, h; _--; )
      n ? (c = t[_].x - o, h = t[_].y - l, c = c * c + h * h) : c = Math.abs(t[_] - o), c < u && (u = c, f = _);
    return f = !r || u <= r ? t[f] : s, n || f === s || ei(s) ? f : f + Bt(s);
  } : us(t));
}, Qo = function(t, e, i, r) {
  return xi(Yt(t) ? !e : i === !0 ? !!(i = 0) : !r, function() {
    return Yt(t) ? t[~~(Math.random() * t.length)] : (i = i || 1e-5) && (r = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((t - i / 2 + Math.random() * (e - t + i * 0.99)) / i) * i * r) / r;
  });
}, wl = function() {
  for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
    e[i] = arguments[i];
  return function(r) {
    return e.reduce(function(n, s) {
      return s(n);
    }, r);
  };
}, bl = function(t, e) {
  return function(i) {
    return t(parseFloat(i)) + (e || Bt(i));
  };
}, Tl = function(t, e, i) {
  return ta(t, e, 0, 1, i);
}, Jo = function(t, e, i) {
  return xi(i, function(r) {
    return t[~~e(r)];
  });
}, Sl = function a(t, e, i) {
  var r = e - t;
  return Yt(t) ? Jo(t, a(0, t.length), e) : xi(i, function(n) {
    return (r + (n - t) % r) % r + t;
  });
}, Pl = function a(t, e, i) {
  var r = e - t, n = r * 2;
  return Yt(t) ? Jo(t, a(0, t.length - 1), e) : xi(i, function(s) {
    return s = (n + (s - t) % n) % n || 0, t + (s > r ? n - s : s);
  });
}, Wr = function(t) {
  for (var e = 0, i = "", r, n, s, o; ~(r = t.indexOf("random(", e)); )
    s = t.indexOf(")", r), o = t.charAt(r + 7) === "[", n = t.substr(r + 7, s - r - 7).match(o ? Lo : is), i += t.substr(e, r - e) + Qo(o ? n : +n[0], o ? 0 : +n[1], +n[2] || 1e-5), e = s + 1;
  return i + t.substr(e, t.length - e);
}, ta = function(t, e, i, r, n) {
  var s = e - t, o = r - i;
  return xi(n, function(l) {
    return i + ((l - t) / s * o || 0);
  });
}, kl = function a(t, e, i, r) {
  var n = isNaN(t + e) ? 0 : function(h) {
    return (1 - h) * t + h * e;
  };
  if (!n) {
    var s = Mt(t), o = {}, l, u, f, _, c;
    if (i === !0 && (r = 1) && (i = null), s)
      t = {
        p: t
      }, e = {
        p: e
      };
    else if (Yt(t) && !Yt(e)) {
      for (f = [], _ = t.length, c = _ - 2, u = 1; u < _; u++)
        f.push(a(t[u - 1], t[u]));
      _--, n = function(p) {
        p *= _;
        var d = Math.min(c, ~~p);
        return f[d](p - d);
      }, i = e;
    } else
      r || (t = Ii(Yt(t) ? [] : {}, t));
    if (!f) {
      for (l in e)
        zs.call(o, t, l, "get", e[l]);
      n = function(p) {
        return Bs(p, o) || (s ? t.p : t);
      };
    }
  }
  return xi(i, n);
}, to = function(t, e, i) {
  var r = t.labels, n = Te, s, o, l;
  for (s in r)
    o = r[s] - e, o < 0 == !!i && o && n > (o = Math.abs(o)) && (l = s, n = o);
  return l;
}, Pe = function(t, e, i) {
  var r = t.vars, n = r[e], s = yt, o = t._ctx, l, u, f;
  if (n)
    return l = r[e + "Params"], u = r.callbackScope || t, i && _i.length && Tn(), o && (yt = o), f = l ? n.apply(u, l) : n.call(u), yt = s, f;
}, Sr = function(t) {
  return mi(t), t.scrollTrigger && t.scrollTrigger.kill(!!Nt), t.progress() < 1 && Pe(t, "onInterrupt"), t;
}, Qi, ea = [], ia = function(t) {
  if (!Os()) {
    ea.push(t);
    return;
  }
  t = !t.name && t.default || t;
  var e = t.name, i = ht(t), r = e && !i && t.init ? function() {
    this._props = [];
  } : t, n = {
    init: Xr,
    render: Bs,
    add: zs,
    kill: Wl,
    modifier: Xl,
    rawVars: 0
  }, s = {
    targetTest: 0,
    get: 0,
    getSetter: Is,
    aliases: {},
    register: 0
  };
  if (ur(), t !== r) {
    if (ce[e])
      return;
    Ce(r, Ce(Sn(t, n), s)), Ii(r.prototype, Ii(n, Sn(t, s))), ce[r.prop = e] = r, t.targetTest && (fn.push(r), As[e] = 1), e = (e === "css" ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin";
  }
  Bo(e, r), t.register && t.register(se, r, ne);
}, J = 255, Pr = {
  aqua: [0, J, J],
  lime: [0, J, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, J],
  navy: [0, 0, 128],
  white: [J, J, J],
  olive: [128, 128, 0],
  yellow: [J, J, 0],
  orange: [J, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [J, 0, 0],
  pink: [J, 192, 203],
  cyan: [0, J, J],
  transparent: [J, J, J, 0]
}, Yn = function(t, e, i) {
  return t += t < 0 ? 1 : t > 1 ? -1 : 0, (t * 6 < 1 ? e + (i - e) * t * 6 : t < 0.5 ? i : t * 3 < 2 ? e + (i - e) * (2 / 3 - t) * 6 : e) * J + 0.5 | 0;
}, ra = function(t, e, i) {
  var r = t ? ei(t) ? [t >> 16, t >> 8 & J, t & J] : 0 : Pr.black, n, s, o, l, u, f, _, c, h, p;
  if (!r) {
    if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), Pr[t])
      r = Pr[t];
    else if (t.charAt(0) === "#") {
      if (t.length < 6 && (n = t.charAt(1), s = t.charAt(2), o = t.charAt(3), t = "#" + n + n + s + s + o + o + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9)
        return r = parseInt(t.substr(1, 6), 16), [r >> 16, r >> 8 & J, r & J, parseInt(t.substr(7), 16) / 255];
      t = parseInt(t.substr(1), 16), r = [t >> 16, t >> 8 & J, t & J];
    } else if (t.substr(0, 3) === "hsl") {
      if (r = p = t.match(is), !e)
        l = +r[0] % 360 / 360, u = +r[1] / 100, f = +r[2] / 100, s = f <= 0.5 ? f * (u + 1) : f + u - f * u, n = f * 2 - s, r.length > 3 && (r[3] *= 1), r[0] = Yn(l + 1 / 3, n, s), r[1] = Yn(l, n, s), r[2] = Yn(l - 1 / 3, n, s);
      else if (~t.indexOf("="))
        return r = t.match(Ro), i && r.length < 4 && (r[3] = 1), r;
    } else
      r = t.match(is) || Pr.transparent;
    r = r.map(Number);
  }
  return e && !p && (n = r[0] / J, s = r[1] / J, o = r[2] / J, _ = Math.max(n, s, o), c = Math.min(n, s, o), f = (_ + c) / 2, _ === c ? l = u = 0 : (h = _ - c, u = f > 0.5 ? h / (2 - _ - c) : h / (_ + c), l = _ === n ? (s - o) / h + (s < o ? 6 : 0) : _ === s ? (o - n) / h + 2 : (n - s) / h + 4, l *= 60), r[0] = ~~(l + 0.5), r[1] = ~~(u * 100 + 0.5), r[2] = ~~(f * 100 + 0.5)), i && r.length < 4 && (r[3] = 1), r;
}, na = function(t) {
  var e = [], i = [], r = -1;
  return t.split(pi).forEach(function(n) {
    var s = n.match(Zi) || [];
    e.push.apply(e, s), i.push(r += s.length + 1);
  }), e.c = i, e;
}, eo = function(t, e, i) {
  var r = "", n = (t + r).match(pi), s = e ? "hsla(" : "rgba(", o = 0, l, u, f, _;
  if (!n)
    return t;
  if (n = n.map(function(c) {
    return (c = ra(c, e, 1)) && s + (e ? c[0] + "," + c[1] + "%," + c[2] + "%," + c[3] : c.join(",")) + ")";
  }), i && (f = na(t), l = i.c, l.join(r) !== f.c.join(r)))
    for (u = t.replace(pi, "1").split(Zi), _ = u.length - 1; o < _; o++)
      r += u[o] + (~l.indexOf(o) ? n.shift() || s + "0,0,0,0)" : (f.length ? f : n.length ? n : i).shift());
  if (!u)
    for (u = t.split(pi), _ = u.length - 1; o < _; o++)
      r += u[o] + n[o];
  return r + u[_];
}, pi = function() {
  var a = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
  for (t in Pr)
    a += "|" + t + "\\b";
  return new RegExp(a + ")", "gi");
}(), Cl = /hsl[a]?\(/, sa = function(t) {
  var e = t.join(" "), i;
  if (pi.lastIndex = 0, pi.test(e))
    return i = Cl.test(e), t[1] = eo(t[1], i), t[0] = eo(t[0], i, na(t[1])), !0;
}, Vr, _e = function() {
  var a = Date.now, t = 500, e = 33, i = a(), r = i, n = 1e3 / 240, s = n, o = [], l, u, f, _, c, h, p = function d(m) {
    var v = a() - r, S = m === !0, b, y, T, k;
    if (v > t && (i += v - e), r += v, T = r - i, b = T - s, (b > 0 || S) && (k = ++_.frame, c = T - _.time * 1e3, _.time = T = T / 1e3, s += b + (b >= n ? 4 : n - b), y = 1), S || (l = u(d)), y)
      for (h = 0; h < o.length; h++)
        o[h](T, c, k, m);
  };
  return _ = {
    time: 0,
    frame: 0,
    tick: function() {
      p(!0);
    },
    deltaRatio: function(m) {
      return c / (1e3 / (m || 60));
    },
    wake: function() {
      Fo && (!rs && Os() && (we = rs = window, Ms = we.document || {}, me.gsap = se, (we.gsapVersions || (we.gsapVersions = [])).push(se.version), Io(wn || we.GreenSockGlobals || !we.gsap && we || {}), f = we.requestAnimationFrame, ea.forEach(ia)), l && _.sleep(), u = f || function(m) {
        return setTimeout(m, s - _.time * 1e3 + 1 | 0);
      }, Vr = 1, p(2));
    },
    sleep: function() {
      (f ? we.cancelAnimationFrame : clearTimeout)(l), Vr = 0, u = Xr;
    },
    lagSmoothing: function(m, v) {
      t = m || 1 / 0, e = Math.min(v || 33, t);
    },
    fps: function(m) {
      n = 1e3 / (m || 240), s = _.time * 1e3 + n;
    },
    add: function(m, v, S) {
      var b = v ? function(y, T, k, w) {
        m(y, T, k, w), _.remove(b);
      } : m;
      return _.remove(m), o[S ? "unshift" : "push"](b), ur(), b;
    },
    remove: function(m, v) {
      ~(v = o.indexOf(m)) && o.splice(v, 1) && h >= v && h--;
    },
    _listeners: o
  }, _;
}(), ur = function() {
  return !Vr && _e.wake();
}, j = {}, Ol = /^[\d.\-M][\d.\-,\s]/, Ml = /["']/g, El = function(t) {
  for (var e = {}, i = t.substr(1, t.length - 3).split(":"), r = i[0], n = 1, s = i.length, o, l, u; n < s; n++)
    l = i[n], o = n !== s - 1 ? l.lastIndexOf(",") : l.length, u = l.substr(0, o), e[r] = isNaN(u) ? u.replace(Ml, "").trim() : +u, r = l.substr(o + 1).trim();
  return e;
}, Al = function(t) {
  var e = t.indexOf("(") + 1, i = t.indexOf(")"), r = t.indexOf("(", e);
  return t.substring(e, ~r && r < i ? t.indexOf(")", i + 1) : i);
}, Dl = function(t) {
  var e = (t + "").split("("), i = j[e[0]];
  return i && e.length > 1 && i.config ? i.config.apply(null, ~t.indexOf("{") ? [El(e[1])] : Al(t).split(",").map(Wo)) : j._CE && Ol.test(t) ? j._CE("", t) : i;
}, oa = function(t) {
  return function(e) {
    return 1 - t(1 - e);
  };
}, aa = function a(t, e) {
  for (var i = t._first, r; i; )
    i instanceof ee ? a(i, e) : i.vars.yoyoEase && (!i._yoyo || !i._repeat) && i._yoyo !== e && (i.timeline ? a(i.timeline, e) : (r = i._ease, i._ease = i._yEase, i._yEase = r, i._yoyo = e)), i = i._next;
}, Ri = function(t, e) {
  return t && (ht(t) ? t : j[t] || Dl(t)) || e;
}, Xi = function(t, e, i, r) {
  i === void 0 && (i = function(l) {
    return 1 - e(1 - l);
  }), r === void 0 && (r = function(l) {
    return l < 0.5 ? e(l * 2) / 2 : 1 - e((1 - l) * 2) / 2;
  });
  var n = {
    easeIn: e,
    easeOut: i,
    easeInOut: r
  }, s;
  return re(t, function(o) {
    j[o] = me[o] = n, j[s = o.toLowerCase()] = i;
    for (var l in n)
      j[s + (l === "easeIn" ? ".in" : l === "easeOut" ? ".out" : ".inOut")] = j[o + "." + l] = n[l];
  }), n;
}, la = function(t) {
  return function(e) {
    return e < 0.5 ? (1 - t(1 - e * 2)) / 2 : 0.5 + t((e - 0.5) * 2) / 2;
  };
}, Xn = function a(t, e, i) {
  var r = e >= 1 ? e : 1, n = (i || (t ? 0.3 : 0.45)) / (e < 1 ? e : 1), s = n / es * (Math.asin(1 / r) || 0), o = function(f) {
    return f === 1 ? 1 : r * Math.pow(2, -10 * f) * ol((f - s) * n) + 1;
  }, l = t === "out" ? o : t === "in" ? function(u) {
    return 1 - o(1 - u);
  } : la(o);
  return n = es / n, l.config = function(u, f) {
    return a(t, u, f);
  }, l;
}, Wn = function a(t, e) {
  e === void 0 && (e = 1.70158);
  var i = function(s) {
    return s ? --s * s * ((e + 1) * s + e) + 1 : 0;
  }, r = t === "out" ? i : t === "in" ? function(n) {
    return 1 - i(1 - n);
  } : la(i);
  return r.config = function(n) {
    return a(t, n);
  }, r;
};
re("Linear,Quad,Cubic,Quart,Quint,Strong", function(a, t) {
  var e = t < 5 ? t + 1 : t;
  Xi(a + ",Power" + (e - 1), t ? function(i) {
    return Math.pow(i, e);
  } : function(i) {
    return i;
  }, function(i) {
    return 1 - Math.pow(1 - i, e);
  }, function(i) {
    return i < 0.5 ? Math.pow(i * 2, e) / 2 : 1 - Math.pow((1 - i) * 2, e) / 2;
  });
});
j.Linear.easeNone = j.none = j.Linear.easeIn;
Xi("Elastic", Xn("in"), Xn("out"), Xn());
(function(a, t) {
  var e = 1 / t, i = 2 * e, r = 2.5 * e, n = function(o) {
    return o < e ? a * o * o : o < i ? a * Math.pow(o - 1.5 / t, 2) + 0.75 : o < r ? a * (o -= 2.25 / t) * o + 0.9375 : a * Math.pow(o - 2.625 / t, 2) + 0.984375;
  };
  Xi("Bounce", function(s) {
    return 1 - n(1 - s);
  }, n);
})(7.5625, 2.75);
Xi("Expo", function(a) {
  return a ? Math.pow(2, 10 * (a - 1)) : 0;
});
Xi("Circ", function(a) {
  return -(Ao(1 - a * a) - 1);
});
Xi("Sine", function(a) {
  return a === 1 ? 1 : -sl(a * rl) + 1;
});
Xi("Back", Wn("in"), Wn("out"), Wn());
j.SteppedEase = j.steps = me.SteppedEase = {
  config: function(t, e) {
    t === void 0 && (t = 1);
    var i = 1 / t, r = t + (e ? 0 : 1), n = e ? 1 : 0, s = 1 - tt;
    return function(o) {
      return ((r * Kr(0, s, o) | 0) + n) * i;
    };
  }
};
or.ease = j["quad.out"];
re("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(a) {
  return Ds += a + "," + a + "Params,";
});
var ua = function(t, e) {
  this.id = nl++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : Yo, this.set = e ? e.getSetter : Is;
}, fr = /* @__PURE__ */ function() {
  function a(e) {
    this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, lr(this, +e.duration, 1, 1), this.data = e.data, yt && (this._ctx = yt, yt.data.push(this)), Vr || _e.wake();
  }
  var t = a.prototype;
  return t.delay = function(i) {
    return i || i === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + i - this._delay), this._delay = i, this) : this._delay;
  }, t.duration = function(i) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? i + (i + this._rDelay) * this._repeat : i) : this.totalDuration() && this._dur;
  }, t.totalDuration = function(i) {
    return arguments.length ? (this._dirty = 0, lr(this, this._repeat < 0 ? i : (i - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, t.totalTime = function(i, r) {
    if (ur(), !arguments.length)
      return this._tTime;
    var n = this._dp;
    if (n && n.smoothChildTiming && this._ts) {
      for (Ln(this, i), !n._dp || n.parent || Uo(n, this); n && n.parent; )
        n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && i < this._tDur || this._ts < 0 && i > 0 || !this._tDur && !i) && We(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== i || !this._dur && !r || this._initted && Math.abs(this._zTime) === tt || !i && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = i), Xo(this, i, r)), this;
  }, t.time = function(i, r) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), i + Qs(this)) % (this._dur + this._rDelay) || (i ? this._dur : 0), r) : this._time;
  }, t.totalProgress = function(i, r) {
    return arguments.length ? this.totalTime(this.totalDuration() * i, r) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
  }, t.progress = function(i, r) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - i : i) + Qs(this), r) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
  }, t.iteration = function(i, r) {
    var n = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (i - 1) * n, r) : this._repeat ? ar(this._tTime, n) + 1 : 1;
  }, t.timeScale = function(i) {
    if (!arguments.length)
      return this._rts === -tt ? 0 : this._rts;
    if (this._rts === i)
      return this;
    var r = this.parent && this._ts ? Pn(this.parent._time, this) : this._tTime;
    return this._rts = +i || 0, this._ts = this._ps || i === -tt ? 0 : this._rts, this.totalTime(Kr(-Math.abs(this._delay), this._tDur, r), !0), zn(this), dl(this);
  }, t.paused = function(i) {
    return arguments.length ? (this._ps !== i && (this._ps = i, i ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (ur(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== tt && (this._tTime -= tt)))), this) : this._ps;
  }, t.startTime = function(i) {
    if (arguments.length) {
      this._start = i;
      var r = this.parent || this._dp;
      return r && (r._sort || !this.parent) && We(r, this, i - this._delay), this;
    }
    return this._start;
  }, t.endTime = function(i) {
    return this._start + (ie(i) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, t.rawTime = function(i) {
    var r = this.parent || this._dp;
    return r ? i && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Pn(r.rawTime(i), this) : this._tTime : this._tTime;
  }, t.revert = function(i) {
    i === void 0 && (i = ul);
    var r = Nt;
    return Nt = i, (this._initted || this._startAt) && (this.timeline && this.timeline.revert(i), this.totalTime(-0.01, i.suppressEvents)), this.data !== "nested" && i.kill !== !1 && this.kill(), Nt = r, this;
  }, t.globalTime = function(i) {
    for (var r = this, n = arguments.length ? i : r.rawTime(); r; )
      n = r._start + n / (r._ts || 1), r = r._dp;
    return !this.parent && this._sat ? this._sat.vars.immediateRender ? -1 : this._sat.globalTime(i) : n;
  }, t.repeat = function(i) {
    return arguments.length ? (this._repeat = i === 1 / 0 ? -2 : i, Js(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, t.repeatDelay = function(i) {
    if (arguments.length) {
      var r = this._time;
      return this._rDelay = i, Js(this), r ? this.time(r) : this;
    }
    return this._rDelay;
  }, t.yoyo = function(i) {
    return arguments.length ? (this._yoyo = i, this) : this._yoyo;
  }, t.seek = function(i, r) {
    return this.totalTime(xe(this, i), ie(r));
  }, t.restart = function(i, r) {
    return this.play().totalTime(i ? -this._delay : 0, ie(r));
  }, t.play = function(i, r) {
    return i != null && this.seek(i, r), this.reversed(!1).paused(!1);
  }, t.reverse = function(i, r) {
    return i != null && this.seek(i || this.totalDuration(), r), this.reversed(!0).paused(!1);
  }, t.pause = function(i, r) {
    return i != null && this.seek(i, r), this.paused(!0);
  }, t.resume = function() {
    return this.paused(!1);
  }, t.reversed = function(i) {
    return arguments.length ? (!!i !== this.reversed() && this.timeScale(-this._rts || (i ? -tt : 0)), this) : this._rts < 0;
  }, t.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -tt, this;
  }, t.isActive = function() {
    var i = this.parent || this._dp, r = this._start, n;
    return !!(!i || this._ts && this._initted && i.isActive() && (n = i.rawTime(!0)) >= r && n < this.endTime(!0) - tt);
  }, t.eventCallback = function(i, r, n) {
    var s = this.vars;
    return arguments.length > 1 ? (r ? (s[i] = r, n && (s[i + "Params"] = n), i === "onUpdate" && (this._onUpdate = r)) : delete s[i], this) : s[i];
  }, t.then = function(i) {
    var r = this;
    return new Promise(function(n) {
      var s = ht(i) ? i : Vo, o = function() {
        var u = r.then;
        r.then = null, ht(s) && (s = s(r)) && (s.then || s === r) && (r.then = u), n(s), r.then = u;
      };
      r._initted && r.totalProgress() === 1 && r._ts >= 0 || !r._tTime && r._ts < 0 ? o() : r._prom = o;
    });
  }, t.kill = function() {
    Sr(this);
  }, a;
}();
Ce(fr.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -tt,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var ee = /* @__PURE__ */ function(a) {
  Eo(t, a);
  function t(i, r) {
    var n;
    return i === void 0 && (i = {}), n = a.call(this, i) || this, n.labels = {}, n.smoothChildTiming = !!i.smoothChildTiming, n.autoRemoveChildren = !!i.autoRemoveChildren, n._sort = ie(i.sortChildren), at && We(i.parent || at, je(n), r), i.reversed && n.reverse(), i.paused && n.paused(!0), i.scrollTrigger && Ho(je(n), i.scrollTrigger), n;
  }
  var e = t.prototype;
  return e.to = function(r, n, s) {
    return Ar(0, arguments, this), this;
  }, e.from = function(r, n, s) {
    return Ar(1, arguments, this), this;
  }, e.fromTo = function(r, n, s, o) {
    return Ar(2, arguments, this), this;
  }, e.set = function(r, n, s) {
    return n.duration = 0, n.parent = this, Er(n).repeatDelay || (n.repeat = 0), n.immediateRender = !!n.immediateRender, new xt(r, n, xe(this, s), 1), this;
  }, e.call = function(r, n, s) {
    return We(this, xt.delayedCall(0, r, n), s);
  }, e.staggerTo = function(r, n, s, o, l, u, f) {
    return s.duration = n, s.stagger = s.stagger || o, s.onComplete = u, s.onCompleteParams = f, s.parent = this, new xt(r, s, xe(this, l)), this;
  }, e.staggerFrom = function(r, n, s, o, l, u, f) {
    return s.runBackwards = 1, Er(s).immediateRender = ie(s.immediateRender), this.staggerTo(r, n, s, o, l, u, f);
  }, e.staggerFromTo = function(r, n, s, o, l, u, f, _) {
    return o.startAt = s, Er(o).immediateRender = ie(o.immediateRender), this.staggerTo(r, n, o, l, u, f, _);
  }, e.render = function(r, n, s) {
    var o = this._time, l = this._dirty ? this.totalDuration() : this._tDur, u = this._dur, f = r <= 0 ? 0 : Dt(r), _ = this._zTime < 0 != r < 0 && (this._initted || !u), c, h, p, d, m, v, S, b, y, T, k, w;
    if (this !== at && f > l && r >= 0 && (f = l), f !== this._tTime || s || _) {
      if (o !== this._time && u && (f += this._time - o, r += this._time - o), c = f, y = this._start, b = this._ts, v = !b, _ && (u || (o = this._zTime), (r || !n) && (this._zTime = r)), this._repeat) {
        if (k = this._yoyo, m = u + this._rDelay, this._repeat < -1 && r < 0)
          return this.totalTime(m * 100 + r, n, s);
        if (c = Dt(f % m), f === l ? (d = this._repeat, c = u) : (d = ~~(f / m), d && d === f / m && (c = u, d--), c > u && (c = u)), T = ar(this._tTime, m), !o && this._tTime && T !== d && this._tTime - T * m - this._dur <= 0 && (T = d), k && d & 1 && (c = u - c, w = 1), d !== T && !this._lock) {
          var C = k && T & 1, P = C === (k && d & 1);
          if (d < T && (C = !C), o = C ? 0 : u, this._lock = 1, this.render(o || (w ? 0 : Dt(d * m)), n, !u)._lock = 0, this._tTime = f, !n && this.parent && Pe(this, "onRepeat"), this.vars.repeatRefresh && !w && (this.invalidate()._lock = 1), o && o !== this._time || v !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (u = this._dur, l = this._tDur, P && (this._lock = 2, o = C ? u : -1e-4, this.render(o, !0), this.vars.repeatRefresh && !w && this.invalidate()), this._lock = 0, !this._ts && !v)
            return this;
          aa(this, w);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (S = ml(this, Dt(o), Dt(c)), S && (f -= c - (c = S._start))), this._tTime = f, this._time = c, this._act = !b, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = r, o = 0), !o && c && !n && !d && (Pe(this, "onStart"), this._tTime !== f))
        return this;
      if (c >= o && r >= 0)
        for (h = this._first; h; ) {
          if (p = h._next, (h._act || c >= h._start) && h._ts && S !== h) {
            if (h.parent !== this)
              return this.render(r, n, s);
            if (h.render(h._ts > 0 ? (c - h._start) * h._ts : (h._dirty ? h.totalDuration() : h._tDur) + (c - h._start) * h._ts, n, s), c !== this._time || !this._ts && !v) {
              S = 0, p && (f += this._zTime = -tt);
              break;
            }
          }
          h = p;
        }
      else {
        h = this._last;
        for (var M = r < 0 ? r : c; h; ) {
          if (p = h._prev, (h._act || M <= h._end) && h._ts && S !== h) {
            if (h.parent !== this)
              return this.render(r, n, s);
            if (h.render(h._ts > 0 ? (M - h._start) * h._ts : (h._dirty ? h.totalDuration() : h._tDur) + (M - h._start) * h._ts, n, s || Nt && (h._initted || h._startAt)), c !== this._time || !this._ts && !v) {
              S = 0, p && (f += this._zTime = M ? -tt : tt);
              break;
            }
          }
          h = p;
        }
      }
      if (S && !n && (this.pause(), S.render(c >= o ? 0 : -tt)._zTime = c >= o ? 1 : -1, this._ts))
        return this._start = y, zn(this), this.render(r, n, s);
      this._onUpdate && !n && Pe(this, "onUpdate", !0), (f === l && this._tTime >= this.totalDuration() || !f && o) && (y === this._start || Math.abs(b) !== Math.abs(this._ts)) && (this._lock || ((r || !u) && (f === l && this._ts > 0 || !f && this._ts < 0) && mi(this, 1), !n && !(r < 0 && !o) && (f || o || !l) && (Pe(this, f === l && r >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(f < l && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, e.add = function(r, n) {
    var s = this;
    if (ei(n) || (n = xe(this, n, r)), !(r instanceof fr)) {
      if (Yt(r))
        return r.forEach(function(o) {
          return s.add(o, n);
        }), this;
      if (Mt(r))
        return this.addLabel(r, n);
      if (ht(r))
        r = xt.delayedCall(0, r);
      else
        return this;
    }
    return this !== r ? We(this, r, n) : this;
  }, e.getChildren = function(r, n, s, o) {
    r === void 0 && (r = !0), n === void 0 && (n = !0), s === void 0 && (s = !0), o === void 0 && (o = -Te);
    for (var l = [], u = this._first; u; )
      u._start >= o && (u instanceof xt ? n && l.push(u) : (s && l.push(u), r && l.push.apply(l, u.getChildren(!0, n, s)))), u = u._next;
    return l;
  }, e.getById = function(r) {
    for (var n = this.getChildren(1, 1, 1), s = n.length; s--; )
      if (n[s].vars.id === r)
        return n[s];
  }, e.remove = function(r) {
    return Mt(r) ? this.removeLabel(r) : ht(r) ? this.killTweensOf(r) : (Rn(this, r), r === this._recent && (this._recent = this._last), Di(this));
  }, e.totalTime = function(r, n) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = Dt(_e.time - (this._ts > 0 ? r / this._ts : (this.totalDuration() - r) / -this._ts))), a.prototype.totalTime.call(this, r, n), this._forcing = 0, this) : this._tTime;
  }, e.addLabel = function(r, n) {
    return this.labels[r] = xe(this, n), this;
  }, e.removeLabel = function(r) {
    return delete this.labels[r], this;
  }, e.addPause = function(r, n, s) {
    var o = xt.delayedCall(0, n || Xr, s);
    return o.data = "isPause", this._hasPause = 1, We(this, o, xe(this, r));
  }, e.removePause = function(r) {
    var n = this._first;
    for (r = xe(this, r); n; )
      n._start === r && n.data === "isPause" && mi(n), n = n._next;
  }, e.killTweensOf = function(r, n, s) {
    for (var o = this.getTweensOf(r, s), l = o.length; l--; )
      li !== o[l] && o[l].kill(r, n);
    return this;
  }, e.getTweensOf = function(r, n) {
    for (var s = [], o = Se(r), l = this._first, u = ei(n), f; l; )
      l instanceof xt ? fl(l._targets, o) && (u ? (!li || l._initted && l._ts) && l.globalTime(0) <= n && l.globalTime(l.totalDuration()) > n : !n || l.isActive()) && s.push(l) : (f = l.getTweensOf(o, n)).length && s.push.apply(s, f), l = l._next;
    return s;
  }, e.tweenTo = function(r, n) {
    n = n || {};
    var s = this, o = xe(s, r), l = n, u = l.startAt, f = l.onStart, _ = l.onStartParams, c = l.immediateRender, h, p = xt.to(s, Ce({
      ease: n.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: o,
      overwrite: "auto",
      duration: n.duration || Math.abs((o - (u && "time" in u ? u.time : s._time)) / s.timeScale()) || tt,
      onStart: function() {
        if (s.pause(), !h) {
          var m = n.duration || Math.abs((o - (u && "time" in u ? u.time : s._time)) / s.timeScale());
          p._dur !== m && lr(p, m, 0, 1).render(p._time, !0, !0), h = 1;
        }
        f && f.apply(p, _ || []);
      }
    }, n));
    return c ? p.render(0) : p;
  }, e.tweenFromTo = function(r, n, s) {
    return this.tweenTo(n, Ce({
      startAt: {
        time: xe(this, r)
      }
    }, s));
  }, e.recent = function() {
    return this._recent;
  }, e.nextLabel = function(r) {
    return r === void 0 && (r = this._time), to(this, xe(this, r));
  }, e.previousLabel = function(r) {
    return r === void 0 && (r = this._time), to(this, xe(this, r), 1);
  }, e.currentLabel = function(r) {
    return arguments.length ? this.seek(r, !0) : this.previousLabel(this._time + tt);
  }, e.shiftChildren = function(r, n, s) {
    s === void 0 && (s = 0);
    for (var o = this._first, l = this.labels, u; o; )
      o._start >= s && (o._start += r, o._end += r), o = o._next;
    if (n)
      for (u in l)
        l[u] >= s && (l[u] += r);
    return Di(this);
  }, e.invalidate = function(r) {
    var n = this._first;
    for (this._lock = 0; n; )
      n.invalidate(r), n = n._next;
    return a.prototype.invalidate.call(this, r);
  }, e.clear = function(r) {
    r === void 0 && (r = !0);
    for (var n = this._first, s; n; )
      s = n._next, this.remove(n), n = s;
    return this._dp && (this._time = this._tTime = this._pTime = 0), r && (this.labels = {}), Di(this);
  }, e.totalDuration = function(r) {
    var n = 0, s = this, o = s._last, l = Te, u, f, _;
    if (arguments.length)
      return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -r : r));
    if (s._dirty) {
      for (_ = s.parent; o; )
        u = o._prev, o._dirty && o.totalDuration(), f = o._start, f > l && s._sort && o._ts && !s._lock ? (s._lock = 1, We(s, o, f - o._delay, 1)._lock = 0) : l = f, f < 0 && o._ts && (n -= f, (!_ && !s._dp || _ && _.smoothChildTiming) && (s._start += f / s._ts, s._time -= f, s._tTime -= f), s.shiftChildren(-f, !1, -1 / 0), l = 0), o._end > n && o._ts && (n = o._end), o = u;
      lr(s, s === at && s._time > n ? s._time : n, 1, 1), s._dirty = 0;
    }
    return s._tDur;
  }, t.updateRoot = function(r) {
    if (at._ts && (Xo(at, Pn(r, at)), No = _e.frame), _e.frame >= js) {
      js += ge.autoSleep || 120;
      var n = at._first;
      if ((!n || !n._ts) && ge.autoSleep && _e._listeners.length < 2) {
        for (; n && !n._ts; )
          n = n._next;
        n || _e.sleep();
      }
    }
  }, t;
}(fr);
Ce(ee.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var Rl = function(t, e, i, r, n, s, o) {
  var l = new ne(this._pt, t, e, 0, 1, pa, null, n), u = 0, f = 0, _, c, h, p, d, m, v, S;
  for (l.b = i, l.e = r, i += "", r += "", (v = ~r.indexOf("random(")) && (r = Wr(r)), s && (S = [i, r], s(S, t, e), i = S[0], r = S[1]), c = i.match(Bn) || []; _ = Bn.exec(r); )
    p = _[0], d = r.substring(u, _.index), h ? h = (h + 1) % 5 : d.substr(-5) === "rgba(" && (h = 1), p !== c[f++] && (m = parseFloat(c[f - 1]) || 0, l._pt = {
      _next: l._pt,
      p: d || f === 1 ? d : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: m,
      c: p.charAt(1) === "=" ? er(m, p) - m : parseFloat(p) - m,
      m: h && h < 4 ? Math.round : 0
    }, u = Bn.lastIndex);
  return l.c = u < r.length ? r.substring(u, r.length) : "", l.fp = o, (zo.test(r) || v) && (l.e = 0), this._pt = l, l;
}, zs = function(t, e, i, r, n, s, o, l, u, f) {
  ht(r) && (r = r(n || 0, t, s));
  var _ = t[e], c = i !== "get" ? i : ht(_) ? u ? t[e.indexOf("set") || !ht(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](u) : t[e]() : _, h = ht(_) ? u ? Bl : da : Fs, p;
  if (Mt(r) && (~r.indexOf("random(") && (r = Wr(r)), r.charAt(1) === "=" && (p = er(c, r) + (Bt(c) || 0), (p || p === 0) && (r = p))), !f || c !== r || fs)
    return !isNaN(c * r) && r !== "" ? (p = new ne(this._pt, t, e, +c || 0, r - (c || 0), typeof _ == "boolean" ? Yl : _a, 0, h), u && (p.fp = u), o && p.modifier(o, this, t), this._pt = p) : (!_ && !(e in t) && Es(e, r), Rl.call(this, t, e, c, r, h, l || ge.stringFilter, u));
}, zl = function(t, e, i, r, n) {
  if (ht(t) && (t = Dr(t, n, e, i, r)), !He(t) || t.style && t.nodeType || Yt(t) || Do(t))
    return Mt(t) ? Dr(t, n, e, i, r) : t;
  var s = {}, o;
  for (o in t)
    s[o] = Dr(t[o], n, e, i, r);
  return s;
}, fa = function(t, e, i, r, n, s) {
  var o, l, u, f;
  if (ce[t] && (o = new ce[t]()).init(n, o.rawVars ? e[t] : zl(e[t], r, n, s, i), i, r, s) !== !1 && (i._pt = l = new ne(i._pt, n, t, 0, 1, o.render, o, 0, o.priority), i !== Qi))
    for (u = i._ptLookup[i._targets.indexOf(n)], f = o._props.length; f--; )
      u[o._props[f]] = l;
  return o;
}, li, fs, Ls = function a(t, e, i) {
  var r = t.vars, n = r.ease, s = r.startAt, o = r.immediateRender, l = r.lazy, u = r.onUpdate, f = r.onUpdateParams, _ = r.callbackScope, c = r.runBackwards, h = r.yoyoEase, p = r.keyframes, d = r.autoRevert, m = t._dur, v = t._startAt, S = t._targets, b = t.parent, y = b && b.data === "nested" ? b.vars.targets : S, T = t._overwrite === "auto" && !ks, k = t.timeline, w, C, P, M, R, E, W, B, Y, q, L, K, Q;
  if (k && (!p || !n) && (n = "none"), t._ease = Ri(n, or.ease), t._yEase = h ? oa(Ri(h === !0 ? n : h, or.ease)) : 0, h && t._yoyo && !t._repeat && (h = t._yEase, t._yEase = t._ease, t._ease = h), t._from = !k && !!r.runBackwards, !k || p && !r.stagger) {
    if (B = S[0] ? Ai(S[0]).harness : 0, K = B && r[B.prop], w = Sn(r, As), v && (v._zTime < 0 && v.progress(1), e < 0 && c && o && !d ? v.render(-1, !0) : v.revert(c && m ? un : ll), v._lazy = 0), s) {
      if (mi(t._startAt = xt.set(S, Ce({
        data: "isStart",
        overwrite: !1,
        parent: b,
        immediateRender: !0,
        lazy: !v && ie(l),
        startAt: null,
        delay: 0,
        onUpdate: u,
        onUpdateParams: f,
        callbackScope: _,
        stagger: 0
      }, s))), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (Nt || !o && !d) && t._startAt.revert(un), o && m && e <= 0 && i <= 0) {
        e && (t._zTime = e);
        return;
      }
    } else if (c && m && !v) {
      if (e && (o = !1), P = Ce({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: o && !v && ie(l),
        immediateRender: o,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: b
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y:gsap.utils.wrap([-100,100])})
      }, w), K && (P[B.prop] = K), mi(t._startAt = xt.set(S, P)), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (Nt ? t._startAt.revert(un) : t._startAt.render(-1, !0)), t._zTime = e, !o)
        a(t._startAt, tt, tt);
      else if (!e)
        return;
    }
    for (t._pt = t._ptCache = 0, l = m && ie(l) || l && !m, C = 0; C < S.length; C++) {
      if (R = S[C], W = R._gsap || Rs(S)[C]._gsap, t._ptLookup[C] = q = {}, ns[W.id] && _i.length && Tn(), L = y === S ? C : y.indexOf(R), B && (Y = new B()).init(R, K || w, t, L, y) !== !1 && (t._pt = M = new ne(t._pt, R, Y.name, 0, 1, Y.render, Y, 0, Y.priority), Y._props.forEach(function(g) {
        q[g] = M;
      }), Y.priority && (E = 1)), !B || K)
        for (P in w)
          ce[P] && (Y = fa(P, w, t, L, R, y)) ? Y.priority && (E = 1) : q[P] = M = zs.call(t, R, P, "get", w[P], L, y, 0, r.stringFilter);
      t._op && t._op[C] && t.kill(R, t._op[C]), T && t._pt && (li = t, at.killTweensOf(R, q, t.globalTime(e)), Q = !t.parent, li = 0), t._pt && l && (ns[W.id] = 1);
    }
    E && ga(t), t._onInit && t._onInit(t);
  }
  t._onUpdate = u, t._initted = (!t._op || t._pt) && !Q, p && e <= 0 && k.render(Te, !0, !0);
}, Ll = function(t, e, i, r, n, s, o) {
  var l = (t._pt && t._ptCache || (t._ptCache = {}))[e], u, f, _, c;
  if (!l)
    for (l = t._ptCache[e] = [], _ = t._ptLookup, c = t._targets.length; c--; ) {
      if (u = _[c][e], u && u.d && u.d._pt)
        for (u = u.d._pt; u && u.p !== e && u.fp !== e; )
          u = u._next;
      if (!u)
        return fs = 1, t.vars[e] = "+=0", Ls(t, o), fs = 0, 1;
      l.push(u);
    }
  for (c = l.length; c--; )
    f = l[c], u = f._pt || f, u.s = (r || r === 0) && !n ? r : u.s + (r || 0) + s * u.c, u.c = i - u.s, f.e && (f.e = pt(i) + Bt(f.e)), f.b && (f.b = u.s + Bt(f.b));
}, Fl = function(t, e) {
  var i = t[0] ? Ai(t[0]).harness : 0, r = i && i.aliases, n, s, o, l;
  if (!r)
    return e;
  n = Ii({}, e);
  for (s in r)
    if (s in n)
      for (l = r[s].split(","), o = l.length; o--; )
        n[l[o]] = n[s];
  return n;
}, Il = function(t, e, i, r) {
  var n = e.ease || r || "power1.inOut", s, o;
  if (Yt(e))
    o = i[t] || (i[t] = []), e.forEach(function(l, u) {
      return o.push({
        t: u / (e.length - 1) * 100,
        v: l,
        e: n
      });
    });
  else
    for (s in e)
      o = i[s] || (i[s] = []), s === "ease" || o.push({
        t: parseFloat(t),
        v: e[s],
        e: n
      });
}, Dr = function(t, e, i, r, n) {
  return ht(t) ? t.call(e, i, r, n) : Mt(t) && ~t.indexOf("random(") ? Wr(t) : t;
}, ha = Ds + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", ca = {};
re(ha + ",id,stagger,delay,duration,paused,scrollTrigger", function(a) {
  return ca[a] = 1;
});
var xt = /* @__PURE__ */ function(a) {
  Eo(t, a);
  function t(i, r, n, s) {
    var o;
    typeof r == "number" && (n.duration = r, r = n, n = null), o = a.call(this, s ? r : Er(r)) || this;
    var l = o.vars, u = l.duration, f = l.delay, _ = l.immediateRender, c = l.stagger, h = l.overwrite, p = l.keyframes, d = l.defaults, m = l.scrollTrigger, v = l.yoyoEase, S = r.parent || at, b = (Yt(i) || Do(i) ? ei(i[0]) : "length" in r) ? [i] : Se(i), y, T, k, w, C, P, M, R;
    if (o._targets = b.length ? Rs(b) : bn("GSAP target " + i + " not found. https://greensock.com", !ge.nullTargetWarn) || [], o._ptLookup = [], o._overwrite = h, p || c || jr(u) || jr(f)) {
      if (r = o.vars, y = o.timeline = new ee({
        data: "nested",
        defaults: d || {},
        targets: S && S.data === "nested" ? S.vars.targets : b
      }), y.kill(), y.parent = y._dp = je(o), y._start = 0, c || jr(u) || jr(f)) {
        if (w = b.length, M = c && jo(c), He(c))
          for (C in c)
            ~ha.indexOf(C) && (R || (R = {}), R[C] = c[C]);
        for (T = 0; T < w; T++)
          k = Sn(r, ca), k.stagger = 0, v && (k.yoyoEase = v), R && Ii(k, R), P = b[T], k.duration = +Dr(u, je(o), T, P, b), k.delay = (+Dr(f, je(o), T, P, b) || 0) - o._delay, !c && w === 1 && k.delay && (o._delay = f = k.delay, o._start += f, k.delay = 0), y.to(P, k, M ? M(T, P, b) : 0), y._ease = j.none;
        y.duration() ? u = f = 0 : o.timeline = 0;
      } else if (p) {
        Er(Ce(y.vars.defaults, {
          ease: "none"
        })), y._ease = Ri(p.ease || r.ease || "none");
        var E = 0, W, B, Y;
        if (Yt(p))
          p.forEach(function(q) {
            return y.to(b, q, ">");
          }), y.duration();
        else {
          k = {};
          for (C in p)
            C === "ease" || C === "easeEach" || Il(C, p[C], k, p.easeEach);
          for (C in k)
            for (W = k[C].sort(function(q, L) {
              return q.t - L.t;
            }), E = 0, T = 0; T < W.length; T++)
              B = W[T], Y = {
                ease: B.e,
                duration: (B.t - (T ? W[T - 1].t : 0)) / 100 * u
              }, Y[C] = B.v, y.to(b, Y, E), E += Y.duration;
          y.duration() < u && y.to({}, {
            duration: u - y.duration()
          });
        }
      }
      u || o.duration(u = y.duration());
    } else
      o.timeline = 0;
    return h === !0 && !ks && (li = je(o), at.killTweensOf(b), li = 0), We(S, je(o), n), r.reversed && o.reverse(), r.paused && o.paused(!0), (_ || !u && !p && o._start === Dt(S._time) && ie(_) && _l(je(o)) && S.data !== "nested") && (o._tTime = -tt, o.render(Math.max(0, -f) || 0)), m && Ho(je(o), m), o;
  }
  var e = t.prototype;
  return e.render = function(r, n, s) {
    var o = this._time, l = this._tDur, u = this._dur, f = r < 0, _ = r > l - tt && !f ? l : r < tt ? 0 : r, c, h, p, d, m, v, S, b, y;
    if (!u)
      gl(this, r, n, s);
    else if (_ !== this._tTime || !r || s || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== f) {
      if (c = _, b = this.timeline, this._repeat) {
        if (d = u + this._rDelay, this._repeat < -1 && f)
          return this.totalTime(d * 100 + r, n, s);
        if (c = Dt(_ % d), _ === l ? (p = this._repeat, c = u) : (p = ~~(_ / d), p && p === _ / d && (c = u, p--), c > u && (c = u)), v = this._yoyo && p & 1, v && (y = this._yEase, c = u - c), m = ar(this._tTime, d), c === o && !s && this._initted)
          return this._tTime = _, this;
        p !== m && (b && this._yEase && aa(b, v), this.vars.repeatRefresh && !v && !this._lock && (this._lock = s = 1, this.render(Dt(d * p), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (Go(this, f ? r : c, s, n, _))
          return this._tTime = 0, this;
        if (o !== this._time)
          return this;
        if (u !== this._dur)
          return this.render(r, n, s);
      }
      if (this._tTime = _, this._time = c, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = S = (y || this._ease)(c / u), this._from && (this.ratio = S = 1 - S), c && !o && !n && !p && (Pe(this, "onStart"), this._tTime !== _))
        return this;
      for (h = this._pt; h; )
        h.r(S, h.d), h = h._next;
      b && b.render(r < 0 ? r : !c && v ? -tt : b._dur * b._ease(c / this._dur), n, s) || this._startAt && (this._zTime = r), this._onUpdate && !n && (f && ss(this, r, n, s), Pe(this, "onUpdate")), this._repeat && p !== m && this.vars.onRepeat && !n && this.parent && Pe(this, "onRepeat"), (_ === this._tDur || !_) && this._tTime === _ && (f && !this._onUpdate && ss(this, r, !0, !0), (r || !u) && (_ === this._tDur && this._ts > 0 || !_ && this._ts < 0) && mi(this, 1), !n && !(f && !o) && (_ || o || v) && (Pe(this, _ === l ? "onComplete" : "onReverseComplete", !0), this._prom && !(_ < l && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, e.targets = function() {
    return this._targets;
  }, e.invalidate = function(r) {
    return (!r || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(r), a.prototype.invalidate.call(this, r);
  }, e.resetTo = function(r, n, s, o) {
    Vr || _e.wake(), this._ts || this.play();
    var l = Math.min(this._dur, (this._dp._time - this._start) * this._ts), u;
    return this._initted || Ls(this, l), u = this._ease(l / this._dur), Ll(this, r, n, s, o, u, l) ? this.resetTo(r, n, s, o) : (Ln(this, 0), this.parent || $o(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, e.kill = function(r, n) {
    if (n === void 0 && (n = "all"), !r && (!n || n === "all"))
      return this._lazy = this._pt = 0, this.parent ? Sr(this) : this;
    if (this.timeline) {
      var s = this.timeline.totalDuration();
      return this.timeline.killTweensOf(r, n, li && li.vars.overwrite !== !0)._first || Sr(this), this.parent && s !== this.timeline.totalDuration() && lr(this, this._dur * this.timeline._tDur / s, 0, 1), this;
    }
    var o = this._targets, l = r ? Se(r) : o, u = this._ptLookup, f = this._pt, _, c, h, p, d, m, v;
    if ((!n || n === "all") && cl(o, l))
      return n === "all" && (this._pt = 0), Sr(this);
    for (_ = this._op = this._op || [], n !== "all" && (Mt(n) && (d = {}, re(n, function(S) {
      return d[S] = 1;
    }), n = d), n = Fl(o, n)), v = o.length; v--; )
      if (~l.indexOf(o[v])) {
        c = u[v], n === "all" ? (_[v] = n, p = c, h = {}) : (h = _[v] = _[v] || {}, p = n);
        for (d in p)
          m = c && c[d], m && ((!("kill" in m.d) || m.d.kill(d) === !0) && Rn(this, m, "_pt"), delete c[d]), h !== "all" && (h[d] = 1);
      }
    return this._initted && !this._pt && f && Sr(this), this;
  }, t.to = function(r, n) {
    return new t(r, n, arguments[2]);
  }, t.from = function(r, n) {
    return Ar(1, arguments);
  }, t.delayedCall = function(r, n, s, o) {
    return new t(n, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: r,
      onComplete: n,
      onReverseComplete: n,
      onCompleteParams: s,
      onReverseCompleteParams: s,
      callbackScope: o
    });
  }, t.fromTo = function(r, n, s) {
    return Ar(2, arguments);
  }, t.set = function(r, n) {
    return n.duration = 0, n.repeatDelay || (n.repeat = 0), new t(r, n);
  }, t.killTweensOf = function(r, n, s) {
    return at.killTweensOf(r, n, s);
  }, t;
}(fr);
Ce(xt.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
re("staggerTo,staggerFrom,staggerFromTo", function(a) {
  xt[a] = function() {
    var t = new ee(), e = as.call(arguments, 0);
    return e.splice(a === "staggerFromTo" ? 5 : 4, 0, 0), t[a].apply(t, e);
  };
});
var Fs = function(t, e, i) {
  return t[e] = i;
}, da = function(t, e, i) {
  return t[e](i);
}, Bl = function(t, e, i, r) {
  return t[e](r.fp, i);
}, Nl = function(t, e, i) {
  return t.setAttribute(e, i);
}, Is = function(t, e) {
  return ht(t[e]) ? da : Cs(t[e]) && t.setAttribute ? Nl : Fs;
}, _a = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e);
}, Yl = function(t, e) {
  return e.set(e.t, e.p, !!(e.s + e.c * t), e);
}, pa = function(t, e) {
  var i = e._pt, r = "";
  if (!t && e.b)
    r = e.b;
  else if (t === 1 && e.e)
    r = e.e;
  else {
    for (; i; )
      r = i.p + (i.m ? i.m(i.s + i.c * t) : Math.round((i.s + i.c * t) * 1e4) / 1e4) + r, i = i._next;
    r += e.c;
  }
  e.set(e.t, e.p, r, e);
}, Bs = function(t, e) {
  for (var i = e._pt; i; )
    i.r(t, i.d), i = i._next;
}, Xl = function(t, e, i, r) {
  for (var n = this._pt, s; n; )
    s = n._next, n.p === r && n.modifier(t, e, i), n = s;
}, Wl = function(t) {
  for (var e = this._pt, i, r; e; )
    r = e._next, e.p === t && !e.op || e.op === t ? Rn(this, e, "_pt") : e.dep || (i = 1), e = r;
  return !i;
}, Vl = function(t, e, i, r) {
  r.mSet(t, e, r.m.call(r.tween, i, r.mt), r);
}, ga = function(t) {
  for (var e = t._pt, i, r, n, s; e; ) {
    for (i = e._next, r = n; r && r.pr > e.pr; )
      r = r._next;
    (e._prev = r ? r._prev : s) ? e._prev._next = e : n = e, (e._next = r) ? r._prev = e : s = e, e = i;
  }
  t._pt = n;
}, ne = /* @__PURE__ */ function() {
  function a(e, i, r, n, s, o, l, u, f) {
    this.t = i, this.s = n, this.c = s, this.p = r, this.r = o || _a, this.d = l || this, this.set = u || Fs, this.pr = f || 0, this._next = e, e && (e._prev = this);
  }
  var t = a.prototype;
  return t.modifier = function(i, r, n) {
    this.mSet = this.mSet || this.set, this.set = Vl, this.m = i, this.mt = n, this.tween = r;
  }, a;
}();
re(Ds + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(a) {
  return As[a] = 1;
});
me.TweenMax = me.TweenLite = xt;
me.TimelineLite = me.TimelineMax = ee;
at = new ee({
  sortChildren: !1,
  defaults: or,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
ge.stringFilter = sa;
var hr = [], hn = {}, $l = [], io = 0, Vn = function(t) {
  return (hn[t] || $l).map(function(e) {
    return e();
  });
}, hs = function() {
  var t = Date.now(), e = [];
  t - io > 2 && (Vn("matchMediaInit"), hr.forEach(function(i) {
    var r = i.queries, n = i.conditions, s, o, l, u;
    for (o in r)
      s = we.matchMedia(r[o]).matches, s && (l = 1), s !== n[o] && (n[o] = s, u = 1);
    u && (i.revert(), l && e.push(i));
  }), Vn("matchMediaRevert"), e.forEach(function(i) {
    return i.onMatch(i);
  }), io = t, Vn("matchMedia"));
}, ma = /* @__PURE__ */ function() {
  function a(e, i) {
    this.selector = i && ls(i), this.data = [], this._r = [], this.isReverted = !1, e && this.add(e);
  }
  var t = a.prototype;
  return t.add = function(i, r, n) {
    ht(i) && (n = r, r = i, i = ht);
    var s = this, o = function() {
      var u = yt, f = s.selector, _;
      return u && u !== s && u.data.push(s), n && (s.selector = ls(n)), yt = s, _ = r.apply(s, arguments), ht(_) && s._r.push(_), yt = u, s.selector = f, s.isReverted = !1, _;
    };
    return s.last = o, i === ht ? o(s) : i ? s[i] = o : o;
  }, t.ignore = function(i) {
    var r = yt;
    yt = null, i(this), yt = r;
  }, t.getTweens = function() {
    var i = [];
    return this.data.forEach(function(r) {
      return r instanceof a ? i.push.apply(i, r.getTweens()) : r instanceof xt && !(r.parent && r.parent.data === "nested") && i.push(r);
    }), i;
  }, t.clear = function() {
    this._r.length = this.data.length = 0;
  }, t.kill = function(i, r) {
    var n = this;
    if (i) {
      var s = this.getTweens();
      this.data.forEach(function(l) {
        l.data === "isFlip" && (l.revert(), l.getChildren(!0, !0, !1).forEach(function(u) {
          return s.splice(s.indexOf(u), 1);
        }));
      }), s.map(function(l) {
        return {
          g: l.globalTime(0),
          t: l
        };
      }).sort(function(l, u) {
        return u.g - l.g || -1;
      }).forEach(function(l) {
        return l.t.revert(i);
      }), this.data.forEach(function(l) {
        return !(l instanceof fr) && l.revert && l.revert(i);
      }), this._r.forEach(function(l) {
        return l(i, n);
      }), this.isReverted = !0;
    } else
      this.data.forEach(function(l) {
        return l.kill && l.kill();
      });
    if (this.clear(), r) {
      var o = hr.indexOf(this);
      ~o && hr.splice(o, 1);
    }
  }, t.revert = function(i) {
    this.kill(i || {});
  }, a;
}(), Ul = /* @__PURE__ */ function() {
  function a(e) {
    this.contexts = [], this.scope = e;
  }
  var t = a.prototype;
  return t.add = function(i, r, n) {
    He(i) || (i = {
      matches: i
    });
    var s = new ma(0, n || this.scope), o = s.conditions = {}, l, u, f;
    this.contexts.push(s), r = s.add("onMatch", r), s.queries = i;
    for (u in i)
      u === "all" ? f = 1 : (l = we.matchMedia(i[u]), l && (hr.indexOf(s) < 0 && hr.push(s), (o[u] = l.matches) && (f = 1), l.addListener ? l.addListener(hs) : l.addEventListener("change", hs)));
    return f && r(s), this;
  }, t.revert = function(i) {
    this.kill(i || {});
  }, t.kill = function(i) {
    this.contexts.forEach(function(r) {
      return r.kill(i, !0);
    });
  }, a;
}(), kn = {
  registerPlugin: function() {
    for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
      e[i] = arguments[i];
    e.forEach(function(r) {
      return ia(r);
    });
  },
  timeline: function(t) {
    return new ee(t);
  },
  getTweensOf: function(t, e) {
    return at.getTweensOf(t, e);
  },
  getProperty: function(t, e, i, r) {
    Mt(t) && (t = Se(t)[0]);
    var n = Ai(t || {}).get, s = i ? Vo : Wo;
    return i === "native" && (i = ""), t && (e ? s((ce[e] && ce[e].get || n)(t, e, i, r)) : function(o, l, u) {
      return s((ce[o] && ce[o].get || n)(t, o, l, u));
    });
  },
  quickSetter: function(t, e, i) {
    if (t = Se(t), t.length > 1) {
      var r = t.map(function(f) {
        return se.quickSetter(f, e, i);
      }), n = r.length;
      return function(f) {
        for (var _ = n; _--; )
          r[_](f);
      };
    }
    t = t[0] || {};
    var s = ce[e], o = Ai(t), l = o.harness && (o.harness.aliases || {})[e] || e, u = s ? function(f) {
      var _ = new s();
      Qi._pt = 0, _.init(t, i ? f + i : f, Qi, 0, [t]), _.render(1, _), Qi._pt && Bs(1, Qi);
    } : o.set(t, l);
    return s ? u : function(f) {
      return u(t, l, i ? f + i : f, o, 1);
    };
  },
  quickTo: function(t, e, i) {
    var r, n = se.to(t, Ii((r = {}, r[e] = "+=0.1", r.paused = !0, r), i || {})), s = function(l, u, f) {
      return n.resetTo(e, l, u, f);
    };
    return s.tween = n, s;
  },
  isTweening: function(t) {
    return at.getTweensOf(t, !0).length > 0;
  },
  defaults: function(t) {
    return t && t.ease && (t.ease = Ri(t.ease, or.ease)), Zs(or, t || {});
  },
  config: function(t) {
    return Zs(ge, t || {});
  },
  registerEffect: function(t) {
    var e = t.name, i = t.effect, r = t.plugins, n = t.defaults, s = t.extendTimeline;
    (r || "").split(",").forEach(function(o) {
      return o && !ce[o] && !me[o] && bn(e + " effect requires " + o + " plugin.");
    }), Nn[e] = function(o, l, u) {
      return i(Se(o), Ce(l || {}, n), u);
    }, s && (ee.prototype[e] = function(o, l, u) {
      return this.add(Nn[e](o, He(l) ? l : (u = l) && {}, this), u);
    });
  },
  registerEase: function(t, e) {
    j[t] = Ri(e);
  },
  parseEase: function(t, e) {
    return arguments.length ? Ri(t, e) : j;
  },
  getById: function(t) {
    return at.getById(t);
  },
  exportRoot: function(t, e) {
    t === void 0 && (t = {});
    var i = new ee(t), r, n;
    for (i.smoothChildTiming = ie(t.smoothChildTiming), at.remove(i), i._dp = 0, i._time = i._tTime = at._time, r = at._first; r; )
      n = r._next, (e || !(!r._dur && r instanceof xt && r.vars.onComplete === r._targets[0])) && We(i, r, r._start - r._delay), r = n;
    return We(at, i, 0), i;
  },
  context: function(t, e) {
    return t ? new ma(t, e) : yt;
  },
  matchMedia: function(t) {
    return new Ul(t);
  },
  matchMediaRefresh: function() {
    return hr.forEach(function(t) {
      var e = t.conditions, i, r;
      for (r in e)
        e[r] && (e[r] = !1, i = 1);
      i && t.revert();
    }) || hs();
  },
  addEventListener: function(t, e) {
    var i = hn[t] || (hn[t] = []);
    ~i.indexOf(e) || i.push(e);
  },
  removeEventListener: function(t, e) {
    var i = hn[t], r = i && i.indexOf(e);
    r >= 0 && i.splice(r, 1);
  },
  utils: {
    wrap: Sl,
    wrapYoyo: Pl,
    distribute: jo,
    random: Qo,
    snap: Zo,
    normalize: Tl,
    getUnit: Bt,
    clamp: vl,
    splitColor: ra,
    toArray: Se,
    selector: ls,
    mapRange: ta,
    pipe: wl,
    unitize: bl,
    interpolate: kl,
    shuffle: Ko
  },
  install: Io,
  effects: Nn,
  ticker: _e,
  updateRoot: ee.updateRoot,
  plugins: ce,
  globalTimeline: at,
  core: {
    PropTween: ne,
    globals: Bo,
    Tween: xt,
    Timeline: ee,
    Animation: fr,
    getCache: Ai,
    _removeLinkedListItem: Rn,
    reverting: function() {
      return Nt;
    },
    context: function(t) {
      return t && yt && (yt.data.push(t), t._ctx = yt), yt;
    },
    suppressOverwrites: function(t) {
      return ks = t;
    }
  }
};
re("to,from,fromTo,delayedCall,set,killTweensOf", function(a) {
  return kn[a] = xt[a];
});
_e.add(ee.updateRoot);
Qi = kn.to({}, {
  duration: 0
});
var Hl = function(t, e) {
  for (var i = t._pt; i && i.p !== e && i.op !== e && i.fp !== e; )
    i = i._next;
  return i;
}, Gl = function(t, e) {
  var i = t._targets, r, n, s;
  for (r in e)
    for (n = i.length; n--; )
      s = t._ptLookup[n][r], s && (s = s.d) && (s._pt && (s = Hl(s, r)), s && s.modifier && s.modifier(e[r], t, i[n], r));
}, $n = function(t, e) {
  return {
    name: t,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(r, n, s) {
      s._onInit = function(o) {
        var l, u;
        if (Mt(n) && (l = {}, re(n, function(f) {
          return l[f] = 1;
        }), n = l), e) {
          l = {};
          for (u in n)
            l[u] = e(n[u]);
          n = l;
        }
        Gl(o, n);
      };
    }
  };
}, se = kn.registerPlugin({
  name: "attr",
  init: function(t, e, i, r, n) {
    var s, o, l;
    this.tween = i;
    for (s in e)
      l = t.getAttribute(s) || "", o = this.add(t, "setAttribute", (l || 0) + "", e[s], r, n, 0, 0, s), o.op = s, o.b = l, this._props.push(s);
  },
  render: function(t, e) {
    for (var i = e._pt; i; )
      Nt ? i.set(i.t, i.p, i.b, i) : i.r(t, i.d), i = i._next;
  }
}, {
  name: "endArray",
  init: function(t, e) {
    for (var i = e.length; i--; )
      this.add(t, i, t[i] || 0, e[i], 0, 0, 0, 0, 0, 1);
  }
}, $n("roundProps", us), $n("modifiers"), $n("snap", Zo)) || kn;
xt.version = ee.version = se.version = "3.11.5";
Fo = 1;
Os() && ur();
j.Power0;
j.Power1;
j.Power2;
j.Power3;
j.Power4;
j.Linear;
j.Quad;
j.Cubic;
j.Quart;
j.Quint;
j.Strong;
j.Elastic;
j.Back;
j.SteppedEase;
j.Bounce;
j.Sine;
j.Expo;
j.Circ;
/*!
 * CSSPlugin 3.11.5
 * https://greensock.com
 *
 * Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var ro, ui, ir, Ns, Mi, no, Ys, ql = function() {
  return typeof window < "u";
}, ii = {}, Ci = 180 / Math.PI, rr = Math.PI / 180, Hi = Math.atan2, so = 1e8, Xs = /([A-Z])/g, Kl = /(left|right|width|margin|padding|x)/i, jl = /[\s,\(]\S/, Ve = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, cs = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, Zl = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, Ql = function(t, e) {
  return e.set(e.t, e.p, t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, Jl = function(t, e) {
  var i = e.s + e.c * t;
  e.set(e.t, e.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + e.u, e);
}, ya = function(t, e) {
  return e.set(e.t, e.p, t ? e.e : e.b, e);
}, va = function(t, e) {
  return e.set(e.t, e.p, t !== 1 ? e.b : e.e, e);
}, tu = function(t, e, i) {
  return t.style[e] = i;
}, eu = function(t, e, i) {
  return t.style.setProperty(e, i);
}, iu = function(t, e, i) {
  return t._gsap[e] = i;
}, ru = function(t, e, i) {
  return t._gsap.scaleX = t._gsap.scaleY = i;
}, nu = function(t, e, i, r, n) {
  var s = t._gsap;
  s.scaleX = s.scaleY = i, s.renderTransform(n, s);
}, su = function(t, e, i, r, n) {
  var s = t._gsap;
  s[e] = i, s.renderTransform(n, s);
}, lt = "transform", Fe = lt + "Origin", ou = function a(t, e) {
  var i = this, r = this.target, n = r.style;
  if (t in ii) {
    if (this.tfm = this.tfm || {}, t !== "transform")
      t = Ve[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(s) {
        return i.tfm[s] = Ze(r, s);
      }) : this.tfm[t] = r._gsap.x ? r._gsap[t] : Ze(r, t);
    else
      return Ve.transform.split(",").forEach(function(s) {
        return a.call(i, s, e);
      });
    if (this.props.indexOf(lt) >= 0)
      return;
    r._gsap.svg && (this.svgo = r.getAttribute("data-svg-origin"), this.props.push(Fe, e, "")), t = lt;
  }
  (n || e) && this.props.push(t, e, n[t]);
}, xa = function(t) {
  t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
}, au = function() {
  var t = this.props, e = this.target, i = e.style, r = e._gsap, n, s;
  for (n = 0; n < t.length; n += 3)
    t[n + 1] ? e[t[n]] = t[n + 2] : t[n + 2] ? i[t[n]] = t[n + 2] : i.removeProperty(t[n].substr(0, 2) === "--" ? t[n] : t[n].replace(Xs, "-$1").toLowerCase());
  if (this.tfm) {
    for (s in this.tfm)
      r[s] = this.tfm[s];
    r.svg && (r.renderTransform(), e.setAttribute("data-svg-origin", this.svgo || "")), n = Ys(), (!n || !n.isStart) && !i[lt] && (xa(i), r.uncache = 1);
  }
}, wa = function(t, e) {
  var i = {
    target: t,
    props: [],
    revert: au,
    save: ou
  };
  return t._gsap || se.core.getCache(t), e && e.split(",").forEach(function(r) {
    return i.save(r);
  }), i;
}, ba, ds = function(t, e) {
  var i = ui.createElementNS ? ui.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : ui.createElement(t);
  return i.style ? i : ui.createElement(t);
}, $e = function a(t, e, i) {
  var r = getComputedStyle(t);
  return r[e] || r.getPropertyValue(e.replace(Xs, "-$1").toLowerCase()) || r.getPropertyValue(e) || !i && a(t, cr(e) || e, 1) || "";
}, oo = "O,Moz,ms,Ms,Webkit".split(","), cr = function(t, e, i) {
  var r = e || Mi, n = r.style, s = 5;
  if (t in n && !i)
    return t;
  for (t = t.charAt(0).toUpperCase() + t.substr(1); s-- && !(oo[s] + t in n); )
    ;
  return s < 0 ? null : (s === 3 ? "ms" : s >= 0 ? oo[s] : "") + t;
}, _s = function() {
  ql() && window.document && (ro = window, ui = ro.document, ir = ui.documentElement, Mi = ds("div") || {
    style: {}
  }, ds("div"), lt = cr(lt), Fe = lt + "Origin", Mi.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", ba = !!cr("perspective"), Ys = se.core.reverting, Ns = 1);
}, Un = function a(t) {
  var e = ds("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), i = this.parentNode, r = this.nextSibling, n = this.style.cssText, s;
  if (ir.appendChild(e), e.appendChild(this), this.style.display = "block", t)
    try {
      s = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = a;
    } catch {
    }
  else
    this._gsapBBox && (s = this._gsapBBox());
  return i && (r ? i.insertBefore(this, r) : i.appendChild(this)), ir.removeChild(e), this.style.cssText = n, s;
}, ao = function(t, e) {
  for (var i = e.length; i--; )
    if (t.hasAttribute(e[i]))
      return t.getAttribute(e[i]);
}, Ta = function(t) {
  var e;
  try {
    e = t.getBBox();
  } catch {
    e = Un.call(t, !0);
  }
  return e && (e.width || e.height) || t.getBBox === Un || (e = Un.call(t, !0)), e && !e.width && !e.x && !e.y ? {
    x: +ao(t, ["x", "cx", "x1"]) || 0,
    y: +ao(t, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : e;
}, Sa = function(t) {
  return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && Ta(t));
}, $r = function(t, e) {
  if (e) {
    var i = t.style;
    e in ii && e !== Fe && (e = lt), i.removeProperty ? ((e.substr(0, 2) === "ms" || e.substr(0, 6) === "webkit") && (e = "-" + e), i.removeProperty(e.replace(Xs, "-$1").toLowerCase())) : i.removeAttribute(e);
  }
}, fi = function(t, e, i, r, n, s) {
  var o = new ne(t._pt, e, i, 0, 1, s ? va : ya);
  return t._pt = o, o.b = r, o.e = n, t._props.push(i), o;
}, lo = {
  deg: 1,
  rad: 1,
  turn: 1
}, lu = {
  grid: 1,
  flex: 1
}, yi = function a(t, e, i, r) {
  var n = parseFloat(i) || 0, s = (i + "").trim().substr((n + "").length) || "px", o = Mi.style, l = Kl.test(e), u = t.tagName.toLowerCase() === "svg", f = (u ? "client" : "offset") + (l ? "Width" : "Height"), _ = 100, c = r === "px", h = r === "%", p, d, m, v;
  return r === s || !n || lo[r] || lo[s] ? n : (s !== "px" && !c && (n = a(t, e, i, "px")), v = t.getCTM && Sa(t), (h || s === "%") && (ii[e] || ~e.indexOf("adius")) ? (p = v ? t.getBBox()[l ? "width" : "height"] : t[f], pt(h ? n / p * _ : n / 100 * p)) : (o[l ? "width" : "height"] = _ + (c ? s : r), d = ~e.indexOf("adius") || r === "em" && t.appendChild && !u ? t : t.parentNode, v && (d = (t.ownerSVGElement || {}).parentNode), (!d || d === ui || !d.appendChild) && (d = ui.body), m = d._gsap, m && h && m.width && l && m.time === _e.time && !m.uncache ? pt(n / m.width * _) : ((h || s === "%") && !lu[$e(d, "display")] && (o.position = $e(t, "position")), d === t && (o.position = "static"), d.appendChild(Mi), p = Mi[f], d.removeChild(Mi), o.position = "absolute", l && h && (m = Ai(d), m.time = _e.time, m.width = d[f]), pt(c ? p * n / _ : p && n ? _ / p * n : 0))));
}, Ze = function(t, e, i, r) {
  var n;
  return Ns || _s(), e in Ve && e !== "transform" && (e = Ve[e], ~e.indexOf(",") && (e = e.split(",")[0])), ii[e] && e !== "transform" ? (n = Hr(t, r), n = e !== "transformOrigin" ? n[e] : n.svg ? n.origin : On($e(t, Fe)) + " " + n.zOrigin + "px") : (n = t.style[e], (!n || n === "auto" || r || ~(n + "").indexOf("calc(")) && (n = Cn[e] && Cn[e](t, e, i) || $e(t, e) || Yo(t, e) || (e === "opacity" ? 1 : 0))), i && !~(n + "").trim().indexOf(" ") ? yi(t, e, n, i) + i : n;
}, uu = function(t, e, i, r) {
  if (!i || i === "none") {
    var n = cr(e, t, 1), s = n && $e(t, n, 1);
    s && s !== i ? (e = n, i = s) : e === "borderColor" && (i = $e(t, "borderTopColor"));
  }
  var o = new ne(this._pt, t.style, e, 0, 1, pa), l = 0, u = 0, f, _, c, h, p, d, m, v, S, b, y, T;
  if (o.b = i, o.e = r, i += "", r += "", r === "auto" && (t.style[e] = r, r = $e(t, e) || r, t.style[e] = i), f = [i, r], sa(f), i = f[0], r = f[1], c = i.match(Zi) || [], T = r.match(Zi) || [], T.length) {
    for (; _ = Zi.exec(r); )
      m = _[0], S = r.substring(l, _.index), p ? p = (p + 1) % 5 : (S.substr(-5) === "rgba(" || S.substr(-5) === "hsla(") && (p = 1), m !== (d = c[u++] || "") && (h = parseFloat(d) || 0, y = d.substr((h + "").length), m.charAt(1) === "=" && (m = er(h, m) + y), v = parseFloat(m), b = m.substr((v + "").length), l = Zi.lastIndex - b.length, b || (b = b || ge.units[e] || y, l === r.length && (r += b, o.e += b)), y !== b && (h = yi(t, e, d, b) || 0), o._pt = {
        _next: o._pt,
        p: S || u === 1 ? S : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: h,
        c: v - h,
        m: p && p < 4 || e === "zIndex" ? Math.round : 0
      });
    o.c = l < r.length ? r.substring(l, r.length) : "";
  } else
    o.r = e === "display" && r === "none" ? va : ya;
  return zo.test(r) && (o.e = 0), this._pt = o, o;
}, uo = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, fu = function(t) {
  var e = t.split(" "), i = e[0], r = e[1] || "50%";
  return (i === "top" || i === "bottom" || r === "left" || r === "right") && (t = i, i = r, r = t), e[0] = uo[i] || i, e[1] = uo[r] || r, e.join(" ");
}, hu = function(t, e) {
  if (e.tween && e.tween._time === e.tween._dur) {
    var i = e.t, r = i.style, n = e.u, s = i._gsap, o, l, u;
    if (n === "all" || n === !0)
      r.cssText = "", l = 1;
    else
      for (n = n.split(","), u = n.length; --u > -1; )
        o = n[u], ii[o] && (l = 1, o = o === "transformOrigin" ? Fe : lt), $r(i, o);
    l && ($r(i, lt), s && (s.svg && i.removeAttribute("transform"), Hr(i, 1), s.uncache = 1, xa(r)));
  }
}, Cn = {
  clearProps: function(t, e, i, r, n) {
    if (n.data !== "isFromStart") {
      var s = t._pt = new ne(t._pt, e, i, 0, 0, hu);
      return s.u = r, s.pr = -10, s.tween = n, t._props.push(i), 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://greensock.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */
}, Ur = [1, 0, 0, 1, 0, 0], Pa = {}, ka = function(t) {
  return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
}, fo = function(t) {
  var e = $e(t, lt);
  return ka(e) ? Ur : e.substr(7).match(Ro).map(pt);
}, Ws = function(t, e) {
  var i = t._gsap || Ai(t), r = t.style, n = fo(t), s, o, l, u;
  return i.svg && t.getAttribute("transform") ? (l = t.transform.baseVal.consolidate().matrix, n = [l.a, l.b, l.c, l.d, l.e, l.f], n.join(",") === "1,0,0,1,0,0" ? Ur : n) : (n === Ur && !t.offsetParent && t !== ir && !i.svg && (l = r.display, r.display = "block", s = t.parentNode, (!s || !t.offsetParent) && (u = 1, o = t.nextElementSibling, ir.appendChild(t)), n = fo(t), l ? r.display = l : $r(t, "display"), u && (o ? s.insertBefore(t, o) : s ? s.appendChild(t) : ir.removeChild(t))), e && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n);
}, ps = function(t, e, i, r, n, s) {
  var o = t._gsap, l = n || Ws(t, !0), u = o.xOrigin || 0, f = o.yOrigin || 0, _ = o.xOffset || 0, c = o.yOffset || 0, h = l[0], p = l[1], d = l[2], m = l[3], v = l[4], S = l[5], b = e.split(" "), y = parseFloat(b[0]) || 0, T = parseFloat(b[1]) || 0, k, w, C, P;
  i ? l !== Ur && (w = h * m - p * d) && (C = y * (m / w) + T * (-d / w) + (d * S - m * v) / w, P = y * (-p / w) + T * (h / w) - (h * S - p * v) / w, y = C, T = P) : (k = Ta(t), y = k.x + (~b[0].indexOf("%") ? y / 100 * k.width : y), T = k.y + (~(b[1] || b[0]).indexOf("%") ? T / 100 * k.height : T)), r || r !== !1 && o.smooth ? (v = y - u, S = T - f, o.xOffset = _ + (v * h + S * d) - v, o.yOffset = c + (v * p + S * m) - S) : o.xOffset = o.yOffset = 0, o.xOrigin = y, o.yOrigin = T, o.smooth = !!r, o.origin = e, o.originIsAbsolute = !!i, t.style[Fe] = "0px 0px", s && (fi(s, o, "xOrigin", u, y), fi(s, o, "yOrigin", f, T), fi(s, o, "xOffset", _, o.xOffset), fi(s, o, "yOffset", c, o.yOffset)), t.setAttribute("data-svg-origin", y + " " + T);
}, Hr = function(t, e) {
  var i = t._gsap || new ua(t);
  if ("x" in i && !e && !i.uncache)
    return i;
  var r = t.style, n = i.scaleX < 0, s = "px", o = "deg", l = getComputedStyle(t), u = $e(t, Fe) || "0", f, _, c, h, p, d, m, v, S, b, y, T, k, w, C, P, M, R, E, W, B, Y, q, L, K, Q, g, et, Xt, Oe, ut, zt;
  return f = _ = c = d = m = v = S = b = y = 0, h = p = 1, i.svg = !!(t.getCTM && Sa(t)), l.translate && ((l.translate !== "none" || l.scale !== "none" || l.rotate !== "none") && (r[lt] = (l.translate !== "none" ? "translate3d(" + (l.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (l.rotate !== "none" ? "rotate(" + l.rotate + ") " : "") + (l.scale !== "none" ? "scale(" + l.scale.split(" ").join(",") + ") " : "") + (l[lt] !== "none" ? l[lt] : "")), r.scale = r.rotate = r.translate = "none"), w = Ws(t, i.svg), i.svg && (i.uncache ? (K = t.getBBox(), u = i.xOrigin - K.x + "px " + (i.yOrigin - K.y) + "px", L = "") : L = !e && t.getAttribute("data-svg-origin"), ps(t, L || u, !!L || i.originIsAbsolute, i.smooth !== !1, w)), T = i.xOrigin || 0, k = i.yOrigin || 0, w !== Ur && (R = w[0], E = w[1], W = w[2], B = w[3], f = Y = w[4], _ = q = w[5], w.length === 6 ? (h = Math.sqrt(R * R + E * E), p = Math.sqrt(B * B + W * W), d = R || E ? Hi(E, R) * Ci : 0, S = W || B ? Hi(W, B) * Ci + d : 0, S && (p *= Math.abs(Math.cos(S * rr))), i.svg && (f -= T - (T * R + k * W), _ -= k - (T * E + k * B))) : (zt = w[6], Oe = w[7], g = w[8], et = w[9], Xt = w[10], ut = w[11], f = w[12], _ = w[13], c = w[14], C = Hi(zt, Xt), m = C * Ci, C && (P = Math.cos(-C), M = Math.sin(-C), L = Y * P + g * M, K = q * P + et * M, Q = zt * P + Xt * M, g = Y * -M + g * P, et = q * -M + et * P, Xt = zt * -M + Xt * P, ut = Oe * -M + ut * P, Y = L, q = K, zt = Q), C = Hi(-W, Xt), v = C * Ci, C && (P = Math.cos(-C), M = Math.sin(-C), L = R * P - g * M, K = E * P - et * M, Q = W * P - Xt * M, ut = B * M + ut * P, R = L, E = K, W = Q), C = Hi(E, R), d = C * Ci, C && (P = Math.cos(C), M = Math.sin(C), L = R * P + E * M, K = Y * P + q * M, E = E * P - R * M, q = q * P - Y * M, R = L, Y = K), m && Math.abs(m) + Math.abs(d) > 359.9 && (m = d = 0, v = 180 - v), h = pt(Math.sqrt(R * R + E * E + W * W)), p = pt(Math.sqrt(q * q + zt * zt)), C = Hi(Y, q), S = Math.abs(C) > 2e-4 ? C * Ci : 0, y = ut ? 1 / (ut < 0 ? -ut : ut) : 0), i.svg && (L = t.getAttribute("transform"), i.forceCSS = t.setAttribute("transform", "") || !ka($e(t, lt)), L && t.setAttribute("transform", L))), Math.abs(S) > 90 && Math.abs(S) < 270 && (n ? (h *= -1, S += d <= 0 ? 180 : -180, d += d <= 0 ? 180 : -180) : (p *= -1, S += S <= 0 ? 180 : -180)), e = e || i.uncache, i.x = f - ((i.xPercent = f && (!e && i.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-f) ? -50 : 0))) ? t.offsetWidth * i.xPercent / 100 : 0) + s, i.y = _ - ((i.yPercent = _ && (!e && i.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-_) ? -50 : 0))) ? t.offsetHeight * i.yPercent / 100 : 0) + s, i.z = c + s, i.scaleX = pt(h), i.scaleY = pt(p), i.rotation = pt(d) + o, i.rotationX = pt(m) + o, i.rotationY = pt(v) + o, i.skewX = S + o, i.skewY = b + o, i.transformPerspective = y + s, (i.zOrigin = parseFloat(u.split(" ")[2]) || 0) && (r[Fe] = On(u)), i.xOffset = i.yOffset = 0, i.force3D = ge.force3D, i.renderTransform = i.svg ? du : ba ? Ca : cu, i.uncache = 0, i;
}, On = function(t) {
  return (t = t.split(" "))[0] + " " + t[1];
}, Hn = function(t, e, i) {
  var r = Bt(e);
  return pt(parseFloat(e) + parseFloat(yi(t, "x", i + "px", r))) + r;
}, cu = function(t, e) {
  e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, Ca(t, e);
}, Pi = "0deg", wr = "0px", ki = ") ", Ca = function(t, e) {
  var i = e || this, r = i.xPercent, n = i.yPercent, s = i.x, o = i.y, l = i.z, u = i.rotation, f = i.rotationY, _ = i.rotationX, c = i.skewX, h = i.skewY, p = i.scaleX, d = i.scaleY, m = i.transformPerspective, v = i.force3D, S = i.target, b = i.zOrigin, y = "", T = v === "auto" && t && t !== 1 || v === !0;
  if (b && (_ !== Pi || f !== Pi)) {
    var k = parseFloat(f) * rr, w = Math.sin(k), C = Math.cos(k), P;
    k = parseFloat(_) * rr, P = Math.cos(k), s = Hn(S, s, w * P * -b), o = Hn(S, o, -Math.sin(k) * -b), l = Hn(S, l, C * P * -b + b);
  }
  m !== wr && (y += "perspective(" + m + ki), (r || n) && (y += "translate(" + r + "%, " + n + "%) "), (T || s !== wr || o !== wr || l !== wr) && (y += l !== wr || T ? "translate3d(" + s + ", " + o + ", " + l + ") " : "translate(" + s + ", " + o + ki), u !== Pi && (y += "rotate(" + u + ki), f !== Pi && (y += "rotateY(" + f + ki), _ !== Pi && (y += "rotateX(" + _ + ki), (c !== Pi || h !== Pi) && (y += "skew(" + c + ", " + h + ki), (p !== 1 || d !== 1) && (y += "scale(" + p + ", " + d + ki), S.style[lt] = y || "translate(0, 0)";
}, du = function(t, e) {
  var i = e || this, r = i.xPercent, n = i.yPercent, s = i.x, o = i.y, l = i.rotation, u = i.skewX, f = i.skewY, _ = i.scaleX, c = i.scaleY, h = i.target, p = i.xOrigin, d = i.yOrigin, m = i.xOffset, v = i.yOffset, S = i.forceCSS, b = parseFloat(s), y = parseFloat(o), T, k, w, C, P;
  l = parseFloat(l), u = parseFloat(u), f = parseFloat(f), f && (f = parseFloat(f), u += f, l += f), l || u ? (l *= rr, u *= rr, T = Math.cos(l) * _, k = Math.sin(l) * _, w = Math.sin(l - u) * -c, C = Math.cos(l - u) * c, u && (f *= rr, P = Math.tan(u - f), P = Math.sqrt(1 + P * P), w *= P, C *= P, f && (P = Math.tan(f), P = Math.sqrt(1 + P * P), T *= P, k *= P)), T = pt(T), k = pt(k), w = pt(w), C = pt(C)) : (T = _, C = c, k = w = 0), (b && !~(s + "").indexOf("px") || y && !~(o + "").indexOf("px")) && (b = yi(h, "x", s, "px"), y = yi(h, "y", o, "px")), (p || d || m || v) && (b = pt(b + p - (p * T + d * w) + m), y = pt(y + d - (p * k + d * C) + v)), (r || n) && (P = h.getBBox(), b = pt(b + r / 100 * P.width), y = pt(y + n / 100 * P.height)), P = "matrix(" + T + "," + k + "," + w + "," + C + "," + b + "," + y + ")", h.setAttribute("transform", P), S && (h.style[lt] = P);
}, _u = function(t, e, i, r, n) {
  var s = 360, o = Mt(n), l = parseFloat(n) * (o && ~n.indexOf("rad") ? Ci : 1), u = l - r, f = r + u + "deg", _, c;
  return o && (_ = n.split("_")[1], _ === "short" && (u %= s, u !== u % (s / 2) && (u += u < 0 ? s : -s)), _ === "cw" && u < 0 ? u = (u + s * so) % s - ~~(u / s) * s : _ === "ccw" && u > 0 && (u = (u - s * so) % s - ~~(u / s) * s)), t._pt = c = new ne(t._pt, e, i, r, u, Zl), c.e = f, c.u = "deg", t._props.push(i), c;
}, ho = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, pu = function(t, e, i) {
  var r = ho({}, i._gsap), n = "perspective,force3D,transformOrigin,svgOrigin", s = i.style, o, l, u, f, _, c, h, p;
  r.svg ? (u = i.getAttribute("transform"), i.setAttribute("transform", ""), s[lt] = e, o = Hr(i, 1), $r(i, lt), i.setAttribute("transform", u)) : (u = getComputedStyle(i)[lt], s[lt] = e, o = Hr(i, 1), s[lt] = u);
  for (l in ii)
    u = r[l], f = o[l], u !== f && n.indexOf(l) < 0 && (h = Bt(u), p = Bt(f), _ = h !== p ? yi(i, l, u, p) : parseFloat(u), c = parseFloat(f), t._pt = new ne(t._pt, o, l, _, c - _, cs), t._pt.u = p || 0, t._props.push(l));
  ho(o, r);
};
re("padding,margin,Width,Radius", function(a, t) {
  var e = "Top", i = "Right", r = "Bottom", n = "Left", s = (t < 3 ? [e, i, r, n] : [e + n, e + i, r + i, r + n]).map(function(o) {
    return t < 2 ? a + o : "border" + o + a;
  });
  Cn[t > 1 ? "border" + a : a] = function(o, l, u, f, _) {
    var c, h;
    if (arguments.length < 4)
      return c = s.map(function(p) {
        return Ze(o, p, u);
      }), h = c.join(" "), h.split(c[0]).length === 5 ? c[0] : h;
    c = (f + "").split(" "), h = {}, s.forEach(function(p, d) {
      return h[p] = c[d] = c[d] || c[(d - 1) / 2 | 0];
    }), o.init(l, h, _);
  };
});
var Oa = {
  name: "css",
  register: _s,
  targetTest: function(t) {
    return t.style && t.nodeType;
  },
  init: function(t, e, i, r, n) {
    var s = this._props, o = t.style, l = i.vars.startAt, u, f, _, c, h, p, d, m, v, S, b, y, T, k, w, C;
    Ns || _s(), this.styles = this.styles || wa(t), C = this.styles.props, this.tween = i;
    for (d in e)
      if (d !== "autoRound" && (f = e[d], !(ce[d] && fa(d, e, i, r, t, n)))) {
        if (h = typeof f, p = Cn[d], h === "function" && (f = f.call(i, r, t, n), h = typeof f), h === "string" && ~f.indexOf("random(") && (f = Wr(f)), p)
          p(this, t, d, f, i) && (w = 1);
        else if (d.substr(0, 2) === "--")
          u = (getComputedStyle(t).getPropertyValue(d) + "").trim(), f += "", pi.lastIndex = 0, pi.test(u) || (m = Bt(u), v = Bt(f)), v ? m !== v && (u = yi(t, d, u, v) + v) : m && (f += m), this.add(o, "setProperty", u, f, r, n, 0, 0, d), s.push(d), C.push(d, 0, o[d]);
        else if (h !== "undefined") {
          if (l && d in l ? (u = typeof l[d] == "function" ? l[d].call(i, r, t, n) : l[d], Mt(u) && ~u.indexOf("random(") && (u = Wr(u)), Bt(u + "") || (u += ge.units[d] || Bt(Ze(t, d)) || ""), (u + "").charAt(1) === "=" && (u = Ze(t, d))) : u = Ze(t, d), c = parseFloat(u), S = h === "string" && f.charAt(1) === "=" && f.substr(0, 2), S && (f = f.substr(2)), _ = parseFloat(f), d in Ve && (d === "autoAlpha" && (c === 1 && Ze(t, "visibility") === "hidden" && _ && (c = 0), C.push("visibility", 0, o.visibility), fi(this, o, "visibility", c ? "inherit" : "hidden", _ ? "inherit" : "hidden", !_)), d !== "scale" && d !== "transform" && (d = Ve[d], ~d.indexOf(",") && (d = d.split(",")[0]))), b = d in ii, b) {
            if (this.styles.save(d), y || (T = t._gsap, T.renderTransform && !e.parseTransform || Hr(t, e.parseTransform), k = e.smoothOrigin !== !1 && T.smooth, y = this._pt = new ne(this._pt, o, lt, 0, 1, T.renderTransform, T, 0, -1), y.dep = 1), d === "scale")
              this._pt = new ne(this._pt, T, "scaleY", T.scaleY, (S ? er(T.scaleY, S + _) : _) - T.scaleY || 0, cs), this._pt.u = 0, s.push("scaleY", d), d += "X";
            else if (d === "transformOrigin") {
              C.push(Fe, 0, o[Fe]), f = fu(f), T.svg ? ps(t, f, 0, k, 0, this) : (v = parseFloat(f.split(" ")[2]) || 0, v !== T.zOrigin && fi(this, T, "zOrigin", T.zOrigin, v), fi(this, o, d, On(u), On(f)));
              continue;
            } else if (d === "svgOrigin") {
              ps(t, f, 1, k, 0, this);
              continue;
            } else if (d in Pa) {
              _u(this, T, d, c, S ? er(c, S + f) : f);
              continue;
            } else if (d === "smoothOrigin") {
              fi(this, T, "smooth", T.smooth, f);
              continue;
            } else if (d === "force3D") {
              T[d] = f;
              continue;
            } else if (d === "transform") {
              pu(this, f, t);
              continue;
            }
          } else
            d in o || (d = cr(d) || d);
          if (b || (_ || _ === 0) && (c || c === 0) && !jl.test(f) && d in o)
            m = (u + "").substr((c + "").length), _ || (_ = 0), v = Bt(f) || (d in ge.units ? ge.units[d] : m), m !== v && (c = yi(t, d, u, v)), this._pt = new ne(this._pt, b ? T : o, d, c, (S ? er(c, S + _) : _) - c, !b && (v === "px" || d === "zIndex") && e.autoRound !== !1 ? Jl : cs), this._pt.u = v || 0, m !== v && v !== "%" && (this._pt.b = u, this._pt.r = Ql);
          else if (d in o)
            uu.call(this, t, d, u, S ? S + f : f);
          else if (d in t)
            this.add(t, d, u || t[d], S ? S + f : f, r, n);
          else if (d !== "parseTransform") {
            Es(d, f);
            continue;
          }
          b || (d in o ? C.push(d, 0, o[d]) : C.push(d, 1, u || t[d])), s.push(d);
        }
      }
    w && ga(this);
  },
  render: function(t, e) {
    if (e.tween._time || !Ys())
      for (var i = e._pt; i; )
        i.r(t, i.d), i = i._next;
    else
      e.styles.revert();
  },
  get: Ze,
  aliases: Ve,
  getSetter: function(t, e, i) {
    var r = Ve[e];
    return r && r.indexOf(",") < 0 && (e = r), e in ii && e !== Fe && (t._gsap.x || Ze(t, "x")) ? i && no === i ? e === "scale" ? ru : iu : (no = i || {}) && (e === "scale" ? nu : su) : t.style && !Cs(t.style[e]) ? tu : ~e.indexOf("-") ? eu : Is(t, e);
  },
  core: {
    _removeProperty: $r,
    _getMatrix: Ws
  }
};
se.utils.checkPrefix = cr;
se.core.getStyleSaver = wa;
(function(a, t, e, i) {
  var r = re(a + "," + t + "," + e, function(n) {
    ii[n] = 1;
  });
  re(t, function(n) {
    ge.units[n] = "deg", Pa[n] = 1;
  }), Ve[r[13]] = a + "," + t, re(i, function(n) {
    var s = n.split(":");
    Ve[s[1]] = r[s[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
re("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(a) {
  ge.units[a] = "px";
});
se.registerPlugin(Oa);
var cn = se.registerPlugin(Oa) || se;
cn.core.Tween;
function co(a, t) {
  for (var e = 0; e < t.length; e++) {
    var i = t[e];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(a, i.key, i);
  }
}
function gu(a, t, e) {
  return t && co(a.prototype, t), e && co(a, e), a;
}
/*!
 * Observer 3.11.5
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var Rt, gs, pe, hi, ci, nr, Ma, Oi, Rr, Ea, Je, De, Aa, Da = function() {
  return Rt || typeof window < "u" && (Rt = window.gsap) && Rt.registerPlugin && Rt;
}, Ra = 1, Ji = [], U = [], Ue = [], zr = Date.now, ms = function(t, e) {
  return e;
}, mu = function() {
  var t = Rr.core, e = t.bridge || {}, i = t._scrollers, r = t._proxies;
  i.push.apply(i, U), r.push.apply(r, Ue), U = i, Ue = r, ms = function(s, o) {
    return e[s](o);
  };
}, gi = function(t, e) {
  return ~Ue.indexOf(t) && Ue[Ue.indexOf(t) + 1][e];
}, Lr = function(t) {
  return !!~Ea.indexOf(t);
}, Jt = function(t, e, i, r, n) {
  return t.addEventListener(e, i, {
    passive: !r,
    capture: !!n
  });
}, qt = function(t, e, i, r) {
  return t.removeEventListener(e, i, !!r);
}, Zr = "scrollLeft", Qr = "scrollTop", ys = function() {
  return Je && Je.isPressed || U.cache++;
}, Mn = function(t, e) {
  var i = function r(n) {
    if (n || n === 0) {
      Ra && (pe.history.scrollRestoration = "manual");
      var s = Je && Je.isPressed;
      n = r.v = Math.round(n) || (Je && Je.iOS ? 1 : 0), t(n), r.cacheID = U.cache, s && ms("ss", n);
    } else
      (e || U.cache !== r.cacheID || ms("ref")) && (r.cacheID = U.cache, r.v = t());
    return r.v + r.offset;
  };
  return i.offset = 0, t && i;
}, Zt = {
  s: Zr,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: Mn(function(a) {
    return arguments.length ? pe.scrollTo(a, wt.sc()) : pe.pageXOffset || hi[Zr] || ci[Zr] || nr[Zr] || 0;
  })
}, wt = {
  s: Qr,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: Zt,
  sc: Mn(function(a) {
    return arguments.length ? pe.scrollTo(Zt.sc(), a) : pe.pageYOffset || hi[Qr] || ci[Qr] || nr[Qr] || 0;
  })
}, te = function(t) {
  return Rt.utils.toArray(t)[0] || (typeof t == "string" && Rt.config().nullTargetWarn !== !1 ? console.warn("Element not found:", t) : null);
}, vi = function(t, e) {
  var i = e.s, r = e.sc;
  Lr(t) && (t = hi.scrollingElement || ci);
  var n = U.indexOf(t), s = r === wt.sc ? 1 : 2;
  !~n && (n = U.push(t) - 1), U[n + s] || t.addEventListener("scroll", ys);
  var o = U[n + s], l = o || (U[n + s] = Mn(gi(t, i), !0) || (Lr(t) ? r : Mn(function(u) {
    return arguments.length ? t[i] = u : t[i];
  })));
  return l.target = t, o || (l.smooth = Rt.getProperty(t, "scrollBehavior") === "smooth"), l;
}, vs = function(t, e, i) {
  var r = t, n = t, s = zr(), o = s, l = e || 50, u = Math.max(500, l * 3), f = function(p, d) {
    var m = zr();
    d || m - s > l ? (n = r, r = p, o = s, s = m) : i ? r += p : r = n + (p - n) / (m - o) * (s - o);
  }, _ = function() {
    n = r = i ? 0 : r, o = s = 0;
  }, c = function(p) {
    var d = o, m = n, v = zr();
    return (p || p === 0) && p !== r && f(p), s === o || v - o > u ? 0 : (r + (i ? m : -m)) / ((i ? v : s) - d) * 1e3;
  };
  return {
    update: f,
    reset: _,
    getVelocity: c
  };
}, br = function(t, e) {
  return e && !t._gsapAllow && t.preventDefault(), t.changedTouches ? t.changedTouches[0] : t;
}, _o = function(t) {
  var e = Math.max.apply(Math, t), i = Math.min.apply(Math, t);
  return Math.abs(e) >= Math.abs(i) ? e : i;
}, za = function() {
  Rr = Rt.core.globals().ScrollTrigger, Rr && Rr.core && mu();
}, La = function(t) {
  return Rt = t || Da(), Rt && typeof document < "u" && document.body && (pe = window, hi = document, ci = hi.documentElement, nr = hi.body, Ea = [pe, hi, ci, nr], Rt.utils.clamp, Aa = Rt.core.context || function() {
  }, Oi = "onpointerenter" in nr ? "pointer" : "mouse", Ma = vt.isTouch = pe.matchMedia && pe.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in pe || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, De = vt.eventTypes = ("ontouchstart" in ci ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in ci ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return Ra = 0;
  }, 500), za(), gs = 1), gs;
};
Zt.op = wt;
U.cache = 0;
var vt = /* @__PURE__ */ function() {
  function a(e) {
    this.init(e);
  }
  var t = a.prototype;
  return t.init = function(i) {
    gs || La(Rt) || console.warn("Please gsap.registerPlugin(Observer)"), Rr || za();
    var r = i.tolerance, n = i.dragMinimum, s = i.type, o = i.target, l = i.lineHeight, u = i.debounce, f = i.preventDefault, _ = i.onStop, c = i.onStopDelay, h = i.ignore, p = i.wheelSpeed, d = i.event, m = i.onDragStart, v = i.onDragEnd, S = i.onDrag, b = i.onPress, y = i.onRelease, T = i.onRight, k = i.onLeft, w = i.onUp, C = i.onDown, P = i.onChangeX, M = i.onChangeY, R = i.onChange, E = i.onToggleX, W = i.onToggleY, B = i.onHover, Y = i.onHoverEnd, q = i.onMove, L = i.ignoreCheck, K = i.isNormalizer, Q = i.onGestureStart, g = i.onGestureEnd, et = i.onWheel, Xt = i.onEnable, Oe = i.onDisable, ut = i.onClick, zt = i.scrollSpeed, it = i.capture, Lt = i.allowClicks, Wt = i.lockAxis, _r = i.onLockAxis;
    this.target = o = te(o) || ci, this.vars = i, h && (h = Rt.utils.toArray(h)), r = r || 1e-9, n = n || 0, p = p || 1, zt = zt || 1, s = s || "wheel,touch,pointer", u = u !== !1, l || (l = parseFloat(pe.getComputedStyle(nr).lineHeight) || 22);
    var oe, ye, H, bt, ae, Ie, Vt, x = this, Ge = 0, rt = 0, ri = vi(o, Zt), ni = vi(o, wt), Wi = ri(), $t = ni(), pr = ~s.indexOf("touch") && !~s.indexOf("pointer") && De[0] === "pointerdown", si = Lr(o), ct = o.ownerDocument || hi, le = [0, 0, 0], Ut = [0, 0, 0], gr = 0, Ht = function() {
      return gr = zr();
    }, Be = function(z, O) {
      return (x.event = z) && h && ~h.indexOf(z.target) || O && pr && z.pointerType !== "touch" || L && L(z, O);
    }, mr = function() {
      x._vx.reset(), x._vy.reset(), ye.pause(), _ && _(x);
    }, oi = function() {
      var z = x.deltaX = _o(le), O = x.deltaY = _o(Ut), D = Math.abs(z) >= r, F = Math.abs(O) >= r;
      R && (D || F) && R(x, z, O, le, Ut), D && (T && x.deltaX > 0 && T(x), k && x.deltaX < 0 && k(x), P && P(x), E && x.deltaX < 0 != Ge < 0 && E(x), Ge = x.deltaX, le[0] = le[1] = le[2] = 0), F && (C && x.deltaY > 0 && C(x), w && x.deltaY < 0 && w(x), M && M(x), W && x.deltaY < 0 != rt < 0 && W(x), rt = x.deltaY, Ut[0] = Ut[1] = Ut[2] = 0), (bt || H) && (q && q(x), H && (S(x), H = !1), bt = !1), Ie && !(Ie = !1) && _r && _r(x), ae && (et(x), ae = !1), oe = 0;
    }, Vi = function(z, O, D) {
      le[D] += z, Ut[D] += O, x._vx.update(z), x._vy.update(O), u ? oe || (oe = requestAnimationFrame(oi)) : oi();
    }, wi = function(z, O) {
      Wt && !Vt && (x.axis = Vt = Math.abs(z) > Math.abs(O) ? "x" : "y", Ie = !0), Vt !== "y" && (le[2] += z, x._vx.update(z, !0)), Vt !== "x" && (Ut[2] += O, x._vy.update(O, !0)), u ? oe || (oe = requestAnimationFrame(oi)) : oi();
    }, bi = function(z) {
      if (!Be(z, 1)) {
        z = br(z, f);
        var O = z.clientX, D = z.clientY, F = O - x.x, X = D - x.y, Tt = x.isDragging;
        x.x = O, x.y = D, (Tt || Math.abs(x.startX - O) >= n || Math.abs(x.startY - D) >= n) && (S && (H = !0), Tt || (x.isDragging = !0), wi(F, X), Tt || m && m(x));
      }
    }, $ = x.onPress = function(I) {
      Be(I, 1) || I && I.button || (x.axis = Vt = null, ye.pause(), x.isPressed = !0, I = br(I), Ge = rt = 0, x.startX = x.x = I.clientX, x.startY = x.y = I.clientY, x._vx.reset(), x._vy.reset(), Jt(K ? o : ct, De[1], bi, f, !0), x.deltaX = x.deltaY = 0, b && b(x));
    }, qe = x.onRelease = function(I) {
      if (!Be(I, 1)) {
        qt(K ? o : ct, De[1], bi, !0);
        var z = !isNaN(x.y - x.startY), O = x.isDragging && (Math.abs(x.x - x.startX) > 3 || Math.abs(x.y - x.startY) > 3), D = br(I);
        !O && z && (x._vx.reset(), x._vy.reset(), f && Lt && Rt.delayedCall(0.08, function() {
          if (zr() - gr > 300 && !I.defaultPrevented) {
            if (I.target.click)
              I.target.click();
            else if (ct.createEvent) {
              var F = ct.createEvent("MouseEvents");
              F.initMouseEvent("click", !0, !0, pe, 1, D.screenX, D.screenY, D.clientX, D.clientY, !1, !1, !1, !1, 0, null), I.target.dispatchEvent(F);
            }
          }
        })), x.isDragging = x.isGesturing = x.isPressed = !1, _ && !K && ye.restart(!0), v && O && v(x), y && y(x, O);
      }
    }, Me = function(z) {
      return z.touches && z.touches.length > 1 && (x.isGesturing = !0) && Q(z, x.isDragging);
    }, Ee = function() {
      return (x.isGesturing = !1) || g(x);
    }, ve = function(z) {
      if (!Be(z)) {
        var O = ri(), D = ni();
        Vi((O - Wi) * zt, (D - $t) * zt, 1), Wi = O, $t = D, _ && ye.restart(!0);
      }
    }, Ae = function(z) {
      if (!Be(z)) {
        z = br(z, f), et && (ae = !0);
        var O = (z.deltaMode === 1 ? l : z.deltaMode === 2 ? pe.innerHeight : 1) * p;
        Vi(z.deltaX * O, z.deltaY * O, 0), _ && !K && ye.restart(!0);
      }
    }, Ti = function(z) {
      if (!Be(z)) {
        var O = z.clientX, D = z.clientY, F = O - x.x, X = D - x.y;
        x.x = O, x.y = D, bt = !0, (F || X) && wi(F, X);
      }
    }, $i = function(z) {
      x.event = z, B(x);
    }, Ke = function(z) {
      x.event = z, Y(x);
    }, yr = function(z) {
      return Be(z) || br(z, f) && ut(x);
    };
    ye = x._dc = Rt.delayedCall(c || 0.25, mr).pause(), x.deltaX = x.deltaY = 0, x._vx = vs(0, 50, !0), x._vy = vs(0, 50, !0), x.scrollX = ri, x.scrollY = ni, x.isDragging = x.isGesturing = x.isPressed = !1, Aa(this), x.enable = function(I) {
      return x.isEnabled || (Jt(si ? ct : o, "scroll", ys), s.indexOf("scroll") >= 0 && Jt(si ? ct : o, "scroll", ve, f, it), s.indexOf("wheel") >= 0 && Jt(o, "wheel", Ae, f, it), (s.indexOf("touch") >= 0 && Ma || s.indexOf("pointer") >= 0) && (Jt(o, De[0], $, f, it), Jt(ct, De[2], qe), Jt(ct, De[3], qe), Lt && Jt(o, "click", Ht, !1, !0), ut && Jt(o, "click", yr), Q && Jt(ct, "gesturestart", Me), g && Jt(ct, "gestureend", Ee), B && Jt(o, Oi + "enter", $i), Y && Jt(o, Oi + "leave", Ke), q && Jt(o, Oi + "move", Ti)), x.isEnabled = !0, I && I.type && $(I), Xt && Xt(x)), x;
    }, x.disable = function() {
      x.isEnabled && (Ji.filter(function(I) {
        return I !== x && Lr(I.target);
      }).length || qt(si ? ct : o, "scroll", ys), x.isPressed && (x._vx.reset(), x._vy.reset(), qt(K ? o : ct, De[1], bi, !0)), qt(si ? ct : o, "scroll", ve, it), qt(o, "wheel", Ae, it), qt(o, De[0], $, it), qt(ct, De[2], qe), qt(ct, De[3], qe), qt(o, "click", Ht, !0), qt(o, "click", yr), qt(ct, "gesturestart", Me), qt(ct, "gestureend", Ee), qt(o, Oi + "enter", $i), qt(o, Oi + "leave", Ke), qt(o, Oi + "move", Ti), x.isEnabled = x.isPressed = x.isDragging = !1, Oe && Oe(x));
    }, x.kill = x.revert = function() {
      x.disable();
      var I = Ji.indexOf(x);
      I >= 0 && Ji.splice(I, 1), Je === x && (Je = 0);
    }, Ji.push(x), K && Lr(o) && (Je = x), x.enable(d);
  }, gu(a, [{
    key: "velocityX",
    get: function() {
      return this._vx.getVelocity();
    }
  }, {
    key: "velocityY",
    get: function() {
      return this._vy.getVelocity();
    }
  }]), a;
}();
vt.version = "3.11.5";
vt.create = function(a) {
  return new vt(a);
};
vt.register = La;
vt.getAll = function() {
  return Ji.slice();
};
vt.getById = function(a) {
  return Ji.filter(function(t) {
    return t.vars.id === a;
  })[0];
};
Da() && Rt.registerPlugin(vt);
/*!
 * ScrollTrigger 3.11.5
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var A, Ki, G, nt, ze, ft, Fa, En, An, tr, dn, Jr, It, Fn, xs, Kt, po, go, ji, Ia, Gn, Ba, fe, Na, Ya, Xa, ai, ws, Vs, qn, tn = 1, jt = Date.now, Kn = jt(), ke = 0, kr = 0, yu = function a() {
  return kr && requestAnimationFrame(a);
}, mo = function() {
  return Fn = 1;
}, yo = function() {
  return Fn = 0;
}, Xe = function(t) {
  return t;
}, Cr = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, Wa = function() {
  return typeof window < "u";
}, Va = function() {
  return A || Wa() && (A = window.gsap) && A.registerPlugin && A;
}, Bi = function(t) {
  return !!~Fa.indexOf(t);
}, $a = function(t) {
  return gi(t, "getBoundingClientRect") || (Bi(t) ? function() {
    return vn.width = G.innerWidth, vn.height = G.innerHeight, vn;
  } : function() {
    return Qe(t);
  });
}, vu = function(t, e, i) {
  var r = i.d, n = i.d2, s = i.a;
  return (s = gi(t, "getBoundingClientRect")) ? function() {
    return s()[r];
  } : function() {
    return (e ? G["inner" + n] : t["client" + n]) || 0;
  };
}, xu = function(t, e) {
  return !e || ~Ue.indexOf(t) ? $a(t) : function() {
    return vn;
  };
}, di = function(t, e) {
  var i = e.s, r = e.d2, n = e.d, s = e.a;
  return Math.max(0, (i = "scroll" + r) && (s = gi(t, i)) ? s() - $a(t)()[n] : Bi(t) ? (ze[i] || ft[i]) - (G["inner" + r] || ze["client" + r] || ft["client" + r]) : t[i] - t["offset" + r]);
}, en = function(t, e) {
  for (var i = 0; i < ji.length; i += 3)
    (!e || ~e.indexOf(ji[i + 1])) && t(ji[i], ji[i + 1], ji[i + 2]);
}, Re = function(t) {
  return typeof t == "string";
}, Qt = function(t) {
  return typeof t == "function";
}, Or = function(t) {
  return typeof t == "number";
}, _n = function(t) {
  return typeof t == "object";
}, Tr = function(t, e, i) {
  return t && t.progress(e ? 0 : 1) && i && t.pause();
}, jn = function(t, e) {
  if (t.enabled) {
    var i = e(t);
    i && i.totalTime && (t.callbackAnimation = i);
  }
}, Gi = Math.abs, Ua = "left", Ha = "top", $s = "right", Us = "bottom", zi = "width", Li = "height", Fr = "Right", Ir = "Left", Br = "Top", Nr = "Bottom", _t = "padding", be = "margin", dr = "Width", Hs = "Height", At = "px", Le = function(t) {
  return G.getComputedStyle(t);
}, wu = function(t) {
  var e = Le(t).position;
  t.style.position = e === "absolute" || e === "fixed" ? e : "relative";
}, vo = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, Qe = function(t, e) {
  var i = e && Le(t)[xs] !== "matrix(1, 0, 0, 1, 0, 0)" && A.to(t, {
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
    rotation: 0,
    rotationX: 0,
    rotationY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0
  }).progress(1), r = t.getBoundingClientRect();
  return i && i.progress(0).kill(), r;
}, bs = function(t, e) {
  var i = e.d2;
  return t["offset" + i] || t["client" + i] || 0;
}, Ga = function(t) {
  var e = [], i = t.labels, r = t.duration(), n;
  for (n in i)
    e.push(i[n] / r);
  return e;
}, bu = function(t) {
  return function(e) {
    return A.utils.snap(Ga(t), e);
  };
}, Gs = function(t) {
  var e = A.utils.snap(t), i = Array.isArray(t) && t.slice(0).sort(function(r, n) {
    return r - n;
  });
  return i ? function(r, n, s) {
    s === void 0 && (s = 1e-3);
    var o;
    if (!n)
      return e(r);
    if (n > 0) {
      for (r -= s, o = 0; o < i.length; o++)
        if (i[o] >= r)
          return i[o];
      return i[o - 1];
    } else
      for (o = i.length, r += s; o--; )
        if (i[o] <= r)
          return i[o];
    return i[0];
  } : function(r, n, s) {
    s === void 0 && (s = 1e-3);
    var o = e(r);
    return !n || Math.abs(o - r) < s || o - r < 0 == n < 0 ? o : e(n < 0 ? r - t : r + t);
  };
}, Tu = function(t) {
  return function(e, i) {
    return Gs(Ga(t))(e, i.direction);
  };
}, rn = function(t, e, i, r) {
  return i.split(",").forEach(function(n) {
    return t(e, n, r);
  });
}, Ot = function(t, e, i, r, n) {
  return t.addEventListener(e, i, {
    passive: !r,
    capture: !!n
  });
}, Ct = function(t, e, i, r) {
  return t.removeEventListener(e, i, !!r);
}, nn = function(t, e, i) {
  i = i && i.wheelHandler, i && (t(e, "wheel", i), t(e, "touchmove", i));
}, xo = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, sn = {
  toggleActions: "play",
  anticipatePin: 0
}, Dn = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, pn = function(t, e) {
  if (Re(t)) {
    var i = t.indexOf("="), r = ~i ? +(t.charAt(i - 1) + 1) * parseFloat(t.substr(i + 1)) : 0;
    ~i && (t.indexOf("%") > i && (r *= e / 100), t = t.substr(0, i - 1)), t = r + (t in Dn ? Dn[t] * e : ~t.indexOf("%") ? parseFloat(t) * e / 100 : parseFloat(t) || 0);
  }
  return t;
}, on = function(t, e, i, r, n, s, o, l) {
  var u = n.startColor, f = n.endColor, _ = n.fontSize, c = n.indent, h = n.fontWeight, p = nt.createElement("div"), d = Bi(i) || gi(i, "pinType") === "fixed", m = t.indexOf("scroller") !== -1, v = d ? ft : i, S = t.indexOf("start") !== -1, b = S ? u : f, y = "border-color:" + b + ";font-size:" + _ + ";color:" + b + ";font-weight:" + h + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return y += "position:" + ((m || l) && d ? "fixed;" : "absolute;"), (m || l || !d) && (y += (r === wt ? $s : Us) + ":" + (s + parseFloat(c)) + "px;"), o && (y += "box-sizing:border-box;text-align:left;width:" + o.offsetWidth + "px;"), p._isStart = S, p.setAttribute("class", "gsap-marker-" + t + (e ? " marker-" + e : "")), p.style.cssText = y, p.innerText = e || e === 0 ? t + "-" + e : t, v.children[0] ? v.insertBefore(p, v.children[0]) : v.appendChild(p), p._offset = p["offset" + r.op.d2], gn(p, 0, r, S), p;
}, gn = function(t, e, i, r) {
  var n = {
    display: "block"
  }, s = i[r ? "os2" : "p2"], o = i[r ? "p2" : "os2"];
  t._isFlipped = r, n[i.a + "Percent"] = r ? -100 : 0, n[i.a] = r ? "1px" : 0, n["border" + s + dr] = 1, n["border" + o + dr] = 0, n[i.p] = e + "px", A.set(t, n);
}, V = [], Ts = {}, Gr, wo = function() {
  return jt() - ke > 34 && (Gr || (Gr = requestAnimationFrame(ti)));
}, qi = function() {
  (!fe || !fe.isPressed || fe.startX > ft.clientWidth) && (U.cache++, fe ? Gr || (Gr = requestAnimationFrame(ti)) : ti(), ke || Yi("scrollStart"), ke = jt());
}, Zn = function() {
  Xa = G.innerWidth, Ya = G.innerHeight;
}, Mr = function() {
  U.cache++, !It && !Ba && !nt.fullscreenElement && !nt.webkitFullscreenElement && (!Na || Xa !== G.innerWidth || Math.abs(G.innerHeight - Ya) > G.innerHeight * 0.25) && En.restart(!0);
}, Ni = {}, Su = [], qa = function a() {
  return Ct(N, "scrollEnd", a) || Ei(!0);
}, Yi = function(t) {
  return Ni[t] && Ni[t].map(function(e) {
    return e();
  }) || Su;
}, he = [], Ka = function(t) {
  for (var e = 0; e < he.length; e += 5)
    (!t || he[e + 4] && he[e + 4].query === t) && (he[e].style.cssText = he[e + 1], he[e].getBBox && he[e].setAttribute("transform", he[e + 2] || ""), he[e + 3].uncache = 1);
}, qs = function(t, e) {
  var i;
  for (Kt = 0; Kt < V.length; Kt++)
    i = V[Kt], i && (!e || i._ctx === e) && (t ? i.kill(1) : i.revert(!0, !0));
  e && Ka(e), e || Yi("revert");
}, ja = function(t, e) {
  U.cache++, (e || !de) && U.forEach(function(i) {
    return Qt(i) && i.cacheID++ && (i.rec = 0);
  }), Re(t) && (G.history.scrollRestoration = Vs = t);
}, de, Fi = 0, bo, Pu = function() {
  if (bo !== Fi) {
    var t = bo = Fi;
    requestAnimationFrame(function() {
      return t === Fi && Ei(!0);
    });
  }
}, Ei = function(t, e) {
  if (ke && !t) {
    Ot(N, "scrollEnd", qa);
    return;
  }
  de = N.isRefreshing = !0, U.forEach(function(r) {
    return Qt(r) && r.cacheID++ && (r.rec = r());
  });
  var i = Yi("refreshInit");
  Ia && N.sort(), e || qs(), U.forEach(function(r) {
    Qt(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"), r(0));
  }), V.slice(0).forEach(function(r) {
    return r.refresh();
  }), V.forEach(function(r, n) {
    if (r._subPinOffset && r.pin) {
      var s = r.vars.horizontal ? "offsetWidth" : "offsetHeight", o = r.pin[s];
      r.revert(!0, 1), r.adjustPinSpacing(r.pin[s] - o), r.refresh();
    }
  }), V.forEach(function(r) {
    return r.vars.end === "max" && r.setPositions(r.start, Math.max(r.start + 1, di(r.scroller, r._dir)));
  }), i.forEach(function(r) {
    return r && r.render && r.render(-1);
  }), U.forEach(function(r) {
    Qt(r) && (r.smooth && requestAnimationFrame(function() {
      return r.target.style.scrollBehavior = "smooth";
    }), r.rec && r(r.rec));
  }), ja(Vs, 1), En.pause(), Fi++, de = 2, ti(2), V.forEach(function(r) {
    return Qt(r.vars.onRefresh) && r.vars.onRefresh(r);
  }), de = N.isRefreshing = !1, Yi("refresh");
}, Ss = 0, mn = 1, Yr, ti = function(t) {
  if (!de || t === 2) {
    N.isUpdating = !0, Yr && Yr.update(0);
    var e = V.length, i = jt(), r = i - Kn >= 50, n = e && V[0].scroll();
    if (mn = Ss > n ? -1 : 1, de || (Ss = n), r && (ke && !Fn && i - ke > 200 && (ke = 0, Yi("scrollEnd")), dn = Kn, Kn = i), mn < 0) {
      for (Kt = e; Kt-- > 0; )
        V[Kt] && V[Kt].update(0, r);
      mn = 1;
    } else
      for (Kt = 0; Kt < e; Kt++)
        V[Kt] && V[Kt].update(0, r);
    N.isUpdating = !1;
  }
  Gr = 0;
}, Ps = [Ua, Ha, Us, $s, be + Nr, be + Fr, be + Br, be + Ir, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], yn = Ps.concat([zi, Li, "boxSizing", "max" + dr, "max" + Hs, "position", be, _t, _t + Br, _t + Fr, _t + Nr, _t + Ir]), ku = function(t, e, i) {
  sr(i);
  var r = t._gsap;
  if (r.spacerIsNative)
    sr(r.spacerState);
  else if (t._gsap.swappedIn) {
    var n = e.parentNode;
    n && (n.insertBefore(t, e), n.removeChild(e));
  }
  t._gsap.swappedIn = !1;
}, Qn = function(t, e, i, r) {
  if (!t._gsap.swappedIn) {
    for (var n = Ps.length, s = e.style, o = t.style, l; n--; )
      l = Ps[n], s[l] = i[l];
    s.position = i.position === "absolute" ? "absolute" : "relative", i.display === "inline" && (s.display = "inline-block"), o[Us] = o[$s] = "auto", s.flexBasis = i.flexBasis || "auto", s.overflow = "visible", s.boxSizing = "border-box", s[zi] = bs(t, Zt) + At, s[Li] = bs(t, wt) + At, s[_t] = o[be] = o[Ha] = o[Ua] = "0", sr(r), o[zi] = o["max" + dr] = i[zi], o[Li] = o["max" + Hs] = i[Li], o[_t] = i[_t], t.parentNode !== e && (t.parentNode.insertBefore(e, t), e.appendChild(t)), t._gsap.swappedIn = !0;
  }
}, Cu = /([A-Z])/g, sr = function(t) {
  if (t) {
    var e = t.t.style, i = t.length, r = 0, n, s;
    for ((t.t._gsap || A.core.getCache(t.t)).uncache = 1; r < i; r += 2)
      s = t[r + 1], n = t[r], s ? e[n] = s : e[n] && e.removeProperty(n.replace(Cu, "-$1").toLowerCase());
  }
}, an = function(t) {
  for (var e = yn.length, i = t.style, r = [], n = 0; n < e; n++)
    r.push(yn[n], i[yn[n]]);
  return r.t = t, r;
}, Ou = function(t, e, i) {
  for (var r = [], n = t.length, s = i ? 8 : 0, o; s < n; s += 2)
    o = t[s], r.push(o, o in e ? e[o] : t[s + 1]);
  return r.t = t.t, r;
}, vn = {
  left: 0,
  top: 0
}, To = function(t, e, i, r, n, s, o, l, u, f, _, c, h) {
  Qt(t) && (t = t(l)), Re(t) && t.substr(0, 3) === "max" && (t = c + (t.charAt(4) === "=" ? pn("0" + t.substr(3), i) : 0));
  var p = h ? h.time() : 0, d, m, v;
  if (h && h.seek(0), Or(t))
    h && (t = A.utils.mapRange(h.scrollTrigger.start, h.scrollTrigger.end, 0, c, t)), o && gn(o, i, r, !0);
  else {
    Qt(e) && (e = e(l));
    var S = (t || "0").split(" "), b, y, T, k;
    v = te(e) || ft, b = Qe(v) || {}, (!b || !b.left && !b.top) && Le(v).display === "none" && (k = v.style.display, v.style.display = "block", b = Qe(v), k ? v.style.display = k : v.style.removeProperty("display")), y = pn(S[0], b[r.d]), T = pn(S[1] || "0", i), t = b[r.p] - u[r.p] - f + y + n - T, o && gn(o, T, r, i - T < 20 || o._isStart && T > 20), i -= i - T;
  }
  if (s) {
    var w = t + i, C = s._isStart;
    d = "scroll" + r.d2, gn(s, w, r, C && w > 20 || !C && (_ ? Math.max(ft[d], ze[d]) : s.parentNode[d]) <= w + 1), _ && (u = Qe(o), _ && (s.style[r.op.p] = u[r.op.p] - r.op.m - s._offset + At));
  }
  return h && v && (d = Qe(v), h.seek(c), m = Qe(v), h._caScrollDist = d[r.p] - m[r.p], t = t / h._caScrollDist * c), h && h.seek(p), h ? t : Math.round(t);
}, Mu = /(webkit|moz|length|cssText|inset)/i, So = function(t, e, i, r) {
  if (t.parentNode !== e) {
    var n = t.style, s, o;
    if (e === ft) {
      t._stOrig = n.cssText, o = Le(t);
      for (s in o)
        !+s && !Mu.test(s) && o[s] && typeof n[s] == "string" && s !== "0" && (n[s] = o[s]);
      n.top = i, n.left = r;
    } else
      n.cssText = t._stOrig;
    A.core.getCache(t).uncache = 1, e.appendChild(t);
  }
}, Za = function(t, e, i) {
  var r = e, n = r;
  return function(s) {
    var o = Math.round(t());
    return o !== r && o !== n && Math.abs(o - r) > 3 && Math.abs(o - n) > 3 && (s = o, i && i()), n = r, r = s, s;
  };
}, Po = function(t, e) {
  var i = vi(t, e), r = "_scroll" + e.p2, n = function s(o, l, u, f, _) {
    var c = s.tween, h = l.onComplete, p = {};
    u = u || i();
    var d = Za(i, u, function() {
      c.kill(), s.tween = 0;
    });
    return _ = f && _ || 0, f = f || o - u, c && c.kill(), l[r] = o, l.modifiers = p, p[r] = function() {
      return d(u + f * c.ratio + _ * c.ratio * c.ratio);
    }, l.onUpdate = function() {
      U.cache++, ti();
    }, l.onComplete = function() {
      s.tween = 0, h && h.call(c);
    }, c = s.tween = A.to(t, l), c;
  };
  return t[r] = i, i.wheelHandler = function() {
    return n.tween && n.tween.kill() && (n.tween = 0);
  }, Ot(t, "wheel", i.wheelHandler), N.isTouch && Ot(t, "touchmove", i.wheelHandler), n;
}, N = /* @__PURE__ */ function() {
  function a(e, i) {
    Ki || a.register(A) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), this.init(e, i);
  }
  var t = a.prototype;
  return t.init = function(i, r) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !kr) {
      this.update = this.refresh = this.kill = Xe;
      return;
    }
    i = vo(Re(i) || Or(i) || i.nodeType ? {
      trigger: i
    } : i, sn);
    var n = i, s = n.onUpdate, o = n.toggleClass, l = n.id, u = n.onToggle, f = n.onRefresh, _ = n.scrub, c = n.trigger, h = n.pin, p = n.pinSpacing, d = n.invalidateOnRefresh, m = n.anticipatePin, v = n.onScrubComplete, S = n.onSnapComplete, b = n.once, y = n.snap, T = n.pinReparent, k = n.pinSpacer, w = n.containerAnimation, C = n.fastScrollEnd, P = n.preventOverlaps, M = i.horizontal || i.containerAnimation && i.horizontal !== !1 ? Zt : wt, R = !_ && _ !== 0, E = te(i.scroller || G), W = A.core.getCache(E), B = Bi(E), Y = ("pinType" in i ? i.pinType : gi(E, "pinType") || B && "fixed") === "fixed", q = [i.onEnter, i.onLeave, i.onEnterBack, i.onLeaveBack], L = R && i.toggleActions.split(" "), K = "markers" in i ? i.markers : sn.markers, Q = B ? 0 : parseFloat(Le(E)["border" + M.p2 + dr]) || 0, g = this, et = i.onRefreshInit && function() {
      return i.onRefreshInit(g);
    }, Xt = vu(E, B, M), Oe = xu(E, B), ut = 0, zt = 0, it = vi(E, M), Lt, Wt, _r, oe, ye, H, bt, ae, Ie, Vt, x, Ge, rt, ri, ni, Wi, $t, pr, si, ct, le, Ut, gr, Ht, Be, mr, oi, Vi, wi, bi, $, qe, Me, Ee, ve, Ae, Ti, $i, Ke;
    if (ws(g), g._dir = M, m *= 45, g.scroller = E, g.scroll = w ? w.time.bind(w) : it, oe = it(), g.vars = i, r = r || i.animation, "refreshPriority" in i && (Ia = 1, i.refreshPriority === -9999 && (Yr = g)), W.tweenScroll = W.tweenScroll || {
      top: Po(E, wt),
      left: Po(E, Zt)
    }, g.tweenTo = Lt = W.tweenScroll[M.p], g.scrubDuration = function(O) {
      qe = Or(O) && O, qe ? $ ? $.duration(O) : $ = A.to(r, {
        ease: "expo",
        totalProgress: "+=0.001",
        duration: qe,
        paused: !0,
        onComplete: function() {
          return v && v(g);
        }
      }) : ($ && $.progress(1).kill(), $ = 0);
    }, r && (r.vars.lazy = !1, r._initted || r.vars.immediateRender !== !1 && i.immediateRender !== !1 && r.duration() && r.render(0, !0, !0), g.animation = r.pause(), r.scrollTrigger = g, g.scrubDuration(_), $ && $.resetTo && $.resetTo("totalProgress", 0), wi = 0, l || (l = r.vars.id)), V.push(g), y && ((!_n(y) || y.push) && (y = {
      snapTo: y
    }), "scrollBehavior" in ft.style && A.set(B ? [ft, ze] : E, {
      scrollBehavior: "auto"
    }), U.forEach(function(O) {
      return Qt(O) && O.target === (B ? nt.scrollingElement || ze : E) && (O.smooth = !1);
    }), _r = Qt(y.snapTo) ? y.snapTo : y.snapTo === "labels" ? bu(r) : y.snapTo === "labelsDirectional" ? Tu(r) : y.directional !== !1 ? function(O, D) {
      return Gs(y.snapTo)(O, jt() - zt < 500 ? 0 : D.direction);
    } : A.utils.snap(y.snapTo), Me = y.duration || {
      min: 0.1,
      max: 2
    }, Me = _n(Me) ? tr(Me.min, Me.max) : tr(Me, Me), Ee = A.delayedCall(y.delay || qe / 2 || 0.1, function() {
      var O = it(), D = jt() - zt < 500, F = Lt.tween;
      if ((D || Math.abs(g.getVelocity()) < 10) && !F && !Fn && ut !== O) {
        var X = (O - H) / rt, Tt = r && !R ? r.totalProgress() : X, Z = D ? 0 : (Tt - bi) / (jt() - dn) * 1e3 || 0, st = A.utils.clamp(-X, 1 - X, Gi(Z / 2) * Z / 0.185), Et = X + (y.inertia === !1 ? 0 : st), St = tr(0, 1, _r(Et, g)), gt = Math.round(H + St * rt), ot = y, ue = ot.onStart, Gt = ot.onInterrupt, Pt = ot.onComplete;
        if (O <= bt && O >= H && gt !== O) {
          if (F && !F._initted && F.data <= Gi(gt - O))
            return;
          y.inertia === !1 && (st = St - X), Lt(gt, {
            duration: Me(Gi(Math.max(Gi(Et - Tt), Gi(St - Tt)) * 0.185 / Z / 0.05 || 0)),
            ease: y.ease || "power3",
            data: Gi(gt - O),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return Ee.restart(!0) && Gt && Gt(g);
            },
            onComplete: function() {
              g.update(), ut = it(), wi = bi = r && !R ? r.totalProgress() : g.progress, S && S(g), Pt && Pt(g);
            }
          }, O, st * rt, gt - O - st * rt), ue && ue(g, Lt.tween);
        }
      } else
        g.isActive && ut !== O && Ee.restart(!0);
    }).pause()), l && (Ts[l] = g), c = g.trigger = te(c || h), Ke = c && c._gsap && c._gsap.stRevert, Ke && (Ke = Ke(g)), h = h === !0 ? c : te(h), Re(o) && (o = {
      targets: c,
      className: o
    }), h && (p === !1 || p === be || (p = !p && h.parentNode && h.parentNode.style && Le(h.parentNode).display === "flex" ? !1 : _t), g.pin = h, Wt = A.core.getCache(h), Wt.spacer ? ri = Wt.pinState : (k && (k = te(k), k && !k.nodeType && (k = k.current || k.nativeElement), Wt.spacerIsNative = !!k, k && (Wt.spacerState = an(k))), Wt.spacer = $t = k || nt.createElement("div"), $t.classList.add("pin-spacer"), l && $t.classList.add("pin-spacer-" + l), Wt.pinState = ri = an(h)), i.force3D !== !1 && A.set(h, {
      force3D: !0
    }), g.spacer = $t = Wt.spacer, Vi = Le(h), gr = Vi[p + M.os2], si = A.getProperty(h), ct = A.quickSetter(h, M.a, At), Qn(h, $t, Vi), Wi = an(h)), K) {
      Ge = _n(K) ? vo(K, xo) : xo, Vt = on("scroller-start", l, E, M, Ge, 0), x = on("scroller-end", l, E, M, Ge, 0, Vt), pr = Vt["offset" + M.op.d2];
      var yr = te(gi(E, "content") || E);
      ae = this.markerStart = on("start", l, yr, M, Ge, pr, 0, w), Ie = this.markerEnd = on("end", l, yr, M, Ge, pr, 0, w), w && ($i = A.quickSetter([ae, Ie], M.a, At)), !Y && !(Ue.length && gi(E, "fixedMarkers") === !0) && (wu(B ? ft : E), A.set([Vt, x], {
        force3D: !0
      }), Be = A.quickSetter(Vt, M.a, At), oi = A.quickSetter(x, M.a, At));
    }
    if (w) {
      var I = w.vars.onUpdate, z = w.vars.onUpdateParams;
      w.eventCallback("onUpdate", function() {
        g.update(0, 0, 1), I && I.apply(w, z || []);
      });
    }
    g.previous = function() {
      return V[V.indexOf(g) - 1];
    }, g.next = function() {
      return V[V.indexOf(g) + 1];
    }, g.revert = function(O, D) {
      if (!D)
        return g.kill(!0);
      var F = O !== !1 || !g.enabled, X = It;
      F !== g.isReverted && (F && (Ae = Math.max(it(), g.scroll.rec || 0), ve = g.progress, Ti = r && r.progress()), ae && [ae, Ie, Vt, x].forEach(function(Tt) {
        return Tt.style.display = F ? "none" : "block";
      }), F && (It = g, g.update(F)), h && (!T || !g.isActive) && (F ? ku(h, $t, ri) : Qn(h, $t, Le(h), Ht)), F || g.update(F), It = X, g.isReverted = F);
    }, g.refresh = function(O, D) {
      if (!((It || !g.enabled) && !D)) {
        if (h && O && ke) {
          Ot(a, "scrollEnd", qa);
          return;
        }
        !de && et && et(g), It = g, zt = jt(), Lt.tween && (Lt.tween.kill(), Lt.tween = 0), $ && $.pause(), d && r && r.revert({
          kill: !1
        }).invalidate(), g.isReverted || g.revert(!0, !0), g._subPinOffset = !1;
        for (var F = Xt(), X = Oe(), Tt = w ? w.duration() : di(E, M), Z = rt <= 0.01, st = 0, Et = 0, St = i.end, gt = i.endTrigger || c, ot = i.start || (i.start === 0 || !c ? 0 : h ? "0 0" : "0 100%"), ue = g.pinnedContainer = i.pinnedContainer && te(i.pinnedContainer), Gt = c && Math.max(0, V.indexOf(g)) || 0, Pt = Gt, dt, Ft, Ui, Si, mt, kt, Ne, In, Ks, vr, Ye; Pt--; )
          kt = V[Pt], kt.end || kt.refresh(0, 1) || (It = g), Ne = kt.pin, Ne && (Ne === c || Ne === h || Ne === ue) && !kt.isReverted && (vr || (vr = []), vr.unshift(kt), kt.revert(!0, !0)), kt !== V[Pt] && (Gt--, Pt--);
        for (Qt(ot) && (ot = ot(g)), H = To(ot, c, F, M, it(), ae, Vt, g, X, Q, Y, Tt, w) || (h ? -1e-3 : 0), Qt(St) && (St = St(g)), Re(St) && !St.indexOf("+=") && (~St.indexOf(" ") ? St = (Re(ot) ? ot.split(" ")[0] : "") + St : (st = pn(St.substr(2), F), St = Re(ot) ? ot : (w ? A.utils.mapRange(0, w.duration(), w.scrollTrigger.start, w.scrollTrigger.end, H) : H) + st, gt = c)), bt = Math.max(H, To(St || (gt ? "100% 0" : Tt), gt, F, M, it() + st, Ie, x, g, X, Q, Y, Tt, w)) || -1e-3, rt = bt - H || (H -= 0.01) && 1e-3, st = 0, Pt = Gt; Pt--; )
          kt = V[Pt], Ne = kt.pin, Ne && kt.start - kt._pinPush <= H && !w && kt.end > 0 && (dt = kt.end - kt.start, (Ne === c && kt.start - kt._pinPush < H || Ne === ue) && !Or(ot) && (st += dt * (1 - kt.progress)), Ne === h && (Et += dt));
        if (H += st, bt += st, Z && (ve = A.utils.clamp(0, 1, A.utils.normalize(H, bt, Ae))), g._pinPush = Et, ae && st && (dt = {}, dt[M.a] = "+=" + st, ue && (dt[M.p] = "-=" + it()), A.set([ae, Ie], dt)), h)
          dt = Le(h), Si = M === wt, Ui = it(), le = parseFloat(si(M.a)) + Et, !Tt && bt > 1 && (Ye = (B ? nt.scrollingElement || ze : E).style, Ye = {
            style: Ye,
            value: Ye["overflow" + M.a.toUpperCase()]
          }, Ye.style["overflow" + M.a.toUpperCase()] = "scroll"), Qn(h, $t, dt), Wi = an(h), Ft = Qe(h, !0), In = Y && vi(E, Si ? Zt : wt)(), p && (Ht = [p + M.os2, rt + Et + At], Ht.t = $t, Pt = p === _t ? bs(h, M) + rt + Et : 0, Pt && Ht.push(M.d, Pt + At), sr(Ht), ue && V.forEach(function(xr) {
            xr.pin === ue && xr.vars.pinSpacing !== !1 && (xr._subPinOffset = !0);
          }), Y && it(Ae)), Y && (mt = {
            top: Ft.top + (Si ? Ui - H : In) + At,
            left: Ft.left + (Si ? In : Ui - H) + At,
            boxSizing: "border-box",
            position: "fixed"
          }, mt[zi] = mt["max" + dr] = Math.ceil(Ft.width) + At, mt[Li] = mt["max" + Hs] = Math.ceil(Ft.height) + At, mt[be] = mt[be + Br] = mt[be + Fr] = mt[be + Nr] = mt[be + Ir] = "0", mt[_t] = dt[_t], mt[_t + Br] = dt[_t + Br], mt[_t + Fr] = dt[_t + Fr], mt[_t + Nr] = dt[_t + Nr], mt[_t + Ir] = dt[_t + Ir], ni = Ou(ri, mt, T), de && it(0)), r ? (Ks = r._initted, Gn(1), r.render(r.duration(), !0, !0), Ut = si(M.a) - le + rt + Et, mr = Math.abs(rt - Ut) > 1, Y && mr && ni.splice(ni.length - 2, 2), r.render(0, !0, !0), Ks || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), Gn(0)) : Ut = rt, Ye && (Ye.value ? Ye.style["overflow" + M.a.toUpperCase()] = Ye.value : Ye.style.removeProperty("overflow-" + M.a));
        else if (c && it() && !w)
          for (Ft = c.parentNode; Ft && Ft !== ft; )
            Ft._pinOffset && (H -= Ft._pinOffset, bt -= Ft._pinOffset), Ft = Ft.parentNode;
        vr && vr.forEach(function(xr) {
          return xr.revert(!1, !0);
        }), g.start = H, g.end = bt, oe = ye = de ? Ae : it(), !w && !de && (oe < Ae && it(Ae), g.scroll.rec = 0), g.revert(!1, !0), Ee && (ut = -1, g.isActive && it(H + rt * ve), Ee.restart(!0)), It = 0, r && R && (r._initted || Ti) && r.progress() !== Ti && r.progress(Ti, !0).render(r.time(), !0, !0), (Z || ve !== g.progress || w) && (r && !R && r.totalProgress(w && H < -1e-3 && !ve ? A.utils.normalize(H, bt, 0) : ve, !0), g.progress = (oe - H) / rt === ve ? 0 : ve), h && p && ($t._pinOffset = Math.round(g.progress * Ut)), $ && $.invalidate(), f && !de && f(g);
      }
    }, g.getVelocity = function() {
      return (it() - ye) / (jt() - dn) * 1e3 || 0;
    }, g.endAnimation = function() {
      Tr(g.callbackAnimation), r && ($ ? $.progress(1) : r.paused() ? R || Tr(r, g.direction < 0, 1) : Tr(r, r.reversed()));
    }, g.labelToScroll = function(O) {
      return r && r.labels && (H || g.refresh() || H) + r.labels[O] / r.duration() * rt || 0;
    }, g.getTrailing = function(O) {
      var D = V.indexOf(g), F = g.direction > 0 ? V.slice(0, D).reverse() : V.slice(D + 1);
      return (Re(O) ? F.filter(function(X) {
        return X.vars.preventOverlaps === O;
      }) : F).filter(function(X) {
        return g.direction > 0 ? X.end <= H : X.start >= bt;
      });
    }, g.update = function(O, D, F) {
      if (!(w && !F && !O)) {
        var X = de === !0 ? Ae : g.scroll(), Tt = O ? 0 : (X - H) / rt, Z = Tt < 0 ? 0 : Tt > 1 ? 1 : Tt || 0, st = g.progress, Et, St, gt, ot, ue, Gt, Pt, dt;
        if (D && (ye = oe, oe = w ? it() : X, y && (bi = wi, wi = r && !R ? r.totalProgress() : Z)), m && !Z && h && !It && !tn && ke && H < X + (X - ye) / (jt() - dn) * m && (Z = 1e-4), Z !== st && g.enabled) {
          if (Et = g.isActive = !!Z && Z < 1, St = !!st && st < 1, Gt = Et !== St, ue = Gt || !!Z != !!st, g.direction = Z > st ? 1 : -1, g.progress = Z, ue && !It && (gt = Z && !st ? 0 : Z === 1 ? 1 : st === 1 ? 2 : 3, R && (ot = !Gt && L[gt + 1] !== "none" && L[gt + 1] || L[gt], dt = r && (ot === "complete" || ot === "reset" || ot in r))), P && (Gt || dt) && (dt || _ || !r) && (Qt(P) ? P(g) : g.getTrailing(P).forEach(function(mt) {
            return mt.endAnimation();
          })), R || ($ && !It && !tn ? ($._dp._time - $._start !== $._time && $.render($._dp._time - $._start), $.resetTo ? $.resetTo("totalProgress", Z, r._tTime / r._tDur) : ($.vars.totalProgress = Z, $.invalidate().restart())) : r && r.totalProgress(Z, !!It)), h) {
            if (O && p && ($t.style[p + M.os2] = gr), !Y)
              ct(Cr(le + Ut * Z));
            else if (ue) {
              if (Pt = !O && Z > st && bt + 1 > X && X + 1 >= di(E, M), T)
                if (!O && (Et || Pt)) {
                  var Ft = Qe(h, !0), Ui = X - H;
                  So(h, ft, Ft.top + (M === wt ? Ui : 0) + At, Ft.left + (M === wt ? 0 : Ui) + At);
                } else
                  So(h, $t);
              sr(Et || Pt ? ni : Wi), mr && Z < 1 && Et || ct(le + (Z === 1 && !Pt ? Ut : 0));
            }
          }
          y && !Lt.tween && !It && !tn && Ee.restart(!0), o && (Gt || b && Z && (Z < 1 || !qn)) && An(o.targets).forEach(function(mt) {
            return mt.classList[Et || b ? "add" : "remove"](o.className);
          }), s && !R && !O && s(g), ue && !It ? (R && (dt && (ot === "complete" ? r.pause().totalProgress(1) : ot === "reset" ? r.restart(!0).pause() : ot === "restart" ? r.restart(!0) : r[ot]()), s && s(g)), (Gt || !qn) && (u && Gt && jn(g, u), q[gt] && jn(g, q[gt]), b && (Z === 1 ? g.kill(!1, 1) : q[gt] = 0), Gt || (gt = Z === 1 ? 1 : 3, q[gt] && jn(g, q[gt]))), C && !Et && Math.abs(g.getVelocity()) > (Or(C) ? C : 2500) && (Tr(g.callbackAnimation), $ ? $.progress(1) : Tr(r, ot === "reverse" ? 1 : !Z, 1))) : R && s && !It && s(g);
        }
        if (oi) {
          var Si = w ? X / w.duration() * (w._caScrollDist || 0) : X;
          Be(Si + (Vt._isFlipped ? 1 : 0)), oi(Si);
        }
        $i && $i(-X / w.duration() * (w._caScrollDist || 0));
      }
    }, g.enable = function(O, D) {
      g.enabled || (g.enabled = !0, Ot(E, "resize", Mr), Ot(B ? nt : E, "scroll", qi), et && Ot(a, "refreshInit", et), O !== !1 && (g.progress = ve = 0, oe = ye = ut = it()), D !== !1 && g.refresh());
    }, g.getTween = function(O) {
      return O && Lt ? Lt.tween : $;
    }, g.setPositions = function(O, D) {
      h && (le += O - H, Ut += D - O - rt, p === _t && g.adjustPinSpacing(D - O - rt)), g.start = H = O, g.end = bt = D, rt = D - O, g.update();
    }, g.adjustPinSpacing = function(O) {
      if (Ht && O) {
        var D = Ht.indexOf(M.d) + 1;
        Ht[D] = parseFloat(Ht[D]) + O + At, Ht[1] = parseFloat(Ht[1]) + O + At, sr(Ht);
      }
    }, g.disable = function(O, D) {
      if (g.enabled && (O !== !1 && g.revert(!0, !0), g.enabled = g.isActive = !1, D || $ && $.pause(), Ae = 0, Wt && (Wt.uncache = 1), et && Ct(a, "refreshInit", et), Ee && (Ee.pause(), Lt.tween && Lt.tween.kill() && (Lt.tween = 0)), !B)) {
        for (var F = V.length; F--; )
          if (V[F].scroller === E && V[F] !== g)
            return;
        Ct(E, "resize", Mr), Ct(E, "scroll", qi);
      }
    }, g.kill = function(O, D) {
      g.disable(O, D), $ && !D && $.kill(), l && delete Ts[l];
      var F = V.indexOf(g);
      F >= 0 && V.splice(F, 1), F === Kt && mn > 0 && Kt--, F = 0, V.forEach(function(X) {
        return X.scroller === g.scroller && (F = 1);
      }), F || de || (g.scroll.rec = 0), r && (r.scrollTrigger = null, O && r.revert({
        kill: !1
      }), D || r.kill()), ae && [ae, Ie, Vt, x].forEach(function(X) {
        return X.parentNode && X.parentNode.removeChild(X);
      }), Yr === g && (Yr = 0), h && (Wt && (Wt.uncache = 1), F = 0, V.forEach(function(X) {
        return X.pin === h && F++;
      }), F || (Wt.spacer = 0)), i.onKill && i.onKill(g);
    }, g.enable(!1, !1), Ke && Ke(g), !r || !r.add || rt ? g.refresh() : A.delayedCall(0.01, function() {
      return H || bt || g.refresh();
    }) && (rt = 0.01) && (H = bt = 0), h && Pu();
  }, a.register = function(i) {
    return Ki || (A = i || Va(), Wa() && window.document && a.enable(), Ki = kr), Ki;
  }, a.defaults = function(i) {
    if (i)
      for (var r in i)
        sn[r] = i[r];
    return sn;
  }, a.disable = function(i, r) {
    kr = 0, V.forEach(function(s) {
      return s[r ? "kill" : "disable"](i);
    }), Ct(G, "wheel", qi), Ct(nt, "scroll", qi), clearInterval(Jr), Ct(nt, "touchcancel", Xe), Ct(ft, "touchstart", Xe), rn(Ct, nt, "pointerdown,touchstart,mousedown", mo), rn(Ct, nt, "pointerup,touchend,mouseup", yo), En.kill(), en(Ct);
    for (var n = 0; n < U.length; n += 3)
      nn(Ct, U[n], U[n + 1]), nn(Ct, U[n], U[n + 2]);
  }, a.enable = function() {
    if (G = window, nt = document, ze = nt.documentElement, ft = nt.body, A && (An = A.utils.toArray, tr = A.utils.clamp, ws = A.core.context || Xe, Gn = A.core.suppressOverwrites || Xe, Vs = G.history.scrollRestoration || "auto", Ss = G.pageYOffset, A.core.globals("ScrollTrigger", a), ft)) {
      kr = 1, yu(), vt.register(A), a.isTouch = vt.isTouch, ai = vt.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), Ot(G, "wheel", qi), Fa = [G, nt, ze, ft], A.matchMedia ? (a.matchMedia = function(l) {
        var u = A.matchMedia(), f;
        for (f in l)
          u.add(f, l[f]);
        return u;
      }, A.addEventListener("matchMediaInit", function() {
        return qs();
      }), A.addEventListener("matchMediaRevert", function() {
        return Ka();
      }), A.addEventListener("matchMedia", function() {
        Ei(0, 1), Yi("matchMedia");
      }), A.matchMedia("(orientation: portrait)", function() {
        return Zn(), Zn;
      })) : console.warn("Requires GSAP 3.11.0 or later"), Zn(), Ot(nt, "scroll", qi);
      var i = ft.style, r = i.borderTopStyle, n = A.core.Animation.prototype, s, o;
      for (n.revert || Object.defineProperty(n, "revert", {
        value: function() {
          return this.time(-0.01, !0);
        }
      }), i.borderTopStyle = "solid", s = Qe(ft), wt.m = Math.round(s.top + wt.sc()) || 0, Zt.m = Math.round(s.left + Zt.sc()) || 0, r ? i.borderTopStyle = r : i.removeProperty("border-top-style"), Jr = setInterval(wo, 250), A.delayedCall(0.5, function() {
        return tn = 0;
      }), Ot(nt, "touchcancel", Xe), Ot(ft, "touchstart", Xe), rn(Ot, nt, "pointerdown,touchstart,mousedown", mo), rn(Ot, nt, "pointerup,touchend,mouseup", yo), xs = A.utils.checkPrefix("transform"), yn.push(xs), Ki = jt(), En = A.delayedCall(0.2, Ei).pause(), ji = [nt, "visibilitychange", function() {
        var l = G.innerWidth, u = G.innerHeight;
        nt.hidden ? (po = l, go = u) : (po !== l || go !== u) && Mr();
      }, nt, "DOMContentLoaded", Ei, G, "load", Ei, G, "resize", Mr], en(Ot), V.forEach(function(l) {
        return l.enable(0, 1);
      }), o = 0; o < U.length; o += 3)
        nn(Ct, U[o], U[o + 1]), nn(Ct, U[o], U[o + 2]);
    }
  }, a.config = function(i) {
    "limitCallbacks" in i && (qn = !!i.limitCallbacks);
    var r = i.syncInterval;
    r && clearInterval(Jr) || (Jr = r) && setInterval(wo, r), "ignoreMobileResize" in i && (Na = a.isTouch === 1 && i.ignoreMobileResize), "autoRefreshEvents" in i && (en(Ct) || en(Ot, i.autoRefreshEvents || "none"), Ba = (i.autoRefreshEvents + "").indexOf("resize") === -1);
  }, a.scrollerProxy = function(i, r) {
    var n = te(i), s = U.indexOf(n), o = Bi(n);
    ~s && U.splice(s, o ? 6 : 2), r && (o ? Ue.unshift(G, r, ft, r, ze, r) : Ue.unshift(n, r));
  }, a.clearMatchMedia = function(i) {
    V.forEach(function(r) {
      return r._ctx && r._ctx.query === i && r._ctx.kill(!0, !0);
    });
  }, a.isInViewport = function(i, r, n) {
    var s = (Re(i) ? te(i) : i).getBoundingClientRect(), o = s[n ? zi : Li] * r || 0;
    return n ? s.right - o > 0 && s.left + o < G.innerWidth : s.bottom - o > 0 && s.top + o < G.innerHeight;
  }, a.positionInViewport = function(i, r, n) {
    Re(i) && (i = te(i));
    var s = i.getBoundingClientRect(), o = s[n ? zi : Li], l = r == null ? o / 2 : r in Dn ? Dn[r] * o : ~r.indexOf("%") ? parseFloat(r) * o / 100 : parseFloat(r) || 0;
    return n ? (s.left + l) / G.innerWidth : (s.top + l) / G.innerHeight;
  }, a.killAll = function(i) {
    if (V.slice(0).forEach(function(n) {
      return n.vars.id !== "ScrollSmoother" && n.kill();
    }), i !== !0) {
      var r = Ni.killAll || [];
      Ni = {}, r.forEach(function(n) {
        return n();
      });
    }
  }, a;
}();
N.version = "3.11.5";
N.saveStyles = function(a) {
  return a ? An(a).forEach(function(t) {
    if (t && t.style) {
      var e = he.indexOf(t);
      e >= 0 && he.splice(e, 5), he.push(t, t.style.cssText, t.getBBox && t.getAttribute("transform"), A.core.getCache(t), ws());
    }
  }) : he;
};
N.revert = function(a, t) {
  return qs(!a, t);
};
N.create = function(a, t) {
  return new N(a, t);
};
N.refresh = function(a) {
  return a ? Mr() : (Ki || N.register()) && Ei(!0);
};
N.update = function(a) {
  return ++U.cache && ti(a === !0 ? 2 : 0);
};
N.clearScrollMemory = ja;
N.maxScroll = function(a, t) {
  return di(a, t ? Zt : wt);
};
N.getScrollFunc = function(a, t) {
  return vi(te(a), t ? Zt : wt);
};
N.getById = function(a) {
  return Ts[a];
};
N.getAll = function() {
  return V.filter(function(a) {
    return a.vars.id !== "ScrollSmoother";
  });
};
N.isScrolling = function() {
  return !!ke;
};
N.snapDirectional = Gs;
N.addEventListener = function(a, t) {
  var e = Ni[a] || (Ni[a] = []);
  ~e.indexOf(t) || e.push(t);
};
N.removeEventListener = function(a, t) {
  var e = Ni[a], i = e && e.indexOf(t);
  i >= 0 && e.splice(i, 1);
};
N.batch = function(a, t) {
  var e = [], i = {}, r = t.interval || 0.016, n = t.batchMax || 1e9, s = function(u, f) {
    var _ = [], c = [], h = A.delayedCall(r, function() {
      f(_, c), _ = [], c = [];
    }).pause();
    return function(p) {
      _.length || h.restart(!0), _.push(p.trigger), c.push(p), n <= _.length && h.progress(1);
    };
  }, o;
  for (o in t)
    i[o] = o.substr(0, 2) === "on" && Qt(t[o]) && o !== "onRefreshInit" ? s(o, t[o]) : t[o];
  return Qt(n) && (n = n(), Ot(N, "refresh", function() {
    return n = t.batchMax();
  })), An(a).forEach(function(l) {
    var u = {};
    for (o in i)
      u[o] = i[o];
    u.trigger = l, e.push(N.create(u));
  }), e;
};
var ko = function(t, e, i, r) {
  return e > r ? t(r) : e < 0 && t(0), i > r ? (r - e) / (i - e) : i < 0 ? e / (e - i) : 1;
}, Jn = function a(t, e) {
  e === !0 ? t.style.removeProperty("touch-action") : t.style.touchAction = e === !0 ? "auto" : e ? "pan-" + e + (vt.isTouch ? " pinch-zoom" : "") : "none", t === ze && a(ft, e);
}, ln = {
  auto: 1,
  scroll: 1
}, Eu = function(t) {
  var e = t.event, i = t.target, r = t.axis, n = (e.changedTouches ? e.changedTouches[0] : e).target, s = n._gsap || A.core.getCache(n), o = jt(), l;
  if (!s._isScrollT || o - s._isScrollT > 2e3) {
    for (; n && n !== ft && (n.scrollHeight <= n.clientHeight && n.scrollWidth <= n.clientWidth || !(ln[(l = Le(n)).overflowY] || ln[l.overflowX])); )
      n = n.parentNode;
    s._isScroll = n && n !== i && !Bi(n) && (ln[(l = Le(n)).overflowY] || ln[l.overflowX]), s._isScrollT = o;
  }
  (s._isScroll || r === "x") && (e.stopPropagation(), e._gsapAllow = !0);
}, Qa = function(t, e, i, r) {
  return vt.create({
    target: t,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: e,
    onWheel: r = r && Eu,
    onPress: r,
    onDrag: r,
    onScroll: r,
    onEnable: function() {
      return i && Ot(nt, vt.eventTypes[0], Oo, !1, !0);
    },
    onDisable: function() {
      return Ct(nt, vt.eventTypes[0], Oo, !0);
    }
  });
}, Au = /(input|label|select|textarea)/i, Co, Oo = function(t) {
  var e = Au.test(t.target.tagName);
  (e || Co) && (t._gsapAllow = !0, Co = e);
}, Du = function(t) {
  _n(t) || (t = {}), t.preventDefault = t.isNormalizer = t.allowClicks = !0, t.type || (t.type = "wheel,touch"), t.debounce = !!t.debounce, t.id = t.id || "normalizer";
  var e = t, i = e.normalizeScrollX, r = e.momentum, n = e.allowNestedScroll, s = e.onRelease, o, l, u = te(t.target) || ze, f = A.core.globals().ScrollSmoother, _ = f && f.get(), c = ai && (t.content && te(t.content) || _ && t.content !== !1 && !_.smooth() && _.content()), h = vi(u, wt), p = vi(u, Zt), d = 1, m = (vt.isTouch && G.visualViewport ? G.visualViewport.scale * G.visualViewport.width : G.outerWidth) / G.innerWidth, v = 0, S = Qt(r) ? function() {
    return r(o);
  } : function() {
    return r || 2.8;
  }, b, y, T = Qa(u, t.type, !0, n), k = function() {
    return y = !1;
  }, w = Xe, C = Xe, P = function() {
    l = di(u, wt), C = tr(ai ? 1 : 0, l), i && (w = tr(0, di(u, Zt))), b = Fi;
  }, M = function() {
    c._gsap.y = Cr(parseFloat(c._gsap.y) + h.offset) + "px", c.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(c._gsap.y) + ", 0, 1)", h.offset = h.cacheID = 0;
  }, R = function() {
    if (y) {
      requestAnimationFrame(k);
      var K = Cr(o.deltaY / 2), Q = C(h.v - K);
      if (c && Q !== h.v + h.offset) {
        h.offset = Q - h.v;
        var g = Cr((parseFloat(c && c._gsap.y) || 0) - h.offset);
        c.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + g + ", 0, 1)", c._gsap.y = g + "px", h.cacheID = U.cache, ti();
      }
      return !0;
    }
    h.offset && M(), y = !0;
  }, E, W, B, Y, q = function() {
    P(), E.isActive() && E.vars.scrollY > l && (h() > l ? E.progress(1) && h(l) : E.resetTo("scrollY", l));
  };
  return c && A.set(c, {
    y: "+=0"
  }), t.ignoreCheck = function(L) {
    return ai && L.type === "touchmove" && R() || d > 1.05 && L.type !== "touchstart" || o.isGesturing || L.touches && L.touches.length > 1;
  }, t.onPress = function() {
    y = !1;
    var L = d;
    d = Cr((G.visualViewport && G.visualViewport.scale || 1) / m), E.pause(), L !== d && Jn(u, d > 1.01 ? !0 : i ? !1 : "x"), W = p(), B = h(), P(), b = Fi;
  }, t.onRelease = t.onGestureStart = function(L, K) {
    if (h.offset && M(), !K)
      Y.restart(!0);
    else {
      U.cache++;
      var Q = S(), g, et;
      i && (g = p(), et = g + Q * 0.05 * -L.velocityX / 0.227, Q *= ko(p, g, et, di(u, Zt)), E.vars.scrollX = w(et)), g = h(), et = g + Q * 0.05 * -L.velocityY / 0.227, Q *= ko(h, g, et, di(u, wt)), E.vars.scrollY = C(et), E.invalidate().duration(Q).play(0.01), (ai && E.vars.scrollY >= l || g >= l - 1) && A.to({}, {
        onUpdate: q,
        duration: Q
      });
    }
    s && s(L);
  }, t.onWheel = function() {
    E._ts && E.pause(), jt() - v > 1e3 && (b = 0, v = jt());
  }, t.onChange = function(L, K, Q, g, et) {
    if (Fi !== b && P(), K && i && p(w(g[2] === K ? W + (L.startX - L.x) : p() + K - g[1])), Q) {
      h.offset && M();
      var Xt = et[2] === Q, Oe = Xt ? B + L.startY - L.y : h() + Q - et[1], ut = C(Oe);
      Xt && Oe !== ut && (B += ut - Oe), h(ut);
    }
    (Q || K) && ti();
  }, t.onEnable = function() {
    Jn(u, i ? !1 : "x"), N.addEventListener("refresh", q), Ot(G, "resize", q), h.smooth && (h.target.style.scrollBehavior = "auto", h.smooth = p.smooth = !1), T.enable();
  }, t.onDisable = function() {
    Jn(u, !0), Ct(G, "resize", q), N.removeEventListener("refresh", q), T.kill();
  }, t.lockAxis = t.lockAxis !== !1, o = new vt(t), o.iOS = ai, ai && !h() && h(1), ai && A.ticker.add(Xe), Y = o._dc, E = A.to(o, {
    ease: "power4",
    paused: !0,
    scrollX: i ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: Za(h, h(), function() {
        return E.pause();
      })
    },
    onUpdate: ti,
    onComplete: Y.vars.onComplete
  }), o;
};
N.sort = function(a) {
  return V.sort(a || function(t, e) {
    return (t.vars.refreshPriority || 0) * -1e6 + t.start - (e.start + (e.vars.refreshPriority || 0) * -1e6);
  });
};
N.observe = function(a) {
  return new vt(a);
};
N.normalizeScroll = function(a) {
  if (typeof a > "u")
    return fe;
  if (a === !0 && fe)
    return fe.enable();
  if (a === !1)
    return fe && fe.kill();
  var t = a instanceof vt ? a : Du(a);
  return fe && fe.target === t.target && fe.kill(), Bi(t.target) && (fe = t), t;
};
N.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: vs,
  _inputObserver: Qa,
  _scrollers: U,
  _proxies: Ue,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function() {
      ke || Yi("scrollStart"), ke = jt();
    },
    // a way to get the _refreshing value in Observer
    ref: function() {
      return It;
    }
  }
};
Va() && A.registerPlugin(N);
const qr = {
  prefix: "byc",
  // Animate Content
  animateStart: "top 70%",
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
  scrollContent: document.documentElement,
  scrollOrientation: "vertical",
  // todo: testing
  scrollGestureOrientation: "vertical",
  // todo: testing
  scrollDuration: 1.2,
  scrollEasing: (a) => Math.min(1, 1.001 - Math.pow(2, -10 * a)),
  scrollInfinite: !1,
  scrollLerp: 0.1,
  scrollNormalizeWheel: !0,
  scrollTouchMultiplier: 2,
  scrollWheelMultiplier: 1,
  scrollWrapper: window
};
class Ru {
  constructor(t = {}, e) {
    Object.assign(this, qr, t), this.Lenis = e, this.init();
  }
  init() {
    function t({ scroll: i, limit: r, velocity: n, direction: s, progress: o }) {
      console.log(i, r, n, s, o);
    }
    window.lenis = new this.Lenis({
      content: this.scrollContent,
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
      wrapper: this.scrollWrapper,
      scrollCallback: t
    }), window.scrollDirection = "down", lenis.on("scroll", ({ direction: i, progress: r }) => {
      i === 1 ? window.scrollDirection = "down" : window.scrollDirection = "up";
    });
    function e(i) {
      lenis.raf(i), requestAnimationFrame(e);
    }
    requestAnimationFrame(e);
  }
}
class zu {
  constructor(t = {}, e, i) {
    this.options = t, Object.assign(this, qr, t), this.gsap = e, this.ScrollTrigger = i, this.prefix = t.prefix ? t.prefix : qr.prefix, this.init();
  }
  init() {
    const t = document.querySelectorAll("[data-animate]");
    t && this.gsap.utils.toArray(t).forEach((e) => {
      e.hasAttribute("data-animate-duration") && e.style.setProperty(`--${this.prefix}-animate-duration`, e.getAttribute("data-animate-duration") + "s"), e.hasAttribute("data-opacity-duration") && e.style.setProperty(`--${this.prefix}-animate-opacity-duration`, e.getAttribute("data-opacity-duration") + "s"), e.hasAttribute("data-slide-duration") && e.style.setProperty(`--${this.prefix}-animate-slide-duration`, e.getAttribute("data-slide-duration") + "s"), e.hasAttribute("data-animate-delay") && e.style.setProperty(`--${this.prefix}-animate-delay`, e.getAttribute("data-animate-delay") + "s"), e.hasAttribute("data-animate-easing") && e.style.setProperty(`--${this.prefix}-animate-easing`, e.getAttribute("data-animate-easing")), e.hasAttribute("data-animate-offset") && e.style.setProperty(`--${this.prefix}-animate-slide-offset`, e.getAttribute("data-animate-offset")), e.hasAttribute("data-animate-border-radius") && e.style.setProperty(`--${this.prefix}-animate-border-radius`, e.getAttribute("data-animate-border-radius")), e.hasAttribute("data-animate-background") && e.style.setProperty(`--${this.prefix}-animate-background-color`, e.getAttribute("data-animate-background")), e.hasAttribute("data-animate-foreground") && e.style.setProperty(`--${this.prefix}-reveal-foreground-color`, e.getAttribute("data-animate-foreground")), e.hasAttribute("data-animate-opacity-start") && e.style.setProperty(`--${this.prefix}-animate-opacity-start`, e.getAttribute("data-animate-opacity-start")), e.hasAttribute("data-animate-opacity-end") && e.style.setProperty(`--${this.prefix}-animate-opacity-end`, e.getAttribute("data-animate-opacity-end")), e.hasAttribute("data-animate-zoom-end") && e.style.setProperty(`--${this.prefix}-animate-zoom-end`, e.getAttribute("data-animate-zoom-end")), e.hasAttribute("data-animate-zoom-start") && e.style.setProperty(`--${this.prefix}-animate-zoom-start`, e.getAttribute("data-animate-zoom-start")), e.hasAttribute("data-animate-zoom-end") && e.style.setProperty(`--${this.prefix}-animate-zoom-end`, e.getAttribute("data-animate-zoom-end"));
      const r = e.getAttribute("data-animate-repeat") === "true";
      this.ScrollTrigger.create({
        trigger: e.dataset.animateTrigger ? e.dataset.animateTrigger : e,
        start: e.dataset.animateStart ? e.dataset.animateStart : this.animateStart,
        end: e.dataset.animateEnd ? e.dataset.animateEnd : this.animateEnd,
        markers: this.animateMarkers,
        onEnter: () => {
          e.classList.add(this.inViewClass);
        },
        onEnterBack: () => {
          e.classList.add(this.inViewClass), e.classList.remove(this.outViewClass);
        },
        onLeave: () => {
          r == !0 && e.classList.add(this.outViewClass);
        },
        onLeaveBack: () => {
          r && e.classList.remove(this.inViewClass);
        },
        once: !r
      });
    });
  }
}
class Lu {
  constructor(t = {}, e, i) {
    Object.assign(this, qr, t), this.gsap = e, this.ScrollTrigger = i, this.init();
  }
  init() {
    this.gsap.utils.toArray("[data-parallax-from]").forEach((t) => {
      if (t.getAttribute("data-parallax-to")) {
        const e = JSON.parse(t.getAttribute("data-parallax-from")), i = JSON.parse(t.getAttribute("data-parallax-to")), r = t.getAttribute("data-parallax-scrub");
        let n = r;
        r === "true" || r === "false" ? n = r === "true" : n = Number(r);
        const s = this.gsap.fromTo(t, e, i);
        this.ScrollTrigger.create({
          trigger: t.dataset.parallaxTrigger ? t.dataset.parallaxTrigger : t,
          start: t.dataset.parallaxStart ? t.dataset.parallaxStart : this.parallaxStart,
          end: t.dataset.parallaxEnd ? t.dataset.parallaxEnd : this.parallaxEnd,
          scrub: r ? n : this.parallaxScrub,
          animation: s,
          markers: this.parallaxMarkers
        });
      } else
        console.log("ERROR: data-parallax-to value is missing");
    });
  }
}
class Fu {
  constructor(t = {}) {
    cn.registerPlugin(N), this.options = t, Object.assign(this, qr, t), this.init();
  }
  init() {
    console.log(this.options), this.smoothScroll && new Ru(this.options, il), this.initAnimations();
  }
  initAnimations() {
    new zu(this.options, cn, N), new Lu(this.options, cn, N);
  }
  destroy(t = !0, e = !0) {
    t && N.killAll(), e && window.lenis.destroy();
  }
  refresh() {
    N.refresh();
  }
  scrollTo(t, e) {
    window.lenis.scrollTo(t, e);
  }
  start() {
    window.lenis.start();
  }
  stop() {
    window.lenis.stop();
  }
}
export {
  Fu as default
};
