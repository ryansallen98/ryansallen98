import seoFields from "./seoFields";

const resume: CmsFile = {
  name: "resume",
  label: "Resume",
  file: "src/data/general/resume.yml",
  fields: [
    seoFields,
    { name: "name", label: "Name" },
    { name: "headline", label: "Headline" },
    { name: "location", label: "Location" },
    {
      name: "photo",
      label: "Photo",
      widget: "object",
      fields: [
        { name: "src", label: "Image", widget: "image" },
        { name: "alt", label: "Alt Text" },
        { name: "note", label: "Internal Note", required: false },
      ],
    },
    { name: "profile", label: "Profile", widget: "text" },
    {
      name: "contact",
      label: "Contact Links",
      widget: "list",
      fields: [
        { name: "label", label: "Label" },
        { name: "value", label: "Display Value" },
        { name: "href", label: "URL", required: false },
      ],
    },
    {
      name: "skillPills",
      label: "Core Skill Pills",
      widget: "list",
      field: { name: "item", label: "Skill", widget: "string" },
    },
    {
      name: "focus",
      label: "Focus",
      widget: "text",
      required: false,
    },
    {
      name: "education",
      label: "Education",
      widget: "list",
      required: false,
      fields: [
        { name: "school", label: "School" },
        { name: "qualification", label: "Qualification" },
        { name: "dates", label: "Dates", required: false },
      ],
    },
    {
      name: "experience",
      label: "Experience",
      widget: "list",
      fields: [
        { name: "company", label: "Company" },
        { name: "role", label: "Role" },
        { name: "location", label: "Location", required: false },
        { name: "dates", label: "Dates" },
        { name: "description", label: "Description", widget: "text", required: false },
        {
          name: "bullets",
          label: "Bullets",
          widget: "list",
          field: { name: "item", label: "Bullet", widget: "string" },
        },
      ],
    },
  ],
};

export default resume;
