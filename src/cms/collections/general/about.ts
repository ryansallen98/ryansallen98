const linkFields = [
  { name: "text", label: "Text" },
  { name: "href", label: "Link" },
];

const about: CmsFile = {
  name: "about",
  label: "About Page",
  file: "src/data/general/about.yml",
  fields: [
    {
      name: "hero",
      label: "Hero",
      widget: "object",
      fields: [
        { name: "eyebrow", label: "Eyebrow" },
        { name: "title", label: "Title", widget: "text" },
        { name: "intro", label: "Intro", widget: "text" },
        {
          name: "image",
          label: "Image",
          widget: "object",
          fields: [
            { name: "src", label: "Image", widget: "image" },
            { name: "alt", label: "Alt Text" },
          ],
        },
        { name: "primaryCta", label: "Primary CTA", widget: "object", fields: linkFields },
        { name: "secondaryCta", label: "Secondary CTA", widget: "object", fields: linkFields },
      ],
    },
    {
      name: "summary",
      label: "Summary",
      widget: "object",
      fields: [
        { name: "eyebrow", label: "Eyebrow" },
        { name: "title", label: "Title", widget: "text" },
        { name: "text", label: "Text", widget: "text" },
        {
          name: "highlights",
          label: "Highlights",
          widget: "list",
          field: { name: "item", label: "Item" },
        },
      ],
    },
    {
      name: "timeline",
      label: "Timeline",
      widget: "object",
      fields: [
        { name: "eyebrow", label: "Eyebrow" },
        { name: "title", label: "Title", widget: "text" },
        {
          name: "items",
          label: "Items",
          widget: "list",
          fields: [
            { name: "timeframe", label: "Timeframe" },
            { name: "role", label: "Role" },
            { name: "company", label: "Company" },
            { name: "summary", label: "Summary", widget: "text" },
          ],
        },
      ],
    },
    {
      name: "strengths",
      label: "Strengths",
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

export default about;
