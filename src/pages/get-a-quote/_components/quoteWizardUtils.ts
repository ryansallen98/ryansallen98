import type {
  QuoteAnswers,
  QuoteConfig,
  QuoteOption,
  SingleAnswerKey,
} from "./types";

export function getEstimate(config: QuoteConfig, answers: QuoteAnswers) {
  return (
    config.estimates[answers.projectType]?.[answers.scope] ??
    config.wizard.discoveryLabel
  );
}

export function isDiscoveryRecommended(estimate: string, answers: QuoteAnswers) {
  return (
    estimate.toLowerCase().includes("discovery") ||
    answers.scope === "large" ||
    answers.extras.includes("sensitive") ||
    answers.timeline === "rush"
  );
}

export function getOptionsForStep(
  config: QuoteConfig,
  stackOptions: QuoteOption[],
  step: SingleAnswerKey
) {
  if (step === "stack") return stackOptions;
  if (step === "projectType") return config.wizard.steps.projectType.options;
  if (step === "scope") return config.wizard.steps.scope.options;

  return config.wizard.steps.timeline.options;
}

export function getAnswerLabel(
  config: QuoteConfig,
  stackOptions: QuoteOption[],
  step: SingleAnswerKey,
  value: string
) {
  if (!value) return "Not answered";

  return (
    getOptionsForStep(config, stackOptions, step).find(
      (option) => option.value === value
    )?.label ?? value
  );
}

export function getExtrasSummary(config: QuoteConfig, answers: QuoteAnswers) {
  if (!answers.extras.length) return "None selected";

  return answers.extras
    .map((value) => {
      return (
        config.wizard.steps.extras.options.find((option) => option.value === value)
          ?.label ?? value
      );
    })
    .join(", ");
}

export function getQuoteSummary({
  answers,
  config,
  discoveryRecommended,
  estimate,
  extrasSummary,
  stackOptions,
}: {
  answers: QuoteAnswers;
  config: QuoteConfig;
  discoveryRecommended: boolean;
  estimate: string;
  extrasSummary: string;
  stackOptions: QuoteOption[];
}) {
  return [
    `Project type: ${getAnswerLabel(config, stackOptions, "projectType", answers.projectType)}`,
    `Stack: ${getAnswerLabel(config, stackOptions, "stack", answers.stack)}`,
    `Scope: ${getAnswerLabel(config, stackOptions, "scope", answers.scope)}`,
    `Extras: ${extrasSummary}`,
    `Timeline: ${getAnswerLabel(config, stackOptions, "timeline", answers.timeline)}`,
    `Estimate: ${estimate}`,
    `Discovery recommended: ${discoveryRecommended ? "Yes" : "No"}`,
  ].join("\n");
}
