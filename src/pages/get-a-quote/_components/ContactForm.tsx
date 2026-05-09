import { Send } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { ReactButton } from "@components/ui/ReactButton";
import { inputClasses } from "./styles";
import type { ContactAnswers, ContactStep } from "./types";

type ContactFormProps = {
  contact: ContactAnswers;
  estimate: string;
  isSubmitted: boolean;
  quoteSummary: string;
  step: ContactStep;
  submitLabel: string;
  successText: string;
  onSubmit: () => void;
  setContact: Dispatch<SetStateAction<ContactAnswers>>;
};

export function ContactForm({
  contact,
  estimate,
  isSubmitted,
  quoteSummary,
  step,
  submitLabel,
  successText,
  onSubmit,
  setContact,
}: ContactFormProps) {
  return (
    <form
      name="quote-request"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      className="grid gap-4"
      onSubmit={onSubmit}
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
          {step.fields.name}
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
          {step.fields.email}
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
          {step.fields.phone}
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
          {step.fields.contactMethod}
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
            {step.contactMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="grid gap-2 text-xs uppercase tracking-wide text-muted">
        {step.fields.message}
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

      <ReactButton
        type="submit"
        text={submitLabel}
        variant="primary"
        className="mt-2 w-fit"
        iconEnd={Send}
      />

      {isSubmitted && <p className="text-sm text-muted">{successText}</p>}
    </form>
  );
}
