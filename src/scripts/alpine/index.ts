import type { Alpine } from "alpinejs";
import { buttonHover } from "./button";
import { mobileNav } from "./mobileNav";

export default (Alpine: Alpine) => {
  Alpine.data("buttonHover", buttonHover);
  Alpine.data("mobileNav", mobileNav);
};
