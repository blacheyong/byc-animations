<h1 align="center">Blache Yong &amp; CO animations library</h1>

On scroll animation utilities, elements entering viewport + parallax effects. This library uses GSAP and Scrolltrigger.

## Installation

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
| `animateStart`            | `string`               | `top 70%`       | First value represents the part of the trigger which will initiate the animation once it meets the second value. The second value represents a location in the viewport.     |
| `animateEnd`              | `string`               | `''`            | First value represents the part of the trigger which will trigger the animation once it meets the second value. The second value represents a location in the viewport.      |
| `animateMarkers`          | `boolean, object`      | `false`         | Enable visual markers for animate-content during development to see exactly where the start/end/trigger points are. Customization options abound, like markers: `{startColor: "green", endColor: "red", fontSize: "12px"}`       |
| `inViewClass`             | `string`               | `in-view`       | HTML class to apply on an element once its in the viewport.                 |
| `outViewClass`            | `string`               | `out-view`      | HTML class to apply on an element once its outside the viewport.            |
| `parallaxStart`           | `string`               | `top bottom`    | First value represents the part of the trigger which will initiate the animation once it meets the second value. The second value represents a location in the viewport.     |
| `parallaxEnd`             | `string`               | `''`            | First value represents the part of the trigger which will trigger the animation once it meets the second value. The second value represents a location in the viewport.      |
| `parallaxMarkers`         | `boolean, object`      | `false`         | Enable visual markers for parallax during development to see exactly where the start/end/trigger points are. Customization options abound, like markers: `{startColor: "green", endColor: "red", fontSize: "12px"}`              |
| `parallaxScrub`           | `boolean, number`      | `true`          | <ul style="padding-left: 15px;"><li> **Boolean:** if `true`, links the animation's progress directly to the ScrollTrigger's progress.</li> <li> **Number:** The amount of time (in seconds) that the playhead should take to "catch up", so scrub: 0.5 would cause the animation's playhead to take 0.5 seconds to catch up with the scrollbar's position. It's great for smoothing things out.</li></ul>        |
| `smoothScroll`            | `boolean`              | `true`          | Set to `false` to disable lenis smooth scrolling.                           |
| `scrollDirection`         | `string`               | `vertical`      | Scroll direction: `vertical` or `horizontal`                                |
| `scrollGestureDirection`  | `string`               | `vertical`      | Your gesture direction on your trackpad/magic mouse or your touch devices. `vertical`, `horizontal` or `both`                                                                |
| `scrollDuration`          | `number`               | `1.2`           | The duration of scroll animation (in seconds).                              |
| `scrollEasing`            | `function`             | `Math.min(1, 1.001 - Math.pow(2, -10 * t))`           | The easing function to use for the scroll animation, our default is custom but you can pick one from <a href="https://easings.net/en">Easings.net</a>.    |
| `scrollInfinite`          | `boolean`              | `false`         | Enable infinite scrolling.                                                  |
| `scrollTouchMultiplier`   | `number`               | `2`             | Multiply touch action to scroll faster than finger movement.                                    |
| `scrollWheelMultiplier`   | `number`               | `1`             | Multiply wheel action to scroll faster than wheel movement.                                    |
| `scrollWrapper`           | `HTMLElement, Window`  | `window`        | The element that will be used as the scroll container.                      |

### Styles

#### SASS
Import the SASS file

```SCSS
@import "byc-animations/dist/sass/animations";
```

You can override the following variables (need to be done before importing the BYC-animation SASS files):

| Variable                | Default                | Description                                                                                   |
| ----------------------- | ---------------------- | --------------------------------------------------------------------------------------------- |
| `$default-time`         | `0.35s`                | Default transition-duration value                                                             |
| `$default-easing`       | `ease-in-out`          | Default transition-easing value    
| `$opacity-time`         | `0.35s`                | Default opacity-time value   
| `$reveal-time`          | `0.4s`                 | Default reveal-time value   
| `$reveal-delay`         | `0.35s`                | Default reveal-delay value   
| `$translate-time`       | `0.65s`                | Default translate-time value   
| `$animate-delay`        | `0s`                   | Default animate-delay value   
| `$animate-slide-offset` | `50px`                 | Default animate-slide-offset value   
| `$animate-zoom-start`   | `.5`                   | Default animate-zoom-start value                                                               |

### Markup

```HTML
<div data-animate="fade">Lorem ipsum</div>
<p data-animate="slide" data-animate-delay=".15">Dolor sit amet consecatur</p>
```

## Element attributes for animate-content function

| Attribute                    | Type                     | Description                                                                              |
| ---------------------------- | ------------------------ | ---------------------------------------------------------------------------------------- |
| `data-animate`               | `fade`, `reveal`, `slide`, `zoom`                         | Detect if element is in viewport. Add classes `.in-view` and `.out-view`. Applies selected animation (CSS). |
| `data-animate-duration`      | `number`                 | (Optional) Override default transition-duration CSS property. Value in seconds. |
| `data-opacity-duration`      | `number`                 | (Optional) Override default transition-duration CSS property of opacity. Value in seconds. |
| `data-slide-duration`        | `number`                 | (Optional) Override default transition-duration CSS property of opacity. Value in seconds. |
| `data-animate-delay`         | `number`                 | (Optional) Set transition-delay on elemenet. Value in seconds.                                |
| `data-animate-easing`        | `string`                 | (Optional) Override default easing. Ex: `ease-out` or `cubic-bezier(0.550, 0.055, 0.675, 0.190)`  |
| `data-animate-offset`        | `string`                 | (Optional) Override default translateY value for "slide" transition. Can be in px or %  |
| `data-animate-repeat`        | `boolean`                | (Optional) Allow to repeat animation every time element enters viewport |
| `data-animate-start`         | `string`                 | (Optional) Override default start position. First value represents the part of the trigger which will initiate the animation once it meets the second value. The second value represents a location in the viewport. Ex: `top center`  |
| `data-animate-end`           | `string`                 | (Optional) Override default end position. First value represents the part of the trigger which will trigger the animation once it meets the second value. The second value represents a location in the viewport. Ex: `center 20%`  |
| `data-animate-trigger`       | `string`                 | (Optional) Override default trigger element. Ex: `#page-title`  |
| `data-animate-background`    | `string`                 | (Optional) Specific to `reveal` animations, background-color of the `::before` pseudo-element |
| `data-animate-foreground`    | `string`                 | (Optional) Specific to `reveal` animations, background-color of the `::after` pseudo-element |
| `data-animate-border-radius` | `string`                 | (Optional) Specific to `reveal` animations, border-radius value in any unit (px, %, rem, em) |


## Element attributes for parallax function

| Attribute                    | Type                     | Description                                                                              |
| ---------------------------- | ------------------------ | ---------------------------------------------------------------------------------------- |
| `data-parallax-from`         | `string`                 | Define the starting values to animate "from". Ex: `{ "opacity": "1", "translateY": "0" }`|
| `data-parallax-to`           | `string`                 | Define the end values to animate "to". Ex: `{ "opacity": "0.25", "translateY": "-350px" }` |
| `data-parallax-start`        | `string`                 | (Optional) Override default start position. First value represents the part of the trigger which will initiate the animation once it meets the second value. The second value represents a location in the viewport. Ex: `top center`  |
| `data-parallax-end`          | `string`                 | (Optional) Override default end position. First value represents the part of the trigger which will trigger the animation once it meets the second value. The second value represents a location in the viewport. Ex: `center 20%`  |
| `data-parallax-scrub`        | `boolean, number`        | (Optional) <ul style="margin-top: 5px; padding-left: 15px;"><li> **Boolean:** if `true`, links the animation's progress directly to the ScrollTrigger's progress.</li> <li> **Number:** The amount of time (in seconds) that the playhead should take to "catch up", so scrub: 0.5 would cause the animation's playhead to take 0.5 seconds to catch up with the scrollbar's position. It's great for smoothing things out.</li></ul> |
| `data-parallax-trigger`      | `string`                 | (Optional) Override default trigger element. Ex: `#page-title`  |