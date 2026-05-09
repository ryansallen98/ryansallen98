import { ArrowLeft, ArrowRight, Send, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

type QuoteOption = {
  label: string;
  value: string;
  description?: string;
};

type OptionStep = {
  title: string;
  help: string;
  options: QuoteOption[];
};

type ContactStep = {
  title: string;
  help: string;
  fields: {
    name: string;
    email: string;
    phone: string;
    contactMethod: string;
    message: string;
  };
  contactMethods: string[];
};

type QuoteConfig = {
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    note: string;
  };
  wizard: {
    eyebrow: string;
    title: string;
    progressLabel: string;
    backLabel: string;
    nextLabel: string;
    estimateLabel: string;
    discoveryLabel: string;
    hourlyNote: string;
    summaryLabel: string;
    submitLabel: string;
    submittingText: string;
    successText: string;
    steps: {
      projectType: OptionStep;
      stack: {
        title: string;
        help: string;
        options: Record<string, QuoteOption[]>;
      };
      scope: OptionStep;
      extras: OptionStep;
      timeline: OptionStep;
      contact: ContactStep;
    };
  };
  estimates: Record<string, Record<string, string>>;
  result: {
    defaultText: string;
    discoveryText: string;
  };
};

type QuoteAnswers = {
  projectType: string;
  stack: string;
  scope: string;
  extras: string[];
  timeline: string;
};

type ContactAnswers = {
  name: string;
  email: string;
  phone: string;
  contactMethod: string;
  message: string;
};

type SingleAnswerKey = Exclude<keyof QuoteAnswers, "extras">;

const TOTAL_STEPS = 6;

const optionButtonClasses =
  "group relative overflow-hidden border border-divider-dark/80 bg-background-dark/70 p-5 text-left text-foreground-dark transition duration-300 hover:-translate-y-1 hover:border-primary hover:bg-secondary-dark/90 focus-visible:border-primary sm:p-6 xl:p-7";
const questionHeadingClasses =
  "font-heading text-[clamp(1.85rem,4.4vw,3.25rem)] uppercase leading-[1.02] tracking-tight";
const optionTitleClasses =
  "block font-heading uppercase leading-[1.12] text-xl sm:text-2xl lg:text-[1.6rem]";
const inputClasses =
  "border border-divider-dark bg-background-dark/80 px-5 py-4 text-base normal-case text-foreground-dark transition focus:border-primary";

type QuoteWizardProps = {
  config: QuoteConfig;
};

export default function QuoteWizard({ config }: QuoteWizardProps) {
  const { hero, wizard } = config;
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState<QuoteAnswers>({
    projectType: "",
    stack: "",
    scope: "",
    extras: [],
    timeline: "",
  });
  const [contact, setContact] = useState<ContactAnswers>({
    name: "",
    email: "",
    phone: "",
    contactMethod: wizard.steps.contact.contactMethods[0] ?? "",
    message: "",
  });

  const stackOptions = useMemo(() => {
    return wizard.steps.stack.options[answers.projectType] ?? [];
  }, [answers.projectType, wizard.steps.stack.options]);

  const estimate =
    config.estimates[answers.projectType]?.[answers.scope] ?? wizard.discoveryLabel;
  const discoveryRecommended =
    estimate.toLowerCase().includes("discovery") ||
    answers.scope === "large" ||
    answers.extras.includes("sensitive") ||
    answers.timeline === "rush";
  const resultText = discoveryRecommended
    ? config.result.discoveryText
    : config.result.defaultText;

  const selectSingle = (key: SingleAnswerKey, value: string) => {
    setAnswers((current) => ({
      ...current,
      [key]: value,
      ...(key === "projectType" ? { stack: "" } : {}),
    }));
  };

  const toggleExtra = (value: string) => {
    setAnswers((current) => {
      const hasValue = current.extras.includes(value);

      return {
        ...current,
        extras: hasValue
          ? current.extras.filter((extra) => extra !== value)
          : [...current.extras, value],
      };
    });
  };

  const canContinue = () => {
    if (currentStep === 0) return Boolean(answers.projectType);
    if (currentStep === 1) return Boolean(answers.stack);
    if (currentStep === 2) return Boolean(answers.scope);
    if (currentStep === 3) return true;
    if (currentStep === 4) return Boolean(answers.timeline);

    return true;
  };

  const next = () => {
    if (!canContinue()) return;
    setCurrentStep((step) => Math.min(step + 1, TOTAL_STEPS - 1));
  };

  const back = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const getOptionsForStep = (step: SingleAnswerKey) => {
    if (step === "stack") return stackOptions;
    if (step === "projectType") return wizard.steps.projectType.options;
    if (step === "scope") return wizard.steps.scope.options;

    return wizard.steps.timeline.options;
  };

  const getAnswerLabel = (step: SingleAnswerKey, value: string) => {
    if (!value) return "Not answered";

    return getOptionsForStep(step).find((option) => option.value === value)?.label ?? value;
  };

  const extrasSummary = answers.extras.length
    ? answers.extras
        .map((value) => {
          return (
            wizard.steps.extras.options.find((option) => option.value === value)?.label ??
            value
          );
        })
        .join(", ")
    : "None selected";

  const quoteSummary = [
    `Project type: ${getAnswerLabel("projectType", answers.projectType)}`,
    `Stack: ${getAnswerLabel("stack", answers.stack)}`,
    `Scope: ${getAnswerLabel("scope", answers.scope)}`,
    `Extras: ${extrasSummary}`,
    `Timeline: ${getAnswerLabel("timeline", answers.timeline)}`,
    `Estimate: ${estimate}`,
    `Discovery recommended: ${discoveryRecommended ? "Yes" : "No"}`,
  ].join("\n");

  return (
    <main className="min-h-dvh overflow-hidden bg-background-dark text-foreground-dark">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,color-mix(in_oklab,var(--primary)_20%,transparent),transparent_24%),radial-gradient(circle_at_85%_20%,color-mix(in_oklab,var(--secondary-dark)_95%,transparent),transparent_30%),linear-gradient(135deg,color-mix(in_oklab,var(--background-dark)_92%,transparent),var(--background-dark))]" />
        <div className="absolute -right-28 top-24 h-96 w-96 rounded-full border border-primary/25" />
        <div className="absolute -left-24 bottom-8 h-72 w-72 rounded-full border border-divider-dark" />
      </div>

      <header className="relative z-20 border-b border-divider-dark bg-background-dark/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <a className="group inline-flex items-center gap-3 fill-primary" href="/">
            <QuoteLogo className="size-10 transition duration-300 group-hover:scale-110" />
            <span className="hidden text-xs uppercase tracking-wide text-muted sm:inline">
              R Allen Dev quote studio
            </span>
            <span className="sr-only">R Allen Dev home</span>
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
              {wizard.progressLabel}{" "}
              <span className="text-foreground-dark">{currentStep + 1}</span> /{" "}
              {TOTAL_STEPS}
            </p>
          </div>
        </div>
      </header>

      <section className="relative z-10 min-h-[calc(100dvh-73px)]">
        <div className="mx-auto grid min-h-[calc(100dvh-73px)] max-w-7xl gap-5 px-5 py-5 lg:grid-cols-[minmax(0,0.72fr)_minmax(320px,0.28fr)] lg:py-6 xl:gap-6 xl:py-8">
          <div className="flex min-h-[calc(100dvh-113px)] flex-col justify-between border border-divider-dark bg-background-dark/65 p-5 shadow-2xl backdrop-blur sm:p-7 lg:p-8 xl:p-10">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-muted">
                <span className="size-2 bg-primary" />
                {wizard.eyebrow}
              </p>
              <p className="hidden max-w-md text-right text-xs uppercase leading-relaxed tracking-wide text-muted sm:block">
                {hero.note}
              </p>
            </div>

            <div className="flex flex-1 items-center">
              <div className="w-full">
                {currentStep === 0 && (
                  <div className="grid gap-6 xl:gap-7">
                    <StepIntro
                      eyebrow={hero.eyebrow}
                      title={wizard.steps.projectType.title}
                      help={wizard.steps.projectType.help}
                      headingTag="h1"
                    />
                    <div className="grid gap-3 xl:grid-cols-2">
                      {wizard.steps.projectType.options.map((option, index) => (
                        <OptionButton
                          key={option.value}
                          option={option}
                          isSelected={answers.projectType === option.value}
                          onClick={() => selectSingle("projectType", option.value)}
                          number={index + 1}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="grid gap-6 xl:gap-7">
                    <StepIntro
                      title={wizard.steps.stack.title}
                      help={wizard.steps.stack.help}
                    />
                    <div className="grid gap-3 md:grid-cols-2">
                      {stackOptions.map((option) => (
                        <OptionButton
                          key={option.value}
                          option={option}
                          isSelected={answers.stack === option.value}
                          onClick={() => selectSingle("stack", option.value)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="grid gap-6 xl:gap-7">
                    <StepIntro
                      title={wizard.steps.scope.title}
                      help={wizard.steps.scope.help}
                    />
                    <div className="grid gap-3 lg:grid-cols-3">
                      {wizard.steps.scope.options.map((option) => (
                        <OptionButton
                          key={option.value}
                          option={option}
                          isSelected={answers.scope === option.value}
                          onClick={() => selectSingle("scope", option.value)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="grid gap-6 xl:gap-7">
                    <StepIntro
                      title={wizard.steps.extras.title}
                      help={wizard.steps.extras.help}
                    />
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {wizard.steps.extras.options.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          className={`${optionButtonClasses} ${
                            answers.extras.includes(option.value)
                              ? "border-primary bg-secondary-dark ring-1 ring-primary/40"
                              : ""
                          }`}
                          aria-pressed={answers.extras.includes(option.value)}
                          onClick={() => toggleExtra(option.value)}
                        >
                          <span className="flex min-h-14 items-center gap-3">
                            <span className="size-2 shrink-0 bg-primary" />
                            <span className="text-sm font-medium uppercase tracking-wide">
                              {option.label}
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="grid gap-6 xl:gap-7">
                    <StepIntro
                      title={wizard.steps.timeline.title}
                      help={wizard.steps.timeline.help}
                    />
                    <div className="grid gap-3 md:grid-cols-3">
                      {wizard.steps.timeline.options.map((option) => (
                        <OptionButton
                          key={option.value}
                          option={option}
                          isSelected={answers.timeline === option.value}
                          onClick={() => selectSingle("timeline", option.value)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="grid gap-6 xl:gap-7">
                    <StepIntro
                      title={wizard.steps.contact.title}
                      help={wizard.steps.contact.help}
                    />
                    <form
                      name="quote-request"
                      method="POST"
                      data-netlify="true"
                      data-netlify-honeypot="bot-field"
                      className="grid gap-4"
                      onSubmit={() => setIsSubmitted(true)}
                    >
                      <input type="hidden" name="form-name" value="quote-request" />
                      <p className="hidden">
                        <label>
                          Do not fill this out <input name="bot-field" />
                        </label>
                      </p>
                      <input type="hidden" name="estimate" value={estimate} />
                      <input type="hidden" name="quote_summary" value={quoteSummary} />

                      <div className="grid gap-4 md:grid-cols-2">
                        <label className="grid gap-2 text-xs uppercase tracking-wide text-muted">
                          {wizard.steps.contact.fields.name}
                          <input
                            className={inputClasses}
                            name="name"
                            required
                            value={contact.name}
                            onChange={(event) =>
                              setContact((current) => ({
                                ...current,
                                name: event.target.value,
                              }))
                            }
                          />
                        </label>
                        <label className="grid gap-2 text-xs uppercase tracking-wide text-muted">
                          {wizard.steps.contact.fields.email}
                          <input
                            className={inputClasses}
                            type="email"
                            name="email"
                            required
                            value={contact.email}
                            onChange={(event) =>
                              setContact((current) => ({
                                ...current,
                                email: event.target.value,
                              }))
                            }
                          />
                        </label>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <label className="grid gap-2 text-xs uppercase tracking-wide text-muted">
                          {wizard.steps.contact.fields.phone}
                          <input
                            className={inputClasses}
                            name="phone"
                            value={contact.phone}
                            onChange={(event) =>
                              setContact((current) => ({
                                ...current,
                                phone: event.target.value,
                              }))
                            }
                          />
                        </label>
                        <label className="grid gap-2 text-xs uppercase tracking-wide text-muted">
                          {wizard.steps.contact.fields.contactMethod}
                          <select
                            className={inputClasses}
                            name="preferred_contact_method"
                            value={contact.contactMethod}
                            onChange={(event) =>
                              setContact((current) => ({
                                ...current,
                                contactMethod: event.target.value,
                              }))
                            }
                          >
                            {wizard.steps.contact.contactMethods.map((method) => (
                              <option key={method} value={method}>
                                {method}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>

                      <label className="grid gap-2 text-xs uppercase tracking-wide text-muted">
                        {wizard.steps.contact.fields.message}
                        <textarea
                          className={`${inputClasses} min-h-36`}
                          name="message"
                          required
                          value={contact.message}
                          onChange={(event) =>
                            setContact((current) => ({
                              ...current,
                              message: event.target.value,
                            }))
                          }
                        />
                      </label>

                      <button
                        type="submit"
                        className="group mt-2 inline-flex w-fit items-center gap-3 bg-primary px-8 py-5 text-sm font-semibold uppercase text-primary-foreground transition hover:-translate-y-0.5"
                      >
                        {wizard.submitLabel}
                        <Send
                          className="size-4 transition group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </button>

                      {isSubmitted && (
                        <p className="text-sm text-muted">{wizard.successText}</p>
                      )}
                    </form>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-divider-dark pt-5">
              {currentStep > 0 && (
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-1 py-3 text-xs uppercase tracking-wide text-muted transition hover:text-foreground-dark"
                  onClick={back}
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  {wizard.backLabel}
                </button>
              )}
              {currentStep < TOTAL_STEPS - 1 && (
                <button
                  type="button"
                  className="ml-auto inline-flex items-center gap-3 bg-primary px-7 py-4 text-sm font-semibold uppercase text-primary-foreground transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-35 sm:px-8 sm:py-5"
                  disabled={!canContinue()}
                  onClick={next}
                >
                  {wizard.nextLabel}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          <aside className="grid gap-5 lg:min-h-[calc(100dvh-113px)] lg:grid-rows-[auto_1fr] xl:gap-6">
            <div className="border border-divider-dark bg-primary p-6 text-primary-foreground shadow-2xl sm:p-7 xl:p-8">
              <p className="text-xs uppercase tracking-wide">
                {discoveryRecommended ? wizard.discoveryLabel : wizard.estimateLabel}
              </p>
              <p className="font-heading mt-4 max-w-full text-[clamp(1.75rem,3vw,2.75rem)] uppercase leading-[1.02] wrap-break-word">
                {estimate}
              </p>
              <p className="mt-5 max-w-sm text-sm leading-relaxed">{resultText}</p>
            </div>

            <div className="border border-divider-dark bg-background-dark/70 p-6 backdrop-blur sm:p-7 xl:p-8">
              <div className="mb-5 flex items-center justify-between gap-4">
                <p className="text-xs uppercase tracking-wide text-muted">
                  {wizard.summaryLabel}
                </p>
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
                {wizard.hourlyNote}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function StepIntro({
  eyebrow,
  title,
  help,
  headingTag = "h2",
}: {
  eyebrow?: string;
  title: string;
  help: string;
  headingTag?: "h1" | "h2";
}) {
  const Heading = headingTag;

  return (
    <div className="max-w-4xl">
      {eyebrow && (
        <p className="mb-3 text-xs uppercase tracking-wide text-primary sm:text-sm">
          {eyebrow}
        </p>
      )}
      <Heading className={questionHeadingClasses}>{title}</Heading>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        {help}
      </p>
    </div>
  );
}

function OptionButton({
  option,
  isSelected,
  onClick,
  number,
}: {
  option: QuoteOption;
  isSelected: boolean;
  onClick: () => void;
  number?: number;
}) {
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

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase text-muted">{label}</dt>
      <dd className="mt-1 text-foreground-dark">{value}</dd>
    </div>
  );
}

function QuoteLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      className={className}
      viewBox="0 0 534 534"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      aria-hidden="true"
    >
      <path
        d="M266.667,299.628l-105.283,105.282l-138.244,-138.243l138.244,-138.244l32.962,32.961l-105.283,105.283l72.321,72.321l72.321,-72.321l32.962,32.961Zm-0,-65.923l105.282,-105.282l138.244,138.244l-138.244,138.243l-32.961,-32.961l105.282,-105.282l-72.321,-72.321l-72.321,72.321l-32.961,-32.962Z"
        fill="inherit"
      />
    </svg>
  );
}
