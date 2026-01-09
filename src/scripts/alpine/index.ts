import { buttonHover } from "./button";

document.addEventListener("alpine:init", () => {
  window.Alpine.data("buttonHover", buttonHover);
});
