const linkFields = [
  { name: "text", label: "Text" },
  { name: "href", label: "Link" },
  {
    name: "variant",
    label: "Variant",
    widget: "select",
    options: ["default", "primary"],
    default: "default",
    required: false,
  },
];

const layout: CmsFile = {
  name: "layout",
  label: "Header & Footer",
  file: "src/data/general/layout.yml",
  fields: [
    {
      name: "header",
      label: "Header",
      widget: "object",
      fields: [
        { name: "logoLabel", label: "Logo Screen Reader Label" },
        { name: "mobileMenuLabel", label: "Mobile Menu Button Label" },
        { name: "mobileTagline", label: "Mobile Menu Tagline", widget: "text" },
        {
          name: "links",
          label: "Navigation Links",
          widget: "list",
          fields: linkFields,
        },
      ],
    },
    {
      name: "footer",
      label: "Footer",
      widget: "object",
      fields: [
        {
          name: "cta",
          label: "CTA",
          widget: "object",
          fields: [
            { name: "eyebrow", label: "Eyebrow" },
            { name: "text", label: "Text", widget: "text" },
            {
              name: "button",
              label: "Button",
              widget: "object",
              fields: linkFields,
            },
          ],
        },
        {
          name: "menus",
          label: "Menu Groups",
          widget: "list",
          fields: [
            { name: "heading", label: "Heading" },
            {
              name: "links",
              label: "Links",
              widget: "list",
              fields: linkFields,
            },
          ],
        },
        {
          name: "locations",
          label: "Locations",
          widget: "object",
          fields: [
            { name: "heading", label: "Heading" },
            {
              name: "items",
              label: "Items",
              widget: "list",
              fields: [
                { name: "country", label: "Country" },
                { name: "locality", label: "Locality" },
              ],
            },
          ],
        },
        {
          name: "contact",
          label: "Contact",
          widget: "object",
          fields: [
            { name: "heading", label: "Heading" },
            {
              name: "items",
              label: "Items",
              widget: "list",
              fields: [
                { name: "label", label: "Label" },
                { name: "href", label: "Link" },
                { name: "icon", label: "Icon" },
              ],
            },
          ],
        },
        { name: "socialsHeading", label: "Socials Heading" },
        { name: "copyrightSuffix", label: "Copyright Suffix" },
      ],
    },
  ],
};

export default layout;
