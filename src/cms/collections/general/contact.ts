import seoFields from "./seoFields";

const linkFields = [
  { name: "text", label: "Text" },
  { name: "href", label: "Link" },
];

const contact: CmsFile = {
  name: "contact",
  label: "Contact Page",
  file: "src/data/general/contact.yml",
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
      name: "methods",
      label: "Contact Methods",
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
            { name: "label", label: "Link Label" },
            { name: "href", label: "Link" },
            { name: "icon", label: "Icon" },
          ],
        },
      ],
    },
    {
      name: "brief",
      label: "Brief Form",
      widget: "object",
      fields: [
        { name: "eyebrow", label: "Eyebrow" },
        { name: "title", label: "Title", widget: "text" },
        { name: "text", label: "Text", widget: "text" },
        { name: "formName", label: "Form Name" },
        {
          name: "fields",
          label: "Fields",
          widget: "object",
          fields: [
            {
              name: "name",
              label: "Name Field",
              widget: "object",
              fields: [
                { name: "label", label: "Label" },
                { name: "placeholder", label: "Placeholder" },
              ],
            },
            {
              name: "email",
              label: "Email Field",
              widget: "object",
              fields: [
                { name: "label", label: "Label" },
                { name: "placeholder", label: "Placeholder" },
              ],
            },
            {
              name: "phone",
              label: "Phone Field",
              widget: "object",
              fields: [
                { name: "label", label: "Label" },
                { name: "placeholder", label: "Placeholder" },
              ],
            },
            {
              name: "projectType",
              label: "Project Type Field",
              widget: "object",
              fields: [
                { name: "label", label: "Label" },
                { name: "placeholder", label: "Placeholder" },
                {
                  name: "options",
                  label: "Options",
                  widget: "list",
                  field: { name: "option", label: "Option" },
                },
              ],
            },
            {
              name: "message",
              label: "Message Field",
              widget: "object",
              fields: [
                { name: "label", label: "Label" },
                { name: "placeholder", label: "Placeholder", widget: "text" },
              ],
            },
          ],
        },
        { name: "submitText", label: "Submit Text" },
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

export default contact;
