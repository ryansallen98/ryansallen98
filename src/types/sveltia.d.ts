import type { CmsConfig } from "@sveltia/cms";

declare global {
  type CmsCollections = NonNullable<CmsConfig["collections"]>;
  type CmsCollection = Exclude<CmsCollections[number], { type: "divider" }>;
  type CmsFile = NonNullable<
    Extract<CmsCollection, { files: any }>["files"]
  >[number];
}
