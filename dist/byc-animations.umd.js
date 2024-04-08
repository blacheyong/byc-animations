!function(t,a){"object"==typeof exports&&"undefined"!=typeof module?module.exports=a(require("@studio-freight/lenis"),require("gsap"),require("gsap/ScrollTrigger")):"function"==typeof define&&define.amd?define(["@studio-freight/lenis","gsap","gsap/ScrollTrigger"],a):(t||self).bycAnimations=a(t.Lenis,t.gsap,t.ScrollTrigger)}(this,function(t,a,e){function i(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var r=/*#__PURE__*/i(t),n={prefix:"byc",animateStart:"top 70%",animateEnd:"",animateMarkers:!1,inViewClass:"in-view",outViewClass:"out-view",parallaxStart:"top bottom",parallaxEnd:"",parallaxMarkers:!1,parallaxScrub:!0,smoothScroll:!0,smoothTouch:!1,smoothWheel:!0,scrollCallback:null,scrollContent:document.documentElement,scrollOrientation:"vertical",scrollGestureOrientation:"vertical",scrollDuration:1.2,scrollEasing:function(t){return Math.min(1,1.001-Math.pow(2,-10*t))},scrollInfinite:!1,scrollLerp:.1,scrollNormalizeWheel:!0,scrollTouchMultiplier:2,scrollWheelMultiplier:1,scrollWrapper:window},o=/*#__PURE__*/function(){function t(t,a){void 0===t&&(t={}),Object.assign(this,n,t),this.Lenis=a,this.init()}return t.prototype.init=function(){window.lenis=new this.Lenis({content:this.scrollContent,duration:this.scrollDuration,easing:this.scrollEasing,infinite:this.scrollInfinite,lerp:this.scrollLerp,orientation:this.scrollOrientation,gestureOrientation:this.scrollGestureOrientation,normalizeWheel:this.scrollNormalizeWheel,smoothTouch:this.smoothTouch,smoothWheel:this.smoothWheel,touchMultiplier:this.scrollTouchMultiplier,wheelMultiplier:this.scrollWheelMultiplier,wrapper:this.scrollWrapper}),window.scrollDirection="down",lenis.on("scroll",function(t){window.scrollDirection=1===t.direction?"down":"up"}),requestAnimationFrame(function t(a){lenis.raf(a),requestAnimationFrame(t)})},t}();function s(t,a){(null==a||a>t.length)&&(a=t.length);for(var e=0,i=new Array(a);e<a;e++)i[e]=t[e];return i}function l(t,a){var e="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(e)return(e=e.call(t)).next.bind(e);if(Array.isArray(t)||(e=function(t,a){if(t){if("string"==typeof t)return s(t,a);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?s(t,a):void 0}}(t))||a&&t&&"number"==typeof t.length){e&&(t=e);var i=0;return function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var d=/*#__PURE__*/function(){function t(t,a,e){void 0===t&&(t={}),this.options=t,Object.assign(this,n,t),this.gsap=a,this.ScrollTrigger=e,this.prefix=t.prefix?t.prefix:n.prefix,this.init()}var a=t.prototype;return a.setAnimateAttributes=function(t,a){void 0===a&&(a=null);try{var e=this,i=t;return a&&(i=a),i.hasAttribute("data-animate-easing")&&t.style.setProperty("--"+e.prefix+"-animate-easing",i.getAttribute("data-animate-easing")),i.hasAttribute("data-animate-duration")&&t.style.setProperty("--"+e.prefix+"-animate-duration",i.getAttribute("data-animate-duration")+"s"),i.hasAttribute("data-animate-delay")&&t.style.setProperty("--"+e.prefix+"-animate-delay",i.getAttribute("data-animate-delay")+"s"),i.hasAttribute("data-animate-delay-mobile")&&t.style.setProperty("--"+e.prefix+"-animate-delay-mobile",i.getAttribute("data-animate-delay-mobile")),i.hasAttribute("data-animate-opacity-duration")&&t.style.setProperty("--"+e.prefix+"-animate-opacity-duration",i.getAttribute("data-animate-opacity-duration")+"s"),i.hasAttribute("data-animate-opacity-start")&&t.style.setProperty("--"+e.prefix+"-animate-opacity-start",i.getAttribute("data-animate-opacity-start")),i.hasAttribute("data-animate-opacity-end")&&t.style.setProperty("--"+e.prefix+"-animate-opacity-end",i.getAttribute("data-animate-opacity-end")),i.hasAttribute("data-animate-border-radius")&&t.style.setProperty("--"+e.prefix+"-animate-border-radius",i.getAttribute("data-animate-border-radius")),i.hasAttribute("data-animate-background")&&t.style.setProperty("--"+e.prefix+"-animate-background-color",i.getAttribute("data-animate-background")),i.hasAttribute("data-animate-foreground")&&t.style.setProperty("--"+e.prefix+"-animate-foreground-color",i.getAttribute("data-animate-foreground")),i.hasAttribute("data-animate-reveal-delay")&&t.style.setProperty("--"+e.prefix+"-animate-reveal-delay-extra",i.getAttribute("data-animate-reveal-delay")+"s"),i.hasAttribute("data-animate-reveal-duration")&&t.style.setProperty("--"+e.prefix+"-animate-reveal-duration",i.getAttribute("data-animate-reveal-duration")+"s"),i.hasAttribute("data-animate-slide-duration")&&t.style.setProperty("--"+e.prefix+"-animate-slide-duration",i.getAttribute("data-animate-slide-duration")+"s"),i.hasAttribute("data-animate-slide-offset")&&t.style.setProperty("--"+e.prefix+"-animate-slide-offset",i.getAttribute("data-animate-slide-offset")),i.hasAttribute("data-animate-zoom-start")&&t.style.setProperty("--"+e.prefix+"-animate-zoom-start",i.getAttribute("data-animate-zoom-start")),i.hasAttribute("data-animate-zoom-end")&&t.style.setProperty("--"+e.prefix+"-animate-zoom-end",i.getAttribute("data-animate-zoom-end")),Promise.resolve()}catch(t){return Promise.reject(t)}},a.init=function(){var t=this,a=document.querySelectorAll("[data-animate]");a&&this.gsap.utils.toArray(a).forEach(function(a){var e="true"===a.getAttribute("data-animate-repeat");t.setAnimateAttributes(a),t.ScrollTrigger.create({trigger:a.dataset.animateTrigger?a.dataset.animateTrigger:a,start:a.dataset.animateStart?a.dataset.animateStart:t.animateStart,end:a.dataset.animateEnd?a.dataset.animateEnd:t.animateEnd,markers:t.animateMarkers,onEnter:function(){a.classList.add(t.inViewClass)},onEnterBack:function(){a.classList.add(t.inViewClass),a.classList.remove(t.outViewClass)},onLeave:function(){1==e&&a.classList.add(t.outViewClass)},onLeaveBack:function(){e&&a.classList.remove(t.inViewClass)},once:!e})});var e=document.querySelectorAll("[data-animate-batch]");if(e)for(var i,r=function(){var a=i.value,e=a.querySelectorAll(a.dataset.animateBatch),r=a.dataset.animateEffect,n=t.inViewClass,o=t.outViewClass,s=0,d=!1;if(e){for(var u,c=l(e);!(u=c()).done;){var m=u.value;m.setAttribute("data-animate",r),a.dataset.animateStart&&m.setAttribute("data-animate-start",a.dataset.animateStart),a.dataset.animateEnd&&m.setAttribute("data-animate-end",a.dataset.animateEnd),a.dataset.animateBackground&&m.setAttribute("data-animate-background",a.dataset.animateBackground),a.dataset.animateForeground&&m.setAttribute("data-animate-foreground",a.dataset.animateForeground);var p=a.getAttribute("data-animate-repeat");d="true"===p,s=a.getAttribute("data-animate-delay"),t.setAnimateAttributes(m)}t.ScrollTrigger.batch(e,{onEnter:function(a){t.gsap.to(a,{stagger:{each:s,onComplete:function(){this.targets()[0].classList.add(n)}}})},onEnterBack:function(a){t.gsap.to(a,{stagger:{each:s,onComplete:function(){this.targets()[0].classList.add(n),this.targets()[0].classList.remove(o)}}})},onLeave:function(a){1==d&&t.gsap.to(a,{stagger:{each:s,onComplete:function(){this.targets()[0].classList.add(o)}}})},onLeaveBack:function(a){d&&t.gsap.to(a,{stagger:{each:s,onComplete:function(){this.targets()[0].classList.remove(n)}}})}})}a.classList.add("is-ready")},n=l(e);!(i=n()).done;)r()},t}(),u=/*#__PURE__*/function(){function t(t,a,e){void 0===t&&(t={}),Object.assign(this,n,t),this.gsap=a,this.ScrollTrigger=e,this.init()}return t.prototype.init=function(){var t=this;this.gsap.utils.toArray("[data-parallax-from]").forEach(function(a){if(a.getAttribute("data-parallax-to")){var e,i=JSON.parse(a.getAttribute("data-parallax-from")),r=JSON.parse(a.getAttribute("data-parallax-to")),n=a.getAttribute("data-parallax-scrub");e="true"===n||"false"===n?"true"===n:Number(n);var o=t.gsap.fromTo(a,i,r);t.ScrollTrigger.create({trigger:a.dataset.parallaxTrigger?a.dataset.parallaxTrigger:a,start:a.dataset.parallaxStart?a.dataset.parallaxStart:t.parallaxStart,end:a.dataset.parallaxEnd?a.dataset.parallaxEnd:t.parallaxEnd,scrub:n?e:t.parallaxScrub,animation:o,markers:t.parallaxMarkers})}else console.log("ERROR: data-parallax-to value is missing")})},t}();/*#__PURE__*/
return function(){function t(t){void 0===t&&(t={}),a.gsap.registerPlugin(e.ScrollTrigger),this.options=t,Object.assign(this,n,t),this.init()}var i=t.prototype;return i.init=function(){window.matchMedia("(prefers-reduced-motion: no-preference)").matches&&(this.smoothScroll&&new o(this.options,r.default),this.initAnimations())},i.initAnimations=function(){new d(this.options,a.gsap,e.ScrollTrigger),new u(this.options,a.gsap,e.ScrollTrigger)},i.destroy=function(t,a){void 0===t&&(t=!0),void 0===a&&(a=!0),t&&e.ScrollTrigger.killAll(),a&&window.lenis.destroy()},i.refresh=function(){e.ScrollTrigger.refresh()},i.scrollTo=function(t,a){window.lenis.scrollTo(t,a)},i.start=function(){window.lenis.start()},i.stop=function(){window.lenis.stop()},t}()});
//# sourceMappingURL=byc-animations.umd.js.map
