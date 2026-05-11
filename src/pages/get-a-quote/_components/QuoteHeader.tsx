import { TOTAL_STEPS } from "./styles";
import { QuoteLogo } from "./QuoteLogo";

type QuoteHeaderProps = {
  currentStep: number;
  progressLabel: string;
};

export function QuoteHeader({ currentStep, progressLabel }: QuoteHeaderProps) {
  return (
    <header className="relative z-20 border-b border-divider-dark bg-background-dark">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
        <a
          className="group inline-flex items-center gap-3 fill-primary"
          href="/"
          aria-label="R Allen Dev home"
        >
          <QuoteLogo className="size-10 transition duration-300 group-hover:scale-110" />
          <span className="hidden text-xs uppercase tracking-wide text-muted sm:inline">
            R Allen Dev
          </span>
        </a>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-4">
          <div className="hidden w-full max-w-xs sm:block">
            <div className="h-1 bg-divider-dark">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${((currentStep + 1) / TOTAL_STEPS) * 100}%` }}
              />
            </div>
          </div>
          <p className="whitespace-nowrap text-xs uppercase tracking-wide text-muted">
            {progressLabel}{" "}
            <span className="text-foreground-dark">{currentStep + 1}</span> /{" "}
            {TOTAL_STEPS}
          </p>
        </div>
      </div>
    </header>
  );
}
