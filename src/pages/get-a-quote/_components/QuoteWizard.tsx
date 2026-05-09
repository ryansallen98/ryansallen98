import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { ReactButton } from "@components/ui/ReactButton";
import { ContactForm } from "./ContactForm";
import { ExtrasStep } from "./ExtrasStep";
import { OptionButton } from "./OptionButton";
import { QuoteBackground } from "./QuoteBackground";
import { QuoteHeader } from "./QuoteHeader";
import { StepIntro } from "./StepIntro";
import { SummaryPanel } from "./SummaryPanel";
import { TOTAL_STEPS } from "./styles";
import type {
  ContactAnswers,
  QuoteAnswers,
  QuoteConfig,
  SingleAnswerKey,
} from "./types";
import {
  getAnswerLabel,
  getEstimate,
  getExtrasSummary,
  getQuoteSummary,
  isDiscoveryRecommended,
} from "./quoteWizardUtils";

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

  const estimate = getEstimate(config, answers);
  const discoveryRecommended = isDiscoveryRecommended(estimate, answers);
  const resultText = discoveryRecommended
    ? config.result.discoveryText
    : config.result.defaultText;
  const extrasSummary = getExtrasSummary(config, answers);
  const answerLabel = (step: SingleAnswerKey, value: string) =>
    getAnswerLabel(config, stackOptions, step, value);
  const quoteSummary = getQuoteSummary({
    answers,
    config,
    discoveryRecommended,
    estimate,
    extrasSummary,
    stackOptions,
  });

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

  return (
    <main className="min-h-dvh overflow-hidden bg-background-dark text-foreground-dark">
      <QuoteBackground />
      <QuoteHeader currentStep={currentStep} progressLabel={wizard.progressLabel} />

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
                    <ExtrasStep
                      options={wizard.steps.extras.options}
                      selectedExtras={answers.extras}
                      onToggle={toggleExtra}
                    />
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
                    <ContactForm
                      contact={contact}
                      estimate={estimate}
                      isSubmitted={isSubmitted}
                      quoteSummary={quoteSummary}
                      step={wizard.steps.contact}
                      submitLabel={wizard.submitLabel}
                      successText={wizard.successText}
                      onSubmit={() => setIsSubmitted(true)}
                      setContact={setContact}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-divider-dark pt-5">
              {currentStep > 0 && (
                <ReactButton
                  text={wizard.backLabel}
                  variant="outline"
                  iconStart={ArrowLeft}
                  onClick={back}
                />
              )}
              {currentStep < TOTAL_STEPS - 1 && (
                <ReactButton
                  text={wizard.nextLabel}
                  variant="primary"
                  className="ml-auto"
                  iconEnd={ArrowRight}
                  disabled={!canContinue()}
                  onClick={next}
                />
              )}
            </div>
          </div>

          <SummaryPanel
            answers={answers}
            discoveryRecommended={discoveryRecommended}
            discoveryLabel={wizard.discoveryLabel}
            estimate={estimate}
            estimateLabel={wizard.estimateLabel}
            extrasSummary={extrasSummary}
            getAnswerLabel={answerLabel}
            hourlyNote={wizard.hourlyNote}
            resultText={resultText}
            summaryLabel={wizard.summaryLabel}
          />
        </div>
      </section>
    </main>
  );
}
