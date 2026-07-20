import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docsSidebar: [
    // GETTING STARTED - Beginner-friendly entry point
    {
      type: "doc",
      id: "intro",
      label: "What is RoleLogic?",
    },
    {
      type: "doc",
      id: "quick-start",
      label: "Quick Start",
    },

    // CORE CONCEPTS - Foundation knowledge
    {
      type: "category",
      label: "Core Concepts",
      collapsed: false,
      link: {
        type: "generated-index",
        slug: "/concepts",
        title: "Discord Role Automation Concepts",
        description:
          "Understand RoleLogic rules, conditions, actions, and Discord role hierarchy before building an automation.",
      },
      items: [
        { type: "doc", id: "concepts/rules", label: "Rules" },
        { type: "doc", id: "concepts/conditions", label: "Conditions" },
        { type: "doc", id: "concepts/actions", label: "Actions" },
        {
          type: "doc",
          id: "concepts/role-hierarchy",
          label: "Role Hierarchy",
        },
      ],
    },

    // FEATURES - Using RoleLogic
    {
      type: "category",
      label: "Features",
      collapsed: false,
      link: {
        type: "generated-index",
        slug: "/features",
        title: "RoleLogic Features",
        description:
          "Explore the no-code rule builder, sandbox, notifications, cross-server roles, and activity history.",
      },
      items: [
        { type: "doc", id: "features/rule-builder", label: "Rule Builder" },
        {
          type: "doc",
          id: "features/testing-sandbox",
          label: "Testing Sandbox",
        },
        {
          type: "doc",
          id: "features/webhooks-logging",
          label: "Webhook Notifications",
        },
        {
          type: "doc",
          id: "features/cross-guild",
          label: "Cross-Server Roles",
        },
        { type: "doc", id: "features/activity-log", label: "Activity Log" },
      ],
    },

    // GUIDES - Practical examples
    {
      type: "category",
      label: "Solutions & Guides",
      collapsed: false,
      link: {
        type: "generated-index",
        slug: "/guides",
        title: "Discord Role Automation Guides",
        description:
          "Follow practical guides for verification roles, booster rewards, troubleshooting, and reliable Discord role automation.",
      },
      items: [
        {
          type: "doc",
          id: "guides/discord-verification-role-automation",
          label: "Verification Roles",
        },
        {
          type: "doc",
          id: "guides/discord-booster-role-rewards",
          label: "Booster Role Rewards",
        },
        {
          type: "doc",
          id: "guides/troubleshoot-discord-role-bot",
          label: "Troubleshoot Role Automation",
        },
        {
          type: "doc",
          id: "guides/common-scenarios",
          label: "Rule Templates (50+)",
        },
        {
          type: "doc",
          id: "guides/best-practices",
          label: "Best Practices",
        },
      ],
    },

    // REFERENCE - Technical details
    {
      type: "category",
      label: "Reference",
      collapsed: true,
      link: {
        type: "generated-index",
        slug: "/reference",
        title: "RoleLogic Technical Reference",
        description:
          "Look up condition behavior, webhook variables, current limits, quotas, and the Role Link API.",
      },
      items: [
        {
          type: "doc",
          id: "reference/conditions-reference",
          label: "Conditions",
        },
        {
          type: "doc",
          id: "reference/placeholders-reference",
          label: "Webhook Placeholders",
        },
        {
          type: "doc",
          id: "reference/limits-reference",
          label: "Limits & Quotas",
        },
        {
          type: "doc",
          id: "reference/role-link-api",
          label: "Role Link API",
        },
      ],
    },

    // PLANS & SUPPORT
    {
      type: "doc",
      id: "plans",
      label: "Plans & Pricing",
    },
    {
      type: "doc",
      id: "faq",
      label: "FAQ",
    },
    {
      type: "doc",
      id: "glossary",
      label: "Glossary",
    },
    {
      type: "doc",
      id: "support",
      label: "Support",
    },

    // RELEASE NOTES
    {
      type: "category",
      label: "Release Notes",
      collapsed: true,
      link: {
        type: "generated-index",
        title: "Release Notes",
        description: "See what's new in each version of RoleLogic.",
        slug: "/release-notes",
      },
      items: [
        "release-notes/v1.16.0",
        "release-notes/v1.15.0",
        "release-notes/v1.14.2",
        "release-notes/v1.14.1",
        "release-notes/v1.14.0",
        "release-notes/v1.13.0",
        "release-notes/v1.12.0",
        "release-notes/v1.11.0",
        "release-notes/v1.10.2",
        "release-notes/v1.10.1",
        "release-notes/v1.10.0",
        "release-notes/v1.9.0",
        "release-notes/v1.8.0",
        "release-notes/v1.7.0",
        "release-notes/v1.6.2",
        "release-notes/v1.6.1",
        "release-notes/v1.6.0",
        "release-notes/v1.5.2",
        "release-notes/v1.5.1",
        "release-notes/v1.5.0",
        "release-notes/v1.4.0",
        "release-notes/v1.3.3",
        "release-notes/v1.3.2",
        "release-notes/v1.3.1",
        "release-notes/v1.3.0",
        "release-notes/v1.2.2",
        "release-notes/v1.2.1",
        "release-notes/v1.2.0",
        "release-notes/v1.1.2",
        "release-notes/v1.1.1",
        "release-notes/v1.1.0",
        "release-notes/v1.0.2",
        "release-notes/v1.0.1",
        "release-notes/v1.0.0",
      ],
    },
  ],
};

export default sidebars;
