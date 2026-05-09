type QuoteOption = {
  label: string;
  value: string;
  description?: string;
};

type QuoteConfig = {
  wizard: {
    steps: {
      projectType: { options: QuoteOption[] };
      stack: { options: Record<string, QuoteOption[]> };
      scope: { options: QuoteOption[] };
      extras: { options: QuoteOption[] };
      timeline: { options: QuoteOption[] };
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

type QuoteWizardComponent = AlpineComponent & {
  currentStep: number;
  isSubmitted: boolean;
  answers: QuoteAnswers;
  contact: Record<string, string>;
  config: QuoteConfig;
  getStackOptions: () => QuoteOption[];
  getEstimate: () => string;
  needsDiscovery: () => boolean;
  getResultText: () => string;
  selectSingle: (key: keyof Omit<QuoteAnswers, "extras">, value: string) => void;
  toggleExtra: (value: string) => void;
  canContinue: () => boolean;
  next: () => void;
  back: () => void;
  getAnswerLabel: (step: keyof Omit<QuoteAnswers, "extras">, value: string) => string;
  getExtrasSummary: () => string;
  getSummary: () => string;
  handleSubmit: () => void;
};

export function quoteWizard(config: QuoteConfig) {
  return {
    currentStep: 0,
    isSubmitted: false,
    config,
    answers: {
      projectType: "",
      stack: "",
      scope: "",
      extras: [],
      timeline: "",
    },
    contact: {
      name: "",
      email: "",
      phone: "",
      contactMethod: "",
      message: "",
    },

    getStackOptions(this: QuoteWizardComponent) {
      return this.config.wizard.steps.stack.options[this.answers.projectType] ?? [];
    },

    getEstimate(this: QuoteWizardComponent) {
      return (
        this.config.estimates[this.answers.projectType]?.[this.answers.scope] ??
        "Discovery recommended"
      );
    },

    needsDiscovery(this: QuoteWizardComponent) {
      return (
        this.getEstimate().toLowerCase().includes("discovery") ||
        this.answers.scope === "large" ||
        this.answers.extras.includes("sensitive") ||
        this.answers.timeline === "rush"
      );
    },

    getResultText(this: QuoteWizardComponent) {
      return this.needsDiscovery()
        ? this.config.result.discoveryText
        : this.config.result.defaultText;
    },

    selectSingle(
      this: QuoteWizardComponent,
      key: keyof Omit<QuoteAnswers, "extras">,
      value: string
    ) {
      this.answers[key] = value;

      if (key === "projectType") {
        this.answers.stack = "";
      }
    },

    toggleExtra(this: QuoteWizardComponent, value: string) {
      if (this.answers.extras.includes(value)) {
        this.answers.extras = this.answers.extras.filter(extra => extra !== value);
        return;
      }

      this.answers.extras = [...this.answers.extras, value];
    },

    canContinue(this: QuoteWizardComponent) {
      if (this.currentStep === 0) return Boolean(this.answers.projectType);
      if (this.currentStep === 1) return Boolean(this.answers.stack);
      if (this.currentStep === 2) return Boolean(this.answers.scope);
      if (this.currentStep === 3) return true;
      if (this.currentStep === 4) return Boolean(this.answers.timeline);
      return true;
    },

    next(this: QuoteWizardComponent) {
      if (!this.canContinue()) return;
      this.currentStep = Math.min(this.currentStep + 1, 5);
    },

    back(this: QuoteWizardComponent) {
      this.currentStep = Math.max(this.currentStep - 1, 0);
    },

    getAnswerLabel(
      this: QuoteWizardComponent,
      step: keyof Omit<QuoteAnswers, "extras">,
      value: string
    ) {
      if (!value) return "Not answered";

      const options =
        step === "stack"
          ? this.getStackOptions()
          : this.config.wizard.steps[step].options;

      return options.find(option => option.value === value)?.label ?? value;
    },

    getExtrasSummary(this: QuoteWizardComponent) {
      if (!this.answers.extras.length) return "None selected";

      return this.answers.extras
        .map(value => {
          return (
            this.config.wizard.steps.extras.options.find(option => option.value === value)
              ?.label ?? value
          );
        })
        .join(", ");
    },

    getSummary(this: QuoteWizardComponent) {
      return [
        `Project type: ${this.getAnswerLabel("projectType", this.answers.projectType)}`,
        `Stack: ${this.getAnswerLabel("stack", this.answers.stack)}`,
        `Scope: ${this.getAnswerLabel("scope", this.answers.scope)}`,
        `Extras: ${this.getExtrasSummary()}`,
        `Timeline: ${this.getAnswerLabel("timeline", this.answers.timeline)}`,
        `Estimate: ${this.getEstimate()}`,
        `Discovery recommended: ${this.needsDiscovery() ? "Yes" : "No"}`,
      ].join("\n");
    },

    handleSubmit(this: QuoteWizardComponent) {
      this.isSubmitted = true;
    },
  };
}
