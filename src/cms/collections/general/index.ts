import about from "./about";
import faqs from "./faqs";
import home from "./home";
import layout from "./layout";
import meta from "./meta";
import pricing from "./pricing";
import quote from "./quote";
import resume from "./resume";
import services from "./services";
import socials from "./socials";

const general: CmsCollection = {
  name: "general",
  label: "General",
  files: [meta, layout, home, about, services, pricing, quote, faqs, socials, resume],
};

export default general;
