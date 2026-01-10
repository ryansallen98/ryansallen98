import { normalizePath } from "./utils";

type NavLink = HTMLAnchorElement;

function updateActiveLinks(menu: HTMLElement) {
  const pathname = normalizePath(window.location.pathname);

  const links = menu.querySelectorAll<NavLink>("[data-nav-link]");

  links.forEach(link => {
    const href = normalizePath(link.dataset.href || link.getAttribute("href") || "");
    const isActive = pathname === href || pathname.startsWith(href + "/");

    link.toggleAttribute("aria-current", isActive);
    link.dataset.active = isActive ? "true" : "false";
  });
}

function initMenu() {
  const menus = document.querySelectorAll<HTMLElement>("[data-menu]");
  menus.forEach(menu => {
    updateActiveLinks(menu);
  });
}

// Initial load
initMenu();

// Re-run after Astro client navigation
document.addEventListener("astro:page-load", initMenu);