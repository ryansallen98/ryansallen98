const linkFields = [
  { name: "text", label: "Text" },
  { name: "href", label: "Link" },
];

const sectionFields = [
  { name: "title", label: "Title" },
  { name: "body", label: "Body", widget: "text" },
];

const policies: CmsFile = {
  name: "policies",
  label: "Policy Pages",
  file: "src/data/general/policies.yml",
  fields: [
    {
      name: "labels",
      label: "Labels",
      widget: "object",
      fields: [
        { name: "updated", label: "Updated Label" },
        { name: "related", label: "Related Label" },
      ],
    },
    {
      name: "pages",
      label: "Pages",
      widget: "list",
      fields: [
        { name: "key", label: "Key" },
        { name: "eyebrow", label: "Eyebrow" },
        { name: "title", label: "Title", widget: "text" },
        { name: "slug", label: "Slug" },
        { name: "summary", label: "Summary", widget: "text" },
        { name: "updated", label: "Updated Date" },
        {
          name: "sections",
          label: "Sections",
          widget: "list",
          fields: sectionFields,
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

export default policies;
