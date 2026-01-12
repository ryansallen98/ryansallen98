const meta: CmsFile = {
  name: "meta",
  label: "Meta Data",
  file: "src/data/general/meta.yml",
  fields: [
    { name: "siteName", label: "Site Name" },
    { name: "legalName", label: "Legal Name", required: false },
    { name: "brand", label: "Brand" },
    { name: "tagline", label: "Tagline" },
    { name: "description", label: "Description", widget: "text" },
    { name: "logo", label: "Logo", widget: "image", required: false },
    { name: "image", label: "Image", widget: "image", required: false },
    {
      name: "themeColor",
      label: "Theme Color",
      widget: "color",
      required: false,
    },
    {
      name: "entityType",
      label: "Entity Type",
      widget: "select",
      options: ["Person", "Organization"],
    },
    {
      name: "jobTitle",
      label: "Job Title (for Person entity type)",
      widget: "string",
      required: false,
    }
  ],
};

export default meta;
