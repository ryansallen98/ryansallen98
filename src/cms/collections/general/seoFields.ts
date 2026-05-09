const seoFields = {
  name: "seo",
  label: "SEO",
  widget: "object",
  collapsed: true,
  fields: [
    { name: "title", label: "SEO Title" },
    { name: "description", label: "Meta Description", widget: "text" },
    { name: "canonicalPath", label: "Canonical Path", required: false },
    {
      name: "image",
      label: "Social Image",
      widget: "object",
      required: false,
      fields: [
        { name: "src", label: "Image", widget: "image", required: false },
        { name: "alt", label: "Image Alt Text", required: false },
      ],
    },
    {
      name: "keywords",
      label: "Keywords",
      widget: "list",
      required: false,
      field: { name: "keyword", label: "Keyword" },
    },
    {
      name: "noIndex",
      label: "Noindex",
      widget: "boolean",
      default: false,
      required: false,
    },
    {
      name: "noFollow",
      label: "Nofollow",
      widget: "boolean",
      default: false,
      required: false,
    },
    {
      name: "schemaType",
      label: "Schema Type",
      widget: "select",
      required: false,
      options: [
        "WebPage",
        "ProfilePage",
        "AboutPage",
        "ContactPage",
        "CollectionPage",
        "FAQPage",
      ],
    },
    {
      name: "jsonLd",
      label: "Extra JSON-LD",
      widget: "text",
      required: false,
      hint: "Optional advanced JSON-LD object or array. Must be valid JSON.",
    },
  ],
};

export default seoFields;
