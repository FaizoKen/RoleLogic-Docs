import React, { type ReactNode } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import PluginDetailSeo from "@site/src/components/PluginSeo/PluginDetailSeo";
import type { PluginDetailPageData } from "@site/src/plugins/docusaurus-plugin-plugins/types";
import styles from "./styles.module.css";

interface Props {
  detailData: PluginDetailPageData;
}

function getYouTubeEmbedUrl(url?: string): string | null {
  if (!url) {
    return null;
  }

  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace(/^www\./, "");
    let videoId = "";

    if (hostname === "youtu.be") {
      videoId = parsed.pathname.slice(1);
    } else if (
      hostname === "youtube.com" ||
      hostname === "youtube-nocookie.com"
    ) {
      if (parsed.pathname.startsWith("/embed/")) {
        videoId = parsed.pathname.split("/embed/")[1] || "";
      } else if (parsed.pathname === "/watch") {
        videoId = parsed.searchParams.get("v") || "";
      }
    }

    return videoId
      ? `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?rel=0`
      : null;
  } catch {
    return null;
  }
}

export default function PluginDetailPage({ detailData }: Props): ReactNode {
  const { plugin, siteUrl } = detailData;
  const { siteConfig } = useDocusaurusContext();
  const appUrl = siteConfig.customFields?.appUrl as string;
  const dashboardPluginUrl = `${appUrl}/dashboard?plugin_select=${encodeURIComponent(plugin.plugin_url)}`;

  return (
    <Layout title={`${plugin.name} - Plugin`} description={plugin.description}>
      <PluginDetailSeo plugin={plugin} siteUrl={siteUrl} />
      <main className={styles.pluginDetailPage}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumbs">
            <Link to="/">Home</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <Link to="/plugins">Plugins</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span>{plugin.name}</span>
          </nav>

          <div className={styles.pluginHeader}>
            <img
              src={plugin.icon_url}
              alt={`${plugin.name} icon`}
              className={styles.pluginIcon}
              width={80}
              height={80}
            />
            <div className={styles.headerInfo}>
              <h1 className={styles.pluginName}>{plugin.name}</h1>
              <div className={styles.meta}>
                <span className={styles.author}>by {plugin.author}</span>
                <span className={styles.category}>{plugin.category}</span>
                {plugin.version && (
                  <span className={styles.version}>v{plugin.version}</span>
                )}
                {plugin.featured && (
                  <span className={styles.featuredBadge}>Featured</span>
                )}
              </div>
            </div>
            <a
              href={dashboardPluginUrl}
              className={styles.ctaButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              Use Plugin
            </a>
          </div>

          {(() => {
            const videoUrl = getYouTubeEmbedUrl(plugin.youtube_url);
            return videoUrl ? (
              <section className={styles.videoSection}>
                <h2>Video</h2>
                <div className={styles.videoWrapper}>
                  <iframe
                    src={videoUrl}
                    title={`${plugin.name} video`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </section>
            ) : null;
          })()}

          <section className={styles.descriptionSection}>
            <h2>About</h2>
            <p className={styles.description}>{plugin.description}</p>
          </section>

          <section className={styles.tagsSection}>
            <h2>Tags</h2>
            <div className={styles.tags}>
              {plugin.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <div className={styles.actions}>
            <Link to="/plugins" className={styles.backLink}>
              Back to Plugins
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
