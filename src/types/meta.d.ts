interface WebsiteSchema {
  "@context": string;
  "@type": "WebSite";
  "@id"?: string;
  name: string;
  url: string;
  description?: string;
  inLanguage?: string;
  publisher?: { "@id": string };
  potentialAction?: PotentialAction;
}

interface PotentialAction {
  "@type": "SearchAction";
  target: string;
  "query-input": string;
}
