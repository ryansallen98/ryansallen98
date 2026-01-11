import type { CmsConfig } from "@sveltia/cms";

declare global {
  type CmsCollections = NonNullable<CmsConfig["collections"]>;
  type CmsCollection = Exclude<CmsCollections[number], { type: "divider" }>;
}
