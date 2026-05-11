import { spawnSync } from "node:child_process";
import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import puppeteer from "puppeteer";

const distDir = resolve("dist");
const resumePath = "/resume/?html";
const outputPath = join(distDir, "resume.pdf");
const browserLaunchOptions = {
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
};

const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".pdf", "application/pdf"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
  [".woff2", "font/woff2"],
]);

if (!existsSync(join(distDir, "resume", "index.html"))) {
  throw new Error("Missing dist/resume/index.html. Run astro build before generating the resume PDF.");
}

const isMissingChromeError = (error) =>
  error instanceof Error && /Could not find Chrome|Browser was not found|Chrome.*not found/i.test(error.message);

const installPuppeteerChrome = () => {
  console.log("Puppeteer Chrome binary is missing. Installing the pinned browser before PDF generation...");

  const cliPath = join(process.cwd(), "node_modules", "puppeteer", "lib", "cjs", "puppeteer", "node", "cli.js");
  const result = spawnSync(process.execPath, [cliPath, "browsers", "install", "chrome"], {
    env: {
      ...process.env,
      PUPPETEER_SKIP_CHROME_DOWNLOAD: "false",
      PUPPETEER_SKIP_DOWNLOAD: "false",
    },
    stdio: "inherit",
  });

  if (result.status !== 0) {
    throw new Error(`Puppeteer Chrome install failed with exit code ${result.status ?? "unknown"}.`);
  }
};

const launchBrowser = async () => {
  try {
    return await puppeteer.launch(browserLaunchOptions);
  } catch (error) {
    if (!isMissingChromeError(error)) {
      throw error;
    }

    installPuppeteerChrome();
    return puppeteer.launch(browserLaunchOptions);
  }
};

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", "http://localhost");
    const decodedPath = decodeURIComponent(url.pathname);
    const safePath = normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
    let filePath = join(distDir, safePath);

    if (safePath.endsWith("/")) {
      filePath = join(filePath, "index.html");
    }

    const fileStat = await stat(filePath);
    if (fileStat.isDirectory()) {
      filePath = join(filePath, "index.html");
    }

    response.setHeader("Content-Type", mimeTypes.get(extname(filePath)) ?? "application/octet-stream");
    createReadStream(filePath).pipe(response);
  } catch {
    response.statusCode = 404;
    response.end("Not found");
  }
});

await new Promise((resolveServer) => {
  server.listen(0, "127.0.0.1", resolveServer);
});

const address = server.address();
if (!address || typeof address === "string") {
  throw new Error("Could not start local server for resume PDF generation.");
}

let browser;
try {
  browser = await launchBrowser();
  const page = await browser.newPage();
  await page.emulateMediaType("print");
  await page.goto(`http://127.0.0.1:${address.port}${resumePath}`, {
    waitUntil: "networkidle0",
  });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
  });
  console.log(`Generated ${outputPath}`);
} finally {
  await browser?.close();
  await new Promise((resolveClose) => {
    server.close(resolveClose);
  });
}
