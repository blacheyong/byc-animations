<h1 align="center">Blache Yong &amp; CO Animations Library Documentation</h1>

Welcome to the Blache Yong & Co animations library! This library provides utilities for on-scroll animations, viewport entry effects, and parallax features. Powered by GSAP and ScrollTrigger, it enables dynamic and engaging animations.

<a href="https://blacheyong.github.io/byc-animations/" target="_blank">Visit our demo page</a>

## CDN links
| Description               | URL                                                                   |
| -----------------------   | --------------------------------------------------------------------- | 
| CSS                       | `https://unpkg.com/byc-animations/bundled/byc-animations.min.css`     | 
| JS                        | `https://unpkg.com/byc-animations/bundled/byc-animations.min.js`      | 


```js
<script>
	let animations
    animations = new BycAnimations();
</script>
```

## Package manager (NPM)

```sh
npm install byc-animations
```

## Getting Started

### Javacript
```js
import BycAnimations from 'byc-animations';

const animation = new BycAnimations();
```

### Instance settings

| Option                    | Type                   | Default         | Description                                                                 |
| -----------------------   | ---------------------- | --------------- | --------------------------------------------------------------------------- |
| `wrapper`            | `string`               | `document` (SSR-safe) | Specifies the wrapper element for scoping animations (AnimateContent and Parallax) to a specific wrapper instead of the entire document. In SSR, it is resolved at runtime in the browser.     |
| `animateStart`            | `string`               | `top 94%`       | Trigger animation when a specific part of the element meets a location in the viewport.     |
| `animateMobileStart`      | `string`               | `top bottom`    | Similar to animateStart, but for viewports smaller than 768px.    |
| `animateEnd`              | `string`               | `''`            | Defines when the animation should stop based on viewport positions.      |
| `animateMarkers`          | `boolean, object`      | `false`         | Displays markers during development to debug animation trigger points. Example:  `{startColor: "green", endColor: "red", fontSize: "12px"}`       |
| `inViewClass`             | `string`               | `in-view`       | Class applied to an element when it enters the viewport.                |
| `outViewClass`            | `string`               | `out-view`      | Class applied when the element leaves the viewport.            |
| `parallaxStart`           | `string`               | `top bottom`    | Trigger parallax animation when a specific part of the element meets a location in the viewport.    |
| `parallaxEnd`             | `string`               | `''`            | Defines the stopping point for parallax effects.      |
| `parallaxMarkers`         | `boolean, object`      | `false`         | Displays visual markers for parallax debug. Example: `{startColor: "green", endColor: "red", fontSize: "12px"}`              |
| `parallaxScrub`           | `boolean, number`      | `true`          | If `true`, syncs animation progress to scroll. Use a `number` for smooth scrubbing in seconds (e.g., `0.5`).        |
| `smoothScroll`            | `boolean`              | `true`          | Disables smooth scrolling if set to `false`.                           |
| `scrollOrientation`       | `string`               | `vertical`      | Scroll orientation: `vertical` or `horizontal`.                                                                 |
| `scrollGestureOrientation`| `string`               | `vertical`      | Gesture direction on trackpad/magic mouse or touch: `vertical`, `horizontal` or `both`.                       |
| `scrollDuration`          | `number`               | `1.2`           | Animation duration for scroll effects in seconds.                              |
| `scrollEasing`            | `function`             | `Math.min(1, 1.001 - Math.pow(2, -10 * t))`           | Easing function for scroll animations. <a href="https://easings.net/en">Expore Easings</a>.    |
| `scrollInfinite`          | `boolean`              | `false`         | Enable infinite scrolling.                                                  |
| `scrollTouchMultiplier`   | `number`               | `2`             | Multiply touch action to scroll faster than finger movement.                                    |
| `scrollWheelMultiplier`   | `number`               | `1`             | Multiply wheel action to scroll faster than wheel movement.                                    |
| `scrollWrapper`           | `HTMLElement, Window`  | `window`        | The element that will be used as the scroll container.                      |

### Styles

#### SASS
Import the SASS file

```SCSS
@import "byc-animations/dist/byc-animations";
```

You can override the following variables (need to be done before importing the BYC-animation SASS files):

| Variable                         | Default                | Description                                                                                   |
| -------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------- |
| `$animate-easing`                | `ease-in-out` | Default easing function for transitions.  
| `$animate-delay`                 | `0s`          | Delay before animation starts.
| `$animate-duration`              | `0.35s`       | Duration of the animation.                                                             |  
| `$animate-opacity-duration`      | `0.35s`       | Default opacity duration value   
| `$animate-opacity-start`         | `0`           | Starting opacity for animations. 
| `$animate-opacity-end`           | `1`           | Ending opacity for animations.   
| `$animate-border-radius`         | `0`           | Default border-radius value on reveal pseudo-elements 
| `$animate-background-color`      | `#FFFFFF`     | Background color for reveal animations.
| `$animate-foreground-color`      | `#F4F4F4`     | Default foreground-color value of reveal animation 
| `$animate-reveal-delay`          | `0.35s`       | Default reveal delay value   
| `$animate-reveal-duration`       | `0.4s`        | Default reveal duration value   
| `$animate-reveal-translate-y`    | `-100%`       | Default reveal translate-y value   
| `$animate-slide-duration`        | `0.65s`       | Default slide duration value    
| `$animate-slide-offset`          | `50px`        | Offset value for slide animations.
| `$animate-zoom-start`            | `.5`          | Default zoom start value                             |
| `$animate-zoom-end`              | `none`        | Default zoom end value                               |

### CSS

| Variable                         | Default                | Description                                                                                   |
| -------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------- |
| `--#{$prefix}-animate-easing`                | `ease-in-out` | Default transition easing value  
| `--#{$prefix}-animate-delay`                 | `0s`          | Default delay value  
| `--#{$prefix}-animate-duration`              | `0.35s`       | Default transition duration value                                                             |  
| `--#{$prefix}-animate-opacity-duration`      | `0.35s`       | Default opacity duration value   
| `--#{$prefix}-animate-opacity-start`         | `0`           | Default opacity start value  
| `--#{$prefix}-animate-opacity-end`           | `1`           | Default opacity end value   
| `--#{$prefix}-animate-border-radius`         | `0`           | Default border-radius value on reveal pseudo-elements 
| `--#{$prefix}-animate-background-color`      | `#FFFFFF`     | Default background-color value of reveal animation 
| `--#{$prefix}-animate-foreground-color`      | `#F4F4F4`     | Default foreground-color value of reveal animation 
| `--#{$prefix}-animate-reveal-delay`          | `0.35s`       | Default reveal delay value   
| `--#{$prefix}-animate-reveal-duration`       | `0.4s`        | Default reveal duration value  
| `--#{$prefix}-animate-reveal-translate-y`    | `-100%`       | Default reveal translate-y value    
| `--#{$prefix}-animate-slide-duration`        | `0.65s`       | Default slide duration value    
| `--#{$prefix}-animate-slide-offset`          | `50px`        | Default slide offset value   
| `--#{$prefix}-animate-zoom-start`            | `.5`          | Default zoom start value                             |
| `--#{$prefix}-animate-zoom-end`              | `none`        | Default zoom end value                               |

### Markup

```HTML
<div data-animate="fade">Lorem ipsum</div>
<p data-animate="slide" data-animate-delay=".15">Dolor sit amet consecatur</p>
```

## Element attributes for animate-content function

| Attribute                            | Type                     | Description                                                                              |
| ------------------------------------ | ------------------------ | ---------------------------------------------------------------------------------------- |
| `data-animate`                       | `string` (`fade`, `reveal`, `slide`, `zoom`)                         | Detect if element is in viewport. Add classes `.in-view` and `.out-view`. Applies selected animation (CSS). |
| `data-animate-effect`                | `string` (`fade`, `reveal`, `slide`, `zoom`)                         | Batch method: Detect if targeted elements are in viewport. Add classes `.in-view` and `.out-view`. Applies selected animation (CSS). |
| `data-animate-batch`                 | `string`                 | (Optional) Batch method: Use on wrapper elements and specify which children's class to target. It will apply the desired data-attributes on those. |
| `data-animate-repeat`                | `boolean`                | (Optional) Allow to repeat animation every time element enters viewport |
| `data-animate-start`                 | `string`                 | (Optional) Override default start position. First value represents the part of the trigger which will initiate the animation once it meets the second value. The second value represents a location in the viewport. Ex: `top center`  |
| `data-animate-mobile-start`          | `string`                 | (Optional) For viewports < 768px. Override default start position. First value represents the part of the trigger which will initiate the animation once it meets the second value. The second value represents a location in the viewport. Ex: `top center`  |
| `data-animate-end`                   | `string`                 | (Optional) Override default end position. First value represents the part of the trigger which will trigger the animation once it meets the second value. The second value represents a location in the viewport. Ex: `center 20%`  |
| `data-animate-trigger`               | `string`                 | (Optional) Override default trigger element. Ex: `#page-title`  |
| `data-animate-easing`                | `string`                 | (Optional) Override default easing. Ex: `ease-out` or `cubic-bezier(0.550, 0.055, 0.675, 0.190)`  |
| `data-animate-delay`                 | `number`                 | (Optional) Set transition-delay on element. Value in seconds.    
| `data-animate-duration`              | `number`                 | (Optional) Override default transition duration CSS property. Value in seconds. |
| `data-animate-opacity-duration`      | `number`                 | (Optional) Override default transition duration CSS property of opacity. Value in seconds. |
| `data-animate-opacity-start`         | `number`                 | (Optional) Override default opacity CSS property at the beginning of the animation. Value from 0.0 - 1.0 |
| `data-animate-opacity-end`           | `number`                 | (Optional) Override default opacity CSS property at the end of the animation. Value from 0.0 - 1.0 |
| `data-animate-border-radius`         | `string`                 | (Optional) Specific to `reveal` animations, border-radius value in any unit (px, %, rem, em) |
| `data-animate-background`            | `string`                 | (Optional) Specific to `reveal` animations, background-color of the `::before` pseudo-element |
| `data-animate-foreground`            | `string`                 | (Optional) Specific to `reveal` animations, background-color of the `::after` pseudo-element |
| `data-animate-reveal-delay`          | `number`                 | (Optional) Specific to `reveal` animations, delay transition between the background and foreground pseudo-elements. Value in seconds. |
| `data-animate-reveal-duration`       | `number`                 | (Optional) Specific to `reveal` animations, override default transition duration of background and foreground animations. Value in seconds. |
| `data-animate-slide-duration`        | `number`                 | (Optional) Override default transition duration CSS property of translateY. Value in seconds. |                            |
| `data-animate-slide-offset`          | `string`                 | (Optional) Override default translateY value for "slide" transition. Can be in px or %  |
| `data-animate-zoom-start`            | `number`                 | (Optional) Override default scale CSS property at the beginning of the animation. Value is a number or a percentage. |
| `data-animate-zoom-end`              | `number`                 | (Optional) Override default scale CSS property at the end of the animation. Value is a number or a percentage. |
| `data-show-markers`                  | `boolean`                | (Optional) Display markers for a specific element. |


## Element attributes for parallax function

| Attribute                    | Type                     | Description                                                                              |
| ---------------------------- | ------------------------ | ---------------------------------------------------------------------------------------- |
| `data-parallax-from`         | `string`                 | Starting values for parallax animation. Example: `{ "yPercent": -12, "scale": 1.12 }` |
| `data-parallax-to`           | `string`                 | Ending values for parallax animation. Example: `{ "yPercent": 12, "scale": 1.12 }` |
| `data-parallax-start`        | `string`                 | (Optional) Override default start position. First value represents the part of the trigger which will initiate the animation once it meets the second value. The second value represents a location in the viewport. Ex: `top center`  |
| `data-parallax-end`          | `string`                 | (Optional) Override default end position. First value represents the part of the trigger which will trigger the animation once it meets the second value. The second value represents a location in the viewport. Ex: `center 20%`  |
| `data-parallax-scrub`        | `boolean, number`        | (Optional) <ul style="margin-top: 5px; padding-left: 15px;"><li> **Boolean:** if `true`, links the animation's progress directly to the ScrollTrigger's progress.</li> <li> **Number:** The amount of time (in seconds) that the playhead should take to "catch up", so scrub: 0.5 would cause the animation's playhead to take 0.5 seconds to catch up with the scrollbar's position. It's great for smoothing things out.</li></ul> |
| `data-parallax-trigger`      | `string`                 | (Optional) Override default trigger element. Ex: `#page-title`. When using `options.wrapper`, selector resolution is scoped to that wrapper first. |
| `data-parallax-markers`      | `boolean, object`        | (Optional) Show ScrollTrigger markers on a specific element regardless of the global `parallaxMarkers` option. Accepts `true`/`false` or an object like `{ "startColor": "#0f0", "endColor": "#f00" }` if supported by your GSAP version. |

### Instance methods

| Method                       | Description                                                | Arguments                                                                                                                                                                 |
| ---------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `destroy(animate, scroll)`   | `Destroys scroll-related resources.`                       | <ul style="padding-left: 15px;"><li>`animate` (boolean): Destroy all ScrollTriggers, `true` by default.</li><li>`scroll` (boolean): Stop the RAF loop and destroy Lenis cleanly, `true` by default.</li></ul>       |
| `refresh()`                  | `Recalculates the positioning of all of the ScrollTriggers on the page; this typically happens automatically when the window/scroller resizes but you can force it by calling .refresh()`  |        |
| `scrollTo(target, options)`  | `Scroll to target.`                                        | `target`: goal to reach <ul><li>`number`: value to scroll in pixels</li><li>`string`: CSS selector or keyword (top, left, start, bottom, right, end)</li><li>`HTMLElement`: DOM element</li></ul> `target`: goal to reach <ul><li>`offset` (number): equivalent to <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-top">scroll-padding-top</a></li><li>`lerp` (number): animation lerp intensity</li><li>`duration` (number): animation duration (in seconds)</li><li>`easing` (function): animation easing</li><li>`immediate` (boolean): ignore duration, easing and lerp</li><li>`lock` (boolean): whether or not to prevent the user from scrolling until the target is reached</li><li>`force` (boolean): reach target even if instance is stopped</li><li>`onComplete` (function): called when the target is reached</li></ul>     |
| `start()`                    | `Resumes the scroll`                                       |        |
| `stop()`                     | `Pauses the scroll`                                        |        |
