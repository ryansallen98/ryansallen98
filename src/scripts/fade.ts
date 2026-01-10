const fadeInElements = document.querySelectorAll<HTMLElement>(".fade-in");

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target); // Stop observing once it's visible
      }
    });
  },
  {
    threshold: 0.2, // 20% visible before triggering
  }
);

fadeInElements.forEach((el) => observer.observe(el));
