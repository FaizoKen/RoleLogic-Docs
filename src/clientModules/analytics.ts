import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

const trackingId = "G-GE22P50VGH";

type RouteLocation = {
  pathname: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

let lastTrackedPath: string | undefined;

/** A Discord snowflake: 17 to 20 digits, not part of a longer number. */
const SNOWFLAKE = /(^|\D)\d{17,20}(?!\d)/g;

/**
 * Queue a GA4 event. The inline stub in docusaurus.config.ts defines
 * window.gtag before any client module runs, and /consent.js loads gtag.js
 * only after the visitor accepts analytics; until then events just wait on
 * window.dataLayer. Analytics is best-effort, so neither building the payload
 * nor sending it may break a click or a route change.
 */
function sendEvent(name: string, buildParams: () => Record<string, unknown>) {
  try {
    window.gtag?.("event", name, { ...buildParams(), send_to: trackingId });
  } catch {
    // Swallow: a failed analytics call must never surface to the reader.
  }
}

function locationWithoutUserData(pathname: string) {
  return new URL(pathname, window.location.origin).toString();
}

function referrerWithoutUserData(previousLocation?: RouteLocation) {
  if (previousLocation) {
    return locationWithoutUserData(previousLocation.pathname);
  }

  if (!document.referrer) return undefined;

  try {
    const referrer = new URL(document.referrer);
    // Documentation routes are public and have stable slugs. For external
    // referrers, retain only the origin because a third-party pathname can
    // contain usernames, IDs, or other values we have not classified.
    // Same-origin referrers can be app URLs such as /dashboard/<server id>/...
    // The app's referrer meta normally trims them to the origin; redact any
    // Discord ID here as well so none reaches Google (same rule as
    // web/src/lib/analytics.ts).
    return referrer.origin === window.location.origin
      ? `${referrer.origin}${referrer.pathname.replace(SNOWFLAKE, "$1:id")}`
      : `${referrer.origin}/`;
  } catch {
    return undefined;
  }
}

function trackProductCta(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const cta = target.closest<HTMLElement>("[data-analytics-id]");
  const contentId = cta?.dataset.analyticsId;
  if (!contentId) return;

  sendEvent("docs_product_cta_click", () => ({
    content_type: "docs_product_cta",
    content_id: contentId,
  }));
}

if (ExecutionEnvironment.canUseDOM) {
  document.addEventListener("click", trackProductCta);
}

export function onRouteDidUpdate({
  location,
  previousLocation,
}: {
  location: RouteLocation;
  previousLocation?: RouteLocation;
}) {
  if (!ExecutionEnvironment.canUseDOM || location.pathname === lastTrackedPath) {
    return;
  }

  lastTrackedPath = location.pathname;
  let pageReferrer: string | undefined;
  try {
    pageReferrer = referrerWithoutUserData(previousLocation);
    // Also the default for events gtag.js sends by itself (user_engagement,
    // enhanced-measurement clicks) and for docs_product_cta_click, which
    // otherwise carry the raw document.referrer, query string included.
    window.gtag?.("set", { page_referrer: pageReferrer });
  } catch {
    // Best-effort, like sendEvent.
  }
  sendEvent("page_view", () => ({
    page_title: document.title,
    page_location: locationWithoutUserData(location.pathname),
    page_path: location.pathname,
    page_referrer: pageReferrer,
  }));
}
