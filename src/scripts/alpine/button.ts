export function buttonHover() {
  return {
    onMouseEnter(this: AlpineComponent) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      if (this.$el.hasAttribute("disabled")) return;

      const initialText = this.$refs.initialText;
      const hoverText = this.$refs.hoverText;
      const initialIcon = this.$refs.initialIcon;
      const hoverIcon = this.$refs.hoverIcon;
      const initialIconStart = this.$refs.initialIconStart;
      const initialIconEnd = this.$refs.initialIconEnd;
      const hoverIconStart = this.$refs.hoverIconStart;
      const hoverIconEnd = this.$refs.hoverIconEnd;

      if (initialText && hoverText) {
        initialText.style.transform = "translateY(-100%)";
        hoverText.style.transform = "translateY(0)";
        hoverText.style.opacity = "1";
        hoverText.style.filter = "blur(0)";
      }

      if (initialIcon && hoverIcon) {
        initialIcon.style.transform = "translateY(-100%)";        
        initialIcon.style.opacity = "0";
        initialIcon.style.filter = "blur(5px)";
        hoverIcon.style.transform = "translateY(0)";
        hoverIcon.style.opacity = "1";
        hoverIcon.style.filter = "blur(0)";
      }

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
      const initialIcon = this.$refs.initialIcon;
      const hoverIcon = this.$refs.hoverIcon;
      const initialIconStart = this.$refs.initialIconStart;
      const initialIconEnd = this.$refs.initialIconEnd;
      const hoverIconStart = this.$refs.hoverIconStart;
      const hoverIconEnd = this.$refs.hoverIconEnd;

      if (initialText && hoverText) {
        initialText.style.transform = "translateY(0)";
        hoverText.style.transform = "translateY(100%)";
        hoverText.style.opacity = "0";
        hoverText.style.filter = "blur(5px)";
      }

      if (initialIcon && hoverIcon) {
        initialIcon.style.transform = "translateY(0%)";
        initialIcon.style.opacity = "1";
        initialIcon.style.filter = "blur(0)";
        hoverIcon.style.transform = "translateY(100%)";
        hoverIcon.style.opacity = "0";
        hoverIcon.style.filter = "blur(5px)";
      }

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
