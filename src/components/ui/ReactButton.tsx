import type { ButtonHTMLAttributes, ComponentType, SVGProps } from "react";
import { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@scripts/utils";

type ButtonIcon = ComponentType<SVGProps<SVGSVGElement>>;

const buttonVariants = cva(
  "py-5 px-8 font-base uppercase relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4.5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        light: "bg-background-light text-foreground-light",
        dark: "bg-background-dark text-foreground-dark",
        outline: "border border-divider-dark text-foreground-dark",
      },
    },
    defaultVariants: {
      variant: "light",
    },
  }
);

const animationWrapperClasses =
  "relative inline-flex overflow-hidden justify-center items-center";
const initialElementClasses =
  "relative transition-all duration-400 ease-in-out inline-block";
const hoverElementClasses =
  "absolute inset-0 transition-all duration-500 ease-in-out inline-block";

type ReactButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    text: string;
    hoverText?: string | null;
    iconStart?: ButtonIcon | null;
    iconEnd?: ButtonIcon | null;
    disableIconAnimation?: boolean;
  };

export function ReactButton({
  variant = "light",
  className,
  text,
  hoverText = null,
  iconStart: IconStart = null,
  iconEnd: IconEnd = null,
  disableIconAnimation = false,
  disabled,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}: ReactButtonProps) {
  const [isAnimated, setIsAnimated] = useState(false);
  const buttonClasses = cn(buttonVariants({ variant }), className);
  const canAnimate = !disabled;

  const showAnimatedState = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!canAnimate) return;

    setIsAnimated(true);
  };

  const hideAnimatedState = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!canAnimate) return;

    setIsAnimated(false);
  };

  return (
    <button
      type="button"
      aria-label={text}
      className={buttonClasses}
      data-variant={variant}
      disabled={disabled}
      onMouseEnter={(event) => {
        showAnimatedState();
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        hideAnimatedState();
        onMouseLeave?.(event);
      }}
      onFocus={(event) => {
        showAnimatedState();
        onFocus?.(event);
      }}
      onBlur={(event) => {
        hideAnimatedState();
        onBlur?.(event);
      }}
      {...props}
    >
      {IconStart ? (
        <span className={animationWrapperClasses}>
          <IconStart
            className={initialElementClasses}
            aria-hidden="true"
            style={{ transform: isAnimated && !disableIconAnimation ? "translateX(-100%)" : "translateX(0)" }}
          />
          {!disableIconAnimation ? (
            <IconStart
              className={hoverElementClasses}
              style={{ transform: isAnimated ? "translateX(0)" : "translateX(100%)" }}
              aria-hidden="true"
            />
          ) : null}
        </span>
      ) : null}

      <span className={animationWrapperClasses}>
        <span
          className={initialElementClasses}
          style={{ transform: isAnimated ? "translateY(-100%)" : "translateY(0)" }}
        >
          {text}
        </span>
        <span
          className={hoverElementClasses}
          style={{
            transform: isAnimated ? "translateY(0)" : "translateY(100%)",
            opacity: isAnimated ? 1 : 0,
            filter: isAnimated ? "blur(0)" : "blur(5px)",
          }}
          aria-hidden="true"
        >
          {hoverText ? hoverText : text}
        </span>
      </span>

      {IconEnd ? (
        <span className={animationWrapperClasses}>
          <IconEnd
            className={initialElementClasses}
            aria-hidden="true"
            style={{ transform: isAnimated && !disableIconAnimation ? "translateX(100%)" : "translateX(0)" }}
          />
          {!disableIconAnimation ? (
            <IconEnd
              className={hoverElementClasses}
              style={{ transform: isAnimated ? "translateX(0)" : "translateX(-100%)" }}
              aria-hidden="true"
            />
          ) : null}
        </span>
      ) : null}
    </button>
  );
}
