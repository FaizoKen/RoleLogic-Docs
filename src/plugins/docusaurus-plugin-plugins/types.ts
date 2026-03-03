export interface PluginData {
  id: string;
  name: string;
  description: string;
  author: string;
  icon_url: string;
  plugin_url: string;
  category: string;
  tags: string[];
  featured: boolean;
}

export interface PluginListJson {
  version: number;
  categories: string[];
  plugins: PluginData[];
}

export interface PluginListPageData {
  plugins: PluginData[];
  categories: string[];
  siteUrl: string;
}

export interface PluginDetailPageData {
  plugin: PluginData;
  allPlugins: PluginData[];
  siteUrl: string;
}
