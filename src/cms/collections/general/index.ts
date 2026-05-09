import faqs from "./faqs";
import home from "./home";
import layout from "./layout";
import meta from "./meta";
import quote from "./quote";
import resume from "./resume";
import socials from "./socials";

const general: CmsCollection = {
  name: "general",
  label: "General",
  files: [meta, layout, home, quote, faqs, socials, resume],
};

export default general;
