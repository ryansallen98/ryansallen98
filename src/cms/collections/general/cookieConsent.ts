const linkFields = [
  { name: "text", label: "Text" },
  { name: "href", label: "Link" },
];

const cookieConsent: CmsFile = {
  name: "cookieConsent",
  label: "Cookie Consent",
  file: "src/data/general/cookie-consent.yml",
  fields: [
    { name: "storageKey", label: "Storage Key" },
    { name: "revision", label: "Revision", widget: "number", value_type: "int" },
    {
      name: "banner",
      label: "Banner",
      widget: "object",
      fields: [
        { name: "eyebrow", label: "Eyebrow" },
        { name: "title", label: "Title" },
        { name: "text", label: "Text", widget: "text" },
      ],
    },
    {
      name: "controls",
      label: "Controls",
      widget: "object",
      fields: [
        { name: "acceptLabel", label: "Accept Label" },
        { name: "rejectLabel", label: "Reject Label" },
        { name: "customizeLabel", label: "Customize Label" },
        { name: "saveLabel", label: "Save Label" },
        { name: "closeLabel", label: "Close Label" },
        { name: "reopenLabel", label: "Reopen Label" },
        { name: "onLabel", label: "On Label" },
        { name: "offLabel", label: "Off Label" },
        { name: "gpcLabel", label: "Global Privacy Control Label", widget: "text" },
      ],
    },
    {
      name: "categories",
      label: "Categories",
      widget: "object",
      fields: [
        {
          name: "necessary",
          label: "Necessary",
          widget: "object",
          fields: [
            { name: "title", label: "Title" },
            { name: "description", label: "Description", widget: "text" },
            { name: "statusLabel", label: "Status Label" },
          ],
        },
        {
          name: "analytics",
          label: "Analytics",
          widget: "object",
          fields: [
            { name: "title", label: "Title" },
            { name: "description", label: "Description", widget: "text" },
          ],
        },
      ],
    },
    {
      name: "links",
      label: "Policy Links",
      widget: "list",
      fields: linkFields,
    },
  ],
};

export default cookieConsent;
