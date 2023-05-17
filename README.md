<p align="center">
<img src="https://github.com/blacheyong/byc-animations/assets/34248276/f155d981-a9b0-4637-a41c-3579968dcee1" width="100" alt="BYCO" />
</p>

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
| `$default-easing`       | `ease-in-out`          | Default transition-easing value                                                               |

### Markup

```HTML
<div data-animate="fade">Lorem ipsum</div>
<p data-animate="slide" data-animate-delay=".15">Dolor sit amet consecatur</p>
```

## Element attributes

| Attribute                    | Values                   | Description                                                                              |
| ---------------------------- | ------------------------ | ---------------------------------------------------------------------------------------- |
| `data-animate`               | `fade`, `slide`, `zoom`, `reveal`                         | Detect if element is in viewport. Add classes `.in-view` and `.out-view`. Applies selected animation (CSS). |
| `data-animate-duration`      | `number`                 | (Optional) Override default transition-duration CSS property. Value in seconds. |
| `data-opacity-duration`      | `number`                 | (Optional) Override default transition-duration CSS property of opacity. Value in seconds. |
| `data-slide-duration`        | `number`                 | (Optional) Override default transition-duration CSS property of opacity. Value in seconds. |
| `data-animate-delay`         | `number`                 | (Optional) Set transition-delay on elemenet. Value in seconds.                                |
| `data-animate-easing`        | `string`                 | (Optional) Override default easing. Ex: `ease-out` or `cubic-bezier(0.550, 0.055, 0.675, 0.190)`  |
| `data-animate-offset`        | `string`                 | (Optional) Override default translateY value for "slide" transition. Can be in px or %  |
| `data-animate-repeat`        | `string`                 | (Optional) Allow to repeat animation every time element enters viewport |



