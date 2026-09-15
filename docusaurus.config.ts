import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables based on NODE_ENV
// - Development (npm start): loads .env
// - Production (npm run build): loads .env.production
const envFile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
dotenv.config({ path: path.resolve(__dirname, envFile) });

// Environment variables with defaults
const APP_URL = process.env.APP_URL || "https://rolelogic.faizo.net";
const DASHBOARD_URL = `${APP_URL.replace(/\/+$/, "")}/dashboard`;
const BOT_INVITE_URL =
  process.env.BOT_INVITE_URL || "https://api-rolelogic.faizo.net/api/discord/bot/invite";
const DISCORD_INVITE =
  process.env.DISCORD_INVITE || "https://discord.gg/2wB7rHRDg2";
const SITE_URL = process.env.SITE_URL || "https://rolelogic.faizo.net";
const BASE_URL = process.env.BASE_URL || "/";
const DOCS_URL = new URL(BASE_URL, `${SITE_URL}/`).toString();
const GA_TRACKING_ID = "G-GE22P50VGH";

const config: Config = {
  title: "RoleLogic",
  tagline:
    "Free Discord Bot for Automatic Role Management - No Coding Required",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  // Site URL configuration (can be overridden via environment variables)
  url: SITE_URL,
  baseUrl: BASE_URL,

  organizationName: "rolelogic",
  projectName: "docs",
  trailingSlash: false,

  onBrokenLinks: "throw",

  customFields: {
    appUrl: APP_URL,
    botInviteUrl: BOT_INVITE_URL,
  },

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  // Keep site-wide markup limited to facts that apply on every documentation
  // route. Page-specific FAQ and HowTo markup lives with the relevant page.
  headTags: [
    // Google Analytics in basic consent mode: this stub only queues calls on
    // window.dataLayer. There is deliberately no gtag.js <script> tag here;
    // /consent.js loads gtag.js once the visitor accepts analytics, so nothing
    // reaches Google before that. Page views come from
    // src/clientModules/analytics.ts.
    {
      tagName: "script",
      attributes: {},
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
        window.gtag("consent", "default", {
          ad_storage: "denied",
          analytics_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
          functionality_storage: "denied",
          personalization_storage: "denied",
          security_storage: "granted"
        });
        window.gtag("set", "ads_data_redaction", true);
        window.gtag("js", new Date());
        window.gtag("config", "${GA_TRACKING_ID}", {
          send_page_view: false,
          anonymize_ip: true,
          allow_google_signals: false,
          allow_ad_personalization_signals: false,
          cookie_domain: "none"
        });
      `,
    },
    {
      tagName: "script",
      attributes: {
        // Root path on purpose, not BASE_URL: the main site serves one
        // consent.js at /consent.js, so the SPA, the static pages and the
        // docs share a single stored choice and banner.
        src: "/consent.js",
        "data-ga-id": GA_TRACKING_ID,
        // Site-config headTags only accept string values.
        defer: "defer",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "alternate",
        type: "text/plain",
        href: `${BASE_URL}llms.txt`,
        title: "RoleLogic documentation in plain text",
      },
    },
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "RoleLogic",
        url: `${SITE_URL}/`,
        logo: `${DOCS_URL}img/logo.svg`,
      }),
    },
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${DOCS_URL}#website`,
        name: "RoleLogic Documentation",
        url: DOCS_URL,
        inLanguage: "en",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      }),
    },
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/", // Serve docs at root
          showLastUpdateTime: true,
          // SEO: Better breadcrumbs
          breadcrumbs: true,
        },
        blog: false, // Disable blog
        theme: {
          customCss: "./src/css/custom.css",
        },
        // SEO: Enhanced sitemap configuration
        sitemap: {
          lastmod: "date",
          changefreq: "monthly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
          createSitemapItems: async (params) => {
            const { defaultCreateSitemapItems, ...rest } = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.map((item) => {
              // High priority pages (main landing, getting started)
              if (item.url.endsWith("/") || item.url.includes("/quick-start")) {
                return { ...item, priority: 1.0, changefreq: "weekly" };
              }
              // Medium-high priority (guides, common scenarios, FAQ)
              if (
                item.url.includes("/guides/") ||
                item.url.includes("/faq") ||
                item.url.includes("/plans")
              ) {
                return { ...item, priority: 0.8, changefreq: "weekly" };
              }
              // Medium priority (concepts, features)
              if (
                item.url.includes("/concepts/") ||
                item.url.includes("/features/")
              ) {
                return { ...item, priority: 0.7, changefreq: "weekly" };
              }
              // Reference docs
              if (item.url.includes("/reference/")) {
                return { ...item, priority: 0.6, changefreq: "monthly" };
              }
              if (item.url.includes("/release-notes/")) {
                return { ...item, priority: 0.3, changefreq: "yearly" };
              }
              // Lower priority (glossary, support)
              return { ...item, priority: 0.5, changefreq: "monthly" };
            });
          },
        },
        // Analytics is wired through headTags + /consent.js. Do not enable the
        // preset's gtag option: it loads gtag.js before the visitor consents.
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    function privacyAnalyticsPlugin() {
      return {
        name: "rolelogic-privacy-analytics",
        getClientModules() {
          return [path.resolve(__dirname, "src/clientModules/analytics.ts")];
        },
      };
    },
  ],

  themeConfig: {
    image: "img/social-preview-og.png",
    colorMode: {
      defaultMode: "dark",
      respectPrefersColorScheme: true,
    },
    // SEO: Comprehensive metadata
    metadata: [
      // Author and publisher
      { name: "author", content: "RoleLogic" },
      { name: "publisher", content: "RoleLogic" },
      // Robots directives
      {
        name: "robots",
        content:
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { property: "og:site_name", content: "RoleLogic" },
      { property: "og:locale", content: "en_US" },
      // Twitter Card enhanced
      { name: "twitter:card", content: "summary_large_image" },
      // Additional SEO tags
      { name: "application-name", content: "RoleLogic" },
      { name: "apple-mobile-web-app-title", content: "RoleLogic Docs" },
      { name: "theme-color", content: "#5865F2" },
    ],
    navbar: {
      title: "RoleLogic",
      logo: {
        alt: "RoleLogic Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "Documentation",
        },
        {
          to: "/release-notes",
          label: "Release Notes",
          position: "right",
        },
        {
          href: DASHBOARD_URL,
          label: "Dashboard",
          position: "right",
        },
        {
          href: BOT_INVITE_URL,
          label: "Add RoleLogic",
          position: "right",
          className: "navbar__cta",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentation",
          items: [
            {
              label: "Getting Started",
              to: "/quick-start",
            },
            {
              label: "Common Scenarios",
              to: "/guides/common-scenarios",
            },
            {
              label: "Troubleshooting",
              to: "/guides/troubleshoot-discord-role-bot",
            },
            {
              label: "FAQ",
              to: "/faq",
            },
            {
              label: "Release Notes",
              to: "/release-notes",
            },
          ],
        },
        {
          // Main-site answer pages. Labels are the navLabel values in the
          // main repo's web/scripts/answer-page-registry.ts; keep them in sync.
          title: "Use cases",
          items: [
            {
              label: "Discord role bot",
              href: `${APP_URL}/discord-role-bot`,
            },
            {
              label: "Role Conditions",
              href: `${APP_URL}/discord-conditional-roles`,
            },
            {
              label: "Cross-Server Sync",
              href: `${APP_URL}/discord-cross-server-role-sync`,
            },
            {
              label: "Roles not working?",
              href: `${APP_URL}/discord-bot-not-assigning-roles`,
            },
            {
              label: "Integrations",
              href: `${APP_URL}/integrations/`,
            },
          ],
        },
        {
          title: "Product",
          items: [
            {
              label: "Dashboard",
              href: DASHBOARD_URL,
            },
            {
              label: "Add to Discord",
              href: BOT_INVITE_URL,
            },
            {
              label: "Pricing",
              to: "/plans",
            },
            {
              label: "Premium Plans",
              href: `${APP_URL}/upgrade`,
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Support Server",
              href: DISCORD_INVITE,
            },
            {
              label: "Support",
              to: "/support",
            },
          ],
        },
        {
          title: "Legal",
          items: [
            {
              label: "Privacy Policy",
              href: `${APP_URL}/privacy`,
            },
            {
              label: "Terms of Service",
              href: `${APP_URL}/terms`,
            },
            {
              // Raw HTML so the href stays exactly "#cookie-settings", which
              // /consent.js intercepts to reopen its banner. A link item would
              // be flagged by the broken-anchor check on every page.
              html: '<a class="footer__link-item" href="#cookie-settings">Cookie settings</a>',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} RoleLogic. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
