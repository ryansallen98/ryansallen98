const linkFields = [
  { name: "text", label: "Text" },
  { name: "href", label: "Link" },
];

const services: CmsFile = {
  name: "services",
  label: "Services Page",
  file: "src/data/general/services.yml",
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
      name: "services",
      label: "Services",
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
            { name: "description", label: "Description", widget: "text" },
            {
              name: "tags",
              label: "Tags",
              widget: "list",
              field: { name: "tag", label: "Tag" },
            },
            { name: "cta", label: "CTA", widget: "object", fields: linkFields },
          ],
        },
      ],
    },
    {
      name: "process",
      label: "Process",
      widget: "object",
      fields: [
        { name: "eyebrow", label: "Eyebrow" },
        { name: "title", label: "Title", widget: "text" },
        {
          name: "steps",
          label: "Steps",
          widget: "list",
          fields: [
            { name: "title", label: "Title" },
            { name: "text", label: "Text", widget: "text" },
          ],
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

export default services;
