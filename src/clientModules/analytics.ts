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
    return referrer.origin === window.location.origin
      ? `${referrer.origin}${referrer.pathname}`
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

  window.gtag?.("event", "docs_product_cta_click", {
    content_type: "docs_product_cta",
    content_id: contentId,
    send_to: trackingId,
  });
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
  window.gtag?.("event", "page_view", {
    page_title: document.title,
    page_location: locationWithoutUserData(location.pathname),
    page_path: location.pathname,
    page_referrer: referrerWithoutUserData(previousLocation),
    send_to: trackingId,
  });
}
