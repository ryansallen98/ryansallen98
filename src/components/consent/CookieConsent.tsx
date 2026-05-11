import { BarChart3, Check, Cookie, Settings2, ShieldCheck, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type ConsentCategory = {
  title: string;
  description: string;
  statusLabel?: string;
};

type ConsentLink = {
  text: string;
  href: string;
};

export type CookieConsentContent = {
  storageKey: string;
  revision: number;
  banner: {
    eyebrow: string;
    title: string;
    text: string;
  };
  controls: {
    acceptLabel: string;
    rejectLabel: string;
    customizeLabel: string;
    saveLabel: string;
    closeLabel: string;
    reopenLabel: string;
    onLabel: string;
    offLabel: string;
    gpcLabel: string;
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

declare global {
  interface Window {
    __posthog_initialized?: boolean;
    __rallen_analytics_disabled?: boolean;
    posthog?: {
      init?: (key: string, config: Record<string, unknown>) => void;
      capture?: (eventName: string, properties?: Record<string, unknown>) => void;
      opt_out_capturing?: () => void;
      reset?: () => void;
      [key: string]: unknown;
    };
  }
}

const POSTHOG_STORAGE_PATTERN = /(^ph_|posthog)/i;

function readConsent(storageKey: string, revision: number): ConsentRecord | null {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<ConsentRecord>;
    if (parsed.revision !== revision || parsed.necessary !== true) return null;

    return {
      revision,
      necessary: true,
      analytics: parsed.analytics === true,
      decidedAt: typeof parsed.decidedAt === "string" ? parsed.decidedAt : "",
    };
  } catch {
    return null;
  }
}

function writeConsent(storageKey: string, revision: number, analytics: boolean) {
  const record: ConsentRecord = {
    revision,
    necessary: true,
    analytics,
    decidedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(storageKey, JSON.stringify(record));
  return record;
}

function removeMatchingStorage(storage: Storage, keepKey: string) {
  const keys = Array.from({ length: storage.length }, (_, index) => storage.key(index)).filter(
    (key): key is string => Boolean(key)
  );

  keys.forEach((key) => {
    if (key !== keepKey && POSTHOG_STORAGE_PATTERN.test(key)) {
      storage.removeItem(key);
    }
  });
}

function removeMatchingCookies() {
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0]?.trim();
    if (!name || !POSTHOG_STORAGE_PATTERN.test(name)) return;

    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=${window.location.hostname}; SameSite=Lax`;
  });
}

function clearPosthogStorage(storageKey: string) {
  removeMatchingStorage(window.localStorage, storageKey);
  removeMatchingStorage(window.sessionStorage, storageKey);
  removeMatchingCookies();
}

function shouldCapturePageviews(config: PosthogConfig) {
  return config.capturePageview !== "false";
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

  (function (t: Document, e: any) {
    let o: string[];
    let n: number;
    let p: HTMLScriptElement;
    let r: HTMLScriptElement;

    if (e.__SV) return;

    window.posthog = e;
    e._i = [];
    e.init = function (i: string, s: Record<string, unknown>, a?: string) {
      function g(target: any, methodName: string) {
        const parts = methodName.split(".");
        if (parts.length === 2) {
          target = target[parts[0]];
          methodName = parts[1];
        }
        target[methodName] = function () {
          target.push([methodName].concat(Array.prototype.slice.call(arguments, 0)));
        };
      }

      p = t.createElement("script");
      p.type = "text/javascript";
      p.crossOrigin = "anonymous";
      p.async = true;
      p.src = `${String(s.api_host)}/static/array.js`;
      r = t.getElementsByTagName("script")[0];
      r.parentNode?.insertBefore(p, r);

      let u = e;
      if (a !== undefined) {
        u = e[a] = [];
      } else {
        a = "posthog";
      }

      u.people = u.people || [];
      u.toString = function (includeStub?: boolean) {
        let name = "posthog";
        if (a !== "posthog") name += `.${a}`;
        if (!includeStub) name += " (stub)";
        return name;
      };
      u.people.toString = function () {
        return `${u.toString(1)}.people (stub)`;
      };

      o =
        "capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys getNextSurveyStep onSessionId".split(
          " "
        );
      for (n = 0; n < o.length; n += 1) g(u, o[n]);
      e._i.push([i, s, a]);
    };
    e.__SV = 1;
  })(document, window.posthog || []);
}

function loadPosthog(config: PosthogConfig, capturePageview: boolean) {
  if (!config.key || window.__rallen_analytics_disabled) return;

  installPosthogSnippet();

  if (!window.__posthog_initialized) {
    window.__posthog_initialized = true;
    window.posthog?.init?.(config.key, posthogInitConfig(config));
  }

  if (capturePageview && shouldCapturePageviews(config)) {
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
  return Boolean((window.navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl);
}

function isResumePdfRender() {
  const path = window.location.pathname.replace(/\/+$/, "");
  return path === "/resume" && new URLSearchParams(window.location.search).has("html");
}

export default function CookieConsent({
  content,
  posthog,
}: {
  content: CookieConsentContent;
  posthog: PosthogConfig;
}) {
  const [ready, setReady] = useState(false);
  const [choice, setChoice] = useState<ConsentRecord | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [globalPrivacyControl, setGlobalPrivacyControl] = useState(false);

  const analyticsAllowed = useMemo(
    () => analyticsEnabled && !globalPrivacyControl,
    [analyticsEnabled, globalPrivacyControl]
  );

  useEffect(() => {
    if (isResumePdfRender()) {
      window.__rallen_analytics_disabled = true;
      return;
    }

    const gpcEnabled = isGlobalPrivacyControlEnabled();
    const stored = readConsent(content.storageKey, content.revision);

    setGlobalPrivacyControl(gpcEnabled);
    setChoice(stored);
    setAnalyticsEnabled(stored?.analytics === true && !gpcEnabled);
    setIsOpen(!stored);
    setReady(true);

    if (stored?.analytics && !gpcEnabled) {
      window.__rallen_analytics_disabled = false;
      loadPosthog(posthog, true);
    } else {
      disablePosthog(content.storageKey);
    }

    const openPreferences = (event?: Event) => {
      event?.preventDefault();
      setShowPreferences(true);
      setIsOpen(true);
    };

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const trigger = target?.closest?.('a[href="#cookie-preferences"], button[data-cookie-preferences]');
      if (trigger) openPreferences(event);
    };

    const handlePageLoad = () => {
      const current = readConsent(content.storageKey, content.revision);
      if (current?.analytics && !isGlobalPrivacyControlEnabled()) {
        window.__rallen_analytics_disabled = false;
        loadPosthog(posthog, true);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("astro:page-load", handlePageLoad);
    window.addEventListener("rallen:open-cookie-preferences", openPreferences);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("astro:page-load", handlePageLoad);
      window.removeEventListener("rallen:open-cookie-preferences", openPreferences);
    };
  }, [content.revision, content.storageKey, posthog]);

  const saveChoice = (analytics: boolean) => {
    const nextAnalytics = analytics && !globalPrivacyControl;
    const nextChoice = writeConsent(content.storageKey, content.revision, nextAnalytics);

    setChoice(nextChoice);
    setAnalyticsEnabled(nextAnalytics);
    setIsOpen(false);
    setShowPreferences(false);

    if (nextAnalytics) {
      window.__rallen_analytics_disabled = false;
      loadPosthog(posthog, true);
    } else {
      disablePosthog(content.storageKey);
    }
  };

  if (!ready) return null;

  return (
    <>
      {choice && !isOpen ? (
        <button
          type="button"
          data-cookie-preferences
          className="fixed bottom-4 left-4 z-50 inline-flex h-11 items-center gap-2 border border-divider-dark bg-background-dark/95 px-4 text-xs font-medium uppercase text-foreground-dark shadow-2xl shadow-black/30 backdrop-blur transition hover:border-primary hover:text-primary focus-visible:border-primary focus-visible:outline-3 focus-visible:outline-ring/50 print:hidden"
        >
          <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
          <span className="hidden sm:inline">{content.controls.reopenLabel}</span>
        </button>
      ) : null}

      {isOpen ? (
        <section
          aria-labelledby="cookie-consent-title"
          className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-5 sm:pb-5 print:hidden"
        >
          <div className="mx-auto grid max-w-6xl overflow-hidden border border-divider-dark bg-background-dark text-foreground-dark shadow-2xl shadow-black/40 lg:grid-cols-[1fr_22rem]">
            <div className="relative overflow-hidden p-5 sm:p-6 lg:p-7">
              <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] [background-size:18px_18px]" />
              <div className="relative">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <p className="inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-primary">
                    <Cookie className="size-4" aria-hidden="true" />
                    {content.banner.eyebrow}
                  </p>
                  {choice ? (
                    <button
                      type="button"
                      aria-label={content.controls.closeLabel}
                      className="inline-flex size-9 items-center justify-center border border-divider-dark text-muted transition hover:border-primary hover:text-primary focus-visible:border-primary focus-visible:outline-3 focus-visible:outline-ring/50"
                      onClick={() => {
                        setIsOpen(false);
                        setShowPreferences(false);
                      }}
                    >
                      <X className="size-4" aria-hidden="true" />
                    </button>
                  ) : null}
                </div>

                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                  <div>
                    <h2
                      id="cookie-consent-title"
                      className="font-heading text-[clamp(2rem,5vw,4.8rem)] uppercase leading-none text-foreground-dark"
                    >
                      {content.banner.title}
                    </h2>
                    <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
                      {content.banner.text}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
                      {content.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          className="underline decoration-divider-dark underline-offset-4 transition hover:text-primary hover:decoration-primary focus-visible:text-primary"
                        >
                          {link.text}
                        </a>
                      ))}
                    </div>
                  </div>

                  {!showPreferences ? (
                    <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 bg-primary px-5 py-4 text-sm font-medium uppercase text-primary-foreground transition hover:bg-foreground-dark focus-visible:outline-3 focus-visible:outline-ring/50"
                        onClick={() => saveChoice(true)}
                      >
                        <Check className="size-4" aria-hidden="true" />
                        {content.controls.acceptLabel}
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 border border-divider-dark px-5 py-4 text-sm font-medium uppercase text-foreground-dark transition hover:border-primary hover:text-primary focus-visible:border-primary focus-visible:outline-3 focus-visible:outline-ring/50"
                        onClick={() => saveChoice(false)}
                      >
                        <X className="size-4" aria-hidden="true" />
                        {content.controls.rejectLabel}
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 px-5 py-4 text-sm font-medium uppercase text-muted transition hover:text-primary focus-visible:text-primary focus-visible:outline-3 focus-visible:outline-ring/50"
                        onClick={() => setShowPreferences(true)}
                      >
                        <Settings2 className="size-4" aria-hidden="true" />
                        {content.controls.customizeLabel}
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="border-t border-divider-dark bg-secondary-dark p-4 sm:p-5 lg:border-l lg:border-t-0">
              <div className="grid gap-3">
                <div className="border border-divider-dark bg-background-dark p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold uppercase text-foreground-dark">
                        {content.categories.necessary.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {content.categories.necessary.description}
                      </p>
                    </div>
                    <span className="shrink-0 bg-primary px-2 py-1 text-[0.65rem] font-medium uppercase text-primary-foreground">
                      {content.categories.necessary.statusLabel}
                    </span>
                  </div>
                </div>

                <div className="border border-divider-dark bg-background-dark p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="inline-flex items-center gap-2 text-sm font-semibold uppercase text-foreground-dark">
                        <BarChart3 className="size-4 text-primary" aria-hidden="true" />
                        {content.categories.analytics.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {content.categories.analytics.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={analyticsAllowed}
                      disabled={globalPrivacyControl}
                      className="relative h-7 w-13 shrink-0 border border-divider-dark bg-secondary-dark transition enabled:hover:border-primary focus-visible:border-primary focus-visible:outline-3 focus-visible:outline-ring/50 disabled:cursor-not-allowed disabled:opacity-60"
                      onClick={() => setAnalyticsEnabled((enabled) => !enabled)}
                    >
                      <span
                        className={`absolute top-1 size-5 bg-foreground-dark transition ${
                          analyticsAllowed ? "left-7 bg-primary" : "left-1"
                        }`}
                      />
                      <span className="sr-only">
                        {analyticsAllowed ? content.controls.onLabel : content.controls.offLabel}
                      </span>
                    </button>
                  </div>
                  {globalPrivacyControl ? (
                    <p className="mt-3 border-t border-divider-dark pt-3 text-xs leading-relaxed text-primary">
                      {content.controls.gpcLabel}
                    </p>
                  ) : null}
                </div>

                {showPreferences ? (
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 bg-primary px-5 py-4 text-sm font-medium uppercase text-primary-foreground transition hover:bg-foreground-dark focus-visible:outline-3 focus-visible:outline-ring/50"
                    onClick={() => saveChoice(analyticsEnabled)}
                  >
                    <Check className="size-4" aria-hidden="true" />
                    {content.controls.saveLabel}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
