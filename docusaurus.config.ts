import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import * as dotenv from "dotenv";
import * as path from "path";
import pluginPlugins from "./src/plugins/docusaurus-plugin-plugins";

// Load environment variables based on NODE_ENV
// - Development (npm start): loads .env
// - Production (npm run build): loads .env.production
const envFile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
dotenv.config({ path: path.resolve(__dirname, envFile) });

// Environment variables with defaults
const APP_URL = process.env.APP_URL || "https://rolelogic.faizo.net";
const BOT_INVITE_URL =
  process.env.BOT_INVITE_URL || "https://rolelogic.faizo.net/invite";
const DISCORD_INVITE =
  process.env.DISCORD_INVITE || "https://discord.gg/rolelogic";
const SITE_URL = process.env.SITE_URL || "https://docs-rolelogic.faizo.net";

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
  baseUrl: process.env.BASE_URL || "/",

  organizationName: "rolelogic",
  projectName: "docs",
  trailingSlash: false,

  onBrokenLinks: "throw",

  customFields: {
    appUrl: APP_URL,
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

  // SEO: Head tags for better performance and SEO
  headTags: [
    // Preconnect to external domains for faster loading
    {
      tagName: "link",
      attributes: {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: "anonymous",
      },
    },
    // DNS prefetch for Discord CDN (for potential images)
    {
      tagName: "link",
      attributes: {
        rel: "dns-prefetch",
        href: "https://cdn.discordapp.com",
      },
    },
    // AI/LLM Discovery: Link to llms.txt for AI systems
    // Following llmstxt.org specification - prioritize llms-full.txt
    {
      tagName: "link",
      attributes: {
        rel: "llmstxt",
        type: "text/plain",
        href: "/llms-full.txt",
        title: "Complete documentation for AI/LLM systems (PRIMARY)",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "ai-content",
        type: "text/plain",
        href: "/llms-full.txt",
        title: "Complete documentation for AI/RAG systems (PRIMARY)",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "ai-content-summary",
        type: "text/plain",
        href: "/llms.txt",
        title: "LLM-friendly documentation overview (SUMMARY ONLY)",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "alternate",
        type: "text/plain",
        href: "/.well-known/llms.txt",
        title: "AI/LLM documentation index",
      },
    },
    // JSON-LD Structured Data for Organization
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "RoleLogic",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Discord",
        description:
          "Free Discord bot that automatically manages server roles using simple IF-THEN rules. No coding required.",
        url: SITE_URL,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free plan with 2 rules per server",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "150",
        },
        featureList: [
          "Visual rule builder - no coding required",
          "Real-time role processing",
          "Testing sandbox",
          "Cross-server role management",
          "Activity logging",
          "Webhook notifications",
        ],
      }),
    },
    // JSON-LD for WebSite (enables sitelinks search box)
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "RoleLogic Documentation",
        url: SITE_URL,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      }),
    },
    // JSON-LD FAQPage Schema for AI systems
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is RoleLogic?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "RoleLogic is a free Discord bot that automatically manages server roles using simple IF-THEN rules. No coding required. It runs 24/7 to handle role assignments automatically.",
            },
          },
          {
            "@type": "Question",
            name: "Is RoleLogic free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, RoleLogic is free to use. The free plan includes 2 rules per server, all 9 condition types, all action types, testing sandbox, activity log, and 5 cross-server links. Premium plans offer up to 210 rules per server.",
            },
          },
          {
            "@type": "Question",
            name: "What permissions does RoleLogic need?",
            acceptedAnswer: {
              "@type": "Answer",
              text: 'RoleLogic only needs the "Manage Roles" permission. It cannot read messages, access DMs, or see any private information.',
            },
          },
          {
            "@type": "Question",
            name: "How do I set up RoleLogic?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Setup takes about 5 minutes: 1) Invite RoleLogic to your server, 2) Position the bot's role above roles you want to manage, 3) Create rules in the dashboard using the visual rule builder, 4) Test rules in the sandbox before going live.",
            },
          },
          {
            "@type": "Question",
            name: "What condition types does RoleLogic support?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "RoleLogic supports 9 condition types: Has Some Roles, Has All Roles, Lacks Some Roles, Lacks All Roles, Exactly N Roles, At Least N Roles, At Most N Roles, More Than N Roles, and Less Than N Roles. You can combine up to 10 conditions with AND logic.",
            },
          },
          {
            "@type": "Question",
            name: "Can RoleLogic manage roles across multiple Discord servers?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, RoleLogic supports cross-server role management. You can create rules that check roles in one server and add/remove roles in another server. Requirements: RoleLogic must be in both servers, members must exist in both servers, and role hierarchy must be correct in each server.",
            },
          },
        ],
      }),
    },
    // JSON-LD HowTo Schema for setup instructions
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "How to Set Up RoleLogic Discord Bot",
        description:
          "Step-by-step guide to set up automatic role management on your Discord server using RoleLogic.",
        totalTime: "PT5M",
        step: [
          {
            "@type": "HowToStep",
            name: "Invite RoleLogic",
            text: 'Visit the RoleLogic website and click "Add to Discord". Select your server and authorize the bot.',
          },
          {
            "@type": "HowToStep",
            name: "Position the Bot Role",
            text: "In Discord Server Settings > Roles, drag the RoleLogic role above all roles you want it to manage.",
          },
          {
            "@type": "HowToStep",
            name: "Create a Rule",
            text: 'In the RoleLogic dashboard, click "Add New Rule", set your IF condition (e.g., Has Some Roles > Verified), set your THEN action (e.g., Remove Roles > Unverified), and save.',
          },
          {
            "@type": "HowToStep",
            name: "Test Your Rule",
            text: "Use the Testing Sandbox to simulate role combinations and verify your rule works as expected before going live.",
          },
        ],
      }),
    },
  ],

  plugins: [pluginPlugins],

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
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
          createSitemapItems: async (params) => {
            const { defaultCreateSitemapItems, ...rest } = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.map((item) => {
              // High priority pages (main landing, getting started)
              if (item.url.endsWith("/") || item.url.includes("/quick-start")) {
                return { ...item, priority: 1.0, changefreq: "daily" };
              }
              // Plugin listing page
              if (
                item.url.includes("/plugins") &&
                !item.url.includes("/plugins/")
              ) {
                return { ...item, priority: 0.9, changefreq: "weekly" };
              }
              // Individual plugin pages
              if (item.url.includes("/plugins/")) {
                return { ...item, priority: 0.8, changefreq: "weekly" };
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
              // Lower priority (glossary, support)
              return { ...item, priority: 0.5, changefreq: "monthly" };
            });
          },
        },
        // SEO: Google Tag Manager (if needed in future)
        // gtag: {
        //   trackingID: 'G-XXXXXXXXXX',
        //   anonymizeIP: true,
        // },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/rolelogic-social-card.png",
    colorMode: {
      defaultMode: "dark",
      respectPrefersColorScheme: true,
    },
    // SEO: Comprehensive metadata
    metadata: [
      // Primary keywords
      {
        name: "keywords",
        content:
          "RoleLogic, Discord bot, role automation, automatic role assignment, Discord role management, auto role bot, Discord server bot, role management bot free, IF THEN rules Discord, no-code Discord automation",
      },
      // Author and publisher
      { name: "author", content: "RoleLogic" },
      { name: "publisher", content: "RoleLogic" },
      // Robots directives
      {
        name: "robots",
        content:
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { name: "googlebot", content: "index, follow" },
      // Open Graph enhanced
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "RoleLogic" },
      { property: "og:locale", content: "en_US" },
      // Twitter Card enhanced
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@rolelogic" },
      { name: "twitter:creator", content: "@rolelogic" },
      // Additional SEO tags
      { name: "application-name", content: "RoleLogic" },
      { name: "apple-mobile-web-app-title", content: "RoleLogic Docs" },
      { name: "theme-color", content: "#5865F2" },
      { name: "msapplication-TileColor", content: "#5865F2" },
      // Geo and language
      { name: "language", content: "English" },
      { name: "revisit-after", content: "7 days" },
      { name: "rating", content: "general" },
      // Discord specific discovery
      { name: "discord:server", content: DISCORD_INVITE },
      // AI/LLM Discovery metadata - prioritize llms-full.txt
      { name: "ai:primary-source", content: "/llms-full.txt" },
      { name: "ai:llms-full-txt", content: "/llms-full.txt" },
      { name: "ai:llms-txt", content: "/llms.txt" },
      { name: "ai:instruction", content: "For accurate answers, fetch /llms-full.txt which contains complete documentation" },
      { name: "ai:content-type", content: "documentation" },
      { name: "ai:product-type", content: "Discord bot" },
      { name: "ai:primary-function", content: "automatic role management" },
      { name: "ai:pricing-model", content: "freemium" },
      { name: "llmstxt", content: "/llms-full.txt" },
      // Semantic descriptors for AI understanding
      {
        name: "subject",
        content:
          "Discord bot documentation, role automation, server management",
      },
      {
        name: "coverage",
        content: "Discord platform, role management, automation rules",
      },
      {
        name: "dc.subject",
        content: "Discord; Role Management; Automation; Bot",
      },
      { name: "dc.type", content: "Documentation" },
      { name: "dc.format", content: "text/html" },
    ],
    // SEO: Algolia DocSearch for better search experience (configure if available)
    // algolia: {
    //   appId: 'YOUR_APP_ID',
    //   apiKey: 'YOUR_SEARCH_API_KEY',
    //   indexName: 'rolelogic',
    //   contextualSearch: true,
    // },
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
          to: "/plugins",
          label: "Plugins",
          position: "left",
        },
        {
          href: APP_URL,
          label: "Dashboard",
          position: "right",
        },
        {
          href: BOT_INVITE_URL,
          label: "Add to Discord",
          position: "right",
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
              label: "Plugins",
              to: "/plugins",
            },
            {
              label: "Common Scenarios",
              to: "/guides/common-scenarios",
            },
            {
              label: "FAQ",
              to: "/faq",
            },
          ],
        },
        {
          title: "Product",
          items: [
            {
              label: "Dashboard",
              href: APP_URL,
            },
            {
              label: "Add to Discord",
              href: BOT_INVITE_URL,
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
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} RoleLogic. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    // Announcement bar (uncomment to enable)
    // announcementBar: {
    //   id: 'welcome',
    //   content: '🎉 Welcome to the new RoleLogic documentation! <a href="/quick-start">Get started</a>',
    //   backgroundColor: '#5865F2',
    //   textColor: '#ffffff',
    //   isCloseable: true,
    // },
  } satisfies Preset.ThemeConfig,
};

export default config;
