import fs from "fs";
import { chromium } from "playwright";
import { preview } from "astro";

const PORT = 4321;
const URL = `http://localhost:${PORT}/resume`;
const OUTPUT = "public/resume.pdf";

async function generatePDF() {
  // Start Astro preview server
  const server = await preview({
    root: process.cwd(),
    port: PORT,
  });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(URL, { waitUntil: "networkidle" });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "0mm",
      right: "0mm",
      bottom: "0mm",
      left: "0mm",
    },
  });

  fs.mkdirSync("public", { recursive: true });
  fs.writeFileSync(OUTPUT, pdf);

  await browser.close();
  await server.stop();

  console.log("✅ resume.pdf generated");
}

generatePDF();
