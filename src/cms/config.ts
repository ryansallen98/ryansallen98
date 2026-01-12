import type { CmsConfig } from "@sveltia/cms";
import general from "./collections/general";

const config: CmsConfig = {
  load_config_file: false,
  publish_mode: "editorial_workflow",
  backend: {
    name: "github",
    repo: "ryansallen98/ryansallen98",
  },
  media_folder: "/public/images",
  public_folder: "/images",
  collections: [general],
};

export default config;
