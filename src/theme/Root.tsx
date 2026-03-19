import React from "react";
import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useLocation } from "@docusaurus/router";

function buildBreadcrumbSchema(
  siteUrl: string,
  pathname: string
): object | null {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
    },
  ];

  const labelMap: Record<string, string> = {
    concepts: "Core Concepts",
    features: "Features",
    guides: "Guides",
    reference: "Reference",
    plugins: "Plugins",
    blog: "Blog",
    "quick-start": "Quick Start",
    faq: "FAQ",
    glossary: "Glossary",
    plans: "Plans & Pricing",
    support: "Support",
  };

  let currentPath = "";
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const label =
      labelMap[segment] ||
      segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    items.push({
      "@type": "ListItem",
      position: index + 2,
      name: label,
      item: `${siteUrl}${currentPath}`,
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

export default function Root({ children }: { children: React.ReactNode }) {
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();
  const siteUrl = siteConfig.url;
  const canonical =
    `${siteUrl}${location.pathname}`.replace(/\/$/, "") || siteUrl;

  const breadcrumbSchema = buildBreadcrumbSchema(siteUrl, location.pathname);

  return (
    <>
      <Head>
        <link rel="canonical" href={canonical} />
        {breadcrumbSchema && (
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbSchema)}
          </script>
        )}
      </Head>
      {children}
    </>
  );
}
