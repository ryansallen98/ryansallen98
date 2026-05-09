const ctaFields = [
  { name: "text", label: "Text" },
  { name: "href", label: "Link" },
];

const textListField = (name: string, label: string, itemLabel = "Item") => ({
  name,
  label,
  widget: "list",
  field: { name: "item", label: itemLabel },
});

const sectionIntroFields = [
  { name: "eyebrow", label: "Eyebrow" },
  { name: "title", label: "Title", widget: "text" },
  { name: "intro", label: "Intro", widget: "text" },
];

const home: CmsFile = {
  name: "home",
  label: "Homepage",
  file: "src/data/general/home.yml",
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
          ...textListField("metadata", "Metadata"),
        },
        {
          name: "primaryCta",
          label: "Primary CTA",
          widget: "object",
          fields: ctaFields,
        },
        {
          name: "secondaryCta",
          label: "Secondary CTA",
          widget: "object",
          fields: ctaFields,
        },
        { name: "availability", label: "Availability", widget: "text" },
        {
          name: "image",
          label: "Image",
          widget: "object",
          fields: [
            { name: "src", label: "Image", widget: "image" },
            { name: "alt", label: "Alt Text" },
            { name: "note", label: "Replacement Note", widget: "text", required: false },
          ],
        },
        {
          name: "highlights",
          label: "Hero Highlights",
          widget: "list",
          fields: [
            { name: "label", label: "Label" },
            { name: "text", label: "Text", widget: "text" },
          ],
        },
      ],
    },
    {
      name: "stats",
      label: "Stats",
      widget: "list",
      fields: [
        { name: "value", label: "Value" },
        { name: "label", label: "Label", widget: "text" },
      ],
    },
    {
      name: "services",
      label: "Services",
      widget: "object",
      fields: [
        ...sectionIntroFields,
        {
          name: "cards",
          label: "Cards",
          widget: "list",
          fields: [
            { name: "title", label: "Title" },
            { name: "description", label: "Description", widget: "text" },
            {
              ...textListField("items", "Items"),
            },
            { name: "href", label: "Link" },
          ],
        },
      ],
    },
    {
      name: "proof",
      label: "Experience Proof",
      widget: "object",
      fields: [
        ...sectionIntroFields,
        {
          name: "items",
          label: "Items",
          widget: "list",
          fields: [
            { name: "company", label: "Company" },
            { name: "role", label: "Role" },
            { name: "timeframe", label: "Timeframe" },
            { name: "summary", label: "Summary", widget: "text" },
            {
              ...textListField("tags", "Tags", "Tag"),
            },
          ],
        },
      ],
    },
    {
      name: "engagements",
      label: "Engagement Paths",
      widget: "object",
      fields: [
        ...sectionIntroFields,
        {
          name: "cards",
          label: "Cards",
          widget: "list",
          fields: [
            { name: "title", label: "Title" },
            { name: "price", label: "Price" },
            { name: "description", label: "Description", widget: "text" },
            {
              ...textListField("items", "Items"),
            },
            {
              name: "cta",
              label: "CTA",
              widget: "object",
              fields: ctaFields,
            },
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
        {
          name: "primaryCta",
          label: "Primary CTA",
          widget: "object",
          fields: ctaFields,
        },
        {
          name: "secondaryCta",
          label: "Secondary CTA",
          widget: "object",
          fields: ctaFields,
        },
      ],
    },
  ],
};

export default home;
