type ConsentCategory = {
  title: string;
  description: string;
  statusLabel?: string;
};

export {};

type ConsentLink = {
  text: string;
  href: string;
};

type CookieConsentContent = {
  storageKey: string;
  revision: number;
  controls: {
    onLabel: string;
    offLabel: string;
  };
  categories: {
    necessary: ConsentCategory;
    analytics: ConsentCategory;
  };
  links: ConsentLink[];
};

type PosthogConfig = {
  key?: string;
  host?: string;
  uiHost?: string;
  defaults?: string;
  capturePageview?: string;
  personProfiles?: string;
};

type ConsentRecord = {
  revision: number;
  necessary: true;
  analytics: boolean;
  decidedAt: string;
};

type CookieConsentPayload = {
  content: CookieConsentContent;
  posthog: PosthogConfig;
};

declare global {
  interface Navigator {
    globalPrivacyControl?: boolean;
  }

  interface Window {
    __posthog_initialized?: boolean;
    __rallen_analytics_disabled?: boolean;
    posthog?: any;
  }
}

const storagePattern = /(^ph_|posthog)/i;

function parseConfig(configElement: HTMLScriptElement): CookieConsentPayload | null {
  if (!configElement.textContent) return null;

  try {
    return JSON.parse(configElement.textContent) as CookieConsentPayload;
  } catch {
    return null;
  }
}

function readConsent(content: CookieConsentContent): ConsentRecord | null {
  try {
    const raw = window.localStorage.getItem(content.storageKey);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<ConsentRecord>;
    if (parsed.revision !== content.revision || parsed.necessary !== true) {
      return null;
    }

    return {
      revision: content.revision,
      necessary: true,
      analytics: parsed.analytics === true,
      decidedAt: typeof parsed.decidedAt === "string" ? parsed.decidedAt : "",
    };
  } catch {
    return null;
  }
}

function writeConsent(content: CookieConsentContent, analytics: boolean) {
  const record: ConsentRecord = {
    revision: content.revision,
    necessary: true,
    analytics,
    decidedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(content.storageKey, JSON.stringify(record));
  return record;
}

function removeMatchingStorage(storage: Storage, keepKey: string) {
  const keys = Array.from({ length: storage.length }, (_, index) =>
    storage.key(index)
  ).filter((key): key is string => Boolean(key));

  keys.forEach((key) => {
    if (key !== keepKey && storagePattern.test(key)) {
      storage.removeItem(key);
    }
  });
}

function removeMatchingCookies() {
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0]?.trim();
    if (!name || !storagePattern.test(name)) return;

    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=${window.location.hostname}; SameSite=Lax`;
  });
}

function clearPosthogStorage(storageKey: string) {
  removeMatchingStorage(window.localStorage, storageKey);
  removeMatchingStorage(window.sessionStorage, storageKey);
  removeMatchingCookies();
}

function posthogInitConfig(config: PosthogConfig) {
  return {
    api_host: config.host,
    ...(config.uiHost && { ui_host: config.uiHost }),
    ...(config.defaults && { defaults: config.defaults }),
    capture_pageview: false,
    ...(config.personProfiles && { person_profiles: config.personProfiles }),
    persistence: "localStorage",
    autocapture: false,
    capture_dead_clicks: false,
    capture_exceptions: false,
    capture_heatmaps: false,
    capture_performance: false,
    disable_session_recording: true,
    disable_surveys: true,
    advanced_disable_decide: true,
    advanced_disable_feature_flags: true,
  };
}

function installPosthogSnippet() {
  if (window.posthog?.init) return;

  ((documentRef: Document, posthogRef: any) => {
    if (posthogRef.__SV) return;

    window.posthog = posthogRef;
    posthogRef._i = [];
    posthogRef.init = (key: string, config: Record<string, unknown>, name?: string) => {
      function installMethod(target: any, methodName: string) {
        const parts = methodName.split(".");
        if (parts.length === 2) {
          target = target[parts[0]];
          methodName = parts[1];
        }
        target[methodName] = function () {
          target.push([methodName].concat(Array.prototype.slice.call(arguments, 0)));
        };
      }

      const script = documentRef.createElement("script");
      script.type = "text/javascript";
      script.crossOrigin = "anonymous";
      script.async = true;
      script.src = `${String(config.api_host)}/static/array.js`;
      const firstScript = documentRef.getElementsByTagName("script")[0];
      firstScript.parentNode?.insertBefore(script, firstScript);

      let instance = posthogRef;
      if (name !== undefined) {
        instance = posthogRef[name] = [];
      } else {
        name = "posthog";
      }

      instance.people = instance.people || [];
      instance.toString = (includeStub?: boolean) => {
        let label = "posthog";
        if (name !== "posthog") label += `.${name}`;
        if (!includeStub) label += " (stub)";
        return label;
      };
      instance.people.toString = () => `${instance.toString(1)}.people (stub)`;

      [
        "capture",
        "identify",
        "alias",
        "people.set",
        "opt_out_capturing",
        "reset",
      ].forEach((methodName) => installMethod(instance, methodName));

      posthogRef._i.push([key, config, name]);
    };
    posthogRef.__SV = 1;
  })(document, window.posthog || []);
}

function loadPosthog(posthog: PosthogConfig, capturePageview: boolean) {
  if (!posthog?.key || !posthog?.host) return;

  installPosthogSnippet();

  if (!window.__posthog_initialized) {
    window.__posthog_initialized = true;
    window.posthog?.init?.(posthog.key, posthogInitConfig(posthog));
  }

  if (capturePageview && posthog.capturePageview !== "false") {
    window.posthog?.capture?.("$pageview");
  }
}

function disablePosthog(storageKey: string) {
  window.__rallen_analytics_disabled = true;
  window.posthog?.opt_out_capturing?.();
  window.posthog?.reset?.();
  clearPosthogStorage(storageKey);
}

function isGlobalPrivacyControlEnabled() {
  return Boolean(window.navigator.globalPrivacyControl);
}

function isResumePdfRender() {
  const path = window.location.pathname.replace(/\/+$/, "");
  return path === "/resume" && new URLSearchParams(window.location.search).has("html");
}

function initCookieConsent() {
  const root = document.querySelector<HTMLElement>("[data-cookie-consent-root]");
  const configElement = root?.querySelector<HTMLScriptElement>(
    "[data-cookie-consent-config]"
  );
  if (!root || !configElement) return;

  const config = parseConfig(configElement);
  if (!config) return;

  const { content, posthog } = config;
  const banner = root.querySelector<HTMLElement>("[data-cookie-banner]");
  const reopenButton = root.querySelector<HTMLButtonElement>("[data-cookie-reopen]");
  const closeButton = root.querySelector<HTMLButtonElement>("[data-cookie-close]");
  const actionGroup = root.querySelector<HTMLElement>("[data-cookie-actions]");
  const saveButton = root.querySelector<HTMLButtonElement>("[data-cookie-save]");
  const switchButton = root.querySelector<HTMLButtonElement>(
    "[data-cookie-analytics-switch]"
  );
  const switchKnob = root.querySelector<HTMLElement>("[data-cookie-switch-knob]");
  const switchLabel = root.querySelector<HTMLElement>("[data-cookie-switch-label]");
  const gpcMessage = root.querySelector<HTMLElement>("[data-cookie-gpc-message]");

  let choice: ConsentRecord | null = null;
  let isOpen = false;
  let showPreferences = false;
  let analyticsEnabled = false;
  let globalPrivacyControl = false;

  function analyticsAllowed() {
    return analyticsEnabled && !globalPrivacyControl;
  }

  function render() {
    if (banner) banner.hidden = !isOpen;
    if (reopenButton) reopenButton.hidden = !(choice && !isOpen);
    if (closeButton) closeButton.hidden = !choice;
    if (actionGroup) actionGroup.hidden = showPreferences;
    if (saveButton) saveButton.hidden = !showPreferences;
    if (gpcMessage) gpcMessage.hidden = !globalPrivacyControl;

    if (switchButton) {
      switchButton.disabled = globalPrivacyControl;
      switchButton.setAttribute("aria-checked", String(analyticsAllowed()));
    }

    if (switchKnob) {
      switchKnob.classList.toggle("left-7", analyticsAllowed());
      switchKnob.classList.toggle("left-1", !analyticsAllowed());
      switchKnob.classList.toggle("bg-primary", analyticsAllowed());
      switchKnob.classList.toggle("bg-foreground-dark", !analyticsAllowed());
    }

    if (switchLabel) {
      switchLabel.textContent = analyticsAllowed()
        ? content.controls.onLabel
        : content.controls.offLabel;
    }
  }

  function saveChoice(analytics: boolean) {
    const nextAnalytics = analytics && !globalPrivacyControl;
    choice = writeConsent(content, nextAnalytics);
    analyticsEnabled = nextAnalytics;
    isOpen = false;
    showPreferences = false;

    if (nextAnalytics) {
      window.__rallen_analytics_disabled = false;
      loadPosthog(posthog, true);
    } else {
      disablePosthog(content.storageKey);
    }

    render();
  }

  function openPreferences(event?: Event) {
    event?.preventDefault();
    choice = readConsent(content);
    showPreferences = true;
    isOpen = true;
    render();
  }

  if (isResumePdfRender()) {
    window.__rallen_analytics_disabled = true;
    return;
  }

  globalPrivacyControl = isGlobalPrivacyControlEnabled();
  choice = readConsent(content);
  analyticsEnabled = choice?.analytics === true && !globalPrivacyControl;
  isOpen = !choice;

  if (choice?.analytics && !globalPrivacyControl) {
    window.__rallen_analytics_disabled = false;
    loadPosthog(posthog, true);
  } else {
    disablePosthog(content.storageKey);
  }

  render();

  root.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    if (target.closest("[data-cookie-accept]")) saveChoice(true);
    if (target.closest("[data-cookie-reject]")) saveChoice(false);
    if (target.closest("[data-cookie-customize]")) {
      showPreferences = true;
      render();
    }
    if (target.closest("[data-cookie-save]")) saveChoice(analyticsEnabled);
    if (target.closest("[data-cookie-close]")) {
      isOpen = false;
      showPreferences = false;
      render();
    }
    if (target.closest("[data-cookie-reopen]")) openPreferences(event);
    if (target.closest("[data-cookie-analytics-switch]") && !globalPrivacyControl) {
      analyticsEnabled = !analyticsEnabled;
      render();
    }
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const trigger = target.closest(
      'a[href="#cookie-preferences"], button[data-cookie-preferences]'
    );
    if (trigger) openPreferences(event);
  });

  window.addEventListener("rallen:open-cookie-preferences", openPreferences);
}

initCookieConsent();
