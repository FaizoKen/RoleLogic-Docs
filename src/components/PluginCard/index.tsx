import React, { type ReactNode } from "react";
import Link from "@docusaurus/Link";
import type { PluginData } from "@site/src/plugins/docusaurus-plugin-plugins/types";
import styles from "./styles.module.css";

interface Props {
  plugin: PluginData;
}

export default function PluginCard({ plugin }: Props): ReactNode {
  return (
    <Link to={`/plugins/${plugin.id}`} className={styles.pluginCard}>
      <div className={styles.cardHeader}>
        <img
          src={plugin.icon_url}
          alt={`${plugin.name} icon`}
          className={styles.icon}
          loading="lazy"
          width={48}
          height={48}
        />
        <div className={styles.headerText}>
          <h3 className={styles.name}>{plugin.name}</h3>
          <span className={styles.author}>by {plugin.author}</span>
        </div>
        {plugin.featured && (
          <span className={styles.featuredBadge}>Featured</span>
        )}
      </div>
      <p className={styles.description}>{plugin.short_description}</p>
      <div className={styles.cardFooter}>
        <span className={styles.category}>{plugin.category}</span>
        <div className={styles.tags}>
          {plugin.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
