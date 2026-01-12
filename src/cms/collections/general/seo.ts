const seo: CmsFile = {
  name: "seo",
  label: "SEO",
  file: "src/data/general/seo.yml",
  fields: [
    { name: "siteName", label: "Site Name" },
    { name: "brand", label: "Brand" },
    { name: "tagline", label: "Tagline" },
    { name: "description", label: "Description", widget: "text" },
    { name: "image", label: "Image", widget: "image" },
  ],
};

export default seo;
