function ts() {
  return ts = Object.assign ? Object.assign.bind() : function(a) {
    for (var t = 1; t < arguments.length; t++) {
      var i = arguments[t];
      for (var e in i)
        Object.prototype.hasOwnProperty.call(i, e) && (a[e] = i[e]);
    }
    return a;
  }, ts.apply(this, arguments);
}
function vn(a, t, i) {
  return Math.max(a, Math.min(t, i));
}
class Ja {
  advance(t) {
    var i;
    if (!this.isRunning)
      return;
    let e = !1;
    if (this.lerp)
      this.value = (r = this.value, n = this.to, (1 - (s = 1 - Math.exp(-60 * this.lerp * t))) * r + s * n), Math.round(this.value) === this.to && (this.value = this.to, e = !0);
    else {
      this.currentTime += t;
      const o = vn(0, this.currentTime / this.duration, 1);
      e = o >= 1;
      const l = e ? 1 : this.easing(o);
      this.value = this.from + (this.to - this.from) * l;
    }
    var r, n, s;
    (i = this.onUpdate) == null || i.call(this, this.value, e), e && this.stop();
  }
  stop() {
    this.isRunning = !1;
  }
  fromTo(t, i, { lerp: e = 0.1, duration: r = 1, easing: n = (l) => l, onStart: s, onUpdate: o }) {
    this.from = this.value = t, this.to = i, this.lerp = e, this.duration = r, this.easing = n, this.currentTime = 0, this.isRunning = !0, s == null || s(), this.onUpdate = o;
  }
}
class tl {
  constructor({ wrapper: t, content: i, autoResize: e = !0 } = {}) {
    if (this.resize = () => {
      this.onWrapperResize(), this.onContentResize();
    }, this.onWrapperResize = () => {
      this.wrapper === window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight);
    }, this.onContentResize = () => {
      this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth;
    }, this.wrapper = t, this.content = i, e) {
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
    var t, i;
    (t = this.wrapperResizeObserver) == null || t.disconnect(), (i = this.contentResizeObserver) == null || i.disconnect();
  }
  get limit() {
    return { x: this.scrollWidth - this.width, y: this.scrollHeight - this.height };
  }
}
class Mo {
  constructor() {
    this.events = {};
  }
  emit(t, ...i) {
    let e = this.events[t] || [];
    for (let r = 0, n = e.length; r < n; r++)
      e[r](...i);
  }
  on(t, i) {
    var e;
    return (e = this.events[t]) != null && e.push(i) || (this.events[t] = [i]), () => {
      var r;
      this.events[t] = (r = this.events[t]) == null ? void 0 : r.filter((n) => i !== n);
    };
  }
  off(t, i) {
    var e;
    this.events[t] = (e = this.events[t]) == null ? void 0 : e.filter((r) => i !== r);
  }
  destroy() {
    this.events = {};
  }
}
class el {
  constructor(t, { wheelMultiplier: i = 1, touchMultiplier: e = 2, normalizeWheel: r = !1 }) {
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
      this.normalizeWheel && (s = vn(-100, s, 100), o = vn(-100, o, 100)), s *= this.wheelMultiplier, o *= this.wheelMultiplier, this.emitter.emit("scroll", { deltaX: s, deltaY: o, event: n });
    }, this.element = t, this.wheelMultiplier = i, this.touchMultiplier = e, this.normalizeWheel = r, this.touchStart = { x: null, y: null }, this.emitter = new Mo(), this.element.addEventListener("wheel", this.onWheel, { passive: !1 }), this.element.addEventListener("touchstart", this.onTouchStart, { passive: !1 }), this.element.addEventListener("touchmove", this.onTouchMove, { passive: !1 }), this.element.addEventListener("touchend", this.onTouchEnd, { passive: !1 });
  }
  on(t, i) {
    return this.emitter.on(t, i);
  }
  destroy() {
    this.emitter.destroy(), this.element.removeEventListener("wheel", this.onWheel, { passive: !1 }), this.element.removeEventListener("touchstart", this.onTouchStart, { passive: !1 }), this.element.removeEventListener("touchmove", this.onTouchMove, { passive: !1 }), this.element.removeEventListener("touchend", this.onTouchEnd, { passive: !1 });
  }
}
class il {
  constructor({ wrapper: t = window, content: i = document.documentElement, wheelEventsTarget: e = t, smoothWheel: r = !0, smoothTouch: n = !1, syncTouch: s = !1, syncTouchLerp: o = 0.1, __iosNoInertiaSyncTouchLerp: l = 0.4, touchInertiaMultiplier: u = 35, duration: f, easing: d = (y) => Math.min(1, 1.001 - Math.pow(2, -10 * y)), lerp: c = f && 0.1, infinite: h = !1, orientation: p = "vertical", gestureOrientation: _ = "vertical", touchMultiplier: m = 1, wheelMultiplier: v = 1, normalizeWheel: S = !1, autoResize: b = !0 } = {}) {
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
    }, window.lenisVersion = "1.0.25", t !== document.documentElement && t !== document.body || (t = window), this.options = { wrapper: t, content: i, wheelEventsTarget: e, smoothWheel: r, smoothTouch: n, syncTouch: s, syncTouchLerp: o, __iosNoInertiaSyncTouchLerp: l, touchInertiaMultiplier: u, duration: f, easing: d, lerp: c, infinite: h, gestureOrientation: _, orientation: p, touchMultiplier: m, wheelMultiplier: v, normalizeWheel: S, autoResize: b }, this.animate = new Ja(), this.emitter = new Mo(), this.dimensions = new tl({ wrapper: t, content: i, autoResize: b }), this.toggleClass("lenis", !0), this.velocity = 0, this.isStopped = !1, this.isSmooth = r || n, this.isScrolling = !1, this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onScroll, { passive: !1 }), this.virtualScroll = new el(e, { touchMultiplier: m, wheelMultiplier: v, normalizeWheel: S }), this.virtualScroll.on("scroll", this.onVirtualScroll);
  }
  destroy() {
    this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onScroll, { passive: !1 }), this.virtualScroll.destroy(), this.dimensions.destroy(), this.toggleClass("lenis", !1), this.toggleClass("lenis-smooth", !1), this.toggleClass("lenis-scrolling", !1), this.toggleClass("lenis-stopped", !1);
  }
  on(t, i) {
    return this.emitter.on(t, i);
  }
  off(t, i) {
    return this.emitter.off(t, i);
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
    const i = t - (this.time || t);
    this.time = t, this.animate.advance(1e-3 * i);
  }
  scrollTo(t, { offset: i = 0, immediate: e = !1, lock: r = !1, duration: n = this.options.duration, easing: s = this.options.easing, lerp: o = !n && this.options.lerp, onComplete: l = null, force: u = !1, programmatic: f = !0 } = {}) {
    if (!this.isStopped || u) {
      if (["top", "left", "start"].includes(t))
        t = 0;
      else if (["bottom", "right", "end"].includes(t))
        t = this.limit;
      else {
        var d;
        let c;
        if (typeof t == "string" ? c = document.querySelector(t) : (d = t) != null && d.nodeType && (c = t), c) {
          if (this.options.wrapper !== window) {
            const p = this.options.wrapper.getBoundingClientRect();
            i -= this.isHorizontal ? p.left : p.top;
          }
          const h = c.getBoundingClientRect();
          t = (this.isHorizontal ? h.left : h.top) + this.animatedScroll;
        }
      }
      if (typeof t == "number") {
        if (t += i, t = Math.round(t), this.options.infinite ? f && (this.targetScroll = this.animatedScroll = this.scroll) : t = vn(0, t, this.limit), e)
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
  toggleClass(t, i) {
    this.rootElement.classList.toggle(t, i), this.emitter.emit("className change", this);
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
}, ks, Nt, yt, Te = 1e8, tt = 1 / Te, es = Math.PI * 2, rl = es / 4, nl = 0, Do = Math.sqrt, sl = Math.cos, ol = Math.sin, Mt = function(t) {
  return typeof t == "string";
}, ht = function(t) {
  return typeof t == "function";
}, ei = function(t) {
  return typeof t == "number";
}, Cs = function(t) {
  return typeof t > "u";
}, $e = function(t) {
  return typeof t == "object";
}, ie = function(t) {
  return t !== !1;
}, Os = function() {
  return typeof window < "u";
}, Kr = function(t) {
  return ht(t) || Mt(t);
}, Ao = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, Yt = Array.isArray, is = /(?:-?\.?\d|\.)+/gi, Ro = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Zi = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Bn = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, zo = /[+-]=-?[.\d]+/, Lo = /[^,'"\[\]\s]+/gi, al = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, at, we, rs, Ms, me = {}, xn = {}, Fo, Io = function(t) {
  return (xn = Ii(t, me)) && se;
}, Es = function(t, i) {
  return console.warn("Invalid property", t, "set to", i, "Missing plugin? gsap.registerPlugin()");
}, wn = function(t, i) {
  return !i && console.warn(t);
}, Bo = function(t, i) {
  return t && (me[t] = i) && xn && (xn[t] = i) || me;
}, Xr = function() {
  return 0;
}, ll = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, ln = {
  suppressEvents: !0,
  kill: !1
}, ul = {
  suppressEvents: !0
}, Ds = {}, di = [], ns = {}, No, ce = {}, Nn = {}, js = 30, un = [], As = "", Rs = function(t) {
  var i = t[0], e, r;
  if ($e(i) || ht(i) || (t = [t]), !(e = (i._gsap || {}).harness)) {
    for (r = un.length; r-- && !un[r].targetTest(i); )
      ;
    e = un[r];
  }
  for (r = t.length; r--; )
    t[r] && (t[r]._gsap || (t[r]._gsap = new ua(t[r], e))) || t.splice(r, 1);
  return t;
}, Di = function(t) {
  return t._gsap || Rs(Se(t))[0]._gsap;
}, Yo = function(t, i, e) {
  return (e = t[i]) && ht(e) ? t[i]() : Cs(e) && t.getAttribute && t.getAttribute(i) || e;
}, re = function(t, i) {
  return (t = t.split(",")).forEach(i) || t;
}, pt = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, At = function(t) {
  return Math.round(t * 1e7) / 1e7 || 0;
}, er = function(t, i) {
  var e = i.charAt(0), r = parseFloat(i.substr(2));
  return t = parseFloat(t), e === "+" ? t + r : e === "-" ? t - r : e === "*" ? t * r : t / r;
}, fl = function(t, i) {
  for (var e = i.length, r = 0; t.indexOf(i[r]) < 0 && ++r < e; )
    ;
  return r < e;
}, bn = function() {
  var t = di.length, i = di.slice(0), e, r;
  for (ns = {}, di.length = 0, e = 0; e < t; e++)
    r = i[e], r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0);
}, Xo = function(t, i, e, r) {
  di.length && !Nt && bn(), t.render(i, e, r || Nt && i < 0 && (t._initted || t._startAt)), di.length && !Nt && bn();
}, Wo = function(t) {
  var i = parseFloat(t);
  return (i || i === 0) && (t + "").match(Lo).length < 2 ? i : Mt(t) ? t.trim() : t;
}, Vo = function(t) {
  return t;
}, Ce = function(t, i) {
  for (var e in i)
    e in t || (t[e] = i[e]);
  return t;
}, hl = function(t) {
  return function(i, e) {
    for (var r in e)
      r in i || r === "duration" && t || r === "ease" || (i[r] = e[r]);
  };
}, Ii = function(t, i) {
  for (var e in i)
    t[e] = i[e];
  return t;
}, Zs = function a(t, i) {
  for (var e in i)
    e !== "__proto__" && e !== "constructor" && e !== "prototype" && (t[e] = $e(i[e]) ? a(t[e] || (t[e] = {}), i[e]) : i[e]);
  return t;
}, Tn = function(t, i) {
  var e = {}, r;
  for (r in t)
    r in i || (e[r] = t[r]);
  return e;
}, Er = function(t) {
  var i = t.parent || at, e = t.keyframes ? hl(Yt(t.keyframes)) : Ce;
  if (ie(t.inherit))
    for (; i; )
      e(t, i.vars.defaults), i = i.parent || i._dp;
  return t;
}, cl = function(t, i) {
  for (var e = t.length, r = e === i.length; r && e-- && t[e] === i[e]; )
    ;
  return e < 0;
}, Uo = function(t, i, e, r, n) {
  e === void 0 && (e = "_first"), r === void 0 && (r = "_last");
  var s = t[r], o;
  if (n)
    for (o = i[n]; s && s[n] > o; )
      s = s._prev;
  return s ? (i._next = s._next, s._next = i) : (i._next = t[e], t[e] = i), i._next ? i._next._prev = i : t[r] = i, i._prev = s, i.parent = i._dp = t, i;
}, An = function(t, i, e, r) {
  e === void 0 && (e = "_first"), r === void 0 && (r = "_last");
  var n = i._prev, s = i._next;
  n ? n._next = s : t[e] === i && (t[e] = s), s ? s._prev = n : t[r] === i && (t[r] = n), i._next = i._prev = i.parent = null;
}, mi = function(t, i) {
  t.parent && (!i || t.parent.autoRemoveChildren) && t.parent.remove(t), t._act = 0;
}, Ai = function(t, i) {
  if (t && (!i || i._end > t._dur || i._start < 0))
    for (var e = t; e; )
      e._dirty = 1, e = e.parent;
  return t;
}, _l = function(t) {
  for (var i = t.parent; i && i.parent; )
    i._dirty = 1, i.totalDuration(), i = i.parent;
  return t;
}, ss = function(t, i, e, r) {
  return t._startAt && (Nt ? t._startAt.revert(ln) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(i, !0, r));
}, dl = function a(t) {
  return !t || t._ts && a(t.parent);
}, Qs = function(t) {
  return t._repeat ? ar(t._tTime, t = t.duration() + t._rDelay) * t : 0;
}, ar = function(t, i) {
  var e = Math.floor(t /= i);
  return t && e === t ? e - 1 : e;
}, Sn = function(t, i) {
  return (t - i._start) * i._ts + (i._ts >= 0 ? 0 : i._dirty ? i.totalDuration() : i._tDur);
}, Rn = function(t) {
  return t._end = At(t._start + (t._tDur / Math.abs(t._ts || t._rts || tt) || 0));
}, zn = function(t, i) {
  var e = t._dp;
  return e && e.smoothChildTiming && t._ts && (t._start = At(e._time - (t._ts > 0 ? i / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - i) / -t._ts)), Rn(t), e._dirty || Ai(e, t)), t;
}, Ho = function(t, i) {
  var e;
  if ((i._time || i._initted && !i._dur) && (e = Sn(t.rawTime(), i), (!i._dur || qr(0, i.totalDuration(), e) - i._tTime > tt) && i.render(e, !0)), Ai(t, i)._dp && t._initted && t._time >= t._dur && t._ts) {
    if (t._dur < t.duration())
      for (e = t; e._dp; )
        e.rawTime() >= 0 && e.totalTime(e._tTime), e = e._dp;
    t._zTime = -tt;
  }
}, We = function(t, i, e, r) {
  return i.parent && mi(i), i._start = At((ei(e) ? e : e || t !== at ? xe(t, e, i) : t._time) + i._delay), i._end = At(i._start + (i.totalDuration() / Math.abs(i.timeScale()) || 0)), Uo(t, i, "_first", "_last", t._sort ? "_start" : 0), os(i) || (t._recent = i), r || Ho(t, i), t._ts < 0 && zn(t, t._tTime), t;
}, $o = function(t, i) {
  return (me.ScrollTrigger || Es("scrollTrigger", i)) && me.ScrollTrigger.create(i, t);
}, Go = function(t, i, e, r, n) {
  if (Ls(t, i, n), !t._initted)
    return 1;
  if (!e && t._pt && !Nt && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && No !== de.frame)
    return di.push(t), t._lazy = [n, r], 1;
}, pl = function a(t) {
  var i = t.parent;
  return i && i._ts && i._initted && !i._lock && (i.rawTime() < 0 || a(i));
}, os = function(t) {
  var i = t.data;
  return i === "isFromStart" || i === "isStart";
}, gl = function(t, i, e, r) {
  var n = t.ratio, s = i < 0 || !i && (!t._start && pl(t) && !(!t._initted && os(t)) || (t._ts < 0 || t._dp._ts < 0) && !os(t)) ? 0 : 1, o = t._rDelay, l = 0, u, f, d;
  if (o && t._repeat && (l = qr(0, t._tDur, i), f = ar(l, o), t._yoyo && f & 1 && (s = 1 - s), f !== ar(t._tTime, o) && (n = 1 - s, t.vars.repeatRefresh && t._initted && t.invalidate())), s !== n || Nt || r || t._zTime === tt || !i && t._zTime) {
    if (!t._initted && Go(t, i, r, e, l))
      return;
    for (d = t._zTime, t._zTime = i || (e ? tt : 0), e || (e = i && !d), t.ratio = s, t._from && (s = 1 - s), t._time = 0, t._tTime = l, u = t._pt; u; )
      u.r(s, u.d), u = u._next;
    i < 0 && ss(t, i, e, !0), t._onUpdate && !e && Pe(t, "onUpdate"), l && t._repeat && !e && t.parent && Pe(t, "onRepeat"), (i >= t._tDur || i < 0) && t.ratio === s && (s && mi(t, 1), !e && !Nt && (Pe(t, s ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
  } else
    t._zTime || (t._zTime = i);
}, ml = function(t, i, e) {
  var r;
  if (e > i)
    for (r = t._first; r && r._start <= e; ) {
      if (r.data === "isPause" && r._start > i)
        return r;
      r = r._next;
    }
  else
    for (r = t._last; r && r._start >= e; ) {
      if (r.data === "isPause" && r._start < i)
        return r;
      r = r._prev;
    }
}, lr = function(t, i, e, r) {
  var n = t._repeat, s = At(i) || 0, o = t._tTime / t._tDur;
  return o && !r && (t._time *= s / t._dur), t._dur = s, t._tDur = n ? n < 0 ? 1e10 : At(s * (n + 1) + t._rDelay * n) : s, o > 0 && !r && zn(t, t._tTime = t._tDur * o), t.parent && Rn(t), e || Ai(t.parent, t), t;
}, Js = function(t) {
  return t instanceof ee ? Ai(t) : lr(t, t._dur);
}, yl = {
  _start: 0,
  endTime: Xr,
  totalDuration: Xr
}, xe = function a(t, i, e) {
  var r = t.labels, n = t._recent || yl, s = t.duration() >= Te ? n.endTime(!1) : t._dur, o, l, u;
  return Mt(i) && (isNaN(i) || i in r) ? (l = i.charAt(0), u = i.substr(-1) === "%", o = i.indexOf("="), l === "<" || l === ">" ? (o >= 0 && (i = i.replace(/=/, "")), (l === "<" ? n._start : n.endTime(n._repeat >= 0)) + (parseFloat(i.substr(1)) || 0) * (u ? (o < 0 ? n : e).totalDuration() / 100 : 1)) : o < 0 ? (i in r || (r[i] = s), r[i]) : (l = parseFloat(i.charAt(o - 1) + i.substr(o + 1)), u && e && (l = l / 100 * (Yt(e) ? e[0] : e).totalDuration()), o > 1 ? a(t, i.substr(0, o - 1), e) + l : s + l)) : i == null ? s : +i;
}, Dr = function(t, i, e) {
  var r = ei(i[1]), n = (r ? 2 : 1) + (t < 2 ? 0 : 1), s = i[n], o, l;
  if (r && (s.duration = i[1]), s.parent = e, t) {
    for (o = s, l = e; l && !("immediateRender" in o); )
      o = l.vars.defaults || {}, l = ie(l.vars.inherit) && l.parent;
    s.immediateRender = ie(o.immediateRender), t < 2 ? s.runBackwards = 1 : s.startAt = i[n - 1];
  }
  return new xt(i[0], s, i[n + 1]);
}, xi = function(t, i) {
  return t || t === 0 ? i(t) : i;
}, qr = function(t, i, e) {
  return e < t ? t : e > i ? i : e;
}, Bt = function(t, i) {
  return !Mt(t) || !(i = al.exec(t)) ? "" : i[1];
}, vl = function(t, i, e) {
  return xi(e, function(r) {
    return qr(t, i, r);
  });
}, as = [].slice, qo = function(t, i) {
  return t && $e(t) && "length" in t && (!i && !t.length || t.length - 1 in t && $e(t[0])) && !t.nodeType && t !== we;
}, xl = function(t, i, e) {
  return e === void 0 && (e = []), t.forEach(function(r) {
    var n;
    return Mt(r) && !i || qo(r, 1) ? (n = e).push.apply(n, Se(r)) : e.push(r);
  }) || e;
}, Se = function(t, i, e) {
  return yt && !i && yt.selector ? yt.selector(t) : Mt(t) && !e && (rs || !ur()) ? as.call((i || Ms).querySelectorAll(t), 0) : Yt(t) ? xl(t, e) : qo(t) ? as.call(t, 0) : t ? [t] : [];
}, ls = function(t) {
  return t = Se(t)[0] || wn("Invalid scope") || {}, function(i) {
    var e = t.current || t.nativeElement || t;
    return Se(i, e.querySelectorAll ? e : e === t ? wn("Invalid scope") || Ms.createElement("div") : t);
  };
}, Ko = function(t) {
  return t.sort(function() {
    return 0.5 - Math.random();
  });
}, jo = function(t) {
  if (ht(t))
    return t;
  var i = $e(t) ? t : {
    each: t
  }, e = Ri(i.ease), r = i.from || 0, n = parseFloat(i.base) || 0, s = {}, o = r > 0 && r < 1, l = isNaN(r) || o, u = i.axis, f = r, d = r;
  return Mt(r) ? f = d = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[r] || 0 : !o && l && (f = r[0], d = r[1]), function(c, h, p) {
    var _ = (p || i).length, m = s[_], v, S, b, y, T, k, w, C, P;
    if (!m) {
      if (P = i.grid === "auto" ? 0 : (i.grid || [1, Te])[1], !P) {
        for (w = -Te; w < (w = p[P++].getBoundingClientRect().left) && P < _; )
          ;
        P--;
      }
      for (m = s[_] = [], v = l ? Math.min(P, _) * f - 0.5 : r % P, S = P === Te ? 0 : l ? _ * d / P - 0.5 : r / P | 0, w = 0, C = Te, k = 0; k < _; k++)
        b = k % P - v, y = S - (k / P | 0), m[k] = T = u ? Math.abs(u === "y" ? y : b) : Do(b * b + y * y), T > w && (w = T), T < C && (C = T);
      r === "random" && Ko(m), m.max = w - C, m.min = C, m.v = _ = (parseFloat(i.amount) || parseFloat(i.each) * (P > _ ? _ - 1 : u ? u === "y" ? _ / P : P : Math.max(P, _ / P)) || 0) * (r === "edges" ? -1 : 1), m.b = _ < 0 ? n - _ : n, m.u = Bt(i.amount || i.each) || 0, e = e && _ < 0 ? oa(e) : e;
    }
    return _ = (m[c] - m.min) / m.max || 0, At(m.b + (e ? e(_) : _) * m.v) + m.u;
  };
}, us = function(t) {
  var i = Math.pow(10, ((t + "").split(".")[1] || "").length);
  return function(e) {
    var r = At(Math.round(parseFloat(e) / t) * t * i);
    return (r - r % 1) / i + (ei(e) ? 0 : Bt(e));
  };
}, Zo = function(t, i) {
  var e = Yt(t), r, n;
  return !e && $e(t) && (r = e = t.radius || Te, t.values ? (t = Se(t.values), (n = !ei(t[0])) && (r *= r)) : t = us(t.increment)), xi(i, e ? ht(t) ? function(s) {
    return n = t(s), Math.abs(n - s) <= r ? n : s;
  } : function(s) {
    for (var o = parseFloat(n ? s.x : s), l = parseFloat(n ? s.y : 0), u = Te, f = 0, d = t.length, c, h; d--; )
      n ? (c = t[d].x - o, h = t[d].y - l, c = c * c + h * h) : c = Math.abs(t[d] - o), c < u && (u = c, f = d);
    return f = !r || u <= r ? t[f] : s, n || f === s || ei(s) ? f : f + Bt(s);
  } : us(t));
}, Qo = function(t, i, e, r) {
  return xi(Yt(t) ? !i : e === !0 ? !!(e = 0) : !r, function() {
    return Yt(t) ? t[~~(Math.random() * t.length)] : (e = e || 1e-5) && (r = e < 1 ? Math.pow(10, (e + "").length - 2) : 1) && Math.floor(Math.round((t - e / 2 + Math.random() * (i - t + e * 0.99)) / e) * e * r) / r;
  });
}, wl = function() {
  for (var t = arguments.length, i = new Array(t), e = 0; e < t; e++)
    i[e] = arguments[e];
  return function(r) {
    return i.reduce(function(n, s) {
      return s(n);
    }, r);
  };
}, bl = function(t, i) {
  return function(e) {
    return t(parseFloat(e)) + (i || Bt(e));
  };
}, Tl = function(t, i, e) {
  return ta(t, i, 0, 1, e);
}, Jo = function(t, i, e) {
  return xi(e, function(r) {
    return t[~~i(r)];
  });
}, Sl = function a(t, i, e) {
  var r = i - t;
  return Yt(t) ? Jo(t, a(0, t.length), i) : xi(e, function(n) {
    return (r + (n - t) % r) % r + t;
  });
}, Pl = function a(t, i, e) {
  var r = i - t, n = r * 2;
  return Yt(t) ? Jo(t, a(0, t.length - 1), i) : xi(e, function(s) {
    return s = (n + (s - t) % n) % n || 0, t + (s > r ? n - s : s);
  });
}, Wr = function(t) {
  for (var i = 0, e = "", r, n, s, o; ~(r = t.indexOf("random(", i)); )
    s = t.indexOf(")", r), o = t.charAt(r + 7) === "[", n = t.substr(r + 7, s - r - 7).match(o ? Lo : is), e += t.substr(i, r - i) + Qo(o ? n : +n[0], o ? 0 : +n[1], +n[2] || 1e-5), i = s + 1;
  return e + t.substr(i, t.length - i);
}, ta = function(t, i, e, r, n) {
  var s = i - t, o = r - e;
  return xi(n, function(l) {
    return e + ((l - t) / s * o || 0);
  });
}, kl = function a(t, i, e, r) {
  var n = isNaN(t + i) ? 0 : function(h) {
    return (1 - h) * t + h * i;
  };
  if (!n) {
    var s = Mt(t), o = {}, l, u, f, d, c;
    if (e === !0 && (r = 1) && (e = null), s)
      t = {
        p: t
      }, i = {
        p: i
      };
    else if (Yt(t) && !Yt(i)) {
      for (f = [], d = t.length, c = d - 2, u = 1; u < d; u++)
        f.push(a(t[u - 1], t[u]));
      d--, n = function(p) {
        p *= d;
        var _ = Math.min(c, ~~p);
        return f[_](p - _);
      }, e = i;
    } else
      r || (t = Ii(Yt(t) ? [] : {}, t));
    if (!f) {
      for (l in i)
        zs.call(o, t, l, "get", i[l]);
      n = function(p) {
        return Bs(p, o) || (s ? t.p : t);
      };
    }
  }
  return xi(e, n);
}, to = function(t, i, e) {
  var r = t.labels, n = Te, s, o, l;
  for (s in r)
    o = r[s] - i, o < 0 == !!e && o && n > (o = Math.abs(o)) && (l = s, n = o);
  return l;
}, Pe = function(t, i, e) {
  var r = t.vars, n = r[i], s = yt, o = t._ctx, l, u, f;
  if (n)
    return l = r[i + "Params"], u = r.callbackScope || t, e && di.length && bn(), o && (yt = o), f = l ? n.apply(u, l) : n.call(u), yt = s, f;
}, Sr = function(t) {
  return mi(t), t.scrollTrigger && t.scrollTrigger.kill(!!Nt), t.progress() < 1 && Pe(t, "onInterrupt"), t;
}, Qi, ea = [], ia = function(t) {
  if (!Os()) {
    ea.push(t);
    return;
  }
  t = !t.name && t.default || t;
  var i = t.name, e = ht(t), r = i && !e && t.init ? function() {
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
    if (ce[i])
      return;
    Ce(r, Ce(Tn(t, n), s)), Ii(r.prototype, Ii(n, Tn(t, s))), ce[r.prop = i] = r, t.targetTest && (un.push(r), Ds[i] = 1), i = (i === "css" ? "CSS" : i.charAt(0).toUpperCase() + i.substr(1)) + "Plugin";
  }
  Bo(i, r), t.register && t.register(se, r, ne);
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
}, Yn = function(t, i, e) {
  return t += t < 0 ? 1 : t > 1 ? -1 : 0, (t * 6 < 1 ? i + (e - i) * t * 6 : t < 0.5 ? e : t * 3 < 2 ? i + (e - i) * (2 / 3 - t) * 6 : i) * J + 0.5 | 0;
}, ra = function(t, i, e) {
  var r = t ? ei(t) ? [t >> 16, t >> 8 & J, t & J] : 0 : Pr.black, n, s, o, l, u, f, d, c, h, p;
  if (!r) {
    if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), Pr[t])
      r = Pr[t];
    else if (t.charAt(0) === "#") {
      if (t.length < 6 && (n = t.charAt(1), s = t.charAt(2), o = t.charAt(3), t = "#" + n + n + s + s + o + o + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9)
        return r = parseInt(t.substr(1, 6), 16), [r >> 16, r >> 8 & J, r & J, parseInt(t.substr(7), 16) / 255];
      t = parseInt(t.substr(1), 16), r = [t >> 16, t >> 8 & J, t & J];
    } else if (t.substr(0, 3) === "hsl") {
      if (r = p = t.match(is), !i)
        l = +r[0] % 360 / 360, u = +r[1] / 100, f = +r[2] / 100, s = f <= 0.5 ? f * (u + 1) : f + u - f * u, n = f * 2 - s, r.length > 3 && (r[3] *= 1), r[0] = Yn(l + 1 / 3, n, s), r[1] = Yn(l, n, s), r[2] = Yn(l - 1 / 3, n, s);
      else if (~t.indexOf("="))
        return r = t.match(Ro), e && r.length < 4 && (r[3] = 1), r;
    } else
      r = t.match(is) || Pr.transparent;
    r = r.map(Number);
  }
  return i && !p && (n = r[0] / J, s = r[1] / J, o = r[2] / J, d = Math.max(n, s, o), c = Math.min(n, s, o), f = (d + c) / 2, d === c ? l = u = 0 : (h = d - c, u = f > 0.5 ? h / (2 - d - c) : h / (d + c), l = d === n ? (s - o) / h + (s < o ? 6 : 0) : d === s ? (o - n) / h + 2 : (n - s) / h + 4, l *= 60), r[0] = ~~(l + 0.5), r[1] = ~~(u * 100 + 0.5), r[2] = ~~(f * 100 + 0.5)), e && r.length < 4 && (r[3] = 1), r;
}, na = function(t) {
  var i = [], e = [], r = -1;
  return t.split(pi).forEach(function(n) {
    var s = n.match(Zi) || [];
    i.push.apply(i, s), e.push(r += s.length + 1);
  }), i.c = e, i;
}, eo = function(t, i, e) {
  var r = "", n = (t + r).match(pi), s = i ? "hsla(" : "rgba(", o = 0, l, u, f, d;
  if (!n)
    return t;
  if (n = n.map(function(c) {
    return (c = ra(c, i, 1)) && s + (i ? c[0] + "," + c[1] + "%," + c[2] + "%," + c[3] : c.join(",")) + ")";
  }), e && (f = na(t), l = e.c, l.join(r) !== f.c.join(r)))
    for (u = t.replace(pi, "1").split(Zi), d = u.length - 1; o < d; o++)
      r += u[o] + (~l.indexOf(o) ? n.shift() || s + "0,0,0,0)" : (f.length ? f : n.length ? n : e).shift());
  if (!u)
    for (u = t.split(pi), d = u.length - 1; o < d; o++)
      r += u[o] + n[o];
  return r + u[d];
}, pi = function() {
  var a = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
  for (t in Pr)
    a += "|" + t + "\\b";
  return new RegExp(a + ")", "gi");
}(), Cl = /hsl[a]?\(/, sa = function(t) {
  var i = t.join(" "), e;
  if (pi.lastIndex = 0, pi.test(i))
    return e = Cl.test(i), t[1] = eo(t[1], e), t[0] = eo(t[0], e, na(t[1])), !0;
}, Vr, de = function() {
  var a = Date.now, t = 500, i = 33, e = a(), r = e, n = 1e3 / 240, s = n, o = [], l, u, f, d, c, h, p = function _(m) {
    var v = a() - r, S = m === !0, b, y, T, k;
    if (v > t && (e += v - i), r += v, T = r - e, b = T - s, (b > 0 || S) && (k = ++d.frame, c = T - d.time * 1e3, d.time = T = T / 1e3, s += b + (b >= n ? 4 : n - b), y = 1), S || (l = u(_)), y)
      for (h = 0; h < o.length; h++)
        o[h](T, c, k, m);
  };
  return d = {
    time: 0,
    frame: 0,
    tick: function() {
      p(!0);
    },
    deltaRatio: function(m) {
      return c / (1e3 / (m || 60));
    },
    wake: function() {
      Fo && (!rs && Os() && (we = rs = window, Ms = we.document || {}, me.gsap = se, (we.gsapVersions || (we.gsapVersions = [])).push(se.version), Io(xn || we.GreenSockGlobals || !we.gsap && we || {}), f = we.requestAnimationFrame, ea.forEach(ia)), l && d.sleep(), u = f || function(m) {
        return setTimeout(m, s - d.time * 1e3 + 1 | 0);
      }, Vr = 1, p(2));
    },
    sleep: function() {
      (f ? we.cancelAnimationFrame : clearTimeout)(l), Vr = 0, u = Xr;
    },
    lagSmoothing: function(m, v) {
      t = m || 1 / 0, i = Math.min(v || 33, t);
    },
    fps: function(m) {
      n = 1e3 / (m || 240), s = d.time * 1e3 + n;
    },
    add: function(m, v, S) {
      var b = v ? function(y, T, k, w) {
        m(y, T, k, w), d.remove(b);
      } : m;
      return d.remove(m), o[S ? "unshift" : "push"](b), ur(), b;
    },
    remove: function(m, v) {
      ~(v = o.indexOf(m)) && o.splice(v, 1) && h >= v && h--;
    },
    _listeners: o
  }, d;
}(), ur = function() {
  return !Vr && de.wake();
}, j = {}, Ol = /^[\d.\-M][\d.\-,\s]/, Ml = /["']/g, El = function(t) {
  for (var i = {}, e = t.substr(1, t.length - 3).split(":"), r = e[0], n = 1, s = e.length, o, l, u; n < s; n++)
    l = e[n], o = n !== s - 1 ? l.lastIndexOf(",") : l.length, u = l.substr(0, o), i[r] = isNaN(u) ? u.replace(Ml, "").trim() : +u, r = l.substr(o + 1).trim();
  return i;
}, Dl = function(t) {
  var i = t.indexOf("(") + 1, e = t.indexOf(")"), r = t.indexOf("(", i);
  return t.substring(i, ~r && r < e ? t.indexOf(")", e + 1) : e);
}, Al = function(t) {
  var i = (t + "").split("("), e = j[i[0]];
  return e && i.length > 1 && e.config ? e.config.apply(null, ~t.indexOf("{") ? [El(i[1])] : Dl(t).split(",").map(Wo)) : j._CE && Ol.test(t) ? j._CE("", t) : e;
}, oa = function(t) {
  return function(i) {
    return 1 - t(1 - i);
  };
}, aa = function a(t, i) {
  for (var e = t._first, r; e; )
    e instanceof ee ? a(e, i) : e.vars.yoyoEase && (!e._yoyo || !e._repeat) && e._yoyo !== i && (e.timeline ? a(e.timeline, i) : (r = e._ease, e._ease = e._yEase, e._yEase = r, e._yoyo = i)), e = e._next;
}, Ri = function(t, i) {
  return t && (ht(t) ? t : j[t] || Al(t)) || i;
}, Xi = function(t, i, e, r) {
  e === void 0 && (e = function(l) {
    return 1 - i(1 - l);
  }), r === void 0 && (r = function(l) {
    return l < 0.5 ? i(l * 2) / 2 : 1 - i((1 - l) * 2) / 2;
  });
  var n = {
    easeIn: i,
    easeOut: e,
    easeInOut: r
  }, s;
  return re(t, function(o) {
    j[o] = me[o] = n, j[s = o.toLowerCase()] = e;
    for (var l in n)
      j[s + (l === "easeIn" ? ".in" : l === "easeOut" ? ".out" : ".inOut")] = j[o + "." + l] = n[l];
  }), n;
}, la = function(t) {
  return function(i) {
    return i < 0.5 ? (1 - t(1 - i * 2)) / 2 : 0.5 + t((i - 0.5) * 2) / 2;
  };
}, Xn = function a(t, i, e) {
  var r = i >= 1 ? i : 1, n = (e || (t ? 0.3 : 0.45)) / (i < 1 ? i : 1), s = n / es * (Math.asin(1 / r) || 0), o = function(f) {
    return f === 1 ? 1 : r * Math.pow(2, -10 * f) * ol((f - s) * n) + 1;
  }, l = t === "out" ? o : t === "in" ? function(u) {
    return 1 - o(1 - u);
  } : la(o);
  return n = es / n, l.config = function(u, f) {
    return a(t, u, f);
  }, l;
}, Wn = function a(t, i) {
  i === void 0 && (i = 1.70158);
  var e = function(s) {
    return s ? --s * s * ((i + 1) * s + i) + 1 : 0;
  }, r = t === "out" ? e : t === "in" ? function(n) {
    return 1 - e(1 - n);
  } : la(e);
  return r.config = function(n) {
    return a(t, n);
  }, r;
};
re("Linear,Quad,Cubic,Quart,Quint,Strong", function(a, t) {
  var i = t < 5 ? t + 1 : t;
  Xi(a + ",Power" + (i - 1), t ? function(e) {
    return Math.pow(e, i);
  } : function(e) {
    return e;
  }, function(e) {
    return 1 - Math.pow(1 - e, i);
  }, function(e) {
    return e < 0.5 ? Math.pow(e * 2, i) / 2 : 1 - Math.pow((1 - e) * 2, i) / 2;
  });
});
j.Linear.easeNone = j.none = j.Linear.easeIn;
Xi("Elastic", Xn("in"), Xn("out"), Xn());
(function(a, t) {
  var i = 1 / t, e = 2 * i, r = 2.5 * i, n = function(o) {
    return o < i ? a * o * o : o < e ? a * Math.pow(o - 1.5 / t, 2) + 0.75 : o < r ? a * (o -= 2.25 / t) * o + 0.9375 : a * Math.pow(o - 2.625 / t, 2) + 0.984375;
  };
  Xi("Bounce", function(s) {
    return 1 - n(1 - s);
  }, n);
})(7.5625, 2.75);
Xi("Expo", function(a) {
  return a ? Math.pow(2, 10 * (a - 1)) : 0;
});
Xi("Circ", function(a) {
  return -(Do(1 - a * a) - 1);
});
Xi("Sine", function(a) {
  return a === 1 ? 1 : -sl(a * rl) + 1;
});
Xi("Back", Wn("in"), Wn("out"), Wn());
j.SteppedEase = j.steps = me.SteppedEase = {
  config: function(t, i) {
    t === void 0 && (t = 1);
    var e = 1 / t, r = t + (i ? 0 : 1), n = i ? 1 : 0, s = 1 - tt;
    return function(o) {
      return ((r * qr(0, s, o) | 0) + n) * e;
    };
  }
};
or.ease = j["quad.out"];
re("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(a) {
  return As += a + "," + a + "Params,";
});
var ua = function(t, i) {
  this.id = nl++, t._gsap = this, this.target = t, this.harness = i, this.get = i ? i.get : Yo, this.set = i ? i.getSetter : Is;
}, fr = /* @__PURE__ */ function() {
  function a(i) {
    this.vars = i, this._delay = +i.delay || 0, (this._repeat = i.repeat === 1 / 0 ? -2 : i.repeat || 0) && (this._rDelay = i.repeatDelay || 0, this._yoyo = !!i.yoyo || !!i.yoyoEase), this._ts = 1, lr(this, +i.duration, 1, 1), this.data = i.data, yt && (this._ctx = yt, yt.data.push(this)), Vr || de.wake();
  }
  var t = a.prototype;
  return t.delay = function(e) {
    return e || e === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + e - this._delay), this._delay = e, this) : this._delay;
  }, t.duration = function(e) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? e + (e + this._rDelay) * this._repeat : e) : this.totalDuration() && this._dur;
  }, t.totalDuration = function(e) {
    return arguments.length ? (this._dirty = 0, lr(this, this._repeat < 0 ? e : (e - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, t.totalTime = function(e, r) {
    if (ur(), !arguments.length)
      return this._tTime;
    var n = this._dp;
    if (n && n.smoothChildTiming && this._ts) {
      for (zn(this, e), !n._dp || n.parent || Ho(n, this); n && n.parent; )
        n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && e < this._tDur || this._ts < 0 && e > 0 || !this._tDur && !e) && We(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== e || !this._dur && !r || this._initted && Math.abs(this._zTime) === tt || !e && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = e), Xo(this, e, r)), this;
  }, t.time = function(e, r) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), e + Qs(this)) % (this._dur + this._rDelay) || (e ? this._dur : 0), r) : this._time;
  }, t.totalProgress = function(e, r) {
    return arguments.length ? this.totalTime(this.totalDuration() * e, r) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
  }, t.progress = function(e, r) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - e : e) + Qs(this), r) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
  }, t.iteration = function(e, r) {
    var n = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (e - 1) * n, r) : this._repeat ? ar(this._tTime, n) + 1 : 1;
  }, t.timeScale = function(e) {
    if (!arguments.length)
      return this._rts === -tt ? 0 : this._rts;
    if (this._rts === e)
      return this;
    var r = this.parent && this._ts ? Sn(this.parent._time, this) : this._tTime;
    return this._rts = +e || 0, this._ts = this._ps || e === -tt ? 0 : this._rts, this.totalTime(qr(-Math.abs(this._delay), this._tDur, r), !0), Rn(this), _l(this);
  }, t.paused = function(e) {
    return arguments.length ? (this._ps !== e && (this._ps = e, e ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (ur(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== tt && (this._tTime -= tt)))), this) : this._ps;
  }, t.startTime = function(e) {
    if (arguments.length) {
      this._start = e;
      var r = this.parent || this._dp;
      return r && (r._sort || !this.parent) && We(r, this, e - this._delay), this;
    }
    return this._start;
  }, t.endTime = function(e) {
    return this._start + (ie(e) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, t.rawTime = function(e) {
    var r = this.parent || this._dp;
    return r ? e && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Sn(r.rawTime(e), this) : this._tTime : this._tTime;
  }, t.revert = function(e) {
    e === void 0 && (e = ul);
    var r = Nt;
    return Nt = e, (this._initted || this._startAt) && (this.timeline && this.timeline.revert(e), this.totalTime(-0.01, e.suppressEvents)), this.data !== "nested" && e.kill !== !1 && this.kill(), Nt = r, this;
  }, t.globalTime = function(e) {
    for (var r = this, n = arguments.length ? e : r.rawTime(); r; )
      n = r._start + n / (r._ts || 1), r = r._dp;
    return !this.parent && this._sat ? this._sat.vars.immediateRender ? -1 : this._sat.globalTime(e) : n;
  }, t.repeat = function(e) {
    return arguments.length ? (this._repeat = e === 1 / 0 ? -2 : e, Js(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, t.repeatDelay = function(e) {
    if (arguments.length) {
      var r = this._time;
      return this._rDelay = e, Js(this), r ? this.time(r) : this;
    }
    return this._rDelay;
  }, t.yoyo = function(e) {
    return arguments.length ? (this._yoyo = e, this) : this._yoyo;
  }, t.seek = function(e, r) {
    return this.totalTime(xe(this, e), ie(r));
  }, t.restart = function(e, r) {
    return this.play().totalTime(e ? -this._delay : 0, ie(r));
  }, t.play = function(e, r) {
    return e != null && this.seek(e, r), this.reversed(!1).paused(!1);
  }, t.reverse = function(e, r) {
    return e != null && this.seek(e || this.totalDuration(), r), this.reversed(!0).paused(!1);
  }, t.pause = function(e, r) {
    return e != null && this.seek(e, r), this.paused(!0);
  }, t.resume = function() {
    return this.paused(!1);
  }, t.reversed = function(e) {
    return arguments.length ? (!!e !== this.reversed() && this.timeScale(-this._rts || (e ? -tt : 0)), this) : this._rts < 0;
  }, t.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -tt, this;
  }, t.isActive = function() {
    var e = this.parent || this._dp, r = this._start, n;
    return !!(!e || this._ts && this._initted && e.isActive() && (n = e.rawTime(!0)) >= r && n < this.endTime(!0) - tt);
  }, t.eventCallback = function(e, r, n) {
    var s = this.vars;
    return arguments.length > 1 ? (r ? (s[e] = r, n && (s[e + "Params"] = n), e === "onUpdate" && (this._onUpdate = r)) : delete s[e], this) : s[e];
  }, t.then = function(e) {
    var r = this;
    return new Promise(function(n) {
      var s = ht(e) ? e : Vo, o = function() {
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
  function t(e, r) {
    var n;
    return e === void 0 && (e = {}), n = a.call(this, e) || this, n.labels = {}, n.smoothChildTiming = !!e.smoothChildTiming, n.autoRemoveChildren = !!e.autoRemoveChildren, n._sort = ie(e.sortChildren), at && We(e.parent || at, je(n), r), e.reversed && n.reverse(), e.paused && n.paused(!0), e.scrollTrigger && $o(je(n), e.scrollTrigger), n;
  }
  var i = t.prototype;
  return i.to = function(r, n, s) {
    return Dr(0, arguments, this), this;
  }, i.from = function(r, n, s) {
    return Dr(1, arguments, this), this;
  }, i.fromTo = function(r, n, s, o) {
    return Dr(2, arguments, this), this;
  }, i.set = function(r, n, s) {
    return n.duration = 0, n.parent = this, Er(n).repeatDelay || (n.repeat = 0), n.immediateRender = !!n.immediateRender, new xt(r, n, xe(this, s), 1), this;
  }, i.call = function(r, n, s) {
    return We(this, xt.delayedCall(0, r, n), s);
  }, i.staggerTo = function(r, n, s, o, l, u, f) {
    return s.duration = n, s.stagger = s.stagger || o, s.onComplete = u, s.onCompleteParams = f, s.parent = this, new xt(r, s, xe(this, l)), this;
  }, i.staggerFrom = function(r, n, s, o, l, u, f) {
    return s.runBackwards = 1, Er(s).immediateRender = ie(s.immediateRender), this.staggerTo(r, n, s, o, l, u, f);
  }, i.staggerFromTo = function(r, n, s, o, l, u, f, d) {
    return o.startAt = s, Er(o).immediateRender = ie(o.immediateRender), this.staggerTo(r, n, o, l, u, f, d);
  }, i.render = function(r, n, s) {
    var o = this._time, l = this._dirty ? this.totalDuration() : this._tDur, u = this._dur, f = r <= 0 ? 0 : At(r), d = this._zTime < 0 != r < 0 && (this._initted || !u), c, h, p, _, m, v, S, b, y, T, k, w;
    if (this !== at && f > l && r >= 0 && (f = l), f !== this._tTime || s || d) {
      if (o !== this._time && u && (f += this._time - o, r += this._time - o), c = f, y = this._start, b = this._ts, v = !b, d && (u || (o = this._zTime), (r || !n) && (this._zTime = r)), this._repeat) {
        if (k = this._yoyo, m = u + this._rDelay, this._repeat < -1 && r < 0)
          return this.totalTime(m * 100 + r, n, s);
        if (c = At(f % m), f === l ? (_ = this._repeat, c = u) : (_ = ~~(f / m), _ && _ === f / m && (c = u, _--), c > u && (c = u)), T = ar(this._tTime, m), !o && this._tTime && T !== _ && this._tTime - T * m - this._dur <= 0 && (T = _), k && _ & 1 && (c = u - c, w = 1), _ !== T && !this._lock) {
          var C = k && T & 1, P = C === (k && _ & 1);
          if (_ < T && (C = !C), o = C ? 0 : u, this._lock = 1, this.render(o || (w ? 0 : At(_ * m)), n, !u)._lock = 0, this._tTime = f, !n && this.parent && Pe(this, "onRepeat"), this.vars.repeatRefresh && !w && (this.invalidate()._lock = 1), o && o !== this._time || v !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (u = this._dur, l = this._tDur, P && (this._lock = 2, o = C ? u : -1e-4, this.render(o, !0), this.vars.repeatRefresh && !w && this.invalidate()), this._lock = 0, !this._ts && !v)
            return this;
          aa(this, w);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (S = ml(this, At(o), At(c)), S && (f -= c - (c = S._start))), this._tTime = f, this._time = c, this._act = !b, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = r, o = 0), !o && c && !n && !_ && (Pe(this, "onStart"), this._tTime !== f))
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
        return this._start = y, Rn(this), this.render(r, n, s);
      this._onUpdate && !n && Pe(this, "onUpdate", !0), (f === l && this._tTime >= this.totalDuration() || !f && o) && (y === this._start || Math.abs(b) !== Math.abs(this._ts)) && (this._lock || ((r || !u) && (f === l && this._ts > 0 || !f && this._ts < 0) && mi(this, 1), !n && !(r < 0 && !o) && (f || o || !l) && (Pe(this, f === l && r >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(f < l && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, i.add = function(r, n) {
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
  }, i.getChildren = function(r, n, s, o) {
    r === void 0 && (r = !0), n === void 0 && (n = !0), s === void 0 && (s = !0), o === void 0 && (o = -Te);
    for (var l = [], u = this._first; u; )
      u._start >= o && (u instanceof xt ? n && l.push(u) : (s && l.push(u), r && l.push.apply(l, u.getChildren(!0, n, s)))), u = u._next;
    return l;
  }, i.getById = function(r) {
    for (var n = this.getChildren(1, 1, 1), s = n.length; s--; )
      if (n[s].vars.id === r)
        return n[s];
  }, i.remove = function(r) {
    return Mt(r) ? this.removeLabel(r) : ht(r) ? this.killTweensOf(r) : (An(this, r), r === this._recent && (this._recent = this._last), Ai(this));
  }, i.totalTime = function(r, n) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = At(de.time - (this._ts > 0 ? r / this._ts : (this.totalDuration() - r) / -this._ts))), a.prototype.totalTime.call(this, r, n), this._forcing = 0, this) : this._tTime;
  }, i.addLabel = function(r, n) {
    return this.labels[r] = xe(this, n), this;
  }, i.removeLabel = function(r) {
    return delete this.labels[r], this;
  }, i.addPause = function(r, n, s) {
    var o = xt.delayedCall(0, n || Xr, s);
    return o.data = "isPause", this._hasPause = 1, We(this, o, xe(this, r));
  }, i.removePause = function(r) {
    var n = this._first;
    for (r = xe(this, r); n; )
      n._start === r && n.data === "isPause" && mi(n), n = n._next;
  }, i.killTweensOf = function(r, n, s) {
    for (var o = this.getTweensOf(r, s), l = o.length; l--; )
      li !== o[l] && o[l].kill(r, n);
    return this;
  }, i.getTweensOf = function(r, n) {
    for (var s = [], o = Se(r), l = this._first, u = ei(n), f; l; )
      l instanceof xt ? fl(l._targets, o) && (u ? (!li || l._initted && l._ts) && l.globalTime(0) <= n && l.globalTime(l.totalDuration()) > n : !n || l.isActive()) && s.push(l) : (f = l.getTweensOf(o, n)).length && s.push.apply(s, f), l = l._next;
    return s;
  }, i.tweenTo = function(r, n) {
    n = n || {};
    var s = this, o = xe(s, r), l = n, u = l.startAt, f = l.onStart, d = l.onStartParams, c = l.immediateRender, h, p = xt.to(s, Ce({
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
        f && f.apply(p, d || []);
      }
    }, n));
    return c ? p.render(0) : p;
  }, i.tweenFromTo = function(r, n, s) {
    return this.tweenTo(n, Ce({
      startAt: {
        time: xe(this, r)
      }
    }, s));
  }, i.recent = function() {
    return this._recent;
  }, i.nextLabel = function(r) {
    return r === void 0 && (r = this._time), to(this, xe(this, r));
  }, i.previousLabel = function(r) {
    return r === void 0 && (r = this._time), to(this, xe(this, r), 1);
  }, i.currentLabel = function(r) {
    return arguments.length ? this.seek(r, !0) : this.previousLabel(this._time + tt);
  }, i.shiftChildren = function(r, n, s) {
    s === void 0 && (s = 0);
    for (var o = this._first, l = this.labels, u; o; )
      o._start >= s && (o._start += r, o._end += r), o = o._next;
    if (n)
      for (u in l)
        l[u] >= s && (l[u] += r);
    return Ai(this);
  }, i.invalidate = function(r) {
    var n = this._first;
    for (this._lock = 0; n; )
      n.invalidate(r), n = n._next;
    return a.prototype.invalidate.call(this, r);
  }, i.clear = function(r) {
    r === void 0 && (r = !0);
    for (var n = this._first, s; n; )
      s = n._next, this.remove(n), n = s;
    return this._dp && (this._time = this._tTime = this._pTime = 0), r && (this.labels = {}), Ai(this);
  }, i.totalDuration = function(r) {
    var n = 0, s = this, o = s._last, l = Te, u, f, d;
    if (arguments.length)
      return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -r : r));
    if (s._dirty) {
      for (d = s.parent; o; )
        u = o._prev, o._dirty && o.totalDuration(), f = o._start, f > l && s._sort && o._ts && !s._lock ? (s._lock = 1, We(s, o, f - o._delay, 1)._lock = 0) : l = f, f < 0 && o._ts && (n -= f, (!d && !s._dp || d && d.smoothChildTiming) && (s._start += f / s._ts, s._time -= f, s._tTime -= f), s.shiftChildren(-f, !1, -1 / 0), l = 0), o._end > n && o._ts && (n = o._end), o = u;
      lr(s, s === at && s._time > n ? s._time : n, 1, 1), s._dirty = 0;
    }
    return s._tDur;
  }, t.updateRoot = function(r) {
    if (at._ts && (Xo(at, Sn(r, at)), No = de.frame), de.frame >= js) {
      js += ge.autoSleep || 120;
      var n = at._first;
      if ((!n || !n._ts) && ge.autoSleep && de._listeners.length < 2) {
        for (; n && !n._ts; )
          n = n._next;
        n || de.sleep();
      }
    }
  }, t;
}(fr);
Ce(ee.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var Rl = function(t, i, e, r, n, s, o) {
  var l = new ne(this._pt, t, i, 0, 1, pa, null, n), u = 0, f = 0, d, c, h, p, _, m, v, S;
  for (l.b = e, l.e = r, e += "", r += "", (v = ~r.indexOf("random(")) && (r = Wr(r)), s && (S = [e, r], s(S, t, i), e = S[0], r = S[1]), c = e.match(Bn) || []; d = Bn.exec(r); )
    p = d[0], _ = r.substring(u, d.index), h ? h = (h + 1) % 5 : _.substr(-5) === "rgba(" && (h = 1), p !== c[f++] && (m = parseFloat(c[f - 1]) || 0, l._pt = {
      _next: l._pt,
      p: _ || f === 1 ? _ : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: m,
      c: p.charAt(1) === "=" ? er(m, p) - m : parseFloat(p) - m,
      m: h && h < 4 ? Math.round : 0
    }, u = Bn.lastIndex);
  return l.c = u < r.length ? r.substring(u, r.length) : "", l.fp = o, (zo.test(r) || v) && (l.e = 0), this._pt = l, l;
}, zs = function(t, i, e, r, n, s, o, l, u, f) {
  ht(r) && (r = r(n || 0, t, s));
  var d = t[i], c = e !== "get" ? e : ht(d) ? u ? t[i.indexOf("set") || !ht(t["get" + i.substr(3)]) ? i : "get" + i.substr(3)](u) : t[i]() : d, h = ht(d) ? u ? Bl : _a : Fs, p;
  if (Mt(r) && (~r.indexOf("random(") && (r = Wr(r)), r.charAt(1) === "=" && (p = er(c, r) + (Bt(c) || 0), (p || p === 0) && (r = p))), !f || c !== r || fs)
    return !isNaN(c * r) && r !== "" ? (p = new ne(this._pt, t, i, +c || 0, r - (c || 0), typeof d == "boolean" ? Yl : da, 0, h), u && (p.fp = u), o && p.modifier(o, this, t), this._pt = p) : (!d && !(i in t) && Es(i, r), Rl.call(this, t, i, c, r, h, l || ge.stringFilter, u));
}, zl = function(t, i, e, r, n) {
  if (ht(t) && (t = Ar(t, n, i, e, r)), !$e(t) || t.style && t.nodeType || Yt(t) || Ao(t))
    return Mt(t) ? Ar(t, n, i, e, r) : t;
  var s = {}, o;
  for (o in t)
    s[o] = Ar(t[o], n, i, e, r);
  return s;
}, fa = function(t, i, e, r, n, s) {
  var o, l, u, f;
  if (ce[t] && (o = new ce[t]()).init(n, o.rawVars ? i[t] : zl(i[t], r, n, s, e), e, r, s) !== !1 && (e._pt = l = new ne(e._pt, n, t, 0, 1, o.render, o, 0, o.priority), e !== Qi))
    for (u = e._ptLookup[e._targets.indexOf(n)], f = o._props.length; f--; )
      u[o._props[f]] = l;
  return o;
}, li, fs, Ls = function a(t, i, e) {
  var r = t.vars, n = r.ease, s = r.startAt, o = r.immediateRender, l = r.lazy, u = r.onUpdate, f = r.onUpdateParams, d = r.callbackScope, c = r.runBackwards, h = r.yoyoEase, p = r.keyframes, _ = r.autoRevert, m = t._dur, v = t._startAt, S = t._targets, b = t.parent, y = b && b.data === "nested" ? b.vars.targets : S, T = t._overwrite === "auto" && !ks, k = t.timeline, w, C, P, M, R, E, W, B, Y, q, L, K, Q;
  if (k && (!p || !n) && (n = "none"), t._ease = Ri(n, or.ease), t._yEase = h ? oa(Ri(h === !0 ? n : h, or.ease)) : 0, h && t._yoyo && !t._repeat && (h = t._yEase, t._yEase = t._ease, t._ease = h), t._from = !k && !!r.runBackwards, !k || p && !r.stagger) {
    if (B = S[0] ? Di(S[0]).harness : 0, K = B && r[B.prop], w = Tn(r, Ds), v && (v._zTime < 0 && v.progress(1), i < 0 && c && o && !_ ? v.render(-1, !0) : v.revert(c && m ? ln : ll), v._lazy = 0), s) {
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
        callbackScope: d,
        stagger: 0
      }, s))), t._startAt._dp = 0, t._startAt._sat = t, i < 0 && (Nt || !o && !_) && t._startAt.revert(ln), o && m && i <= 0 && e <= 0) {
        i && (t._zTime = i);
        return;
      }
    } else if (c && m && !v) {
      if (i && (o = !1), P = Ce({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: o && !v && ie(l),
        immediateRender: o,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: b
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y:gsap.utils.wrap([-100,100])})
      }, w), K && (P[B.prop] = K), mi(t._startAt = xt.set(S, P)), t._startAt._dp = 0, t._startAt._sat = t, i < 0 && (Nt ? t._startAt.revert(ln) : t._startAt.render(-1, !0)), t._zTime = i, !o)
        a(t._startAt, tt, tt);
      else if (!i)
        return;
    }
    for (t._pt = t._ptCache = 0, l = m && ie(l) || l && !m, C = 0; C < S.length; C++) {
      if (R = S[C], W = R._gsap || Rs(S)[C]._gsap, t._ptLookup[C] = q = {}, ns[W.id] && di.length && bn(), L = y === S ? C : y.indexOf(R), B && (Y = new B()).init(R, K || w, t, L, y) !== !1 && (t._pt = M = new ne(t._pt, R, Y.name, 0, 1, Y.render, Y, 0, Y.priority), Y._props.forEach(function(g) {
        q[g] = M;
      }), Y.priority && (E = 1)), !B || K)
        for (P in w)
          ce[P] && (Y = fa(P, w, t, L, R, y)) ? Y.priority && (E = 1) : q[P] = M = zs.call(t, R, P, "get", w[P], L, y, 0, r.stringFilter);
      t._op && t._op[C] && t.kill(R, t._op[C]), T && t._pt && (li = t, at.killTweensOf(R, q, t.globalTime(i)), Q = !t.parent, li = 0), t._pt && l && (ns[W.id] = 1);
    }
    E && ga(t), t._onInit && t._onInit(t);
  }
  t._onUpdate = u, t._initted = (!t._op || t._pt) && !Q, p && i <= 0 && k.render(Te, !0, !0);
}, Ll = function(t, i, e, r, n, s, o) {
  var l = (t._pt && t._ptCache || (t._ptCache = {}))[i], u, f, d, c;
  if (!l)
    for (l = t._ptCache[i] = [], d = t._ptLookup, c = t._targets.length; c--; ) {
      if (u = d[c][i], u && u.d && u.d._pt)
        for (u = u.d._pt; u && u.p !== i && u.fp !== i; )
          u = u._next;
      if (!u)
        return fs = 1, t.vars[i] = "+=0", Ls(t, o), fs = 0, 1;
      l.push(u);
    }
  for (c = l.length; c--; )
    f = l[c], u = f._pt || f, u.s = (r || r === 0) && !n ? r : u.s + (r || 0) + s * u.c, u.c = e - u.s, f.e && (f.e = pt(e) + Bt(f.e)), f.b && (f.b = u.s + Bt(f.b));
}, Fl = function(t, i) {
  var e = t[0] ? Di(t[0]).harness : 0, r = e && e.aliases, n, s, o, l;
  if (!r)
    return i;
  n = Ii({}, i);
  for (s in r)
    if (s in n)
      for (l = r[s].split(","), o = l.length; o--; )
        n[l[o]] = n[s];
  return n;
}, Il = function(t, i, e, r) {
  var n = i.ease || r || "power1.inOut", s, o;
  if (Yt(i))
    o = e[t] || (e[t] = []), i.forEach(function(l, u) {
      return o.push({
        t: u / (i.length - 1) * 100,
        v: l,
        e: n
      });
    });
  else
    for (s in i)
      o = e[s] || (e[s] = []), s === "ease" || o.push({
        t: parseFloat(t),
        v: i[s],
        e: n
      });
}, Ar = function(t, i, e, r, n) {
  return ht(t) ? t.call(i, e, r, n) : Mt(t) && ~t.indexOf("random(") ? Wr(t) : t;
}, ha = As + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", ca = {};
re(ha + ",id,stagger,delay,duration,paused,scrollTrigger", function(a) {
  return ca[a] = 1;
});
var xt = /* @__PURE__ */ function(a) {
  Eo(t, a);
  function t(e, r, n, s) {
    var o;
    typeof r == "number" && (n.duration = r, r = n, n = null), o = a.call(this, s ? r : Er(r)) || this;
    var l = o.vars, u = l.duration, f = l.delay, d = l.immediateRender, c = l.stagger, h = l.overwrite, p = l.keyframes, _ = l.defaults, m = l.scrollTrigger, v = l.yoyoEase, S = r.parent || at, b = (Yt(e) || Ao(e) ? ei(e[0]) : "length" in r) ? [e] : Se(e), y, T, k, w, C, P, M, R;
    if (o._targets = b.length ? Rs(b) : wn("GSAP target " + e + " not found. https://greensock.com", !ge.nullTargetWarn) || [], o._ptLookup = [], o._overwrite = h, p || c || Kr(u) || Kr(f)) {
      if (r = o.vars, y = o.timeline = new ee({
        data: "nested",
        defaults: _ || {},
        targets: S && S.data === "nested" ? S.vars.targets : b
      }), y.kill(), y.parent = y._dp = je(o), y._start = 0, c || Kr(u) || Kr(f)) {
        if (w = b.length, M = c && jo(c), $e(c))
          for (C in c)
            ~ha.indexOf(C) && (R || (R = {}), R[C] = c[C]);
        for (T = 0; T < w; T++)
          k = Tn(r, ca), k.stagger = 0, v && (k.yoyoEase = v), R && Ii(k, R), P = b[T], k.duration = +Ar(u, je(o), T, P, b), k.delay = (+Ar(f, je(o), T, P, b) || 0) - o._delay, !c && w === 1 && k.delay && (o._delay = f = k.delay, o._start += f, k.delay = 0), y.to(P, k, M ? M(T, P, b) : 0), y._ease = j.none;
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
    return h === !0 && !ks && (li = je(o), at.killTweensOf(b), li = 0), We(S, je(o), n), r.reversed && o.reverse(), r.paused && o.paused(!0), (d || !u && !p && o._start === At(S._time) && ie(d) && dl(je(o)) && S.data !== "nested") && (o._tTime = -tt, o.render(Math.max(0, -f) || 0)), m && $o(je(o), m), o;
  }
  var i = t.prototype;
  return i.render = function(r, n, s) {
    var o = this._time, l = this._tDur, u = this._dur, f = r < 0, d = r > l - tt && !f ? l : r < tt ? 0 : r, c, h, p, _, m, v, S, b, y;
    if (!u)
      gl(this, r, n, s);
    else if (d !== this._tTime || !r || s || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== f) {
      if (c = d, b = this.timeline, this._repeat) {
        if (_ = u + this._rDelay, this._repeat < -1 && f)
          return this.totalTime(_ * 100 + r, n, s);
        if (c = At(d % _), d === l ? (p = this._repeat, c = u) : (p = ~~(d / _), p && p === d / _ && (c = u, p--), c > u && (c = u)), v = this._yoyo && p & 1, v && (y = this._yEase, c = u - c), m = ar(this._tTime, _), c === o && !s && this._initted)
          return this._tTime = d, this;
        p !== m && (b && this._yEase && aa(b, v), this.vars.repeatRefresh && !v && !this._lock && (this._lock = s = 1, this.render(At(_ * p), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (Go(this, f ? r : c, s, n, d))
          return this._tTime = 0, this;
        if (o !== this._time)
          return this;
        if (u !== this._dur)
          return this.render(r, n, s);
      }
      if (this._tTime = d, this._time = c, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = S = (y || this._ease)(c / u), this._from && (this.ratio = S = 1 - S), c && !o && !n && !p && (Pe(this, "onStart"), this._tTime !== d))
        return this;
      for (h = this._pt; h; )
        h.r(S, h.d), h = h._next;
      b && b.render(r < 0 ? r : !c && v ? -tt : b._dur * b._ease(c / this._dur), n, s) || this._startAt && (this._zTime = r), this._onUpdate && !n && (f && ss(this, r, n, s), Pe(this, "onUpdate")), this._repeat && p !== m && this.vars.onRepeat && !n && this.parent && Pe(this, "onRepeat"), (d === this._tDur || !d) && this._tTime === d && (f && !this._onUpdate && ss(this, r, !0, !0), (r || !u) && (d === this._tDur && this._ts > 0 || !d && this._ts < 0) && mi(this, 1), !n && !(f && !o) && (d || o || v) && (Pe(this, d === l ? "onComplete" : "onReverseComplete", !0), this._prom && !(d < l && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, i.targets = function() {
    return this._targets;
  }, i.invalidate = function(r) {
    return (!r || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(r), a.prototype.invalidate.call(this, r);
  }, i.resetTo = function(r, n, s, o) {
    Vr || de.wake(), this._ts || this.play();
    var l = Math.min(this._dur, (this._dp._time - this._start) * this._ts), u;
    return this._initted || Ls(this, l), u = this._ease(l / this._dur), Ll(this, r, n, s, o, u, l) ? this.resetTo(r, n, s, o) : (zn(this, 0), this.parent || Uo(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, i.kill = function(r, n) {
    if (n === void 0 && (n = "all"), !r && (!n || n === "all"))
      return this._lazy = this._pt = 0, this.parent ? Sr(this) : this;
    if (this.timeline) {
      var s = this.timeline.totalDuration();
      return this.timeline.killTweensOf(r, n, li && li.vars.overwrite !== !0)._first || Sr(this), this.parent && s !== this.timeline.totalDuration() && lr(this, this._dur * this.timeline._tDur / s, 0, 1), this;
    }
    var o = this._targets, l = r ? Se(r) : o, u = this._ptLookup, f = this._pt, d, c, h, p, _, m, v;
    if ((!n || n === "all") && cl(o, l))
      return n === "all" && (this._pt = 0), Sr(this);
    for (d = this._op = this._op || [], n !== "all" && (Mt(n) && (_ = {}, re(n, function(S) {
      return _[S] = 1;
    }), n = _), n = Fl(o, n)), v = o.length; v--; )
      if (~l.indexOf(o[v])) {
        c = u[v], n === "all" ? (d[v] = n, p = c, h = {}) : (h = d[v] = d[v] || {}, p = n);
        for (_ in p)
          m = c && c[_], m && ((!("kill" in m.d) || m.d.kill(_) === !0) && An(this, m, "_pt"), delete c[_]), h !== "all" && (h[_] = 1);
      }
    return this._initted && !this._pt && f && Sr(this), this;
  }, t.to = function(r, n) {
    return new t(r, n, arguments[2]);
  }, t.from = function(r, n) {
    return Dr(1, arguments);
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
    return Dr(2, arguments);
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
    var t = new ee(), i = as.call(arguments, 0);
    return i.splice(a === "staggerFromTo" ? 5 : 4, 0, 0), t[a].apply(t, i);
  };
});
var Fs = function(t, i, e) {
  return t[i] = e;
}, _a = function(t, i, e) {
  return t[i](e);
}, Bl = function(t, i, e, r) {
  return t[i](r.fp, e);
}, Nl = function(t, i, e) {
  return t.setAttribute(i, e);
}, Is = function(t, i) {
  return ht(t[i]) ? _a : Cs(t[i]) && t.setAttribute ? Nl : Fs;
}, da = function(t, i) {
  return i.set(i.t, i.p, Math.round((i.s + i.c * t) * 1e6) / 1e6, i);
}, Yl = function(t, i) {
  return i.set(i.t, i.p, !!(i.s + i.c * t), i);
}, pa = function(t, i) {
  var e = i._pt, r = "";
  if (!t && i.b)
    r = i.b;
  else if (t === 1 && i.e)
    r = i.e;
  else {
    for (; e; )
      r = e.p + (e.m ? e.m(e.s + e.c * t) : Math.round((e.s + e.c * t) * 1e4) / 1e4) + r, e = e._next;
    r += i.c;
  }
  i.set(i.t, i.p, r, i);
}, Bs = function(t, i) {
  for (var e = i._pt; e; )
    e.r(t, e.d), e = e._next;
}, Xl = function(t, i, e, r) {
  for (var n = this._pt, s; n; )
    s = n._next, n.p === r && n.modifier(t, i, e), n = s;
}, Wl = function(t) {
  for (var i = this._pt, e, r; i; )
    r = i._next, i.p === t && !i.op || i.op === t ? An(this, i, "_pt") : i.dep || (e = 1), i = r;
  return !e;
}, Vl = function(t, i, e, r) {
  r.mSet(t, i, r.m.call(r.tween, e, r.mt), r);
}, ga = function(t) {
  for (var i = t._pt, e, r, n, s; i; ) {
    for (e = i._next, r = n; r && r.pr > i.pr; )
      r = r._next;
    (i._prev = r ? r._prev : s) ? i._prev._next = i : n = i, (i._next = r) ? r._prev = i : s = i, i = e;
  }
  t._pt = n;
}, ne = /* @__PURE__ */ function() {
  function a(i, e, r, n, s, o, l, u, f) {
    this.t = e, this.s = n, this.c = s, this.p = r, this.r = o || da, this.d = l || this, this.set = u || Fs, this.pr = f || 0, this._next = i, i && (i._prev = this);
  }
  var t = a.prototype;
  return t.modifier = function(e, r, n) {
    this.mSet = this.mSet || this.set, this.set = Vl, this.m = e, this.mt = n, this.tween = r;
  }, a;
}();
re(As + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(a) {
  return Ds[a] = 1;
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
var hr = [], fn = {}, Ul = [], io = 0, Vn = function(t) {
  return (fn[t] || Ul).map(function(i) {
    return i();
  });
}, hs = function() {
  var t = Date.now(), i = [];
  t - io > 2 && (Vn("matchMediaInit"), hr.forEach(function(e) {
    var r = e.queries, n = e.conditions, s, o, l, u;
    for (o in r)
      s = we.matchMedia(r[o]).matches, s && (l = 1), s !== n[o] && (n[o] = s, u = 1);
    u && (e.revert(), l && i.push(e));
  }), Vn("matchMediaRevert"), i.forEach(function(e) {
    return e.onMatch(e);
  }), io = t, Vn("matchMedia"));
}, ma = /* @__PURE__ */ function() {
  function a(i, e) {
    this.selector = e && ls(e), this.data = [], this._r = [], this.isReverted = !1, i && this.add(i);
  }
  var t = a.prototype;
  return t.add = function(e, r, n) {
    ht(e) && (n = r, r = e, e = ht);
    var s = this, o = function() {
      var u = yt, f = s.selector, d;
      return u && u !== s && u.data.push(s), n && (s.selector = ls(n)), yt = s, d = r.apply(s, arguments), ht(d) && s._r.push(d), yt = u, s.selector = f, s.isReverted = !1, d;
    };
    return s.last = o, e === ht ? o(s) : e ? s[e] = o : o;
  }, t.ignore = function(e) {
    var r = yt;
    yt = null, e(this), yt = r;
  }, t.getTweens = function() {
    var e = [];
    return this.data.forEach(function(r) {
      return r instanceof a ? e.push.apply(e, r.getTweens()) : r instanceof xt && !(r.parent && r.parent.data === "nested") && e.push(r);
    }), e;
  }, t.clear = function() {
    this._r.length = this.data.length = 0;
  }, t.kill = function(e, r) {
    var n = this;
    if (e) {
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
        return l.t.revert(e);
      }), this.data.forEach(function(l) {
        return !(l instanceof fr) && l.revert && l.revert(e);
      }), this._r.forEach(function(l) {
        return l(e, n);
      }), this.isReverted = !0;
    } else
      this.data.forEach(function(l) {
        return l.kill && l.kill();
      });
    if (this.clear(), r) {
      var o = hr.indexOf(this);
      ~o && hr.splice(o, 1);
    }
  }, t.revert = function(e) {
    this.kill(e || {});
  }, a;
}(), Hl = /* @__PURE__ */ function() {
  function a(i) {
    this.contexts = [], this.scope = i;
  }
  var t = a.prototype;
  return t.add = function(e, r, n) {
    $e(e) || (e = {
      matches: e
    });
    var s = new ma(0, n || this.scope), o = s.conditions = {}, l, u, f;
    this.contexts.push(s), r = s.add("onMatch", r), s.queries = e;
    for (u in e)
      u === "all" ? f = 1 : (l = we.matchMedia(e[u]), l && (hr.indexOf(s) < 0 && hr.push(s), (o[u] = l.matches) && (f = 1), l.addListener ? l.addListener(hs) : l.addEventListener("change", hs)));
    return f && r(s), this;
  }, t.revert = function(e) {
    this.kill(e || {});
  }, t.kill = function(e) {
    this.contexts.forEach(function(r) {
      return r.kill(e, !0);
    });
  }, a;
}(), Pn = {
  registerPlugin: function() {
    for (var t = arguments.length, i = new Array(t), e = 0; e < t; e++)
      i[e] = arguments[e];
    i.forEach(function(r) {
      return ia(r);
    });
  },
  timeline: function(t) {
    return new ee(t);
  },
  getTweensOf: function(t, i) {
    return at.getTweensOf(t, i);
  },
  getProperty: function(t, i, e, r) {
    Mt(t) && (t = Se(t)[0]);
    var n = Di(t || {}).get, s = e ? Vo : Wo;
    return e === "native" && (e = ""), t && (i ? s((ce[i] && ce[i].get || n)(t, i, e, r)) : function(o, l, u) {
      return s((ce[o] && ce[o].get || n)(t, o, l, u));
    });
  },
  quickSetter: function(t, i, e) {
    if (t = Se(t), t.length > 1) {
      var r = t.map(function(f) {
        return se.quickSetter(f, i, e);
      }), n = r.length;
      return function(f) {
        for (var d = n; d--; )
          r[d](f);
      };
    }
    t = t[0] || {};
    var s = ce[i], o = Di(t), l = o.harness && (o.harness.aliases || {})[i] || i, u = s ? function(f) {
      var d = new s();
      Qi._pt = 0, d.init(t, e ? f + e : f, Qi, 0, [t]), d.render(1, d), Qi._pt && Bs(1, Qi);
    } : o.set(t, l);
    return s ? u : function(f) {
      return u(t, l, e ? f + e : f, o, 1);
    };
  },
  quickTo: function(t, i, e) {
    var r, n = se.to(t, Ii((r = {}, r[i] = "+=0.1", r.paused = !0, r), e || {})), s = function(l, u, f) {
      return n.resetTo(i, l, u, f);
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
    var i = t.name, e = t.effect, r = t.plugins, n = t.defaults, s = t.extendTimeline;
    (r || "").split(",").forEach(function(o) {
      return o && !ce[o] && !me[o] && wn(i + " effect requires " + o + " plugin.");
    }), Nn[i] = function(o, l, u) {
      return e(Se(o), Ce(l || {}, n), u);
    }, s && (ee.prototype[i] = function(o, l, u) {
      return this.add(Nn[i](o, $e(l) ? l : (u = l) && {}, this), u);
    });
  },
  registerEase: function(t, i) {
    j[t] = Ri(i);
  },
  parseEase: function(t, i) {
    return arguments.length ? Ri(t, i) : j;
  },
  getById: function(t) {
    return at.getById(t);
  },
  exportRoot: function(t, i) {
    t === void 0 && (t = {});
    var e = new ee(t), r, n;
    for (e.smoothChildTiming = ie(t.smoothChildTiming), at.remove(e), e._dp = 0, e._time = e._tTime = at._time, r = at._first; r; )
      n = r._next, (i || !(!r._dur && r instanceof xt && r.vars.onComplete === r._targets[0])) && We(e, r, r._start - r._delay), r = n;
    return We(at, e, 0), e;
  },
  context: function(t, i) {
    return t ? new ma(t, i) : yt;
  },
  matchMedia: function(t) {
    return new Hl(t);
  },
  matchMediaRefresh: function() {
    return hr.forEach(function(t) {
      var i = t.conditions, e, r;
      for (r in i)
        i[r] && (i[r] = !1, e = 1);
      e && t.revert();
    }) || hs();
  },
  addEventListener: function(t, i) {
    var e = fn[t] || (fn[t] = []);
    ~e.indexOf(i) || e.push(i);
  },
  removeEventListener: function(t, i) {
    var e = fn[t], r = e && e.indexOf(i);
    r >= 0 && e.splice(r, 1);
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
  ticker: de,
  updateRoot: ee.updateRoot,
  plugins: ce,
  globalTimeline: at,
  core: {
    PropTween: ne,
    globals: Bo,
    Tween: xt,
    Timeline: ee,
    Animation: fr,
    getCache: Di,
    _removeLinkedListItem: An,
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
  return Pn[a] = xt[a];
});
de.add(ee.updateRoot);
Qi = Pn.to({}, {
  duration: 0
});
var $l = function(t, i) {
  for (var e = t._pt; e && e.p !== i && e.op !== i && e.fp !== i; )
    e = e._next;
  return e;
}, Gl = function(t, i) {
  var e = t._targets, r, n, s;
  for (r in i)
    for (n = e.length; n--; )
      s = t._ptLookup[n][r], s && (s = s.d) && (s._pt && (s = $l(s, r)), s && s.modifier && s.modifier(i[r], t, e[n], r));
}, Un = function(t, i) {
  return {
    name: t,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(r, n, s) {
      s._onInit = function(o) {
        var l, u;
        if (Mt(n) && (l = {}, re(n, function(f) {
          return l[f] = 1;
        }), n = l), i) {
          l = {};
          for (u in n)
            l[u] = i(n[u]);
          n = l;
        }
        Gl(o, n);
      };
    }
  };
}, se = Pn.registerPlugin({
  name: "attr",
  init: function(t, i, e, r, n) {
    var s, o, l;
    this.tween = e;
    for (s in i)
      l = t.getAttribute(s) || "", o = this.add(t, "setAttribute", (l || 0) + "", i[s], r, n, 0, 0, s), o.op = s, o.b = l, this._props.push(s);
  },
  render: function(t, i) {
    for (var e = i._pt; e; )
      Nt ? e.set(e.t, e.p, e.b, e) : e.r(t, e.d), e = e._next;
  }
}, {
  name: "endArray",
  init: function(t, i) {
    for (var e = i.length; e--; )
      this.add(t, e, t[e] || 0, i[e], 0, 0, 0, 0, 0, 1);
  }
}, Un("roundProps", us), Un("modifiers"), Un("snap", Zo)) || Pn;
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
}, ii = {}, Ci = 180 / Math.PI, rr = Math.PI / 180, $i = Math.atan2, so = 1e8, Xs = /([A-Z])/g, Kl = /(left|right|width|margin|padding|x)/i, jl = /[\s,\(]\S/, Ve = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, cs = function(t, i) {
  return i.set(i.t, i.p, Math.round((i.s + i.c * t) * 1e4) / 1e4 + i.u, i);
}, Zl = function(t, i) {
  return i.set(i.t, i.p, t === 1 ? i.e : Math.round((i.s + i.c * t) * 1e4) / 1e4 + i.u, i);
}, Ql = function(t, i) {
  return i.set(i.t, i.p, t ? Math.round((i.s + i.c * t) * 1e4) / 1e4 + i.u : i.b, i);
}, Jl = function(t, i) {
  var e = i.s + i.c * t;
  i.set(i.t, i.p, ~~(e + (e < 0 ? -0.5 : 0.5)) + i.u, i);
}, ya = function(t, i) {
  return i.set(i.t, i.p, t ? i.e : i.b, i);
}, va = function(t, i) {
  return i.set(i.t, i.p, t !== 1 ? i.b : i.e, i);
}, tu = function(t, i, e) {
  return t.style[i] = e;
}, eu = function(t, i, e) {
  return t.style.setProperty(i, e);
}, iu = function(t, i, e) {
  return t._gsap[i] = e;
}, ru = function(t, i, e) {
  return t._gsap.scaleX = t._gsap.scaleY = e;
}, nu = function(t, i, e, r, n) {
  var s = t._gsap;
  s.scaleX = s.scaleY = e, s.renderTransform(n, s);
}, su = function(t, i, e, r, n) {
  var s = t._gsap;
  s[i] = e, s.renderTransform(n, s);
}, lt = "transform", Fe = lt + "Origin", ou = function a(t, i) {
  var e = this, r = this.target, n = r.style;
  if (t in ii) {
    if (this.tfm = this.tfm || {}, t !== "transform")
      t = Ve[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(s) {
        return e.tfm[s] = Ze(r, s);
      }) : this.tfm[t] = r._gsap.x ? r._gsap[t] : Ze(r, t);
    else
      return Ve.transform.split(",").forEach(function(s) {
        return a.call(e, s, i);
      });
    if (this.props.indexOf(lt) >= 0)
      return;
    r._gsap.svg && (this.svgo = r.getAttribute("data-svg-origin"), this.props.push(Fe, i, "")), t = lt;
  }
  (n || i) && this.props.push(t, i, n[t]);
}, xa = function(t) {
  t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
}, au = function() {
  var t = this.props, i = this.target, e = i.style, r = i._gsap, n, s;
  for (n = 0; n < t.length; n += 3)
    t[n + 1] ? i[t[n]] = t[n + 2] : t[n + 2] ? e[t[n]] = t[n + 2] : e.removeProperty(t[n].substr(0, 2) === "--" ? t[n] : t[n].replace(Xs, "-$1").toLowerCase());
  if (this.tfm) {
    for (s in this.tfm)
      r[s] = this.tfm[s];
    r.svg && (r.renderTransform(), i.setAttribute("data-svg-origin", this.svgo || "")), n = Ys(), (!n || !n.isStart) && !e[lt] && (xa(e), r.uncache = 1);
  }
}, wa = function(t, i) {
  var e = {
    target: t,
    props: [],
    revert: au,
    save: ou
  };
  return t._gsap || se.core.getCache(t), i && i.split(",").forEach(function(r) {
    return e.save(r);
  }), e;
}, ba, _s = function(t, i) {
  var e = ui.createElementNS ? ui.createElementNS((i || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : ui.createElement(t);
  return e.style ? e : ui.createElement(t);
}, Ue = function a(t, i, e) {
  var r = getComputedStyle(t);
  return r[i] || r.getPropertyValue(i.replace(Xs, "-$1").toLowerCase()) || r.getPropertyValue(i) || !e && a(t, cr(i) || i, 1) || "";
}, oo = "O,Moz,ms,Ms,Webkit".split(","), cr = function(t, i, e) {
  var r = i || Mi, n = r.style, s = 5;
  if (t in n && !e)
    return t;
  for (t = t.charAt(0).toUpperCase() + t.substr(1); s-- && !(oo[s] + t in n); )
    ;
  return s < 0 ? null : (s === 3 ? "ms" : s >= 0 ? oo[s] : "") + t;
}, ds = function() {
  ql() && window.document && (ro = window, ui = ro.document, ir = ui.documentElement, Mi = _s("div") || {
    style: {}
  }, _s("div"), lt = cr(lt), Fe = lt + "Origin", Mi.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", ba = !!cr("perspective"), Ys = se.core.reverting, Ns = 1);
}, Hn = function a(t) {
  var i = _s("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), e = this.parentNode, r = this.nextSibling, n = this.style.cssText, s;
  if (ir.appendChild(i), i.appendChild(this), this.style.display = "block", t)
    try {
      s = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = a;
    } catch {
    }
  else
    this._gsapBBox && (s = this._gsapBBox());
  return e && (r ? e.insertBefore(this, r) : e.appendChild(this)), ir.removeChild(i), this.style.cssText = n, s;
}, ao = function(t, i) {
  for (var e = i.length; e--; )
    if (t.hasAttribute(i[e]))
      return t.getAttribute(i[e]);
}, Ta = function(t) {
  var i;
  try {
    i = t.getBBox();
  } catch {
    i = Hn.call(t, !0);
  }
  return i && (i.width || i.height) || t.getBBox === Hn || (i = Hn.call(t, !0)), i && !i.width && !i.x && !i.y ? {
    x: +ao(t, ["x", "cx", "x1"]) || 0,
    y: +ao(t, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : i;
}, Sa = function(t) {
  return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && Ta(t));
}, Ur = function(t, i) {
  if (i) {
    var e = t.style;
    i in ii && i !== Fe && (i = lt), e.removeProperty ? ((i.substr(0, 2) === "ms" || i.substr(0, 6) === "webkit") && (i = "-" + i), e.removeProperty(i.replace(Xs, "-$1").toLowerCase())) : e.removeAttribute(i);
  }
}, fi = function(t, i, e, r, n, s) {
  var o = new ne(t._pt, i, e, 0, 1, s ? va : ya);
  return t._pt = o, o.b = r, o.e = n, t._props.push(e), o;
}, lo = {
  deg: 1,
  rad: 1,
  turn: 1
}, lu = {
  grid: 1,
  flex: 1
}, yi = function a(t, i, e, r) {
  var n = parseFloat(e) || 0, s = (e + "").trim().substr((n + "").length) || "px", o = Mi.style, l = Kl.test(i), u = t.tagName.toLowerCase() === "svg", f = (u ? "client" : "offset") + (l ? "Width" : "Height"), d = 100, c = r === "px", h = r === "%", p, _, m, v;
  return r === s || !n || lo[r] || lo[s] ? n : (s !== "px" && !c && (n = a(t, i, e, "px")), v = t.getCTM && Sa(t), (h || s === "%") && (ii[i] || ~i.indexOf("adius")) ? (p = v ? t.getBBox()[l ? "width" : "height"] : t[f], pt(h ? n / p * d : n / 100 * p)) : (o[l ? "width" : "height"] = d + (c ? s : r), _ = ~i.indexOf("adius") || r === "em" && t.appendChild && !u ? t : t.parentNode, v && (_ = (t.ownerSVGElement || {}).parentNode), (!_ || _ === ui || !_.appendChild) && (_ = ui.body), m = _._gsap, m && h && m.width && l && m.time === de.time && !m.uncache ? pt(n / m.width * d) : ((h || s === "%") && !lu[Ue(_, "display")] && (o.position = Ue(t, "position")), _ === t && (o.position = "static"), _.appendChild(Mi), p = Mi[f], _.removeChild(Mi), o.position = "absolute", l && h && (m = Di(_), m.time = de.time, m.width = _[f]), pt(c ? p * n / d : p && n ? d / p * n : 0))));
}, Ze = function(t, i, e, r) {
  var n;
  return Ns || ds(), i in Ve && i !== "transform" && (i = Ve[i], ~i.indexOf(",") && (i = i.split(",")[0])), ii[i] && i !== "transform" ? (n = $r(t, r), n = i !== "transformOrigin" ? n[i] : n.svg ? n.origin : Cn(Ue(t, Fe)) + " " + n.zOrigin + "px") : (n = t.style[i], (!n || n === "auto" || r || ~(n + "").indexOf("calc(")) && (n = kn[i] && kn[i](t, i, e) || Ue(t, i) || Yo(t, i) || (i === "opacity" ? 1 : 0))), e && !~(n + "").trim().indexOf(" ") ? yi(t, i, n, e) + e : n;
}, uu = function(t, i, e, r) {
  if (!e || e === "none") {
    var n = cr(i, t, 1), s = n && Ue(t, n, 1);
    s && s !== e ? (i = n, e = s) : i === "borderColor" && (e = Ue(t, "borderTopColor"));
  }
  var o = new ne(this._pt, t.style, i, 0, 1, pa), l = 0, u = 0, f, d, c, h, p, _, m, v, S, b, y, T;
  if (o.b = e, o.e = r, e += "", r += "", r === "auto" && (t.style[i] = r, r = Ue(t, i) || r, t.style[i] = e), f = [e, r], sa(f), e = f[0], r = f[1], c = e.match(Zi) || [], T = r.match(Zi) || [], T.length) {
    for (; d = Zi.exec(r); )
      m = d[0], S = r.substring(l, d.index), p ? p = (p + 1) % 5 : (S.substr(-5) === "rgba(" || S.substr(-5) === "hsla(") && (p = 1), m !== (_ = c[u++] || "") && (h = parseFloat(_) || 0, y = _.substr((h + "").length), m.charAt(1) === "=" && (m = er(h, m) + y), v = parseFloat(m), b = m.substr((v + "").length), l = Zi.lastIndex - b.length, b || (b = b || ge.units[i] || y, l === r.length && (r += b, o.e += b)), y !== b && (h = yi(t, i, _, b) || 0), o._pt = {
        _next: o._pt,
        p: S || u === 1 ? S : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: h,
        c: v - h,
        m: p && p < 4 || i === "zIndex" ? Math.round : 0
      });
    o.c = l < r.length ? r.substring(l, r.length) : "";
  } else
    o.r = i === "display" && r === "none" ? va : ya;
  return zo.test(r) && (o.e = 0), this._pt = o, o;
}, uo = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, fu = function(t) {
  var i = t.split(" "), e = i[0], r = i[1] || "50%";
  return (e === "top" || e === "bottom" || r === "left" || r === "right") && (t = e, e = r, r = t), i[0] = uo[e] || e, i[1] = uo[r] || r, i.join(" ");
}, hu = function(t, i) {
  if (i.tween && i.tween._time === i.tween._dur) {
    var e = i.t, r = e.style, n = i.u, s = e._gsap, o, l, u;
    if (n === "all" || n === !0)
      r.cssText = "", l = 1;
    else
      for (n = n.split(","), u = n.length; --u > -1; )
        o = n[u], ii[o] && (l = 1, o = o === "transformOrigin" ? Fe : lt), Ur(e, o);
    l && (Ur(e, lt), s && (s.svg && e.removeAttribute("transform"), $r(e, 1), s.uncache = 1, xa(r)));
  }
}, kn = {
  clearProps: function(t, i, e, r, n) {
    if (n.data !== "isFromStart") {
      var s = t._pt = new ne(t._pt, i, e, 0, 0, hu);
      return s.u = r, s.pr = -10, s.tween = n, t._props.push(e), 1;
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
}, Hr = [1, 0, 0, 1, 0, 0], Pa = {}, ka = function(t) {
  return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
}, fo = function(t) {
  var i = Ue(t, lt);
  return ka(i) ? Hr : i.substr(7).match(Ro).map(pt);
}, Ws = function(t, i) {
  var e = t._gsap || Di(t), r = t.style, n = fo(t), s, o, l, u;
  return e.svg && t.getAttribute("transform") ? (l = t.transform.baseVal.consolidate().matrix, n = [l.a, l.b, l.c, l.d, l.e, l.f], n.join(",") === "1,0,0,1,0,0" ? Hr : n) : (n === Hr && !t.offsetParent && t !== ir && !e.svg && (l = r.display, r.display = "block", s = t.parentNode, (!s || !t.offsetParent) && (u = 1, o = t.nextElementSibling, ir.appendChild(t)), n = fo(t), l ? r.display = l : Ur(t, "display"), u && (o ? s.insertBefore(t, o) : s ? s.appendChild(t) : ir.removeChild(t))), i && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n);
}, ps = function(t, i, e, r, n, s) {
  var o = t._gsap, l = n || Ws(t, !0), u = o.xOrigin || 0, f = o.yOrigin || 0, d = o.xOffset || 0, c = o.yOffset || 0, h = l[0], p = l[1], _ = l[2], m = l[3], v = l[4], S = l[5], b = i.split(" "), y = parseFloat(b[0]) || 0, T = parseFloat(b[1]) || 0, k, w, C, P;
  e ? l !== Hr && (w = h * m - p * _) && (C = y * (m / w) + T * (-_ / w) + (_ * S - m * v) / w, P = y * (-p / w) + T * (h / w) - (h * S - p * v) / w, y = C, T = P) : (k = Ta(t), y = k.x + (~b[0].indexOf("%") ? y / 100 * k.width : y), T = k.y + (~(b[1] || b[0]).indexOf("%") ? T / 100 * k.height : T)), r || r !== !1 && o.smooth ? (v = y - u, S = T - f, o.xOffset = d + (v * h + S * _) - v, o.yOffset = c + (v * p + S * m) - S) : o.xOffset = o.yOffset = 0, o.xOrigin = y, o.yOrigin = T, o.smooth = !!r, o.origin = i, o.originIsAbsolute = !!e, t.style[Fe] = "0px 0px", s && (fi(s, o, "xOrigin", u, y), fi(s, o, "yOrigin", f, T), fi(s, o, "xOffset", d, o.xOffset), fi(s, o, "yOffset", c, o.yOffset)), t.setAttribute("data-svg-origin", y + " " + T);
}, $r = function(t, i) {
  var e = t._gsap || new ua(t);
  if ("x" in e && !i && !e.uncache)
    return e;
  var r = t.style, n = e.scaleX < 0, s = "px", o = "deg", l = getComputedStyle(t), u = Ue(t, Fe) || "0", f, d, c, h, p, _, m, v, S, b, y, T, k, w, C, P, M, R, E, W, B, Y, q, L, K, Q, g, et, Xt, Oe, ut, zt;
  return f = d = c = _ = m = v = S = b = y = 0, h = p = 1, e.svg = !!(t.getCTM && Sa(t)), l.translate && ((l.translate !== "none" || l.scale !== "none" || l.rotate !== "none") && (r[lt] = (l.translate !== "none" ? "translate3d(" + (l.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (l.rotate !== "none" ? "rotate(" + l.rotate + ") " : "") + (l.scale !== "none" ? "scale(" + l.scale.split(" ").join(",") + ") " : "") + (l[lt] !== "none" ? l[lt] : "")), r.scale = r.rotate = r.translate = "none"), w = Ws(t, e.svg), e.svg && (e.uncache ? (K = t.getBBox(), u = e.xOrigin - K.x + "px " + (e.yOrigin - K.y) + "px", L = "") : L = !i && t.getAttribute("data-svg-origin"), ps(t, L || u, !!L || e.originIsAbsolute, e.smooth !== !1, w)), T = e.xOrigin || 0, k = e.yOrigin || 0, w !== Hr && (R = w[0], E = w[1], W = w[2], B = w[3], f = Y = w[4], d = q = w[5], w.length === 6 ? (h = Math.sqrt(R * R + E * E), p = Math.sqrt(B * B + W * W), _ = R || E ? $i(E, R) * Ci : 0, S = W || B ? $i(W, B) * Ci + _ : 0, S && (p *= Math.abs(Math.cos(S * rr))), e.svg && (f -= T - (T * R + k * W), d -= k - (T * E + k * B))) : (zt = w[6], Oe = w[7], g = w[8], et = w[9], Xt = w[10], ut = w[11], f = w[12], d = w[13], c = w[14], C = $i(zt, Xt), m = C * Ci, C && (P = Math.cos(-C), M = Math.sin(-C), L = Y * P + g * M, K = q * P + et * M, Q = zt * P + Xt * M, g = Y * -M + g * P, et = q * -M + et * P, Xt = zt * -M + Xt * P, ut = Oe * -M + ut * P, Y = L, q = K, zt = Q), C = $i(-W, Xt), v = C * Ci, C && (P = Math.cos(-C), M = Math.sin(-C), L = R * P - g * M, K = E * P - et * M, Q = W * P - Xt * M, ut = B * M + ut * P, R = L, E = K, W = Q), C = $i(E, R), _ = C * Ci, C && (P = Math.cos(C), M = Math.sin(C), L = R * P + E * M, K = Y * P + q * M, E = E * P - R * M, q = q * P - Y * M, R = L, Y = K), m && Math.abs(m) + Math.abs(_) > 359.9 && (m = _ = 0, v = 180 - v), h = pt(Math.sqrt(R * R + E * E + W * W)), p = pt(Math.sqrt(q * q + zt * zt)), C = $i(Y, q), S = Math.abs(C) > 2e-4 ? C * Ci : 0, y = ut ? 1 / (ut < 0 ? -ut : ut) : 0), e.svg && (L = t.getAttribute("transform"), e.forceCSS = t.setAttribute("transform", "") || !ka(Ue(t, lt)), L && t.setAttribute("transform", L))), Math.abs(S) > 90 && Math.abs(S) < 270 && (n ? (h *= -1, S += _ <= 0 ? 180 : -180, _ += _ <= 0 ? 180 : -180) : (p *= -1, S += S <= 0 ? 180 : -180)), i = i || e.uncache, e.x = f - ((e.xPercent = f && (!i && e.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-f) ? -50 : 0))) ? t.offsetWidth * e.xPercent / 100 : 0) + s, e.y = d - ((e.yPercent = d && (!i && e.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-d) ? -50 : 0))) ? t.offsetHeight * e.yPercent / 100 : 0) + s, e.z = c + s, e.scaleX = pt(h), e.scaleY = pt(p), e.rotation = pt(_) + o, e.rotationX = pt(m) + o, e.rotationY = pt(v) + o, e.skewX = S + o, e.skewY = b + o, e.transformPerspective = y + s, (e.zOrigin = parseFloat(u.split(" ")[2]) || 0) && (r[Fe] = Cn(u)), e.xOffset = e.yOffset = 0, e.force3D = ge.force3D, e.renderTransform = e.svg ? _u : ba ? Ca : cu, e.uncache = 0, e;
}, Cn = function(t) {
  return (t = t.split(" "))[0] + " " + t[1];
}, $n = function(t, i, e) {
  var r = Bt(i);
  return pt(parseFloat(i) + parseFloat(yi(t, "x", e + "px", r))) + r;
}, cu = function(t, i) {
  i.z = "0px", i.rotationY = i.rotationX = "0deg", i.force3D = 0, Ca(t, i);
}, Pi = "0deg", wr = "0px", ki = ") ", Ca = function(t, i) {
  var e = i || this, r = e.xPercent, n = e.yPercent, s = e.x, o = e.y, l = e.z, u = e.rotation, f = e.rotationY, d = e.rotationX, c = e.skewX, h = e.skewY, p = e.scaleX, _ = e.scaleY, m = e.transformPerspective, v = e.force3D, S = e.target, b = e.zOrigin, y = "", T = v === "auto" && t && t !== 1 || v === !0;
  if (b && (d !== Pi || f !== Pi)) {
    var k = parseFloat(f) * rr, w = Math.sin(k), C = Math.cos(k), P;
    k = parseFloat(d) * rr, P = Math.cos(k), s = $n(S, s, w * P * -b), o = $n(S, o, -Math.sin(k) * -b), l = $n(S, l, C * P * -b + b);
  }
  m !== wr && (y += "perspective(" + m + ki), (r || n) && (y += "translate(" + r + "%, " + n + "%) "), (T || s !== wr || o !== wr || l !== wr) && (y += l !== wr || T ? "translate3d(" + s + ", " + o + ", " + l + ") " : "translate(" + s + ", " + o + ki), u !== Pi && (y += "rotate(" + u + ki), f !== Pi && (y += "rotateY(" + f + ki), d !== Pi && (y += "rotateX(" + d + ki), (c !== Pi || h !== Pi) && (y += "skew(" + c + ", " + h + ki), (p !== 1 || _ !== 1) && (y += "scale(" + p + ", " + _ + ki), S.style[lt] = y || "translate(0, 0)";
}, _u = function(t, i) {
  var e = i || this, r = e.xPercent, n = e.yPercent, s = e.x, o = e.y, l = e.rotation, u = e.skewX, f = e.skewY, d = e.scaleX, c = e.scaleY, h = e.target, p = e.xOrigin, _ = e.yOrigin, m = e.xOffset, v = e.yOffset, S = e.forceCSS, b = parseFloat(s), y = parseFloat(o), T, k, w, C, P;
  l = parseFloat(l), u = parseFloat(u), f = parseFloat(f), f && (f = parseFloat(f), u += f, l += f), l || u ? (l *= rr, u *= rr, T = Math.cos(l) * d, k = Math.sin(l) * d, w = Math.sin(l - u) * -c, C = Math.cos(l - u) * c, u && (f *= rr, P = Math.tan(u - f), P = Math.sqrt(1 + P * P), w *= P, C *= P, f && (P = Math.tan(f), P = Math.sqrt(1 + P * P), T *= P, k *= P)), T = pt(T), k = pt(k), w = pt(w), C = pt(C)) : (T = d, C = c, k = w = 0), (b && !~(s + "").indexOf("px") || y && !~(o + "").indexOf("px")) && (b = yi(h, "x", s, "px"), y = yi(h, "y", o, "px")), (p || _ || m || v) && (b = pt(b + p - (p * T + _ * w) + m), y = pt(y + _ - (p * k + _ * C) + v)), (r || n) && (P = h.getBBox(), b = pt(b + r / 100 * P.width), y = pt(y + n / 100 * P.height)), P = "matrix(" + T + "," + k + "," + w + "," + C + "," + b + "," + y + ")", h.setAttribute("transform", P), S && (h.style[lt] = P);
}, du = function(t, i, e, r, n) {
  var s = 360, o = Mt(n), l = parseFloat(n) * (o && ~n.indexOf("rad") ? Ci : 1), u = l - r, f = r + u + "deg", d, c;
  return o && (d = n.split("_")[1], d === "short" && (u %= s, u !== u % (s / 2) && (u += u < 0 ? s : -s)), d === "cw" && u < 0 ? u = (u + s * so) % s - ~~(u / s) * s : d === "ccw" && u > 0 && (u = (u - s * so) % s - ~~(u / s) * s)), t._pt = c = new ne(t._pt, i, e, r, u, Zl), c.e = f, c.u = "deg", t._props.push(e), c;
}, ho = function(t, i) {
  for (var e in i)
    t[e] = i[e];
  return t;
}, pu = function(t, i, e) {
  var r = ho({}, e._gsap), n = "perspective,force3D,transformOrigin,svgOrigin", s = e.style, o, l, u, f, d, c, h, p;
  r.svg ? (u = e.getAttribute("transform"), e.setAttribute("transform", ""), s[lt] = i, o = $r(e, 1), Ur(e, lt), e.setAttribute("transform", u)) : (u = getComputedStyle(e)[lt], s[lt] = i, o = $r(e, 1), s[lt] = u);
  for (l in ii)
    u = r[l], f = o[l], u !== f && n.indexOf(l) < 0 && (h = Bt(u), p = Bt(f), d = h !== p ? yi(e, l, u, p) : parseFloat(u), c = parseFloat(f), t._pt = new ne(t._pt, o, l, d, c - d, cs), t._pt.u = p || 0, t._props.push(l));
  ho(o, r);
};
re("padding,margin,Width,Radius", function(a, t) {
  var i = "Top", e = "Right", r = "Bottom", n = "Left", s = (t < 3 ? [i, e, r, n] : [i + n, i + e, r + e, r + n]).map(function(o) {
    return t < 2 ? a + o : "border" + o + a;
  });
  kn[t > 1 ? "border" + a : a] = function(o, l, u, f, d) {
    var c, h;
    if (arguments.length < 4)
      return c = s.map(function(p) {
        return Ze(o, p, u);
      }), h = c.join(" "), h.split(c[0]).length === 5 ? c[0] : h;
    c = (f + "").split(" "), h = {}, s.forEach(function(p, _) {
      return h[p] = c[_] = c[_] || c[(_ - 1) / 2 | 0];
    }), o.init(l, h, d);
  };
});
var Oa = {
  name: "css",
  register: ds,
  targetTest: function(t) {
    return t.style && t.nodeType;
  },
  init: function(t, i, e, r, n) {
    var s = this._props, o = t.style, l = e.vars.startAt, u, f, d, c, h, p, _, m, v, S, b, y, T, k, w, C;
    Ns || ds(), this.styles = this.styles || wa(t), C = this.styles.props, this.tween = e;
    for (_ in i)
      if (_ !== "autoRound" && (f = i[_], !(ce[_] && fa(_, i, e, r, t, n)))) {
        if (h = typeof f, p = kn[_], h === "function" && (f = f.call(e, r, t, n), h = typeof f), h === "string" && ~f.indexOf("random(") && (f = Wr(f)), p)
          p(this, t, _, f, e) && (w = 1);
        else if (_.substr(0, 2) === "--")
          u = (getComputedStyle(t).getPropertyValue(_) + "").trim(), f += "", pi.lastIndex = 0, pi.test(u) || (m = Bt(u), v = Bt(f)), v ? m !== v && (u = yi(t, _, u, v) + v) : m && (f += m), this.add(o, "setProperty", u, f, r, n, 0, 0, _), s.push(_), C.push(_, 0, o[_]);
        else if (h !== "undefined") {
          if (l && _ in l ? (u = typeof l[_] == "function" ? l[_].call(e, r, t, n) : l[_], Mt(u) && ~u.indexOf("random(") && (u = Wr(u)), Bt(u + "") || (u += ge.units[_] || Bt(Ze(t, _)) || ""), (u + "").charAt(1) === "=" && (u = Ze(t, _))) : u = Ze(t, _), c = parseFloat(u), S = h === "string" && f.charAt(1) === "=" && f.substr(0, 2), S && (f = f.substr(2)), d = parseFloat(f), _ in Ve && (_ === "autoAlpha" && (c === 1 && Ze(t, "visibility") === "hidden" && d && (c = 0), C.push("visibility", 0, o.visibility), fi(this, o, "visibility", c ? "inherit" : "hidden", d ? "inherit" : "hidden", !d)), _ !== "scale" && _ !== "transform" && (_ = Ve[_], ~_.indexOf(",") && (_ = _.split(",")[0]))), b = _ in ii, b) {
            if (this.styles.save(_), y || (T = t._gsap, T.renderTransform && !i.parseTransform || $r(t, i.parseTransform), k = i.smoothOrigin !== !1 && T.smooth, y = this._pt = new ne(this._pt, o, lt, 0, 1, T.renderTransform, T, 0, -1), y.dep = 1), _ === "scale")
              this._pt = new ne(this._pt, T, "scaleY", T.scaleY, (S ? er(T.scaleY, S + d) : d) - T.scaleY || 0, cs), this._pt.u = 0, s.push("scaleY", _), _ += "X";
            else if (_ === "transformOrigin") {
              C.push(Fe, 0, o[Fe]), f = fu(f), T.svg ? ps(t, f, 0, k, 0, this) : (v = parseFloat(f.split(" ")[2]) || 0, v !== T.zOrigin && fi(this, T, "zOrigin", T.zOrigin, v), fi(this, o, _, Cn(u), Cn(f)));
              continue;
            } else if (_ === "svgOrigin") {
              ps(t, f, 1, k, 0, this);
              continue;
            } else if (_ in Pa) {
              du(this, T, _, c, S ? er(c, S + f) : f);
              continue;
            } else if (_ === "smoothOrigin") {
              fi(this, T, "smooth", T.smooth, f);
              continue;
            } else if (_ === "force3D") {
              T[_] = f;
              continue;
            } else if (_ === "transform") {
              pu(this, f, t);
              continue;
            }
          } else
            _ in o || (_ = cr(_) || _);
          if (b || (d || d === 0) && (c || c === 0) && !jl.test(f) && _ in o)
            m = (u + "").substr((c + "").length), d || (d = 0), v = Bt(f) || (_ in ge.units ? ge.units[_] : m), m !== v && (c = yi(t, _, u, v)), this._pt = new ne(this._pt, b ? T : o, _, c, (S ? er(c, S + d) : d) - c, !b && (v === "px" || _ === "zIndex") && i.autoRound !== !1 ? Jl : cs), this._pt.u = v || 0, m !== v && v !== "%" && (this._pt.b = u, this._pt.r = Ql);
          else if (_ in o)
            uu.call(this, t, _, u, S ? S + f : f);
          else if (_ in t)
            this.add(t, _, u || t[_], S ? S + f : f, r, n);
          else if (_ !== "parseTransform") {
            Es(_, f);
            continue;
          }
          b || (_ in o ? C.push(_, 0, o[_]) : C.push(_, 1, u || t[_])), s.push(_);
        }
      }
    w && ga(this);
  },
  render: function(t, i) {
    if (i.tween._time || !Ys())
      for (var e = i._pt; e; )
        e.r(t, e.d), e = e._next;
    else
      i.styles.revert();
  },
  get: Ze,
  aliases: Ve,
  getSetter: function(t, i, e) {
    var r = Ve[i];
    return r && r.indexOf(",") < 0 && (i = r), i in ii && i !== Fe && (t._gsap.x || Ze(t, "x")) ? e && no === e ? i === "scale" ? ru : iu : (no = e || {}) && (i === "scale" ? nu : su) : t.style && !Cs(t.style[i]) ? tu : ~i.indexOf("-") ? eu : Is(t, i);
  },
  core: {
    _removeProperty: Ur,
    _getMatrix: Ws
  }
};
se.utils.checkPrefix = cr;
se.core.getStyleSaver = wa;
(function(a, t, i, e) {
  var r = re(a + "," + t + "," + i, function(n) {
    ii[n] = 1;
  });
  re(t, function(n) {
    ge.units[n] = "deg", Pa[n] = 1;
  }), Ve[r[13]] = a + "," + t, re(e, function(n) {
    var s = n.split(":");
    Ve[s[1]] = r[s[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
re("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(a) {
  ge.units[a] = "px";
});
se.registerPlugin(Oa);
var hn = se.registerPlugin(Oa) || se;
hn.core.Tween;
function co(a, t) {
  for (var i = 0; i < t.length; i++) {
    var e = t[i];
    e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(a, e.key, e);
  }
}
function gu(a, t, i) {
  return t && co(a.prototype, t), i && co(a, i), a;
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
var Rt, gs, pe, hi, ci, nr, Ma, Oi, Rr, Ea, Je, Ae, Da, Aa = function() {
  return Rt || typeof window < "u" && (Rt = window.gsap) && Rt.registerPlugin && Rt;
}, Ra = 1, Ji = [], H = [], He = [], zr = Date.now, ms = function(t, i) {
  return i;
}, mu = function() {
  var t = Rr.core, i = t.bridge || {}, e = t._scrollers, r = t._proxies;
  e.push.apply(e, H), r.push.apply(r, He), H = e, He = r, ms = function(s, o) {
    return i[s](o);
  };
}, gi = function(t, i) {
  return ~He.indexOf(t) && He[He.indexOf(t) + 1][i];
}, Lr = function(t) {
  return !!~Ea.indexOf(t);
}, Jt = function(t, i, e, r, n) {
  return t.addEventListener(i, e, {
    passive: !r,
    capture: !!n
  });
}, qt = function(t, i, e, r) {
  return t.removeEventListener(i, e, !!r);
}, jr = "scrollLeft", Zr = "scrollTop", ys = function() {
  return Je && Je.isPressed || H.cache++;
}, On = function(t, i) {
  var e = function r(n) {
    if (n || n === 0) {
      Ra && (pe.history.scrollRestoration = "manual");
      var s = Je && Je.isPressed;
      n = r.v = Math.round(n) || (Je && Je.iOS ? 1 : 0), t(n), r.cacheID = H.cache, s && ms("ss", n);
    } else
      (i || H.cache !== r.cacheID || ms("ref")) && (r.cacheID = H.cache, r.v = t());
    return r.v + r.offset;
  };
  return e.offset = 0, t && e;
}, Zt = {
  s: jr,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: On(function(a) {
    return arguments.length ? pe.scrollTo(a, wt.sc()) : pe.pageXOffset || hi[jr] || ci[jr] || nr[jr] || 0;
  })
}, wt = {
  s: Zr,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: Zt,
  sc: On(function(a) {
    return arguments.length ? pe.scrollTo(Zt.sc(), a) : pe.pageYOffset || hi[Zr] || ci[Zr] || nr[Zr] || 0;
  })
}, te = function(t) {
  return Rt.utils.toArray(t)[0] || (typeof t == "string" && Rt.config().nullTargetWarn !== !1 ? console.warn("Element not found:", t) : null);
}, vi = function(t, i) {
  var e = i.s, r = i.sc;
  Lr(t) && (t = hi.scrollingElement || ci);
  var n = H.indexOf(t), s = r === wt.sc ? 1 : 2;
  !~n && (n = H.push(t) - 1), H[n + s] || t.addEventListener("scroll", ys);
  var o = H[n + s], l = o || (H[n + s] = On(gi(t, e), !0) || (Lr(t) ? r : On(function(u) {
    return arguments.length ? t[e] = u : t[e];
  })));
  return l.target = t, o || (l.smooth = Rt.getProperty(t, "scrollBehavior") === "smooth"), l;
}, vs = function(t, i, e) {
  var r = t, n = t, s = zr(), o = s, l = i || 50, u = Math.max(500, l * 3), f = function(p, _) {
    var m = zr();
    _ || m - s > l ? (n = r, r = p, o = s, s = m) : e ? r += p : r = n + (p - n) / (m - o) * (s - o);
  }, d = function() {
    n = r = e ? 0 : r, o = s = 0;
  }, c = function(p) {
    var _ = o, m = n, v = zr();
    return (p || p === 0) && p !== r && f(p), s === o || v - o > u ? 0 : (r + (e ? m : -m)) / ((e ? v : s) - _) * 1e3;
  };
  return {
    update: f,
    reset: d,
    getVelocity: c
  };
}, br = function(t, i) {
  return i && !t._gsapAllow && t.preventDefault(), t.changedTouches ? t.changedTouches[0] : t;
}, _o = function(t) {
  var i = Math.max.apply(Math, t), e = Math.min.apply(Math, t);
  return Math.abs(i) >= Math.abs(e) ? i : e;
}, za = function() {
  Rr = Rt.core.globals().ScrollTrigger, Rr && Rr.core && mu();
}, La = function(t) {
  return Rt = t || Aa(), Rt && typeof document < "u" && document.body && (pe = window, hi = document, ci = hi.documentElement, nr = hi.body, Ea = [pe, hi, ci, nr], Rt.utils.clamp, Da = Rt.core.context || function() {
  }, Oi = "onpointerenter" in nr ? "pointer" : "mouse", Ma = vt.isTouch = pe.matchMedia && pe.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in pe || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, Ae = vt.eventTypes = ("ontouchstart" in ci ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in ci ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return Ra = 0;
  }, 500), za(), gs = 1), gs;
};
Zt.op = wt;
H.cache = 0;
var vt = /* @__PURE__ */ function() {
  function a(i) {
    this.init(i);
  }
  var t = a.prototype;
  return t.init = function(e) {
    gs || La(Rt) || console.warn("Please gsap.registerPlugin(Observer)"), Rr || za();
    var r = e.tolerance, n = e.dragMinimum, s = e.type, o = e.target, l = e.lineHeight, u = e.debounce, f = e.preventDefault, d = e.onStop, c = e.onStopDelay, h = e.ignore, p = e.wheelSpeed, _ = e.event, m = e.onDragStart, v = e.onDragEnd, S = e.onDrag, b = e.onPress, y = e.onRelease, T = e.onRight, k = e.onLeft, w = e.onUp, C = e.onDown, P = e.onChangeX, M = e.onChangeY, R = e.onChange, E = e.onToggleX, W = e.onToggleY, B = e.onHover, Y = e.onHoverEnd, q = e.onMove, L = e.ignoreCheck, K = e.isNormalizer, Q = e.onGestureStart, g = e.onGestureEnd, et = e.onWheel, Xt = e.onEnable, Oe = e.onDisable, ut = e.onClick, zt = e.scrollSpeed, it = e.capture, Lt = e.allowClicks, Wt = e.lockAxis, dr = e.onLockAxis;
    this.target = o = te(o) || ci, this.vars = e, h && (h = Rt.utils.toArray(h)), r = r || 1e-9, n = n || 0, p = p || 1, zt = zt || 1, s = s || "wheel,touch,pointer", u = u !== !1, l || (l = parseFloat(pe.getComputedStyle(nr).lineHeight) || 22);
    var oe, ye, $, bt, ae, Ie, Vt, x = this, Ge = 0, rt = 0, ri = vi(o, Zt), ni = vi(o, wt), Wi = ri(), Ut = ni(), pr = ~s.indexOf("touch") && !~s.indexOf("pointer") && Ae[0] === "pointerdown", si = Lr(o), ct = o.ownerDocument || hi, le = [0, 0, 0], Ht = [0, 0, 0], gr = 0, $t = function() {
      return gr = zr();
    }, Be = function(z, O) {
      return (x.event = z) && h && ~h.indexOf(z.target) || O && pr && z.pointerType !== "touch" || L && L(z, O);
    }, mr = function() {
      x._vx.reset(), x._vy.reset(), ye.pause(), d && d(x);
    }, oi = function() {
      var z = x.deltaX = _o(le), O = x.deltaY = _o(Ht), A = Math.abs(z) >= r, F = Math.abs(O) >= r;
      R && (A || F) && R(x, z, O, le, Ht), A && (T && x.deltaX > 0 && T(x), k && x.deltaX < 0 && k(x), P && P(x), E && x.deltaX < 0 != Ge < 0 && E(x), Ge = x.deltaX, le[0] = le[1] = le[2] = 0), F && (C && x.deltaY > 0 && C(x), w && x.deltaY < 0 && w(x), M && M(x), W && x.deltaY < 0 != rt < 0 && W(x), rt = x.deltaY, Ht[0] = Ht[1] = Ht[2] = 0), (bt || $) && (q && q(x), $ && (S(x), $ = !1), bt = !1), Ie && !(Ie = !1) && dr && dr(x), ae && (et(x), ae = !1), oe = 0;
    }, Vi = function(z, O, A) {
      le[A] += z, Ht[A] += O, x._vx.update(z), x._vy.update(O), u ? oe || (oe = requestAnimationFrame(oi)) : oi();
    }, wi = function(z, O) {
      Wt && !Vt && (x.axis = Vt = Math.abs(z) > Math.abs(O) ? "x" : "y", Ie = !0), Vt !== "y" && (le[2] += z, x._vx.update(z, !0)), Vt !== "x" && (Ht[2] += O, x._vy.update(O, !0)), u ? oe || (oe = requestAnimationFrame(oi)) : oi();
    }, bi = function(z) {
      if (!Be(z, 1)) {
        z = br(z, f);
        var O = z.clientX, A = z.clientY, F = O - x.x, X = A - x.y, Tt = x.isDragging;
        x.x = O, x.y = A, (Tt || Math.abs(x.startX - O) >= n || Math.abs(x.startY - A) >= n) && (S && ($ = !0), Tt || (x.isDragging = !0), wi(F, X), Tt || m && m(x));
      }
    }, U = x.onPress = function(I) {
      Be(I, 1) || I && I.button || (x.axis = Vt = null, ye.pause(), x.isPressed = !0, I = br(I), Ge = rt = 0, x.startX = x.x = I.clientX, x.startY = x.y = I.clientY, x._vx.reset(), x._vy.reset(), Jt(K ? o : ct, Ae[1], bi, f, !0), x.deltaX = x.deltaY = 0, b && b(x));
    }, qe = x.onRelease = function(I) {
      if (!Be(I, 1)) {
        qt(K ? o : ct, Ae[1], bi, !0);
        var z = !isNaN(x.y - x.startY), O = x.isDragging && (Math.abs(x.x - x.startX) > 3 || Math.abs(x.y - x.startY) > 3), A = br(I);
        !O && z && (x._vx.reset(), x._vy.reset(), f && Lt && Rt.delayedCall(0.08, function() {
          if (zr() - gr > 300 && !I.defaultPrevented) {
            if (I.target.click)
              I.target.click();
            else if (ct.createEvent) {
              var F = ct.createEvent("MouseEvents");
              F.initMouseEvent("click", !0, !0, pe, 1, A.screenX, A.screenY, A.clientX, A.clientY, !1, !1, !1, !1, 0, null), I.target.dispatchEvent(F);
            }
          }
        })), x.isDragging = x.isGesturing = x.isPressed = !1, d && !K && ye.restart(!0), v && O && v(x), y && y(x, O);
      }
    }, Me = function(z) {
      return z.touches && z.touches.length > 1 && (x.isGesturing = !0) && Q(z, x.isDragging);
    }, Ee = function() {
      return (x.isGesturing = !1) || g(x);
    }, ve = function(z) {
      if (!Be(z)) {
        var O = ri(), A = ni();
        Vi((O - Wi) * zt, (A - Ut) * zt, 1), Wi = O, Ut = A, d && ye.restart(!0);
      }
    }, De = function(z) {
      if (!Be(z)) {
        z = br(z, f), et && (ae = !0);
        var O = (z.deltaMode === 1 ? l : z.deltaMode === 2 ? pe.innerHeight : 1) * p;
        Vi(z.deltaX * O, z.deltaY * O, 0), d && !K && ye.restart(!0);
      }
    }, Ti = function(z) {
      if (!Be(z)) {
        var O = z.clientX, A = z.clientY, F = O - x.x, X = A - x.y;
        x.x = O, x.y = A, bt = !0, (F || X) && wi(F, X);
      }
    }, Ui = function(z) {
      x.event = z, B(x);
    }, Ke = function(z) {
      x.event = z, Y(x);
    }, yr = function(z) {
      return Be(z) || br(z, f) && ut(x);
    };
    ye = x._dc = Rt.delayedCall(c || 0.25, mr).pause(), x.deltaX = x.deltaY = 0, x._vx = vs(0, 50, !0), x._vy = vs(0, 50, !0), x.scrollX = ri, x.scrollY = ni, x.isDragging = x.isGesturing = x.isPressed = !1, Da(this), x.enable = function(I) {
      return x.isEnabled || (Jt(si ? ct : o, "scroll", ys), s.indexOf("scroll") >= 0 && Jt(si ? ct : o, "scroll", ve, f, it), s.indexOf("wheel") >= 0 && Jt(o, "wheel", De, f, it), (s.indexOf("touch") >= 0 && Ma || s.indexOf("pointer") >= 0) && (Jt(o, Ae[0], U, f, it), Jt(ct, Ae[2], qe), Jt(ct, Ae[3], qe), Lt && Jt(o, "click", $t, !1, !0), ut && Jt(o, "click", yr), Q && Jt(ct, "gesturestart", Me), g && Jt(ct, "gestureend", Ee), B && Jt(o, Oi + "enter", Ui), Y && Jt(o, Oi + "leave", Ke), q && Jt(o, Oi + "move", Ti)), x.isEnabled = !0, I && I.type && U(I), Xt && Xt(x)), x;
    }, x.disable = function() {
      x.isEnabled && (Ji.filter(function(I) {
        return I !== x && Lr(I.target);
      }).length || qt(si ? ct : o, "scroll", ys), x.isPressed && (x._vx.reset(), x._vy.reset(), qt(K ? o : ct, Ae[1], bi, !0)), qt(si ? ct : o, "scroll", ve, it), qt(o, "wheel", De, it), qt(o, Ae[0], U, it), qt(ct, Ae[2], qe), qt(ct, Ae[3], qe), qt(o, "click", $t, !0), qt(o, "click", yr), qt(ct, "gesturestart", Me), qt(ct, "gestureend", Ee), qt(o, Oi + "enter", Ui), qt(o, Oi + "leave", Ke), qt(o, Oi + "move", Ti), x.isEnabled = x.isPressed = x.isDragging = !1, Oe && Oe(x));
    }, x.kill = x.revert = function() {
      x.disable();
      var I = Ji.indexOf(x);
      I >= 0 && Ji.splice(I, 1), Je === x && (Je = 0);
    }, Ji.push(x), K && Lr(o) && (Je = x), x.enable(_);
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
Aa() && Rt.registerPlugin(vt);
/*!
 * ScrollTrigger 3.11.5
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var D, Ki, G, nt, ze, ft, Fa, Mn, En, tr, cn, Qr, It, Ln, xs, Kt, po, go, ji, Ia, Gn, Ba, fe, Na, Ya, Xa, ai, ws, Vs, qn, Jr = 1, jt = Date.now, Kn = jt(), ke = 0, kr = 0, yu = function a() {
  return kr && requestAnimationFrame(a);
}, mo = function() {
  return Ln = 1;
}, yo = function() {
  return Ln = 0;
}, Xe = function(t) {
  return t;
}, Cr = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, Wa = function() {
  return typeof window < "u";
}, Va = function() {
  return D || Wa() && (D = window.gsap) && D.registerPlugin && D;
}, Bi = function(t) {
  return !!~Fa.indexOf(t);
}, Ua = function(t) {
  return gi(t, "getBoundingClientRect") || (Bi(t) ? function() {
    return yn.width = G.innerWidth, yn.height = G.innerHeight, yn;
  } : function() {
    return Qe(t);
  });
}, vu = function(t, i, e) {
  var r = e.d, n = e.d2, s = e.a;
  return (s = gi(t, "getBoundingClientRect")) ? function() {
    return s()[r];
  } : function() {
    return (i ? G["inner" + n] : t["client" + n]) || 0;
  };
}, xu = function(t, i) {
  return !i || ~He.indexOf(t) ? Ua(t) : function() {
    return yn;
  };
}, _i = function(t, i) {
  var e = i.s, r = i.d2, n = i.d, s = i.a;
  return Math.max(0, (e = "scroll" + r) && (s = gi(t, e)) ? s() - Ua(t)()[n] : Bi(t) ? (ze[e] || ft[e]) - (G["inner" + r] || ze["client" + r] || ft["client" + r]) : t[e] - t["offset" + r]);
}, tn = function(t, i) {
  for (var e = 0; e < ji.length; e += 3)
    (!i || ~i.indexOf(ji[e + 1])) && t(ji[e], ji[e + 1], ji[e + 2]);
}, Re = function(t) {
  return typeof t == "string";
}, Qt = function(t) {
  return typeof t == "function";
}, Or = function(t) {
  return typeof t == "number";
}, _n = function(t) {
  return typeof t == "object";
}, Tr = function(t, i, e) {
  return t && t.progress(i ? 0 : 1) && e && t.pause();
}, jn = function(t, i) {
  if (t.enabled) {
    var e = i(t);
    e && e.totalTime && (t.callbackAnimation = e);
  }
}, Gi = Math.abs, Ha = "left", $a = "top", Us = "right", Hs = "bottom", zi = "width", Li = "height", Fr = "Right", Ir = "Left", Br = "Top", Nr = "Bottom", dt = "padding", be = "margin", _r = "Width", $s = "Height", Dt = "px", Le = function(t) {
  return G.getComputedStyle(t);
}, wu = function(t) {
  var i = Le(t).position;
  t.style.position = i === "absolute" || i === "fixed" ? i : "relative";
}, vo = function(t, i) {
  for (var e in i)
    e in t || (t[e] = i[e]);
  return t;
}, Qe = function(t, i) {
  var e = i && Le(t)[xs] !== "matrix(1, 0, 0, 1, 0, 0)" && D.to(t, {
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
  return e && e.progress(0).kill(), r;
}, bs = function(t, i) {
  var e = i.d2;
  return t["offset" + e] || t["client" + e] || 0;
}, Ga = function(t) {
  var i = [], e = t.labels, r = t.duration(), n;
  for (n in e)
    i.push(e[n] / r);
  return i;
}, bu = function(t) {
  return function(i) {
    return D.utils.snap(Ga(t), i);
  };
}, Gs = function(t) {
  var i = D.utils.snap(t), e = Array.isArray(t) && t.slice(0).sort(function(r, n) {
    return r - n;
  });
  return e ? function(r, n, s) {
    s === void 0 && (s = 1e-3);
    var o;
    if (!n)
      return i(r);
    if (n > 0) {
      for (r -= s, o = 0; o < e.length; o++)
        if (e[o] >= r)
          return e[o];
      return e[o - 1];
    } else
      for (o = e.length, r += s; o--; )
        if (e[o] <= r)
          return e[o];
    return e[0];
  } : function(r, n, s) {
    s === void 0 && (s = 1e-3);
    var o = i(r);
    return !n || Math.abs(o - r) < s || o - r < 0 == n < 0 ? o : i(n < 0 ? r - t : r + t);
  };
}, Tu = function(t) {
  return function(i, e) {
    return Gs(Ga(t))(i, e.direction);
  };
}, en = function(t, i, e, r) {
  return e.split(",").forEach(function(n) {
    return t(i, n, r);
  });
}, Ot = function(t, i, e, r, n) {
  return t.addEventListener(i, e, {
    passive: !r,
    capture: !!n
  });
}, Ct = function(t, i, e, r) {
  return t.removeEventListener(i, e, !!r);
}, rn = function(t, i, e) {
  e = e && e.wheelHandler, e && (t(i, "wheel", e), t(i, "touchmove", e));
}, xo = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, nn = {
  toggleActions: "play",
  anticipatePin: 0
}, Dn = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, dn = function(t, i) {
  if (Re(t)) {
    var e = t.indexOf("="), r = ~e ? +(t.charAt(e - 1) + 1) * parseFloat(t.substr(e + 1)) : 0;
    ~e && (t.indexOf("%") > e && (r *= i / 100), t = t.substr(0, e - 1)), t = r + (t in Dn ? Dn[t] * i : ~t.indexOf("%") ? parseFloat(t) * i / 100 : parseFloat(t) || 0);
  }
  return t;
}, sn = function(t, i, e, r, n, s, o, l) {
  var u = n.startColor, f = n.endColor, d = n.fontSize, c = n.indent, h = n.fontWeight, p = nt.createElement("div"), _ = Bi(e) || gi(e, "pinType") === "fixed", m = t.indexOf("scroller") !== -1, v = _ ? ft : e, S = t.indexOf("start") !== -1, b = S ? u : f, y = "border-color:" + b + ";font-size:" + d + ";color:" + b + ";font-weight:" + h + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return y += "position:" + ((m || l) && _ ? "fixed;" : "absolute;"), (m || l || !_) && (y += (r === wt ? Us : Hs) + ":" + (s + parseFloat(c)) + "px;"), o && (y += "box-sizing:border-box;text-align:left;width:" + o.offsetWidth + "px;"), p._isStart = S, p.setAttribute("class", "gsap-marker-" + t + (i ? " marker-" + i : "")), p.style.cssText = y, p.innerText = i || i === 0 ? t + "-" + i : t, v.children[0] ? v.insertBefore(p, v.children[0]) : v.appendChild(p), p._offset = p["offset" + r.op.d2], pn(p, 0, r, S), p;
}, pn = function(t, i, e, r) {
  var n = {
    display: "block"
  }, s = e[r ? "os2" : "p2"], o = e[r ? "p2" : "os2"];
  t._isFlipped = r, n[e.a + "Percent"] = r ? -100 : 0, n[e.a] = r ? "1px" : 0, n["border" + s + _r] = 1, n["border" + o + _r] = 0, n[e.p] = i + "px", D.set(t, n);
}, V = [], Ts = {}, Gr, wo = function() {
  return jt() - ke > 34 && (Gr || (Gr = requestAnimationFrame(ti)));
}, qi = function() {
  (!fe || !fe.isPressed || fe.startX > ft.clientWidth) && (H.cache++, fe ? Gr || (Gr = requestAnimationFrame(ti)) : ti(), ke || Yi("scrollStart"), ke = jt());
}, Zn = function() {
  Xa = G.innerWidth, Ya = G.innerHeight;
}, Mr = function() {
  H.cache++, !It && !Ba && !nt.fullscreenElement && !nt.webkitFullscreenElement && (!Na || Xa !== G.innerWidth || Math.abs(G.innerHeight - Ya) > G.innerHeight * 0.25) && Mn.restart(!0);
}, Ni = {}, Su = [], qa = function a() {
  return Ct(N, "scrollEnd", a) || Ei(!0);
}, Yi = function(t) {
  return Ni[t] && Ni[t].map(function(i) {
    return i();
  }) || Su;
}, he = [], Ka = function(t) {
  for (var i = 0; i < he.length; i += 5)
    (!t || he[i + 4] && he[i + 4].query === t) && (he[i].style.cssText = he[i + 1], he[i].getBBox && he[i].setAttribute("transform", he[i + 2] || ""), he[i + 3].uncache = 1);
}, qs = function(t, i) {
  var e;
  for (Kt = 0; Kt < V.length; Kt++)
    e = V[Kt], e && (!i || e._ctx === i) && (t ? e.kill(1) : e.revert(!0, !0));
  i && Ka(i), i || Yi("revert");
}, ja = function(t, i) {
  H.cache++, (i || !_e) && H.forEach(function(e) {
    return Qt(e) && e.cacheID++ && (e.rec = 0);
  }), Re(t) && (G.history.scrollRestoration = Vs = t);
}, _e, Fi = 0, bo, Pu = function() {
  if (bo !== Fi) {
    var t = bo = Fi;
    requestAnimationFrame(function() {
      return t === Fi && Ei(!0);
    });
  }
}, Ei = function(t, i) {
  if (ke && !t) {
    Ot(N, "scrollEnd", qa);
    return;
  }
  _e = N.isRefreshing = !0, H.forEach(function(r) {
    return Qt(r) && r.cacheID++ && (r.rec = r());
  });
  var e = Yi("refreshInit");
  Ia && N.sort(), i || qs(), H.forEach(function(r) {
    Qt(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"), r(0));
  }), V.slice(0).forEach(function(r) {
    return r.refresh();
  }), V.forEach(function(r, n) {
    if (r._subPinOffset && r.pin) {
      var s = r.vars.horizontal ? "offsetWidth" : "offsetHeight", o = r.pin[s];
      r.revert(!0, 1), r.adjustPinSpacing(r.pin[s] - o), r.refresh();
    }
  }), V.forEach(function(r) {
    return r.vars.end === "max" && r.setPositions(r.start, Math.max(r.start + 1, _i(r.scroller, r._dir)));
  }), e.forEach(function(r) {
    return r && r.render && r.render(-1);
  }), H.forEach(function(r) {
    Qt(r) && (r.smooth && requestAnimationFrame(function() {
      return r.target.style.scrollBehavior = "smooth";
    }), r.rec && r(r.rec));
  }), ja(Vs, 1), Mn.pause(), Fi++, _e = 2, ti(2), V.forEach(function(r) {
    return Qt(r.vars.onRefresh) && r.vars.onRefresh(r);
  }), _e = N.isRefreshing = !1, Yi("refresh");
}, Ss = 0, gn = 1, Yr, ti = function(t) {
  if (!_e || t === 2) {
    N.isUpdating = !0, Yr && Yr.update(0);
    var i = V.length, e = jt(), r = e - Kn >= 50, n = i && V[0].scroll();
    if (gn = Ss > n ? -1 : 1, _e || (Ss = n), r && (ke && !Ln && e - ke > 200 && (ke = 0, Yi("scrollEnd")), cn = Kn, Kn = e), gn < 0) {
      for (Kt = i; Kt-- > 0; )
        V[Kt] && V[Kt].update(0, r);
      gn = 1;
    } else
      for (Kt = 0; Kt < i; Kt++)
        V[Kt] && V[Kt].update(0, r);
    N.isUpdating = !1;
  }
  Gr = 0;
}, Ps = [Ha, $a, Hs, Us, be + Nr, be + Fr, be + Br, be + Ir, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], mn = Ps.concat([zi, Li, "boxSizing", "max" + _r, "max" + $s, "position", be, dt, dt + Br, dt + Fr, dt + Nr, dt + Ir]), ku = function(t, i, e) {
  sr(e);
  var r = t._gsap;
  if (r.spacerIsNative)
    sr(r.spacerState);
  else if (t._gsap.swappedIn) {
    var n = i.parentNode;
    n && (n.insertBefore(t, i), n.removeChild(i));
  }
  t._gsap.swappedIn = !1;
}, Qn = function(t, i, e, r) {
  if (!t._gsap.swappedIn) {
    for (var n = Ps.length, s = i.style, o = t.style, l; n--; )
      l = Ps[n], s[l] = e[l];
    s.position = e.position === "absolute" ? "absolute" : "relative", e.display === "inline" && (s.display = "inline-block"), o[Hs] = o[Us] = "auto", s.flexBasis = e.flexBasis || "auto", s.overflow = "visible", s.boxSizing = "border-box", s[zi] = bs(t, Zt) + Dt, s[Li] = bs(t, wt) + Dt, s[dt] = o[be] = o[$a] = o[Ha] = "0", sr(r), o[zi] = o["max" + _r] = e[zi], o[Li] = o["max" + $s] = e[Li], o[dt] = e[dt], t.parentNode !== i && (t.parentNode.insertBefore(i, t), i.appendChild(t)), t._gsap.swappedIn = !0;
  }
}, Cu = /([A-Z])/g, sr = function(t) {
  if (t) {
    var i = t.t.style, e = t.length, r = 0, n, s;
    for ((t.t._gsap || D.core.getCache(t.t)).uncache = 1; r < e; r += 2)
      s = t[r + 1], n = t[r], s ? i[n] = s : i[n] && i.removeProperty(n.replace(Cu, "-$1").toLowerCase());
  }
}, on = function(t) {
  for (var i = mn.length, e = t.style, r = [], n = 0; n < i; n++)
    r.push(mn[n], e[mn[n]]);
  return r.t = t, r;
}, Ou = function(t, i, e) {
  for (var r = [], n = t.length, s = e ? 8 : 0, o; s < n; s += 2)
    o = t[s], r.push(o, o in i ? i[o] : t[s + 1]);
  return r.t = t.t, r;
}, yn = {
  left: 0,
  top: 0
}, To = function(t, i, e, r, n, s, o, l, u, f, d, c, h) {
  Qt(t) && (t = t(l)), Re(t) && t.substr(0, 3) === "max" && (t = c + (t.charAt(4) === "=" ? dn("0" + t.substr(3), e) : 0));
  var p = h ? h.time() : 0, _, m, v;
  if (h && h.seek(0), Or(t))
    h && (t = D.utils.mapRange(h.scrollTrigger.start, h.scrollTrigger.end, 0, c, t)), o && pn(o, e, r, !0);
  else {
    Qt(i) && (i = i(l));
    var S = (t || "0").split(" "), b, y, T, k;
    v = te(i) || ft, b = Qe(v) || {}, (!b || !b.left && !b.top) && Le(v).display === "none" && (k = v.style.display, v.style.display = "block", b = Qe(v), k ? v.style.display = k : v.style.removeProperty("display")), y = dn(S[0], b[r.d]), T = dn(S[1] || "0", e), t = b[r.p] - u[r.p] - f + y + n - T, o && pn(o, T, r, e - T < 20 || o._isStart && T > 20), e -= e - T;
  }
  if (s) {
    var w = t + e, C = s._isStart;
    _ = "scroll" + r.d2, pn(s, w, r, C && w > 20 || !C && (d ? Math.max(ft[_], ze[_]) : s.parentNode[_]) <= w + 1), d && (u = Qe(o), d && (s.style[r.op.p] = u[r.op.p] - r.op.m - s._offset + Dt));
  }
  return h && v && (_ = Qe(v), h.seek(c), m = Qe(v), h._caScrollDist = _[r.p] - m[r.p], t = t / h._caScrollDist * c), h && h.seek(p), h ? t : Math.round(t);
}, Mu = /(webkit|moz|length|cssText|inset)/i, So = function(t, i, e, r) {
  if (t.parentNode !== i) {
    var n = t.style, s, o;
    if (i === ft) {
      t._stOrig = n.cssText, o = Le(t);
      for (s in o)
        !+s && !Mu.test(s) && o[s] && typeof n[s] == "string" && s !== "0" && (n[s] = o[s]);
      n.top = e, n.left = r;
    } else
      n.cssText = t._stOrig;
    D.core.getCache(t).uncache = 1, i.appendChild(t);
  }
}, Za = function(t, i, e) {
  var r = i, n = r;
  return function(s) {
    var o = Math.round(t());
    return o !== r && o !== n && Math.abs(o - r) > 3 && Math.abs(o - n) > 3 && (s = o, e && e()), n = r, r = s, s;
  };
}, Po = function(t, i) {
  var e = vi(t, i), r = "_scroll" + i.p2, n = function s(o, l, u, f, d) {
    var c = s.tween, h = l.onComplete, p = {};
    u = u || e();
    var _ = Za(e, u, function() {
      c.kill(), s.tween = 0;
    });
    return d = f && d || 0, f = f || o - u, c && c.kill(), l[r] = o, l.modifiers = p, p[r] = function() {
      return _(u + f * c.ratio + d * c.ratio * c.ratio);
    }, l.onUpdate = function() {
      H.cache++, ti();
    }, l.onComplete = function() {
      s.tween = 0, h && h.call(c);
    }, c = s.tween = D.to(t, l), c;
  };
  return t[r] = e, e.wheelHandler = function() {
    return n.tween && n.tween.kill() && (n.tween = 0);
  }, Ot(t, "wheel", e.wheelHandler), N.isTouch && Ot(t, "touchmove", e.wheelHandler), n;
}, N = /* @__PURE__ */ function() {
  function a(i, e) {
    Ki || a.register(D) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), this.init(i, e);
  }
  var t = a.prototype;
  return t.init = function(e, r) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !kr) {
      this.update = this.refresh = this.kill = Xe;
      return;
    }
    e = vo(Re(e) || Or(e) || e.nodeType ? {
      trigger: e
    } : e, nn);
    var n = e, s = n.onUpdate, o = n.toggleClass, l = n.id, u = n.onToggle, f = n.onRefresh, d = n.scrub, c = n.trigger, h = n.pin, p = n.pinSpacing, _ = n.invalidateOnRefresh, m = n.anticipatePin, v = n.onScrubComplete, S = n.onSnapComplete, b = n.once, y = n.snap, T = n.pinReparent, k = n.pinSpacer, w = n.containerAnimation, C = n.fastScrollEnd, P = n.preventOverlaps, M = e.horizontal || e.containerAnimation && e.horizontal !== !1 ? Zt : wt, R = !d && d !== 0, E = te(e.scroller || G), W = D.core.getCache(E), B = Bi(E), Y = ("pinType" in e ? e.pinType : gi(E, "pinType") || B && "fixed") === "fixed", q = [e.onEnter, e.onLeave, e.onEnterBack, e.onLeaveBack], L = R && e.toggleActions.split(" "), K = "markers" in e ? e.markers : nn.markers, Q = B ? 0 : parseFloat(Le(E)["border" + M.p2 + _r]) || 0, g = this, et = e.onRefreshInit && function() {
      return e.onRefreshInit(g);
    }, Xt = vu(E, B, M), Oe = xu(E, B), ut = 0, zt = 0, it = vi(E, M), Lt, Wt, dr, oe, ye, $, bt, ae, Ie, Vt, x, Ge, rt, ri, ni, Wi, Ut, pr, si, ct, le, Ht, gr, $t, Be, mr, oi, Vi, wi, bi, U, qe, Me, Ee, ve, De, Ti, Ui, Ke;
    if (ws(g), g._dir = M, m *= 45, g.scroller = E, g.scroll = w ? w.time.bind(w) : it, oe = it(), g.vars = e, r = r || e.animation, "refreshPriority" in e && (Ia = 1, e.refreshPriority === -9999 && (Yr = g)), W.tweenScroll = W.tweenScroll || {
      top: Po(E, wt),
      left: Po(E, Zt)
    }, g.tweenTo = Lt = W.tweenScroll[M.p], g.scrubDuration = function(O) {
      qe = Or(O) && O, qe ? U ? U.duration(O) : U = D.to(r, {
        ease: "expo",
        totalProgress: "+=0.001",
        duration: qe,
        paused: !0,
        onComplete: function() {
          return v && v(g);
        }
      }) : (U && U.progress(1).kill(), U = 0);
    }, r && (r.vars.lazy = !1, r._initted || r.vars.immediateRender !== !1 && e.immediateRender !== !1 && r.duration() && r.render(0, !0, !0), g.animation = r.pause(), r.scrollTrigger = g, g.scrubDuration(d), U && U.resetTo && U.resetTo("totalProgress", 0), wi = 0, l || (l = r.vars.id)), V.push(g), y && ((!_n(y) || y.push) && (y = {
      snapTo: y
    }), "scrollBehavior" in ft.style && D.set(B ? [ft, ze] : E, {
      scrollBehavior: "auto"
    }), H.forEach(function(O) {
      return Qt(O) && O.target === (B ? nt.scrollingElement || ze : E) && (O.smooth = !1);
    }), dr = Qt(y.snapTo) ? y.snapTo : y.snapTo === "labels" ? bu(r) : y.snapTo === "labelsDirectional" ? Tu(r) : y.directional !== !1 ? function(O, A) {
      return Gs(y.snapTo)(O, jt() - zt < 500 ? 0 : A.direction);
    } : D.utils.snap(y.snapTo), Me = y.duration || {
      min: 0.1,
      max: 2
    }, Me = _n(Me) ? tr(Me.min, Me.max) : tr(Me, Me), Ee = D.delayedCall(y.delay || qe / 2 || 0.1, function() {
      var O = it(), A = jt() - zt < 500, F = Lt.tween;
      if ((A || Math.abs(g.getVelocity()) < 10) && !F && !Ln && ut !== O) {
        var X = (O - $) / rt, Tt = r && !R ? r.totalProgress() : X, Z = A ? 0 : (Tt - bi) / (jt() - cn) * 1e3 || 0, st = D.utils.clamp(-X, 1 - X, Gi(Z / 2) * Z / 0.185), Et = X + (y.inertia === !1 ? 0 : st), St = tr(0, 1, dr(Et, g)), gt = Math.round($ + St * rt), ot = y, ue = ot.onStart, Gt = ot.onInterrupt, Pt = ot.onComplete;
        if (O <= bt && O >= $ && gt !== O) {
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
    }), h && (p === !1 || p === be || (p = !p && h.parentNode && h.parentNode.style && Le(h.parentNode).display === "flex" ? !1 : dt), g.pin = h, Wt = D.core.getCache(h), Wt.spacer ? ri = Wt.pinState : (k && (k = te(k), k && !k.nodeType && (k = k.current || k.nativeElement), Wt.spacerIsNative = !!k, k && (Wt.spacerState = on(k))), Wt.spacer = Ut = k || nt.createElement("div"), Ut.classList.add("pin-spacer"), l && Ut.classList.add("pin-spacer-" + l), Wt.pinState = ri = on(h)), e.force3D !== !1 && D.set(h, {
      force3D: !0
    }), g.spacer = Ut = Wt.spacer, Vi = Le(h), gr = Vi[p + M.os2], si = D.getProperty(h), ct = D.quickSetter(h, M.a, Dt), Qn(h, Ut, Vi), Wi = on(h)), K) {
      Ge = _n(K) ? vo(K, xo) : xo, Vt = sn("scroller-start", l, E, M, Ge, 0), x = sn("scroller-end", l, E, M, Ge, 0, Vt), pr = Vt["offset" + M.op.d2];
      var yr = te(gi(E, "content") || E);
      ae = this.markerStart = sn("start", l, yr, M, Ge, pr, 0, w), Ie = this.markerEnd = sn("end", l, yr, M, Ge, pr, 0, w), w && (Ui = D.quickSetter([ae, Ie], M.a, Dt)), !Y && !(He.length && gi(E, "fixedMarkers") === !0) && (wu(B ? ft : E), D.set([Vt, x], {
        force3D: !0
      }), Be = D.quickSetter(Vt, M.a, Dt), oi = D.quickSetter(x, M.a, Dt));
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
    }, g.revert = function(O, A) {
      if (!A)
        return g.kill(!0);
      var F = O !== !1 || !g.enabled, X = It;
      F !== g.isReverted && (F && (De = Math.max(it(), g.scroll.rec || 0), ve = g.progress, Ti = r && r.progress()), ae && [ae, Ie, Vt, x].forEach(function(Tt) {
        return Tt.style.display = F ? "none" : "block";
      }), F && (It = g, g.update(F)), h && (!T || !g.isActive) && (F ? ku(h, Ut, ri) : Qn(h, Ut, Le(h), $t)), F || g.update(F), It = X, g.isReverted = F);
    }, g.refresh = function(O, A) {
      if (!((It || !g.enabled) && !A)) {
        if (h && O && ke) {
          Ot(a, "scrollEnd", qa);
          return;
        }
        !_e && et && et(g), It = g, zt = jt(), Lt.tween && (Lt.tween.kill(), Lt.tween = 0), U && U.pause(), _ && r && r.revert({
          kill: !1
        }).invalidate(), g.isReverted || g.revert(!0, !0), g._subPinOffset = !1;
        for (var F = Xt(), X = Oe(), Tt = w ? w.duration() : _i(E, M), Z = rt <= 0.01, st = 0, Et = 0, St = e.end, gt = e.endTrigger || c, ot = e.start || (e.start === 0 || !c ? 0 : h ? "0 0" : "0 100%"), ue = g.pinnedContainer = e.pinnedContainer && te(e.pinnedContainer), Gt = c && Math.max(0, V.indexOf(g)) || 0, Pt = Gt, _t, Ft, Hi, Si, mt, kt, Ne, In, Ks, vr, Ye; Pt--; )
          kt = V[Pt], kt.end || kt.refresh(0, 1) || (It = g), Ne = kt.pin, Ne && (Ne === c || Ne === h || Ne === ue) && !kt.isReverted && (vr || (vr = []), vr.unshift(kt), kt.revert(!0, !0)), kt !== V[Pt] && (Gt--, Pt--);
        for (Qt(ot) && (ot = ot(g)), $ = To(ot, c, F, M, it(), ae, Vt, g, X, Q, Y, Tt, w) || (h ? -1e-3 : 0), Qt(St) && (St = St(g)), Re(St) && !St.indexOf("+=") && (~St.indexOf(" ") ? St = (Re(ot) ? ot.split(" ")[0] : "") + St : (st = dn(St.substr(2), F), St = Re(ot) ? ot : (w ? D.utils.mapRange(0, w.duration(), w.scrollTrigger.start, w.scrollTrigger.end, $) : $) + st, gt = c)), bt = Math.max($, To(St || (gt ? "100% 0" : Tt), gt, F, M, it() + st, Ie, x, g, X, Q, Y, Tt, w)) || -1e-3, rt = bt - $ || ($ -= 0.01) && 1e-3, st = 0, Pt = Gt; Pt--; )
          kt = V[Pt], Ne = kt.pin, Ne && kt.start - kt._pinPush <= $ && !w && kt.end > 0 && (_t = kt.end - kt.start, (Ne === c && kt.start - kt._pinPush < $ || Ne === ue) && !Or(ot) && (st += _t * (1 - kt.progress)), Ne === h && (Et += _t));
        if ($ += st, bt += st, Z && (ve = D.utils.clamp(0, 1, D.utils.normalize($, bt, De))), g._pinPush = Et, ae && st && (_t = {}, _t[M.a] = "+=" + st, ue && (_t[M.p] = "-=" + it()), D.set([ae, Ie], _t)), h)
          _t = Le(h), Si = M === wt, Hi = it(), le = parseFloat(si(M.a)) + Et, !Tt && bt > 1 && (Ye = (B ? nt.scrollingElement || ze : E).style, Ye = {
            style: Ye,
            value: Ye["overflow" + M.a.toUpperCase()]
          }, Ye.style["overflow" + M.a.toUpperCase()] = "scroll"), Qn(h, Ut, _t), Wi = on(h), Ft = Qe(h, !0), In = Y && vi(E, Si ? Zt : wt)(), p && ($t = [p + M.os2, rt + Et + Dt], $t.t = Ut, Pt = p === dt ? bs(h, M) + rt + Et : 0, Pt && $t.push(M.d, Pt + Dt), sr($t), ue && V.forEach(function(xr) {
            xr.pin === ue && xr.vars.pinSpacing !== !1 && (xr._subPinOffset = !0);
          }), Y && it(De)), Y && (mt = {
            top: Ft.top + (Si ? Hi - $ : In) + Dt,
            left: Ft.left + (Si ? In : Hi - $) + Dt,
            boxSizing: "border-box",
            position: "fixed"
          }, mt[zi] = mt["max" + _r] = Math.ceil(Ft.width) + Dt, mt[Li] = mt["max" + $s] = Math.ceil(Ft.height) + Dt, mt[be] = mt[be + Br] = mt[be + Fr] = mt[be + Nr] = mt[be + Ir] = "0", mt[dt] = _t[dt], mt[dt + Br] = _t[dt + Br], mt[dt + Fr] = _t[dt + Fr], mt[dt + Nr] = _t[dt + Nr], mt[dt + Ir] = _t[dt + Ir], ni = Ou(ri, mt, T), _e && it(0)), r ? (Ks = r._initted, Gn(1), r.render(r.duration(), !0, !0), Ht = si(M.a) - le + rt + Et, mr = Math.abs(rt - Ht) > 1, Y && mr && ni.splice(ni.length - 2, 2), r.render(0, !0, !0), Ks || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), Gn(0)) : Ht = rt, Ye && (Ye.value ? Ye.style["overflow" + M.a.toUpperCase()] = Ye.value : Ye.style.removeProperty("overflow-" + M.a));
        else if (c && it() && !w)
          for (Ft = c.parentNode; Ft && Ft !== ft; )
            Ft._pinOffset && ($ -= Ft._pinOffset, bt -= Ft._pinOffset), Ft = Ft.parentNode;
        vr && vr.forEach(function(xr) {
          return xr.revert(!1, !0);
        }), g.start = $, g.end = bt, oe = ye = _e ? De : it(), !w && !_e && (oe < De && it(De), g.scroll.rec = 0), g.revert(!1, !0), Ee && (ut = -1, g.isActive && it($ + rt * ve), Ee.restart(!0)), It = 0, r && R && (r._initted || Ti) && r.progress() !== Ti && r.progress(Ti, !0).render(r.time(), !0, !0), (Z || ve !== g.progress || w) && (r && !R && r.totalProgress(w && $ < -1e-3 && !ve ? D.utils.normalize($, bt, 0) : ve, !0), g.progress = (oe - $) / rt === ve ? 0 : ve), h && p && (Ut._pinOffset = Math.round(g.progress * Ht)), U && U.invalidate(), f && !_e && f(g);
      }
    }, g.getVelocity = function() {
      return (it() - ye) / (jt() - cn) * 1e3 || 0;
    }, g.endAnimation = function() {
      Tr(g.callbackAnimation), r && (U ? U.progress(1) : r.paused() ? R || Tr(r, g.direction < 0, 1) : Tr(r, r.reversed()));
    }, g.labelToScroll = function(O) {
      return r && r.labels && ($ || g.refresh() || $) + r.labels[O] / r.duration() * rt || 0;
    }, g.getTrailing = function(O) {
      var A = V.indexOf(g), F = g.direction > 0 ? V.slice(0, A).reverse() : V.slice(A + 1);
      return (Re(O) ? F.filter(function(X) {
        return X.vars.preventOverlaps === O;
      }) : F).filter(function(X) {
        return g.direction > 0 ? X.end <= $ : X.start >= bt;
      });
    }, g.update = function(O, A, F) {
      if (!(w && !F && !O)) {
        var X = _e === !0 ? De : g.scroll(), Tt = O ? 0 : (X - $) / rt, Z = Tt < 0 ? 0 : Tt > 1 ? 1 : Tt || 0, st = g.progress, Et, St, gt, ot, ue, Gt, Pt, _t;
        if (A && (ye = oe, oe = w ? it() : X, y && (bi = wi, wi = r && !R ? r.totalProgress() : Z)), m && !Z && h && !It && !Jr && ke && $ < X + (X - ye) / (jt() - cn) * m && (Z = 1e-4), Z !== st && g.enabled) {
          if (Et = g.isActive = !!Z && Z < 1, St = !!st && st < 1, Gt = Et !== St, ue = Gt || !!Z != !!st, g.direction = Z > st ? 1 : -1, g.progress = Z, ue && !It && (gt = Z && !st ? 0 : Z === 1 ? 1 : st === 1 ? 2 : 3, R && (ot = !Gt && L[gt + 1] !== "none" && L[gt + 1] || L[gt], _t = r && (ot === "complete" || ot === "reset" || ot in r))), P && (Gt || _t) && (_t || d || !r) && (Qt(P) ? P(g) : g.getTrailing(P).forEach(function(mt) {
            return mt.endAnimation();
          })), R || (U && !It && !Jr ? (U._dp._time - U._start !== U._time && U.render(U._dp._time - U._start), U.resetTo ? U.resetTo("totalProgress", Z, r._tTime / r._tDur) : (U.vars.totalProgress = Z, U.invalidate().restart())) : r && r.totalProgress(Z, !!It)), h) {
            if (O && p && (Ut.style[p + M.os2] = gr), !Y)
              ct(Cr(le + Ht * Z));
            else if (ue) {
              if (Pt = !O && Z > st && bt + 1 > X && X + 1 >= _i(E, M), T)
                if (!O && (Et || Pt)) {
                  var Ft = Qe(h, !0), Hi = X - $;
                  So(h, ft, Ft.top + (M === wt ? Hi : 0) + Dt, Ft.left + (M === wt ? 0 : Hi) + Dt);
                } else
                  So(h, Ut);
              sr(Et || Pt ? ni : Wi), mr && Z < 1 && Et || ct(le + (Z === 1 && !Pt ? Ht : 0));
            }
          }
          y && !Lt.tween && !It && !Jr && Ee.restart(!0), o && (Gt || b && Z && (Z < 1 || !qn)) && En(o.targets).forEach(function(mt) {
            return mt.classList[Et || b ? "add" : "remove"](o.className);
          }), s && !R && !O && s(g), ue && !It ? (R && (_t && (ot === "complete" ? r.pause().totalProgress(1) : ot === "reset" ? r.restart(!0).pause() : ot === "restart" ? r.restart(!0) : r[ot]()), s && s(g)), (Gt || !qn) && (u && Gt && jn(g, u), q[gt] && jn(g, q[gt]), b && (Z === 1 ? g.kill(!1, 1) : q[gt] = 0), Gt || (gt = Z === 1 ? 1 : 3, q[gt] && jn(g, q[gt]))), C && !Et && Math.abs(g.getVelocity()) > (Or(C) ? C : 2500) && (Tr(g.callbackAnimation), U ? U.progress(1) : Tr(r, ot === "reverse" ? 1 : !Z, 1))) : R && s && !It && s(g);
        }
        if (oi) {
          var Si = w ? X / w.duration() * (w._caScrollDist || 0) : X;
          Be(Si + (Vt._isFlipped ? 1 : 0)), oi(Si);
        }
        Ui && Ui(-X / w.duration() * (w._caScrollDist || 0));
      }
    }, g.enable = function(O, A) {
      g.enabled || (g.enabled = !0, Ot(E, "resize", Mr), Ot(B ? nt : E, "scroll", qi), et && Ot(a, "refreshInit", et), O !== !1 && (g.progress = ve = 0, oe = ye = ut = it()), A !== !1 && g.refresh());
    }, g.getTween = function(O) {
      return O && Lt ? Lt.tween : U;
    }, g.setPositions = function(O, A) {
      h && (le += O - $, Ht += A - O - rt, p === dt && g.adjustPinSpacing(A - O - rt)), g.start = $ = O, g.end = bt = A, rt = A - O, g.update();
    }, g.adjustPinSpacing = function(O) {
      if ($t && O) {
        var A = $t.indexOf(M.d) + 1;
        $t[A] = parseFloat($t[A]) + O + Dt, $t[1] = parseFloat($t[1]) + O + Dt, sr($t);
      }
    }, g.disable = function(O, A) {
      if (g.enabled && (O !== !1 && g.revert(!0, !0), g.enabled = g.isActive = !1, A || U && U.pause(), De = 0, Wt && (Wt.uncache = 1), et && Ct(a, "refreshInit", et), Ee && (Ee.pause(), Lt.tween && Lt.tween.kill() && (Lt.tween = 0)), !B)) {
        for (var F = V.length; F--; )
          if (V[F].scroller === E && V[F] !== g)
            return;
        Ct(E, "resize", Mr), Ct(E, "scroll", qi);
      }
    }, g.kill = function(O, A) {
      g.disable(O, A), U && !A && U.kill(), l && delete Ts[l];
      var F = V.indexOf(g);
      F >= 0 && V.splice(F, 1), F === Kt && gn > 0 && Kt--, F = 0, V.forEach(function(X) {
        return X.scroller === g.scroller && (F = 1);
      }), F || _e || (g.scroll.rec = 0), r && (r.scrollTrigger = null, O && r.revert({
        kill: !1
      }), A || r.kill()), ae && [ae, Ie, Vt, x].forEach(function(X) {
        return X.parentNode && X.parentNode.removeChild(X);
      }), Yr === g && (Yr = 0), h && (Wt && (Wt.uncache = 1), F = 0, V.forEach(function(X) {
        return X.pin === h && F++;
      }), F || (Wt.spacer = 0)), e.onKill && e.onKill(g);
    }, g.enable(!1, !1), Ke && Ke(g), !r || !r.add || rt ? g.refresh() : D.delayedCall(0.01, function() {
      return $ || bt || g.refresh();
    }) && (rt = 0.01) && ($ = bt = 0), h && Pu();
  }, a.register = function(e) {
    return Ki || (D = e || Va(), Wa() && window.document && a.enable(), Ki = kr), Ki;
  }, a.defaults = function(e) {
    if (e)
      for (var r in e)
        nn[r] = e[r];
    return nn;
  }, a.disable = function(e, r) {
    kr = 0, V.forEach(function(s) {
      return s[r ? "kill" : "disable"](e);
    }), Ct(G, "wheel", qi), Ct(nt, "scroll", qi), clearInterval(Qr), Ct(nt, "touchcancel", Xe), Ct(ft, "touchstart", Xe), en(Ct, nt, "pointerdown,touchstart,mousedown", mo), en(Ct, nt, "pointerup,touchend,mouseup", yo), Mn.kill(), tn(Ct);
    for (var n = 0; n < H.length; n += 3)
      rn(Ct, H[n], H[n + 1]), rn(Ct, H[n], H[n + 2]);
  }, a.enable = function() {
    if (G = window, nt = document, ze = nt.documentElement, ft = nt.body, D && (En = D.utils.toArray, tr = D.utils.clamp, ws = D.core.context || Xe, Gn = D.core.suppressOverwrites || Xe, Vs = G.history.scrollRestoration || "auto", Ss = G.pageYOffset, D.core.globals("ScrollTrigger", a), ft)) {
      kr = 1, yu(), vt.register(D), a.isTouch = vt.isTouch, ai = vt.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), Ot(G, "wheel", qi), Fa = [G, nt, ze, ft], D.matchMedia ? (a.matchMedia = function(l) {
        var u = D.matchMedia(), f;
        for (f in l)
          u.add(f, l[f]);
        return u;
      }, D.addEventListener("matchMediaInit", function() {
        return qs();
      }), D.addEventListener("matchMediaRevert", function() {
        return Ka();
      }), D.addEventListener("matchMedia", function() {
        Ei(0, 1), Yi("matchMedia");
      }), D.matchMedia("(orientation: portrait)", function() {
        return Zn(), Zn;
      })) : console.warn("Requires GSAP 3.11.0 or later"), Zn(), Ot(nt, "scroll", qi);
      var e = ft.style, r = e.borderTopStyle, n = D.core.Animation.prototype, s, o;
      for (n.revert || Object.defineProperty(n, "revert", {
        value: function() {
          return this.time(-0.01, !0);
        }
      }), e.borderTopStyle = "solid", s = Qe(ft), wt.m = Math.round(s.top + wt.sc()) || 0, Zt.m = Math.round(s.left + Zt.sc()) || 0, r ? e.borderTopStyle = r : e.removeProperty("border-top-style"), Qr = setInterval(wo, 250), D.delayedCall(0.5, function() {
        return Jr = 0;
      }), Ot(nt, "touchcancel", Xe), Ot(ft, "touchstart", Xe), en(Ot, nt, "pointerdown,touchstart,mousedown", mo), en(Ot, nt, "pointerup,touchend,mouseup", yo), xs = D.utils.checkPrefix("transform"), mn.push(xs), Ki = jt(), Mn = D.delayedCall(0.2, Ei).pause(), ji = [nt, "visibilitychange", function() {
        var l = G.innerWidth, u = G.innerHeight;
        nt.hidden ? (po = l, go = u) : (po !== l || go !== u) && Mr();
      }, nt, "DOMContentLoaded", Ei, G, "load", Ei, G, "resize", Mr], tn(Ot), V.forEach(function(l) {
        return l.enable(0, 1);
      }), o = 0; o < H.length; o += 3)
        rn(Ct, H[o], H[o + 1]), rn(Ct, H[o], H[o + 2]);
    }
  }, a.config = function(e) {
    "limitCallbacks" in e && (qn = !!e.limitCallbacks);
    var r = e.syncInterval;
    r && clearInterval(Qr) || (Qr = r) && setInterval(wo, r), "ignoreMobileResize" in e && (Na = a.isTouch === 1 && e.ignoreMobileResize), "autoRefreshEvents" in e && (tn(Ct) || tn(Ot, e.autoRefreshEvents || "none"), Ba = (e.autoRefreshEvents + "").indexOf("resize") === -1);
  }, a.scrollerProxy = function(e, r) {
    var n = te(e), s = H.indexOf(n), o = Bi(n);
    ~s && H.splice(s, o ? 6 : 2), r && (o ? He.unshift(G, r, ft, r, ze, r) : He.unshift(n, r));
  }, a.clearMatchMedia = function(e) {
    V.forEach(function(r) {
      return r._ctx && r._ctx.query === e && r._ctx.kill(!0, !0);
    });
  }, a.isInViewport = function(e, r, n) {
    var s = (Re(e) ? te(e) : e).getBoundingClientRect(), o = s[n ? zi : Li] * r || 0;
    return n ? s.right - o > 0 && s.left + o < G.innerWidth : s.bottom - o > 0 && s.top + o < G.innerHeight;
  }, a.positionInViewport = function(e, r, n) {
    Re(e) && (e = te(e));
    var s = e.getBoundingClientRect(), o = s[n ? zi : Li], l = r == null ? o / 2 : r in Dn ? Dn[r] * o : ~r.indexOf("%") ? parseFloat(r) * o / 100 : parseFloat(r) || 0;
    return n ? (s.left + l) / G.innerWidth : (s.top + l) / G.innerHeight;
  }, a.killAll = function(e) {
    if (V.slice(0).forEach(function(n) {
      return n.vars.id !== "ScrollSmoother" && n.kill();
    }), e !== !0) {
      var r = Ni.killAll || [];
      Ni = {}, r.forEach(function(n) {
        return n();
      });
    }
  }, a;
}();
N.version = "3.11.5";
N.saveStyles = function(a) {
  return a ? En(a).forEach(function(t) {
    if (t && t.style) {
      var i = he.indexOf(t);
      i >= 0 && he.splice(i, 5), he.push(t, t.style.cssText, t.getBBox && t.getAttribute("transform"), D.core.getCache(t), ws());
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
  return ++H.cache && ti(a === !0 ? 2 : 0);
};
N.clearScrollMemory = ja;
N.maxScroll = function(a, t) {
  return _i(a, t ? Zt : wt);
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
  var i = Ni[a] || (Ni[a] = []);
  ~i.indexOf(t) || i.push(t);
};
N.removeEventListener = function(a, t) {
  var i = Ni[a], e = i && i.indexOf(t);
  e >= 0 && i.splice(e, 1);
};
N.batch = function(a, t) {
  var i = [], e = {}, r = t.interval || 0.016, n = t.batchMax || 1e9, s = function(u, f) {
    var d = [], c = [], h = D.delayedCall(r, function() {
      f(d, c), d = [], c = [];
    }).pause();
    return function(p) {
      d.length || h.restart(!0), d.push(p.trigger), c.push(p), n <= d.length && h.progress(1);
    };
  }, o;
  for (o in t)
    e[o] = o.substr(0, 2) === "on" && Qt(t[o]) && o !== "onRefreshInit" ? s(o, t[o]) : t[o];
  return Qt(n) && (n = n(), Ot(N, "refresh", function() {
    return n = t.batchMax();
  })), En(a).forEach(function(l) {
    var u = {};
    for (o in e)
      u[o] = e[o];
    u.trigger = l, i.push(N.create(u));
  }), i;
};
var ko = function(t, i, e, r) {
  return i > r ? t(r) : i < 0 && t(0), e > r ? (r - i) / (e - i) : e < 0 ? i / (i - e) : 1;
}, Jn = function a(t, i) {
  i === !0 ? t.style.removeProperty("touch-action") : t.style.touchAction = i === !0 ? "auto" : i ? "pan-" + i + (vt.isTouch ? " pinch-zoom" : "") : "none", t === ze && a(ft, i);
}, an = {
  auto: 1,
  scroll: 1
}, Eu = function(t) {
  var i = t.event, e = t.target, r = t.axis, n = (i.changedTouches ? i.changedTouches[0] : i).target, s = n._gsap || D.core.getCache(n), o = jt(), l;
  if (!s._isScrollT || o - s._isScrollT > 2e3) {
    for (; n && n !== ft && (n.scrollHeight <= n.clientHeight && n.scrollWidth <= n.clientWidth || !(an[(l = Le(n)).overflowY] || an[l.overflowX])); )
      n = n.parentNode;
    s._isScroll = n && n !== e && !Bi(n) && (an[(l = Le(n)).overflowY] || an[l.overflowX]), s._isScrollT = o;
  }
  (s._isScroll || r === "x") && (i.stopPropagation(), i._gsapAllow = !0);
}, Qa = function(t, i, e, r) {
  return vt.create({
    target: t,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: i,
    onWheel: r = r && Eu,
    onPress: r,
    onDrag: r,
    onScroll: r,
    onEnable: function() {
      return e && Ot(nt, vt.eventTypes[0], Oo, !1, !0);
    },
    onDisable: function() {
      return Ct(nt, vt.eventTypes[0], Oo, !0);
    }
  });
}, Du = /(input|label|select|textarea)/i, Co, Oo = function(t) {
  var i = Du.test(t.target.tagName);
  (i || Co) && (t._gsapAllow = !0, Co = i);
}, Au = function(t) {
  _n(t) || (t = {}), t.preventDefault = t.isNormalizer = t.allowClicks = !0, t.type || (t.type = "wheel,touch"), t.debounce = !!t.debounce, t.id = t.id || "normalizer";
  var i = t, e = i.normalizeScrollX, r = i.momentum, n = i.allowNestedScroll, s = i.onRelease, o, l, u = te(t.target) || ze, f = D.core.globals().ScrollSmoother, d = f && f.get(), c = ai && (t.content && te(t.content) || d && t.content !== !1 && !d.smooth() && d.content()), h = vi(u, wt), p = vi(u, Zt), _ = 1, m = (vt.isTouch && G.visualViewport ? G.visualViewport.scale * G.visualViewport.width : G.outerWidth) / G.innerWidth, v = 0, S = Qt(r) ? function() {
    return r(o);
  } : function() {
    return r || 2.8;
  }, b, y, T = Qa(u, t.type, !0, n), k = function() {
    return y = !1;
  }, w = Xe, C = Xe, P = function() {
    l = _i(u, wt), C = tr(ai ? 1 : 0, l), e && (w = tr(0, _i(u, Zt))), b = Fi;
  }, M = function() {
    c._gsap.y = Cr(parseFloat(c._gsap.y) + h.offset) + "px", c.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(c._gsap.y) + ", 0, 1)", h.offset = h.cacheID = 0;
  }, R = function() {
    if (y) {
      requestAnimationFrame(k);
      var K = Cr(o.deltaY / 2), Q = C(h.v - K);
      if (c && Q !== h.v + h.offset) {
        h.offset = Q - h.v;
        var g = Cr((parseFloat(c && c._gsap.y) || 0) - h.offset);
        c.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + g + ", 0, 1)", c._gsap.y = g + "px", h.cacheID = H.cache, ti();
      }
      return !0;
    }
    h.offset && M(), y = !0;
  }, E, W, B, Y, q = function() {
    P(), E.isActive() && E.vars.scrollY > l && (h() > l ? E.progress(1) && h(l) : E.resetTo("scrollY", l));
  };
  return c && D.set(c, {
    y: "+=0"
  }), t.ignoreCheck = function(L) {
    return ai && L.type === "touchmove" && R() || _ > 1.05 && L.type !== "touchstart" || o.isGesturing || L.touches && L.touches.length > 1;
  }, t.onPress = function() {
    y = !1;
    var L = _;
    _ = Cr((G.visualViewport && G.visualViewport.scale || 1) / m), E.pause(), L !== _ && Jn(u, _ > 1.01 ? !0 : e ? !1 : "x"), W = p(), B = h(), P(), b = Fi;
  }, t.onRelease = t.onGestureStart = function(L, K) {
    if (h.offset && M(), !K)
      Y.restart(!0);
    else {
      H.cache++;
      var Q = S(), g, et;
      e && (g = p(), et = g + Q * 0.05 * -L.velocityX / 0.227, Q *= ko(p, g, et, _i(u, Zt)), E.vars.scrollX = w(et)), g = h(), et = g + Q * 0.05 * -L.velocityY / 0.227, Q *= ko(h, g, et, _i(u, wt)), E.vars.scrollY = C(et), E.invalidate().duration(Q).play(0.01), (ai && E.vars.scrollY >= l || g >= l - 1) && D.to({}, {
        onUpdate: q,
        duration: Q
      });
    }
    s && s(L);
  }, t.onWheel = function() {
    E._ts && E.pause(), jt() - v > 1e3 && (b = 0, v = jt());
  }, t.onChange = function(L, K, Q, g, et) {
    if (Fi !== b && P(), K && e && p(w(g[2] === K ? W + (L.startX - L.x) : p() + K - g[1])), Q) {
      h.offset && M();
      var Xt = et[2] === Q, Oe = Xt ? B + L.startY - L.y : h() + Q - et[1], ut = C(Oe);
      Xt && Oe !== ut && (B += ut - Oe), h(ut);
    }
    (Q || K) && ti();
  }, t.onEnable = function() {
    Jn(u, e ? !1 : "x"), N.addEventListener("refresh", q), Ot(G, "resize", q), h.smooth && (h.target.style.scrollBehavior = "auto", h.smooth = p.smooth = !1), T.enable();
  }, t.onDisable = function() {
    Jn(u, !0), Ct(G, "resize", q), N.removeEventListener("refresh", q), T.kill();
  }, t.lockAxis = t.lockAxis !== !1, o = new vt(t), o.iOS = ai, ai && !h() && h(1), ai && D.ticker.add(Xe), Y = o._dc, E = D.to(o, {
    ease: "power4",
    paused: !0,
    scrollX: e ? "+=0.1" : "+=0",
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
  return V.sort(a || function(t, i) {
    return (t.vars.refreshPriority || 0) * -1e6 + t.start - (i.start + (i.vars.refreshPriority || 0) * -1e6);
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
  var t = a instanceof vt ? a : Au(a);
  return fe && fe.target === t.target && fe.kill(), Bi(t.target) && (fe = t), t;
};
N.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: vs,
  _inputObserver: Qa,
  _scrollers: H,
  _proxies: He,
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
Va() && D.registerPlugin(N);
const Fn = {
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
  constructor(t = {}, i) {
    Object.assign(this, Fn, t), this.Lenis = i, this.init();
  }
  init() {
    function t({ scroll: e, limit: r, velocity: n, direction: s, progress: o }) {
      console.log(e, r, n, s, o);
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
    }), window.scrollDirection = "down", lenis.on("scroll", ({ direction: e, progress: r }) => {
      e === 1 ? window.scrollDirection = "down" : window.scrollDirection = "up";
    });
    function i(e) {
      lenis.raf(e), requestAnimationFrame(i);
    }
    requestAnimationFrame(i);
  }
}
class zu {
  constructor(t = {}, i, e) {
    Object.assign(this, Fn, t), this.gsap = i, this.ScrollTrigger = e, this.init();
  }
  init() {
    const t = document.querySelectorAll("[data-animate]");
    t && this.gsap.utils.toArray(t).forEach((i) => {
      i.hasAttribute("data-animate-duration") && i.style.setProperty("--byc-animate-duration", i.getAttribute("data-animate-duration") + "s"), i.hasAttribute("data-opacity-duration") && i.style.setProperty("--byc-animate-opacity-duration", i.getAttribute("data-opacity-duration") + "s"), i.hasAttribute("data-slide-duration") && i.style.setProperty("--byc-animate-slide-duration", i.getAttribute("data-slide-duration") + "s"), i.hasAttribute("data-animate-delay") && i.style.setProperty("--byc-animate-delay", i.getAttribute("data-animate-delay") + "s"), i.hasAttribute("data-animate-easing") && i.style.setProperty("--byc-animate-easing", i.getAttribute("data-animate-easing")), i.hasAttribute("data-animate-offset") && i.style.setProperty("--byc-animate-slide-offset", i.getAttribute("data-animate-offset")), i.hasAttribute("data-animate-background") && i.style.setProperty("--byc-animate-background-color", i.getAttribute("data-animate-background")), i.hasAttribute("data-animate-border-radius") && i.style.setProperty("--byc-animate-border-radius", i.getAttribute("data-animate-border-radius")), i.hasAttribute("data-animate-foreground") && i.style.setProperty("--byc-animate-foreground-color", i.getAttribute("data-animate-foreground"));
      const r = i.getAttribute("data-animate-repeat") === "true";
      this.ScrollTrigger.create({
        trigger: i.dataset.animateTrigger ? i.dataset.animateTrigger : i,
        start: i.dataset.animateStart ? i.dataset.animateStart : this.animateStart,
        end: i.dataset.animateEnd ? i.dataset.animateEnd : this.animateEnd,
        markers: this.animateMarkers,
        onEnter: () => {
          i.classList.add(this.inViewClass);
        },
        onEnterBack: () => {
          i.classList.add(this.inViewClass), i.classList.remove(this.outViewClass);
        },
        onLeave: () => {
          r == !0 && i.classList.add(this.outViewClass);
        },
        onLeaveBack: () => {
          r && i.classList.remove(this.inViewClass);
        },
        once: !r
      });
    });
  }
}
class Lu {
  constructor(t = {}, i, e) {
    Object.assign(this, Fn, t), this.gsap = i, this.ScrollTrigger = e, this.init();
  }
  init() {
    this.gsap.utils.toArray("[data-parallax-from]").forEach((t) => {
      if (t.getAttribute("data-parallax-to")) {
        const i = JSON.parse(t.getAttribute("data-parallax-from")), e = JSON.parse(t.getAttribute("data-parallax-to")), r = t.getAttribute("data-parallax-scrub");
        let n = r;
        r === "true" || r === "false" ? n = r === "true" : n = Number(r);
        const s = this.gsap.fromTo(t, i, e);
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
    hn.registerPlugin(N), this.options = t, Object.assign(this, Fn, t), this.init();
  }
  init() {
    console.log(this.options), this.smoothScroll && new Ru(this.options, il), this.initAnimations();
  }
  initAnimations() {
    new zu(this.options, hn, N), new Lu(this.options, hn, N);
  }
  destroy(t = !0, i = !0) {
    t && N.killAll(), i && window.lenis.destroy();
  }
  refresh() {
    N.refresh();
  }
  scrollTo(t, i) {
    window.lenis.scrollTo(t, i);
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
