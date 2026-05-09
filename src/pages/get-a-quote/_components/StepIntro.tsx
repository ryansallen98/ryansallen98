import { questionHeadingClasses } from "./styles";

type StepIntroProps = {
  eyebrow?: string;
  title: string;
  help: string;
  headingTag?: "h1" | "h2";
};

export function StepIntro({
  eyebrow,
  title,
  help,
  headingTag = "h2",
}: StepIntroProps) {
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
