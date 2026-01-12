const socials: CmsFile = {
  name: "socials",
  label: "Socials",
  file: "src/data/general/socials.yml",
  fields: [
    {
      name: "profiles",
      label: "Social Profiles",
      widget: "list",
      required: false,
      fields: [
        {
          name: "name",
          label: "Platform",
          widget: "select",
          options: [
            "Twitter",
            "LinkedIn",
            "GitHub",
            "Facebook",
            "Instagram",
            "YouTube",
          ],
        },
        {
          name: "url",
          label: "Profile URL",
          widget: "string",
          pattern: ["^https?://", "Must be a valid URL"],
        },
      ],
    }
  ],
};

export default socials;
