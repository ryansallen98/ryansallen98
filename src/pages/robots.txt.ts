import type { APIRoute } from "astro";

const SITE_URL = import.meta.env.SITE_URL;
const NO_INDEX = !import.meta.env.PROD;

const disallowedPaths = ["/admin/"];

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
      lines.push(`Sitemap: ${SITE_URL}/sitemap.xml`);
    }
  }

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};