import { Sparkles } from "lucide-react";
import type { QuoteAnswers } from "./types";

type SummaryPanelProps = {
  answers: QuoteAnswers;
  discoveryRecommended: boolean;
  estimate: string;
  estimateLabel: string;
  discoveryLabel: string;
  extrasSummary: string;
  hourlyNote: string;
  resultText: string;
  summaryLabel: string;
  getAnswerLabel: (step: "projectType" | "stack" | "scope" | "timeline", value: string) => string;
};

export function SummaryPanel({
  answers,
  discoveryRecommended,
  estimate,
  estimateLabel,
  discoveryLabel,
  extrasSummary,
  hourlyNote,
  resultText,
  summaryLabel,
  getAnswerLabel,
}: SummaryPanelProps) {
  return (
    <aside className="grid gap-5 lg:min-h-[calc(100dvh-113px)] lg:grid-rows-[auto_1fr] xl:gap-6">
      <div className="border border-divider-dark bg-primary p-6 text-primary-foreground shadow-2xl sm:p-7 xl:p-8">
        <p className="text-xs uppercase tracking-wide">
          {discoveryRecommended ? discoveryLabel : estimateLabel}
        </p>
        <p className="font-heading mt-4 max-w-full text-[clamp(1.75rem,3vw,2.75rem)] uppercase leading-[1.02] wrap-break-word">
          {estimate}
        </p>
        <p className="mt-5 max-w-sm text-sm leading-relaxed">{resultText}</p>
      </div>

      <div className="border border-divider-dark bg-background-dark p-6 sm:p-7 xl:p-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-wide text-muted">{summaryLabel}</p>
          <Sparkles className="size-5 text-primary" aria-hidden="true" />
        </div>
        <dl className="grid gap-4 text-sm">
          <SummaryItem
            label="Project"
            value={getAnswerLabel("projectType", answers.projectType)}
          />
          <SummaryItem label="Stack" value={getAnswerLabel("stack", answers.stack)} />
          <SummaryItem label="Scope" value={getAnswerLabel("scope", answers.scope)} />
          <SummaryItem label="Extras" value={extrasSummary} />
          <SummaryItem
            label="Timeline"
            value={getAnswerLabel("timeline", answers.timeline)}
          />
        </dl>
        <p className="mt-6 border-t border-divider-dark pt-5 text-xs uppercase leading-relaxed text-muted">
          {hourlyNote}
        </p>
      </div>
    </aside>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase text-muted">{label}</dt>
      <dd className="mt-1 text-foreground-dark">{value}</dd>
    </div>
  );
}
