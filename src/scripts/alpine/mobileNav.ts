type MobileNavComponent = AlpineComponent & {
  isOpen: boolean;
  scrollY: number;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export function mobileNav() {
  return {
    isOpen: false,
    scrollY: 0,

    open(this: MobileNavComponent) {
      if (this.isOpen) {
        return;
      }

      this.scrollY = window.scrollY;
      this.isOpen = true;

      document.documentElement.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${this.scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    },

    close(this: MobileNavComponent) {
      if (!this.isOpen) {
        return;
      }

      this.isOpen = false;

      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, this.scrollY);
    },

    toggle(this: MobileNavComponent) {
      if (this.isOpen) {
        this.close();
        return;
      }

      this.open();
    },
  };
}
