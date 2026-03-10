import React, { type ReactNode } from "react";
import Head from "@docusaurus/Head";
import type { PluginData } from "@site/src/plugins/docusaurus-plugin-plugins/types";

interface Props {
  plugin: PluginData;
  siteUrl: string;
}

export default function PluginDetailSeo({ plugin, siteUrl }: Props): ReactNode {
  const pageUrl = `${siteUrl}/plugins/${plugin.id}`;

  const softwareAppSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: plugin.name,
    description: plugin.description,
    url: pageUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Discord",
    author: {
      "@type": "Organization",
      name: plugin.author,
      ...(plugin.author_url && { url: plugin.author_url }),
    },
    image: plugin.icon_url,
    isPartOf: {
      "@type": "SoftwareApplication",
      name: "RoleLogic",
      url: siteUrl,
    },
    keywords: plugin.tags.join(", "),
    ...(plugin.version && { softwareVersion: plugin.version }),
    ...(plugin.date_published && { datePublished: plugin.date_published }),
    ...(plugin.date_updated && { dateModified: plugin.date_updated }),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Plugins",
        item: `${siteUrl}/plugins`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: plugin.name,
        item: pageUrl,
      },
    ],
  };

  return (
    <Head>
      <link rel="canonical" href={pageUrl} />

      <meta property="og:title" content={`${plugin.name} - Role Link Plugin`} />
      <meta property="og:description" content={plugin.description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={plugin.icon_url} />

      <meta
        name="twitter:title"
        content={`${plugin.name} - Role Link Plugin`}
      />
      <meta name="twitter:description" content={plugin.description} />
      <meta name="twitter:image" content={plugin.icon_url} />
      <meta name="twitter:card" content="summary" />

      <meta
        name="keywords"
        content={`RoleLogic, Discord plugin, ${plugin.tags.join(", ")}, ${plugin.category}`}
      />

      <script type="application/ld+json">
        {JSON.stringify(softwareAppSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Head>
  );
}
