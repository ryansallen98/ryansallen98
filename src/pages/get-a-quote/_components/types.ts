export type QuoteOption = {
  label: string;
  value: string;
  description?: string;
};

export type OptionStep = {
  title: string;
  help: string;
  options: QuoteOption[];
};

export type ContactStep = {
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

export type QuoteConfig = {
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

export type QuoteAnswers = {
  projectType: string;
  stack: string;
  scope: string;
  extras: string[];
  timeline: string;
};

export type ContactAnswers = {
  name: string;
  email: string;
  phone: string;
  contactMethod: string;
  message: string;
};

export type SingleAnswerKey = Exclude<keyof QuoteAnswers, "extras">;
