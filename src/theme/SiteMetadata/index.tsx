import React, { type ReactNode } from "react";
import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { PageMetadata, useThemeConfig } from "@docusaurus/theme-common";
import { DEFAULT_SEARCH_TAG } from "@docusaurus/theme-common/internal";
import { useLocation } from "@docusaurus/router";
import { applyTrailingSlash } from "@docusaurus/utils-common";
import SearchMetadata from "@theme/SearchMetadata";

/**
 * Docusaurus emits `en` and `x-default` hreflang links even when a site has
 * only one locale, pointing both links back to the canonical URL. RoleLogic
 * has translated client UI strings but no crawlable localized docs URLs, so
 * publishing those alternates would describe pages that do not exist.
 *
 * This intentionally small swizzle retains the classic theme's canonical,
 * Open Graph, search, and configured metadata while omitting hreflang until
 * real localized routes are published.
 */
function LocaleMetadata(): ReactNode {
  const {
    i18n: { currentLocale, localeConfigs },
  } = useDocusaurusContext();
  const htmlLang = localeConfigs[currentLocale]!.htmlLang;

  return (
    <Head>
      <meta property="og:locale" content={htmlLang.replace("-", "_")} />
    </Head>
  );
}

function useDefaultCanonicalUrl() {
  const {
    siteConfig: { url: siteUrl, baseUrl, trailingSlash },
  } = useDocusaurusContext();
  const { pathname } = useLocation();
  const canonicalPathname = applyTrailingSlash(useBaseUrl(pathname), {
    trailingSlash,
    baseUrl,
  });
  return siteUrl + canonicalPathname;
}

function CanonicalUrlHeaders() {
  const canonicalUrl = useDefaultCanonicalUrl();
  return (
    <Head>
      <meta property="og:url" content={canonicalUrl} />
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
}

export default function SiteMetadata(): ReactNode {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const { metadata, image: defaultImage } = useThemeConfig();

  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <body />
      </Head>

      {defaultImage && <PageMetadata image={defaultImage} />}
      <CanonicalUrlHeaders />
      <LocaleMetadata />
      <SearchMetadata tag={DEFAULT_SEARCH_TAG} locale={currentLocale} />

      <Head>
        {metadata.map((metadatum, index) => (
          <meta key={index} {...metadatum} />
        ))}
      </Head>
    </>
  );
}
