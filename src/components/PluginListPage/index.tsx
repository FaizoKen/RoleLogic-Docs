import React, { useState, useMemo, type ReactNode } from "react";
import Layout from "@theme/Layout";
import PluginCard from "@site/src/components/PluginCard";
import PluginListSeo from "@site/src/components/PluginSeo/PluginListSeo";
import type { PluginListPageData } from "@site/src/plugins/docusaurus-plugin-plugins/types";
import styles from "./styles.module.css";

interface Props {
  listData: PluginListPageData;
}

export default function PluginListPage({ listData }: Props): ReactNode {
  const { plugins, categories, siteUrl } = listData;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredPlugins = useMemo(() => {
    return plugins.filter((p) => {
      const matchesCategory =
        selectedCategory === "all" || p.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [plugins, searchQuery, selectedCategory]);

  const featuredPlugins = filteredPlugins.filter((p) => p.featured);
  const regularPlugins = filteredPlugins.filter((p) => !p.featured);
  const sortedPlugins = [...featuredPlugins, ...regularPlugins];

  return (
    <Layout
      title="Plugins"
      description="Browse and install plugins to extend RoleLogic Discord bot functionality. Official and community plugins for role management automation."
    >
      <PluginListSeo plugins={plugins} siteUrl={siteUrl} />
      <main className={styles.pluginListPage}>
        <div className="container">
          <header className={styles.header}>
            <h1>RoleLogic Plugins</h1>
            <p>
              Extend RoleLogic with plugins to add new integrations and
              capabilities to your Discord server.
            </p>
          </header>

          <div className={styles.controls}>
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Search plugins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search plugins"
            />
            <div className={styles.categoryFilters}>
              <button
                className={`${styles.categoryBtn} ${selectedCategory === "all" ? styles.categoryBtnActive : ""}`}
                onClick={() => setSelectedCategory("all")}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.categoryBtnActive : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {sortedPlugins.length > 0 ? (
            <div className={styles.pluginGrid}>
              {sortedPlugins.map((plugin) => (
                <PluginCard key={plugin.id} plugin={plugin} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>No plugins found matching your search.</p>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
