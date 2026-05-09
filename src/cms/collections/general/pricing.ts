import seoFields from "./seoFields";

const linkFields = [
  { name: "text", label: "Text" },
  { name: "href", label: "Link" },
];

const pricing: CmsFile = {
  name: "pricing",
  label: "Pricing Page",
  file: "src/data/general/pricing.yml",
  fields: [
    seoFields,
    {
      name: "hero",
      label: "Hero",
      widget: "object",
      fields: [
        { name: "eyebrow", label: "Eyebrow" },
        { name: "title", label: "Title", widget: "text" },
        { name: "intro", label: "Intro", widget: "text" },
        { name: "primaryCta", label: "Primary CTA", widget: "object", fields: linkFields },
        { name: "secondaryCta", label: "Secondary CTA", widget: "object", fields: linkFields },
      ],
    },
    {
      name: "plans",
      label: "Plans",
      widget: "object",
      fields: [
        { name: "eyebrow", label: "Eyebrow" },
        { name: "title", label: "Title", widget: "text" },
        {
          name: "items",
          label: "Items",
          widget: "list",
          fields: [
            { name: "title", label: "Title" },
            { name: "price", label: "Price" },
            { name: "description", label: "Description", widget: "text" },
            {
              name: "features",
              label: "Features",
              widget: "list",
              field: { name: "feature", label: "Feature" },
            },
            {
              name: "recommended",
              label: "Recommended",
              widget: "boolean",
              required: false,
              default: false,
            },
            {
              name: "badge",
              label: "Badge text",
              required: false,
              hint: "Optional pill text shown on recommended cards (e.g. Most requested).",
            },
            { name: "cta", label: "CTA", widget: "object", fields: linkFields },
          ],
        },
      ],
    },
    {
      name: "support",
      label: "Support",
      widget: "object",
      fields: [
        { name: "eyebrow", label: "Eyebrow" },
        { name: "title", label: "Title", widget: "text" },
        { name: "text", label: "Text", widget: "text" },
      ],
    },
    {
      name: "cta",
      label: "CTA",
      widget: "object",
      fields: [
        { name: "eyebrow", label: "Eyebrow" },
        { name: "title", label: "Title", widget: "text" },
        { name: "text", label: "Text", widget: "text" },
        { name: "primaryCta", label: "Primary CTA", widget: "object", fields: linkFields },
        { name: "secondaryCta", label: "Secondary CTA", widget: "object", fields: linkFields },
      ],
    },
  ],
};

export default pricing;
