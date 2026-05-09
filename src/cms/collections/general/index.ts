import about from "./about";
import contact from "./contact";
import cookieConsent from "./cookieConsent";
import faqs from "./faqs";
import home from "./home";
import layout from "./layout";
import meta from "./meta";
import pricing from "./pricing";
import policies from "./policies";
import quote from "./quote";
import resume from "./resume";
import services from "./services";
import socials from "./socials";

const general: CmsCollection = {
  name: "general",
  label: "General",
  files: [
    meta,
    layout,
    home,
    about,
    services,
    pricing,
    contact,
    policies,
    cookieConsent,
    quote,
    faqs,
    socials,
    resume,
  ],
};

export default general;
