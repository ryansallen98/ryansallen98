import { optionButtonClasses, optionTitleClasses } from "./styles";
import type { QuoteOption } from "./types";

type OptionButtonProps = {
  option: QuoteOption;
  isSelected: boolean;
  onClick: () => void;
  number?: number;
};

export function OptionButton({
  option,
  isSelected,
  onClick,
  number,
}: OptionButtonProps) {
  return (
    <button
      type="button"
      className={`${optionButtonClasses} ${
        isSelected ? "border-primary bg-secondary-dark ring-1 ring-primary/40" : ""
      }`}
      aria-pressed={isSelected}
      onClick={onClick}
    >
      {number && (
        <span className="absolute right-5 top-5 font-heading text-3xl leading-none text-divider-dark transition group-hover:text-primary/40 sm:text-4xl">
          {String(number).padStart(2, "0")}
        </span>
      )}
      <span className={number ? "relative block pr-10" : "relative block"}>
        <span className={optionTitleClasses}>{option.label}</span>
        {option.description && (
          <span className="mt-3 block max-w-xl text-sm leading-relaxed text-muted">
            {option.description}
          </span>
        )}
      </span>
    </button>
  );
}
