let isPrintingResume = false;

const getResumeLayoutElements = () => {
  const resumePaper = document.querySelector(".resume-paper");
  const fallback = document.querySelector("[data-resume-pdf-fallback]");
  const toolbar = document.querySelector(".resume-toolbar");

  return { resumePaper, fallback, toolbar };
};

const updateToolbarHeight = () => {
  const { toolbar } = getResumeLayoutElements();
  const toolbarHeight = toolbar?.getBoundingClientRect().height ?? 0;

  document.documentElement.style.setProperty(
    "--resume-toolbar-height",
    `${toolbarHeight}px`
  );
};

const updateResumePdfFallback = () => {
  const { resumePaper, fallback } = getResumeLayoutElements();

  if (!resumePaper || !fallback) {
    return;
  }

  updateToolbarHeight();

  const shouldShow =
    !isPrintingResume &&
    window.innerWidth < resumePaper.getBoundingClientRect().width;

  fallback.setAttribute("data-visible", String(shouldShow));
  fallback.setAttribute("aria-hidden", String(!shouldShow));
};

const redirectToPdfOnSmallInitialLoad = () => {
  const { resumePaper } = getResumeLayoutElements();
  const shouldBypassRedirect = new URLSearchParams(window.location.search).has(
    "html"
  );

  if (
    resumePaper &&
    !shouldBypassRedirect &&
    window.innerWidth < resumePaper.getBoundingClientRect().width
  ) {
    window.location.replace("/resume.pdf");
  }
};

let resizeFrame = 0;

const onResize = () => {
  window.cancelAnimationFrame(resizeFrame);
  resizeFrame = window.requestAnimationFrame(updateResumePdfFallback);
};

updateToolbarHeight();
redirectToPdfOnSmallInitialLoad();

window.addEventListener("resize", onResize, { passive: true });
window.addEventListener("beforeprint", () => {
  isPrintingResume = true;
  updateResumePdfFallback();
});
window.addEventListener("afterprint", () => {
  isPrintingResume = false;
  updateResumePdfFallback();
});
