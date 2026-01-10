import type { Alpine } from "alpinejs";
import { buttonHover } from "./button";

export default (Alpine: Alpine) => {
  Alpine.data("buttonHover", buttonHover);
};
