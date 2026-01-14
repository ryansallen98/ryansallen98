import type { APIRoute } from "astro";

const SITE_URL = import.meta.env.PUBLIC_SITE_URL;
const NO_INDEX = !import.meta.env.PROD;

const disallowedPaths = ["/admin/"]; // Exclude admin pages from indexing

export const GET: APIRoute = () => {
  const lines: string[] = [];

  lines.push("User-agent: *");

  if (NO_INDEX) {
    // Block everything outside prod
    lines.push("Disallow: /");
  } else {
    // Block specific paths in prod
    for (const path of disallowedPaths) {
      lines.push(`Disallow: ${path}`);
    }

    if (SITE_URL) {
      lines.push("");
      lines.push(`Sitemap: ${SITE_URL}/sitemap-index.xml`);
    }
  }

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};