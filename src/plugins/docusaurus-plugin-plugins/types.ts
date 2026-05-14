export interface PluginSeoCopy {
  seoTitle: string;
  seoDescription: string;
  h1: string;
  subhead: string;
  platform: string;
  useCases: { title: string; body: string }[];
  howItWorks?: { title: string; body: string }[];
  faqs?: { q: string; a: string }[];
}

export interface PluginData {
  id: string;
  name: string;
  short_description: string;
  description: string;
  author: string;
  author_url?: string;
  icon_url: string;
  plugin_url: string;
  youtube_url?: string;
  category: string;
  tags: string[];
  featured: boolean;
  version?: string;
  date_published?: string;
  date_updated?: string;
  seo?: PluginSeoCopy;
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
