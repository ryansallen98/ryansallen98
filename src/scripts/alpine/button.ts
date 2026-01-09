export function buttonHover() {
  return {
    onMouseEnter(this: AlpineComponent) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      if (this.$el.hasAttribute("disabled")) return;

      const initialText = this.$refs.initialText;
      const hoverText = this.$refs.hoverText;
      const initialIconStart = this.$refs.initialIconStart;
      const initialIconEnd = this.$refs.initialIconEnd;
      const hoverIconStart = this.$refs.hoverIconStart;
      const hoverIconEnd = this.$refs.hoverIconEnd;

      initialText.style.transform = "translateY(-100%)";
      hoverText.style.transform = "translateY(0)";
      hoverText.style.opacity = "1";
      hoverText.style.filter = "blur(0)";

      if (initialIconStart && hoverIconStart) {
        initialIconStart.style.transform = "translateX(-100%)";
        hoverIconStart.style.transform = "translateX(0)";
      }

      if (initialIconEnd && hoverIconEnd) {
        initialIconEnd.style.transform = "translateX(100%)";
        hoverIconEnd.style.transform = "translateX(0)";
      }
    },

    onMouseLeave(this: AlpineComponent) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      if (this.$el.hasAttribute("disabled")) return;

      const initialText = this.$refs.initialText;
      const hoverText = this.$refs.hoverText;
      const initialIconStart = this.$refs.initialIconStart;
      const initialIconEnd = this.$refs.initialIconEnd;
      const hoverIconStart = this.$refs.hoverIconStart;
      const hoverIconEnd = this.$refs.hoverIconEnd;

      initialText.style.transform = "translateY(0)";
      hoverText.style.transform = "translateY(100%)";
      hoverText.style.opacity = "0";
      hoverText.style.filter = "blur(5px)";

      if (initialIconStart && hoverIconStart) {
        initialIconStart.style.transform = "translateX(0)";
        hoverIconStart.style.transform = "translateX(100%)";
      }

      if (initialIconEnd && hoverIconEnd) {
        initialIconEnd.style.transform = "translateX(0)";
        hoverIconEnd.style.transform = "translateX(-100%)";
      }
    },
  };
}
