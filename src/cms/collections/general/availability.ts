const linkFields = [
  { name: "text", label: "Text" },
  { name: "href", label: "Link" },
];

const availability: CmsFile = {
  name: "availability",
  label: "Availability Page",
  file: "src/data/general/availability.yml",
  fields: [
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
      name: "status",
      label: "Status",
      widget: "object",
      fields: [
        { name: "eyebrow", label: "Eyebrow" },
        { name: "title", label: "Title", widget: "text" },
        { name: "text", label: "Text", widget: "text" },
        {
          name: "items",
          label: "Items",
          widget: "list",
          fields: [
            { name: "label", label: "Label" },
            { name: "value", label: "Value" },
          ],
        },
      ],
    },
    {
      name: "fits",
      label: "Best Fit",
      widget: "object",
      fields: [
        { name: "eyebrow", label: "Eyebrow" },
        { name: "title", label: "Title", widget: "text" },
        {
          name: "items",
          label: "Items",
          widget: "list",
          field: { name: "item", label: "Item" },
        },
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

export default availability;
