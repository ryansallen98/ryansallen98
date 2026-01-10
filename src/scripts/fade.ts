function initFadeIns() {
  const fadeInElements = document.querySelectorAll<HTMLElement>(".fade-in");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target); // animate once per page
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  fadeInElements.forEach(el => {
    // reset state so it can re-animate on navigation
    el.classList.remove("is-visible");
    observer.observe(el);
  });
}

// Initial load
initFadeIns();

// Re-run after Astro client-side navigation
document.addEventListener("astro:page-load", initFadeIns);