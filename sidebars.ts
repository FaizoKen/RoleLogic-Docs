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
      items: [
        "concepts/rules",
        "concepts/conditions",
        "concepts/actions",
        "concepts/role-hierarchy",
      ],
    },

    // FEATURES - Using RoleLogic
    {
      type: "category",
      label: "Features",
      collapsed: false,
      items: [
        "features/rule-builder",
        "features/testing-sandbox",
        "features/webhooks-logging",
        "features/cross-guild",
        "features/activity-log",
      ],
    },

    // GUIDES - Practical examples
    {
      type: "category",
      label: "Guides",
      collapsed: true,
      items: ["guides/common-scenarios", "guides/best-practices"],
    },

    // REFERENCE - Technical details
    {
      type: "category",
      label: "Reference",
      collapsed: true,
      items: [
        "reference/conditions-reference",
        "reference/placeholders-reference",
        "reference/limits-reference",
        "reference/role-link-api",
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
