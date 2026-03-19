import React, { type ReactNode } from "react";
import Head from "@docusaurus/Head";
import type { PluginData } from "@site/src/plugins/docusaurus-plugin-plugins/types";

interface Props {
  plugins: PluginData[];
  siteUrl: string;
}

export default function PluginListSeo({ plugins, siteUrl }: Props): ReactNode {
  const pageUrl = `${siteUrl}/plugins`;

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Role Link Plugins",
    description:
      "Browse and install plugins to extend RoleLogic Discord bot functionality. Official and community plugins for role management automation.",
    url: pageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: "RoleLogic Documentation",
      url: siteUrl,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: plugins.length,
      itemListElement: plugins.map((plugin, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: plugin.name,
        description: plugin.description,
        url: `${siteUrl}/plugins/${plugin.id}`,
        image: plugin.icon_url,
      })),
    },
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
        item: pageUrl,
      },
    ],
  };

  return (
    <Head>
      <link rel="canonical" href={pageUrl} />

      <meta
        property="og:title"
        content="Role Link Plugins – Automate Discord Roles with External Services"
      />
      <meta
        property="og:description"
        content="Browse and install plugins to extend RoleLogic Discord bot functionality. Official and community plugins for role management automation."
      />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content={`${siteUrl}/img/social-preview.png`}
      />

      <meta
        name="twitter:title"
        content="Role Link Plugins – Automate Discord Roles with External Services"
      />
      <meta
        name="twitter:description"
        content="Browse and install plugins to extend RoleLogic Discord bot functionality."
      />
      <meta
        name="twitter:image"
        content={`${siteUrl}/img/social-preview.png`}
      />

      <meta
        name="keywords"
        content="Role link plugins, Discord bot plugins, role management plugins, Discord automation extensions, RoleLogic extensions"
      />

      <script type="application/ld+json">
        {JSON.stringify(collectionPageSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Head>
  );
}
