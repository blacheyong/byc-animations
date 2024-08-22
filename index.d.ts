declare module "byc-animations" {
  interface BycAnimationsOptions {
    // Animate Content
    prefix?: string;
    animateStart?: string;
    animateEnd?: string;
    animateMarkers?: boolean;
    inViewClass?: string;
    outViewClass?: string;

    // Parallax
    parallaxStart?: string;
    parallaxEnd?: string;
    parallaxMarkers?: boolean;
    parallaxScrub?: boolean;

    // Smooth Scroll
    smoothScroll?: boolean;
    smoothTouch?: boolean;
    smoothWheel?: boolean;
    scrollCallback?: (() => void) | null;
    scrollContent?: HTMLElement | Document;
    scrollOrientation?: "vertical" | "horizontal";
    scrollGestureOrientation?: "vertical" | "horizontal";
    scrollDuration?: number;
    scrollEasing?: (t: number) => number;
    scrollInfinite?: boolean;
    scrollLerp?: number;
    scrollNormalizeWheel?: boolean;
    scrollTouchMultiplier?: number;
    scrollWheelMultiplier?: number;
    scrollWrapper?: Window;
  }

  export default class BycAnimations {
    constructor(options?: BycAnimationsOptions);

    init(): void;
    initAnimations(): void;
    destroy(animate?: boolean, scroll?: boolean): void;
    refresh(): void;
    scrollTo(target: HTMLElement | number | string, options?: any): void;
    start(): void;
    stop(): void;
  }
}
