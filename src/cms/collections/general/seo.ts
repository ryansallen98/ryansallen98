const seo: CmsFile = {
  name: "seo",
  label: "SEO",
  file: "src/content/general/seo.yml",
  i18n: true,
  fields: [
    { name: "siteName", label: "Site Name" },
    { name: "brand", label: "Brand" },
    { name: "tagline", label: "Tagline" },
    { name: "defaultDescription", label: "Default Description", widget: "text" },
  ],
};

export default seo;
