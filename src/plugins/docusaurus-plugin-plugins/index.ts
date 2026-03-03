import type { LoadContext, Plugin } from "@docusaurus/types";
import * as fs from "fs";
import * as path from "path";
import type { PluginListJson } from "./types";

export default async function pluginPlugins(
  context: LoadContext
): Promise<Plugin<PluginListJson>> {
  const { siteDir, siteConfig } = context;
  const jsonPath = path.resolve(siteDir, "static/plugin/list.json");

  return {
    name: "docusaurus-plugin-plugins",

    getPathsToWatch() {
      return [jsonPath];
    },

    async loadContent(): Promise<PluginListJson> {
      const raw = fs.readFileSync(jsonPath, "utf-8");
      return JSON.parse(raw) as PluginListJson;
    },

    async contentLoaded({ content, actions }) {
      const { createData, addRoute } = actions;
      const siteUrl = siteConfig.url;

      // Create data for the listing page
      const listDataPath = await createData(
        "plugin-list.json",
        JSON.stringify({
          plugins: content.plugins,
          categories: content.categories,
          siteUrl,
        })
      );

      // Register /plugins listing route
      addRoute({
        path: "/plugins",
        component: "@site/src/components/PluginListPage/index.tsx",
        exact: true,
        modules: {
          listData: listDataPath,
        },
      });

      // Register individual plugin detail routes
      for (const plugin of content.plugins) {
        const detailDataPath = await createData(
          `plugin-${plugin.id}.json`,
          JSON.stringify({
            plugin,
            allPlugins: content.plugins,
            siteUrl,
          })
        );

        addRoute({
          path: `/plugins/${plugin.id}`,
          component: "@site/src/components/PluginDetailPage/index.tsx",
          exact: true,
          modules: {
            detailData: detailDataPath,
          },
        });
      }
    },
  };
}
