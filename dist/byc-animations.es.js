var tl = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function el(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var Co = { exports: {} };
function Ss() {
}
Ss.prototype = {
  on: function(a, t, r) {
    var e = this.e || (this.e = {});
    return (e[a] || (e[a] = [])).push({
      fn: t,
      ctx: r
    }), this;
  },
  once: function(a, t, r) {
    var e = this;
    function i() {
      e.off(a, i), t.apply(r, arguments);
    }
    return i._ = t, this.on(a, i, r);
  },
  emit: function(a) {
    var t = [].slice.call(arguments, 1), r = ((this.e || (this.e = {}))[a] || []).slice(), e = 0, i = r.length;
    for (e; e < i; e++)
      r[e].fn.apply(r[e].ctx, t);
    return this;
  },
  off: function(a, t) {
    var r = this.e || (this.e = {}), e = r[a], i = [];
    if (e && t)
      for (var n = 0, s = e.length; n < s; n++)
        e[n].fn !== t && e[n].fn._ !== t && i.push(e[n]);
    return i.length ? r[a] = i : delete r[a], this;
  }
};
Co.exports = Ss;
var rl = Co.exports.TinyEmitter = Ss, Do = { exports: {} };
(function(a, t) {
  (function(r, e) {
    a.exports = e();
  })(tl, function() {
    var r = 0;
    function e(c) {
      return "__private_" + r++ + "_" + c;
    }
    function i(c, g) {
      if (!Object.prototype.hasOwnProperty.call(c, g))
        throw new TypeError("attempted to use private field on non-instance");
      return c;
    }
    function n() {
    }
    n.prototype = { on: function(c, g, v) {
      var m = this.e || (this.e = {});
      return (m[c] || (m[c] = [])).push({ fn: g, ctx: v }), this;
    }, once: function(c, g, v) {
      var m = this;
      function y() {
        m.off(c, y), g.apply(v, arguments);
      }
      return y._ = g, this.on(c, y, v);
    }, emit: function(c) {
      for (var g = [].slice.call(arguments, 1), v = ((this.e || (this.e = {}))[c] || []).slice(), m = 0, y = v.length; m < y; m++)
        v[m].fn.apply(v[m].ctx, g);
      return this;
    }, off: function(c, g) {
      var v = this.e || (this.e = {}), m = v[c], y = [];
      if (m && g)
        for (var x = 0, b = m.length; x < b; x++)
          m[x].fn !== g && m[x].fn._ !== g && y.push(m[x]);
      return y.length ? v[c] = y : delete v[c], this;
    } };
    var s = n;
    s.TinyEmitter = n;
    var o, l = "virtualscroll", u = e("options"), f = e("el"), _ = e("emitter"), d = e("event"), h = e("touchStart"), p = e("bodyTouchAction");
    return function() {
      function c(v) {
        var m = this;
        Object.defineProperty(this, u, { writable: !0, value: void 0 }), Object.defineProperty(this, f, { writable: !0, value: void 0 }), Object.defineProperty(this, _, { writable: !0, value: void 0 }), Object.defineProperty(this, d, { writable: !0, value: void 0 }), Object.defineProperty(this, h, { writable: !0, value: void 0 }), Object.defineProperty(this, p, { writable: !0, value: void 0 }), this._onWheel = function(y) {
          var x = i(m, u)[u], b = i(m, d)[d];
          b.deltaX = y.wheelDeltaX || -1 * y.deltaX, b.deltaY = y.wheelDeltaY || -1 * y.deltaY, o.isFirefox && y.deltaMode === 1 && (b.deltaX *= x.firefoxMultiplier, b.deltaY *= x.firefoxMultiplier), b.deltaX *= x.mouseMultiplier, b.deltaY *= x.mouseMultiplier, m._notify(y);
        }, this._onMouseWheel = function(y) {
          var x = i(m, d)[d];
          x.deltaX = y.wheelDeltaX ? y.wheelDeltaX : 0, x.deltaY = y.wheelDeltaY ? y.wheelDeltaY : y.wheelDelta, m._notify(y);
        }, this._onTouchStart = function(y) {
          var x = y.targetTouches ? y.targetTouches[0] : y;
          i(m, h)[h].x = x.pageX, i(m, h)[h].y = x.pageY;
        }, this._onTouchMove = function(y) {
          var x = i(m, u)[u];
          x.preventTouch && !y.target.classList.contains(x.unpreventTouchClass) && y.preventDefault();
          var b = i(m, d)[d], P = y.targetTouches ? y.targetTouches[0] : y;
          b.deltaX = (P.pageX - i(m, h)[h].x) * x.touchMultiplier, b.deltaY = (P.pageY - i(m, h)[h].y) * x.touchMultiplier, i(m, h)[h].x = P.pageX, i(m, h)[h].y = P.pageY, m._notify(y);
        }, this._onKeyDown = function(y) {
          var x = i(m, d)[d];
          x.deltaX = x.deltaY = 0;
          var b = window.innerHeight - 40;
          switch (y.keyCode) {
            case 37:
            case 38:
              x.deltaY = i(m, u)[u].keyStep;
              break;
            case 39:
            case 40:
              x.deltaY = -i(m, u)[u].keyStep;
              break;
            case 32:
              x.deltaY = b * (y.shiftKey ? 1 : -1);
              break;
            default:
              return;
          }
          m._notify(y);
        }, i(this, f)[f] = window, v && v.el && (i(this, f)[f] = v.el, delete v.el), o || (o = { hasWheelEvent: "onwheel" in document, hasMouseWheelEvent: "onmousewheel" in document, hasTouch: "ontouchstart" in document, hasTouchWin: navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1, hasPointer: !!window.navigator.msPointerEnabled, hasKeyDown: "onkeydown" in document, isFirefox: navigator.userAgent.indexOf("Firefox") > -1 }), i(this, u)[u] = Object.assign({ mouseMultiplier: 1, touchMultiplier: 2, firefoxMultiplier: 15, keyStep: 120, preventTouch: !1, unpreventTouchClass: "vs-touchmove-allowed", useKeyboard: !0, useTouch: !0 }, v), i(this, _)[_] = new s(), i(this, d)[d] = { y: 0, x: 0, deltaX: 0, deltaY: 0 }, i(this, h)[h] = { x: null, y: null }, i(this, p)[p] = null, i(this, u)[u].passive !== void 0 && (this.listenerOptions = { passive: i(this, u)[u].passive });
      }
      var g = c.prototype;
      return g._notify = function(v) {
        var m = i(this, d)[d];
        m.x += m.deltaX, m.y += m.deltaY, i(this, _)[_].emit(l, { x: m.x, y: m.y, deltaX: m.deltaX, deltaY: m.deltaY, originalEvent: v });
      }, g._bind = function() {
        o.hasWheelEvent && i(this, f)[f].addEventListener("wheel", this._onWheel, this.listenerOptions), o.hasMouseWheelEvent && i(this, f)[f].addEventListener("mousewheel", this._onMouseWheel, this.listenerOptions), o.hasTouch && i(this, u)[u].useTouch && (i(this, f)[f].addEventListener("touchstart", this._onTouchStart, this.listenerOptions), i(this, f)[f].addEventListener("touchmove", this._onTouchMove, this.listenerOptions)), o.hasPointer && o.hasTouchWin && (i(this, p)[p] = document.body.style.msTouchAction, document.body.style.msTouchAction = "none", i(this, f)[f].addEventListener("MSPointerDown", this._onTouchStart, !0), i(this, f)[f].addEventListener("MSPointerMove", this._onTouchMove, !0)), o.hasKeyDown && i(this, u)[u].useKeyboard && document.addEventListener("keydown", this._onKeyDown);
      }, g._unbind = function() {
        o.hasWheelEvent && i(this, f)[f].removeEventListener("wheel", this._onWheel), o.hasMouseWheelEvent && i(this, f)[f].removeEventListener("mousewheel", this._onMouseWheel), o.hasTouch && (i(this, f)[f].removeEventListener("touchstart", this._onTouchStart), i(this, f)[f].removeEventListener("touchmove", this._onTouchMove)), o.hasPointer && o.hasTouchWin && (document.body.style.msTouchAction = i(this, p)[p], i(this, f)[f].removeEventListener("MSPointerDown", this._onTouchStart, !0), i(this, f)[f].removeEventListener("MSPointerMove", this._onTouchMove, !0)), o.hasKeyDown && i(this, u)[u].useKeyboard && document.removeEventListener("keydown", this._onKeyDown);
      }, g.on = function(v, m) {
        i(this, _)[_].on(l, v, m);
        var y = i(this, _)[_].e;
        y && y[l] && y[l].length === 1 && this._bind();
      }, g.off = function(v, m) {
        i(this, _)[_].off(l, v, m);
        var y = i(this, _)[_].e;
        (!y[l] || y[l].length <= 0) && this._unbind();
      }, g.destroy = function() {
        i(this, _)[_].off(), this._unbind();
      }, c;
    }();
  });
})(Do);
var il = Do.exports;
const nl = /* @__PURE__ */ el(il);
function Di() {
  return Di = Object.assign ? Object.assign.bind() : function(a) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var e in r)
        Object.prototype.hasOwnProperty.call(r, e) && (a[e] = r[e]);
    }
    return a;
  }, Di.apply(this, arguments);
}
function Ks(a, t) {
  let r = a % t;
  return (t > 0 && r < 0 || t < 0 && r > 0) && (r += t), r;
}
const sl = ["duration", "easing"];
class ol {
  to(t, r = {}) {
    let { duration: e = 1, easing: i = (s) => s } = r, n = function(s, o) {
      if (s == null)
        return {};
      var l, u, f = {}, _ = Object.keys(s);
      for (u = 0; u < _.length; u++)
        o.indexOf(l = _[u]) >= 0 || (f[l] = s[l]);
      return f;
    }(r, sl);
    this.target = t, this.fromKeys = Di({}, n), this.toKeys = Di({}, n), this.keys = Object.keys(Di({}, n)), this.keys.forEach((s) => {
      this.fromKeys[s] = t[s];
    }), this.duration = e, this.easing = i, this.currentTime = 0, this.isRunning = !0;
  }
  stop() {
    this.isRunning = !1;
  }
  raf(t) {
    if (!this.isRunning)
      return;
    this.currentTime = Math.min(this.currentTime + t, this.duration);
    const r = this.progress >= 1 ? 1 : this.easing(this.progress);
    this.keys.forEach((e) => {
      const i = this.fromKeys[e];
      this.target[e] = i + (this.toKeys[e] - i) * r;
    }), r === 1 && this.stop();
  }
  get progress() {
    return this.currentTime / this.duration;
  }
}
class al extends rl {
  constructor({ duration: t = 1.2, easing: r = (d) => Math.min(1, 1.001 - Math.pow(2, -10 * d)), smooth: e = !0, mouseMultiplier: i = 1, smoothTouch: n = !1, touchMultiplier: s = 2, direction: o = "vertical", gestureDirection: l = "vertical", infinite: u = !1, wrapper: f = window, content: _ = document.body } = {}) {
    var d, h, p;
    super(), this.onWindowResize = () => {
      this.wrapperWidth = window.innerWidth, this.wrapperHeight = window.innerHeight;
    }, this.onWrapperResize = ([g]) => {
      if (g) {
        const v = g.contentRect;
        this.wrapperWidth = v.width, this.wrapperHeight = v.height;
      }
    }, this.onContentResize = ([g]) => {
      if (g) {
        const v = g.contentRect;
        this.contentWidth = v.width, this.contentHeight = v.height;
      }
    }, this.onVirtualScroll = ({ deltaY: g, deltaX: v, originalEvent: m }) => {
      if (this.gestureDirection === "vertical" && g === 0 || this.gestureDirection === "horizontal" && v === 0)
        return;
      const y = !!m.composedPath().find((b) => b.hasAttribute && b.hasAttribute("data-lenis-prevent"));
      if (m.ctrlKey || y)
        return;
      if (this.smooth = m.changedTouches ? this.smoothTouch : this.options.smooth, this.stopped)
        return void m.preventDefault();
      if (!this.smooth || m.buttons === 4)
        return;
      this.smooth && m.preventDefault();
      let x = 0;
      x = this.gestureDirection === "both" ? v + g : this.gestureDirection === "horizontal" ? v : g, this.targetScroll -= x, this.scrollTo(this.targetScroll);
    }, this.onScroll = (g) => {
      this.isScrolling && this.smooth || (this.targetScroll = this.scroll = this.lastScroll = this.wrapperNode[this.scrollProperty], this.notify());
    }, window.lenisVersion = "0.2.28", this.options = { duration: t, easing: r, smooth: e, mouseMultiplier: i, smoothTouch: n, touchMultiplier: s, direction: o, gestureDirection: l, infinite: u, wrapper: f, content: _ }, this.duration = t, this.easing = r, this.smooth = e, this.mouseMultiplier = i, this.smoothTouch = n, this.touchMultiplier = s, this.direction = o, this.gestureDirection = l, this.infinite = u, this.wrapperNode = f, this.contentNode = _, this.wrapperNode.addEventListener("scroll", this.onScroll), this.wrapperNode === window ? (this.wrapperNode.addEventListener("resize", this.onWindowResize), this.onWindowResize()) : (this.wrapperHeight = this.wrapperNode.offsetHeight, this.wrapperWidth = this.wrapperNode.offsetWidth, this.wrapperObserver = new ResizeObserver(this.onWrapperResize), this.wrapperObserver.observe(this.wrapperNode)), this.contentHeight = this.contentNode.offsetHeight, this.contentWidth = this.contentNode.offsetWidth, this.contentObserver = new ResizeObserver(this.onContentResize), this.contentObserver.observe(this.contentNode), this.targetScroll = this.scroll = this.lastScroll = this.wrapperNode[this.scrollProperty], this.animate = new ol();
    const c = ((d = navigator) == null || (h = d.userAgentData) == null ? void 0 : h.platform) || ((p = navigator) == null ? void 0 : p.platform) || "unknown";
    this.virtualScroll = new nl({ el: this.wrapperNode, firefoxMultiplier: 50, mouseMultiplier: this.mouseMultiplier * (c.includes("Win") || c.includes("Linux") ? 0.84 : 0.4), touchMultiplier: this.touchMultiplier, passive: !1, useKeyboard: !1, useTouch: !0 }), this.virtualScroll.on(this.onVirtualScroll);
  }
  get scrollProperty() {
    let t;
    return t = this.wrapperNode === window ? this.direction === "horizontal" ? "scrollX" : "scrollY" : this.direction === "horizontal" ? "scrollLeft" : "scrollTop", t;
  }
  start() {
    let t = this.wrapperNode;
    this.wrapperNode === window && (t = document.documentElement), t.classList.remove("lenis-stopped"), this.stopped = !1;
  }
  stop() {
    let t = this.wrapperNode;
    this.wrapperNode === window && (t = document.documentElement), t.classList.add("lenis-stopped"), this.stopped = !0, this.animate.stop();
  }
  destroy() {
    var t;
    this.wrapperNode === window && this.wrapperNode.removeEventListener("resize", this.onWindowResize), this.wrapperNode.removeEventListener("scroll", this.onScroll), this.virtualScroll.destroy(), (t = this.wrapperObserver) == null || t.disconnect(), this.contentObserver.disconnect();
  }
  get limit() {
    return this.direction === "horizontal" ? this.contentWidth - this.wrapperWidth : this.contentHeight - this.wrapperHeight;
  }
  raf(t) {
    const r = t - (this.now || 0);
    this.now = t, !this.stopped && this.smooth && (this.lastScroll = this.scroll, this.animate.raf(1e-3 * r), this.scroll === this.targetScroll && (this.lastScroll = this.scroll), this.isScrolling && (this.setScroll(this.scroll), this.notify()), this.isScrolling = this.scroll !== this.targetScroll);
  }
  get velocity() {
    return this.scroll - this.lastScroll;
  }
  setScroll(t) {
    let r = this.infinite ? Ks(t, this.limit) : t;
    this.direction === "horizontal" ? this.wrapperNode.scrollTo(r, 0) : this.wrapperNode.scrollTo(0, r);
  }
  notify() {
    let t = this.infinite ? Ks(this.scroll, this.limit) : this.scroll;
    this.emit("scroll", { scroll: t, limit: this.limit, velocity: this.velocity, direction: this.velocity === 0 ? 0 : this.velocity > 0 ? 1 : -1, progress: t / this.limit });
  }
  scrollTo(t, { offset: r = 0, immediate: e = !1, duration: i = this.duration, easing: n = this.easing } = {}) {
    if (t == null || this.stopped)
      return;
    let s;
    if (typeof t == "number")
      s = t;
    else if (t === "top" || t === "#top")
      s = 0;
    else if (t === "bottom")
      s = this.limit;
    else {
      let o;
      if (typeof t == "string")
        o = document.querySelector(t);
      else {
        if (t == null || !t.nodeType)
          return;
        o = t;
      }
      if (!o)
        return;
      let l = 0;
      if (this.wrapperNode !== window) {
        const f = this.wrapperNode.getBoundingClientRect();
        l = this.direction === "horizontal" ? f.left : f.top;
      }
      const u = o.getBoundingClientRect();
      s = (this.direction === "horizontal" ? u.left : u.top) + this.scroll - l;
    }
    s += r, this.targetScroll = this.infinite ? s : Math.max(0, Math.min(s, this.limit)), !this.smooth || e ? (this.animate.stop(), this.scroll = this.lastScroll = this.targetScroll, this.setScroll(this.targetScroll)) : this.animate.to(this, { duration: i, easing: n, scroll: this.targetScroll });
  }
}
function ll() {
  window.lenis = new al({
    duration: 1.2,
    // easing: (t) => -(Math.cos(Math.PI *t) - 1) / 2, // https://www.desmos.com/calculator/brs54l4xou
    direction: "vertical",
    // vertical, horizontal
    gestureDirection: "vertical",
    // vertical, horizontal, both
    smooth: !0,
    mouseMultiplier: 0.5,
    smoothTouch: !1,
    touchMultiplier: 2,
    infinite: !1
  }), window.scrollDirection = "down", lenis.on("scroll", ({ direction: t, progress: r }) => {
    t === 1 ? window.scrollDirection = "down" : window.scrollDirection = "up";
  });
  function a(t) {
    lenis.raf(t), requestAnimationFrame(a);
  }
  requestAnimationFrame(a);
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
}, oi = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, Ps, It, vt, Te = 1e8, tt = 1 / Te, Jn = Math.PI * 2, ul = Jn / 4, fl = 0, Ao = Math.sqrt, hl = Math.cos, cl = Math.sin, Ct = function(t) {
  return typeof t == "string";
}, ht = function(t) {
  return typeof t == "function";
}, er = function(t) {
  return typeof t == "number";
}, ks = function(t) {
  return typeof t > "u";
}, $e = function(t) {
  return typeof t == "object";
}, re = function(t) {
  return t !== !1;
}, Os = function() {
  return typeof window < "u";
}, Zi = function(t) {
  return ht(t) || Ct(t);
}, Ro = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, Bt = Array.isArray, ts = /(?:-?\.?\d|\.)+/gi, zo = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Zr = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Nn = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Lo = /[+-]=-?[.\d]+/, Fo = /[^,'"\[\]\s]+/gi, dl = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, at, we, es, Ms, me = {}, xn = {}, No, Yo = function(t) {
  return (xn = Nr(t, me)) && se;
}, Cs = function(t, r) {
  return console.warn("Invalid property", t, "set to", r, "Missing plugin? gsap.registerPlugin()");
}, wn = function(t, r) {
  return !r && console.warn(t);
}, Io = function(t, r) {
  return t && (me[t] = r) && xn && (xn[t] = r) || me;
}, Wi = function() {
  return 0;
}, _l = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, fn = {
  suppressEvents: !0,
  kill: !1
}, pl = {
  suppressEvents: !0
}, Ds = {}, _r = [], rs = {}, Bo, ce = {}, Yn = {}, js = 30, hn = [], Es = "", As = function(t) {
  var r = t[0], e, i;
  if ($e(r) || ht(r) || (t = [t]), !(e = (r._gsap || {}).harness)) {
    for (i = hn.length; i-- && !hn[i].targetTest(r); )
      ;
    e = hn[i];
  }
  for (i = t.length; i--; )
    t[i] && (t[i]._gsap || (t[i]._gsap = new fa(t[i], e))) || t.splice(i, 1);
  return t;
}, Er = function(t) {
  return t._gsap || As(Se(t))[0]._gsap;
}, Xo = function(t, r, e) {
  return (e = t[r]) && ht(e) ? t[r]() : ks(e) && t.getAttribute && t.getAttribute(r) || e;
}, ie = function(t, r) {
  return (t = t.split(",")).forEach(r) || t;
}, pt = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, At = function(t) {
  return Math.round(t * 1e7) / 1e7 || 0;
}, ei = function(t, r) {
  var e = r.charAt(0), i = parseFloat(r.substr(2));
  return t = parseFloat(t), e === "+" ? t + i : e === "-" ? t - i : e === "*" ? t * i : t / i;
}, gl = function(t, r) {
  for (var e = r.length, i = 0; t.indexOf(r[i]) < 0 && ++i < e; )
    ;
  return i < e;
}, bn = function() {
  var t = _r.length, r = _r.slice(0), e, i;
  for (rs = {}, _r.length = 0, e = 0; e < t; e++)
    i = r[e], i && i._lazy && (i.render(i._lazy[0], i._lazy[1], !0)._lazy = 0);
}, Wo = function(t, r, e, i) {
  _r.length && !It && bn(), t.render(r, e, i || It && r < 0 && (t._initted || t._startAt)), _r.length && !It && bn();
}, Vo = function(t) {
  var r = parseFloat(t);
  return (r || r === 0) && (t + "").match(Fo).length < 2 ? r : Ct(t) ? t.trim() : t;
}, Uo = function(t) {
  return t;
}, Oe = function(t, r) {
  for (var e in r)
    e in t || (t[e] = r[e]);
  return t;
}, ml = function(t) {
  return function(r, e) {
    for (var i in e)
      i in r || i === "duration" && t || i === "ease" || (r[i] = e[i]);
  };
}, Nr = function(t, r) {
  for (var e in r)
    t[e] = r[e];
  return t;
}, Zs = function a(t, r) {
  for (var e in r)
    e !== "__proto__" && e !== "constructor" && e !== "prototype" && (t[e] = $e(r[e]) ? a(t[e] || (t[e] = {}), r[e]) : r[e]);
  return t;
}, Tn = function(t, r) {
  var e = {}, i;
  for (i in t)
    i in r || (e[i] = t[i]);
  return e;
}, Ei = function(t) {
  var r = t.parent || at, e = t.keyframes ? ml(Bt(t.keyframes)) : Oe;
  if (re(t.inherit))
    for (; r; )
      e(t, r.vars.defaults), r = r.parent || r._dp;
  return t;
}, vl = function(t, r) {
  for (var e = t.length, i = e === r.length; i && e-- && t[e] === r[e]; )
    ;
  return e < 0;
}, Ho = function(t, r, e, i, n) {
  e === void 0 && (e = "_first"), i === void 0 && (i = "_last");
  var s = t[i], o;
  if (n)
    for (o = r[n]; s && s[n] > o; )
      s = s._prev;
  return s ? (r._next = s._next, s._next = r) : (r._next = t[e], t[e] = r), r._next ? r._next._prev = r : t[i] = r, r._prev = s, r.parent = r._dp = t, r;
}, An = function(t, r, e, i) {
  e === void 0 && (e = "_first"), i === void 0 && (i = "_last");
  var n = r._prev, s = r._next;
  n ? n._next = s : t[e] === r && (t[e] = s), s ? s._prev = n : t[i] === r && (t[i] = n), r._next = r._prev = r.parent = null;
}, mr = function(t, r) {
  t.parent && (!r || t.parent.autoRemoveChildren) && t.parent.remove(t), t._act = 0;
}, Ar = function(t, r) {
  if (t && (!r || r._end > t._dur || r._start < 0))
    for (var e = t; e; )
      e._dirty = 1, e = e.parent;
  return t;
}, yl = function(t) {
  for (var r = t.parent; r && r.parent; )
    r._dirty = 1, r.totalDuration(), r = r.parent;
  return t;
}, is = function(t, r, e, i) {
  return t._startAt && (It ? t._startAt.revert(fn) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(r, !0, i));
}, xl = function a(t) {
  return !t || t._ts && a(t.parent);
}, Qs = function(t) {
  return t._repeat ? ai(t._tTime, t = t.duration() + t._rDelay) * t : 0;
}, ai = function(t, r) {
  var e = Math.floor(t /= r);
  return t && e === t ? e - 1 : e;
}, Sn = function(t, r) {
  return (t - r._start) * r._ts + (r._ts >= 0 ? 0 : r._dirty ? r.totalDuration() : r._tDur);
}, Rn = function(t) {
  return t._end = At(t._start + (t._tDur / Math.abs(t._ts || t._rts || tt) || 0));
}, zn = function(t, r) {
  var e = t._dp;
  return e && e.smoothChildTiming && t._ts && (t._start = At(e._time - (t._ts > 0 ? r / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - r) / -t._ts)), Rn(t), e._dirty || Ar(e, t)), t;
}, $o = function(t, r) {
  var e;
  if ((r._time || r._initted && !r._dur) && (e = Sn(t.rawTime(), r), (!r._dur || ji(0, r.totalDuration(), e) - r._tTime > tt) && r.render(e, !0)), Ar(t, r)._dp && t._initted && t._time >= t._dur && t._ts) {
    if (t._dur < t.duration())
      for (e = t; e._dp; )
        e.rawTime() >= 0 && e.totalTime(e._tTime), e = e._dp;
    t._zTime = -tt;
  }
}, We = function(t, r, e, i) {
  return r.parent && mr(r), r._start = At((er(e) ? e : e || t !== at ? xe(t, e, r) : t._time) + r._delay), r._end = At(r._start + (r.totalDuration() / Math.abs(r.timeScale()) || 0)), Ho(t, r, "_first", "_last", t._sort ? "_start" : 0), ns(r) || (t._recent = r), i || $o(t, r), t._ts < 0 && zn(t, t._tTime), t;
}, Go = function(t, r) {
  return (me.ScrollTrigger || Cs("scrollTrigger", r)) && me.ScrollTrigger.create(r, t);
}, qo = function(t, r, e, i, n) {
  if (zs(t, r, n), !t._initted)
    return 1;
  if (!e && t._pt && !It && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && Bo !== _e.frame)
    return _r.push(t), t._lazy = [n, i], 1;
}, wl = function a(t) {
  var r = t.parent;
  return r && r._ts && r._initted && !r._lock && (r.rawTime() < 0 || a(r));
}, ns = function(t) {
  var r = t.data;
  return r === "isFromStart" || r === "isStart";
}, bl = function(t, r, e, i) {
  var n = t.ratio, s = r < 0 || !r && (!t._start && wl(t) && !(!t._initted && ns(t)) || (t._ts < 0 || t._dp._ts < 0) && !ns(t)) ? 0 : 1, o = t._rDelay, l = 0, u, f, _;
  if (o && t._repeat && (l = ji(0, t._tDur, r), f = ai(l, o), t._yoyo && f & 1 && (s = 1 - s), f !== ai(t._tTime, o) && (n = 1 - s, t.vars.repeatRefresh && t._initted && t.invalidate())), s !== n || It || i || t._zTime === tt || !r && t._zTime) {
    if (!t._initted && qo(t, r, i, e, l))
      return;
    for (_ = t._zTime, t._zTime = r || (e ? tt : 0), e || (e = r && !_), t.ratio = s, t._from && (s = 1 - s), t._time = 0, t._tTime = l, u = t._pt; u; )
      u.r(s, u.d), u = u._next;
    r < 0 && is(t, r, e, !0), t._onUpdate && !e && Pe(t, "onUpdate"), l && t._repeat && !e && t.parent && Pe(t, "onRepeat"), (r >= t._tDur || r < 0) && t.ratio === s && (s && mr(t, 1), !e && !It && (Pe(t, s ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
  } else
    t._zTime || (t._zTime = r);
}, Tl = function(t, r, e) {
  var i;
  if (e > r)
    for (i = t._first; i && i._start <= e; ) {
      if (i.data === "isPause" && i._start > r)
        return i;
      i = i._next;
    }
  else
    for (i = t._last; i && i._start >= e; ) {
      if (i.data === "isPause" && i._start < r)
        return i;
      i = i._prev;
    }
}, li = function(t, r, e, i) {
  var n = t._repeat, s = At(r) || 0, o = t._tTime / t._tDur;
  return o && !i && (t._time *= s / t._dur), t._dur = s, t._tDur = n ? n < 0 ? 1e10 : At(s * (n + 1) + t._rDelay * n) : s, o > 0 && !i && zn(t, t._tTime = t._tDur * o), t.parent && Rn(t), e || Ar(t.parent, t), t;
}, Js = function(t) {
  return t instanceof ee ? Ar(t) : li(t, t._dur);
}, Sl = {
  _start: 0,
  endTime: Wi,
  totalDuration: Wi
}, xe = function a(t, r, e) {
  var i = t.labels, n = t._recent || Sl, s = t.duration() >= Te ? n.endTime(!1) : t._dur, o, l, u;
  return Ct(r) && (isNaN(r) || r in i) ? (l = r.charAt(0), u = r.substr(-1) === "%", o = r.indexOf("="), l === "<" || l === ">" ? (o >= 0 && (r = r.replace(/=/, "")), (l === "<" ? n._start : n.endTime(n._repeat >= 0)) + (parseFloat(r.substr(1)) || 0) * (u ? (o < 0 ? n : e).totalDuration() / 100 : 1)) : o < 0 ? (r in i || (i[r] = s), i[r]) : (l = parseFloat(r.charAt(o - 1) + r.substr(o + 1)), u && e && (l = l / 100 * (Bt(e) ? e[0] : e).totalDuration()), o > 1 ? a(t, r.substr(0, o - 1), e) + l : s + l)) : r == null ? s : +r;
}, Ai = function(t, r, e) {
  var i = er(r[1]), n = (i ? 2 : 1) + (t < 2 ? 0 : 1), s = r[n], o, l;
  if (i && (s.duration = r[1]), s.parent = e, t) {
    for (o = s, l = e; l && !("immediateRender" in o); )
      o = l.vars.defaults || {}, l = re(l.vars.inherit) && l.parent;
    s.immediateRender = re(o.immediateRender), t < 2 ? s.runBackwards = 1 : s.startAt = r[n - 1];
  }
  return new xt(r[0], s, r[n + 1]);
}, xr = function(t, r) {
  return t || t === 0 ? r(t) : r;
}, ji = function(t, r, e) {
  return e < t ? t : e > r ? r : e;
}, Yt = function(t, r) {
  return !Ct(t) || !(r = dl.exec(t)) ? "" : r[1];
}, Pl = function(t, r, e) {
  return xr(e, function(i) {
    return ji(t, r, i);
  });
}, ss = [].slice, Ko = function(t, r) {
  return t && $e(t) && "length" in t && (!r && !t.length || t.length - 1 in t && $e(t[0])) && !t.nodeType && t !== we;
}, kl = function(t, r, e) {
  return e === void 0 && (e = []), t.forEach(function(i) {
    var n;
    return Ct(i) && !r || Ko(i, 1) ? (n = e).push.apply(n, Se(i)) : e.push(i);
  }) || e;
}, Se = function(t, r, e) {
  return vt && !r && vt.selector ? vt.selector(t) : Ct(t) && !e && (es || !ui()) ? ss.call((r || Ms).querySelectorAll(t), 0) : Bt(t) ? kl(t, e) : Ko(t) ? ss.call(t, 0) : t ? [t] : [];
}, os = function(t) {
  return t = Se(t)[0] || wn("Invalid scope") || {}, function(r) {
    var e = t.current || t.nativeElement || t;
    return Se(r, e.querySelectorAll ? e : e === t ? wn("Invalid scope") || Ms.createElement("div") : t);
  };
}, jo = function(t) {
  return t.sort(function() {
    return 0.5 - Math.random();
  });
}, Zo = function(t) {
  if (ht(t))
    return t;
  var r = $e(t) ? t : {
    each: t
  }, e = Rr(r.ease), i = r.from || 0, n = parseFloat(r.base) || 0, s = {}, o = i > 0 && i < 1, l = isNaN(i) || o, u = r.axis, f = i, _ = i;
  return Ct(i) ? f = _ = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[i] || 0 : !o && l && (f = i[0], _ = i[1]), function(d, h, p) {
    var c = (p || r).length, g = s[c], v, m, y, x, b, P, S, O, k;
    if (!g) {
      if (k = r.grid === "auto" ? 0 : (r.grid || [1, Te])[1], !k) {
        for (S = -Te; S < (S = p[k++].getBoundingClientRect().left) && k < c; )
          ;
        k--;
      }
      for (g = s[c] = [], v = l ? Math.min(k, c) * f - 0.5 : i % k, m = k === Te ? 0 : l ? c * _ / k - 0.5 : i / k | 0, S = 0, O = Te, P = 0; P < c; P++)
        y = P % k - v, x = m - (P / k | 0), g[P] = b = u ? Math.abs(u === "y" ? x : y) : Ao(y * y + x * x), b > S && (S = b), b < O && (O = b);
      i === "random" && jo(g), g.max = S - O, g.min = O, g.v = c = (parseFloat(r.amount) || parseFloat(r.each) * (k > c ? c - 1 : u ? u === "y" ? c / k : k : Math.max(k, c / k)) || 0) * (i === "edges" ? -1 : 1), g.b = c < 0 ? n - c : n, g.u = Yt(r.amount || r.each) || 0, e = e && c < 0 ? aa(e) : e;
    }
    return c = (g[d] - g.min) / g.max || 0, At(g.b + (e ? e(c) : c) * g.v) + g.u;
  };
}, as = function(t) {
  var r = Math.pow(10, ((t + "").split(".")[1] || "").length);
  return function(e) {
    var i = At(Math.round(parseFloat(e) / t) * t * r);
    return (i - i % 1) / r + (er(e) ? 0 : Yt(e));
  };
}, Qo = function(t, r) {
  var e = Bt(t), i, n;
  return !e && $e(t) && (i = e = t.radius || Te, t.values ? (t = Se(t.values), (n = !er(t[0])) && (i *= i)) : t = as(t.increment)), xr(r, e ? ht(t) ? function(s) {
    return n = t(s), Math.abs(n - s) <= i ? n : s;
  } : function(s) {
    for (var o = parseFloat(n ? s.x : s), l = parseFloat(n ? s.y : 0), u = Te, f = 0, _ = t.length, d, h; _--; )
      n ? (d = t[_].x - o, h = t[_].y - l, d = d * d + h * h) : d = Math.abs(t[_] - o), d < u && (u = d, f = _);
    return f = !i || u <= i ? t[f] : s, n || f === s || er(s) ? f : f + Yt(s);
  } : as(t));
}, Jo = function(t, r, e, i) {
  return xr(Bt(t) ? !r : e === !0 ? !!(e = 0) : !i, function() {
    return Bt(t) ? t[~~(Math.random() * t.length)] : (e = e || 1e-5) && (i = e < 1 ? Math.pow(10, (e + "").length - 2) : 1) && Math.floor(Math.round((t - e / 2 + Math.random() * (r - t + e * 0.99)) / e) * e * i) / i;
  });
}, Ol = function() {
  for (var t = arguments.length, r = new Array(t), e = 0; e < t; e++)
    r[e] = arguments[e];
  return function(i) {
    return r.reduce(function(n, s) {
      return s(n);
    }, i);
  };
}, Ml = function(t, r) {
  return function(e) {
    return t(parseFloat(e)) + (r || Yt(e));
  };
}, Cl = function(t, r, e) {
  return ea(t, r, 0, 1, e);
}, ta = function(t, r, e) {
  return xr(e, function(i) {
    return t[~~r(i)];
  });
}, Dl = function a(t, r, e) {
  var i = r - t;
  return Bt(t) ? ta(t, a(0, t.length), r) : xr(e, function(n) {
    return (i + (n - t) % i) % i + t;
  });
}, El = function a(t, r, e) {
  var i = r - t, n = i * 2;
  return Bt(t) ? ta(t, a(0, t.length - 1), r) : xr(e, function(s) {
    return s = (n + (s - t) % n) % n || 0, t + (s > i ? n - s : s);
  });
}, Vi = function(t) {
  for (var r = 0, e = "", i, n, s, o; ~(i = t.indexOf("random(", r)); )
    s = t.indexOf(")", i), o = t.charAt(i + 7) === "[", n = t.substr(i + 7, s - i - 7).match(o ? Fo : ts), e += t.substr(r, i - r) + Jo(o ? n : +n[0], o ? 0 : +n[1], +n[2] || 1e-5), r = s + 1;
  return e + t.substr(r, t.length - r);
}, ea = function(t, r, e, i, n) {
  var s = r - t, o = i - e;
  return xr(n, function(l) {
    return e + ((l - t) / s * o || 0);
  });
}, Al = function a(t, r, e, i) {
  var n = isNaN(t + r) ? 0 : function(h) {
    return (1 - h) * t + h * r;
  };
  if (!n) {
    var s = Ct(t), o = {}, l, u, f, _, d;
    if (e === !0 && (i = 1) && (e = null), s)
      t = {
        p: t
      }, r = {
        p: r
      };
    else if (Bt(t) && !Bt(r)) {
      for (f = [], _ = t.length, d = _ - 2, u = 1; u < _; u++)
        f.push(a(t[u - 1], t[u]));
      _--, n = function(p) {
        p *= _;
        var c = Math.min(d, ~~p);
        return f[c](p - c);
      }, e = r;
    } else
      i || (t = Nr(Bt(t) ? [] : {}, t));
    if (!f) {
      for (l in r)
        Rs.call(o, t, l, "get", r[l]);
      n = function(p) {
        return Ns(p, o) || (s ? t.p : t);
      };
    }
  }
  return xr(e, n);
}, to = function(t, r, e) {
  var i = t.labels, n = Te, s, o, l;
  for (s in i)
    o = i[s] - r, o < 0 == !!e && o && n > (o = Math.abs(o)) && (l = s, n = o);
  return l;
}, Pe = function(t, r, e) {
  var i = t.vars, n = i[r], s = vt, o = t._ctx, l, u, f;
  if (n)
    return l = i[r + "Params"], u = i.callbackScope || t, e && _r.length && bn(), o && (vt = o), f = l ? n.apply(u, l) : n.call(u), vt = s, f;
}, Si = function(t) {
  return mr(t), t.scrollTrigger && t.scrollTrigger.kill(!!It), t.progress() < 1 && Pe(t, "onInterrupt"), t;
}, Qr, ra = [], ia = function(t) {
  if (!Os()) {
    ra.push(t);
    return;
  }
  t = !t.name && t.default || t;
  var r = t.name, e = ht(t), i = r && !e && t.init ? function() {
    this._props = [];
  } : t, n = {
    init: Wi,
    render: Ns,
    add: Rs,
    kill: ql,
    modifier: Gl,
    rawVars: 0
  }, s = {
    targetTest: 0,
    get: 0,
    getSetter: Fs,
    aliases: {},
    register: 0
  };
  if (ui(), t !== i) {
    if (ce[r])
      return;
    Oe(i, Oe(Tn(t, n), s)), Nr(i.prototype, Nr(n, Tn(t, s))), ce[i.prop = r] = i, t.targetTest && (hn.push(i), Ds[r] = 1), r = (r === "css" ? "CSS" : r.charAt(0).toUpperCase() + r.substr(1)) + "Plugin";
  }
  Io(r, i), t.register && t.register(se, i, ne);
}, J = 255, Pi = {
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
}, In = function(t, r, e) {
  return t += t < 0 ? 1 : t > 1 ? -1 : 0, (t * 6 < 1 ? r + (e - r) * t * 6 : t < 0.5 ? e : t * 3 < 2 ? r + (e - r) * (2 / 3 - t) * 6 : r) * J + 0.5 | 0;
}, na = function(t, r, e) {
  var i = t ? er(t) ? [t >> 16, t >> 8 & J, t & J] : 0 : Pi.black, n, s, o, l, u, f, _, d, h, p;
  if (!i) {
    if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), Pi[t])
      i = Pi[t];
    else if (t.charAt(0) === "#") {
      if (t.length < 6 && (n = t.charAt(1), s = t.charAt(2), o = t.charAt(3), t = "#" + n + n + s + s + o + o + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9)
        return i = parseInt(t.substr(1, 6), 16), [i >> 16, i >> 8 & J, i & J, parseInt(t.substr(7), 16) / 255];
      t = parseInt(t.substr(1), 16), i = [t >> 16, t >> 8 & J, t & J];
    } else if (t.substr(0, 3) === "hsl") {
      if (i = p = t.match(ts), !r)
        l = +i[0] % 360 / 360, u = +i[1] / 100, f = +i[2] / 100, s = f <= 0.5 ? f * (u + 1) : f + u - f * u, n = f * 2 - s, i.length > 3 && (i[3] *= 1), i[0] = In(l + 1 / 3, n, s), i[1] = In(l, n, s), i[2] = In(l - 1 / 3, n, s);
      else if (~t.indexOf("="))
        return i = t.match(zo), e && i.length < 4 && (i[3] = 1), i;
    } else
      i = t.match(ts) || Pi.transparent;
    i = i.map(Number);
  }
  return r && !p && (n = i[0] / J, s = i[1] / J, o = i[2] / J, _ = Math.max(n, s, o), d = Math.min(n, s, o), f = (_ + d) / 2, _ === d ? l = u = 0 : (h = _ - d, u = f > 0.5 ? h / (2 - _ - d) : h / (_ + d), l = _ === n ? (s - o) / h + (s < o ? 6 : 0) : _ === s ? (o - n) / h + 2 : (n - s) / h + 4, l *= 60), i[0] = ~~(l + 0.5), i[1] = ~~(u * 100 + 0.5), i[2] = ~~(f * 100 + 0.5)), e && i.length < 4 && (i[3] = 1), i;
}, sa = function(t) {
  var r = [], e = [], i = -1;
  return t.split(pr).forEach(function(n) {
    var s = n.match(Zr) || [];
    r.push.apply(r, s), e.push(i += s.length + 1);
  }), r.c = e, r;
}, eo = function(t, r, e) {
  var i = "", n = (t + i).match(pr), s = r ? "hsla(" : "rgba(", o = 0, l, u, f, _;
  if (!n)
    return t;
  if (n = n.map(function(d) {
    return (d = na(d, r, 1)) && s + (r ? d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : d.join(",")) + ")";
  }), e && (f = sa(t), l = e.c, l.join(i) !== f.c.join(i)))
    for (u = t.replace(pr, "1").split(Zr), _ = u.length - 1; o < _; o++)
      i += u[o] + (~l.indexOf(o) ? n.shift() || s + "0,0,0,0)" : (f.length ? f : n.length ? n : e).shift());
  if (!u)
    for (u = t.split(pr), _ = u.length - 1; o < _; o++)
      i += u[o] + n[o];
  return i + u[_];
}, pr = function() {
  var a = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
  for (t in Pi)
    a += "|" + t + "\\b";
  return new RegExp(a + ")", "gi");
}(), Rl = /hsl[a]?\(/, oa = function(t) {
  var r = t.join(" "), e;
  if (pr.lastIndex = 0, pr.test(r))
    return e = Rl.test(r), t[1] = eo(t[1], e), t[0] = eo(t[0], e, sa(t[1])), !0;
}, Ui, _e = function() {
  var a = Date.now, t = 500, r = 33, e = a(), i = e, n = 1e3 / 240, s = n, o = [], l, u, f, _, d, h, p = function c(g) {
    var v = a() - i, m = g === !0, y, x, b, P;
    if (v > t && (e += v - r), i += v, b = i - e, y = b - s, (y > 0 || m) && (P = ++_.frame, d = b - _.time * 1e3, _.time = b = b / 1e3, s += y + (y >= n ? 4 : n - y), x = 1), m || (l = u(c)), x)
      for (h = 0; h < o.length; h++)
        o[h](b, d, P, g);
  };
  return _ = {
    time: 0,
    frame: 0,
    tick: function() {
      p(!0);
    },
    deltaRatio: function(g) {
      return d / (1e3 / (g || 60));
    },
    wake: function() {
      No && (!es && Os() && (we = es = window, Ms = we.document || {}, me.gsap = se, (we.gsapVersions || (we.gsapVersions = [])).push(se.version), Yo(xn || we.GreenSockGlobals || !we.gsap && we || {}), f = we.requestAnimationFrame, ra.forEach(ia)), l && _.sleep(), u = f || function(g) {
        return setTimeout(g, s - _.time * 1e3 + 1 | 0);
      }, Ui = 1, p(2));
    },
    sleep: function() {
      (f ? we.cancelAnimationFrame : clearTimeout)(l), Ui = 0, u = Wi;
    },
    lagSmoothing: function(g, v) {
      t = g || 1 / 0, r = Math.min(v || 33, t);
    },
    fps: function(g) {
      n = 1e3 / (g || 240), s = _.time * 1e3 + n;
    },
    add: function(g, v, m) {
      var y = v ? function(x, b, P, S) {
        g(x, b, P, S), _.remove(y);
      } : g;
      return _.remove(g), o[m ? "unshift" : "push"](y), ui(), y;
    },
    remove: function(g, v) {
      ~(v = o.indexOf(g)) && o.splice(v, 1) && h >= v && h--;
    },
    _listeners: o
  }, _;
}(), ui = function() {
  return !Ui && _e.wake();
}, K = {}, zl = /^[\d.\-M][\d.\-,\s]/, Ll = /["']/g, Fl = function(t) {
  for (var r = {}, e = t.substr(1, t.length - 3).split(":"), i = e[0], n = 1, s = e.length, o, l, u; n < s; n++)
    l = e[n], o = n !== s - 1 ? l.lastIndexOf(",") : l.length, u = l.substr(0, o), r[i] = isNaN(u) ? u.replace(Ll, "").trim() : +u, i = l.substr(o + 1).trim();
  return r;
}, Nl = function(t) {
  var r = t.indexOf("(") + 1, e = t.indexOf(")"), i = t.indexOf("(", r);
  return t.substring(r, ~i && i < e ? t.indexOf(")", e + 1) : e);
}, Yl = function(t) {
  var r = (t + "").split("("), e = K[r[0]];
  return e && r.length > 1 && e.config ? e.config.apply(null, ~t.indexOf("{") ? [Fl(r[1])] : Nl(t).split(",").map(Vo)) : K._CE && zl.test(t) ? K._CE("", t) : e;
}, aa = function(t) {
  return function(r) {
    return 1 - t(1 - r);
  };
}, la = function a(t, r) {
  for (var e = t._first, i; e; )
    e instanceof ee ? a(e, r) : e.vars.yoyoEase && (!e._yoyo || !e._repeat) && e._yoyo !== r && (e.timeline ? a(e.timeline, r) : (i = e._ease, e._ease = e._yEase, e._yEase = i, e._yoyo = r)), e = e._next;
}, Rr = function(t, r) {
  return t && (ht(t) ? t : K[t] || Yl(t)) || r;
}, Xr = function(t, r, e, i) {
  e === void 0 && (e = function(l) {
    return 1 - r(1 - l);
  }), i === void 0 && (i = function(l) {
    return l < 0.5 ? r(l * 2) / 2 : 1 - r((1 - l) * 2) / 2;
  });
  var n = {
    easeIn: r,
    easeOut: e,
    easeInOut: i
  }, s;
  return ie(t, function(o) {
    K[o] = me[o] = n, K[s = o.toLowerCase()] = e;
    for (var l in n)
      K[s + (l === "easeIn" ? ".in" : l === "easeOut" ? ".out" : ".inOut")] = K[o + "." + l] = n[l];
  }), n;
}, ua = function(t) {
  return function(r) {
    return r < 0.5 ? (1 - t(1 - r * 2)) / 2 : 0.5 + t((r - 0.5) * 2) / 2;
  };
}, Bn = function a(t, r, e) {
  var i = r >= 1 ? r : 1, n = (e || (t ? 0.3 : 0.45)) / (r < 1 ? r : 1), s = n / Jn * (Math.asin(1 / i) || 0), o = function(f) {
    return f === 1 ? 1 : i * Math.pow(2, -10 * f) * cl((f - s) * n) + 1;
  }, l = t === "out" ? o : t === "in" ? function(u) {
    return 1 - o(1 - u);
  } : ua(o);
  return n = Jn / n, l.config = function(u, f) {
    return a(t, u, f);
  }, l;
}, Xn = function a(t, r) {
  r === void 0 && (r = 1.70158);
  var e = function(s) {
    return s ? --s * s * ((r + 1) * s + r) + 1 : 0;
  }, i = t === "out" ? e : t === "in" ? function(n) {
    return 1 - e(1 - n);
  } : ua(e);
  return i.config = function(n) {
    return a(t, n);
  }, i;
};
ie("Linear,Quad,Cubic,Quart,Quint,Strong", function(a, t) {
  var r = t < 5 ? t + 1 : t;
  Xr(a + ",Power" + (r - 1), t ? function(e) {
    return Math.pow(e, r);
  } : function(e) {
    return e;
  }, function(e) {
    return 1 - Math.pow(1 - e, r);
  }, function(e) {
    return e < 0.5 ? Math.pow(e * 2, r) / 2 : 1 - Math.pow((1 - e) * 2, r) / 2;
  });
});
K.Linear.easeNone = K.none = K.Linear.easeIn;
Xr("Elastic", Bn("in"), Bn("out"), Bn());
(function(a, t) {
  var r = 1 / t, e = 2 * r, i = 2.5 * r, n = function(o) {
    return o < r ? a * o * o : o < e ? a * Math.pow(o - 1.5 / t, 2) + 0.75 : o < i ? a * (o -= 2.25 / t) * o + 0.9375 : a * Math.pow(o - 2.625 / t, 2) + 0.984375;
  };
  Xr("Bounce", function(s) {
    return 1 - n(1 - s);
  }, n);
})(7.5625, 2.75);
Xr("Expo", function(a) {
  return a ? Math.pow(2, 10 * (a - 1)) : 0;
});
Xr("Circ", function(a) {
  return -(Ao(1 - a * a) - 1);
});
Xr("Sine", function(a) {
  return a === 1 ? 1 : -hl(a * ul) + 1;
});
Xr("Back", Xn("in"), Xn("out"), Xn());
K.SteppedEase = K.steps = me.SteppedEase = {
  config: function(t, r) {
    t === void 0 && (t = 1);
    var e = 1 / t, i = t + (r ? 0 : 1), n = r ? 1 : 0, s = 1 - tt;
    return function(o) {
      return ((i * ji(0, s, o) | 0) + n) * e;
    };
  }
};
oi.ease = K["quad.out"];
ie("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(a) {
  return Es += a + "," + a + "Params,";
});
var fa = function(t, r) {
  this.id = fl++, t._gsap = this, this.target = t, this.harness = r, this.get = r ? r.get : Xo, this.set = r ? r.getSetter : Fs;
}, fi = /* @__PURE__ */ function() {
  function a(r) {
    this.vars = r, this._delay = +r.delay || 0, (this._repeat = r.repeat === 1 / 0 ? -2 : r.repeat || 0) && (this._rDelay = r.repeatDelay || 0, this._yoyo = !!r.yoyo || !!r.yoyoEase), this._ts = 1, li(this, +r.duration, 1, 1), this.data = r.data, vt && (this._ctx = vt, vt.data.push(this)), Ui || _e.wake();
  }
  var t = a.prototype;
  return t.delay = function(e) {
    return e || e === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + e - this._delay), this._delay = e, this) : this._delay;
  }, t.duration = function(e) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? e + (e + this._rDelay) * this._repeat : e) : this.totalDuration() && this._dur;
  }, t.totalDuration = function(e) {
    return arguments.length ? (this._dirty = 0, li(this, this._repeat < 0 ? e : (e - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, t.totalTime = function(e, i) {
    if (ui(), !arguments.length)
      return this._tTime;
    var n = this._dp;
    if (n && n.smoothChildTiming && this._ts) {
      for (zn(this, e), !n._dp || n.parent || $o(n, this); n && n.parent; )
        n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && e < this._tDur || this._ts < 0 && e > 0 || !this._tDur && !e) && We(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== e || !this._dur && !i || this._initted && Math.abs(this._zTime) === tt || !e && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = e), Wo(this, e, i)), this;
  }, t.time = function(e, i) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), e + Qs(this)) % (this._dur + this._rDelay) || (e ? this._dur : 0), i) : this._time;
  }, t.totalProgress = function(e, i) {
    return arguments.length ? this.totalTime(this.totalDuration() * e, i) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
  }, t.progress = function(e, i) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - e : e) + Qs(this), i) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
  }, t.iteration = function(e, i) {
    var n = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (e - 1) * n, i) : this._repeat ? ai(this._tTime, n) + 1 : 1;
  }, t.timeScale = function(e) {
    if (!arguments.length)
      return this._rts === -tt ? 0 : this._rts;
    if (this._rts === e)
      return this;
    var i = this.parent && this._ts ? Sn(this.parent._time, this) : this._tTime;
    return this._rts = +e || 0, this._ts = this._ps || e === -tt ? 0 : this._rts, this.totalTime(ji(-Math.abs(this._delay), this._tDur, i), !0), Rn(this), yl(this);
  }, t.paused = function(e) {
    return arguments.length ? (this._ps !== e && (this._ps = e, e ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (ui(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== tt && (this._tTime -= tt)))), this) : this._ps;
  }, t.startTime = function(e) {
    if (arguments.length) {
      this._start = e;
      var i = this.parent || this._dp;
      return i && (i._sort || !this.parent) && We(i, this, e - this._delay), this;
    }
    return this._start;
  }, t.endTime = function(e) {
    return this._start + (re(e) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, t.rawTime = function(e) {
    var i = this.parent || this._dp;
    return i ? e && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Sn(i.rawTime(e), this) : this._tTime : this._tTime;
  }, t.revert = function(e) {
    e === void 0 && (e = pl);
    var i = It;
    return It = e, (this._initted || this._startAt) && (this.timeline && this.timeline.revert(e), this.totalTime(-0.01, e.suppressEvents)), this.data !== "nested" && e.kill !== !1 && this.kill(), It = i, this;
  }, t.globalTime = function(e) {
    for (var i = this, n = arguments.length ? e : i.rawTime(); i; )
      n = i._start + n / (i._ts || 1), i = i._dp;
    return !this.parent && this._sat ? this._sat.vars.immediateRender ? -1 : this._sat.globalTime(e) : n;
  }, t.repeat = function(e) {
    return arguments.length ? (this._repeat = e === 1 / 0 ? -2 : e, Js(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, t.repeatDelay = function(e) {
    if (arguments.length) {
      var i = this._time;
      return this._rDelay = e, Js(this), i ? this.time(i) : this;
    }
    return this._rDelay;
  }, t.yoyo = function(e) {
    return arguments.length ? (this._yoyo = e, this) : this._yoyo;
  }, t.seek = function(e, i) {
    return this.totalTime(xe(this, e), re(i));
  }, t.restart = function(e, i) {
    return this.play().totalTime(e ? -this._delay : 0, re(i));
  }, t.play = function(e, i) {
    return e != null && this.seek(e, i), this.reversed(!1).paused(!1);
  }, t.reverse = function(e, i) {
    return e != null && this.seek(e || this.totalDuration(), i), this.reversed(!0).paused(!1);
  }, t.pause = function(e, i) {
    return e != null && this.seek(e, i), this.paused(!0);
  }, t.resume = function() {
    return this.paused(!1);
  }, t.reversed = function(e) {
    return arguments.length ? (!!e !== this.reversed() && this.timeScale(-this._rts || (e ? -tt : 0)), this) : this._rts < 0;
  }, t.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -tt, this;
  }, t.isActive = function() {
    var e = this.parent || this._dp, i = this._start, n;
    return !!(!e || this._ts && this._initted && e.isActive() && (n = e.rawTime(!0)) >= i && n < this.endTime(!0) - tt);
  }, t.eventCallback = function(e, i, n) {
    var s = this.vars;
    return arguments.length > 1 ? (i ? (s[e] = i, n && (s[e + "Params"] = n), e === "onUpdate" && (this._onUpdate = i)) : delete s[e], this) : s[e];
  }, t.then = function(e) {
    var i = this;
    return new Promise(function(n) {
      var s = ht(e) ? e : Uo, o = function() {
        var u = i.then;
        i.then = null, ht(s) && (s = s(i)) && (s.then || s === i) && (i.then = u), n(s), i.then = u;
      };
      i._initted && i.totalProgress() === 1 && i._ts >= 0 || !i._tTime && i._ts < 0 ? o() : i._prom = o;
    });
  }, t.kill = function() {
    Si(this);
  }, a;
}();
Oe(fi.prototype, {
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
  function t(e, i) {
    var n;
    return e === void 0 && (e = {}), n = a.call(this, e) || this, n.labels = {}, n.smoothChildTiming = !!e.smoothChildTiming, n.autoRemoveChildren = !!e.autoRemoveChildren, n._sort = re(e.sortChildren), at && We(e.parent || at, je(n), i), e.reversed && n.reverse(), e.paused && n.paused(!0), e.scrollTrigger && Go(je(n), e.scrollTrigger), n;
  }
  var r = t.prototype;
  return r.to = function(i, n, s) {
    return Ai(0, arguments, this), this;
  }, r.from = function(i, n, s) {
    return Ai(1, arguments, this), this;
  }, r.fromTo = function(i, n, s, o) {
    return Ai(2, arguments, this), this;
  }, r.set = function(i, n, s) {
    return n.duration = 0, n.parent = this, Ei(n).repeatDelay || (n.repeat = 0), n.immediateRender = !!n.immediateRender, new xt(i, n, xe(this, s), 1), this;
  }, r.call = function(i, n, s) {
    return We(this, xt.delayedCall(0, i, n), s);
  }, r.staggerTo = function(i, n, s, o, l, u, f) {
    return s.duration = n, s.stagger = s.stagger || o, s.onComplete = u, s.onCompleteParams = f, s.parent = this, new xt(i, s, xe(this, l)), this;
  }, r.staggerFrom = function(i, n, s, o, l, u, f) {
    return s.runBackwards = 1, Ei(s).immediateRender = re(s.immediateRender), this.staggerTo(i, n, s, o, l, u, f);
  }, r.staggerFromTo = function(i, n, s, o, l, u, f, _) {
    return o.startAt = s, Ei(o).immediateRender = re(o.immediateRender), this.staggerTo(i, n, o, l, u, f, _);
  }, r.render = function(i, n, s) {
    var o = this._time, l = this._dirty ? this.totalDuration() : this._tDur, u = this._dur, f = i <= 0 ? 0 : At(i), _ = this._zTime < 0 != i < 0 && (this._initted || !u), d, h, p, c, g, v, m, y, x, b, P, S;
    if (this !== at && f > l && i >= 0 && (f = l), f !== this._tTime || s || _) {
      if (o !== this._time && u && (f += this._time - o, i += this._time - o), d = f, x = this._start, y = this._ts, v = !y, _ && (u || (o = this._zTime), (i || !n) && (this._zTime = i)), this._repeat) {
        if (P = this._yoyo, g = u + this._rDelay, this._repeat < -1 && i < 0)
          return this.totalTime(g * 100 + i, n, s);
        if (d = At(f % g), f === l ? (c = this._repeat, d = u) : (c = ~~(f / g), c && c === f / g && (d = u, c--), d > u && (d = u)), b = ai(this._tTime, g), !o && this._tTime && b !== c && this._tTime - b * g - this._dur <= 0 && (b = c), P && c & 1 && (d = u - d, S = 1), c !== b && !this._lock) {
          var O = P && b & 1, k = O === (P && c & 1);
          if (c < b && (O = !O), o = O ? 0 : u, this._lock = 1, this.render(o || (S ? 0 : At(c * g)), n, !u)._lock = 0, this._tTime = f, !n && this.parent && Pe(this, "onRepeat"), this.vars.repeatRefresh && !S && (this.invalidate()._lock = 1), o && o !== this._time || v !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (u = this._dur, l = this._tDur, k && (this._lock = 2, o = O ? u : -1e-4, this.render(o, !0), this.vars.repeatRefresh && !S && this.invalidate()), this._lock = 0, !this._ts && !v)
            return this;
          la(this, S);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (m = Tl(this, At(o), At(d)), m && (f -= d - (d = m._start))), this._tTime = f, this._time = d, this._act = !y, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = i, o = 0), !o && d && !n && !c && (Pe(this, "onStart"), this._tTime !== f))
        return this;
      if (d >= o && i >= 0)
        for (h = this._first; h; ) {
          if (p = h._next, (h._act || d >= h._start) && h._ts && m !== h) {
            if (h.parent !== this)
              return this.render(i, n, s);
            if (h.render(h._ts > 0 ? (d - h._start) * h._ts : (h._dirty ? h.totalDuration() : h._tDur) + (d - h._start) * h._ts, n, s), d !== this._time || !this._ts && !v) {
              m = 0, p && (f += this._zTime = -tt);
              break;
            }
          }
          h = p;
        }
      else {
        h = this._last;
        for (var C = i < 0 ? i : d; h; ) {
          if (p = h._prev, (h._act || C <= h._end) && h._ts && m !== h) {
            if (h.parent !== this)
              return this.render(i, n, s);
            if (h.render(h._ts > 0 ? (C - h._start) * h._ts : (h._dirty ? h.totalDuration() : h._tDur) + (C - h._start) * h._ts, n, s || It && (h._initted || h._startAt)), d !== this._time || !this._ts && !v) {
              m = 0, p && (f += this._zTime = C ? -tt : tt);
              break;
            }
          }
          h = p;
        }
      }
      if (m && !n && (this.pause(), m.render(d >= o ? 0 : -tt)._zTime = d >= o ? 1 : -1, this._ts))
        return this._start = x, Rn(this), this.render(i, n, s);
      this._onUpdate && !n && Pe(this, "onUpdate", !0), (f === l && this._tTime >= this.totalDuration() || !f && o) && (x === this._start || Math.abs(y) !== Math.abs(this._ts)) && (this._lock || ((i || !u) && (f === l && this._ts > 0 || !f && this._ts < 0) && mr(this, 1), !n && !(i < 0 && !o) && (f || o || !l) && (Pe(this, f === l && i >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(f < l && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, r.add = function(i, n) {
    var s = this;
    if (er(n) || (n = xe(this, n, i)), !(i instanceof fi)) {
      if (Bt(i))
        return i.forEach(function(o) {
          return s.add(o, n);
        }), this;
      if (Ct(i))
        return this.addLabel(i, n);
      if (ht(i))
        i = xt.delayedCall(0, i);
      else
        return this;
    }
    return this !== i ? We(this, i, n) : this;
  }, r.getChildren = function(i, n, s, o) {
    i === void 0 && (i = !0), n === void 0 && (n = !0), s === void 0 && (s = !0), o === void 0 && (o = -Te);
    for (var l = [], u = this._first; u; )
      u._start >= o && (u instanceof xt ? n && l.push(u) : (s && l.push(u), i && l.push.apply(l, u.getChildren(!0, n, s)))), u = u._next;
    return l;
  }, r.getById = function(i) {
    for (var n = this.getChildren(1, 1, 1), s = n.length; s--; )
      if (n[s].vars.id === i)
        return n[s];
  }, r.remove = function(i) {
    return Ct(i) ? this.removeLabel(i) : ht(i) ? this.killTweensOf(i) : (An(this, i), i === this._recent && (this._recent = this._last), Ar(this));
  }, r.totalTime = function(i, n) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = At(_e.time - (this._ts > 0 ? i / this._ts : (this.totalDuration() - i) / -this._ts))), a.prototype.totalTime.call(this, i, n), this._forcing = 0, this) : this._tTime;
  }, r.addLabel = function(i, n) {
    return this.labels[i] = xe(this, n), this;
  }, r.removeLabel = function(i) {
    return delete this.labels[i], this;
  }, r.addPause = function(i, n, s) {
    var o = xt.delayedCall(0, n || Wi, s);
    return o.data = "isPause", this._hasPause = 1, We(this, o, xe(this, i));
  }, r.removePause = function(i) {
    var n = this._first;
    for (i = xe(this, i); n; )
      n._start === i && n.data === "isPause" && mr(n), n = n._next;
  }, r.killTweensOf = function(i, n, s) {
    for (var o = this.getTweensOf(i, s), l = o.length; l--; )
      lr !== o[l] && o[l].kill(i, n);
    return this;
  }, r.getTweensOf = function(i, n) {
    for (var s = [], o = Se(i), l = this._first, u = er(n), f; l; )
      l instanceof xt ? gl(l._targets, o) && (u ? (!lr || l._initted && l._ts) && l.globalTime(0) <= n && l.globalTime(l.totalDuration()) > n : !n || l.isActive()) && s.push(l) : (f = l.getTweensOf(o, n)).length && s.push.apply(s, f), l = l._next;
    return s;
  }, r.tweenTo = function(i, n) {
    n = n || {};
    var s = this, o = xe(s, i), l = n, u = l.startAt, f = l.onStart, _ = l.onStartParams, d = l.immediateRender, h, p = xt.to(s, Oe({
      ease: n.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: o,
      overwrite: "auto",
      duration: n.duration || Math.abs((o - (u && "time" in u ? u.time : s._time)) / s.timeScale()) || tt,
      onStart: function() {
        if (s.pause(), !h) {
          var g = n.duration || Math.abs((o - (u && "time" in u ? u.time : s._time)) / s.timeScale());
          p._dur !== g && li(p, g, 0, 1).render(p._time, !0, !0), h = 1;
        }
        f && f.apply(p, _ || []);
      }
    }, n));
    return d ? p.render(0) : p;
  }, r.tweenFromTo = function(i, n, s) {
    return this.tweenTo(n, Oe({
      startAt: {
        time: xe(this, i)
      }
    }, s));
  }, r.recent = function() {
    return this._recent;
  }, r.nextLabel = function(i) {
    return i === void 0 && (i = this._time), to(this, xe(this, i));
  }, r.previousLabel = function(i) {
    return i === void 0 && (i = this._time), to(this, xe(this, i), 1);
  }, r.currentLabel = function(i) {
    return arguments.length ? this.seek(i, !0) : this.previousLabel(this._time + tt);
  }, r.shiftChildren = function(i, n, s) {
    s === void 0 && (s = 0);
    for (var o = this._first, l = this.labels, u; o; )
      o._start >= s && (o._start += i, o._end += i), o = o._next;
    if (n)
      for (u in l)
        l[u] >= s && (l[u] += i);
    return Ar(this);
  }, r.invalidate = function(i) {
    var n = this._first;
    for (this._lock = 0; n; )
      n.invalidate(i), n = n._next;
    return a.prototype.invalidate.call(this, i);
  }, r.clear = function(i) {
    i === void 0 && (i = !0);
    for (var n = this._first, s; n; )
      s = n._next, this.remove(n), n = s;
    return this._dp && (this._time = this._tTime = this._pTime = 0), i && (this.labels = {}), Ar(this);
  }, r.totalDuration = function(i) {
    var n = 0, s = this, o = s._last, l = Te, u, f, _;
    if (arguments.length)
      return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -i : i));
    if (s._dirty) {
      for (_ = s.parent; o; )
        u = o._prev, o._dirty && o.totalDuration(), f = o._start, f > l && s._sort && o._ts && !s._lock ? (s._lock = 1, We(s, o, f - o._delay, 1)._lock = 0) : l = f, f < 0 && o._ts && (n -= f, (!_ && !s._dp || _ && _.smoothChildTiming) && (s._start += f / s._ts, s._time -= f, s._tTime -= f), s.shiftChildren(-f, !1, -1 / 0), l = 0), o._end > n && o._ts && (n = o._end), o = u;
      li(s, s === at && s._time > n ? s._time : n, 1, 1), s._dirty = 0;
    }
    return s._tDur;
  }, t.updateRoot = function(i) {
    if (at._ts && (Wo(at, Sn(i, at)), Bo = _e.frame), _e.frame >= js) {
      js += ge.autoSleep || 120;
      var n = at._first;
      if ((!n || !n._ts) && ge.autoSleep && _e._listeners.length < 2) {
        for (; n && !n._ts; )
          n = n._next;
        n || _e.sleep();
      }
    }
  }, t;
}(fi);
Oe(ee.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var Il = function(t, r, e, i, n, s, o) {
  var l = new ne(this._pt, t, r, 0, 1, ga, null, n), u = 0, f = 0, _, d, h, p, c, g, v, m;
  for (l.b = e, l.e = i, e += "", i += "", (v = ~i.indexOf("random(")) && (i = Vi(i)), s && (m = [e, i], s(m, t, r), e = m[0], i = m[1]), d = e.match(Nn) || []; _ = Nn.exec(i); )
    p = _[0], c = i.substring(u, _.index), h ? h = (h + 1) % 5 : c.substr(-5) === "rgba(" && (h = 1), p !== d[f++] && (g = parseFloat(d[f - 1]) || 0, l._pt = {
      _next: l._pt,
      p: c || f === 1 ? c : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: g,
      c: p.charAt(1) === "=" ? ei(g, p) - g : parseFloat(p) - g,
      m: h && h < 4 ? Math.round : 0
    }, u = Nn.lastIndex);
  return l.c = u < i.length ? i.substring(u, i.length) : "", l.fp = o, (Lo.test(i) || v) && (l.e = 0), this._pt = l, l;
}, Rs = function(t, r, e, i, n, s, o, l, u, f) {
  ht(i) && (i = i(n || 0, t, s));
  var _ = t[r], d = e !== "get" ? e : ht(_) ? u ? t[r.indexOf("set") || !ht(t["get" + r.substr(3)]) ? r : "get" + r.substr(3)](u) : t[r]() : _, h = ht(_) ? u ? Ul : _a : Ls, p;
  if (Ct(i) && (~i.indexOf("random(") && (i = Vi(i)), i.charAt(1) === "=" && (p = ei(d, i) + (Yt(d) || 0), (p || p === 0) && (i = p))), !f || d !== i || ls)
    return !isNaN(d * i) && i !== "" ? (p = new ne(this._pt, t, r, +d || 0, i - (d || 0), typeof _ == "boolean" ? $l : pa, 0, h), u && (p.fp = u), o && p.modifier(o, this, t), this._pt = p) : (!_ && !(r in t) && Cs(r, i), Il.call(this, t, r, d, i, h, l || ge.stringFilter, u));
}, Bl = function(t, r, e, i, n) {
  if (ht(t) && (t = Ri(t, n, r, e, i)), !$e(t) || t.style && t.nodeType || Bt(t) || Ro(t))
    return Ct(t) ? Ri(t, n, r, e, i) : t;
  var s = {}, o;
  for (o in t)
    s[o] = Ri(t[o], n, r, e, i);
  return s;
}, ha = function(t, r, e, i, n, s) {
  var o, l, u, f;
  if (ce[t] && (o = new ce[t]()).init(n, o.rawVars ? r[t] : Bl(r[t], i, n, s, e), e, i, s) !== !1 && (e._pt = l = new ne(e._pt, n, t, 0, 1, o.render, o, 0, o.priority), e !== Qr))
    for (u = e._ptLookup[e._targets.indexOf(n)], f = o._props.length; f--; )
      u[o._props[f]] = l;
  return o;
}, lr, ls, zs = function a(t, r, e) {
  var i = t.vars, n = i.ease, s = i.startAt, o = i.immediateRender, l = i.lazy, u = i.onUpdate, f = i.onUpdateParams, _ = i.callbackScope, d = i.runBackwards, h = i.yoyoEase, p = i.keyframes, c = i.autoRevert, g = t._dur, v = t._startAt, m = t._targets, y = t.parent, x = y && y.data === "nested" ? y.vars.targets : m, b = t._overwrite === "auto" && !Ps, P = t.timeline, S, O, k, C, z, D, j, B, Y, G, L, q, Q;
  if (P && (!p || !n) && (n = "none"), t._ease = Rr(n, oi.ease), t._yEase = h ? aa(Rr(h === !0 ? n : h, oi.ease)) : 0, h && t._yoyo && !t._repeat && (h = t._yEase, t._yEase = t._ease, t._ease = h), t._from = !P && !!i.runBackwards, !P || p && !i.stagger) {
    if (B = m[0] ? Er(m[0]).harness : 0, q = B && i[B.prop], S = Tn(i, Ds), v && (v._zTime < 0 && v.progress(1), r < 0 && d && o && !c ? v.render(-1, !0) : v.revert(d && g ? fn : _l), v._lazy = 0), s) {
      if (mr(t._startAt = xt.set(m, Oe({
        data: "isStart",
        overwrite: !1,
        parent: y,
        immediateRender: !0,
        lazy: !v && re(l),
        startAt: null,
        delay: 0,
        onUpdate: u,
        onUpdateParams: f,
        callbackScope: _,
        stagger: 0
      }, s))), t._startAt._dp = 0, t._startAt._sat = t, r < 0 && (It || !o && !c) && t._startAt.revert(fn), o && g && r <= 0 && e <= 0) {
        r && (t._zTime = r);
        return;
      }
    } else if (d && g && !v) {
      if (r && (o = !1), k = Oe({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: o && !v && re(l),
        immediateRender: o,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: y
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y:gsap.utils.wrap([-100,100])})
      }, S), q && (k[B.prop] = q), mr(t._startAt = xt.set(m, k)), t._startAt._dp = 0, t._startAt._sat = t, r < 0 && (It ? t._startAt.revert(fn) : t._startAt.render(-1, !0)), t._zTime = r, !o)
        a(t._startAt, tt, tt);
      else if (!r)
        return;
    }
    for (t._pt = t._ptCache = 0, l = g && re(l) || l && !g, O = 0; O < m.length; O++) {
      if (z = m[O], j = z._gsap || As(m)[O]._gsap, t._ptLookup[O] = G = {}, rs[j.id] && _r.length && bn(), L = x === m ? O : x.indexOf(z), B && (Y = new B()).init(z, q || S, t, L, x) !== !1 && (t._pt = C = new ne(t._pt, z, Y.name, 0, 1, Y.render, Y, 0, Y.priority), Y._props.forEach(function(w) {
        G[w] = C;
      }), Y.priority && (D = 1)), !B || q)
        for (k in S)
          ce[k] && (Y = ha(k, S, t, L, z, x)) ? Y.priority && (D = 1) : G[k] = C = Rs.call(t, z, k, "get", S[k], L, x, 0, i.stringFilter);
      t._op && t._op[O] && t.kill(z, t._op[O]), b && t._pt && (lr = t, at.killTweensOf(z, G, t.globalTime(r)), Q = !t.parent, lr = 0), t._pt && l && (rs[j.id] = 1);
    }
    D && ma(t), t._onInit && t._onInit(t);
  }
  t._onUpdate = u, t._initted = (!t._op || t._pt) && !Q, p && r <= 0 && P.render(Te, !0, !0);
}, Xl = function(t, r, e, i, n, s, o) {
  var l = (t._pt && t._ptCache || (t._ptCache = {}))[r], u, f, _, d;
  if (!l)
    for (l = t._ptCache[r] = [], _ = t._ptLookup, d = t._targets.length; d--; ) {
      if (u = _[d][r], u && u.d && u.d._pt)
        for (u = u.d._pt; u && u.p !== r && u.fp !== r; )
          u = u._next;
      if (!u)
        return ls = 1, t.vars[r] = "+=0", zs(t, o), ls = 0, 1;
      l.push(u);
    }
  for (d = l.length; d--; )
    f = l[d], u = f._pt || f, u.s = (i || i === 0) && !n ? i : u.s + (i || 0) + s * u.c, u.c = e - u.s, f.e && (f.e = pt(e) + Yt(f.e)), f.b && (f.b = u.s + Yt(f.b));
}, Wl = function(t, r) {
  var e = t[0] ? Er(t[0]).harness : 0, i = e && e.aliases, n, s, o, l;
  if (!i)
    return r;
  n = Nr({}, r);
  for (s in i)
    if (s in n)
      for (l = i[s].split(","), o = l.length; o--; )
        n[l[o]] = n[s];
  return n;
}, Vl = function(t, r, e, i) {
  var n = r.ease || i || "power1.inOut", s, o;
  if (Bt(r))
    o = e[t] || (e[t] = []), r.forEach(function(l, u) {
      return o.push({
        t: u / (r.length - 1) * 100,
        v: l,
        e: n
      });
    });
  else
    for (s in r)
      o = e[s] || (e[s] = []), s === "ease" || o.push({
        t: parseFloat(t),
        v: r[s],
        e: n
      });
}, Ri = function(t, r, e, i, n) {
  return ht(t) ? t.call(r, e, i, n) : Ct(t) && ~t.indexOf("random(") ? Vi(t) : t;
}, ca = Es + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", da = {};
ie(ca + ",id,stagger,delay,duration,paused,scrollTrigger", function(a) {
  return da[a] = 1;
});
var xt = /* @__PURE__ */ function(a) {
  Eo(t, a);
  function t(e, i, n, s) {
    var o;
    typeof i == "number" && (n.duration = i, i = n, n = null), o = a.call(this, s ? i : Ei(i)) || this;
    var l = o.vars, u = l.duration, f = l.delay, _ = l.immediateRender, d = l.stagger, h = l.overwrite, p = l.keyframes, c = l.defaults, g = l.scrollTrigger, v = l.yoyoEase, m = i.parent || at, y = (Bt(e) || Ro(e) ? er(e[0]) : "length" in i) ? [e] : Se(e), x, b, P, S, O, k, C, z;
    if (o._targets = y.length ? As(y) : wn("GSAP target " + e + " not found. https://greensock.com", !ge.nullTargetWarn) || [], o._ptLookup = [], o._overwrite = h, p || d || Zi(u) || Zi(f)) {
      if (i = o.vars, x = o.timeline = new ee({
        data: "nested",
        defaults: c || {},
        targets: m && m.data === "nested" ? m.vars.targets : y
      }), x.kill(), x.parent = x._dp = je(o), x._start = 0, d || Zi(u) || Zi(f)) {
        if (S = y.length, C = d && Zo(d), $e(d))
          for (O in d)
            ~ca.indexOf(O) && (z || (z = {}), z[O] = d[O]);
        for (b = 0; b < S; b++)
          P = Tn(i, da), P.stagger = 0, v && (P.yoyoEase = v), z && Nr(P, z), k = y[b], P.duration = +Ri(u, je(o), b, k, y), P.delay = (+Ri(f, je(o), b, k, y) || 0) - o._delay, !d && S === 1 && P.delay && (o._delay = f = P.delay, o._start += f, P.delay = 0), x.to(k, P, C ? C(b, k, y) : 0), x._ease = K.none;
        x.duration() ? u = f = 0 : o.timeline = 0;
      } else if (p) {
        Ei(Oe(x.vars.defaults, {
          ease: "none"
        })), x._ease = Rr(p.ease || i.ease || "none");
        var D = 0, j, B, Y;
        if (Bt(p))
          p.forEach(function(G) {
            return x.to(y, G, ">");
          }), x.duration();
        else {
          P = {};
          for (O in p)
            O === "ease" || O === "easeEach" || Vl(O, p[O], P, p.easeEach);
          for (O in P)
            for (j = P[O].sort(function(G, L) {
              return G.t - L.t;
            }), D = 0, b = 0; b < j.length; b++)
              B = j[b], Y = {
                ease: B.e,
                duration: (B.t - (b ? j[b - 1].t : 0)) / 100 * u
              }, Y[O] = B.v, x.to(y, Y, D), D += Y.duration;
          x.duration() < u && x.to({}, {
            duration: u - x.duration()
          });
        }
      }
      u || o.duration(u = x.duration());
    } else
      o.timeline = 0;
    return h === !0 && !Ps && (lr = je(o), at.killTweensOf(y), lr = 0), We(m, je(o), n), i.reversed && o.reverse(), i.paused && o.paused(!0), (_ || !u && !p && o._start === At(m._time) && re(_) && xl(je(o)) && m.data !== "nested") && (o._tTime = -tt, o.render(Math.max(0, -f) || 0)), g && Go(je(o), g), o;
  }
  var r = t.prototype;
  return r.render = function(i, n, s) {
    var o = this._time, l = this._tDur, u = this._dur, f = i < 0, _ = i > l - tt && !f ? l : i < tt ? 0 : i, d, h, p, c, g, v, m, y, x;
    if (!u)
      bl(this, i, n, s);
    else if (_ !== this._tTime || !i || s || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== f) {
      if (d = _, y = this.timeline, this._repeat) {
        if (c = u + this._rDelay, this._repeat < -1 && f)
          return this.totalTime(c * 100 + i, n, s);
        if (d = At(_ % c), _ === l ? (p = this._repeat, d = u) : (p = ~~(_ / c), p && p === _ / c && (d = u, p--), d > u && (d = u)), v = this._yoyo && p & 1, v && (x = this._yEase, d = u - d), g = ai(this._tTime, c), d === o && !s && this._initted)
          return this._tTime = _, this;
        p !== g && (y && this._yEase && la(y, v), this.vars.repeatRefresh && !v && !this._lock && (this._lock = s = 1, this.render(At(c * p), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (qo(this, f ? i : d, s, n, _))
          return this._tTime = 0, this;
        if (o !== this._time)
          return this;
        if (u !== this._dur)
          return this.render(i, n, s);
      }
      if (this._tTime = _, this._time = d, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = m = (x || this._ease)(d / u), this._from && (this.ratio = m = 1 - m), d && !o && !n && !p && (Pe(this, "onStart"), this._tTime !== _))
        return this;
      for (h = this._pt; h; )
        h.r(m, h.d), h = h._next;
      y && y.render(i < 0 ? i : !d && v ? -tt : y._dur * y._ease(d / this._dur), n, s) || this._startAt && (this._zTime = i), this._onUpdate && !n && (f && is(this, i, n, s), Pe(this, "onUpdate")), this._repeat && p !== g && this.vars.onRepeat && !n && this.parent && Pe(this, "onRepeat"), (_ === this._tDur || !_) && this._tTime === _ && (f && !this._onUpdate && is(this, i, !0, !0), (i || !u) && (_ === this._tDur && this._ts > 0 || !_ && this._ts < 0) && mr(this, 1), !n && !(f && !o) && (_ || o || v) && (Pe(this, _ === l ? "onComplete" : "onReverseComplete", !0), this._prom && !(_ < l && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, r.targets = function() {
    return this._targets;
  }, r.invalidate = function(i) {
    return (!i || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(i), a.prototype.invalidate.call(this, i);
  }, r.resetTo = function(i, n, s, o) {
    Ui || _e.wake(), this._ts || this.play();
    var l = Math.min(this._dur, (this._dp._time - this._start) * this._ts), u;
    return this._initted || zs(this, l), u = this._ease(l / this._dur), Xl(this, i, n, s, o, u, l) ? this.resetTo(i, n, s, o) : (zn(this, 0), this.parent || Ho(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, r.kill = function(i, n) {
    if (n === void 0 && (n = "all"), !i && (!n || n === "all"))
      return this._lazy = this._pt = 0, this.parent ? Si(this) : this;
    if (this.timeline) {
      var s = this.timeline.totalDuration();
      return this.timeline.killTweensOf(i, n, lr && lr.vars.overwrite !== !0)._first || Si(this), this.parent && s !== this.timeline.totalDuration() && li(this, this._dur * this.timeline._tDur / s, 0, 1), this;
    }
    var o = this._targets, l = i ? Se(i) : o, u = this._ptLookup, f = this._pt, _, d, h, p, c, g, v;
    if ((!n || n === "all") && vl(o, l))
      return n === "all" && (this._pt = 0), Si(this);
    for (_ = this._op = this._op || [], n !== "all" && (Ct(n) && (c = {}, ie(n, function(m) {
      return c[m] = 1;
    }), n = c), n = Wl(o, n)), v = o.length; v--; )
      if (~l.indexOf(o[v])) {
        d = u[v], n === "all" ? (_[v] = n, p = d, h = {}) : (h = _[v] = _[v] || {}, p = n);
        for (c in p)
          g = d && d[c], g && ((!("kill" in g.d) || g.d.kill(c) === !0) && An(this, g, "_pt"), delete d[c]), h !== "all" && (h[c] = 1);
      }
    return this._initted && !this._pt && f && Si(this), this;
  }, t.to = function(i, n) {
    return new t(i, n, arguments[2]);
  }, t.from = function(i, n) {
    return Ai(1, arguments);
  }, t.delayedCall = function(i, n, s, o) {
    return new t(n, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: i,
      onComplete: n,
      onReverseComplete: n,
      onCompleteParams: s,
      onReverseCompleteParams: s,
      callbackScope: o
    });
  }, t.fromTo = function(i, n, s) {
    return Ai(2, arguments);
  }, t.set = function(i, n) {
    return n.duration = 0, n.repeatDelay || (n.repeat = 0), new t(i, n);
  }, t.killTweensOf = function(i, n, s) {
    return at.killTweensOf(i, n, s);
  }, t;
}(fi);
Oe(xt.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
ie("staggerTo,staggerFrom,staggerFromTo", function(a) {
  xt[a] = function() {
    var t = new ee(), r = ss.call(arguments, 0);
    return r.splice(a === "staggerFromTo" ? 5 : 4, 0, 0), t[a].apply(t, r);
  };
});
var Ls = function(t, r, e) {
  return t[r] = e;
}, _a = function(t, r, e) {
  return t[r](e);
}, Ul = function(t, r, e, i) {
  return t[r](i.fp, e);
}, Hl = function(t, r, e) {
  return t.setAttribute(r, e);
}, Fs = function(t, r) {
  return ht(t[r]) ? _a : ks(t[r]) && t.setAttribute ? Hl : Ls;
}, pa = function(t, r) {
  return r.set(r.t, r.p, Math.round((r.s + r.c * t) * 1e6) / 1e6, r);
}, $l = function(t, r) {
  return r.set(r.t, r.p, !!(r.s + r.c * t), r);
}, ga = function(t, r) {
  var e = r._pt, i = "";
  if (!t && r.b)
    i = r.b;
  else if (t === 1 && r.e)
    i = r.e;
  else {
    for (; e; )
      i = e.p + (e.m ? e.m(e.s + e.c * t) : Math.round((e.s + e.c * t) * 1e4) / 1e4) + i, e = e._next;
    i += r.c;
  }
  r.set(r.t, r.p, i, r);
}, Ns = function(t, r) {
  for (var e = r._pt; e; )
    e.r(t, e.d), e = e._next;
}, Gl = function(t, r, e, i) {
  for (var n = this._pt, s; n; )
    s = n._next, n.p === i && n.modifier(t, r, e), n = s;
}, ql = function(t) {
  for (var r = this._pt, e, i; r; )
    i = r._next, r.p === t && !r.op || r.op === t ? An(this, r, "_pt") : r.dep || (e = 1), r = i;
  return !e;
}, Kl = function(t, r, e, i) {
  i.mSet(t, r, i.m.call(i.tween, e, i.mt), i);
}, ma = function(t) {
  for (var r = t._pt, e, i, n, s; r; ) {
    for (e = r._next, i = n; i && i.pr > r.pr; )
      i = i._next;
    (r._prev = i ? i._prev : s) ? r._prev._next = r : n = r, (r._next = i) ? i._prev = r : s = r, r = e;
  }
  t._pt = n;
}, ne = /* @__PURE__ */ function() {
  function a(r, e, i, n, s, o, l, u, f) {
    this.t = e, this.s = n, this.c = s, this.p = i, this.r = o || pa, this.d = l || this, this.set = u || Ls, this.pr = f || 0, this._next = r, r && (r._prev = this);
  }
  var t = a.prototype;
  return t.modifier = function(e, i, n) {
    this.mSet = this.mSet || this.set, this.set = Kl, this.m = e, this.mt = n, this.tween = i;
  }, a;
}();
ie(Es + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(a) {
  return Ds[a] = 1;
});
me.TweenMax = me.TweenLite = xt;
me.TimelineLite = me.TimelineMax = ee;
at = new ee({
  sortChildren: !1,
  defaults: oi,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
ge.stringFilter = oa;
var hi = [], cn = {}, jl = [], ro = 0, Wn = function(t) {
  return (cn[t] || jl).map(function(r) {
    return r();
  });
}, us = function() {
  var t = Date.now(), r = [];
  t - ro > 2 && (Wn("matchMediaInit"), hi.forEach(function(e) {
    var i = e.queries, n = e.conditions, s, o, l, u;
    for (o in i)
      s = we.matchMedia(i[o]).matches, s && (l = 1), s !== n[o] && (n[o] = s, u = 1);
    u && (e.revert(), l && r.push(e));
  }), Wn("matchMediaRevert"), r.forEach(function(e) {
    return e.onMatch(e);
  }), ro = t, Wn("matchMedia"));
}, va = /* @__PURE__ */ function() {
  function a(r, e) {
    this.selector = e && os(e), this.data = [], this._r = [], this.isReverted = !1, r && this.add(r);
  }
  var t = a.prototype;
  return t.add = function(e, i, n) {
    ht(e) && (n = i, i = e, e = ht);
    var s = this, o = function() {
      var u = vt, f = s.selector, _;
      return u && u !== s && u.data.push(s), n && (s.selector = os(n)), vt = s, _ = i.apply(s, arguments), ht(_) && s._r.push(_), vt = u, s.selector = f, s.isReverted = !1, _;
    };
    return s.last = o, e === ht ? o(s) : e ? s[e] = o : o;
  }, t.ignore = function(e) {
    var i = vt;
    vt = null, e(this), vt = i;
  }, t.getTweens = function() {
    var e = [];
    return this.data.forEach(function(i) {
      return i instanceof a ? e.push.apply(e, i.getTweens()) : i instanceof xt && !(i.parent && i.parent.data === "nested") && e.push(i);
    }), e;
  }, t.clear = function() {
    this._r.length = this.data.length = 0;
  }, t.kill = function(e, i) {
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
        return !(l instanceof fi) && l.revert && l.revert(e);
      }), this._r.forEach(function(l) {
        return l(e, n);
      }), this.isReverted = !0;
    } else
      this.data.forEach(function(l) {
        return l.kill && l.kill();
      });
    if (this.clear(), i) {
      var o = hi.indexOf(this);
      ~o && hi.splice(o, 1);
    }
  }, t.revert = function(e) {
    this.kill(e || {});
  }, a;
}(), Zl = /* @__PURE__ */ function() {
  function a(r) {
    this.contexts = [], this.scope = r;
  }
  var t = a.prototype;
  return t.add = function(e, i, n) {
    $e(e) || (e = {
      matches: e
    });
    var s = new va(0, n || this.scope), o = s.conditions = {}, l, u, f;
    this.contexts.push(s), i = s.add("onMatch", i), s.queries = e;
    for (u in e)
      u === "all" ? f = 1 : (l = we.matchMedia(e[u]), l && (hi.indexOf(s) < 0 && hi.push(s), (o[u] = l.matches) && (f = 1), l.addListener ? l.addListener(us) : l.addEventListener("change", us)));
    return f && i(s), this;
  }, t.revert = function(e) {
    this.kill(e || {});
  }, t.kill = function(e) {
    this.contexts.forEach(function(i) {
      return i.kill(e, !0);
    });
  }, a;
}(), Pn = {
  registerPlugin: function() {
    for (var t = arguments.length, r = new Array(t), e = 0; e < t; e++)
      r[e] = arguments[e];
    r.forEach(function(i) {
      return ia(i);
    });
  },
  timeline: function(t) {
    return new ee(t);
  },
  getTweensOf: function(t, r) {
    return at.getTweensOf(t, r);
  },
  getProperty: function(t, r, e, i) {
    Ct(t) && (t = Se(t)[0]);
    var n = Er(t || {}).get, s = e ? Uo : Vo;
    return e === "native" && (e = ""), t && (r ? s((ce[r] && ce[r].get || n)(t, r, e, i)) : function(o, l, u) {
      return s((ce[o] && ce[o].get || n)(t, o, l, u));
    });
  },
  quickSetter: function(t, r, e) {
    if (t = Se(t), t.length > 1) {
      var i = t.map(function(f) {
        return se.quickSetter(f, r, e);
      }), n = i.length;
      return function(f) {
        for (var _ = n; _--; )
          i[_](f);
      };
    }
    t = t[0] || {};
    var s = ce[r], o = Er(t), l = o.harness && (o.harness.aliases || {})[r] || r, u = s ? function(f) {
      var _ = new s();
      Qr._pt = 0, _.init(t, e ? f + e : f, Qr, 0, [t]), _.render(1, _), Qr._pt && Ns(1, Qr);
    } : o.set(t, l);
    return s ? u : function(f) {
      return u(t, l, e ? f + e : f, o, 1);
    };
  },
  quickTo: function(t, r, e) {
    var i, n = se.to(t, Nr((i = {}, i[r] = "+=0.1", i.paused = !0, i), e || {})), s = function(l, u, f) {
      return n.resetTo(r, l, u, f);
    };
    return s.tween = n, s;
  },
  isTweening: function(t) {
    return at.getTweensOf(t, !0).length > 0;
  },
  defaults: function(t) {
    return t && t.ease && (t.ease = Rr(t.ease, oi.ease)), Zs(oi, t || {});
  },
  config: function(t) {
    return Zs(ge, t || {});
  },
  registerEffect: function(t) {
    var r = t.name, e = t.effect, i = t.plugins, n = t.defaults, s = t.extendTimeline;
    (i || "").split(",").forEach(function(o) {
      return o && !ce[o] && !me[o] && wn(r + " effect requires " + o + " plugin.");
    }), Yn[r] = function(o, l, u) {
      return e(Se(o), Oe(l || {}, n), u);
    }, s && (ee.prototype[r] = function(o, l, u) {
      return this.add(Yn[r](o, $e(l) ? l : (u = l) && {}, this), u);
    });
  },
  registerEase: function(t, r) {
    K[t] = Rr(r);
  },
  parseEase: function(t, r) {
    return arguments.length ? Rr(t, r) : K;
  },
  getById: function(t) {
    return at.getById(t);
  },
  exportRoot: function(t, r) {
    t === void 0 && (t = {});
    var e = new ee(t), i, n;
    for (e.smoothChildTiming = re(t.smoothChildTiming), at.remove(e), e._dp = 0, e._time = e._tTime = at._time, i = at._first; i; )
      n = i._next, (r || !(!i._dur && i instanceof xt && i.vars.onComplete === i._targets[0])) && We(e, i, i._start - i._delay), i = n;
    return We(at, e, 0), e;
  },
  context: function(t, r) {
    return t ? new va(t, r) : vt;
  },
  matchMedia: function(t) {
    return new Zl(t);
  },
  matchMediaRefresh: function() {
    return hi.forEach(function(t) {
      var r = t.conditions, e, i;
      for (i in r)
        r[i] && (r[i] = !1, e = 1);
      e && t.revert();
    }) || us();
  },
  addEventListener: function(t, r) {
    var e = cn[t] || (cn[t] = []);
    ~e.indexOf(r) || e.push(r);
  },
  removeEventListener: function(t, r) {
    var e = cn[t], i = e && e.indexOf(r);
    i >= 0 && e.splice(i, 1);
  },
  utils: {
    wrap: Dl,
    wrapYoyo: El,
    distribute: Zo,
    random: Jo,
    snap: Qo,
    normalize: Cl,
    getUnit: Yt,
    clamp: Pl,
    splitColor: na,
    toArray: Se,
    selector: os,
    mapRange: ea,
    pipe: Ol,
    unitize: Ml,
    interpolate: Al,
    shuffle: jo
  },
  install: Yo,
  effects: Yn,
  ticker: _e,
  updateRoot: ee.updateRoot,
  plugins: ce,
  globalTimeline: at,
  core: {
    PropTween: ne,
    globals: Io,
    Tween: xt,
    Timeline: ee,
    Animation: fi,
    getCache: Er,
    _removeLinkedListItem: An,
    reverting: function() {
      return It;
    },
    context: function(t) {
      return t && vt && (vt.data.push(t), t._ctx = vt), vt;
    },
    suppressOverwrites: function(t) {
      return Ps = t;
    }
  }
};
ie("to,from,fromTo,delayedCall,set,killTweensOf", function(a) {
  return Pn[a] = xt[a];
});
_e.add(ee.updateRoot);
Qr = Pn.to({}, {
  duration: 0
});
var Ql = function(t, r) {
  for (var e = t._pt; e && e.p !== r && e.op !== r && e.fp !== r; )
    e = e._next;
  return e;
}, Jl = function(t, r) {
  var e = t._targets, i, n, s;
  for (i in r)
    for (n = e.length; n--; )
      s = t._ptLookup[n][i], s && (s = s.d) && (s._pt && (s = Ql(s, i)), s && s.modifier && s.modifier(r[i], t, e[n], i));
}, Vn = function(t, r) {
  return {
    name: t,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(i, n, s) {
      s._onInit = function(o) {
        var l, u;
        if (Ct(n) && (l = {}, ie(n, function(f) {
          return l[f] = 1;
        }), n = l), r) {
          l = {};
          for (u in n)
            l[u] = r(n[u]);
          n = l;
        }
        Jl(o, n);
      };
    }
  };
}, se = Pn.registerPlugin({
  name: "attr",
  init: function(t, r, e, i, n) {
    var s, o, l;
    this.tween = e;
    for (s in r)
      l = t.getAttribute(s) || "", o = this.add(t, "setAttribute", (l || 0) + "", r[s], i, n, 0, 0, s), o.op = s, o.b = l, this._props.push(s);
  },
  render: function(t, r) {
    for (var e = r._pt; e; )
      It ? e.set(e.t, e.p, e.b, e) : e.r(t, e.d), e = e._next;
  }
}, {
  name: "endArray",
  init: function(t, r) {
    for (var e = r.length; e--; )
      this.add(t, e, t[e] || 0, r[e], 0, 0, 0, 0, 0, 1);
  }
}, Vn("roundProps", as), Vn("modifiers"), Vn("snap", Qo)) || Pn;
xt.version = ee.version = se.version = "3.11.5";
No = 1;
Os() && ui();
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
var io, ur, ri, Ys, Cr, no, Is, tu = function() {
  return typeof window < "u";
}, rr = {}, Or = 180 / Math.PI, ii = Math.PI / 180, $r = Math.atan2, so = 1e8, Bs = /([A-Z])/g, eu = /(left|right|width|margin|padding|x)/i, ru = /[\s,\(]\S/, Ve = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, fs = function(t, r) {
  return r.set(r.t, r.p, Math.round((r.s + r.c * t) * 1e4) / 1e4 + r.u, r);
}, iu = function(t, r) {
  return r.set(r.t, r.p, t === 1 ? r.e : Math.round((r.s + r.c * t) * 1e4) / 1e4 + r.u, r);
}, nu = function(t, r) {
  return r.set(r.t, r.p, t ? Math.round((r.s + r.c * t) * 1e4) / 1e4 + r.u : r.b, r);
}, su = function(t, r) {
  var e = r.s + r.c * t;
  r.set(r.t, r.p, ~~(e + (e < 0 ? -0.5 : 0.5)) + r.u, r);
}, ya = function(t, r) {
  return r.set(r.t, r.p, t ? r.e : r.b, r);
}, xa = function(t, r) {
  return r.set(r.t, r.p, t !== 1 ? r.b : r.e, r);
}, ou = function(t, r, e) {
  return t.style[r] = e;
}, au = function(t, r, e) {
  return t.style.setProperty(r, e);
}, lu = function(t, r, e) {
  return t._gsap[r] = e;
}, uu = function(t, r, e) {
  return t._gsap.scaleX = t._gsap.scaleY = e;
}, fu = function(t, r, e, i, n) {
  var s = t._gsap;
  s.scaleX = s.scaleY = e, s.renderTransform(n, s);
}, hu = function(t, r, e, i, n) {
  var s = t._gsap;
  s[r] = e, s.renderTransform(n, s);
}, lt = "transform", Fe = lt + "Origin", cu = function a(t, r) {
  var e = this, i = this.target, n = i.style;
  if (t in rr) {
    if (this.tfm = this.tfm || {}, t !== "transform")
      t = Ve[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(s) {
        return e.tfm[s] = Ze(i, s);
      }) : this.tfm[t] = i._gsap.x ? i._gsap[t] : Ze(i, t);
    else
      return Ve.transform.split(",").forEach(function(s) {
        return a.call(e, s, r);
      });
    if (this.props.indexOf(lt) >= 0)
      return;
    i._gsap.svg && (this.svgo = i.getAttribute("data-svg-origin"), this.props.push(Fe, r, "")), t = lt;
  }
  (n || r) && this.props.push(t, r, n[t]);
}, wa = function(t) {
  t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
}, du = function() {
  var t = this.props, r = this.target, e = r.style, i = r._gsap, n, s;
  for (n = 0; n < t.length; n += 3)
    t[n + 1] ? r[t[n]] = t[n + 2] : t[n + 2] ? e[t[n]] = t[n + 2] : e.removeProperty(t[n].substr(0, 2) === "--" ? t[n] : t[n].replace(Bs, "-$1").toLowerCase());
  if (this.tfm) {
    for (s in this.tfm)
      i[s] = this.tfm[s];
    i.svg && (i.renderTransform(), r.setAttribute("data-svg-origin", this.svgo || "")), n = Is(), (!n || !n.isStart) && !e[lt] && (wa(e), i.uncache = 1);
  }
}, ba = function(t, r) {
  var e = {
    target: t,
    props: [],
    revert: du,
    save: cu
  };
  return t._gsap || se.core.getCache(t), r && r.split(",").forEach(function(i) {
    return e.save(i);
  }), e;
}, Ta, hs = function(t, r) {
  var e = ur.createElementNS ? ur.createElementNS((r || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : ur.createElement(t);
  return e.style ? e : ur.createElement(t);
}, Ue = function a(t, r, e) {
  var i = getComputedStyle(t);
  return i[r] || i.getPropertyValue(r.replace(Bs, "-$1").toLowerCase()) || i.getPropertyValue(r) || !e && a(t, ci(r) || r, 1) || "";
}, oo = "O,Moz,ms,Ms,Webkit".split(","), ci = function(t, r, e) {
  var i = r || Cr, n = i.style, s = 5;
  if (t in n && !e)
    return t;
  for (t = t.charAt(0).toUpperCase() + t.substr(1); s-- && !(oo[s] + t in n); )
    ;
  return s < 0 ? null : (s === 3 ? "ms" : s >= 0 ? oo[s] : "") + t;
}, cs = function() {
  tu() && window.document && (io = window, ur = io.document, ri = ur.documentElement, Cr = hs("div") || {
    style: {}
  }, hs("div"), lt = ci(lt), Fe = lt + "Origin", Cr.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Ta = !!ci("perspective"), Is = se.core.reverting, Ys = 1);
}, Un = function a(t) {
  var r = hs("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), e = this.parentNode, i = this.nextSibling, n = this.style.cssText, s;
  if (ri.appendChild(r), r.appendChild(this), this.style.display = "block", t)
    try {
      s = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = a;
    } catch {
    }
  else
    this._gsapBBox && (s = this._gsapBBox());
  return e && (i ? e.insertBefore(this, i) : e.appendChild(this)), ri.removeChild(r), this.style.cssText = n, s;
}, ao = function(t, r) {
  for (var e = r.length; e--; )
    if (t.hasAttribute(r[e]))
      return t.getAttribute(r[e]);
}, Sa = function(t) {
  var r;
  try {
    r = t.getBBox();
  } catch {
    r = Un.call(t, !0);
  }
  return r && (r.width || r.height) || t.getBBox === Un || (r = Un.call(t, !0)), r && !r.width && !r.x && !r.y ? {
    x: +ao(t, ["x", "cx", "x1"]) || 0,
    y: +ao(t, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : r;
}, Pa = function(t) {
  return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && Sa(t));
}, Hi = function(t, r) {
  if (r) {
    var e = t.style;
    r in rr && r !== Fe && (r = lt), e.removeProperty ? ((r.substr(0, 2) === "ms" || r.substr(0, 6) === "webkit") && (r = "-" + r), e.removeProperty(r.replace(Bs, "-$1").toLowerCase())) : e.removeAttribute(r);
  }
}, fr = function(t, r, e, i, n, s) {
  var o = new ne(t._pt, r, e, 0, 1, s ? xa : ya);
  return t._pt = o, o.b = i, o.e = n, t._props.push(e), o;
}, lo = {
  deg: 1,
  rad: 1,
  turn: 1
}, _u = {
  grid: 1,
  flex: 1
}, vr = function a(t, r, e, i) {
  var n = parseFloat(e) || 0, s = (e + "").trim().substr((n + "").length) || "px", o = Cr.style, l = eu.test(r), u = t.tagName.toLowerCase() === "svg", f = (u ? "client" : "offset") + (l ? "Width" : "Height"), _ = 100, d = i === "px", h = i === "%", p, c, g, v;
  return i === s || !n || lo[i] || lo[s] ? n : (s !== "px" && !d && (n = a(t, r, e, "px")), v = t.getCTM && Pa(t), (h || s === "%") && (rr[r] || ~r.indexOf("adius")) ? (p = v ? t.getBBox()[l ? "width" : "height"] : t[f], pt(h ? n / p * _ : n / 100 * p)) : (o[l ? "width" : "height"] = _ + (d ? s : i), c = ~r.indexOf("adius") || i === "em" && t.appendChild && !u ? t : t.parentNode, v && (c = (t.ownerSVGElement || {}).parentNode), (!c || c === ur || !c.appendChild) && (c = ur.body), g = c._gsap, g && h && g.width && l && g.time === _e.time && !g.uncache ? pt(n / g.width * _) : ((h || s === "%") && !_u[Ue(c, "display")] && (o.position = Ue(t, "position")), c === t && (o.position = "static"), c.appendChild(Cr), p = Cr[f], c.removeChild(Cr), o.position = "absolute", l && h && (g = Er(c), g.time = _e.time, g.width = c[f]), pt(d ? p * n / _ : p && n ? _ / p * n : 0))));
}, Ze = function(t, r, e, i) {
  var n;
  return Ys || cs(), r in Ve && r !== "transform" && (r = Ve[r], ~r.indexOf(",") && (r = r.split(",")[0])), rr[r] && r !== "transform" ? (n = Gi(t, i), n = r !== "transformOrigin" ? n[r] : n.svg ? n.origin : On(Ue(t, Fe)) + " " + n.zOrigin + "px") : (n = t.style[r], (!n || n === "auto" || i || ~(n + "").indexOf("calc(")) && (n = kn[r] && kn[r](t, r, e) || Ue(t, r) || Xo(t, r) || (r === "opacity" ? 1 : 0))), e && !~(n + "").trim().indexOf(" ") ? vr(t, r, n, e) + e : n;
}, pu = function(t, r, e, i) {
  if (!e || e === "none") {
    var n = ci(r, t, 1), s = n && Ue(t, n, 1);
    s && s !== e ? (r = n, e = s) : r === "borderColor" && (e = Ue(t, "borderTopColor"));
  }
  var o = new ne(this._pt, t.style, r, 0, 1, ga), l = 0, u = 0, f, _, d, h, p, c, g, v, m, y, x, b;
  if (o.b = e, o.e = i, e += "", i += "", i === "auto" && (t.style[r] = i, i = Ue(t, r) || i, t.style[r] = e), f = [e, i], oa(f), e = f[0], i = f[1], d = e.match(Zr) || [], b = i.match(Zr) || [], b.length) {
    for (; _ = Zr.exec(i); )
      g = _[0], m = i.substring(l, _.index), p ? p = (p + 1) % 5 : (m.substr(-5) === "rgba(" || m.substr(-5) === "hsla(") && (p = 1), g !== (c = d[u++] || "") && (h = parseFloat(c) || 0, x = c.substr((h + "").length), g.charAt(1) === "=" && (g = ei(h, g) + x), v = parseFloat(g), y = g.substr((v + "").length), l = Zr.lastIndex - y.length, y || (y = y || ge.units[r] || x, l === i.length && (i += y, o.e += y)), x !== y && (h = vr(t, r, c, y) || 0), o._pt = {
        _next: o._pt,
        p: m || u === 1 ? m : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: h,
        c: v - h,
        m: p && p < 4 || r === "zIndex" ? Math.round : 0
      });
    o.c = l < i.length ? i.substring(l, i.length) : "";
  } else
    o.r = r === "display" && i === "none" ? xa : ya;
  return Lo.test(i) && (o.e = 0), this._pt = o, o;
}, uo = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, gu = function(t) {
  var r = t.split(" "), e = r[0], i = r[1] || "50%";
  return (e === "top" || e === "bottom" || i === "left" || i === "right") && (t = e, e = i, i = t), r[0] = uo[e] || e, r[1] = uo[i] || i, r.join(" ");
}, mu = function(t, r) {
  if (r.tween && r.tween._time === r.tween._dur) {
    var e = r.t, i = e.style, n = r.u, s = e._gsap, o, l, u;
    if (n === "all" || n === !0)
      i.cssText = "", l = 1;
    else
      for (n = n.split(","), u = n.length; --u > -1; )
        o = n[u], rr[o] && (l = 1, o = o === "transformOrigin" ? Fe : lt), Hi(e, o);
    l && (Hi(e, lt), s && (s.svg && e.removeAttribute("transform"), Gi(e, 1), s.uncache = 1, wa(i)));
  }
}, kn = {
  clearProps: function(t, r, e, i, n) {
    if (n.data !== "isFromStart") {
      var s = t._pt = new ne(t._pt, r, e, 0, 0, mu);
      return s.u = i, s.pr = -10, s.tween = n, t._props.push(e), 1;
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
}, $i = [1, 0, 0, 1, 0, 0], ka = {}, Oa = function(t) {
  return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
}, fo = function(t) {
  var r = Ue(t, lt);
  return Oa(r) ? $i : r.substr(7).match(zo).map(pt);
}, Xs = function(t, r) {
  var e = t._gsap || Er(t), i = t.style, n = fo(t), s, o, l, u;
  return e.svg && t.getAttribute("transform") ? (l = t.transform.baseVal.consolidate().matrix, n = [l.a, l.b, l.c, l.d, l.e, l.f], n.join(",") === "1,0,0,1,0,0" ? $i : n) : (n === $i && !t.offsetParent && t !== ri && !e.svg && (l = i.display, i.display = "block", s = t.parentNode, (!s || !t.offsetParent) && (u = 1, o = t.nextElementSibling, ri.appendChild(t)), n = fo(t), l ? i.display = l : Hi(t, "display"), u && (o ? s.insertBefore(t, o) : s ? s.appendChild(t) : ri.removeChild(t))), r && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n);
}, ds = function(t, r, e, i, n, s) {
  var o = t._gsap, l = n || Xs(t, !0), u = o.xOrigin || 0, f = o.yOrigin || 0, _ = o.xOffset || 0, d = o.yOffset || 0, h = l[0], p = l[1], c = l[2], g = l[3], v = l[4], m = l[5], y = r.split(" "), x = parseFloat(y[0]) || 0, b = parseFloat(y[1]) || 0, P, S, O, k;
  e ? l !== $i && (S = h * g - p * c) && (O = x * (g / S) + b * (-c / S) + (c * m - g * v) / S, k = x * (-p / S) + b * (h / S) - (h * m - p * v) / S, x = O, b = k) : (P = Sa(t), x = P.x + (~y[0].indexOf("%") ? x / 100 * P.width : x), b = P.y + (~(y[1] || y[0]).indexOf("%") ? b / 100 * P.height : b)), i || i !== !1 && o.smooth ? (v = x - u, m = b - f, o.xOffset = _ + (v * h + m * c) - v, o.yOffset = d + (v * p + m * g) - m) : o.xOffset = o.yOffset = 0, o.xOrigin = x, o.yOrigin = b, o.smooth = !!i, o.origin = r, o.originIsAbsolute = !!e, t.style[Fe] = "0px 0px", s && (fr(s, o, "xOrigin", u, x), fr(s, o, "yOrigin", f, b), fr(s, o, "xOffset", _, o.xOffset), fr(s, o, "yOffset", d, o.yOffset)), t.setAttribute("data-svg-origin", x + " " + b);
}, Gi = function(t, r) {
  var e = t._gsap || new fa(t);
  if ("x" in e && !r && !e.uncache)
    return e;
  var i = t.style, n = e.scaleX < 0, s = "px", o = "deg", l = getComputedStyle(t), u = Ue(t, Fe) || "0", f, _, d, h, p, c, g, v, m, y, x, b, P, S, O, k, C, z, D, j, B, Y, G, L, q, Q, w, et, Xt, Me, ut, zt;
  return f = _ = d = c = g = v = m = y = x = 0, h = p = 1, e.svg = !!(t.getCTM && Pa(t)), l.translate && ((l.translate !== "none" || l.scale !== "none" || l.rotate !== "none") && (i[lt] = (l.translate !== "none" ? "translate3d(" + (l.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (l.rotate !== "none" ? "rotate(" + l.rotate + ") " : "") + (l.scale !== "none" ? "scale(" + l.scale.split(" ").join(",") + ") " : "") + (l[lt] !== "none" ? l[lt] : "")), i.scale = i.rotate = i.translate = "none"), S = Xs(t, e.svg), e.svg && (e.uncache ? (q = t.getBBox(), u = e.xOrigin - q.x + "px " + (e.yOrigin - q.y) + "px", L = "") : L = !r && t.getAttribute("data-svg-origin"), ds(t, L || u, !!L || e.originIsAbsolute, e.smooth !== !1, S)), b = e.xOrigin || 0, P = e.yOrigin || 0, S !== $i && (z = S[0], D = S[1], j = S[2], B = S[3], f = Y = S[4], _ = G = S[5], S.length === 6 ? (h = Math.sqrt(z * z + D * D), p = Math.sqrt(B * B + j * j), c = z || D ? $r(D, z) * Or : 0, m = j || B ? $r(j, B) * Or + c : 0, m && (p *= Math.abs(Math.cos(m * ii))), e.svg && (f -= b - (b * z + P * j), _ -= P - (b * D + P * B))) : (zt = S[6], Me = S[7], w = S[8], et = S[9], Xt = S[10], ut = S[11], f = S[12], _ = S[13], d = S[14], O = $r(zt, Xt), g = O * Or, O && (k = Math.cos(-O), C = Math.sin(-O), L = Y * k + w * C, q = G * k + et * C, Q = zt * k + Xt * C, w = Y * -C + w * k, et = G * -C + et * k, Xt = zt * -C + Xt * k, ut = Me * -C + ut * k, Y = L, G = q, zt = Q), O = $r(-j, Xt), v = O * Or, O && (k = Math.cos(-O), C = Math.sin(-O), L = z * k - w * C, q = D * k - et * C, Q = j * k - Xt * C, ut = B * C + ut * k, z = L, D = q, j = Q), O = $r(D, z), c = O * Or, O && (k = Math.cos(O), C = Math.sin(O), L = z * k + D * C, q = Y * k + G * C, D = D * k - z * C, G = G * k - Y * C, z = L, Y = q), g && Math.abs(g) + Math.abs(c) > 359.9 && (g = c = 0, v = 180 - v), h = pt(Math.sqrt(z * z + D * D + j * j)), p = pt(Math.sqrt(G * G + zt * zt)), O = $r(Y, G), m = Math.abs(O) > 2e-4 ? O * Or : 0, x = ut ? 1 / (ut < 0 ? -ut : ut) : 0), e.svg && (L = t.getAttribute("transform"), e.forceCSS = t.setAttribute("transform", "") || !Oa(Ue(t, lt)), L && t.setAttribute("transform", L))), Math.abs(m) > 90 && Math.abs(m) < 270 && (n ? (h *= -1, m += c <= 0 ? 180 : -180, c += c <= 0 ? 180 : -180) : (p *= -1, m += m <= 0 ? 180 : -180)), r = r || e.uncache, e.x = f - ((e.xPercent = f && (!r && e.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-f) ? -50 : 0))) ? t.offsetWidth * e.xPercent / 100 : 0) + s, e.y = _ - ((e.yPercent = _ && (!r && e.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-_) ? -50 : 0))) ? t.offsetHeight * e.yPercent / 100 : 0) + s, e.z = d + s, e.scaleX = pt(h), e.scaleY = pt(p), e.rotation = pt(c) + o, e.rotationX = pt(g) + o, e.rotationY = pt(v) + o, e.skewX = m + o, e.skewY = y + o, e.transformPerspective = x + s, (e.zOrigin = parseFloat(u.split(" ")[2]) || 0) && (i[Fe] = On(u)), e.xOffset = e.yOffset = 0, e.force3D = ge.force3D, e.renderTransform = e.svg ? yu : Ta ? Ma : vu, e.uncache = 0, e;
}, On = function(t) {
  return (t = t.split(" "))[0] + " " + t[1];
}, Hn = function(t, r, e) {
  var i = Yt(r);
  return pt(parseFloat(r) + parseFloat(vr(t, "x", e + "px", i))) + i;
}, vu = function(t, r) {
  r.z = "0px", r.rotationY = r.rotationX = "0deg", r.force3D = 0, Ma(t, r);
}, Pr = "0deg", wi = "0px", kr = ") ", Ma = function(t, r) {
  var e = r || this, i = e.xPercent, n = e.yPercent, s = e.x, o = e.y, l = e.z, u = e.rotation, f = e.rotationY, _ = e.rotationX, d = e.skewX, h = e.skewY, p = e.scaleX, c = e.scaleY, g = e.transformPerspective, v = e.force3D, m = e.target, y = e.zOrigin, x = "", b = v === "auto" && t && t !== 1 || v === !0;
  if (y && (_ !== Pr || f !== Pr)) {
    var P = parseFloat(f) * ii, S = Math.sin(P), O = Math.cos(P), k;
    P = parseFloat(_) * ii, k = Math.cos(P), s = Hn(m, s, S * k * -y), o = Hn(m, o, -Math.sin(P) * -y), l = Hn(m, l, O * k * -y + y);
  }
  g !== wi && (x += "perspective(" + g + kr), (i || n) && (x += "translate(" + i + "%, " + n + "%) "), (b || s !== wi || o !== wi || l !== wi) && (x += l !== wi || b ? "translate3d(" + s + ", " + o + ", " + l + ") " : "translate(" + s + ", " + o + kr), u !== Pr && (x += "rotate(" + u + kr), f !== Pr && (x += "rotateY(" + f + kr), _ !== Pr && (x += "rotateX(" + _ + kr), (d !== Pr || h !== Pr) && (x += "skew(" + d + ", " + h + kr), (p !== 1 || c !== 1) && (x += "scale(" + p + ", " + c + kr), m.style[lt] = x || "translate(0, 0)";
}, yu = function(t, r) {
  var e = r || this, i = e.xPercent, n = e.yPercent, s = e.x, o = e.y, l = e.rotation, u = e.skewX, f = e.skewY, _ = e.scaleX, d = e.scaleY, h = e.target, p = e.xOrigin, c = e.yOrigin, g = e.xOffset, v = e.yOffset, m = e.forceCSS, y = parseFloat(s), x = parseFloat(o), b, P, S, O, k;
  l = parseFloat(l), u = parseFloat(u), f = parseFloat(f), f && (f = parseFloat(f), u += f, l += f), l || u ? (l *= ii, u *= ii, b = Math.cos(l) * _, P = Math.sin(l) * _, S = Math.sin(l - u) * -d, O = Math.cos(l - u) * d, u && (f *= ii, k = Math.tan(u - f), k = Math.sqrt(1 + k * k), S *= k, O *= k, f && (k = Math.tan(f), k = Math.sqrt(1 + k * k), b *= k, P *= k)), b = pt(b), P = pt(P), S = pt(S), O = pt(O)) : (b = _, O = d, P = S = 0), (y && !~(s + "").indexOf("px") || x && !~(o + "").indexOf("px")) && (y = vr(h, "x", s, "px"), x = vr(h, "y", o, "px")), (p || c || g || v) && (y = pt(y + p - (p * b + c * S) + g), x = pt(x + c - (p * P + c * O) + v)), (i || n) && (k = h.getBBox(), y = pt(y + i / 100 * k.width), x = pt(x + n / 100 * k.height)), k = "matrix(" + b + "," + P + "," + S + "," + O + "," + y + "," + x + ")", h.setAttribute("transform", k), m && (h.style[lt] = k);
}, xu = function(t, r, e, i, n) {
  var s = 360, o = Ct(n), l = parseFloat(n) * (o && ~n.indexOf("rad") ? Or : 1), u = l - i, f = i + u + "deg", _, d;
  return o && (_ = n.split("_")[1], _ === "short" && (u %= s, u !== u % (s / 2) && (u += u < 0 ? s : -s)), _ === "cw" && u < 0 ? u = (u + s * so) % s - ~~(u / s) * s : _ === "ccw" && u > 0 && (u = (u - s * so) % s - ~~(u / s) * s)), t._pt = d = new ne(t._pt, r, e, i, u, iu), d.e = f, d.u = "deg", t._props.push(e), d;
}, ho = function(t, r) {
  for (var e in r)
    t[e] = r[e];
  return t;
}, wu = function(t, r, e) {
  var i = ho({}, e._gsap), n = "perspective,force3D,transformOrigin,svgOrigin", s = e.style, o, l, u, f, _, d, h, p;
  i.svg ? (u = e.getAttribute("transform"), e.setAttribute("transform", ""), s[lt] = r, o = Gi(e, 1), Hi(e, lt), e.setAttribute("transform", u)) : (u = getComputedStyle(e)[lt], s[lt] = r, o = Gi(e, 1), s[lt] = u);
  for (l in rr)
    u = i[l], f = o[l], u !== f && n.indexOf(l) < 0 && (h = Yt(u), p = Yt(f), _ = h !== p ? vr(e, l, u, p) : parseFloat(u), d = parseFloat(f), t._pt = new ne(t._pt, o, l, _, d - _, fs), t._pt.u = p || 0, t._props.push(l));
  ho(o, i);
};
ie("padding,margin,Width,Radius", function(a, t) {
  var r = "Top", e = "Right", i = "Bottom", n = "Left", s = (t < 3 ? [r, e, i, n] : [r + n, r + e, i + e, i + n]).map(function(o) {
    return t < 2 ? a + o : "border" + o + a;
  });
  kn[t > 1 ? "border" + a : a] = function(o, l, u, f, _) {
    var d, h;
    if (arguments.length < 4)
      return d = s.map(function(p) {
        return Ze(o, p, u);
      }), h = d.join(" "), h.split(d[0]).length === 5 ? d[0] : h;
    d = (f + "").split(" "), h = {}, s.forEach(function(p, c) {
      return h[p] = d[c] = d[c] || d[(c - 1) / 2 | 0];
    }), o.init(l, h, _);
  };
});
var Ca = {
  name: "css",
  register: cs,
  targetTest: function(t) {
    return t.style && t.nodeType;
  },
  init: function(t, r, e, i, n) {
    var s = this._props, o = t.style, l = e.vars.startAt, u, f, _, d, h, p, c, g, v, m, y, x, b, P, S, O;
    Ys || cs(), this.styles = this.styles || ba(t), O = this.styles.props, this.tween = e;
    for (c in r)
      if (c !== "autoRound" && (f = r[c], !(ce[c] && ha(c, r, e, i, t, n)))) {
        if (h = typeof f, p = kn[c], h === "function" && (f = f.call(e, i, t, n), h = typeof f), h === "string" && ~f.indexOf("random(") && (f = Vi(f)), p)
          p(this, t, c, f, e) && (S = 1);
        else if (c.substr(0, 2) === "--")
          u = (getComputedStyle(t).getPropertyValue(c) + "").trim(), f += "", pr.lastIndex = 0, pr.test(u) || (g = Yt(u), v = Yt(f)), v ? g !== v && (u = vr(t, c, u, v) + v) : g && (f += g), this.add(o, "setProperty", u, f, i, n, 0, 0, c), s.push(c), O.push(c, 0, o[c]);
        else if (h !== "undefined") {
          if (l && c in l ? (u = typeof l[c] == "function" ? l[c].call(e, i, t, n) : l[c], Ct(u) && ~u.indexOf("random(") && (u = Vi(u)), Yt(u + "") || (u += ge.units[c] || Yt(Ze(t, c)) || ""), (u + "").charAt(1) === "=" && (u = Ze(t, c))) : u = Ze(t, c), d = parseFloat(u), m = h === "string" && f.charAt(1) === "=" && f.substr(0, 2), m && (f = f.substr(2)), _ = parseFloat(f), c in Ve && (c === "autoAlpha" && (d === 1 && Ze(t, "visibility") === "hidden" && _ && (d = 0), O.push("visibility", 0, o.visibility), fr(this, o, "visibility", d ? "inherit" : "hidden", _ ? "inherit" : "hidden", !_)), c !== "scale" && c !== "transform" && (c = Ve[c], ~c.indexOf(",") && (c = c.split(",")[0]))), y = c in rr, y) {
            if (this.styles.save(c), x || (b = t._gsap, b.renderTransform && !r.parseTransform || Gi(t, r.parseTransform), P = r.smoothOrigin !== !1 && b.smooth, x = this._pt = new ne(this._pt, o, lt, 0, 1, b.renderTransform, b, 0, -1), x.dep = 1), c === "scale")
              this._pt = new ne(this._pt, b, "scaleY", b.scaleY, (m ? ei(b.scaleY, m + _) : _) - b.scaleY || 0, fs), this._pt.u = 0, s.push("scaleY", c), c += "X";
            else if (c === "transformOrigin") {
              O.push(Fe, 0, o[Fe]), f = gu(f), b.svg ? ds(t, f, 0, P, 0, this) : (v = parseFloat(f.split(" ")[2]) || 0, v !== b.zOrigin && fr(this, b, "zOrigin", b.zOrigin, v), fr(this, o, c, On(u), On(f)));
              continue;
            } else if (c === "svgOrigin") {
              ds(t, f, 1, P, 0, this);
              continue;
            } else if (c in ka) {
              xu(this, b, c, d, m ? ei(d, m + f) : f);
              continue;
            } else if (c === "smoothOrigin") {
              fr(this, b, "smooth", b.smooth, f);
              continue;
            } else if (c === "force3D") {
              b[c] = f;
              continue;
            } else if (c === "transform") {
              wu(this, f, t);
              continue;
            }
          } else
            c in o || (c = ci(c) || c);
          if (y || (_ || _ === 0) && (d || d === 0) && !ru.test(f) && c in o)
            g = (u + "").substr((d + "").length), _ || (_ = 0), v = Yt(f) || (c in ge.units ? ge.units[c] : g), g !== v && (d = vr(t, c, u, v)), this._pt = new ne(this._pt, y ? b : o, c, d, (m ? ei(d, m + _) : _) - d, !y && (v === "px" || c === "zIndex") && r.autoRound !== !1 ? su : fs), this._pt.u = v || 0, g !== v && v !== "%" && (this._pt.b = u, this._pt.r = nu);
          else if (c in o)
            pu.call(this, t, c, u, m ? m + f : f);
          else if (c in t)
            this.add(t, c, u || t[c], m ? m + f : f, i, n);
          else if (c !== "parseTransform") {
            Cs(c, f);
            continue;
          }
          y || (c in o ? O.push(c, 0, o[c]) : O.push(c, 1, u || t[c])), s.push(c);
        }
      }
    S && ma(this);
  },
  render: function(t, r) {
    if (r.tween._time || !Is())
      for (var e = r._pt; e; )
        e.r(t, e.d), e = e._next;
    else
      r.styles.revert();
  },
  get: Ze,
  aliases: Ve,
  getSetter: function(t, r, e) {
    var i = Ve[r];
    return i && i.indexOf(",") < 0 && (r = i), r in rr && r !== Fe && (t._gsap.x || Ze(t, "x")) ? e && no === e ? r === "scale" ? uu : lu : (no = e || {}) && (r === "scale" ? fu : hu) : t.style && !ks(t.style[r]) ? ou : ~r.indexOf("-") ? au : Fs(t, r);
  },
  core: {
    _removeProperty: Hi,
    _getMatrix: Xs
  }
};
se.utils.checkPrefix = ci;
se.core.getStyleSaver = ba;
(function(a, t, r, e) {
  var i = ie(a + "," + t + "," + r, function(n) {
    rr[n] = 1;
  });
  ie(t, function(n) {
    ge.units[n] = "deg", ka[n] = 1;
  }), Ve[i[13]] = a + "," + t, ie(e, function(n) {
    var s = n.split(":");
    Ve[s[1]] = i[s[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
ie("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(a) {
  ge.units[a] = "px";
});
se.registerPlugin(Ca);
var qi = se.registerPlugin(Ca) || se;
qi.core.Tween;
function co(a, t) {
  for (var r = 0; r < t.length; r++) {
    var e = t[r];
    e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(a, e.key, e);
  }
}
function bu(a, t, r) {
  return t && co(a.prototype, t), r && co(a, r), a;
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
var Rt, _s, pe, hr, cr, ni, Da, Mr, zi, Ea, Je, Ae, Aa, Ra = function() {
  return Rt || typeof window < "u" && (Rt = window.gsap) && Rt.registerPlugin && Rt;
}, za = 1, Jr = [], U = [], He = [], Li = Date.now, ps = function(t, r) {
  return r;
}, Tu = function() {
  var t = zi.core, r = t.bridge || {}, e = t._scrollers, i = t._proxies;
  e.push.apply(e, U), i.push.apply(i, He), U = e, He = i, ps = function(s, o) {
    return r[s](o);
  };
}, gr = function(t, r) {
  return ~He.indexOf(t) && He[He.indexOf(t) + 1][r];
}, Fi = function(t) {
  return !!~Ea.indexOf(t);
}, Jt = function(t, r, e, i, n) {
  return t.addEventListener(r, e, {
    passive: !i,
    capture: !!n
  });
}, qt = function(t, r, e, i) {
  return t.removeEventListener(r, e, !!i);
}, Qi = "scrollLeft", Ji = "scrollTop", gs = function() {
  return Je && Je.isPressed || U.cache++;
}, Mn = function(t, r) {
  var e = function i(n) {
    if (n || n === 0) {
      za && (pe.history.scrollRestoration = "manual");
      var s = Je && Je.isPressed;
      n = i.v = Math.round(n) || (Je && Je.iOS ? 1 : 0), t(n), i.cacheID = U.cache, s && ps("ss", n);
    } else
      (r || U.cache !== i.cacheID || ps("ref")) && (i.cacheID = U.cache, i.v = t());
    return i.v + i.offset;
  };
  return e.offset = 0, t && e;
}, Zt = {
  s: Qi,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: Mn(function(a) {
    return arguments.length ? pe.scrollTo(a, wt.sc()) : pe.pageXOffset || hr[Qi] || cr[Qi] || ni[Qi] || 0;
  })
}, wt = {
  s: Ji,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: Zt,
  sc: Mn(function(a) {
    return arguments.length ? pe.scrollTo(Zt.sc(), a) : pe.pageYOffset || hr[Ji] || cr[Ji] || ni[Ji] || 0;
  })
}, te = function(t) {
  return Rt.utils.toArray(t)[0] || (typeof t == "string" && Rt.config().nullTargetWarn !== !1 ? console.warn("Element not found:", t) : null);
}, yr = function(t, r) {
  var e = r.s, i = r.sc;
  Fi(t) && (t = hr.scrollingElement || cr);
  var n = U.indexOf(t), s = i === wt.sc ? 1 : 2;
  !~n && (n = U.push(t) - 1), U[n + s] || t.addEventListener("scroll", gs);
  var o = U[n + s], l = o || (U[n + s] = Mn(gr(t, e), !0) || (Fi(t) ? i : Mn(function(u) {
    return arguments.length ? t[e] = u : t[e];
  })));
  return l.target = t, o || (l.smooth = Rt.getProperty(t, "scrollBehavior") === "smooth"), l;
}, ms = function(t, r, e) {
  var i = t, n = t, s = Li(), o = s, l = r || 50, u = Math.max(500, l * 3), f = function(p, c) {
    var g = Li();
    c || g - s > l ? (n = i, i = p, o = s, s = g) : e ? i += p : i = n + (p - n) / (g - o) * (s - o);
  }, _ = function() {
    n = i = e ? 0 : i, o = s = 0;
  }, d = function(p) {
    var c = o, g = n, v = Li();
    return (p || p === 0) && p !== i && f(p), s === o || v - o > u ? 0 : (i + (e ? g : -g)) / ((e ? v : s) - c) * 1e3;
  };
  return {
    update: f,
    reset: _,
    getVelocity: d
  };
}, bi = function(t, r) {
  return r && !t._gsapAllow && t.preventDefault(), t.changedTouches ? t.changedTouches[0] : t;
}, _o = function(t) {
  var r = Math.max.apply(Math, t), e = Math.min.apply(Math, t);
  return Math.abs(r) >= Math.abs(e) ? r : e;
}, La = function() {
  zi = Rt.core.globals().ScrollTrigger, zi && zi.core && Tu();
}, Fa = function(t) {
  return Rt = t || Ra(), Rt && typeof document < "u" && document.body && (pe = window, hr = document, cr = hr.documentElement, ni = hr.body, Ea = [pe, hr, cr, ni], Rt.utils.clamp, Aa = Rt.core.context || function() {
  }, Mr = "onpointerenter" in ni ? "pointer" : "mouse", Da = yt.isTouch = pe.matchMedia && pe.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in pe || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, Ae = yt.eventTypes = ("ontouchstart" in cr ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in cr ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return za = 0;
  }, 500), La(), _s = 1), _s;
};
Zt.op = wt;
U.cache = 0;
var yt = /* @__PURE__ */ function() {
  function a(r) {
    this.init(r);
  }
  var t = a.prototype;
  return t.init = function(e) {
    _s || Fa(Rt) || console.warn("Please gsap.registerPlugin(Observer)"), zi || La();
    var i = e.tolerance, n = e.dragMinimum, s = e.type, o = e.target, l = e.lineHeight, u = e.debounce, f = e.preventDefault, _ = e.onStop, d = e.onStopDelay, h = e.ignore, p = e.wheelSpeed, c = e.event, g = e.onDragStart, v = e.onDragEnd, m = e.onDrag, y = e.onPress, x = e.onRelease, b = e.onRight, P = e.onLeft, S = e.onUp, O = e.onDown, k = e.onChangeX, C = e.onChangeY, z = e.onChange, D = e.onToggleX, j = e.onToggleY, B = e.onHover, Y = e.onHoverEnd, G = e.onMove, L = e.ignoreCheck, q = e.isNormalizer, Q = e.onGestureStart, w = e.onGestureEnd, et = e.onWheel, Xt = e.onEnable, Me = e.onDisable, ut = e.onClick, zt = e.scrollSpeed, rt = e.capture, Lt = e.allowClicks, Wt = e.lockAxis, _i = e.onLockAxis;
    this.target = o = te(o) || cr, this.vars = e, h && (h = Rt.utils.toArray(h)), i = i || 1e-9, n = n || 0, p = p || 1, zt = zt || 1, s = s || "wheel,touch,pointer", u = u !== !1, l || (l = parseFloat(pe.getComputedStyle(ni).lineHeight) || 22);
    var oe, ve, H, bt, ae, Ne, Vt, T = this, Ge = 0, it = 0, ir = yr(o, Zt), nr = yr(o, wt), Wr = ir(), Ut = nr(), pi = ~s.indexOf("touch") && !~s.indexOf("pointer") && Ae[0] === "pointerdown", sr = Fi(o), ct = o.ownerDocument || hr, le = [0, 0, 0], Ht = [0, 0, 0], gi = 0, $t = function() {
      return gi = Li();
    }, Ye = function(R, M) {
      return (T.event = R) && h && ~h.indexOf(R.target) || M && pi && R.pointerType !== "touch" || L && L(R, M);
    }, mi = function() {
      T._vx.reset(), T._vy.reset(), ve.pause(), _ && _(T);
    }, or = function() {
      var R = T.deltaX = _o(le), M = T.deltaY = _o(Ht), A = Math.abs(R) >= i, F = Math.abs(M) >= i;
      z && (A || F) && z(T, R, M, le, Ht), A && (b && T.deltaX > 0 && b(T), P && T.deltaX < 0 && P(T), k && k(T), D && T.deltaX < 0 != Ge < 0 && D(T), Ge = T.deltaX, le[0] = le[1] = le[2] = 0), F && (O && T.deltaY > 0 && O(T), S && T.deltaY < 0 && S(T), C && C(T), j && T.deltaY < 0 != it < 0 && j(T), it = T.deltaY, Ht[0] = Ht[1] = Ht[2] = 0), (bt || H) && (G && G(T), H && (m(T), H = !1), bt = !1), Ne && !(Ne = !1) && _i && _i(T), ae && (et(T), ae = !1), oe = 0;
    }, Vr = function(R, M, A) {
      le[A] += R, Ht[A] += M, T._vx.update(R), T._vy.update(M), u ? oe || (oe = requestAnimationFrame(or)) : or();
    }, wr = function(R, M) {
      Wt && !Vt && (T.axis = Vt = Math.abs(R) > Math.abs(M) ? "x" : "y", Ne = !0), Vt !== "y" && (le[2] += R, T._vx.update(R, !0)), Vt !== "x" && (Ht[2] += M, T._vy.update(M, !0)), u ? oe || (oe = requestAnimationFrame(or)) : or();
    }, br = function(R) {
      if (!Ye(R, 1)) {
        R = bi(R, f);
        var M = R.clientX, A = R.clientY, F = M - T.x, I = A - T.y, Tt = T.isDragging;
        T.x = M, T.y = A, (Tt || Math.abs(T.startX - M) >= n || Math.abs(T.startY - A) >= n) && (m && (H = !0), Tt || (T.isDragging = !0), wr(F, I), Tt || g && g(T));
      }
    }, V = T.onPress = function(N) {
      Ye(N, 1) || N && N.button || (T.axis = Vt = null, ve.pause(), T.isPressed = !0, N = bi(N), Ge = it = 0, T.startX = T.x = N.clientX, T.startY = T.y = N.clientY, T._vx.reset(), T._vy.reset(), Jt(q ? o : ct, Ae[1], br, f, !0), T.deltaX = T.deltaY = 0, y && y(T));
    }, qe = T.onRelease = function(N) {
      if (!Ye(N, 1)) {
        qt(q ? o : ct, Ae[1], br, !0);
        var R = !isNaN(T.y - T.startY), M = T.isDragging && (Math.abs(T.x - T.startX) > 3 || Math.abs(T.y - T.startY) > 3), A = bi(N);
        !M && R && (T._vx.reset(), T._vy.reset(), f && Lt && Rt.delayedCall(0.08, function() {
          if (Li() - gi > 300 && !N.defaultPrevented) {
            if (N.target.click)
              N.target.click();
            else if (ct.createEvent) {
              var F = ct.createEvent("MouseEvents");
              F.initMouseEvent("click", !0, !0, pe, 1, A.screenX, A.screenY, A.clientX, A.clientY, !1, !1, !1, !1, 0, null), N.target.dispatchEvent(F);
            }
          }
        })), T.isDragging = T.isGesturing = T.isPressed = !1, _ && !q && ve.restart(!0), v && M && v(T), x && x(T, M);
      }
    }, Ce = function(R) {
      return R.touches && R.touches.length > 1 && (T.isGesturing = !0) && Q(R, T.isDragging);
    }, De = function() {
      return (T.isGesturing = !1) || w(T);
    }, ye = function(R) {
      if (!Ye(R)) {
        var M = ir(), A = nr();
        Vr((M - Wr) * zt, (A - Ut) * zt, 1), Wr = M, Ut = A, _ && ve.restart(!0);
      }
    }, Ee = function(R) {
      if (!Ye(R)) {
        R = bi(R, f), et && (ae = !0);
        var M = (R.deltaMode === 1 ? l : R.deltaMode === 2 ? pe.innerHeight : 1) * p;
        Vr(R.deltaX * M, R.deltaY * M, 0), _ && !q && ve.restart(!0);
      }
    }, Tr = function(R) {
      if (!Ye(R)) {
        var M = R.clientX, A = R.clientY, F = M - T.x, I = A - T.y;
        T.x = M, T.y = A, bt = !0, (F || I) && wr(F, I);
      }
    }, Ur = function(R) {
      T.event = R, B(T);
    }, Ke = function(R) {
      T.event = R, Y(T);
    }, vi = function(R) {
      return Ye(R) || bi(R, f) && ut(T);
    };
    ve = T._dc = Rt.delayedCall(d || 0.25, mi).pause(), T.deltaX = T.deltaY = 0, T._vx = ms(0, 50, !0), T._vy = ms(0, 50, !0), T.scrollX = ir, T.scrollY = nr, T.isDragging = T.isGesturing = T.isPressed = !1, Aa(this), T.enable = function(N) {
      return T.isEnabled || (Jt(sr ? ct : o, "scroll", gs), s.indexOf("scroll") >= 0 && Jt(sr ? ct : o, "scroll", ye, f, rt), s.indexOf("wheel") >= 0 && Jt(o, "wheel", Ee, f, rt), (s.indexOf("touch") >= 0 && Da || s.indexOf("pointer") >= 0) && (Jt(o, Ae[0], V, f, rt), Jt(ct, Ae[2], qe), Jt(ct, Ae[3], qe), Lt && Jt(o, "click", $t, !1, !0), ut && Jt(o, "click", vi), Q && Jt(ct, "gesturestart", Ce), w && Jt(ct, "gestureend", De), B && Jt(o, Mr + "enter", Ur), Y && Jt(o, Mr + "leave", Ke), G && Jt(o, Mr + "move", Tr)), T.isEnabled = !0, N && N.type && V(N), Xt && Xt(T)), T;
    }, T.disable = function() {
      T.isEnabled && (Jr.filter(function(N) {
        return N !== T && Fi(N.target);
      }).length || qt(sr ? ct : o, "scroll", gs), T.isPressed && (T._vx.reset(), T._vy.reset(), qt(q ? o : ct, Ae[1], br, !0)), qt(sr ? ct : o, "scroll", ye, rt), qt(o, "wheel", Ee, rt), qt(o, Ae[0], V, rt), qt(ct, Ae[2], qe), qt(ct, Ae[3], qe), qt(o, "click", $t, !0), qt(o, "click", vi), qt(ct, "gesturestart", Ce), qt(ct, "gestureend", De), qt(o, Mr + "enter", Ur), qt(o, Mr + "leave", Ke), qt(o, Mr + "move", Tr), T.isEnabled = T.isPressed = T.isDragging = !1, Me && Me(T));
    }, T.kill = T.revert = function() {
      T.disable();
      var N = Jr.indexOf(T);
      N >= 0 && Jr.splice(N, 1), Je === T && (Je = 0);
    }, Jr.push(T), q && Fi(o) && (Je = T), T.enable(c);
  }, bu(a, [{
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
yt.version = "3.11.5";
yt.create = function(a) {
  return new yt(a);
};
yt.register = Fa;
yt.getAll = function() {
  return Jr.slice();
};
yt.getById = function(a) {
  return Jr.filter(function(t) {
    return t.vars.id === a;
  })[0];
};
Ra() && Rt.registerPlugin(yt);
/*!
 * ScrollTrigger 3.11.5
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var E, Kr, $, nt, ze, ft, Na, Cn, Dn, ti, dn, tn, Nt, Ln, vs, Kt, po, go, jr, Ya, $n, Ia, fe, Ba, Xa, Wa, ar, ys, Ws, Gn, en = 1, jt = Date.now, qn = jt(), ke = 0, ki = 0, Su = function a() {
  return ki && requestAnimationFrame(a);
}, mo = function() {
  return Ln = 1;
}, vo = function() {
  return Ln = 0;
}, Xe = function(t) {
  return t;
}, Oi = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, Va = function() {
  return typeof window < "u";
}, Ua = function() {
  return E || Va() && (E = window.gsap) && E.registerPlugin && E;
}, Yr = function(t) {
  return !!~Na.indexOf(t);
}, Ha = function(t) {
  return gr(t, "getBoundingClientRect") || (Yr(t) ? function() {
    return yn.width = $.innerWidth, yn.height = $.innerHeight, yn;
  } : function() {
    return Qe(t);
  });
}, Pu = function(t, r, e) {
  var i = e.d, n = e.d2, s = e.a;
  return (s = gr(t, "getBoundingClientRect")) ? function() {
    return s()[i];
  } : function() {
    return (r ? $["inner" + n] : t["client" + n]) || 0;
  };
}, ku = function(t, r) {
  return !r || ~He.indexOf(t) ? Ha(t) : function() {
    return yn;
  };
}, dr = function(t, r) {
  var e = r.s, i = r.d2, n = r.d, s = r.a;
  return Math.max(0, (e = "scroll" + i) && (s = gr(t, e)) ? s() - Ha(t)()[n] : Yr(t) ? (ze[e] || ft[e]) - ($["inner" + i] || ze["client" + i] || ft["client" + i]) : t[e] - t["offset" + i]);
}, rn = function(t, r) {
  for (var e = 0; e < jr.length; e += 3)
    (!r || ~r.indexOf(jr[e + 1])) && t(jr[e], jr[e + 1], jr[e + 2]);
}, Re = function(t) {
  return typeof t == "string";
}, Qt = function(t) {
  return typeof t == "function";
}, Mi = function(t) {
  return typeof t == "number";
}, _n = function(t) {
  return typeof t == "object";
}, Ti = function(t, r, e) {
  return t && t.progress(r ? 0 : 1) && e && t.pause();
}, Kn = function(t, r) {
  if (t.enabled) {
    var e = r(t);
    e && e.totalTime && (t.callbackAnimation = e);
  }
}, Gr = Math.abs, $a = "left", Ga = "top", Vs = "right", Us = "bottom", zr = "width", Lr = "height", Ni = "Right", Yi = "Left", Ii = "Top", Bi = "Bottom", _t = "padding", be = "margin", di = "Width", Hs = "Height", Et = "px", Le = function(t) {
  return $.getComputedStyle(t);
}, Ou = function(t) {
  var r = Le(t).position;
  t.style.position = r === "absolute" || r === "fixed" ? r : "relative";
}, yo = function(t, r) {
  for (var e in r)
    e in t || (t[e] = r[e]);
  return t;
}, Qe = function(t, r) {
  var e = r && Le(t)[vs] !== "matrix(1, 0, 0, 1, 0, 0)" && E.to(t, {
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
  }).progress(1), i = t.getBoundingClientRect();
  return e && e.progress(0).kill(), i;
}, xs = function(t, r) {
  var e = r.d2;
  return t["offset" + e] || t["client" + e] || 0;
}, qa = function(t) {
  var r = [], e = t.labels, i = t.duration(), n;
  for (n in e)
    r.push(e[n] / i);
  return r;
}, Mu = function(t) {
  return function(r) {
    return E.utils.snap(qa(t), r);
  };
}, $s = function(t) {
  var r = E.utils.snap(t), e = Array.isArray(t) && t.slice(0).sort(function(i, n) {
    return i - n;
  });
  return e ? function(i, n, s) {
    s === void 0 && (s = 1e-3);
    var o;
    if (!n)
      return r(i);
    if (n > 0) {
      for (i -= s, o = 0; o < e.length; o++)
        if (e[o] >= i)
          return e[o];
      return e[o - 1];
    } else
      for (o = e.length, i += s; o--; )
        if (e[o] <= i)
          return e[o];
    return e[0];
  } : function(i, n, s) {
    s === void 0 && (s = 1e-3);
    var o = r(i);
    return !n || Math.abs(o - i) < s || o - i < 0 == n < 0 ? o : r(n < 0 ? i - t : i + t);
  };
}, Cu = function(t) {
  return function(r, e) {
    return $s(qa(t))(r, e.direction);
  };
}, nn = function(t, r, e, i) {
  return e.split(",").forEach(function(n) {
    return t(r, n, i);
  });
}, Mt = function(t, r, e, i, n) {
  return t.addEventListener(r, e, {
    passive: !i,
    capture: !!n
  });
}, Ot = function(t, r, e, i) {
  return t.removeEventListener(r, e, !!i);
}, sn = function(t, r, e) {
  e = e && e.wheelHandler, e && (t(r, "wheel", e), t(r, "touchmove", e));
}, xo = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, on = {
  toggleActions: "play",
  anticipatePin: 0
}, En = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, pn = function(t, r) {
  if (Re(t)) {
    var e = t.indexOf("="), i = ~e ? +(t.charAt(e - 1) + 1) * parseFloat(t.substr(e + 1)) : 0;
    ~e && (t.indexOf("%") > e && (i *= r / 100), t = t.substr(0, e - 1)), t = i + (t in En ? En[t] * r : ~t.indexOf("%") ? parseFloat(t) * r / 100 : parseFloat(t) || 0);
  }
  return t;
}, an = function(t, r, e, i, n, s, o, l) {
  var u = n.startColor, f = n.endColor, _ = n.fontSize, d = n.indent, h = n.fontWeight, p = nt.createElement("div"), c = Yr(e) || gr(e, "pinType") === "fixed", g = t.indexOf("scroller") !== -1, v = c ? ft : e, m = t.indexOf("start") !== -1, y = m ? u : f, x = "border-color:" + y + ";font-size:" + _ + ";color:" + y + ";font-weight:" + h + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return x += "position:" + ((g || l) && c ? "fixed;" : "absolute;"), (g || l || !c) && (x += (i === wt ? Vs : Us) + ":" + (s + parseFloat(d)) + "px;"), o && (x += "box-sizing:border-box;text-align:left;width:" + o.offsetWidth + "px;"), p._isStart = m, p.setAttribute("class", "gsap-marker-" + t + (r ? " marker-" + r : "")), p.style.cssText = x, p.innerText = r || r === 0 ? t + "-" + r : t, v.children[0] ? v.insertBefore(p, v.children[0]) : v.appendChild(p), p._offset = p["offset" + i.op.d2], gn(p, 0, i, m), p;
}, gn = function(t, r, e, i) {
  var n = {
    display: "block"
  }, s = e[i ? "os2" : "p2"], o = e[i ? "p2" : "os2"];
  t._isFlipped = i, n[e.a + "Percent"] = i ? -100 : 0, n[e.a] = i ? "1px" : 0, n["border" + s + di] = 1, n["border" + o + di] = 0, n[e.p] = r + "px", E.set(t, n);
}, X = [], ws = {}, Ki, wo = function() {
  return jt() - ke > 34 && (Ki || (Ki = requestAnimationFrame(tr)));
}, qr = function() {
  (!fe || !fe.isPressed || fe.startX > ft.clientWidth) && (U.cache++, fe ? Ki || (Ki = requestAnimationFrame(tr)) : tr(), ke || Br("scrollStart"), ke = jt());
}, jn = function() {
  Wa = $.innerWidth, Xa = $.innerHeight;
}, Ci = function() {
  U.cache++, !Nt && !Ia && !nt.fullscreenElement && !nt.webkitFullscreenElement && (!Ba || Wa !== $.innerWidth || Math.abs($.innerHeight - Xa) > $.innerHeight * 0.25) && Cn.restart(!0);
}, Ir = {}, Du = [], Ka = function a() {
  return Ot(W, "scrollEnd", a) || Dr(!0);
}, Br = function(t) {
  return Ir[t] && Ir[t].map(function(r) {
    return r();
  }) || Du;
}, he = [], ja = function(t) {
  for (var r = 0; r < he.length; r += 5)
    (!t || he[r + 4] && he[r + 4].query === t) && (he[r].style.cssText = he[r + 1], he[r].getBBox && he[r].setAttribute("transform", he[r + 2] || ""), he[r + 3].uncache = 1);
}, Gs = function(t, r) {
  var e;
  for (Kt = 0; Kt < X.length; Kt++)
    e = X[Kt], e && (!r || e._ctx === r) && (t ? e.kill(1) : e.revert(!0, !0));
  r && ja(r), r || Br("revert");
}, Za = function(t, r) {
  U.cache++, (r || !de) && U.forEach(function(e) {
    return Qt(e) && e.cacheID++ && (e.rec = 0);
  }), Re(t) && ($.history.scrollRestoration = Ws = t);
}, de, Fr = 0, bo, Eu = function() {
  if (bo !== Fr) {
    var t = bo = Fr;
    requestAnimationFrame(function() {
      return t === Fr && Dr(!0);
    });
  }
}, Dr = function(t, r) {
  if (ke && !t) {
    Mt(W, "scrollEnd", Ka);
    return;
  }
  de = W.isRefreshing = !0, U.forEach(function(i) {
    return Qt(i) && i.cacheID++ && (i.rec = i());
  });
  var e = Br("refreshInit");
  Ya && W.sort(), r || Gs(), U.forEach(function(i) {
    Qt(i) && (i.smooth && (i.target.style.scrollBehavior = "auto"), i(0));
  }), X.slice(0).forEach(function(i) {
    return i.refresh();
  }), X.forEach(function(i, n) {
    if (i._subPinOffset && i.pin) {
      var s = i.vars.horizontal ? "offsetWidth" : "offsetHeight", o = i.pin[s];
      i.revert(!0, 1), i.adjustPinSpacing(i.pin[s] - o), i.refresh();
    }
  }), X.forEach(function(i) {
    return i.vars.end === "max" && i.setPositions(i.start, Math.max(i.start + 1, dr(i.scroller, i._dir)));
  }), e.forEach(function(i) {
    return i && i.render && i.render(-1);
  }), U.forEach(function(i) {
    Qt(i) && (i.smooth && requestAnimationFrame(function() {
      return i.target.style.scrollBehavior = "smooth";
    }), i.rec && i(i.rec));
  }), Za(Ws, 1), Cn.pause(), Fr++, de = 2, tr(2), X.forEach(function(i) {
    return Qt(i.vars.onRefresh) && i.vars.onRefresh(i);
  }), de = W.isRefreshing = !1, Br("refresh");
}, bs = 0, mn = 1, Xi, tr = function(t) {
  if (!de || t === 2) {
    W.isUpdating = !0, Xi && Xi.update(0);
    var r = X.length, e = jt(), i = e - qn >= 50, n = r && X[0].scroll();
    if (mn = bs > n ? -1 : 1, de || (bs = n), i && (ke && !Ln && e - ke > 200 && (ke = 0, Br("scrollEnd")), dn = qn, qn = e), mn < 0) {
      for (Kt = r; Kt-- > 0; )
        X[Kt] && X[Kt].update(0, i);
      mn = 1;
    } else
      for (Kt = 0; Kt < r; Kt++)
        X[Kt] && X[Kt].update(0, i);
    W.isUpdating = !1;
  }
  Ki = 0;
}, Ts = [$a, Ga, Us, Vs, be + Bi, be + Ni, be + Ii, be + Yi, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], vn = Ts.concat([zr, Lr, "boxSizing", "max" + di, "max" + Hs, "position", be, _t, _t + Ii, _t + Ni, _t + Bi, _t + Yi]), Au = function(t, r, e) {
  si(e);
  var i = t._gsap;
  if (i.spacerIsNative)
    si(i.spacerState);
  else if (t._gsap.swappedIn) {
    var n = r.parentNode;
    n && (n.insertBefore(t, r), n.removeChild(r));
  }
  t._gsap.swappedIn = !1;
}, Zn = function(t, r, e, i) {
  if (!t._gsap.swappedIn) {
    for (var n = Ts.length, s = r.style, o = t.style, l; n--; )
      l = Ts[n], s[l] = e[l];
    s.position = e.position === "absolute" ? "absolute" : "relative", e.display === "inline" && (s.display = "inline-block"), o[Us] = o[Vs] = "auto", s.flexBasis = e.flexBasis || "auto", s.overflow = "visible", s.boxSizing = "border-box", s[zr] = xs(t, Zt) + Et, s[Lr] = xs(t, wt) + Et, s[_t] = o[be] = o[Ga] = o[$a] = "0", si(i), o[zr] = o["max" + di] = e[zr], o[Lr] = o["max" + Hs] = e[Lr], o[_t] = e[_t], t.parentNode !== r && (t.parentNode.insertBefore(r, t), r.appendChild(t)), t._gsap.swappedIn = !0;
  }
}, Ru = /([A-Z])/g, si = function(t) {
  if (t) {
    var r = t.t.style, e = t.length, i = 0, n, s;
    for ((t.t._gsap || E.core.getCache(t.t)).uncache = 1; i < e; i += 2)
      s = t[i + 1], n = t[i], s ? r[n] = s : r[n] && r.removeProperty(n.replace(Ru, "-$1").toLowerCase());
  }
}, ln = function(t) {
  for (var r = vn.length, e = t.style, i = [], n = 0; n < r; n++)
    i.push(vn[n], e[vn[n]]);
  return i.t = t, i;
}, zu = function(t, r, e) {
  for (var i = [], n = t.length, s = e ? 8 : 0, o; s < n; s += 2)
    o = t[s], i.push(o, o in r ? r[o] : t[s + 1]);
  return i.t = t.t, i;
}, yn = {
  left: 0,
  top: 0
}, To = function(t, r, e, i, n, s, o, l, u, f, _, d, h) {
  Qt(t) && (t = t(l)), Re(t) && t.substr(0, 3) === "max" && (t = d + (t.charAt(4) === "=" ? pn("0" + t.substr(3), e) : 0));
  var p = h ? h.time() : 0, c, g, v;
  if (h && h.seek(0), Mi(t))
    h && (t = E.utils.mapRange(h.scrollTrigger.start, h.scrollTrigger.end, 0, d, t)), o && gn(o, e, i, !0);
  else {
    Qt(r) && (r = r(l));
    var m = (t || "0").split(" "), y, x, b, P;
    v = te(r) || ft, y = Qe(v) || {}, (!y || !y.left && !y.top) && Le(v).display === "none" && (P = v.style.display, v.style.display = "block", y = Qe(v), P ? v.style.display = P : v.style.removeProperty("display")), x = pn(m[0], y[i.d]), b = pn(m[1] || "0", e), t = y[i.p] - u[i.p] - f + x + n - b, o && gn(o, b, i, e - b < 20 || o._isStart && b > 20), e -= e - b;
  }
  if (s) {
    var S = t + e, O = s._isStart;
    c = "scroll" + i.d2, gn(s, S, i, O && S > 20 || !O && (_ ? Math.max(ft[c], ze[c]) : s.parentNode[c]) <= S + 1), _ && (u = Qe(o), _ && (s.style[i.op.p] = u[i.op.p] - i.op.m - s._offset + Et));
  }
  return h && v && (c = Qe(v), h.seek(d), g = Qe(v), h._caScrollDist = c[i.p] - g[i.p], t = t / h._caScrollDist * d), h && h.seek(p), h ? t : Math.round(t);
}, Lu = /(webkit|moz|length|cssText|inset)/i, So = function(t, r, e, i) {
  if (t.parentNode !== r) {
    var n = t.style, s, o;
    if (r === ft) {
      t._stOrig = n.cssText, o = Le(t);
      for (s in o)
        !+s && !Lu.test(s) && o[s] && typeof n[s] == "string" && s !== "0" && (n[s] = o[s]);
      n.top = e, n.left = i;
    } else
      n.cssText = t._stOrig;
    E.core.getCache(t).uncache = 1, r.appendChild(t);
  }
}, Qa = function(t, r, e) {
  var i = r, n = i;
  return function(s) {
    var o = Math.round(t());
    return o !== i && o !== n && Math.abs(o - i) > 3 && Math.abs(o - n) > 3 && (s = o, e && e()), n = i, i = s, s;
  };
}, Po = function(t, r) {
  var e = yr(t, r), i = "_scroll" + r.p2, n = function s(o, l, u, f, _) {
    var d = s.tween, h = l.onComplete, p = {};
    u = u || e();
    var c = Qa(e, u, function() {
      d.kill(), s.tween = 0;
    });
    return _ = f && _ || 0, f = f || o - u, d && d.kill(), l[i] = o, l.modifiers = p, p[i] = function() {
      return c(u + f * d.ratio + _ * d.ratio * d.ratio);
    }, l.onUpdate = function() {
      U.cache++, tr();
    }, l.onComplete = function() {
      s.tween = 0, h && h.call(d);
    }, d = s.tween = E.to(t, l), d;
  };
  return t[i] = e, e.wheelHandler = function() {
    return n.tween && n.tween.kill() && (n.tween = 0);
  }, Mt(t, "wheel", e.wheelHandler), W.isTouch && Mt(t, "touchmove", e.wheelHandler), n;
}, W = /* @__PURE__ */ function() {
  function a(r, e) {
    Kr || a.register(E) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), this.init(r, e);
  }
  var t = a.prototype;
  return t.init = function(e, i) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !ki) {
      this.update = this.refresh = this.kill = Xe;
      return;
    }
    e = yo(Re(e) || Mi(e) || e.nodeType ? {
      trigger: e
    } : e, on);
    var n = e, s = n.onUpdate, o = n.toggleClass, l = n.id, u = n.onToggle, f = n.onRefresh, _ = n.scrub, d = n.trigger, h = n.pin, p = n.pinSpacing, c = n.invalidateOnRefresh, g = n.anticipatePin, v = n.onScrubComplete, m = n.onSnapComplete, y = n.once, x = n.snap, b = n.pinReparent, P = n.pinSpacer, S = n.containerAnimation, O = n.fastScrollEnd, k = n.preventOverlaps, C = e.horizontal || e.containerAnimation && e.horizontal !== !1 ? Zt : wt, z = !_ && _ !== 0, D = te(e.scroller || $), j = E.core.getCache(D), B = Yr(D), Y = ("pinType" in e ? e.pinType : gr(D, "pinType") || B && "fixed") === "fixed", G = [e.onEnter, e.onLeave, e.onEnterBack, e.onLeaveBack], L = z && e.toggleActions.split(" "), q = "markers" in e ? e.markers : on.markers, Q = B ? 0 : parseFloat(Le(D)["border" + C.p2 + di]) || 0, w = this, et = e.onRefreshInit && function() {
      return e.onRefreshInit(w);
    }, Xt = Pu(D, B, C), Me = ku(D, B), ut = 0, zt = 0, rt = yr(D, C), Lt, Wt, _i, oe, ve, H, bt, ae, Ne, Vt, T, Ge, it, ir, nr, Wr, Ut, pi, sr, ct, le, Ht, gi, $t, Ye, mi, or, Vr, wr, br, V, qe, Ce, De, ye, Ee, Tr, Ur, Ke;
    if (ys(w), w._dir = C, g *= 45, w.scroller = D, w.scroll = S ? S.time.bind(S) : rt, oe = rt(), w.vars = e, i = i || e.animation, "refreshPriority" in e && (Ya = 1, e.refreshPriority === -9999 && (Xi = w)), j.tweenScroll = j.tweenScroll || {
      top: Po(D, wt),
      left: Po(D, Zt)
    }, w.tweenTo = Lt = j.tweenScroll[C.p], w.scrubDuration = function(M) {
      qe = Mi(M) && M, qe ? V ? V.duration(M) : V = E.to(i, {
        ease: "expo",
        totalProgress: "+=0.001",
        duration: qe,
        paused: !0,
        onComplete: function() {
          return v && v(w);
        }
      }) : (V && V.progress(1).kill(), V = 0);
    }, i && (i.vars.lazy = !1, i._initted || i.vars.immediateRender !== !1 && e.immediateRender !== !1 && i.duration() && i.render(0, !0, !0), w.animation = i.pause(), i.scrollTrigger = w, w.scrubDuration(_), V && V.resetTo && V.resetTo("totalProgress", 0), wr = 0, l || (l = i.vars.id)), X.push(w), x && ((!_n(x) || x.push) && (x = {
      snapTo: x
    }), "scrollBehavior" in ft.style && E.set(B ? [ft, ze] : D, {
      scrollBehavior: "auto"
    }), U.forEach(function(M) {
      return Qt(M) && M.target === (B ? nt.scrollingElement || ze : D) && (M.smooth = !1);
    }), _i = Qt(x.snapTo) ? x.snapTo : x.snapTo === "labels" ? Mu(i) : x.snapTo === "labelsDirectional" ? Cu(i) : x.directional !== !1 ? function(M, A) {
      return $s(x.snapTo)(M, jt() - zt < 500 ? 0 : A.direction);
    } : E.utils.snap(x.snapTo), Ce = x.duration || {
      min: 0.1,
      max: 2
    }, Ce = _n(Ce) ? ti(Ce.min, Ce.max) : ti(Ce, Ce), De = E.delayedCall(x.delay || qe / 2 || 0.1, function() {
      var M = rt(), A = jt() - zt < 500, F = Lt.tween;
      if ((A || Math.abs(w.getVelocity()) < 10) && !F && !Ln && ut !== M) {
        var I = (M - H) / it, Tt = i && !z ? i.totalProgress() : I, Z = A ? 0 : (Tt - br) / (jt() - dn) * 1e3 || 0, st = E.utils.clamp(-I, 1 - I, Gr(Z / 2) * Z / 0.185), Dt = I + (x.inertia === !1 ? 0 : st), St = ti(0, 1, _i(Dt, w)), gt = Math.round(H + St * it), ot = x, ue = ot.onStart, Gt = ot.onInterrupt, Pt = ot.onComplete;
        if (M <= bt && M >= H && gt !== M) {
          if (F && !F._initted && F.data <= Gr(gt - M))
            return;
          x.inertia === !1 && (st = St - I), Lt(gt, {
            duration: Ce(Gr(Math.max(Gr(Dt - Tt), Gr(St - Tt)) * 0.185 / Z / 0.05 || 0)),
            ease: x.ease || "power3",
            data: Gr(gt - M),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return De.restart(!0) && Gt && Gt(w);
            },
            onComplete: function() {
              w.update(), ut = rt(), wr = br = i && !z ? i.totalProgress() : w.progress, m && m(w), Pt && Pt(w);
            }
          }, M, st * it, gt - M - st * it), ue && ue(w, Lt.tween);
        }
      } else
        w.isActive && ut !== M && De.restart(!0);
    }).pause()), l && (ws[l] = w), d = w.trigger = te(d || h), Ke = d && d._gsap && d._gsap.stRevert, Ke && (Ke = Ke(w)), h = h === !0 ? d : te(h), Re(o) && (o = {
      targets: d,
      className: o
    }), h && (p === !1 || p === be || (p = !p && h.parentNode && h.parentNode.style && Le(h.parentNode).display === "flex" ? !1 : _t), w.pin = h, Wt = E.core.getCache(h), Wt.spacer ? ir = Wt.pinState : (P && (P = te(P), P && !P.nodeType && (P = P.current || P.nativeElement), Wt.spacerIsNative = !!P, P && (Wt.spacerState = ln(P))), Wt.spacer = Ut = P || nt.createElement("div"), Ut.classList.add("pin-spacer"), l && Ut.classList.add("pin-spacer-" + l), Wt.pinState = ir = ln(h)), e.force3D !== !1 && E.set(h, {
      force3D: !0
    }), w.spacer = Ut = Wt.spacer, Vr = Le(h), gi = Vr[p + C.os2], sr = E.getProperty(h), ct = E.quickSetter(h, C.a, Et), Zn(h, Ut, Vr), Wr = ln(h)), q) {
      Ge = _n(q) ? yo(q, xo) : xo, Vt = an("scroller-start", l, D, C, Ge, 0), T = an("scroller-end", l, D, C, Ge, 0, Vt), pi = Vt["offset" + C.op.d2];
      var vi = te(gr(D, "content") || D);
      ae = this.markerStart = an("start", l, vi, C, Ge, pi, 0, S), Ne = this.markerEnd = an("end", l, vi, C, Ge, pi, 0, S), S && (Ur = E.quickSetter([ae, Ne], C.a, Et)), !Y && !(He.length && gr(D, "fixedMarkers") === !0) && (Ou(B ? ft : D), E.set([Vt, T], {
        force3D: !0
      }), Ye = E.quickSetter(Vt, C.a, Et), or = E.quickSetter(T, C.a, Et));
    }
    if (S) {
      var N = S.vars.onUpdate, R = S.vars.onUpdateParams;
      S.eventCallback("onUpdate", function() {
        w.update(0, 0, 1), N && N.apply(S, R || []);
      });
    }
    w.previous = function() {
      return X[X.indexOf(w) - 1];
    }, w.next = function() {
      return X[X.indexOf(w) + 1];
    }, w.revert = function(M, A) {
      if (!A)
        return w.kill(!0);
      var F = M !== !1 || !w.enabled, I = Nt;
      F !== w.isReverted && (F && (Ee = Math.max(rt(), w.scroll.rec || 0), ye = w.progress, Tr = i && i.progress()), ae && [ae, Ne, Vt, T].forEach(function(Tt) {
        return Tt.style.display = F ? "none" : "block";
      }), F && (Nt = w, w.update(F)), h && (!b || !w.isActive) && (F ? Au(h, Ut, ir) : Zn(h, Ut, Le(h), $t)), F || w.update(F), Nt = I, w.isReverted = F);
    }, w.refresh = function(M, A) {
      if (!((Nt || !w.enabled) && !A)) {
        if (h && M && ke) {
          Mt(a, "scrollEnd", Ka);
          return;
        }
        !de && et && et(w), Nt = w, zt = jt(), Lt.tween && (Lt.tween.kill(), Lt.tween = 0), V && V.pause(), c && i && i.revert({
          kill: !1
        }).invalidate(), w.isReverted || w.revert(!0, !0), w._subPinOffset = !1;
        for (var F = Xt(), I = Me(), Tt = S ? S.duration() : dr(D, C), Z = it <= 0.01, st = 0, Dt = 0, St = e.end, gt = e.endTrigger || d, ot = e.start || (e.start === 0 || !d ? 0 : h ? "0 0" : "0 100%"), ue = w.pinnedContainer = e.pinnedContainer && te(e.pinnedContainer), Gt = d && Math.max(0, X.indexOf(w)) || 0, Pt = Gt, dt, Ft, Hr, Sr, mt, kt, Ie, Fn, qs, yi, Be; Pt--; )
          kt = X[Pt], kt.end || kt.refresh(0, 1) || (Nt = w), Ie = kt.pin, Ie && (Ie === d || Ie === h || Ie === ue) && !kt.isReverted && (yi || (yi = []), yi.unshift(kt), kt.revert(!0, !0)), kt !== X[Pt] && (Gt--, Pt--);
        for (Qt(ot) && (ot = ot(w)), H = To(ot, d, F, C, rt(), ae, Vt, w, I, Q, Y, Tt, S) || (h ? -1e-3 : 0), Qt(St) && (St = St(w)), Re(St) && !St.indexOf("+=") && (~St.indexOf(" ") ? St = (Re(ot) ? ot.split(" ")[0] : "") + St : (st = pn(St.substr(2), F), St = Re(ot) ? ot : (S ? E.utils.mapRange(0, S.duration(), S.scrollTrigger.start, S.scrollTrigger.end, H) : H) + st, gt = d)), bt = Math.max(H, To(St || (gt ? "100% 0" : Tt), gt, F, C, rt() + st, Ne, T, w, I, Q, Y, Tt, S)) || -1e-3, it = bt - H || (H -= 0.01) && 1e-3, st = 0, Pt = Gt; Pt--; )
          kt = X[Pt], Ie = kt.pin, Ie && kt.start - kt._pinPush <= H && !S && kt.end > 0 && (dt = kt.end - kt.start, (Ie === d && kt.start - kt._pinPush < H || Ie === ue) && !Mi(ot) && (st += dt * (1 - kt.progress)), Ie === h && (Dt += dt));
        if (H += st, bt += st, Z && (ye = E.utils.clamp(0, 1, E.utils.normalize(H, bt, Ee))), w._pinPush = Dt, ae && st && (dt = {}, dt[C.a] = "+=" + st, ue && (dt[C.p] = "-=" + rt()), E.set([ae, Ne], dt)), h)
          dt = Le(h), Sr = C === wt, Hr = rt(), le = parseFloat(sr(C.a)) + Dt, !Tt && bt > 1 && (Be = (B ? nt.scrollingElement || ze : D).style, Be = {
            style: Be,
            value: Be["overflow" + C.a.toUpperCase()]
          }, Be.style["overflow" + C.a.toUpperCase()] = "scroll"), Zn(h, Ut, dt), Wr = ln(h), Ft = Qe(h, !0), Fn = Y && yr(D, Sr ? Zt : wt)(), p && ($t = [p + C.os2, it + Dt + Et], $t.t = Ut, Pt = p === _t ? xs(h, C) + it + Dt : 0, Pt && $t.push(C.d, Pt + Et), si($t), ue && X.forEach(function(xi) {
            xi.pin === ue && xi.vars.pinSpacing !== !1 && (xi._subPinOffset = !0);
          }), Y && rt(Ee)), Y && (mt = {
            top: Ft.top + (Sr ? Hr - H : Fn) + Et,
            left: Ft.left + (Sr ? Fn : Hr - H) + Et,
            boxSizing: "border-box",
            position: "fixed"
          }, mt[zr] = mt["max" + di] = Math.ceil(Ft.width) + Et, mt[Lr] = mt["max" + Hs] = Math.ceil(Ft.height) + Et, mt[be] = mt[be + Ii] = mt[be + Ni] = mt[be + Bi] = mt[be + Yi] = "0", mt[_t] = dt[_t], mt[_t + Ii] = dt[_t + Ii], mt[_t + Ni] = dt[_t + Ni], mt[_t + Bi] = dt[_t + Bi], mt[_t + Yi] = dt[_t + Yi], nr = zu(ir, mt, b), de && rt(0)), i ? (qs = i._initted, $n(1), i.render(i.duration(), !0, !0), Ht = sr(C.a) - le + it + Dt, mi = Math.abs(it - Ht) > 1, Y && mi && nr.splice(nr.length - 2, 2), i.render(0, !0, !0), qs || i.invalidate(!0), i.parent || i.totalTime(i.totalTime()), $n(0)) : Ht = it, Be && (Be.value ? Be.style["overflow" + C.a.toUpperCase()] = Be.value : Be.style.removeProperty("overflow-" + C.a));
        else if (d && rt() && !S)
          for (Ft = d.parentNode; Ft && Ft !== ft; )
            Ft._pinOffset && (H -= Ft._pinOffset, bt -= Ft._pinOffset), Ft = Ft.parentNode;
        yi && yi.forEach(function(xi) {
          return xi.revert(!1, !0);
        }), w.start = H, w.end = bt, oe = ve = de ? Ee : rt(), !S && !de && (oe < Ee && rt(Ee), w.scroll.rec = 0), w.revert(!1, !0), De && (ut = -1, w.isActive && rt(H + it * ye), De.restart(!0)), Nt = 0, i && z && (i._initted || Tr) && i.progress() !== Tr && i.progress(Tr, !0).render(i.time(), !0, !0), (Z || ye !== w.progress || S) && (i && !z && i.totalProgress(S && H < -1e-3 && !ye ? E.utils.normalize(H, bt, 0) : ye, !0), w.progress = (oe - H) / it === ye ? 0 : ye), h && p && (Ut._pinOffset = Math.round(w.progress * Ht)), V && V.invalidate(), f && !de && f(w);
      }
    }, w.getVelocity = function() {
      return (rt() - ve) / (jt() - dn) * 1e3 || 0;
    }, w.endAnimation = function() {
      Ti(w.callbackAnimation), i && (V ? V.progress(1) : i.paused() ? z || Ti(i, w.direction < 0, 1) : Ti(i, i.reversed()));
    }, w.labelToScroll = function(M) {
      return i && i.labels && (H || w.refresh() || H) + i.labels[M] / i.duration() * it || 0;
    }, w.getTrailing = function(M) {
      var A = X.indexOf(w), F = w.direction > 0 ? X.slice(0, A).reverse() : X.slice(A + 1);
      return (Re(M) ? F.filter(function(I) {
        return I.vars.preventOverlaps === M;
      }) : F).filter(function(I) {
        return w.direction > 0 ? I.end <= H : I.start >= bt;
      });
    }, w.update = function(M, A, F) {
      if (!(S && !F && !M)) {
        var I = de === !0 ? Ee : w.scroll(), Tt = M ? 0 : (I - H) / it, Z = Tt < 0 ? 0 : Tt > 1 ? 1 : Tt || 0, st = w.progress, Dt, St, gt, ot, ue, Gt, Pt, dt;
        if (A && (ve = oe, oe = S ? rt() : I, x && (br = wr, wr = i && !z ? i.totalProgress() : Z)), g && !Z && h && !Nt && !en && ke && H < I + (I - ve) / (jt() - dn) * g && (Z = 1e-4), Z !== st && w.enabled) {
          if (Dt = w.isActive = !!Z && Z < 1, St = !!st && st < 1, Gt = Dt !== St, ue = Gt || !!Z != !!st, w.direction = Z > st ? 1 : -1, w.progress = Z, ue && !Nt && (gt = Z && !st ? 0 : Z === 1 ? 1 : st === 1 ? 2 : 3, z && (ot = !Gt && L[gt + 1] !== "none" && L[gt + 1] || L[gt], dt = i && (ot === "complete" || ot === "reset" || ot in i))), k && (Gt || dt) && (dt || _ || !i) && (Qt(k) ? k(w) : w.getTrailing(k).forEach(function(mt) {
            return mt.endAnimation();
          })), z || (V && !Nt && !en ? (V._dp._time - V._start !== V._time && V.render(V._dp._time - V._start), V.resetTo ? V.resetTo("totalProgress", Z, i._tTime / i._tDur) : (V.vars.totalProgress = Z, V.invalidate().restart())) : i && i.totalProgress(Z, !!Nt)), h) {
            if (M && p && (Ut.style[p + C.os2] = gi), !Y)
              ct(Oi(le + Ht * Z));
            else if (ue) {
              if (Pt = !M && Z > st && bt + 1 > I && I + 1 >= dr(D, C), b)
                if (!M && (Dt || Pt)) {
                  var Ft = Qe(h, !0), Hr = I - H;
                  So(h, ft, Ft.top + (C === wt ? Hr : 0) + Et, Ft.left + (C === wt ? 0 : Hr) + Et);
                } else
                  So(h, Ut);
              si(Dt || Pt ? nr : Wr), mi && Z < 1 && Dt || ct(le + (Z === 1 && !Pt ? Ht : 0));
            }
          }
          x && !Lt.tween && !Nt && !en && De.restart(!0), o && (Gt || y && Z && (Z < 1 || !Gn)) && Dn(o.targets).forEach(function(mt) {
            return mt.classList[Dt || y ? "add" : "remove"](o.className);
          }), s && !z && !M && s(w), ue && !Nt ? (z && (dt && (ot === "complete" ? i.pause().totalProgress(1) : ot === "reset" ? i.restart(!0).pause() : ot === "restart" ? i.restart(!0) : i[ot]()), s && s(w)), (Gt || !Gn) && (u && Gt && Kn(w, u), G[gt] && Kn(w, G[gt]), y && (Z === 1 ? w.kill(!1, 1) : G[gt] = 0), Gt || (gt = Z === 1 ? 1 : 3, G[gt] && Kn(w, G[gt]))), O && !Dt && Math.abs(w.getVelocity()) > (Mi(O) ? O : 2500) && (Ti(w.callbackAnimation), V ? V.progress(1) : Ti(i, ot === "reverse" ? 1 : !Z, 1))) : z && s && !Nt && s(w);
        }
        if (or) {
          var Sr = S ? I / S.duration() * (S._caScrollDist || 0) : I;
          Ye(Sr + (Vt._isFlipped ? 1 : 0)), or(Sr);
        }
        Ur && Ur(-I / S.duration() * (S._caScrollDist || 0));
      }
    }, w.enable = function(M, A) {
      w.enabled || (w.enabled = !0, Mt(D, "resize", Ci), Mt(B ? nt : D, "scroll", qr), et && Mt(a, "refreshInit", et), M !== !1 && (w.progress = ye = 0, oe = ve = ut = rt()), A !== !1 && w.refresh());
    }, w.getTween = function(M) {
      return M && Lt ? Lt.tween : V;
    }, w.setPositions = function(M, A) {
      h && (le += M - H, Ht += A - M - it, p === _t && w.adjustPinSpacing(A - M - it)), w.start = H = M, w.end = bt = A, it = A - M, w.update();
    }, w.adjustPinSpacing = function(M) {
      if ($t && M) {
        var A = $t.indexOf(C.d) + 1;
        $t[A] = parseFloat($t[A]) + M + Et, $t[1] = parseFloat($t[1]) + M + Et, si($t);
      }
    }, w.disable = function(M, A) {
      if (w.enabled && (M !== !1 && w.revert(!0, !0), w.enabled = w.isActive = !1, A || V && V.pause(), Ee = 0, Wt && (Wt.uncache = 1), et && Ot(a, "refreshInit", et), De && (De.pause(), Lt.tween && Lt.tween.kill() && (Lt.tween = 0)), !B)) {
        for (var F = X.length; F--; )
          if (X[F].scroller === D && X[F] !== w)
            return;
        Ot(D, "resize", Ci), Ot(D, "scroll", qr);
      }
    }, w.kill = function(M, A) {
      w.disable(M, A), V && !A && V.kill(), l && delete ws[l];
      var F = X.indexOf(w);
      F >= 0 && X.splice(F, 1), F === Kt && mn > 0 && Kt--, F = 0, X.forEach(function(I) {
        return I.scroller === w.scroller && (F = 1);
      }), F || de || (w.scroll.rec = 0), i && (i.scrollTrigger = null, M && i.revert({
        kill: !1
      }), A || i.kill()), ae && [ae, Ne, Vt, T].forEach(function(I) {
        return I.parentNode && I.parentNode.removeChild(I);
      }), Xi === w && (Xi = 0), h && (Wt && (Wt.uncache = 1), F = 0, X.forEach(function(I) {
        return I.pin === h && F++;
      }), F || (Wt.spacer = 0)), e.onKill && e.onKill(w);
    }, w.enable(!1, !1), Ke && Ke(w), !i || !i.add || it ? w.refresh() : E.delayedCall(0.01, function() {
      return H || bt || w.refresh();
    }) && (it = 0.01) && (H = bt = 0), h && Eu();
  }, a.register = function(e) {
    return Kr || (E = e || Ua(), Va() && window.document && a.enable(), Kr = ki), Kr;
  }, a.defaults = function(e) {
    if (e)
      for (var i in e)
        on[i] = e[i];
    return on;
  }, a.disable = function(e, i) {
    ki = 0, X.forEach(function(s) {
      return s[i ? "kill" : "disable"](e);
    }), Ot($, "wheel", qr), Ot(nt, "scroll", qr), clearInterval(tn), Ot(nt, "touchcancel", Xe), Ot(ft, "touchstart", Xe), nn(Ot, nt, "pointerdown,touchstart,mousedown", mo), nn(Ot, nt, "pointerup,touchend,mouseup", vo), Cn.kill(), rn(Ot);
    for (var n = 0; n < U.length; n += 3)
      sn(Ot, U[n], U[n + 1]), sn(Ot, U[n], U[n + 2]);
  }, a.enable = function() {
    if ($ = window, nt = document, ze = nt.documentElement, ft = nt.body, E && (Dn = E.utils.toArray, ti = E.utils.clamp, ys = E.core.context || Xe, $n = E.core.suppressOverwrites || Xe, Ws = $.history.scrollRestoration || "auto", bs = $.pageYOffset, E.core.globals("ScrollTrigger", a), ft)) {
      ki = 1, Su(), yt.register(E), a.isTouch = yt.isTouch, ar = yt.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), Mt($, "wheel", qr), Na = [$, nt, ze, ft], E.matchMedia ? (a.matchMedia = function(l) {
        var u = E.matchMedia(), f;
        for (f in l)
          u.add(f, l[f]);
        return u;
      }, E.addEventListener("matchMediaInit", function() {
        return Gs();
      }), E.addEventListener("matchMediaRevert", function() {
        return ja();
      }), E.addEventListener("matchMedia", function() {
        Dr(0, 1), Br("matchMedia");
      }), E.matchMedia("(orientation: portrait)", function() {
        return jn(), jn;
      })) : console.warn("Requires GSAP 3.11.0 or later"), jn(), Mt(nt, "scroll", qr);
      var e = ft.style, i = e.borderTopStyle, n = E.core.Animation.prototype, s, o;
      for (n.revert || Object.defineProperty(n, "revert", {
        value: function() {
          return this.time(-0.01, !0);
        }
      }), e.borderTopStyle = "solid", s = Qe(ft), wt.m = Math.round(s.top + wt.sc()) || 0, Zt.m = Math.round(s.left + Zt.sc()) || 0, i ? e.borderTopStyle = i : e.removeProperty("border-top-style"), tn = setInterval(wo, 250), E.delayedCall(0.5, function() {
        return en = 0;
      }), Mt(nt, "touchcancel", Xe), Mt(ft, "touchstart", Xe), nn(Mt, nt, "pointerdown,touchstart,mousedown", mo), nn(Mt, nt, "pointerup,touchend,mouseup", vo), vs = E.utils.checkPrefix("transform"), vn.push(vs), Kr = jt(), Cn = E.delayedCall(0.2, Dr).pause(), jr = [nt, "visibilitychange", function() {
        var l = $.innerWidth, u = $.innerHeight;
        nt.hidden ? (po = l, go = u) : (po !== l || go !== u) && Ci();
      }, nt, "DOMContentLoaded", Dr, $, "load", Dr, $, "resize", Ci], rn(Mt), X.forEach(function(l) {
        return l.enable(0, 1);
      }), o = 0; o < U.length; o += 3)
        sn(Ot, U[o], U[o + 1]), sn(Ot, U[o], U[o + 2]);
    }
  }, a.config = function(e) {
    "limitCallbacks" in e && (Gn = !!e.limitCallbacks);
    var i = e.syncInterval;
    i && clearInterval(tn) || (tn = i) && setInterval(wo, i), "ignoreMobileResize" in e && (Ba = a.isTouch === 1 && e.ignoreMobileResize), "autoRefreshEvents" in e && (rn(Ot) || rn(Mt, e.autoRefreshEvents || "none"), Ia = (e.autoRefreshEvents + "").indexOf("resize") === -1);
  }, a.scrollerProxy = function(e, i) {
    var n = te(e), s = U.indexOf(n), o = Yr(n);
    ~s && U.splice(s, o ? 6 : 2), i && (o ? He.unshift($, i, ft, i, ze, i) : He.unshift(n, i));
  }, a.clearMatchMedia = function(e) {
    X.forEach(function(i) {
      return i._ctx && i._ctx.query === e && i._ctx.kill(!0, !0);
    });
  }, a.isInViewport = function(e, i, n) {
    var s = (Re(e) ? te(e) : e).getBoundingClientRect(), o = s[n ? zr : Lr] * i || 0;
    return n ? s.right - o > 0 && s.left + o < $.innerWidth : s.bottom - o > 0 && s.top + o < $.innerHeight;
  }, a.positionInViewport = function(e, i, n) {
    Re(e) && (e = te(e));
    var s = e.getBoundingClientRect(), o = s[n ? zr : Lr], l = i == null ? o / 2 : i in En ? En[i] * o : ~i.indexOf("%") ? parseFloat(i) * o / 100 : parseFloat(i) || 0;
    return n ? (s.left + l) / $.innerWidth : (s.top + l) / $.innerHeight;
  }, a.killAll = function(e) {
    if (X.slice(0).forEach(function(n) {
      return n.vars.id !== "ScrollSmoother" && n.kill();
    }), e !== !0) {
      var i = Ir.killAll || [];
      Ir = {}, i.forEach(function(n) {
        return n();
      });
    }
  }, a;
}();
W.version = "3.11.5";
W.saveStyles = function(a) {
  return a ? Dn(a).forEach(function(t) {
    if (t && t.style) {
      var r = he.indexOf(t);
      r >= 0 && he.splice(r, 5), he.push(t, t.style.cssText, t.getBBox && t.getAttribute("transform"), E.core.getCache(t), ys());
    }
  }) : he;
};
W.revert = function(a, t) {
  return Gs(!a, t);
};
W.create = function(a, t) {
  return new W(a, t);
};
W.refresh = function(a) {
  return a ? Ci() : (Kr || W.register()) && Dr(!0);
};
W.update = function(a) {
  return ++U.cache && tr(a === !0 ? 2 : 0);
};
W.clearScrollMemory = Za;
W.maxScroll = function(a, t) {
  return dr(a, t ? Zt : wt);
};
W.getScrollFunc = function(a, t) {
  return yr(te(a), t ? Zt : wt);
};
W.getById = function(a) {
  return ws[a];
};
W.getAll = function() {
  return X.filter(function(a) {
    return a.vars.id !== "ScrollSmoother";
  });
};
W.isScrolling = function() {
  return !!ke;
};
W.snapDirectional = $s;
W.addEventListener = function(a, t) {
  var r = Ir[a] || (Ir[a] = []);
  ~r.indexOf(t) || r.push(t);
};
W.removeEventListener = function(a, t) {
  var r = Ir[a], e = r && r.indexOf(t);
  e >= 0 && r.splice(e, 1);
};
W.batch = function(a, t) {
  var r = [], e = {}, i = t.interval || 0.016, n = t.batchMax || 1e9, s = function(u, f) {
    var _ = [], d = [], h = E.delayedCall(i, function() {
      f(_, d), _ = [], d = [];
    }).pause();
    return function(p) {
      _.length || h.restart(!0), _.push(p.trigger), d.push(p), n <= _.length && h.progress(1);
    };
  }, o;
  for (o in t)
    e[o] = o.substr(0, 2) === "on" && Qt(t[o]) && o !== "onRefreshInit" ? s(o, t[o]) : t[o];
  return Qt(n) && (n = n(), Mt(W, "refresh", function() {
    return n = t.batchMax();
  })), Dn(a).forEach(function(l) {
    var u = {};
    for (o in e)
      u[o] = e[o];
    u.trigger = l, r.push(W.create(u));
  }), r;
};
var ko = function(t, r, e, i) {
  return r > i ? t(i) : r < 0 && t(0), e > i ? (i - r) / (e - r) : e < 0 ? r / (r - e) : 1;
}, Qn = function a(t, r) {
  r === !0 ? t.style.removeProperty("touch-action") : t.style.touchAction = r === !0 ? "auto" : r ? "pan-" + r + (yt.isTouch ? " pinch-zoom" : "") : "none", t === ze && a(ft, r);
}, un = {
  auto: 1,
  scroll: 1
}, Fu = function(t) {
  var r = t.event, e = t.target, i = t.axis, n = (r.changedTouches ? r.changedTouches[0] : r).target, s = n._gsap || E.core.getCache(n), o = jt(), l;
  if (!s._isScrollT || o - s._isScrollT > 2e3) {
    for (; n && n !== ft && (n.scrollHeight <= n.clientHeight && n.scrollWidth <= n.clientWidth || !(un[(l = Le(n)).overflowY] || un[l.overflowX])); )
      n = n.parentNode;
    s._isScroll = n && n !== e && !Yr(n) && (un[(l = Le(n)).overflowY] || un[l.overflowX]), s._isScrollT = o;
  }
  (s._isScroll || i === "x") && (r.stopPropagation(), r._gsapAllow = !0);
}, Ja = function(t, r, e, i) {
  return yt.create({
    target: t,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: r,
    onWheel: i = i && Fu,
    onPress: i,
    onDrag: i,
    onScroll: i,
    onEnable: function() {
      return e && Mt(nt, yt.eventTypes[0], Mo, !1, !0);
    },
    onDisable: function() {
      return Ot(nt, yt.eventTypes[0], Mo, !0);
    }
  });
}, Nu = /(input|label|select|textarea)/i, Oo, Mo = function(t) {
  var r = Nu.test(t.target.tagName);
  (r || Oo) && (t._gsapAllow = !0, Oo = r);
}, Yu = function(t) {
  _n(t) || (t = {}), t.preventDefault = t.isNormalizer = t.allowClicks = !0, t.type || (t.type = "wheel,touch"), t.debounce = !!t.debounce, t.id = t.id || "normalizer";
  var r = t, e = r.normalizeScrollX, i = r.momentum, n = r.allowNestedScroll, s = r.onRelease, o, l, u = te(t.target) || ze, f = E.core.globals().ScrollSmoother, _ = f && f.get(), d = ar && (t.content && te(t.content) || _ && t.content !== !1 && !_.smooth() && _.content()), h = yr(u, wt), p = yr(u, Zt), c = 1, g = (yt.isTouch && $.visualViewport ? $.visualViewport.scale * $.visualViewport.width : $.outerWidth) / $.innerWidth, v = 0, m = Qt(i) ? function() {
    return i(o);
  } : function() {
    return i || 2.8;
  }, y, x, b = Ja(u, t.type, !0, n), P = function() {
    return x = !1;
  }, S = Xe, O = Xe, k = function() {
    l = dr(u, wt), O = ti(ar ? 1 : 0, l), e && (S = ti(0, dr(u, Zt))), y = Fr;
  }, C = function() {
    d._gsap.y = Oi(parseFloat(d._gsap.y) + h.offset) + "px", d.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(d._gsap.y) + ", 0, 1)", h.offset = h.cacheID = 0;
  }, z = function() {
    if (x) {
      requestAnimationFrame(P);
      var q = Oi(o.deltaY / 2), Q = O(h.v - q);
      if (d && Q !== h.v + h.offset) {
        h.offset = Q - h.v;
        var w = Oi((parseFloat(d && d._gsap.y) || 0) - h.offset);
        d.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + w + ", 0, 1)", d._gsap.y = w + "px", h.cacheID = U.cache, tr();
      }
      return !0;
    }
    h.offset && C(), x = !0;
  }, D, j, B, Y, G = function() {
    k(), D.isActive() && D.vars.scrollY > l && (h() > l ? D.progress(1) && h(l) : D.resetTo("scrollY", l));
  };
  return d && E.set(d, {
    y: "+=0"
  }), t.ignoreCheck = function(L) {
    return ar && L.type === "touchmove" && z() || c > 1.05 && L.type !== "touchstart" || o.isGesturing || L.touches && L.touches.length > 1;
  }, t.onPress = function() {
    x = !1;
    var L = c;
    c = Oi(($.visualViewport && $.visualViewport.scale || 1) / g), D.pause(), L !== c && Qn(u, c > 1.01 ? !0 : e ? !1 : "x"), j = p(), B = h(), k(), y = Fr;
  }, t.onRelease = t.onGestureStart = function(L, q) {
    if (h.offset && C(), !q)
      Y.restart(!0);
    else {
      U.cache++;
      var Q = m(), w, et;
      e && (w = p(), et = w + Q * 0.05 * -L.velocityX / 0.227, Q *= ko(p, w, et, dr(u, Zt)), D.vars.scrollX = S(et)), w = h(), et = w + Q * 0.05 * -L.velocityY / 0.227, Q *= ko(h, w, et, dr(u, wt)), D.vars.scrollY = O(et), D.invalidate().duration(Q).play(0.01), (ar && D.vars.scrollY >= l || w >= l - 1) && E.to({}, {
        onUpdate: G,
        duration: Q
      });
    }
    s && s(L);
  }, t.onWheel = function() {
    D._ts && D.pause(), jt() - v > 1e3 && (y = 0, v = jt());
  }, t.onChange = function(L, q, Q, w, et) {
    if (Fr !== y && k(), q && e && p(S(w[2] === q ? j + (L.startX - L.x) : p() + q - w[1])), Q) {
      h.offset && C();
      var Xt = et[2] === Q, Me = Xt ? B + L.startY - L.y : h() + Q - et[1], ut = O(Me);
      Xt && Me !== ut && (B += ut - Me), h(ut);
    }
    (Q || q) && tr();
  }, t.onEnable = function() {
    Qn(u, e ? !1 : "x"), W.addEventListener("refresh", G), Mt($, "resize", G), h.smooth && (h.target.style.scrollBehavior = "auto", h.smooth = p.smooth = !1), b.enable();
  }, t.onDisable = function() {
    Qn(u, !0), Ot($, "resize", G), W.removeEventListener("refresh", G), b.kill();
  }, t.lockAxis = t.lockAxis !== !1, o = new yt(t), o.iOS = ar, ar && !h() && h(1), ar && E.ticker.add(Xe), Y = o._dc, D = E.to(o, {
    ease: "power4",
    paused: !0,
    scrollX: e ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: Qa(h, h(), function() {
        return D.pause();
      })
    },
    onUpdate: tr,
    onComplete: Y.vars.onComplete
  }), o;
};
W.sort = function(a) {
  return X.sort(a || function(t, r) {
    return (t.vars.refreshPriority || 0) * -1e6 + t.start - (r.start + (r.vars.refreshPriority || 0) * -1e6);
  });
};
W.observe = function(a) {
  return new yt(a);
};
W.normalizeScroll = function(a) {
  if (typeof a > "u")
    return fe;
  if (a === !0 && fe)
    return fe.enable();
  if (a === !1)
    return fe && fe.kill();
  var t = a instanceof yt ? a : Yu(a);
  return fe && fe.target === t.target && fe.kill(), Yr(t.target) && (fe = t), t;
};
W.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: ms,
  _inputObserver: Ja,
  _scrollers: U,
  _proxies: He,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function() {
      ke || Br("scrollStart"), ke = jt();
    },
    // a way to get the _refreshing value in Observer
    ref: function() {
      return Nt;
    }
  }
};
Ua() && E.registerPlugin(W);
function Iu() {
  qi.registerPlugin(W);
  const a = document.querySelectorAll("[data-animate]");
  a && qi.utils.toArray(a).forEach((t) => {
    t.hasAttribute("data-animate-duration") && t.style.setProperty("--animate-duration", t.getAttribute("data-animate-duration") + "s"), t.hasAttribute("data-opacity-duration") && t.style.setProperty("--animate-opacity-duration", t.getAttribute("data-opacity-duration") + "s"), t.hasAttribute("data-slide-duration") && t.style.setProperty("--animate-slide-duration", t.getAttribute("data-slide-duration") + "s"), t.hasAttribute("data-animate-delay") && t.style.setProperty("--animate-delay", t.getAttribute("data-animate-delay") + "s"), t.hasAttribute("data-animate-easing") && t.style.setProperty("--animate-easing", t.getAttribute("data-animate-easing")), t.hasAttribute("data-animate-offset") && t.style.setProperty("--animate-slide-offset", t.getAttribute("data-animate-offset")), t.hasAttribute("data-animate-background") && t.style.setProperty("--animate-background-color", t.getAttribute("data-animate-background")), t.hasAttribute("data-animate-border-radius") && t.style.setProperty("--animate-border-radius", t.getAttribute("data-animate-border-radius")), t.hasAttribute("data-animate-foreground") && t.style.setProperty("--animate-foreground-color", t.getAttribute("data-animate-foreground"));
    const e = t.getAttribute("data-animate-repeat") === "true";
    W.create({
      trigger: t.dataset.animateTrigger ? t.dataset.animateTrigger : t,
      start: t.dataset.animateStart ? t.dataset.animateStart : "top 70%",
      end: t.dataset.animateEnd ? t.dataset.animateEnd : "",
      onEnter: () => {
        t.classList.add("in-view");
      },
      onEnterBack: () => {
        t.classList.add("in-view"), t.classList.remove("out-view");
      },
      onLeave: () => {
        e == !0 && t.classList.add("out-view");
      },
      onLeaveBack: () => {
        e && t.classList.remove("in-view");
      },
      once: !e
    });
  });
}
function Bu() {
  qi.utils.toArray("[data-parallax-from]").forEach((a) => {
    if (a.getAttribute("data-parallax-to")) {
      const t = JSON.parse(a.getAttribute("data-parallax-from")), r = JSON.parse(a.getAttribute("data-parallax-to")), e = a.getAttribute("data-parallax-scrub");
      let i = e;
      e === "true" || e === "false" ? i = e === "true" : i = Number(e);
      const n = qi.fromTo(a, t, r);
      W.create({
        trigger: a.dataset.parallaxTrigger ? a.dataset.parallaxTrigger : a,
        start: a.dataset.parallaxStart ? a.dataset.parallaxStart : "75% bottom",
        end: a.dataset.parallaxEnd ? a.dataset.parallaxEnd : "",
        scrub: e ? i : !0,
        animation: n
      });
    } else
      console.log("ERROR: data-parallax-to value is missing");
  });
}
function Xu() {
  ll(), Iu(), Bu();
}
export {
  Xu as default
};
