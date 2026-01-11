import type { CmsConfig } from "@sveltia/cms";
import general from "./collections/general";

const config: CmsConfig = {
  //   local_backend: true,
  load_config_file: false,
  publish_mode: "editorial_workflow",

  backend: {
    name: "github",
    repo: "ryansallen98/ryansallen98",
  },

  media_folder: "/public/images",
  public_folder: "/public",

  i18n: {
    structure: "multiple_folders",
    locales: ["en"],
    default_locale: "en",
  },

  collections: [general],
};

export default config;
