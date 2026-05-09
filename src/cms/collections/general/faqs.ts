const faqs: CmsFile = {
  name: "faqs",
  label: "FAQs",
  file: "src/data/general/faqs.yml",
  fields: [
    {
      name: "groups",
      label: "FAQ Groups",
      widget: "list",
      fields: [
        {
          name: "key",
          label: "Key",
          hint: "Stable identifier used in code, for example homepage or services.",
        },
        { name: "label", label: "CMS Label" },
        { name: "eyebrow", label: "Eyebrow" },
        { name: "title", label: "Title", widget: "text" },
        {
          name: "items",
          label: "Questions",
          widget: "list",
          fields: [
            { name: "question", label: "Question", widget: "text" },
            { name: "answer", label: "Answer", widget: "text" },
          ],
        },
      ],
    },
  ],
};

export default faqs;
