import seo from "./seo";

const general: CmsCollection = {
  name: "general",
  label: "General",
  files: [
    seo,
    {
      name: "header",
      label: "Header",
      file: "src/content/layouts/header.yml",
      i18n: true,
      fields: [
        { name: "title", label: "Title" },
        { name: "body", label: "Body", widget: "markdown" },
      ],
    },
  ],
};

export default general;
