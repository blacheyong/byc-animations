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
function xn(a, t, i) {
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
      const o = xn(0, this.currentTime / this.duration, 1);
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
      this.normalizeWheel && (s = xn(-100, s, 100), o = xn(-100, o, 100)), s *= this.wheelMultiplier, o *= this.wheelMultiplier, this.emitter.emit("scroll", { deltaX: s, deltaY: o, event: n });
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
  constructor({ wrapper: t = window, content: i = document.documentElement, wheelEventsTarget: e = t, eventsTarget: r = e, smoothWheel: n = !0, smoothTouch: s = !1, syncTouch: o = !1, syncTouchLerp: l = 0.1, __iosNoInertiaSyncTouchLerp: u = 0.4, touchInertiaMultiplier: f = 35, duration: _, easing: c = (w) => Math.min(1, 1.001 - Math.pow(2, -10 * w)), lerp: h = !_ && 0.1, infinite: p = !1, orientation: d = "vertical", gestureOrientation: m = "vertical", touchMultiplier: y = 1, wheelMultiplier: S = 1, normalizeWheel: T = !1, autoResize: v = !0 } = {}) {
    this.onVirtualScroll = ({ deltaX: w, deltaY: k, event: b }) => {
      if (b.ctrlKey)
        return;
      const C = b.type.includes("touch"), P = b.type.includes("wheel");
      if (this.options.gestureOrientation === "both" && w === 0 && k === 0 || this.options.gestureOrientation === "vertical" && k === 0 || this.options.gestureOrientation === "horizontal" && w === 0 || C && this.options.gestureOrientation === "vertical" && this.scroll === 0 && !this.options.infinite && k <= 0)
        return;
      let M = b.composedPath();
      if (M = M.slice(0, M.indexOf(this.rootElement)), M.find((I) => {
        var B;
        return (I.hasAttribute == null ? void 0 : I.hasAttribute("data-lenis-prevent")) || C && (I.hasAttribute == null ? void 0 : I.hasAttribute("data-lenis-prevent-touch")) || P && (I.hasAttribute == null ? void 0 : I.hasAttribute("data-lenis-prevent-wheel")) || ((B = I.classList) == null ? void 0 : B.contains("lenis"));
      }))
        return;
      if (this.isStopped || this.isLocked)
        return void b.preventDefault();
      if (this.isSmooth = (this.options.smoothTouch || this.options.syncTouch) && C || this.options.smoothWheel && P, !this.isSmooth)
        return this.isScrolling = !1, void this.animate.stop();
      b.preventDefault();
      let D = k;
      this.options.gestureOrientation === "both" ? D = Math.abs(k) > Math.abs(w) ? k : w : this.options.gestureOrientation === "horizontal" && (D = w);
      const A = C && this.options.syncTouch, j = C && b.type === "touchend" && Math.abs(D) > 1;
      j && (D = this.velocity * this.options.touchInertiaMultiplier), this.scrollTo(this.targetScroll + D, ts({ programmatic: !1 }, A && { lerp: j ? this.syncTouchLerp : this.options.__iosNoInertiaSyncTouchLerp }));
    }, this.onScroll = () => {
      if (!this.isScrolling) {
        const w = this.animatedScroll;
        this.animatedScroll = this.targetScroll = this.actualScroll, this.velocity = 0, this.direction = Math.sign(this.animatedScroll - w), this.emit();
      }
    }, window.lenisVersion = "1.0.27", t !== document.documentElement && t !== document.body || (t = window), this.options = { wrapper: t, content: i, wheelEventsTarget: e, eventsTarget: r, smoothWheel: n, smoothTouch: s, syncTouch: o, syncTouchLerp: l, __iosNoInertiaSyncTouchLerp: u, touchInertiaMultiplier: f, duration: _, easing: c, lerp: h, infinite: p, gestureOrientation: m, orientation: d, touchMultiplier: y, wheelMultiplier: S, normalizeWheel: T, autoResize: v }, this.animate = new Ja(), this.emitter = new Mo(), this.dimensions = new tl({ wrapper: t, content: i, autoResize: v }), this.toggleClass("lenis", !0), this.velocity = 0, this.isLocked = !1, this.isStopped = !1, this.isSmooth = o || n || s, this.isScrolling = !1, this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onScroll, { passive: !1 }), this.virtualScroll = new el(r, { touchMultiplier: y, wheelMultiplier: S, normalizeWheel: T }), this.virtualScroll.on("scroll", this.onVirtualScroll);
  }
  destroy() {
    this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onScroll, { passive: !1 }), this.virtualScroll.destroy(), this.dimensions.destroy(), this.toggleClass("lenis", !1), this.toggleClass("lenis-smooth", !1), this.toggleClass("lenis-scrolling", !1), this.toggleClass("lenis-stopped", !1), this.toggleClass("lenis-locked", !1);
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
    if (!this.isStopped && !this.isLocked || u) {
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
            i -= this.isHorizontal ? p.left : p.top;
          }
          const h = c.getBoundingClientRect();
          t = (this.isHorizontal ? h.left : h.top) + this.animatedScroll;
        }
      }
      if (typeof t == "number") {
        if (t += i, t = Math.round(t), this.options.infinite ? f && (this.targetScroll = this.animatedScroll = this.scroll) : t = xn(0, t, this.limit), e)
          return this.animatedScroll = this.targetScroll = t, this.setScroll(this.scroll), this.reset(), void (l == null || l(this));
        if (!f) {
          if (t === this.targetScroll)
            return;
          this.targetScroll = t;
        }
        this.animate.fromTo(this.animatedScroll, t, { duration: n, easing: s, lerp: o, onStart: () => {
          r && (this.isLocked = !0), this.isScrolling = !0;
        }, onUpdate: (c, h) => {
          this.isScrolling = !0, this.velocity = c - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = c, this.setScroll(this.scroll), f && (this.targetScroll = c), h || this.emit(), h && requestAnimationFrame(() => {
            this.reset(), this.emit(), l == null || l(this);
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
  get isLocked() {
    return this.__isLocked;
  }
  set isLocked(t) {
    this.__isLocked !== t && (this.__isLocked = t, this.toggleClass("lenis-locked", t));
  }
  get className() {
    let t = "lenis";
    return this.isStopped && (t += " lenis-stopped"), this.isLocked && (t += " lenis-locked"), this.isScrolling && (t += " lenis-scrolling"), this.isSmooth && (t += " lenis-smooth"), t;
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
function Ao(a, t) {
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
}, ks, Nt, yt, Te = 1e8, tt = 1 / Te, es = Math.PI * 2, rl = es / 4, nl = 0, Eo = Math.sqrt, sl = Math.cos, ol = Math.sin, Mt = function(t) {
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
}, Yt = Array.isArray, is = /(?:-?\.?\d|\.)+/gi, Ro = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Zi = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Bn = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, zo = /[+-]=-?[.\d]+/, Lo = /[^,'"\[\]\s]+/gi, al = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, at, be, rs, Ms, me = {}, bn = {}, Fo, Io = function(t) {
  return (bn = Ii(t, me)) && se;
}, As = function(t, i) {
  return console.warn("Invalid property", t, "set to", i, "Missing plugin? gsap.registerPlugin()");
}, wn = function(t, i) {
  return !i && console.warn(t);
}, Bo = function(t, i) {
  return t && (me[t] = i) && bn && (bn[t] = i) || me;
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
}, Es = {}, _i = [], ns = {}, No, ce = {}, Nn = {}, js = 30, fn = [], Ds = "", Rs = function(t) {
  var i = t[0], e, r;
  if (He(i) || ht(i) || (t = [t]), !(e = (i._gsap || {}).harness)) {
    for (r = fn.length; r-- && !fn[r].targetTest(i); )
      ;
    e = fn[r];
  }
  for (r = t.length; r--; )
    t[r] && (t[r]._gsap || (t[r]._gsap = new ua(t[r], e))) || t.splice(r, 1);
  return t;
}, Ei = function(t) {
  return t._gsap || Rs(Se(t))[0]._gsap;
}, Yo = function(t, i, e) {
  return (e = t[i]) && ht(e) ? t[i]() : Cs(e) && t.getAttribute && t.getAttribute(i) || e;
}, re = function(t, i) {
  return (t = t.split(",")).forEach(i) || t;
}, pt = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, Dt = function(t) {
  return Math.round(t * 1e7) / 1e7 || 0;
}, er = function(t, i) {
  var e = i.charAt(0), r = parseFloat(i.substr(2));
  return t = parseFloat(t), e === "+" ? t + r : e === "-" ? t - r : e === "*" ? t * r : t / r;
}, fl = function(t, i) {
  for (var e = i.length, r = 0; t.indexOf(i[r]) < 0 && ++r < e; )
    ;
  return r < e;
}, Tn = function() {
  var t = _i.length, i = _i.slice(0), e, r;
  for (ns = {}, _i.length = 0, e = 0; e < t; e++)
    r = i[e], r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0);
}, Xo = function(t, i, e, r) {
  _i.length && !Nt && Tn(), t.render(i, e, r || Nt && i < 0 && (t._initted || t._startAt)), _i.length && !Nt && Tn();
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
    e !== "__proto__" && e !== "constructor" && e !== "prototype" && (t[e] = He(i[e]) ? a(t[e] || (t[e] = {}), i[e]) : i[e]);
  return t;
}, Sn = function(t, i) {
  var e = {}, r;
  for (r in t)
    r in i || (e[r] = t[r]);
  return e;
}, Ar = function(t) {
  var i = t.parent || at, e = t.keyframes ? hl(Yt(t.keyframes)) : Ce;
  if (ie(t.inherit))
    for (; i; )
      e(t, i.vars.defaults), i = i.parent || i._dp;
  return t;
}, cl = function(t, i) {
  for (var e = t.length, r = e === i.length; r && e-- && t[e] === i[e]; )
    ;
  return e < 0;
}, $o = function(t, i, e, r, n) {
  e === void 0 && (e = "_first"), r === void 0 && (r = "_last");
  var s = t[r], o;
  if (n)
    for (o = i[n]; s && s[n] > o; )
      s = s._prev;
  return s ? (i._next = s._next, s._next = i) : (i._next = t[e], t[e] = i), i._next ? i._next._prev = i : t[r] = i, i._prev = s, i.parent = i._dp = t, i;
}, Rn = function(t, i, e, r) {
  e === void 0 && (e = "_first"), r === void 0 && (r = "_last");
  var n = i._prev, s = i._next;
  n ? n._next = s : t[e] === i && (t[e] = s), s ? s._prev = n : t[r] === i && (t[r] = n), i._next = i._prev = i.parent = null;
}, mi = function(t, i) {
  t.parent && (!i || t.parent.autoRemoveChildren) && t.parent.remove(t), t._act = 0;
}, Di = function(t, i) {
  if (t && (!i || i._end > t._dur || i._start < 0))
    for (var e = t; e; )
      e._dirty = 1, e = e.parent;
  return t;
}, dl = function(t) {
  for (var i = t.parent; i && i.parent; )
    i._dirty = 1, i.totalDuration(), i = i.parent;
  return t;
}, ss = function(t, i, e, r) {
  return t._startAt && (Nt ? t._startAt.revert(un) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(i, !0, r));
}, _l = function a(t) {
  return !t || t._ts && a(t.parent);
}, Qs = function(t) {
  return t._repeat ? ar(t._tTime, t = t.duration() + t._rDelay) * t : 0;
}, ar = function(t, i) {
  var e = Math.floor(t /= i);
  return t && e === t ? e - 1 : e;
}, Pn = function(t, i) {
  return (t - i._start) * i._ts + (i._ts >= 0 ? 0 : i._dirty ? i.totalDuration() : i._tDur);
}, zn = function(t) {
  return t._end = Dt(t._start + (t._tDur / Math.abs(t._ts || t._rts || tt) || 0));
}, Ln = function(t, i) {
  var e = t._dp;
  return e && e.smoothChildTiming && t._ts && (t._start = Dt(e._time - (t._ts > 0 ? i / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - i) / -t._ts)), zn(t), e._dirty || Di(e, t)), t;
}, Uo = function(t, i) {
  var e;
  if ((i._time || i._initted && !i._dur) && (e = Pn(t.rawTime(), i), (!i._dur || Kr(0, i.totalDuration(), e) - i._tTime > tt) && i.render(e, !0)), Di(t, i)._dp && t._initted && t._time >= t._dur && t._ts) {
    if (t._dur < t.duration())
      for (e = t; e._dp; )
        e.rawTime() >= 0 && e.totalTime(e._tTime), e = e._dp;
    t._zTime = -tt;
  }
}, We = function(t, i, e, r) {
  return i.parent && mi(i), i._start = Dt((ei(e) ? e : e || t !== at ? xe(t, e, i) : t._time) + i._delay), i._end = Dt(i._start + (i.totalDuration() / Math.abs(i.timeScale()) || 0)), $o(t, i, "_first", "_last", t._sort ? "_start" : 0), os(i) || (t._recent = i), r || Uo(t, i), t._ts < 0 && Ln(t, t._tTime), t;
}, Ho = function(t, i) {
  return (me.ScrollTrigger || As("scrollTrigger", i)) && me.ScrollTrigger.create(i, t);
}, Go = function(t, i, e, r, n) {
  if (Ls(t, i, n), !t._initted)
    return 1;
  if (!e && t._pt && !Nt && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && No !== _e.frame)
    return _i.push(t), t._lazy = [n, r], 1;
}, pl = function a(t) {
  var i = t.parent;
  return i && i._ts && i._initted && !i._lock && (i.rawTime() < 0 || a(i));
}, os = function(t) {
  var i = t.data;
  return i === "isFromStart" || i === "isStart";
}, gl = function(t, i, e, r) {
  var n = t.ratio, s = i < 0 || !i && (!t._start && pl(t) && !(!t._initted && os(t)) || (t._ts < 0 || t._dp._ts < 0) && !os(t)) ? 0 : 1, o = t._rDelay, l = 0, u, f, _;
  if (o && t._repeat && (l = Kr(0, t._tDur, i), f = ar(l, o), t._yoyo && f & 1 && (s = 1 - s), f !== ar(t._tTime, o) && (n = 1 - s, t.vars.repeatRefresh && t._initted && t.invalidate())), s !== n || Nt || r || t._zTime === tt || !i && t._zTime) {
    if (!t._initted && Go(t, i, r, e, l))
      return;
    for (_ = t._zTime, t._zTime = i || (e ? tt : 0), e || (e = i && !_), t.ratio = s, t._from && (s = 1 - s), t._time = 0, t._tTime = l, u = t._pt; u; )
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
  var n = t._repeat, s = Dt(i) || 0, o = t._tTime / t._tDur;
  return o && !r && (t._time *= s / t._dur), t._dur = s, t._tDur = n ? n < 0 ? 1e10 : Dt(s * (n + 1) + t._rDelay * n) : s, o > 0 && !r && Ln(t, t._tTime = t._tDur * o), t.parent && zn(t), e || Di(t.parent, t), t;
}, Js = function(t) {
  return t instanceof ee ? Di(t) : lr(t, t._dur);
}, yl = {
  _start: 0,
  endTime: Xr,
  totalDuration: Xr
}, xe = function a(t, i, e) {
  var r = t.labels, n = t._recent || yl, s = t.duration() >= Te ? n.endTime(!1) : t._dur, o, l, u;
  return Mt(i) && (isNaN(i) || i in r) ? (l = i.charAt(0), u = i.substr(-1) === "%", o = i.indexOf("="), l === "<" || l === ">" ? (o >= 0 && (i = i.replace(/=/, "")), (l === "<" ? n._start : n.endTime(n._repeat >= 0)) + (parseFloat(i.substr(1)) || 0) * (u ? (o < 0 ? n : e).totalDuration() / 100 : 1)) : o < 0 ? (i in r || (r[i] = s), r[i]) : (l = parseFloat(i.charAt(o - 1) + i.substr(o + 1)), u && e && (l = l / 100 * (Yt(e) ? e[0] : e).totalDuration()), o > 1 ? a(t, i.substr(0, o - 1), e) + l : s + l)) : i == null ? s : +i;
}, Er = function(t, i, e) {
  var r = ei(i[1]), n = (r ? 2 : 1) + (t < 2 ? 0 : 1), s = i[n], o, l;
  if (r && (s.duration = i[1]), s.parent = e, t) {
    for (o = s, l = e; l && !("immediateRender" in o); )
      o = l.vars.defaults || {}, l = ie(l.vars.inherit) && l.parent;
    s.immediateRender = ie(o.immediateRender), t < 2 ? s.runBackwards = 1 : s.startAt = i[n - 1];
  }
  return new xt(i[0], s, i[n + 1]);
}, xi = function(t, i) {
  return t || t === 0 ? i(t) : i;
}, Kr = function(t, i, e) {
  return e < t ? t : e > i ? i : e;
}, Bt = function(t, i) {
  return !Mt(t) || !(i = al.exec(t)) ? "" : i[1];
}, vl = function(t, i, e) {
  return xi(e, function(r) {
    return Kr(t, i, r);
  });
}, as = [].slice, qo = function(t, i) {
  return t && He(t) && "length" in t && (!i && !t.length || t.length - 1 in t && He(t[0])) && !t.nodeType && t !== be;
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
  var i = He(t) ? t : {
    each: t
  }, e = Ri(i.ease), r = i.from || 0, n = parseFloat(i.base) || 0, s = {}, o = r > 0 && r < 1, l = isNaN(r) || o, u = i.axis, f = r, _ = r;
  return Mt(r) ? f = _ = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[r] || 0 : !o && l && (f = r[0], _ = r[1]), function(c, h, p) {
    var d = (p || i).length, m = s[d], y, S, T, v, w, k, b, C, P;
    if (!m) {
      if (P = i.grid === "auto" ? 0 : (i.grid || [1, Te])[1], !P) {
        for (b = -Te; b < (b = p[P++].getBoundingClientRect().left) && P < d; )
          ;
        P--;
      }
      for (m = s[d] = [], y = l ? Math.min(P, d) * f - 0.5 : r % P, S = P === Te ? 0 : l ? d * _ / P - 0.5 : r / P | 0, b = 0, C = Te, k = 0; k < d; k++)
        T = k % P - y, v = S - (k / P | 0), m[k] = w = u ? Math.abs(u === "y" ? v : T) : Eo(T * T + v * v), w > b && (b = w), w < C && (C = w);
      r === "random" && Ko(m), m.max = b - C, m.min = C, m.v = d = (parseFloat(i.amount) || parseFloat(i.each) * (P > d ? d - 1 : u ? u === "y" ? d / P : P : Math.max(P, d / P)) || 0) * (r === "edges" ? -1 : 1), m.b = d < 0 ? n - d : n, m.u = Bt(i.amount || i.each) || 0, e = e && d < 0 ? oa(e) : e;
    }
    return d = (m[c] - m.min) / m.max || 0, Dt(m.b + (e ? e(d) : d) * m.v) + m.u;
  };
}, us = function(t) {
  var i = Math.pow(10, ((t + "").split(".")[1] || "").length);
  return function(e) {
    var r = Dt(Math.round(parseFloat(e) / t) * t * i);
    return (r - r % 1) / i + (ei(e) ? 0 : Bt(e));
  };
}, Zo = function(t, i) {
  var e = Yt(t), r, n;
  return !e && He(t) && (r = e = t.radius || Te, t.values ? (t = Se(t.values), (n = !ei(t[0])) && (r *= r)) : t = us(t.increment)), xi(i, e ? ht(t) ? function(s) {
    return n = t(s), Math.abs(n - s) <= r ? n : s;
  } : function(s) {
    for (var o = parseFloat(n ? s.x : s), l = parseFloat(n ? s.y : 0), u = Te, f = 0, _ = t.length, c, h; _--; )
      n ? (c = t[_].x - o, h = t[_].y - l, c = c * c + h * h) : c = Math.abs(t[_] - o), c < u && (u = c, f = _);
    return f = !r || u <= r ? t[f] : s, n || f === s || ei(s) ? f : f + Bt(s);
  } : us(t));
}, Qo = function(t, i, e, r) {
  return xi(Yt(t) ? !i : e === !0 ? !!(e = 0) : !r, function() {
    return Yt(t) ? t[~~(Math.random() * t.length)] : (e = e || 1e-5) && (r = e < 1 ? Math.pow(10, (e + "").length - 2) : 1) && Math.floor(Math.round((t - e / 2 + Math.random() * (i - t + e * 0.99)) / e) * e * r) / r;
  });
}, bl = function() {
  for (var t = arguments.length, i = new Array(t), e = 0; e < t; e++)
    i[e] = arguments[e];
  return function(r) {
    return i.reduce(function(n, s) {
      return s(n);
    }, r);
  };
}, wl = function(t, i) {
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
    var s = Mt(t), o = {}, l, u, f, _, c;
    if (e === !0 && (r = 1) && (e = null), s)
      t = {
        p: t
      }, i = {
        p: i
      };
    else if (Yt(t) && !Yt(i)) {
      for (f = [], _ = t.length, c = _ - 2, u = 1; u < _; u++)
        f.push(a(t[u - 1], t[u]));
      _--, n = function(p) {
        p *= _;
        var d = Math.min(c, ~~p);
        return f[d](p - d);
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
    return l = r[i + "Params"], u = r.callbackScope || t, e && _i.length && Tn(), o && (yt = o), f = l ? n.apply(u, l) : n.call(u), yt = s, f;
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
    Ce(r, Ce(Sn(t, n), s)), Ii(r.prototype, Ii(n, Sn(t, s))), ce[r.prop = i] = r, t.targetTest && (fn.push(r), Es[i] = 1), i = (i === "css" ? "CSS" : i.charAt(0).toUpperCase() + i.substr(1)) + "Plugin";
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
  var r = t ? ei(t) ? [t >> 16, t >> 8 & J, t & J] : 0 : Pr.black, n, s, o, l, u, f, _, c, h, p;
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
  return i && !p && (n = r[0] / J, s = r[1] / J, o = r[2] / J, _ = Math.max(n, s, o), c = Math.min(n, s, o), f = (_ + c) / 2, _ === c ? l = u = 0 : (h = _ - c, u = f > 0.5 ? h / (2 - _ - c) : h / (_ + c), l = _ === n ? (s - o) / h + (s < o ? 6 : 0) : _ === s ? (o - n) / h + 2 : (n - s) / h + 4, l *= 60), r[0] = ~~(l + 0.5), r[1] = ~~(u * 100 + 0.5), r[2] = ~~(f * 100 + 0.5)), e && r.length < 4 && (r[3] = 1), r;
}, na = function(t) {
  var i = [], e = [], r = -1;
  return t.split(pi).forEach(function(n) {
    var s = n.match(Zi) || [];
    i.push.apply(i, s), e.push(r += s.length + 1);
  }), i.c = e, i;
}, eo = function(t, i, e) {
  var r = "", n = (t + r).match(pi), s = i ? "hsla(" : "rgba(", o = 0, l, u, f, _;
  if (!n)
    return t;
  if (n = n.map(function(c) {
    return (c = ra(c, i, 1)) && s + (i ? c[0] + "," + c[1] + "%," + c[2] + "%," + c[3] : c.join(",")) + ")";
  }), e && (f = na(t), l = e.c, l.join(r) !== f.c.join(r)))
    for (u = t.replace(pi, "1").split(Zi), _ = u.length - 1; o < _; o++)
      r += u[o] + (~l.indexOf(o) ? n.shift() || s + "0,0,0,0)" : (f.length ? f : n.length ? n : e).shift());
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
  var i = t.join(" "), e;
  if (pi.lastIndex = 0, pi.test(i))
    return e = Cl.test(i), t[1] = eo(t[1], e), t[0] = eo(t[0], e, na(t[1])), !0;
}, Vr, _e = function() {
  var a = Date.now, t = 500, i = 33, e = a(), r = e, n = 1e3 / 240, s = n, o = [], l, u, f, _, c, h, p = function d(m) {
    var y = a() - r, S = m === !0, T, v, w, k;
    if (y > t && (e += y - i), r += y, w = r - e, T = w - s, (T > 0 || S) && (k = ++_.frame, c = w - _.time * 1e3, _.time = w = w / 1e3, s += T + (T >= n ? 4 : n - T), v = 1), S || (l = u(d)), v)
      for (h = 0; h < o.length; h++)
        o[h](w, c, k, m);
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
      Fo && (!rs && Os() && (be = rs = window, Ms = be.document || {}, me.gsap = se, (be.gsapVersions || (be.gsapVersions = [])).push(se.version), Io(bn || be.GreenSockGlobals || !be.gsap && be || {}), f = be.requestAnimationFrame, ea.forEach(ia)), l && _.sleep(), u = f || function(m) {
        return setTimeout(m, s - _.time * 1e3 + 1 | 0);
      }, Vr = 1, p(2));
    },
    sleep: function() {
      (f ? be.cancelAnimationFrame : clearTimeout)(l), Vr = 0, u = Xr;
    },
    lagSmoothing: function(m, y) {
      t = m || 1 / 0, i = Math.min(y || 33, t);
    },
    fps: function(m) {
      n = 1e3 / (m || 240), s = _.time * 1e3 + n;
    },
    add: function(m, y, S) {
      var T = y ? function(v, w, k, b) {
        m(v, w, k, b), _.remove(T);
      } : m;
      return _.remove(m), o[S ? "unshift" : "push"](T), ur(), T;
    },
    remove: function(m, y) {
      ~(y = o.indexOf(m)) && o.splice(y, 1) && h >= y && h--;
    },
    _listeners: o
  }, _;
}(), ur = function() {
  return !Vr && _e.wake();
}, K = {}, Ol = /^[\d.\-M][\d.\-,\s]/, Ml = /["']/g, Al = function(t) {
  for (var i = {}, e = t.substr(1, t.length - 3).split(":"), r = e[0], n = 1, s = e.length, o, l, u; n < s; n++)
    l = e[n], o = n !== s - 1 ? l.lastIndexOf(",") : l.length, u = l.substr(0, o), i[r] = isNaN(u) ? u.replace(Ml, "").trim() : +u, r = l.substr(o + 1).trim();
  return i;
}, El = function(t) {
  var i = t.indexOf("(") + 1, e = t.indexOf(")"), r = t.indexOf("(", i);
  return t.substring(i, ~r && r < e ? t.indexOf(")", e + 1) : e);
}, Dl = function(t) {
  var i = (t + "").split("("), e = K[i[0]];
  return e && i.length > 1 && e.config ? e.config.apply(null, ~t.indexOf("{") ? [Al(i[1])] : El(t).split(",").map(Wo)) : K._CE && Ol.test(t) ? K._CE("", t) : e;
}, oa = function(t) {
  return function(i) {
    return 1 - t(1 - i);
  };
}, aa = function a(t, i) {
  for (var e = t._first, r; e; )
    e instanceof ee ? a(e, i) : e.vars.yoyoEase && (!e._yoyo || !e._repeat) && e._yoyo !== i && (e.timeline ? a(e.timeline, i) : (r = e._ease, e._ease = e._yEase, e._yEase = r, e._yoyo = i)), e = e._next;
}, Ri = function(t, i) {
  return t && (ht(t) ? t : K[t] || Dl(t)) || i;
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
    K[o] = me[o] = n, K[s = o.toLowerCase()] = e;
    for (var l in n)
      K[s + (l === "easeIn" ? ".in" : l === "easeOut" ? ".out" : ".inOut")] = K[o + "." + l] = n[l];
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
K.Linear.easeNone = K.none = K.Linear.easeIn;
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
  return -(Eo(1 - a * a) - 1);
});
Xi("Sine", function(a) {
  return a === 1 ? 1 : -sl(a * rl) + 1;
});
Xi("Back", Wn("in"), Wn("out"), Wn());
K.SteppedEase = K.steps = me.SteppedEase = {
  config: function(t, i) {
    t === void 0 && (t = 1);
    var e = 1 / t, r = t + (i ? 0 : 1), n = i ? 1 : 0, s = 1 - tt;
    return function(o) {
      return ((r * Kr(0, s, o) | 0) + n) * e;
    };
  }
};
or.ease = K["quad.out"];
re("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(a) {
  return Ds += a + "," + a + "Params,";
});
var ua = function(t, i) {
  this.id = nl++, t._gsap = this, this.target = t, this.harness = i, this.get = i ? i.get : Yo, this.set = i ? i.getSetter : Is;
}, fr = /* @__PURE__ */ function() {
  function a(i) {
    this.vars = i, this._delay = +i.delay || 0, (this._repeat = i.repeat === 1 / 0 ? -2 : i.repeat || 0) && (this._rDelay = i.repeatDelay || 0, this._yoyo = !!i.yoyo || !!i.yoyoEase), this._ts = 1, lr(this, +i.duration, 1, 1), this.data = i.data, yt && (this._ctx = yt, yt.data.push(this)), Vr || _e.wake();
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
      for (Ln(this, e), !n._dp || n.parent || Uo(n, this); n && n.parent; )
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
    var r = this.parent && this._ts ? Pn(this.parent._time, this) : this._tTime;
    return this._rts = +e || 0, this._ts = this._ps || e === -tt ? 0 : this._rts, this.totalTime(Kr(-Math.abs(this._delay), this._tDur, r), !0), zn(this), dl(this);
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
    return r ? e && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Pn(r.rawTime(e), this) : this._tTime : this._tTime;
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
  Ao(t, a);
  function t(e, r) {
    var n;
    return e === void 0 && (e = {}), n = a.call(this, e) || this, n.labels = {}, n.smoothChildTiming = !!e.smoothChildTiming, n.autoRemoveChildren = !!e.autoRemoveChildren, n._sort = ie(e.sortChildren), at && We(e.parent || at, je(n), r), e.reversed && n.reverse(), e.paused && n.paused(!0), e.scrollTrigger && Ho(je(n), e.scrollTrigger), n;
  }
  var i = t.prototype;
  return i.to = function(r, n, s) {
    return Er(0, arguments, this), this;
  }, i.from = function(r, n, s) {
    return Er(1, arguments, this), this;
  }, i.fromTo = function(r, n, s, o) {
    return Er(2, arguments, this), this;
  }, i.set = function(r, n, s) {
    return n.duration = 0, n.parent = this, Ar(n).repeatDelay || (n.repeat = 0), n.immediateRender = !!n.immediateRender, new xt(r, n, xe(this, s), 1), this;
  }, i.call = function(r, n, s) {
    return We(this, xt.delayedCall(0, r, n), s);
  }, i.staggerTo = function(r, n, s, o, l, u, f) {
    return s.duration = n, s.stagger = s.stagger || o, s.onComplete = u, s.onCompleteParams = f, s.parent = this, new xt(r, s, xe(this, l)), this;
  }, i.staggerFrom = function(r, n, s, o, l, u, f) {
    return s.runBackwards = 1, Ar(s).immediateRender = ie(s.immediateRender), this.staggerTo(r, n, s, o, l, u, f);
  }, i.staggerFromTo = function(r, n, s, o, l, u, f, _) {
    return o.startAt = s, Ar(o).immediateRender = ie(o.immediateRender), this.staggerTo(r, n, o, l, u, f, _);
  }, i.render = function(r, n, s) {
    var o = this._time, l = this._dirty ? this.totalDuration() : this._tDur, u = this._dur, f = r <= 0 ? 0 : Dt(r), _ = this._zTime < 0 != r < 0 && (this._initted || !u), c, h, p, d, m, y, S, T, v, w, k, b;
    if (this !== at && f > l && r >= 0 && (f = l), f !== this._tTime || s || _) {
      if (o !== this._time && u && (f += this._time - o, r += this._time - o), c = f, v = this._start, T = this._ts, y = !T, _ && (u || (o = this._zTime), (r || !n) && (this._zTime = r)), this._repeat) {
        if (k = this._yoyo, m = u + this._rDelay, this._repeat < -1 && r < 0)
          return this.totalTime(m * 100 + r, n, s);
        if (c = Dt(f % m), f === l ? (d = this._repeat, c = u) : (d = ~~(f / m), d && d === f / m && (c = u, d--), c > u && (c = u)), w = ar(this._tTime, m), !o && this._tTime && w !== d && this._tTime - w * m - this._dur <= 0 && (w = d), k && d & 1 && (c = u - c, b = 1), d !== w && !this._lock) {
          var C = k && w & 1, P = C === (k && d & 1);
          if (d < w && (C = !C), o = C ? 0 : u, this._lock = 1, this.render(o || (b ? 0 : Dt(d * m)), n, !u)._lock = 0, this._tTime = f, !n && this.parent && Pe(this, "onRepeat"), this.vars.repeatRefresh && !b && (this.invalidate()._lock = 1), o && o !== this._time || y !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (u = this._dur, l = this._tDur, P && (this._lock = 2, o = C ? u : -1e-4, this.render(o, !0), this.vars.repeatRefresh && !b && this.invalidate()), this._lock = 0, !this._ts && !y)
            return this;
          aa(this, b);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (S = ml(this, Dt(o), Dt(c)), S && (f -= c - (c = S._start))), this._tTime = f, this._time = c, this._act = !T, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = r, o = 0), !o && c && !n && !d && (Pe(this, "onStart"), this._tTime !== f))
        return this;
      if (c >= o && r >= 0)
        for (h = this._first; h; ) {
          if (p = h._next, (h._act || c >= h._start) && h._ts && S !== h) {
            if (h.parent !== this)
              return this.render(r, n, s);
            if (h.render(h._ts > 0 ? (c - h._start) * h._ts : (h._dirty ? h.totalDuration() : h._tDur) + (c - h._start) * h._ts, n, s), c !== this._time || !this._ts && !y) {
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
            if (h.render(h._ts > 0 ? (M - h._start) * h._ts : (h._dirty ? h.totalDuration() : h._tDur) + (M - h._start) * h._ts, n, s || Nt && (h._initted || h._startAt)), c !== this._time || !this._ts && !y) {
              S = 0, p && (f += this._zTime = M ? -tt : tt);
              break;
            }
          }
          h = p;
        }
      }
      if (S && !n && (this.pause(), S.render(c >= o ? 0 : -tt)._zTime = c >= o ? 1 : -1, this._ts))
        return this._start = v, zn(this), this.render(r, n, s);
      this._onUpdate && !n && Pe(this, "onUpdate", !0), (f === l && this._tTime >= this.totalDuration() || !f && o) && (v === this._start || Math.abs(T) !== Math.abs(this._ts)) && (this._lock || ((r || !u) && (f === l && this._ts > 0 || !f && this._ts < 0) && mi(this, 1), !n && !(r < 0 && !o) && (f || o || !l) && (Pe(this, f === l && r >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(f < l && this.timeScale() > 0) && this._prom())));
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
    return Mt(r) ? this.removeLabel(r) : ht(r) ? this.killTweensOf(r) : (Rn(this, r), r === this._recent && (this._recent = this._last), Di(this));
  }, i.totalTime = function(r, n) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = Dt(_e.time - (this._ts > 0 ? r / this._ts : (this.totalDuration() - r) / -this._ts))), a.prototype.totalTime.call(this, r, n), this._forcing = 0, this) : this._tTime;
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
    return Di(this);
  }, i.invalidate = function(r) {
    var n = this._first;
    for (this._lock = 0; n; )
      n.invalidate(r), n = n._next;
    return a.prototype.invalidate.call(this, r);
  }, i.clear = function(r) {
    r === void 0 && (r = !0);
    for (var n = this._first, s; n; )
      s = n._next, this.remove(n), n = s;
    return this._dp && (this._time = this._tTime = this._pTime = 0), r && (this.labels = {}), Di(this);
  }, i.totalDuration = function(r) {
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
var Rl = function(t, i, e, r, n, s, o) {
  var l = new ne(this._pt, t, i, 0, 1, pa, null, n), u = 0, f = 0, _, c, h, p, d, m, y, S;
  for (l.b = e, l.e = r, e += "", r += "", (y = ~r.indexOf("random(")) && (r = Wr(r)), s && (S = [e, r], s(S, t, i), e = S[0], r = S[1]), c = e.match(Bn) || []; _ = Bn.exec(r); )
    p = _[0], d = r.substring(u, _.index), h ? h = (h + 1) % 5 : d.substr(-5) === "rgba(" && (h = 1), p !== c[f++] && (m = parseFloat(c[f - 1]) || 0, l._pt = {
      _next: l._pt,
      p: d || f === 1 ? d : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: m,
      c: p.charAt(1) === "=" ? er(m, p) - m : parseFloat(p) - m,
      m: h && h < 4 ? Math.round : 0
    }, u = Bn.lastIndex);
  return l.c = u < r.length ? r.substring(u, r.length) : "", l.fp = o, (zo.test(r) || y) && (l.e = 0), this._pt = l, l;
}, zs = function(t, i, e, r, n, s, o, l, u, f) {
  ht(r) && (r = r(n || 0, t, s));
  var _ = t[i], c = e !== "get" ? e : ht(_) ? u ? t[i.indexOf("set") || !ht(t["get" + i.substr(3)]) ? i : "get" + i.substr(3)](u) : t[i]() : _, h = ht(_) ? u ? Bl : da : Fs, p;
  if (Mt(r) && (~r.indexOf("random(") && (r = Wr(r)), r.charAt(1) === "=" && (p = er(c, r) + (Bt(c) || 0), (p || p === 0) && (r = p))), !f || c !== r || fs)
    return !isNaN(c * r) && r !== "" ? (p = new ne(this._pt, t, i, +c || 0, r - (c || 0), typeof _ == "boolean" ? Yl : _a, 0, h), u && (p.fp = u), o && p.modifier(o, this, t), this._pt = p) : (!_ && !(i in t) && As(i, r), Rl.call(this, t, i, c, r, h, l || ge.stringFilter, u));
}, zl = function(t, i, e, r, n) {
  if (ht(t) && (t = Dr(t, n, i, e, r)), !He(t) || t.style && t.nodeType || Yt(t) || Do(t))
    return Mt(t) ? Dr(t, n, i, e, r) : t;
  var s = {}, o;
  for (o in t)
    s[o] = Dr(t[o], n, i, e, r);
  return s;
}, fa = function(t, i, e, r, n, s) {
  var o, l, u, f;
  if (ce[t] && (o = new ce[t]()).init(n, o.rawVars ? i[t] : zl(i[t], r, n, s, e), e, r, s) !== !1 && (e._pt = l = new ne(e._pt, n, t, 0, 1, o.render, o, 0, o.priority), e !== Qi))
    for (u = e._ptLookup[e._targets.indexOf(n)], f = o._props.length; f--; )
      u[o._props[f]] = l;
  return o;
}, li, fs, Ls = function a(t, i, e) {
  var r = t.vars, n = r.ease, s = r.startAt, o = r.immediateRender, l = r.lazy, u = r.onUpdate, f = r.onUpdateParams, _ = r.callbackScope, c = r.runBackwards, h = r.yoyoEase, p = r.keyframes, d = r.autoRevert, m = t._dur, y = t._startAt, S = t._targets, T = t.parent, v = T && T.data === "nested" ? T.vars.targets : S, w = t._overwrite === "auto" && !ks, k = t.timeline, b, C, P, M, D, A, j, I, B, G, L, q, Q;
  if (k && (!p || !n) && (n = "none"), t._ease = Ri(n, or.ease), t._yEase = h ? oa(Ri(h === !0 ? n : h, or.ease)) : 0, h && t._yoyo && !t._repeat && (h = t._yEase, t._yEase = t._ease, t._ease = h), t._from = !k && !!r.runBackwards, !k || p && !r.stagger) {
    if (I = S[0] ? Ei(S[0]).harness : 0, q = I && r[I.prop], b = Sn(r, Es), y && (y._zTime < 0 && y.progress(1), i < 0 && c && o && !d ? y.render(-1, !0) : y.revert(c && m ? un : ll), y._lazy = 0), s) {
      if (mi(t._startAt = xt.set(S, Ce({
        data: "isStart",
        overwrite: !1,
        parent: T,
        immediateRender: !0,
        lazy: !y && ie(l),
        startAt: null,
        delay: 0,
        onUpdate: u,
        onUpdateParams: f,
        callbackScope: _,
        stagger: 0
      }, s))), t._startAt._dp = 0, t._startAt._sat = t, i < 0 && (Nt || !o && !d) && t._startAt.revert(un), o && m && i <= 0 && e <= 0) {
        i && (t._zTime = i);
        return;
      }
    } else if (c && m && !y) {
      if (i && (o = !1), P = Ce({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: o && !y && ie(l),
        immediateRender: o,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: T
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y:gsap.utils.wrap([-100,100])})
      }, b), q && (P[I.prop] = q), mi(t._startAt = xt.set(S, P)), t._startAt._dp = 0, t._startAt._sat = t, i < 0 && (Nt ? t._startAt.revert(un) : t._startAt.render(-1, !0)), t._zTime = i, !o)
        a(t._startAt, tt, tt);
      else if (!i)
        return;
    }
    for (t._pt = t._ptCache = 0, l = m && ie(l) || l && !m, C = 0; C < S.length; C++) {
      if (D = S[C], j = D._gsap || Rs(S)[C]._gsap, t._ptLookup[C] = G = {}, ns[j.id] && _i.length && Tn(), L = v === S ? C : v.indexOf(D), I && (B = new I()).init(D, q || b, t, L, v) !== !1 && (t._pt = M = new ne(t._pt, D, B.name, 0, 1, B.render, B, 0, B.priority), B._props.forEach(function(g) {
        G[g] = M;
      }), B.priority && (A = 1)), !I || q)
        for (P in b)
          ce[P] && (B = fa(P, b, t, L, D, v)) ? B.priority && (A = 1) : G[P] = M = zs.call(t, D, P, "get", b[P], L, v, 0, r.stringFilter);
      t._op && t._op[C] && t.kill(D, t._op[C]), w && t._pt && (li = t, at.killTweensOf(D, G, t.globalTime(i)), Q = !t.parent, li = 0), t._pt && l && (ns[j.id] = 1);
    }
    A && ga(t), t._onInit && t._onInit(t);
  }
  t._onUpdate = u, t._initted = (!t._op || t._pt) && !Q, p && i <= 0 && k.render(Te, !0, !0);
}, Ll = function(t, i, e, r, n, s, o) {
  var l = (t._pt && t._ptCache || (t._ptCache = {}))[i], u, f, _, c;
  if (!l)
    for (l = t._ptCache[i] = [], _ = t._ptLookup, c = t._targets.length; c--; ) {
      if (u = _[c][i], u && u.d && u.d._pt)
        for (u = u.d._pt; u && u.p !== i && u.fp !== i; )
          u = u._next;
      if (!u)
        return fs = 1, t.vars[i] = "+=0", Ls(t, o), fs = 0, 1;
      l.push(u);
    }
  for (c = l.length; c--; )
    f = l[c], u = f._pt || f, u.s = (r || r === 0) && !n ? r : u.s + (r || 0) + s * u.c, u.c = e - u.s, f.e && (f.e = pt(e) + Bt(f.e)), f.b && (f.b = u.s + Bt(f.b));
}, Fl = function(t, i) {
  var e = t[0] ? Ei(t[0]).harness : 0, r = e && e.aliases, n, s, o, l;
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
}, Dr = function(t, i, e, r, n) {
  return ht(t) ? t.call(i, e, r, n) : Mt(t) && ~t.indexOf("random(") ? Wr(t) : t;
}, ha = Ds + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", ca = {};
re(ha + ",id,stagger,delay,duration,paused,scrollTrigger", function(a) {
  return ca[a] = 1;
});
var xt = /* @__PURE__ */ function(a) {
  Ao(t, a);
  function t(e, r, n, s) {
    var o;
    typeof r == "number" && (n.duration = r, r = n, n = null), o = a.call(this, s ? r : Ar(r)) || this;
    var l = o.vars, u = l.duration, f = l.delay, _ = l.immediateRender, c = l.stagger, h = l.overwrite, p = l.keyframes, d = l.defaults, m = l.scrollTrigger, y = l.yoyoEase, S = r.parent || at, T = (Yt(e) || Do(e) ? ei(e[0]) : "length" in r) ? [e] : Se(e), v, w, k, b, C, P, M, D;
    if (o._targets = T.length ? Rs(T) : wn("GSAP target " + e + " not found. https://greensock.com", !ge.nullTargetWarn) || [], o._ptLookup = [], o._overwrite = h, p || c || jr(u) || jr(f)) {
      if (r = o.vars, v = o.timeline = new ee({
        data: "nested",
        defaults: d || {},
        targets: S && S.data === "nested" ? S.vars.targets : T
      }), v.kill(), v.parent = v._dp = je(o), v._start = 0, c || jr(u) || jr(f)) {
        if (b = T.length, M = c && jo(c), He(c))
          for (C in c)
            ~ha.indexOf(C) && (D || (D = {}), D[C] = c[C]);
        for (w = 0; w < b; w++)
          k = Sn(r, ca), k.stagger = 0, y && (k.yoyoEase = y), D && Ii(k, D), P = T[w], k.duration = +Dr(u, je(o), w, P, T), k.delay = (+Dr(f, je(o), w, P, T) || 0) - o._delay, !c && b === 1 && k.delay && (o._delay = f = k.delay, o._start += f, k.delay = 0), v.to(P, k, M ? M(w, P, T) : 0), v._ease = K.none;
        v.duration() ? u = f = 0 : o.timeline = 0;
      } else if (p) {
        Ar(Ce(v.vars.defaults, {
          ease: "none"
        })), v._ease = Ri(p.ease || r.ease || "none");
        var A = 0, j, I, B;
        if (Yt(p))
          p.forEach(function(G) {
            return v.to(T, G, ">");
          }), v.duration();
        else {
          k = {};
          for (C in p)
            C === "ease" || C === "easeEach" || Il(C, p[C], k, p.easeEach);
          for (C in k)
            for (j = k[C].sort(function(G, L) {
              return G.t - L.t;
            }), A = 0, w = 0; w < j.length; w++)
              I = j[w], B = {
                ease: I.e,
                duration: (I.t - (w ? j[w - 1].t : 0)) / 100 * u
              }, B[C] = I.v, v.to(T, B, A), A += B.duration;
          v.duration() < u && v.to({}, {
            duration: u - v.duration()
          });
        }
      }
      u || o.duration(u = v.duration());
    } else
      o.timeline = 0;
    return h === !0 && !ks && (li = je(o), at.killTweensOf(T), li = 0), We(S, je(o), n), r.reversed && o.reverse(), r.paused && o.paused(!0), (_ || !u && !p && o._start === Dt(S._time) && ie(_) && _l(je(o)) && S.data !== "nested") && (o._tTime = -tt, o.render(Math.max(0, -f) || 0)), m && Ho(je(o), m), o;
  }
  var i = t.prototype;
  return i.render = function(r, n, s) {
    var o = this._time, l = this._tDur, u = this._dur, f = r < 0, _ = r > l - tt && !f ? l : r < tt ? 0 : r, c, h, p, d, m, y, S, T, v;
    if (!u)
      gl(this, r, n, s);
    else if (_ !== this._tTime || !r || s || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== f) {
      if (c = _, T = this.timeline, this._repeat) {
        if (d = u + this._rDelay, this._repeat < -1 && f)
          return this.totalTime(d * 100 + r, n, s);
        if (c = Dt(_ % d), _ === l ? (p = this._repeat, c = u) : (p = ~~(_ / d), p && p === _ / d && (c = u, p--), c > u && (c = u)), y = this._yoyo && p & 1, y && (v = this._yEase, c = u - c), m = ar(this._tTime, d), c === o && !s && this._initted)
          return this._tTime = _, this;
        p !== m && (T && this._yEase && aa(T, y), this.vars.repeatRefresh && !y && !this._lock && (this._lock = s = 1, this.render(Dt(d * p), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (Go(this, f ? r : c, s, n, _))
          return this._tTime = 0, this;
        if (o !== this._time)
          return this;
        if (u !== this._dur)
          return this.render(r, n, s);
      }
      if (this._tTime = _, this._time = c, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = S = (v || this._ease)(c / u), this._from && (this.ratio = S = 1 - S), c && !o && !n && !p && (Pe(this, "onStart"), this._tTime !== _))
        return this;
      for (h = this._pt; h; )
        h.r(S, h.d), h = h._next;
      T && T.render(r < 0 ? r : !c && y ? -tt : T._dur * T._ease(c / this._dur), n, s) || this._startAt && (this._zTime = r), this._onUpdate && !n && (f && ss(this, r, n, s), Pe(this, "onUpdate")), this._repeat && p !== m && this.vars.onRepeat && !n && this.parent && Pe(this, "onRepeat"), (_ === this._tDur || !_) && this._tTime === _ && (f && !this._onUpdate && ss(this, r, !0, !0), (r || !u) && (_ === this._tDur && this._ts > 0 || !_ && this._ts < 0) && mi(this, 1), !n && !(f && !o) && (_ || o || y) && (Pe(this, _ === l ? "onComplete" : "onReverseComplete", !0), this._prom && !(_ < l && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, i.targets = function() {
    return this._targets;
  }, i.invalidate = function(r) {
    return (!r || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(r), a.prototype.invalidate.call(this, r);
  }, i.resetTo = function(r, n, s, o) {
    Vr || _e.wake(), this._ts || this.play();
    var l = Math.min(this._dur, (this._dp._time - this._start) * this._ts), u;
    return this._initted || Ls(this, l), u = this._ease(l / this._dur), Ll(this, r, n, s, o, u, l) ? this.resetTo(r, n, s, o) : (Ln(this, 0), this.parent || $o(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, i.kill = function(r, n) {
    if (n === void 0 && (n = "all"), !r && (!n || n === "all"))
      return this._lazy = this._pt = 0, this.parent ? Sr(this) : this;
    if (this.timeline) {
      var s = this.timeline.totalDuration();
      return this.timeline.killTweensOf(r, n, li && li.vars.overwrite !== !0)._first || Sr(this), this.parent && s !== this.timeline.totalDuration() && lr(this, this._dur * this.timeline._tDur / s, 0, 1), this;
    }
    var o = this._targets, l = r ? Se(r) : o, u = this._ptLookup, f = this._pt, _, c, h, p, d, m, y;
    if ((!n || n === "all") && cl(o, l))
      return n === "all" && (this._pt = 0), Sr(this);
    for (_ = this._op = this._op || [], n !== "all" && (Mt(n) && (d = {}, re(n, function(S) {
      return d[S] = 1;
    }), n = d), n = Fl(o, n)), y = o.length; y--; )
      if (~l.indexOf(o[y])) {
        c = u[y], n === "all" ? (_[y] = n, p = c, h = {}) : (h = _[y] = _[y] || {}, p = n);
        for (d in p)
          m = c && c[d], m && ((!("kill" in m.d) || m.d.kill(d) === !0) && Rn(this, m, "_pt"), delete c[d]), h !== "all" && (h[d] = 1);
      }
    return this._initted && !this._pt && f && Sr(this), this;
  }, t.to = function(r, n) {
    return new t(r, n, arguments[2]);
  }, t.from = function(r, n) {
    return Er(1, arguments);
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
    return Er(2, arguments);
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
}, da = function(t, i, e) {
  return t[i](e);
}, Bl = function(t, i, e, r) {
  return t[i](r.fp, e);
}, Nl = function(t, i, e) {
  return t.setAttribute(i, e);
}, Is = function(t, i) {
  return ht(t[i]) ? da : Cs(t[i]) && t.setAttribute ? Nl : Fs;
}, _a = function(t, i) {
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
    r = i._next, i.p === t && !i.op || i.op === t ? Rn(this, i, "_pt") : i.dep || (e = 1), i = r;
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
    this.t = e, this.s = n, this.c = s, this.p = r, this.r = o || _a, this.d = l || this, this.set = u || Fs, this.pr = f || 0, this._next = i, i && (i._prev = this);
  }
  var t = a.prototype;
  return t.modifier = function(e, r, n) {
    this.mSet = this.mSet || this.set, this.set = Vl, this.m = e, this.mt = n, this.tween = r;
  }, a;
}();
re(Ds + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(a) {
  return Es[a] = 1;
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
  return (hn[t] || $l).map(function(i) {
    return i();
  });
}, hs = function() {
  var t = Date.now(), i = [];
  t - io > 2 && (Vn("matchMediaInit"), hr.forEach(function(e) {
    var r = e.queries, n = e.conditions, s, o, l, u;
    for (o in r)
      s = be.matchMedia(r[o]).matches, s && (l = 1), s !== n[o] && (n[o] = s, u = 1);
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
      var u = yt, f = s.selector, _;
      return u && u !== s && u.data.push(s), n && (s.selector = ls(n)), yt = s, _ = r.apply(s, arguments), ht(_) && s._r.push(_), yt = u, s.selector = f, s.isReverted = !1, _;
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
}(), Ul = /* @__PURE__ */ function() {
  function a(i) {
    this.contexts = [], this.scope = i;
  }
  var t = a.prototype;
  return t.add = function(e, r, n) {
    He(e) || (e = {
      matches: e
    });
    var s = new ma(0, n || this.scope), o = s.conditions = {}, l, u, f;
    this.contexts.push(s), r = s.add("onMatch", r), s.queries = e;
    for (u in e)
      u === "all" ? f = 1 : (l = be.matchMedia(e[u]), l && (hr.indexOf(s) < 0 && hr.push(s), (o[u] = l.matches) && (f = 1), l.addListener ? l.addListener(hs) : l.addEventListener("change", hs)));
    return f && r(s), this;
  }, t.revert = function(e) {
    this.kill(e || {});
  }, t.kill = function(e) {
    this.contexts.forEach(function(r) {
      return r.kill(e, !0);
    });
  }, a;
}(), kn = {
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
    var n = Ei(t || {}).get, s = e ? Vo : Wo;
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
        for (var _ = n; _--; )
          r[_](f);
      };
    }
    t = t[0] || {};
    var s = ce[i], o = Ei(t), l = o.harness && (o.harness.aliases || {})[i] || i, u = s ? function(f) {
      var _ = new s();
      Qi._pt = 0, _.init(t, e ? f + e : f, Qi, 0, [t]), _.render(1, _), Qi._pt && Bs(1, Qi);
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
      return this.add(Nn[i](o, He(l) ? l : (u = l) && {}, this), u);
    });
  },
  registerEase: function(t, i) {
    K[t] = Ri(i);
  },
  parseEase: function(t, i) {
    return arguments.length ? Ri(t, i) : K;
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
    return new Ul(t);
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
    var e = hn[t] || (hn[t] = []);
    ~e.indexOf(i) || e.push(i);
  },
  removeEventListener: function(t, i) {
    var e = hn[t], r = e && e.indexOf(i);
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
    pipe: bl,
    unitize: wl,
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
    getCache: Ei,
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
var Hl = function(t, i) {
  for (var e = t._pt; e && e.p !== i && e.op !== i && e.fp !== i; )
    e = e._next;
  return e;
}, Gl = function(t, i) {
  var e = t._targets, r, n, s;
  for (r in i)
    for (n = e.length; n--; )
      s = t._ptLookup[n][r], s && (s = s.d) && (s._pt && (s = Hl(s, r)), s && s.modifier && s.modifier(i[r], t, e[n], r));
}, $n = function(t, i) {
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
}, se = kn.registerPlugin({
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
}, $n("roundProps", us), $n("modifiers"), $n("snap", Zo)) || kn;
xt.version = ee.version = se.version = "3.11.5";
Fo = 1;
Os() && ur();
K.Power0;
K.Power1;
K.Power2;
K.Power3;
K.Power4;
K.Linear;
K.Quad;
K.Cubic;
K.Quart;
K.Quint;
K.Strong;
K.Elastic;
K.Back;
K.SteppedEase;
K.Bounce;
K.Sine;
K.Expo;
K.Circ;
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
}, ba = function(t, i) {
  var e = {
    target: t,
    props: [],
    revert: au,
    save: ou
  };
  return t._gsap || se.core.getCache(t), i && i.split(",").forEach(function(r) {
    return e.save(r);
  }), e;
}, wa, ds = function(t, i) {
  var e = ui.createElementNS ? ui.createElementNS((i || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : ui.createElement(t);
  return e.style ? e : ui.createElement(t);
}, $e = function a(t, i, e) {
  var r = getComputedStyle(t);
  return r[i] || r.getPropertyValue(i.replace(Xs, "-$1").toLowerCase()) || r.getPropertyValue(i) || !e && a(t, cr(i) || i, 1) || "";
}, oo = "O,Moz,ms,Ms,Webkit".split(","), cr = function(t, i, e) {
  var r = i || Mi, n = r.style, s = 5;
  if (t in n && !e)
    return t;
  for (t = t.charAt(0).toUpperCase() + t.substr(1); s-- && !(oo[s] + t in n); )
    ;
  return s < 0 ? null : (s === 3 ? "ms" : s >= 0 ? oo[s] : "") + t;
}, _s = function() {
  ql() && window.document && (ro = window, ui = ro.document, ir = ui.documentElement, Mi = ds("div") || {
    style: {}
  }, ds("div"), lt = cr(lt), Fe = lt + "Origin", Mi.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", wa = !!cr("perspective"), Ys = se.core.reverting, Ns = 1);
}, Un = function a(t) {
  var i = ds("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), e = this.parentNode, r = this.nextSibling, n = this.style.cssText, s;
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
    i = Un.call(t, !0);
  }
  return i && (i.width || i.height) || t.getBBox === Un || (i = Un.call(t, !0)), i && !i.width && !i.x && !i.y ? {
    x: +ao(t, ["x", "cx", "x1"]) || 0,
    y: +ao(t, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : i;
}, Sa = function(t) {
  return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && Ta(t));
}, $r = function(t, i) {
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
  var n = parseFloat(e) || 0, s = (e + "").trim().substr((n + "").length) || "px", o = Mi.style, l = Kl.test(i), u = t.tagName.toLowerCase() === "svg", f = (u ? "client" : "offset") + (l ? "Width" : "Height"), _ = 100, c = r === "px", h = r === "%", p, d, m, y;
  return r === s || !n || lo[r] || lo[s] ? n : (s !== "px" && !c && (n = a(t, i, e, "px")), y = t.getCTM && Sa(t), (h || s === "%") && (ii[i] || ~i.indexOf("adius")) ? (p = y ? t.getBBox()[l ? "width" : "height"] : t[f], pt(h ? n / p * _ : n / 100 * p)) : (o[l ? "width" : "height"] = _ + (c ? s : r), d = ~i.indexOf("adius") || r === "em" && t.appendChild && !u ? t : t.parentNode, y && (d = (t.ownerSVGElement || {}).parentNode), (!d || d === ui || !d.appendChild) && (d = ui.body), m = d._gsap, m && h && m.width && l && m.time === _e.time && !m.uncache ? pt(n / m.width * _) : ((h || s === "%") && !lu[$e(d, "display")] && (o.position = $e(t, "position")), d === t && (o.position = "static"), d.appendChild(Mi), p = Mi[f], d.removeChild(Mi), o.position = "absolute", l && h && (m = Ei(d), m.time = _e.time, m.width = d[f]), pt(c ? p * n / _ : p && n ? _ / p * n : 0))));
}, Ze = function(t, i, e, r) {
  var n;
  return Ns || _s(), i in Ve && i !== "transform" && (i = Ve[i], ~i.indexOf(",") && (i = i.split(",")[0])), ii[i] && i !== "transform" ? (n = Hr(t, r), n = i !== "transformOrigin" ? n[i] : n.svg ? n.origin : On($e(t, Fe)) + " " + n.zOrigin + "px") : (n = t.style[i], (!n || n === "auto" || r || ~(n + "").indexOf("calc(")) && (n = Cn[i] && Cn[i](t, i, e) || $e(t, i) || Yo(t, i) || (i === "opacity" ? 1 : 0))), e && !~(n + "").trim().indexOf(" ") ? yi(t, i, n, e) + e : n;
}, uu = function(t, i, e, r) {
  if (!e || e === "none") {
    var n = cr(i, t, 1), s = n && $e(t, n, 1);
    s && s !== e ? (i = n, e = s) : i === "borderColor" && (e = $e(t, "borderTopColor"));
  }
  var o = new ne(this._pt, t.style, i, 0, 1, pa), l = 0, u = 0, f, _, c, h, p, d, m, y, S, T, v, w;
  if (o.b = e, o.e = r, e += "", r += "", r === "auto" && (t.style[i] = r, r = $e(t, i) || r, t.style[i] = e), f = [e, r], sa(f), e = f[0], r = f[1], c = e.match(Zi) || [], w = r.match(Zi) || [], w.length) {
    for (; _ = Zi.exec(r); )
      m = _[0], S = r.substring(l, _.index), p ? p = (p + 1) % 5 : (S.substr(-5) === "rgba(" || S.substr(-5) === "hsla(") && (p = 1), m !== (d = c[u++] || "") && (h = parseFloat(d) || 0, v = d.substr((h + "").length), m.charAt(1) === "=" && (m = er(h, m) + v), y = parseFloat(m), T = m.substr((y + "").length), l = Zi.lastIndex - T.length, T || (T = T || ge.units[i] || v, l === r.length && (r += T, o.e += T)), v !== T && (h = yi(t, i, d, T) || 0), o._pt = {
        _next: o._pt,
        p: S || u === 1 ? S : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: h,
        c: y - h,
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
        o = n[u], ii[o] && (l = 1, o = o === "transformOrigin" ? Fe : lt), $r(e, o);
    l && ($r(e, lt), s && (s.svg && e.removeAttribute("transform"), Hr(e, 1), s.uncache = 1, xa(r)));
  }
}, Cn = {
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
}, Ur = [1, 0, 0, 1, 0, 0], Pa = {}, ka = function(t) {
  return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
}, fo = function(t) {
  var i = $e(t, lt);
  return ka(i) ? Ur : i.substr(7).match(Ro).map(pt);
}, Ws = function(t, i) {
  var e = t._gsap || Ei(t), r = t.style, n = fo(t), s, o, l, u;
  return e.svg && t.getAttribute("transform") ? (l = t.transform.baseVal.consolidate().matrix, n = [l.a, l.b, l.c, l.d, l.e, l.f], n.join(",") === "1,0,0,1,0,0" ? Ur : n) : (n === Ur && !t.offsetParent && t !== ir && !e.svg && (l = r.display, r.display = "block", s = t.parentNode, (!s || !t.offsetParent) && (u = 1, o = t.nextElementSibling, ir.appendChild(t)), n = fo(t), l ? r.display = l : $r(t, "display"), u && (o ? s.insertBefore(t, o) : s ? s.appendChild(t) : ir.removeChild(t))), i && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n);
}, ps = function(t, i, e, r, n, s) {
  var o = t._gsap, l = n || Ws(t, !0), u = o.xOrigin || 0, f = o.yOrigin || 0, _ = o.xOffset || 0, c = o.yOffset || 0, h = l[0], p = l[1], d = l[2], m = l[3], y = l[4], S = l[5], T = i.split(" "), v = parseFloat(T[0]) || 0, w = parseFloat(T[1]) || 0, k, b, C, P;
  e ? l !== Ur && (b = h * m - p * d) && (C = v * (m / b) + w * (-d / b) + (d * S - m * y) / b, P = v * (-p / b) + w * (h / b) - (h * S - p * y) / b, v = C, w = P) : (k = Ta(t), v = k.x + (~T[0].indexOf("%") ? v / 100 * k.width : v), w = k.y + (~(T[1] || T[0]).indexOf("%") ? w / 100 * k.height : w)), r || r !== !1 && o.smooth ? (y = v - u, S = w - f, o.xOffset = _ + (y * h + S * d) - y, o.yOffset = c + (y * p + S * m) - S) : o.xOffset = o.yOffset = 0, o.xOrigin = v, o.yOrigin = w, o.smooth = !!r, o.origin = i, o.originIsAbsolute = !!e, t.style[Fe] = "0px 0px", s && (fi(s, o, "xOrigin", u, v), fi(s, o, "yOrigin", f, w), fi(s, o, "xOffset", _, o.xOffset), fi(s, o, "yOffset", c, o.yOffset)), t.setAttribute("data-svg-origin", v + " " + w);
}, Hr = function(t, i) {
  var e = t._gsap || new ua(t);
  if ("x" in e && !i && !e.uncache)
    return e;
  var r = t.style, n = e.scaleX < 0, s = "px", o = "deg", l = getComputedStyle(t), u = $e(t, Fe) || "0", f, _, c, h, p, d, m, y, S, T, v, w, k, b, C, P, M, D, A, j, I, B, G, L, q, Q, g, et, Xt, Oe, ut, zt;
  return f = _ = c = d = m = y = S = T = v = 0, h = p = 1, e.svg = !!(t.getCTM && Sa(t)), l.translate && ((l.translate !== "none" || l.scale !== "none" || l.rotate !== "none") && (r[lt] = (l.translate !== "none" ? "translate3d(" + (l.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (l.rotate !== "none" ? "rotate(" + l.rotate + ") " : "") + (l.scale !== "none" ? "scale(" + l.scale.split(" ").join(",") + ") " : "") + (l[lt] !== "none" ? l[lt] : "")), r.scale = r.rotate = r.translate = "none"), b = Ws(t, e.svg), e.svg && (e.uncache ? (q = t.getBBox(), u = e.xOrigin - q.x + "px " + (e.yOrigin - q.y) + "px", L = "") : L = !i && t.getAttribute("data-svg-origin"), ps(t, L || u, !!L || e.originIsAbsolute, e.smooth !== !1, b)), w = e.xOrigin || 0, k = e.yOrigin || 0, b !== Ur && (D = b[0], A = b[1], j = b[2], I = b[3], f = B = b[4], _ = G = b[5], b.length === 6 ? (h = Math.sqrt(D * D + A * A), p = Math.sqrt(I * I + j * j), d = D || A ? Hi(A, D) * Ci : 0, S = j || I ? Hi(j, I) * Ci + d : 0, S && (p *= Math.abs(Math.cos(S * rr))), e.svg && (f -= w - (w * D + k * j), _ -= k - (w * A + k * I))) : (zt = b[6], Oe = b[7], g = b[8], et = b[9], Xt = b[10], ut = b[11], f = b[12], _ = b[13], c = b[14], C = Hi(zt, Xt), m = C * Ci, C && (P = Math.cos(-C), M = Math.sin(-C), L = B * P + g * M, q = G * P + et * M, Q = zt * P + Xt * M, g = B * -M + g * P, et = G * -M + et * P, Xt = zt * -M + Xt * P, ut = Oe * -M + ut * P, B = L, G = q, zt = Q), C = Hi(-j, Xt), y = C * Ci, C && (P = Math.cos(-C), M = Math.sin(-C), L = D * P - g * M, q = A * P - et * M, Q = j * P - Xt * M, ut = I * M + ut * P, D = L, A = q, j = Q), C = Hi(A, D), d = C * Ci, C && (P = Math.cos(C), M = Math.sin(C), L = D * P + A * M, q = B * P + G * M, A = A * P - D * M, G = G * P - B * M, D = L, B = q), m && Math.abs(m) + Math.abs(d) > 359.9 && (m = d = 0, y = 180 - y), h = pt(Math.sqrt(D * D + A * A + j * j)), p = pt(Math.sqrt(G * G + zt * zt)), C = Hi(B, G), S = Math.abs(C) > 2e-4 ? C * Ci : 0, v = ut ? 1 / (ut < 0 ? -ut : ut) : 0), e.svg && (L = t.getAttribute("transform"), e.forceCSS = t.setAttribute("transform", "") || !ka($e(t, lt)), L && t.setAttribute("transform", L))), Math.abs(S) > 90 && Math.abs(S) < 270 && (n ? (h *= -1, S += d <= 0 ? 180 : -180, d += d <= 0 ? 180 : -180) : (p *= -1, S += S <= 0 ? 180 : -180)), i = i || e.uncache, e.x = f - ((e.xPercent = f && (!i && e.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-f) ? -50 : 0))) ? t.offsetWidth * e.xPercent / 100 : 0) + s, e.y = _ - ((e.yPercent = _ && (!i && e.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-_) ? -50 : 0))) ? t.offsetHeight * e.yPercent / 100 : 0) + s, e.z = c + s, e.scaleX = pt(h), e.scaleY = pt(p), e.rotation = pt(d) + o, e.rotationX = pt(m) + o, e.rotationY = pt(y) + o, e.skewX = S + o, e.skewY = T + o, e.transformPerspective = v + s, (e.zOrigin = parseFloat(u.split(" ")[2]) || 0) && (r[Fe] = On(u)), e.xOffset = e.yOffset = 0, e.force3D = ge.force3D, e.renderTransform = e.svg ? du : wa ? Ca : cu, e.uncache = 0, e;
}, On = function(t) {
  return (t = t.split(" "))[0] + " " + t[1];
}, Hn = function(t, i, e) {
  var r = Bt(i);
  return pt(parseFloat(i) + parseFloat(yi(t, "x", e + "px", r))) + r;
}, cu = function(t, i) {
  i.z = "0px", i.rotationY = i.rotationX = "0deg", i.force3D = 0, Ca(t, i);
}, Pi = "0deg", br = "0px", ki = ") ", Ca = function(t, i) {
  var e = i || this, r = e.xPercent, n = e.yPercent, s = e.x, o = e.y, l = e.z, u = e.rotation, f = e.rotationY, _ = e.rotationX, c = e.skewX, h = e.skewY, p = e.scaleX, d = e.scaleY, m = e.transformPerspective, y = e.force3D, S = e.target, T = e.zOrigin, v = "", w = y === "auto" && t && t !== 1 || y === !0;
  if (T && (_ !== Pi || f !== Pi)) {
    var k = parseFloat(f) * rr, b = Math.sin(k), C = Math.cos(k), P;
    k = parseFloat(_) * rr, P = Math.cos(k), s = Hn(S, s, b * P * -T), o = Hn(S, o, -Math.sin(k) * -T), l = Hn(S, l, C * P * -T + T);
  }
  m !== br && (v += "perspective(" + m + ki), (r || n) && (v += "translate(" + r + "%, " + n + "%) "), (w || s !== br || o !== br || l !== br) && (v += l !== br || w ? "translate3d(" + s + ", " + o + ", " + l + ") " : "translate(" + s + ", " + o + ki), u !== Pi && (v += "rotate(" + u + ki), f !== Pi && (v += "rotateY(" + f + ki), _ !== Pi && (v += "rotateX(" + _ + ki), (c !== Pi || h !== Pi) && (v += "skew(" + c + ", " + h + ki), (p !== 1 || d !== 1) && (v += "scale(" + p + ", " + d + ki), S.style[lt] = v || "translate(0, 0)";
}, du = function(t, i) {
  var e = i || this, r = e.xPercent, n = e.yPercent, s = e.x, o = e.y, l = e.rotation, u = e.skewX, f = e.skewY, _ = e.scaleX, c = e.scaleY, h = e.target, p = e.xOrigin, d = e.yOrigin, m = e.xOffset, y = e.yOffset, S = e.forceCSS, T = parseFloat(s), v = parseFloat(o), w, k, b, C, P;
  l = parseFloat(l), u = parseFloat(u), f = parseFloat(f), f && (f = parseFloat(f), u += f, l += f), l || u ? (l *= rr, u *= rr, w = Math.cos(l) * _, k = Math.sin(l) * _, b = Math.sin(l - u) * -c, C = Math.cos(l - u) * c, u && (f *= rr, P = Math.tan(u - f), P = Math.sqrt(1 + P * P), b *= P, C *= P, f && (P = Math.tan(f), P = Math.sqrt(1 + P * P), w *= P, k *= P)), w = pt(w), k = pt(k), b = pt(b), C = pt(C)) : (w = _, C = c, k = b = 0), (T && !~(s + "").indexOf("px") || v && !~(o + "").indexOf("px")) && (T = yi(h, "x", s, "px"), v = yi(h, "y", o, "px")), (p || d || m || y) && (T = pt(T + p - (p * w + d * b) + m), v = pt(v + d - (p * k + d * C) + y)), (r || n) && (P = h.getBBox(), T = pt(T + r / 100 * P.width), v = pt(v + n / 100 * P.height)), P = "matrix(" + w + "," + k + "," + b + "," + C + "," + T + "," + v + ")", h.setAttribute("transform", P), S && (h.style[lt] = P);
}, _u = function(t, i, e, r, n) {
  var s = 360, o = Mt(n), l = parseFloat(n) * (o && ~n.indexOf("rad") ? Ci : 1), u = l - r, f = r + u + "deg", _, c;
  return o && (_ = n.split("_")[1], _ === "short" && (u %= s, u !== u % (s / 2) && (u += u < 0 ? s : -s)), _ === "cw" && u < 0 ? u = (u + s * so) % s - ~~(u / s) * s : _ === "ccw" && u > 0 && (u = (u - s * so) % s - ~~(u / s) * s)), t._pt = c = new ne(t._pt, i, e, r, u, Zl), c.e = f, c.u = "deg", t._props.push(e), c;
}, ho = function(t, i) {
  for (var e in i)
    t[e] = i[e];
  return t;
}, pu = function(t, i, e) {
  var r = ho({}, e._gsap), n = "perspective,force3D,transformOrigin,svgOrigin", s = e.style, o, l, u, f, _, c, h, p;
  r.svg ? (u = e.getAttribute("transform"), e.setAttribute("transform", ""), s[lt] = i, o = Hr(e, 1), $r(e, lt), e.setAttribute("transform", u)) : (u = getComputedStyle(e)[lt], s[lt] = i, o = Hr(e, 1), s[lt] = u);
  for (l in ii)
    u = r[l], f = o[l], u !== f && n.indexOf(l) < 0 && (h = Bt(u), p = Bt(f), _ = h !== p ? yi(e, l, u, p) : parseFloat(u), c = parseFloat(f), t._pt = new ne(t._pt, o, l, _, c - _, cs), t._pt.u = p || 0, t._props.push(l));
  ho(o, r);
};
re("padding,margin,Width,Radius", function(a, t) {
  var i = "Top", e = "Right", r = "Bottom", n = "Left", s = (t < 3 ? [i, e, r, n] : [i + n, i + e, r + e, r + n]).map(function(o) {
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
  init: function(t, i, e, r, n) {
    var s = this._props, o = t.style, l = e.vars.startAt, u, f, _, c, h, p, d, m, y, S, T, v, w, k, b, C;
    Ns || _s(), this.styles = this.styles || ba(t), C = this.styles.props, this.tween = e;
    for (d in i)
      if (d !== "autoRound" && (f = i[d], !(ce[d] && fa(d, i, e, r, t, n)))) {
        if (h = typeof f, p = Cn[d], h === "function" && (f = f.call(e, r, t, n), h = typeof f), h === "string" && ~f.indexOf("random(") && (f = Wr(f)), p)
          p(this, t, d, f, e) && (b = 1);
        else if (d.substr(0, 2) === "--")
          u = (getComputedStyle(t).getPropertyValue(d) + "").trim(), f += "", pi.lastIndex = 0, pi.test(u) || (m = Bt(u), y = Bt(f)), y ? m !== y && (u = yi(t, d, u, y) + y) : m && (f += m), this.add(o, "setProperty", u, f, r, n, 0, 0, d), s.push(d), C.push(d, 0, o[d]);
        else if (h !== "undefined") {
          if (l && d in l ? (u = typeof l[d] == "function" ? l[d].call(e, r, t, n) : l[d], Mt(u) && ~u.indexOf("random(") && (u = Wr(u)), Bt(u + "") || (u += ge.units[d] || Bt(Ze(t, d)) || ""), (u + "").charAt(1) === "=" && (u = Ze(t, d))) : u = Ze(t, d), c = parseFloat(u), S = h === "string" && f.charAt(1) === "=" && f.substr(0, 2), S && (f = f.substr(2)), _ = parseFloat(f), d in Ve && (d === "autoAlpha" && (c === 1 && Ze(t, "visibility") === "hidden" && _ && (c = 0), C.push("visibility", 0, o.visibility), fi(this, o, "visibility", c ? "inherit" : "hidden", _ ? "inherit" : "hidden", !_)), d !== "scale" && d !== "transform" && (d = Ve[d], ~d.indexOf(",") && (d = d.split(",")[0]))), T = d in ii, T) {
            if (this.styles.save(d), v || (w = t._gsap, w.renderTransform && !i.parseTransform || Hr(t, i.parseTransform), k = i.smoothOrigin !== !1 && w.smooth, v = this._pt = new ne(this._pt, o, lt, 0, 1, w.renderTransform, w, 0, -1), v.dep = 1), d === "scale")
              this._pt = new ne(this._pt, w, "scaleY", w.scaleY, (S ? er(w.scaleY, S + _) : _) - w.scaleY || 0, cs), this._pt.u = 0, s.push("scaleY", d), d += "X";
            else if (d === "transformOrigin") {
              C.push(Fe, 0, o[Fe]), f = fu(f), w.svg ? ps(t, f, 0, k, 0, this) : (y = parseFloat(f.split(" ")[2]) || 0, y !== w.zOrigin && fi(this, w, "zOrigin", w.zOrigin, y), fi(this, o, d, On(u), On(f)));
              continue;
            } else if (d === "svgOrigin") {
              ps(t, f, 1, k, 0, this);
              continue;
            } else if (d in Pa) {
              _u(this, w, d, c, S ? er(c, S + f) : f);
              continue;
            } else if (d === "smoothOrigin") {
              fi(this, w, "smooth", w.smooth, f);
              continue;
            } else if (d === "force3D") {
              w[d] = f;
              continue;
            } else if (d === "transform") {
              pu(this, f, t);
              continue;
            }
          } else
            d in o || (d = cr(d) || d);
          if (T || (_ || _ === 0) && (c || c === 0) && !jl.test(f) && d in o)
            m = (u + "").substr((c + "").length), _ || (_ = 0), y = Bt(f) || (d in ge.units ? ge.units[d] : m), m !== y && (c = yi(t, d, u, y)), this._pt = new ne(this._pt, T ? w : o, d, c, (S ? er(c, S + _) : _) - c, !T && (y === "px" || d === "zIndex") && i.autoRound !== !1 ? Jl : cs), this._pt.u = y || 0, m !== y && y !== "%" && (this._pt.b = u, this._pt.r = Ql);
          else if (d in o)
            uu.call(this, t, d, u, S ? S + f : f);
          else if (d in t)
            this.add(t, d, u || t[d], S ? S + f : f, r, n);
          else if (d !== "parseTransform") {
            As(d, f);
            continue;
          }
          T || (d in o ? C.push(d, 0, o[d]) : C.push(d, 1, u || t[d])), s.push(d);
        }
      }
    b && ga(this);
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
    _removeProperty: $r,
    _getMatrix: Ws
  }
};
se.utils.checkPrefix = cr;
se.core.getStyleSaver = ba;
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
var cn = se.registerPlugin(Oa) || se;
cn.core.Tween;
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
var Rt, gs, pe, hi, ci, nr, Ma, Oi, Rr, Aa, Je, De, Ea, Da = function() {
  return Rt || typeof window < "u" && (Rt = window.gsap) && Rt.registerPlugin && Rt;
}, Ra = 1, Ji = [], $ = [], Ue = [], zr = Date.now, ms = function(t, i) {
  return i;
}, mu = function() {
  var t = Rr.core, i = t.bridge || {}, e = t._scrollers, r = t._proxies;
  e.push.apply(e, $), r.push.apply(r, Ue), $ = e, Ue = r, ms = function(s, o) {
    return i[s](o);
  };
}, gi = function(t, i) {
  return ~Ue.indexOf(t) && Ue[Ue.indexOf(t) + 1][i];
}, Lr = function(t) {
  return !!~Aa.indexOf(t);
}, Jt = function(t, i, e, r, n) {
  return t.addEventListener(i, e, {
    passive: !r,
    capture: !!n
  });
}, qt = function(t, i, e, r) {
  return t.removeEventListener(i, e, !!r);
}, Zr = "scrollLeft", Qr = "scrollTop", ys = function() {
  return Je && Je.isPressed || $.cache++;
}, Mn = function(t, i) {
  var e = function r(n) {
    if (n || n === 0) {
      Ra && (pe.history.scrollRestoration = "manual");
      var s = Je && Je.isPressed;
      n = r.v = Math.round(n) || (Je && Je.iOS ? 1 : 0), t(n), r.cacheID = $.cache, s && ms("ss", n);
    } else
      (i || $.cache !== r.cacheID || ms("ref")) && (r.cacheID = $.cache, r.v = t());
    return r.v + r.offset;
  };
  return e.offset = 0, t && e;
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
    return arguments.length ? pe.scrollTo(a, bt.sc()) : pe.pageXOffset || hi[Zr] || ci[Zr] || nr[Zr] || 0;
  })
}, bt = {
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
}, vi = function(t, i) {
  var e = i.s, r = i.sc;
  Lr(t) && (t = hi.scrollingElement || ci);
  var n = $.indexOf(t), s = r === bt.sc ? 1 : 2;
  !~n && (n = $.push(t) - 1), $[n + s] || t.addEventListener("scroll", ys);
  var o = $[n + s], l = o || ($[n + s] = Mn(gi(t, e), !0) || (Lr(t) ? r : Mn(function(u) {
    return arguments.length ? t[e] = u : t[e];
  })));
  return l.target = t, o || (l.smooth = Rt.getProperty(t, "scrollBehavior") === "smooth"), l;
}, vs = function(t, i, e) {
  var r = t, n = t, s = zr(), o = s, l = i || 50, u = Math.max(500, l * 3), f = function(p, d) {
    var m = zr();
    d || m - s > l ? (n = r, r = p, o = s, s = m) : e ? r += p : r = n + (p - n) / (m - o) * (s - o);
  }, _ = function() {
    n = r = e ? 0 : r, o = s = 0;
  }, c = function(p) {
    var d = o, m = n, y = zr();
    return (p || p === 0) && p !== r && f(p), s === o || y - o > u ? 0 : (r + (e ? m : -m)) / ((e ? y : s) - d) * 1e3;
  };
  return {
    update: f,
    reset: _,
    getVelocity: c
  };
}, wr = function(t, i) {
  return i && !t._gsapAllow && t.preventDefault(), t.changedTouches ? t.changedTouches[0] : t;
}, _o = function(t) {
  var i = Math.max.apply(Math, t), e = Math.min.apply(Math, t);
  return Math.abs(i) >= Math.abs(e) ? i : e;
}, za = function() {
  Rr = Rt.core.globals().ScrollTrigger, Rr && Rr.core && mu();
}, La = function(t) {
  return Rt = t || Da(), Rt && typeof document < "u" && document.body && (pe = window, hi = document, ci = hi.documentElement, nr = hi.body, Aa = [pe, hi, ci, nr], Rt.utils.clamp, Ea = Rt.core.context || function() {
  }, Oi = "onpointerenter" in nr ? "pointer" : "mouse", Ma = vt.isTouch = pe.matchMedia && pe.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in pe || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, De = vt.eventTypes = ("ontouchstart" in ci ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in ci ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return Ra = 0;
  }, 500), za(), gs = 1), gs;
};
Zt.op = bt;
$.cache = 0;
var vt = /* @__PURE__ */ function() {
  function a(i) {
    this.init(i);
  }
  var t = a.prototype;
  return t.init = function(e) {
    gs || La(Rt) || console.warn("Please gsap.registerPlugin(Observer)"), Rr || za();
    var r = e.tolerance, n = e.dragMinimum, s = e.type, o = e.target, l = e.lineHeight, u = e.debounce, f = e.preventDefault, _ = e.onStop, c = e.onStopDelay, h = e.ignore, p = e.wheelSpeed, d = e.event, m = e.onDragStart, y = e.onDragEnd, S = e.onDrag, T = e.onPress, v = e.onRelease, w = e.onRight, k = e.onLeft, b = e.onUp, C = e.onDown, P = e.onChangeX, M = e.onChangeY, D = e.onChange, A = e.onToggleX, j = e.onToggleY, I = e.onHover, B = e.onHoverEnd, G = e.onMove, L = e.ignoreCheck, q = e.isNormalizer, Q = e.onGestureStart, g = e.onGestureEnd, et = e.onWheel, Xt = e.onEnable, Oe = e.onDisable, ut = e.onClick, zt = e.scrollSpeed, it = e.capture, Lt = e.allowClicks, Wt = e.lockAxis, _r = e.onLockAxis;
    this.target = o = te(o) || ci, this.vars = e, h && (h = Rt.utils.toArray(h)), r = r || 1e-9, n = n || 0, p = p || 1, zt = zt || 1, s = s || "wheel,touch,pointer", u = u !== !1, l || (l = parseFloat(pe.getComputedStyle(nr).lineHeight) || 22);
    var oe, ye, U, wt, ae, Ie, Vt, x = this, Ge = 0, rt = 0, ri = vi(o, Zt), ni = vi(o, bt), Wi = ri(), $t = ni(), pr = ~s.indexOf("touch") && !~s.indexOf("pointer") && De[0] === "pointerdown", si = Lr(o), ct = o.ownerDocument || hi, le = [0, 0, 0], Ut = [0, 0, 0], gr = 0, Ht = function() {
      return gr = zr();
    }, Be = function(z, O) {
      return (x.event = z) && h && ~h.indexOf(z.target) || O && pr && z.pointerType !== "touch" || L && L(z, O);
    }, mr = function() {
      x._vx.reset(), x._vy.reset(), ye.pause(), _ && _(x);
    }, oi = function() {
      var z = x.deltaX = _o(le), O = x.deltaY = _o(Ut), R = Math.abs(z) >= r, F = Math.abs(O) >= r;
      D && (R || F) && D(x, z, O, le, Ut), R && (w && x.deltaX > 0 && w(x), k && x.deltaX < 0 && k(x), P && P(x), A && x.deltaX < 0 != Ge < 0 && A(x), Ge = x.deltaX, le[0] = le[1] = le[2] = 0), F && (C && x.deltaY > 0 && C(x), b && x.deltaY < 0 && b(x), M && M(x), j && x.deltaY < 0 != rt < 0 && j(x), rt = x.deltaY, Ut[0] = Ut[1] = Ut[2] = 0), (wt || U) && (G && G(x), U && (S(x), U = !1), wt = !1), Ie && !(Ie = !1) && _r && _r(x), ae && (et(x), ae = !1), oe = 0;
    }, Vi = function(z, O, R) {
      le[R] += z, Ut[R] += O, x._vx.update(z), x._vy.update(O), u ? oe || (oe = requestAnimationFrame(oi)) : oi();
    }, bi = function(z, O) {
      Wt && !Vt && (x.axis = Vt = Math.abs(z) > Math.abs(O) ? "x" : "y", Ie = !0), Vt !== "y" && (le[2] += z, x._vx.update(z, !0)), Vt !== "x" && (Ut[2] += O, x._vy.update(O, !0)), u ? oe || (oe = requestAnimationFrame(oi)) : oi();
    }, wi = function(z) {
      if (!Be(z, 1)) {
        z = wr(z, f);
        var O = z.clientX, R = z.clientY, F = O - x.x, X = R - x.y, Tt = x.isDragging;
        x.x = O, x.y = R, (Tt || Math.abs(x.startX - O) >= n || Math.abs(x.startY - R) >= n) && (S && (U = !0), Tt || (x.isDragging = !0), bi(F, X), Tt || m && m(x));
      }
    }, V = x.onPress = function(N) {
      Be(N, 1) || N && N.button || (x.axis = Vt = null, ye.pause(), x.isPressed = !0, N = wr(N), Ge = rt = 0, x.startX = x.x = N.clientX, x.startY = x.y = N.clientY, x._vx.reset(), x._vy.reset(), Jt(q ? o : ct, De[1], wi, f, !0), x.deltaX = x.deltaY = 0, T && T(x));
    }, qe = x.onRelease = function(N) {
      if (!Be(N, 1)) {
        qt(q ? o : ct, De[1], wi, !0);
        var z = !isNaN(x.y - x.startY), O = x.isDragging && (Math.abs(x.x - x.startX) > 3 || Math.abs(x.y - x.startY) > 3), R = wr(N);
        !O && z && (x._vx.reset(), x._vy.reset(), f && Lt && Rt.delayedCall(0.08, function() {
          if (zr() - gr > 300 && !N.defaultPrevented) {
            if (N.target.click)
              N.target.click();
            else if (ct.createEvent) {
              var F = ct.createEvent("MouseEvents");
              F.initMouseEvent("click", !0, !0, pe, 1, R.screenX, R.screenY, R.clientX, R.clientY, !1, !1, !1, !1, 0, null), N.target.dispatchEvent(F);
            }
          }
        })), x.isDragging = x.isGesturing = x.isPressed = !1, _ && !q && ye.restart(!0), y && O && y(x), v && v(x, O);
      }
    }, Me = function(z) {
      return z.touches && z.touches.length > 1 && (x.isGesturing = !0) && Q(z, x.isDragging);
    }, Ae = function() {
      return (x.isGesturing = !1) || g(x);
    }, ve = function(z) {
      if (!Be(z)) {
        var O = ri(), R = ni();
        Vi((O - Wi) * zt, (R - $t) * zt, 1), Wi = O, $t = R, _ && ye.restart(!0);
      }
    }, Ee = function(z) {
      if (!Be(z)) {
        z = wr(z, f), et && (ae = !0);
        var O = (z.deltaMode === 1 ? l : z.deltaMode === 2 ? pe.innerHeight : 1) * p;
        Vi(z.deltaX * O, z.deltaY * O, 0), _ && !q && ye.restart(!0);
      }
    }, Ti = function(z) {
      if (!Be(z)) {
        var O = z.clientX, R = z.clientY, F = O - x.x, X = R - x.y;
        x.x = O, x.y = R, wt = !0, (F || X) && bi(F, X);
      }
    }, $i = function(z) {
      x.event = z, I(x);
    }, Ke = function(z) {
      x.event = z, B(x);
    }, yr = function(z) {
      return Be(z) || wr(z, f) && ut(x);
    };
    ye = x._dc = Rt.delayedCall(c || 0.25, mr).pause(), x.deltaX = x.deltaY = 0, x._vx = vs(0, 50, !0), x._vy = vs(0, 50, !0), x.scrollX = ri, x.scrollY = ni, x.isDragging = x.isGesturing = x.isPressed = !1, Ea(this), x.enable = function(N) {
      return x.isEnabled || (Jt(si ? ct : o, "scroll", ys), s.indexOf("scroll") >= 0 && Jt(si ? ct : o, "scroll", ve, f, it), s.indexOf("wheel") >= 0 && Jt(o, "wheel", Ee, f, it), (s.indexOf("touch") >= 0 && Ma || s.indexOf("pointer") >= 0) && (Jt(o, De[0], V, f, it), Jt(ct, De[2], qe), Jt(ct, De[3], qe), Lt && Jt(o, "click", Ht, !1, !0), ut && Jt(o, "click", yr), Q && Jt(ct, "gesturestart", Me), g && Jt(ct, "gestureend", Ae), I && Jt(o, Oi + "enter", $i), B && Jt(o, Oi + "leave", Ke), G && Jt(o, Oi + "move", Ti)), x.isEnabled = !0, N && N.type && V(N), Xt && Xt(x)), x;
    }, x.disable = function() {
      x.isEnabled && (Ji.filter(function(N) {
        return N !== x && Lr(N.target);
      }).length || qt(si ? ct : o, "scroll", ys), x.isPressed && (x._vx.reset(), x._vy.reset(), qt(q ? o : ct, De[1], wi, !0)), qt(si ? ct : o, "scroll", ve, it), qt(o, "wheel", Ee, it), qt(o, De[0], V, it), qt(ct, De[2], qe), qt(ct, De[3], qe), qt(o, "click", Ht, !0), qt(o, "click", yr), qt(ct, "gesturestart", Me), qt(ct, "gestureend", Ae), qt(o, Oi + "enter", $i), qt(o, Oi + "leave", Ke), qt(o, Oi + "move", Ti), x.isEnabled = x.isPressed = x.isDragging = !1, Oe && Oe(x));
    }, x.kill = x.revert = function() {
      x.disable();
      var N = Ji.indexOf(x);
      N >= 0 && Ji.splice(N, 1), Je === x && (Je = 0);
    }, Ji.push(x), q && Lr(o) && (Je = x), x.enable(d);
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
var E, Ki, H, nt, ze, ft, Fa, An, En, tr, dn, Jr, It, Fn, xs, Kt, po, go, ji, Ia, Gn, Ba, fe, Na, Ya, Xa, ai, bs, Vs, qn, tn = 1, jt = Date.now, Kn = jt(), ke = 0, kr = 0, yu = function a() {
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
  return E || Wa() && (E = window.gsap) && E.registerPlugin && E;
}, Bi = function(t) {
  return !!~Fa.indexOf(t);
}, $a = function(t) {
  return gi(t, "getBoundingClientRect") || (Bi(t) ? function() {
    return vn.width = H.innerWidth, vn.height = H.innerHeight, vn;
  } : function() {
    return Qe(t);
  });
}, vu = function(t, i, e) {
  var r = e.d, n = e.d2, s = e.a;
  return (s = gi(t, "getBoundingClientRect")) ? function() {
    return s()[r];
  } : function() {
    return (i ? H["inner" + n] : t["client" + n]) || 0;
  };
}, xu = function(t, i) {
  return !i || ~Ue.indexOf(t) ? $a(t) : function() {
    return vn;
  };
}, di = function(t, i) {
  var e = i.s, r = i.d2, n = i.d, s = i.a;
  return Math.max(0, (e = "scroll" + r) && (s = gi(t, e)) ? s() - $a(t)()[n] : Bi(t) ? (ze[e] || ft[e]) - (H["inner" + r] || ze["client" + r] || ft["client" + r]) : t[e] - t["offset" + r]);
}, en = function(t, i) {
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
}, Gi = Math.abs, Ua = "left", Ha = "top", $s = "right", Us = "bottom", zi = "width", Li = "height", Fr = "Right", Ir = "Left", Br = "Top", Nr = "Bottom", _t = "padding", we = "margin", dr = "Width", Hs = "Height", Et = "px", Le = function(t) {
  return H.getComputedStyle(t);
}, bu = function(t) {
  var i = Le(t).position;
  t.style.position = i === "absolute" || i === "fixed" ? i : "relative";
}, vo = function(t, i) {
  for (var e in i)
    e in t || (t[e] = i[e]);
  return t;
}, Qe = function(t, i) {
  var e = i && Le(t)[xs] !== "matrix(1, 0, 0, 1, 0, 0)" && E.to(t, {
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
}, ws = function(t, i) {
  var e = i.d2;
  return t["offset" + e] || t["client" + e] || 0;
}, Ga = function(t) {
  var i = [], e = t.labels, r = t.duration(), n;
  for (n in e)
    i.push(e[n] / r);
  return i;
}, wu = function(t) {
  return function(i) {
    return E.utils.snap(Ga(t), i);
  };
}, Gs = function(t) {
  var i = E.utils.snap(t), e = Array.isArray(t) && t.slice(0).sort(function(r, n) {
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
}, rn = function(t, i, e, r) {
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
}, nn = function(t, i, e) {
  e = e && e.wheelHandler, e && (t(i, "wheel", e), t(i, "touchmove", e));
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
}, pn = function(t, i) {
  if (Re(t)) {
    var e = t.indexOf("="), r = ~e ? +(t.charAt(e - 1) + 1) * parseFloat(t.substr(e + 1)) : 0;
    ~e && (t.indexOf("%") > e && (r *= i / 100), t = t.substr(0, e - 1)), t = r + (t in Dn ? Dn[t] * i : ~t.indexOf("%") ? parseFloat(t) * i / 100 : parseFloat(t) || 0);
  }
  return t;
}, on = function(t, i, e, r, n, s, o, l) {
  var u = n.startColor, f = n.endColor, _ = n.fontSize, c = n.indent, h = n.fontWeight, p = nt.createElement("div"), d = Bi(e) || gi(e, "pinType") === "fixed", m = t.indexOf("scroller") !== -1, y = d ? ft : e, S = t.indexOf("start") !== -1, T = S ? u : f, v = "border-color:" + T + ";font-size:" + _ + ";color:" + T + ";font-weight:" + h + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return v += "position:" + ((m || l) && d ? "fixed;" : "absolute;"), (m || l || !d) && (v += (r === bt ? $s : Us) + ":" + (s + parseFloat(c)) + "px;"), o && (v += "box-sizing:border-box;text-align:left;width:" + o.offsetWidth + "px;"), p._isStart = S, p.setAttribute("class", "gsap-marker-" + t + (i ? " marker-" + i : "")), p.style.cssText = v, p.innerText = i || i === 0 ? t + "-" + i : t, y.children[0] ? y.insertBefore(p, y.children[0]) : y.appendChild(p), p._offset = p["offset" + r.op.d2], gn(p, 0, r, S), p;
}, gn = function(t, i, e, r) {
  var n = {
    display: "block"
  }, s = e[r ? "os2" : "p2"], o = e[r ? "p2" : "os2"];
  t._isFlipped = r, n[e.a + "Percent"] = r ? -100 : 0, n[e.a] = r ? "1px" : 0, n["border" + s + dr] = 1, n["border" + o + dr] = 0, n[e.p] = i + "px", E.set(t, n);
}, W = [], Ts = {}, Gr, bo = function() {
  return jt() - ke > 34 && (Gr || (Gr = requestAnimationFrame(ti)));
}, qi = function() {
  (!fe || !fe.isPressed || fe.startX > ft.clientWidth) && ($.cache++, fe ? Gr || (Gr = requestAnimationFrame(ti)) : ti(), ke || Yi("scrollStart"), ke = jt());
}, Zn = function() {
  Xa = H.innerWidth, Ya = H.innerHeight;
}, Mr = function() {
  $.cache++, !It && !Ba && !nt.fullscreenElement && !nt.webkitFullscreenElement && (!Na || Xa !== H.innerWidth || Math.abs(H.innerHeight - Ya) > H.innerHeight * 0.25) && An.restart(!0);
}, Ni = {}, Su = [], qa = function a() {
  return Ct(Y, "scrollEnd", a) || Ai(!0);
}, Yi = function(t) {
  return Ni[t] && Ni[t].map(function(i) {
    return i();
  }) || Su;
}, he = [], Ka = function(t) {
  for (var i = 0; i < he.length; i += 5)
    (!t || he[i + 4] && he[i + 4].query === t) && (he[i].style.cssText = he[i + 1], he[i].getBBox && he[i].setAttribute("transform", he[i + 2] || ""), he[i + 3].uncache = 1);
}, qs = function(t, i) {
  var e;
  for (Kt = 0; Kt < W.length; Kt++)
    e = W[Kt], e && (!i || e._ctx === i) && (t ? e.kill(1) : e.revert(!0, !0));
  i && Ka(i), i || Yi("revert");
}, ja = function(t, i) {
  $.cache++, (i || !de) && $.forEach(function(e) {
    return Qt(e) && e.cacheID++ && (e.rec = 0);
  }), Re(t) && (H.history.scrollRestoration = Vs = t);
}, de, Fi = 0, wo, Pu = function() {
  if (wo !== Fi) {
    var t = wo = Fi;
    requestAnimationFrame(function() {
      return t === Fi && Ai(!0);
    });
  }
}, Ai = function(t, i) {
  if (ke && !t) {
    Ot(Y, "scrollEnd", qa);
    return;
  }
  de = Y.isRefreshing = !0, $.forEach(function(r) {
    return Qt(r) && r.cacheID++ && (r.rec = r());
  });
  var e = Yi("refreshInit");
  Ia && Y.sort(), i || qs(), $.forEach(function(r) {
    Qt(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"), r(0));
  }), W.slice(0).forEach(function(r) {
    return r.refresh();
  }), W.forEach(function(r, n) {
    if (r._subPinOffset && r.pin) {
      var s = r.vars.horizontal ? "offsetWidth" : "offsetHeight", o = r.pin[s];
      r.revert(!0, 1), r.adjustPinSpacing(r.pin[s] - o), r.refresh();
    }
  }), W.forEach(function(r) {
    return r.vars.end === "max" && r.setPositions(r.start, Math.max(r.start + 1, di(r.scroller, r._dir)));
  }), e.forEach(function(r) {
    return r && r.render && r.render(-1);
  }), $.forEach(function(r) {
    Qt(r) && (r.smooth && requestAnimationFrame(function() {
      return r.target.style.scrollBehavior = "smooth";
    }), r.rec && r(r.rec));
  }), ja(Vs, 1), An.pause(), Fi++, de = 2, ti(2), W.forEach(function(r) {
    return Qt(r.vars.onRefresh) && r.vars.onRefresh(r);
  }), de = Y.isRefreshing = !1, Yi("refresh");
}, Ss = 0, mn = 1, Yr, ti = function(t) {
  if (!de || t === 2) {
    Y.isUpdating = !0, Yr && Yr.update(0);
    var i = W.length, e = jt(), r = e - Kn >= 50, n = i && W[0].scroll();
    if (mn = Ss > n ? -1 : 1, de || (Ss = n), r && (ke && !Fn && e - ke > 200 && (ke = 0, Yi("scrollEnd")), dn = Kn, Kn = e), mn < 0) {
      for (Kt = i; Kt-- > 0; )
        W[Kt] && W[Kt].update(0, r);
      mn = 1;
    } else
      for (Kt = 0; Kt < i; Kt++)
        W[Kt] && W[Kt].update(0, r);
    Y.isUpdating = !1;
  }
  Gr = 0;
}, Ps = [Ua, Ha, Us, $s, we + Nr, we + Fr, we + Br, we + Ir, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], yn = Ps.concat([zi, Li, "boxSizing", "max" + dr, "max" + Hs, "position", we, _t, _t + Br, _t + Fr, _t + Nr, _t + Ir]), ku = function(t, i, e) {
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
    s.position = e.position === "absolute" ? "absolute" : "relative", e.display === "inline" && (s.display = "inline-block"), o[Us] = o[$s] = "auto", s.flexBasis = e.flexBasis || "auto", s.overflow = "visible", s.boxSizing = "border-box", s[zi] = ws(t, Zt) + Et, s[Li] = ws(t, bt) + Et, s[_t] = o[we] = o[Ha] = o[Ua] = "0", sr(r), o[zi] = o["max" + dr] = e[zi], o[Li] = o["max" + Hs] = e[Li], o[_t] = e[_t], t.parentNode !== i && (t.parentNode.insertBefore(i, t), i.appendChild(t)), t._gsap.swappedIn = !0;
  }
}, Cu = /([A-Z])/g, sr = function(t) {
  if (t) {
    var i = t.t.style, e = t.length, r = 0, n, s;
    for ((t.t._gsap || E.core.getCache(t.t)).uncache = 1; r < e; r += 2)
      s = t[r + 1], n = t[r], s ? i[n] = s : i[n] && i.removeProperty(n.replace(Cu, "-$1").toLowerCase());
  }
}, an = function(t) {
  for (var i = yn.length, e = t.style, r = [], n = 0; n < i; n++)
    r.push(yn[n], e[yn[n]]);
  return r.t = t, r;
}, Ou = function(t, i, e) {
  for (var r = [], n = t.length, s = e ? 8 : 0, o; s < n; s += 2)
    o = t[s], r.push(o, o in i ? i[o] : t[s + 1]);
  return r.t = t.t, r;
}, vn = {
  left: 0,
  top: 0
}, To = function(t, i, e, r, n, s, o, l, u, f, _, c, h) {
  Qt(t) && (t = t(l)), Re(t) && t.substr(0, 3) === "max" && (t = c + (t.charAt(4) === "=" ? pn("0" + t.substr(3), e) : 0));
  var p = h ? h.time() : 0, d, m, y;
  if (h && h.seek(0), Or(t))
    h && (t = E.utils.mapRange(h.scrollTrigger.start, h.scrollTrigger.end, 0, c, t)), o && gn(o, e, r, !0);
  else {
    Qt(i) && (i = i(l));
    var S = (t || "0").split(" "), T, v, w, k;
    y = te(i) || ft, T = Qe(y) || {}, (!T || !T.left && !T.top) && Le(y).display === "none" && (k = y.style.display, y.style.display = "block", T = Qe(y), k ? y.style.display = k : y.style.removeProperty("display")), v = pn(S[0], T[r.d]), w = pn(S[1] || "0", e), t = T[r.p] - u[r.p] - f + v + n - w, o && gn(o, w, r, e - w < 20 || o._isStart && w > 20), e -= e - w;
  }
  if (s) {
    var b = t + e, C = s._isStart;
    d = "scroll" + r.d2, gn(s, b, r, C && b > 20 || !C && (_ ? Math.max(ft[d], ze[d]) : s.parentNode[d]) <= b + 1), _ && (u = Qe(o), _ && (s.style[r.op.p] = u[r.op.p] - r.op.m - s._offset + Et));
  }
  return h && y && (d = Qe(y), h.seek(c), m = Qe(y), h._caScrollDist = d[r.p] - m[r.p], t = t / h._caScrollDist * c), h && h.seek(p), h ? t : Math.round(t);
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
    E.core.getCache(t).uncache = 1, i.appendChild(t);
  }
}, Za = function(t, i, e) {
  var r = i, n = r;
  return function(s) {
    var o = Math.round(t());
    return o !== r && o !== n && Math.abs(o - r) > 3 && Math.abs(o - n) > 3 && (s = o, e && e()), n = r, r = s, s;
  };
}, Po = function(t, i) {
  var e = vi(t, i), r = "_scroll" + i.p2, n = function s(o, l, u, f, _) {
    var c = s.tween, h = l.onComplete, p = {};
    u = u || e();
    var d = Za(e, u, function() {
      c.kill(), s.tween = 0;
    });
    return _ = f && _ || 0, f = f || o - u, c && c.kill(), l[r] = o, l.modifiers = p, p[r] = function() {
      return d(u + f * c.ratio + _ * c.ratio * c.ratio);
    }, l.onUpdate = function() {
      $.cache++, ti();
    }, l.onComplete = function() {
      s.tween = 0, h && h.call(c);
    }, c = s.tween = E.to(t, l), c;
  };
  return t[r] = e, e.wheelHandler = function() {
    return n.tween && n.tween.kill() && (n.tween = 0);
  }, Ot(t, "wheel", e.wheelHandler), Y.isTouch && Ot(t, "touchmove", e.wheelHandler), n;
}, Y = /* @__PURE__ */ function() {
  function a(i, e) {
    Ki || a.register(E) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), this.init(i, e);
  }
  var t = a.prototype;
  return t.init = function(e, r) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !kr) {
      this.update = this.refresh = this.kill = Xe;
      return;
    }
    e = vo(Re(e) || Or(e) || e.nodeType ? {
      trigger: e
    } : e, sn);
    var n = e, s = n.onUpdate, o = n.toggleClass, l = n.id, u = n.onToggle, f = n.onRefresh, _ = n.scrub, c = n.trigger, h = n.pin, p = n.pinSpacing, d = n.invalidateOnRefresh, m = n.anticipatePin, y = n.onScrubComplete, S = n.onSnapComplete, T = n.once, v = n.snap, w = n.pinReparent, k = n.pinSpacer, b = n.containerAnimation, C = n.fastScrollEnd, P = n.preventOverlaps, M = e.horizontal || e.containerAnimation && e.horizontal !== !1 ? Zt : bt, D = !_ && _ !== 0, A = te(e.scroller || H), j = E.core.getCache(A), I = Bi(A), B = ("pinType" in e ? e.pinType : gi(A, "pinType") || I && "fixed") === "fixed", G = [e.onEnter, e.onLeave, e.onEnterBack, e.onLeaveBack], L = D && e.toggleActions.split(" "), q = "markers" in e ? e.markers : sn.markers, Q = I ? 0 : parseFloat(Le(A)["border" + M.p2 + dr]) || 0, g = this, et = e.onRefreshInit && function() {
      return e.onRefreshInit(g);
    }, Xt = vu(A, I, M), Oe = xu(A, I), ut = 0, zt = 0, it = vi(A, M), Lt, Wt, _r, oe, ye, U, wt, ae, Ie, Vt, x, Ge, rt, ri, ni, Wi, $t, pr, si, ct, le, Ut, gr, Ht, Be, mr, oi, Vi, bi, wi, V, qe, Me, Ae, ve, Ee, Ti, $i, Ke;
    if (bs(g), g._dir = M, m *= 45, g.scroller = A, g.scroll = b ? b.time.bind(b) : it, oe = it(), g.vars = e, r = r || e.animation, "refreshPriority" in e && (Ia = 1, e.refreshPriority === -9999 && (Yr = g)), j.tweenScroll = j.tweenScroll || {
      top: Po(A, bt),
      left: Po(A, Zt)
    }, g.tweenTo = Lt = j.tweenScroll[M.p], g.scrubDuration = function(O) {
      qe = Or(O) && O, qe ? V ? V.duration(O) : V = E.to(r, {
        ease: "expo",
        totalProgress: "+=0.001",
        duration: qe,
        paused: !0,
        onComplete: function() {
          return y && y(g);
        }
      }) : (V && V.progress(1).kill(), V = 0);
    }, r && (r.vars.lazy = !1, r._initted || r.vars.immediateRender !== !1 && e.immediateRender !== !1 && r.duration() && r.render(0, !0, !0), g.animation = r.pause(), r.scrollTrigger = g, g.scrubDuration(_), V && V.resetTo && V.resetTo("totalProgress", 0), bi = 0, l || (l = r.vars.id)), W.push(g), v && ((!_n(v) || v.push) && (v = {
      snapTo: v
    }), "scrollBehavior" in ft.style && E.set(I ? [ft, ze] : A, {
      scrollBehavior: "auto"
    }), $.forEach(function(O) {
      return Qt(O) && O.target === (I ? nt.scrollingElement || ze : A) && (O.smooth = !1);
    }), _r = Qt(v.snapTo) ? v.snapTo : v.snapTo === "labels" ? wu(r) : v.snapTo === "labelsDirectional" ? Tu(r) : v.directional !== !1 ? function(O, R) {
      return Gs(v.snapTo)(O, jt() - zt < 500 ? 0 : R.direction);
    } : E.utils.snap(v.snapTo), Me = v.duration || {
      min: 0.1,
      max: 2
    }, Me = _n(Me) ? tr(Me.min, Me.max) : tr(Me, Me), Ae = E.delayedCall(v.delay || qe / 2 || 0.1, function() {
      var O = it(), R = jt() - zt < 500, F = Lt.tween;
      if ((R || Math.abs(g.getVelocity()) < 10) && !F && !Fn && ut !== O) {
        var X = (O - U) / rt, Tt = r && !D ? r.totalProgress() : X, Z = R ? 0 : (Tt - wi) / (jt() - dn) * 1e3 || 0, st = E.utils.clamp(-X, 1 - X, Gi(Z / 2) * Z / 0.185), At = X + (v.inertia === !1 ? 0 : st), St = tr(0, 1, _r(At, g)), gt = Math.round(U + St * rt), ot = v, ue = ot.onStart, Gt = ot.onInterrupt, Pt = ot.onComplete;
        if (O <= wt && O >= U && gt !== O) {
          if (F && !F._initted && F.data <= Gi(gt - O))
            return;
          v.inertia === !1 && (st = St - X), Lt(gt, {
            duration: Me(Gi(Math.max(Gi(At - Tt), Gi(St - Tt)) * 0.185 / Z / 0.05 || 0)),
            ease: v.ease || "power3",
            data: Gi(gt - O),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return Ae.restart(!0) && Gt && Gt(g);
            },
            onComplete: function() {
              g.update(), ut = it(), bi = wi = r && !D ? r.totalProgress() : g.progress, S && S(g), Pt && Pt(g);
            }
          }, O, st * rt, gt - O - st * rt), ue && ue(g, Lt.tween);
        }
      } else
        g.isActive && ut !== O && Ae.restart(!0);
    }).pause()), l && (Ts[l] = g), c = g.trigger = te(c || h), Ke = c && c._gsap && c._gsap.stRevert, Ke && (Ke = Ke(g)), h = h === !0 ? c : te(h), Re(o) && (o = {
      targets: c,
      className: o
    }), h && (p === !1 || p === we || (p = !p && h.parentNode && h.parentNode.style && Le(h.parentNode).display === "flex" ? !1 : _t), g.pin = h, Wt = E.core.getCache(h), Wt.spacer ? ri = Wt.pinState : (k && (k = te(k), k && !k.nodeType && (k = k.current || k.nativeElement), Wt.spacerIsNative = !!k, k && (Wt.spacerState = an(k))), Wt.spacer = $t = k || nt.createElement("div"), $t.classList.add("pin-spacer"), l && $t.classList.add("pin-spacer-" + l), Wt.pinState = ri = an(h)), e.force3D !== !1 && E.set(h, {
      force3D: !0
    }), g.spacer = $t = Wt.spacer, Vi = Le(h), gr = Vi[p + M.os2], si = E.getProperty(h), ct = E.quickSetter(h, M.a, Et), Qn(h, $t, Vi), Wi = an(h)), q) {
      Ge = _n(q) ? vo(q, xo) : xo, Vt = on("scroller-start", l, A, M, Ge, 0), x = on("scroller-end", l, A, M, Ge, 0, Vt), pr = Vt["offset" + M.op.d2];
      var yr = te(gi(A, "content") || A);
      ae = this.markerStart = on("start", l, yr, M, Ge, pr, 0, b), Ie = this.markerEnd = on("end", l, yr, M, Ge, pr, 0, b), b && ($i = E.quickSetter([ae, Ie], M.a, Et)), !B && !(Ue.length && gi(A, "fixedMarkers") === !0) && (bu(I ? ft : A), E.set([Vt, x], {
        force3D: !0
      }), Be = E.quickSetter(Vt, M.a, Et), oi = E.quickSetter(x, M.a, Et));
    }
    if (b) {
      var N = b.vars.onUpdate, z = b.vars.onUpdateParams;
      b.eventCallback("onUpdate", function() {
        g.update(0, 0, 1), N && N.apply(b, z || []);
      });
    }
    g.previous = function() {
      return W[W.indexOf(g) - 1];
    }, g.next = function() {
      return W[W.indexOf(g) + 1];
    }, g.revert = function(O, R) {
      if (!R)
        return g.kill(!0);
      var F = O !== !1 || !g.enabled, X = It;
      F !== g.isReverted && (F && (Ee = Math.max(it(), g.scroll.rec || 0), ve = g.progress, Ti = r && r.progress()), ae && [ae, Ie, Vt, x].forEach(function(Tt) {
        return Tt.style.display = F ? "none" : "block";
      }), F && (It = g, g.update(F)), h && (!w || !g.isActive) && (F ? ku(h, $t, ri) : Qn(h, $t, Le(h), Ht)), F || g.update(F), It = X, g.isReverted = F);
    }, g.refresh = function(O, R) {
      if (!((It || !g.enabled) && !R)) {
        if (h && O && ke) {
          Ot(a, "scrollEnd", qa);
          return;
        }
        !de && et && et(g), It = g, zt = jt(), Lt.tween && (Lt.tween.kill(), Lt.tween = 0), V && V.pause(), d && r && r.revert({
          kill: !1
        }).invalidate(), g.isReverted || g.revert(!0, !0), g._subPinOffset = !1;
        for (var F = Xt(), X = Oe(), Tt = b ? b.duration() : di(A, M), Z = rt <= 0.01, st = 0, At = 0, St = e.end, gt = e.endTrigger || c, ot = e.start || (e.start === 0 || !c ? 0 : h ? "0 0" : "0 100%"), ue = g.pinnedContainer = e.pinnedContainer && te(e.pinnedContainer), Gt = c && Math.max(0, W.indexOf(g)) || 0, Pt = Gt, dt, Ft, Ui, Si, mt, kt, Ne, In, Ks, vr, Ye; Pt--; )
          kt = W[Pt], kt.end || kt.refresh(0, 1) || (It = g), Ne = kt.pin, Ne && (Ne === c || Ne === h || Ne === ue) && !kt.isReverted && (vr || (vr = []), vr.unshift(kt), kt.revert(!0, !0)), kt !== W[Pt] && (Gt--, Pt--);
        for (Qt(ot) && (ot = ot(g)), U = To(ot, c, F, M, it(), ae, Vt, g, X, Q, B, Tt, b) || (h ? -1e-3 : 0), Qt(St) && (St = St(g)), Re(St) && !St.indexOf("+=") && (~St.indexOf(" ") ? St = (Re(ot) ? ot.split(" ")[0] : "") + St : (st = pn(St.substr(2), F), St = Re(ot) ? ot : (b ? E.utils.mapRange(0, b.duration(), b.scrollTrigger.start, b.scrollTrigger.end, U) : U) + st, gt = c)), wt = Math.max(U, To(St || (gt ? "100% 0" : Tt), gt, F, M, it() + st, Ie, x, g, X, Q, B, Tt, b)) || -1e-3, rt = wt - U || (U -= 0.01) && 1e-3, st = 0, Pt = Gt; Pt--; )
          kt = W[Pt], Ne = kt.pin, Ne && kt.start - kt._pinPush <= U && !b && kt.end > 0 && (dt = kt.end - kt.start, (Ne === c && kt.start - kt._pinPush < U || Ne === ue) && !Or(ot) && (st += dt * (1 - kt.progress)), Ne === h && (At += dt));
        if (U += st, wt += st, Z && (ve = E.utils.clamp(0, 1, E.utils.normalize(U, wt, Ee))), g._pinPush = At, ae && st && (dt = {}, dt[M.a] = "+=" + st, ue && (dt[M.p] = "-=" + it()), E.set([ae, Ie], dt)), h)
          dt = Le(h), Si = M === bt, Ui = it(), le = parseFloat(si(M.a)) + At, !Tt && wt > 1 && (Ye = (I ? nt.scrollingElement || ze : A).style, Ye = {
            style: Ye,
            value: Ye["overflow" + M.a.toUpperCase()]
          }, Ye.style["overflow" + M.a.toUpperCase()] = "scroll"), Qn(h, $t, dt), Wi = an(h), Ft = Qe(h, !0), In = B && vi(A, Si ? Zt : bt)(), p && (Ht = [p + M.os2, rt + At + Et], Ht.t = $t, Pt = p === _t ? ws(h, M) + rt + At : 0, Pt && Ht.push(M.d, Pt + Et), sr(Ht), ue && W.forEach(function(xr) {
            xr.pin === ue && xr.vars.pinSpacing !== !1 && (xr._subPinOffset = !0);
          }), B && it(Ee)), B && (mt = {
            top: Ft.top + (Si ? Ui - U : In) + Et,
            left: Ft.left + (Si ? In : Ui - U) + Et,
            boxSizing: "border-box",
            position: "fixed"
          }, mt[zi] = mt["max" + dr] = Math.ceil(Ft.width) + Et, mt[Li] = mt["max" + Hs] = Math.ceil(Ft.height) + Et, mt[we] = mt[we + Br] = mt[we + Fr] = mt[we + Nr] = mt[we + Ir] = "0", mt[_t] = dt[_t], mt[_t + Br] = dt[_t + Br], mt[_t + Fr] = dt[_t + Fr], mt[_t + Nr] = dt[_t + Nr], mt[_t + Ir] = dt[_t + Ir], ni = Ou(ri, mt, w), de && it(0)), r ? (Ks = r._initted, Gn(1), r.render(r.duration(), !0, !0), Ut = si(M.a) - le + rt + At, mr = Math.abs(rt - Ut) > 1, B && mr && ni.splice(ni.length - 2, 2), r.render(0, !0, !0), Ks || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), Gn(0)) : Ut = rt, Ye && (Ye.value ? Ye.style["overflow" + M.a.toUpperCase()] = Ye.value : Ye.style.removeProperty("overflow-" + M.a));
        else if (c && it() && !b)
          for (Ft = c.parentNode; Ft && Ft !== ft; )
            Ft._pinOffset && (U -= Ft._pinOffset, wt -= Ft._pinOffset), Ft = Ft.parentNode;
        vr && vr.forEach(function(xr) {
          return xr.revert(!1, !0);
        }), g.start = U, g.end = wt, oe = ye = de ? Ee : it(), !b && !de && (oe < Ee && it(Ee), g.scroll.rec = 0), g.revert(!1, !0), Ae && (ut = -1, g.isActive && it(U + rt * ve), Ae.restart(!0)), It = 0, r && D && (r._initted || Ti) && r.progress() !== Ti && r.progress(Ti, !0).render(r.time(), !0, !0), (Z || ve !== g.progress || b) && (r && !D && r.totalProgress(b && U < -1e-3 && !ve ? E.utils.normalize(U, wt, 0) : ve, !0), g.progress = (oe - U) / rt === ve ? 0 : ve), h && p && ($t._pinOffset = Math.round(g.progress * Ut)), V && V.invalidate(), f && !de && f(g);
      }
    }, g.getVelocity = function() {
      return (it() - ye) / (jt() - dn) * 1e3 || 0;
    }, g.endAnimation = function() {
      Tr(g.callbackAnimation), r && (V ? V.progress(1) : r.paused() ? D || Tr(r, g.direction < 0, 1) : Tr(r, r.reversed()));
    }, g.labelToScroll = function(O) {
      return r && r.labels && (U || g.refresh() || U) + r.labels[O] / r.duration() * rt || 0;
    }, g.getTrailing = function(O) {
      var R = W.indexOf(g), F = g.direction > 0 ? W.slice(0, R).reverse() : W.slice(R + 1);
      return (Re(O) ? F.filter(function(X) {
        return X.vars.preventOverlaps === O;
      }) : F).filter(function(X) {
        return g.direction > 0 ? X.end <= U : X.start >= wt;
      });
    }, g.update = function(O, R, F) {
      if (!(b && !F && !O)) {
        var X = de === !0 ? Ee : g.scroll(), Tt = O ? 0 : (X - U) / rt, Z = Tt < 0 ? 0 : Tt > 1 ? 1 : Tt || 0, st = g.progress, At, St, gt, ot, ue, Gt, Pt, dt;
        if (R && (ye = oe, oe = b ? it() : X, v && (wi = bi, bi = r && !D ? r.totalProgress() : Z)), m && !Z && h && !It && !tn && ke && U < X + (X - ye) / (jt() - dn) * m && (Z = 1e-4), Z !== st && g.enabled) {
          if (At = g.isActive = !!Z && Z < 1, St = !!st && st < 1, Gt = At !== St, ue = Gt || !!Z != !!st, g.direction = Z > st ? 1 : -1, g.progress = Z, ue && !It && (gt = Z && !st ? 0 : Z === 1 ? 1 : st === 1 ? 2 : 3, D && (ot = !Gt && L[gt + 1] !== "none" && L[gt + 1] || L[gt], dt = r && (ot === "complete" || ot === "reset" || ot in r))), P && (Gt || dt) && (dt || _ || !r) && (Qt(P) ? P(g) : g.getTrailing(P).forEach(function(mt) {
            return mt.endAnimation();
          })), D || (V && !It && !tn ? (V._dp._time - V._start !== V._time && V.render(V._dp._time - V._start), V.resetTo ? V.resetTo("totalProgress", Z, r._tTime / r._tDur) : (V.vars.totalProgress = Z, V.invalidate().restart())) : r && r.totalProgress(Z, !!It)), h) {
            if (O && p && ($t.style[p + M.os2] = gr), !B)
              ct(Cr(le + Ut * Z));
            else if (ue) {
              if (Pt = !O && Z > st && wt + 1 > X && X + 1 >= di(A, M), w)
                if (!O && (At || Pt)) {
                  var Ft = Qe(h, !0), Ui = X - U;
                  So(h, ft, Ft.top + (M === bt ? Ui : 0) + Et, Ft.left + (M === bt ? 0 : Ui) + Et);
                } else
                  So(h, $t);
              sr(At || Pt ? ni : Wi), mr && Z < 1 && At || ct(le + (Z === 1 && !Pt ? Ut : 0));
            }
          }
          v && !Lt.tween && !It && !tn && Ae.restart(!0), o && (Gt || T && Z && (Z < 1 || !qn)) && En(o.targets).forEach(function(mt) {
            return mt.classList[At || T ? "add" : "remove"](o.className);
          }), s && !D && !O && s(g), ue && !It ? (D && (dt && (ot === "complete" ? r.pause().totalProgress(1) : ot === "reset" ? r.restart(!0).pause() : ot === "restart" ? r.restart(!0) : r[ot]()), s && s(g)), (Gt || !qn) && (u && Gt && jn(g, u), G[gt] && jn(g, G[gt]), T && (Z === 1 ? g.kill(!1, 1) : G[gt] = 0), Gt || (gt = Z === 1 ? 1 : 3, G[gt] && jn(g, G[gt]))), C && !At && Math.abs(g.getVelocity()) > (Or(C) ? C : 2500) && (Tr(g.callbackAnimation), V ? V.progress(1) : Tr(r, ot === "reverse" ? 1 : !Z, 1))) : D && s && !It && s(g);
        }
        if (oi) {
          var Si = b ? X / b.duration() * (b._caScrollDist || 0) : X;
          Be(Si + (Vt._isFlipped ? 1 : 0)), oi(Si);
        }
        $i && $i(-X / b.duration() * (b._caScrollDist || 0));
      }
    }, g.enable = function(O, R) {
      g.enabled || (g.enabled = !0, Ot(A, "resize", Mr), Ot(I ? nt : A, "scroll", qi), et && Ot(a, "refreshInit", et), O !== !1 && (g.progress = ve = 0, oe = ye = ut = it()), R !== !1 && g.refresh());
    }, g.getTween = function(O) {
      return O && Lt ? Lt.tween : V;
    }, g.setPositions = function(O, R) {
      h && (le += O - U, Ut += R - O - rt, p === _t && g.adjustPinSpacing(R - O - rt)), g.start = U = O, g.end = wt = R, rt = R - O, g.update();
    }, g.adjustPinSpacing = function(O) {
      if (Ht && O) {
        var R = Ht.indexOf(M.d) + 1;
        Ht[R] = parseFloat(Ht[R]) + O + Et, Ht[1] = parseFloat(Ht[1]) + O + Et, sr(Ht);
      }
    }, g.disable = function(O, R) {
      if (g.enabled && (O !== !1 && g.revert(!0, !0), g.enabled = g.isActive = !1, R || V && V.pause(), Ee = 0, Wt && (Wt.uncache = 1), et && Ct(a, "refreshInit", et), Ae && (Ae.pause(), Lt.tween && Lt.tween.kill() && (Lt.tween = 0)), !I)) {
        for (var F = W.length; F--; )
          if (W[F].scroller === A && W[F] !== g)
            return;
        Ct(A, "resize", Mr), Ct(A, "scroll", qi);
      }
    }, g.kill = function(O, R) {
      g.disable(O, R), V && !R && V.kill(), l && delete Ts[l];
      var F = W.indexOf(g);
      F >= 0 && W.splice(F, 1), F === Kt && mn > 0 && Kt--, F = 0, W.forEach(function(X) {
        return X.scroller === g.scroller && (F = 1);
      }), F || de || (g.scroll.rec = 0), r && (r.scrollTrigger = null, O && r.revert({
        kill: !1
      }), R || r.kill()), ae && [ae, Ie, Vt, x].forEach(function(X) {
        return X.parentNode && X.parentNode.removeChild(X);
      }), Yr === g && (Yr = 0), h && (Wt && (Wt.uncache = 1), F = 0, W.forEach(function(X) {
        return X.pin === h && F++;
      }), F || (Wt.spacer = 0)), e.onKill && e.onKill(g);
    }, g.enable(!1, !1), Ke && Ke(g), !r || !r.add || rt ? g.refresh() : E.delayedCall(0.01, function() {
      return U || wt || g.refresh();
    }) && (rt = 0.01) && (U = wt = 0), h && Pu();
  }, a.register = function(e) {
    return Ki || (E = e || Va(), Wa() && window.document && a.enable(), Ki = kr), Ki;
  }, a.defaults = function(e) {
    if (e)
      for (var r in e)
        sn[r] = e[r];
    return sn;
  }, a.disable = function(e, r) {
    kr = 0, W.forEach(function(s) {
      return s[r ? "kill" : "disable"](e);
    }), Ct(H, "wheel", qi), Ct(nt, "scroll", qi), clearInterval(Jr), Ct(nt, "touchcancel", Xe), Ct(ft, "touchstart", Xe), rn(Ct, nt, "pointerdown,touchstart,mousedown", mo), rn(Ct, nt, "pointerup,touchend,mouseup", yo), An.kill(), en(Ct);
    for (var n = 0; n < $.length; n += 3)
      nn(Ct, $[n], $[n + 1]), nn(Ct, $[n], $[n + 2]);
  }, a.enable = function() {
    if (H = window, nt = document, ze = nt.documentElement, ft = nt.body, E && (En = E.utils.toArray, tr = E.utils.clamp, bs = E.core.context || Xe, Gn = E.core.suppressOverwrites || Xe, Vs = H.history.scrollRestoration || "auto", Ss = H.pageYOffset, E.core.globals("ScrollTrigger", a), ft)) {
      kr = 1, yu(), vt.register(E), a.isTouch = vt.isTouch, ai = vt.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), Ot(H, "wheel", qi), Fa = [H, nt, ze, ft], E.matchMedia ? (a.matchMedia = function(l) {
        var u = E.matchMedia(), f;
        for (f in l)
          u.add(f, l[f]);
        return u;
      }, E.addEventListener("matchMediaInit", function() {
        return qs();
      }), E.addEventListener("matchMediaRevert", function() {
        return Ka();
      }), E.addEventListener("matchMedia", function() {
        Ai(0, 1), Yi("matchMedia");
      }), E.matchMedia("(orientation: portrait)", function() {
        return Zn(), Zn;
      })) : console.warn("Requires GSAP 3.11.0 or later"), Zn(), Ot(nt, "scroll", qi);
      var e = ft.style, r = e.borderTopStyle, n = E.core.Animation.prototype, s, o;
      for (n.revert || Object.defineProperty(n, "revert", {
        value: function() {
          return this.time(-0.01, !0);
        }
      }), e.borderTopStyle = "solid", s = Qe(ft), bt.m = Math.round(s.top + bt.sc()) || 0, Zt.m = Math.round(s.left + Zt.sc()) || 0, r ? e.borderTopStyle = r : e.removeProperty("border-top-style"), Jr = setInterval(bo, 250), E.delayedCall(0.5, function() {
        return tn = 0;
      }), Ot(nt, "touchcancel", Xe), Ot(ft, "touchstart", Xe), rn(Ot, nt, "pointerdown,touchstart,mousedown", mo), rn(Ot, nt, "pointerup,touchend,mouseup", yo), xs = E.utils.checkPrefix("transform"), yn.push(xs), Ki = jt(), An = E.delayedCall(0.2, Ai).pause(), ji = [nt, "visibilitychange", function() {
        var l = H.innerWidth, u = H.innerHeight;
        nt.hidden ? (po = l, go = u) : (po !== l || go !== u) && Mr();
      }, nt, "DOMContentLoaded", Ai, H, "load", Ai, H, "resize", Mr], en(Ot), W.forEach(function(l) {
        return l.enable(0, 1);
      }), o = 0; o < $.length; o += 3)
        nn(Ct, $[o], $[o + 1]), nn(Ct, $[o], $[o + 2]);
    }
  }, a.config = function(e) {
    "limitCallbacks" in e && (qn = !!e.limitCallbacks);
    var r = e.syncInterval;
    r && clearInterval(Jr) || (Jr = r) && setInterval(bo, r), "ignoreMobileResize" in e && (Na = a.isTouch === 1 && e.ignoreMobileResize), "autoRefreshEvents" in e && (en(Ct) || en(Ot, e.autoRefreshEvents || "none"), Ba = (e.autoRefreshEvents + "").indexOf("resize") === -1);
  }, a.scrollerProxy = function(e, r) {
    var n = te(e), s = $.indexOf(n), o = Bi(n);
    ~s && $.splice(s, o ? 6 : 2), r && (o ? Ue.unshift(H, r, ft, r, ze, r) : Ue.unshift(n, r));
  }, a.clearMatchMedia = function(e) {
    W.forEach(function(r) {
      return r._ctx && r._ctx.query === e && r._ctx.kill(!0, !0);
    });
  }, a.isInViewport = function(e, r, n) {
    var s = (Re(e) ? te(e) : e).getBoundingClientRect(), o = s[n ? zi : Li] * r || 0;
    return n ? s.right - o > 0 && s.left + o < H.innerWidth : s.bottom - o > 0 && s.top + o < H.innerHeight;
  }, a.positionInViewport = function(e, r, n) {
    Re(e) && (e = te(e));
    var s = e.getBoundingClientRect(), o = s[n ? zi : Li], l = r == null ? o / 2 : r in Dn ? Dn[r] * o : ~r.indexOf("%") ? parseFloat(r) * o / 100 : parseFloat(r) || 0;
    return n ? (s.left + l) / H.innerWidth : (s.top + l) / H.innerHeight;
  }, a.killAll = function(e) {
    if (W.slice(0).forEach(function(n) {
      return n.vars.id !== "ScrollSmoother" && n.kill();
    }), e !== !0) {
      var r = Ni.killAll || [];
      Ni = {}, r.forEach(function(n) {
        return n();
      });
    }
  }, a;
}();
Y.version = "3.11.5";
Y.saveStyles = function(a) {
  return a ? En(a).forEach(function(t) {
    if (t && t.style) {
      var i = he.indexOf(t);
      i >= 0 && he.splice(i, 5), he.push(t, t.style.cssText, t.getBBox && t.getAttribute("transform"), E.core.getCache(t), bs());
    }
  }) : he;
};
Y.revert = function(a, t) {
  return qs(!a, t);
};
Y.create = function(a, t) {
  return new Y(a, t);
};
Y.refresh = function(a) {
  return a ? Mr() : (Ki || Y.register()) && Ai(!0);
};
Y.update = function(a) {
  return ++$.cache && ti(a === !0 ? 2 : 0);
};
Y.clearScrollMemory = ja;
Y.maxScroll = function(a, t) {
  return di(a, t ? Zt : bt);
};
Y.getScrollFunc = function(a, t) {
  return vi(te(a), t ? Zt : bt);
};
Y.getById = function(a) {
  return Ts[a];
};
Y.getAll = function() {
  return W.filter(function(a) {
    return a.vars.id !== "ScrollSmoother";
  });
};
Y.isScrolling = function() {
  return !!ke;
};
Y.snapDirectional = Gs;
Y.addEventListener = function(a, t) {
  var i = Ni[a] || (Ni[a] = []);
  ~i.indexOf(t) || i.push(t);
};
Y.removeEventListener = function(a, t) {
  var i = Ni[a], e = i && i.indexOf(t);
  e >= 0 && i.splice(e, 1);
};
Y.batch = function(a, t) {
  var i = [], e = {}, r = t.interval || 0.016, n = t.batchMax || 1e9, s = function(u, f) {
    var _ = [], c = [], h = E.delayedCall(r, function() {
      f(_, c), _ = [], c = [];
    }).pause();
    return function(p) {
      _.length || h.restart(!0), _.push(p.trigger), c.push(p), n <= _.length && h.progress(1);
    };
  }, o;
  for (o in t)
    e[o] = o.substr(0, 2) === "on" && Qt(t[o]) && o !== "onRefreshInit" ? s(o, t[o]) : t[o];
  return Qt(n) && (n = n(), Ot(Y, "refresh", function() {
    return n = t.batchMax();
  })), En(a).forEach(function(l) {
    var u = {};
    for (o in e)
      u[o] = e[o];
    u.trigger = l, i.push(Y.create(u));
  }), i;
};
var ko = function(t, i, e, r) {
  return i > r ? t(r) : i < 0 && t(0), e > r ? (r - i) / (e - i) : e < 0 ? i / (i - e) : 1;
}, Jn = function a(t, i) {
  i === !0 ? t.style.removeProperty("touch-action") : t.style.touchAction = i === !0 ? "auto" : i ? "pan-" + i + (vt.isTouch ? " pinch-zoom" : "") : "none", t === ze && a(ft, i);
}, ln = {
  auto: 1,
  scroll: 1
}, Au = function(t) {
  var i = t.event, e = t.target, r = t.axis, n = (i.changedTouches ? i.changedTouches[0] : i).target, s = n._gsap || E.core.getCache(n), o = jt(), l;
  if (!s._isScrollT || o - s._isScrollT > 2e3) {
    for (; n && n !== ft && (n.scrollHeight <= n.clientHeight && n.scrollWidth <= n.clientWidth || !(ln[(l = Le(n)).overflowY] || ln[l.overflowX])); )
      n = n.parentNode;
    s._isScroll = n && n !== e && !Bi(n) && (ln[(l = Le(n)).overflowY] || ln[l.overflowX]), s._isScrollT = o;
  }
  (s._isScroll || r === "x") && (i.stopPropagation(), i._gsapAllow = !0);
}, Qa = function(t, i, e, r) {
  return vt.create({
    target: t,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: i,
    onWheel: r = r && Au,
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
}, Eu = /(input|label|select|textarea)/i, Co, Oo = function(t) {
  var i = Eu.test(t.target.tagName);
  (i || Co) && (t._gsapAllow = !0, Co = i);
}, Du = function(t) {
  _n(t) || (t = {}), t.preventDefault = t.isNormalizer = t.allowClicks = !0, t.type || (t.type = "wheel,touch"), t.debounce = !!t.debounce, t.id = t.id || "normalizer";
  var i = t, e = i.normalizeScrollX, r = i.momentum, n = i.allowNestedScroll, s = i.onRelease, o, l, u = te(t.target) || ze, f = E.core.globals().ScrollSmoother, _ = f && f.get(), c = ai && (t.content && te(t.content) || _ && t.content !== !1 && !_.smooth() && _.content()), h = vi(u, bt), p = vi(u, Zt), d = 1, m = (vt.isTouch && H.visualViewport ? H.visualViewport.scale * H.visualViewport.width : H.outerWidth) / H.innerWidth, y = 0, S = Qt(r) ? function() {
    return r(o);
  } : function() {
    return r || 2.8;
  }, T, v, w = Qa(u, t.type, !0, n), k = function() {
    return v = !1;
  }, b = Xe, C = Xe, P = function() {
    l = di(u, bt), C = tr(ai ? 1 : 0, l), e && (b = tr(0, di(u, Zt))), T = Fi;
  }, M = function() {
    c._gsap.y = Cr(parseFloat(c._gsap.y) + h.offset) + "px", c.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(c._gsap.y) + ", 0, 1)", h.offset = h.cacheID = 0;
  }, D = function() {
    if (v) {
      requestAnimationFrame(k);
      var q = Cr(o.deltaY / 2), Q = C(h.v - q);
      if (c && Q !== h.v + h.offset) {
        h.offset = Q - h.v;
        var g = Cr((parseFloat(c && c._gsap.y) || 0) - h.offset);
        c.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + g + ", 0, 1)", c._gsap.y = g + "px", h.cacheID = $.cache, ti();
      }
      return !0;
    }
    h.offset && M(), v = !0;
  }, A, j, I, B, G = function() {
    P(), A.isActive() && A.vars.scrollY > l && (h() > l ? A.progress(1) && h(l) : A.resetTo("scrollY", l));
  };
  return c && E.set(c, {
    y: "+=0"
  }), t.ignoreCheck = function(L) {
    return ai && L.type === "touchmove" && D() || d > 1.05 && L.type !== "touchstart" || o.isGesturing || L.touches && L.touches.length > 1;
  }, t.onPress = function() {
    v = !1;
    var L = d;
    d = Cr((H.visualViewport && H.visualViewport.scale || 1) / m), A.pause(), L !== d && Jn(u, d > 1.01 ? !0 : e ? !1 : "x"), j = p(), I = h(), P(), T = Fi;
  }, t.onRelease = t.onGestureStart = function(L, q) {
    if (h.offset && M(), !q)
      B.restart(!0);
    else {
      $.cache++;
      var Q = S(), g, et;
      e && (g = p(), et = g + Q * 0.05 * -L.velocityX / 0.227, Q *= ko(p, g, et, di(u, Zt)), A.vars.scrollX = b(et)), g = h(), et = g + Q * 0.05 * -L.velocityY / 0.227, Q *= ko(h, g, et, di(u, bt)), A.vars.scrollY = C(et), A.invalidate().duration(Q).play(0.01), (ai && A.vars.scrollY >= l || g >= l - 1) && E.to({}, {
        onUpdate: G,
        duration: Q
      });
    }
    s && s(L);
  }, t.onWheel = function() {
    A._ts && A.pause(), jt() - y > 1e3 && (T = 0, y = jt());
  }, t.onChange = function(L, q, Q, g, et) {
    if (Fi !== T && P(), q && e && p(b(g[2] === q ? j + (L.startX - L.x) : p() + q - g[1])), Q) {
      h.offset && M();
      var Xt = et[2] === Q, Oe = Xt ? I + L.startY - L.y : h() + Q - et[1], ut = C(Oe);
      Xt && Oe !== ut && (I += ut - Oe), h(ut);
    }
    (Q || q) && ti();
  }, t.onEnable = function() {
    Jn(u, e ? !1 : "x"), Y.addEventListener("refresh", G), Ot(H, "resize", G), h.smooth && (h.target.style.scrollBehavior = "auto", h.smooth = p.smooth = !1), w.enable();
  }, t.onDisable = function() {
    Jn(u, !0), Ct(H, "resize", G), Y.removeEventListener("refresh", G), w.kill();
  }, t.lockAxis = t.lockAxis !== !1, o = new vt(t), o.iOS = ai, ai && !h() && h(1), ai && E.ticker.add(Xe), B = o._dc, A = E.to(o, {
    ease: "power4",
    paused: !0,
    scrollX: e ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: Za(h, h(), function() {
        return A.pause();
      })
    },
    onUpdate: ti,
    onComplete: B.vars.onComplete
  }), o;
};
Y.sort = function(a) {
  return W.sort(a || function(t, i) {
    return (t.vars.refreshPriority || 0) * -1e6 + t.start - (i.start + (i.vars.refreshPriority || 0) * -1e6);
  });
};
Y.observe = function(a) {
  return new vt(a);
};
Y.normalizeScroll = function(a) {
  if (typeof a > "u")
    return fe;
  if (a === !0 && fe)
    return fe.enable();
  if (a === !1)
    return fe && fe.kill();
  var t = a instanceof vt ? a : Du(a);
  return fe && fe.target === t.target && fe.kill(), Bi(t.target) && (fe = t), t;
};
Y.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: vs,
  _inputObserver: Qa,
  _scrollers: $,
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
Va() && E.registerPlugin(Y);
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
  constructor(t = {}, i) {
    Object.assign(this, qr, t), this.Lenis = i, this.init();
  }
  init() {
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
      wrapper: this.scrollWrapper
      // scrollCallback: onScroll // remove from readme / doc
    }), window.scrollDirection = "down", lenis.on("scroll", ({ direction: i, progress: e }) => {
      i === 1 ? window.scrollDirection = "down" : window.scrollDirection = "up";
    });
    function t(i) {
      lenis.raf(i), requestAnimationFrame(t);
    }
    requestAnimationFrame(t);
  }
}
class zu {
  constructor(t = {}, i, e) {
    this.options = t, Object.assign(this, qr, t), this.gsap = i, this.ScrollTrigger = e, this.prefix = t.prefix ? t.prefix : qr.prefix, this.init();
  }
  setAnimateAttributes(t, i = null, e) {
    let r = t;
    i && (r = i), r.hasAttribute("data-animate-easing") && t.style.setProperty(`--${this.prefix}-animate-easing`, r.getAttribute("data-animate-easing")), r.hasAttribute("data-animate-duration") && t.style.setProperty(`--${this.prefix}-animate-duration`, r.getAttribute("data-animate-duration") + "s"), r.hasAttribute("data-animate-delay") && t.style.setProperty(`--${this.prefix}-animate-delay`, r.getAttribute("data-animate-delay") + "s"), r.hasAttribute("data-animate-delay-mobile") && t.style.setProperty(`--${this.prefix}-animate-delay-mobile`, r.getAttribute("data-animate-delay-mobile")), r.hasAttribute("data-animate-opacity-duration") && t.style.setProperty(`--${this.prefix}-animate-opacity-duration`, r.getAttribute("data-animate-opacity-duration") + "s"), r.hasAttribute("data-animate-opacity-start") && t.style.setProperty(`--${this.prefix}-animate-opacity-start`, r.getAttribute("data-animate-opacity-start")), r.hasAttribute("data-animate-opacity-end") && t.style.setProperty(`--${this.prefix}-animate-opacity-end`, r.getAttribute("data-animate-opacity-end")), r.hasAttribute("data-animate-border-radius") && t.style.setProperty(`--${this.prefix}-animate-border-radius`, r.getAttribute("data-animate-border-radius")), r.hasAttribute("data-animate-background") && t.style.setProperty(`--${this.prefix}-animate-background-color`, r.getAttribute("data-animate-background")), r.hasAttribute("data-animate-foreground") && t.style.setProperty(`--${this.prefix}-animate-foreground-color`, r.getAttribute("data-animate-foreground")), r.hasAttribute("data-animate-reveal-delay") && t.style.setProperty(`--${this.prefix}-animate-reveal-delay-extra`, r.getAttribute("data-animate-reveal-delay") + "s"), r.hasAttribute("data-animate-reveal-duration") && t.style.setProperty(`--${this.prefix}-animate-reveal-duration`, r.getAttribute("data-animate-reveal-duration") + "s"), r.hasAttribute("data-animate-slide-duration") && t.style.setProperty(`--${this.prefix}-animate-slide-duration`, r.getAttribute("data-animate-slide-duration") + "s"), r.hasAttribute("data-animate-slide-offset") && t.style.setProperty(`--${this.prefix}-animate-slide-offset`, r.getAttribute("data-animate-slide-offset")), r.hasAttribute("data-animate-zoom-start") && t.style.setProperty(`--${this.prefix}-animate-zoom-start`, r.getAttribute("data-animate-zoom-start")), r.hasAttribute("data-animate-zoom-end") && t.style.setProperty(`--${this.prefix}-animate-zoom-end`, r.getAttribute("data-animate-zoom-end")), e && typeof e == "function" && e();
  }
  init() {
    const t = document.querySelectorAll("[data-animate]");
    t && this.gsap.utils.toArray(t).forEach((e) => {
      const n = e.getAttribute("data-animate-repeat") === "true";
      this.setAnimateAttributes(e), this.ScrollTrigger.create({
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
          n == !0 && e.classList.add(this.outViewClass);
        },
        onLeaveBack: () => {
          n && e.classList.remove(this.inViewClass);
        },
        once: !n
      });
    });
    const i = document.querySelectorAll("[data-animate-batch]");
    i && i.forEach((e) => {
      const r = e.querySelectorAll(e.dataset.animateBatch), n = e.dataset.animateEffect, s = this.inViewClass, o = this.outViewClass;
      let l = 0, u = !1;
      r && (r.forEach((f, _) => {
        f.setAttribute("data-animate", n), u = e.getAttribute("data-animate-repeat") === "true", l = e.getAttribute("data-animate-delay"), this.setAnimateAttributes(f, e, () => {
          _ === r.length - 1 && e.classList.add("is-ready");
        });
      }), this.ScrollTrigger.batch(r, {
        onEnter: (f) => {
          this.gsap.to(f, {
            stagger: {
              each: l,
              onComplete() {
                this.targets()[0].classList.add(s);
              }
            }
          });
        },
        onEnterBack: (f) => {
          this.gsap.to(f, {
            stagger: {
              each: l,
              onComplete() {
                this.targets()[0].classList.add(s), this.targets()[0].classList.remove(o);
              }
            }
          });
        },
        onLeave: (f) => {
          u == !0 && this.gsap.to(f, {
            stagger: {
              each: l,
              onComplete() {
                this.targets()[0].classList.add(o);
              }
            }
          });
        },
        onLeaveBack: (f) => {
          u && this.gsap.to(f, {
            stagger: {
              each: l,
              onComplete() {
                this.targets()[0].classList.remove(s);
              }
            }
          });
        }
      }));
    });
  }
}
class Lu {
  constructor(t = {}, i, e) {
    Object.assign(this, qr, t), this.gsap = i, this.ScrollTrigger = e, this.init();
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
    cn.registerPlugin(Y), this.options = t, Object.assign(this, qr, t), this.init();
  }
  init() {
    this.smoothScroll && new Ru(this.options, il), this.initAnimations();
  }
  initAnimations() {
    new zu(this.options, cn, Y), new Lu(this.options, cn, Y);
  }
  destroy(t = !0, i = !0) {
    t && Y.killAll(), i && window.lenis.destroy();
  }
  refresh() {
    Y.refresh();
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
