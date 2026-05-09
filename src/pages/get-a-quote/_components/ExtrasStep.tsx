import { optionButtonClasses } from "./styles";
import type { QuoteOption } from "./types";

type ExtrasStepProps = {
  options: QuoteOption[];
  selectedExtras: string[];
  onToggle: (value: string) => void;
};

export function ExtrasStep({
  options,
  selectedExtras,
  onToggle,
}: ExtrasStepProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {options.map((option) => {
        const isSelected = selectedExtras.includes(option.value);

        return (
          <button
            key={option.value}
            type="button"
            className={`${optionButtonClasses} ${
              isSelected ? "border-primary bg-secondary-dark ring-1 ring-primary/40" : ""
            }`}
            aria-pressed={isSelected}
            onClick={() => onToggle(option.value)}
          >
            <span className="flex min-h-14 items-center gap-3">
              <span className="size-2 shrink-0 bg-primary" />
              <span className="text-sm font-medium uppercase tracking-wide">
                {option.label}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
