import type Alpine from "alpinejs";

declare global {
  interface Window {
    Alpine: typeof Alpine;
  }

  interface AlpineComponent {
    $refs: Record<string, HTMLElement>;
    $el: HTMLElement;
  }
}
