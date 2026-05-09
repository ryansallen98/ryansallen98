import seoFields from "./seoFields";

const optionFields = [
  { name: "label", label: "Label" },
  { name: "value", label: "Value" },
  { name: "description", label: "Description", widget: "text", required: false },
];

const estimateBands = [
  { name: "small", label: "Small scope copy" },
  { name: "medium", label: "Medium scope copy" },
  { name: "large", label: "Large scope copy" },
];

const quote: CmsFile = {
  name: "quote",
  label: "Get A Quote",
  file: "src/data/general/quote.yml",
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
        { name: "note", label: "Note", widget: "text" },
      ],
    },
    {
      name: "wizard",
      label: "Wizard Copy",
      widget: "object",
      fields: [
        { name: "eyebrow", label: "Eyebrow" },
        { name: "title", label: "Title" },
        { name: "progressLabel", label: "Progress Label" },
        { name: "backLabel", label: "Back Label" },
        { name: "nextLabel", label: "Next Label" },
        { name: "estimateLabel", label: "Estimate Label" },
        { name: "discoveryLabel", label: "Discovery Label" },
        { name: "hourlyNote", label: "Hourly Note", widget: "text" },
        { name: "summaryLabel", label: "Summary Label" },
        { name: "submitLabel", label: "Submit Label" },
        { name: "submittingText", label: "Submitting Text" },
        { name: "successText", label: "Success Text", widget: "text" },
        {
          name: "steps",
          label: "Steps",
          widget: "object",
          fields: [
            {
              name: "projectType",
              label: "Project Type",
              widget: "object",
              fields: [
                { name: "title", label: "Title" },
                { name: "help", label: "Help", widget: "text" },
                {
                  name: "options",
                  label: "Options",
                  widget: "list",
                  fields: optionFields,
                },
              ],
            },
            {
              name: "stack",
              label: "Stack",
              widget: "object",
              fields: [
                { name: "title", label: "Title" },
                { name: "help", label: "Help", widget: "text" },
              ],
            },
            {
              name: "scope",
              label: "Scope",
              widget: "object",
              fields: [
                { name: "title", label: "Title" },
                { name: "help", label: "Help", widget: "text" },
                {
                  name: "options",
                  label: "Options",
                  widget: "list",
                  fields: optionFields,
                },
              ],
            },
            {
              name: "extras",
              label: "Extras",
              widget: "object",
              fields: [
                { name: "title", label: "Title" },
                { name: "help", label: "Help", widget: "text" },
                {
                  name: "options",
                  label: "Options",
                  widget: "list",
                  fields: optionFields,
                },
              ],
            },
            {
              name: "timeline",
              label: "Timeline",
              widget: "object",
              fields: [
                { name: "title", label: "Title" },
                { name: "help", label: "Help", widget: "text" },
                {
                  name: "options",
                  label: "Options",
                  widget: "list",
                  fields: optionFields,
                },
              ],
            },
            {
              name: "contact",
              label: "Contact",
              widget: "object",
              fields: [
                { name: "title", label: "Title" },
                { name: "help", label: "Help", widget: "text" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "estimates",
      label: "Estimates",
      widget: "object",
      fields: [
        {
          name: "app",
          label: "Dashboard / app / internal tool",
          widget: "object",
          fields: estimateBands,
        },
        {
          name: "website",
          label: "Website or landing page",
          widget: "object",
          fields: estimateBands,
        },
        {
          name: "ecommerce",
          label: "Ecommerce",
          widget: "object",
          fields: estimateBands,
        },
        {
          name: "unsure",
          label: "Not sure",
          widget: "object",
          fields: estimateBands,
        },
      ],
    },
    {
      name: "result",
      label: "Result Copy",
      widget: "object",
      fields: [
        { name: "defaultText", label: "Default Text", widget: "text" },
        { name: "discoveryText", label: "Discovery Text", widget: "text" },
      ],
    },
  ],
};

export default quote;
