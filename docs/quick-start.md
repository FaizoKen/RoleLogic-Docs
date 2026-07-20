---
sidebar_position: 2
title: Set Up a Discord Auto Role Bot in 5 Minutes
description: Add RoleLogic to Discord, fix the bot role hierarchy, create an automatic IF-THEN role rule, and test the result in about five minutes.
image: /img/social-preview-og.png
---

import ProductCta from '@site/src/components/Seo/ProductCta';
import StructuredData from '@site/src/components/Seo/StructuredData';

# Quick Start Guide

Get RoleLogic running on your server in about 5 minutes.

<StructuredData data={{
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to set up the RoleLogic Discord auto role bot',
  description: 'Invite RoleLogic, position its bot role, create an IF-THEN role rule, and verify it in the testing sandbox.',
  totalTime: 'PT5M',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Invite RoleLogic',
      text: 'Add RoleLogic to your Discord server and authorize its Manage Roles permission.',
      url: 'https://rolelogic.faizo.net/docs/quick-start#step-1-invite-rolelogic',
    },
    {
      '@type': 'HowToStep',
      name: 'Open the RoleLogic dashboard',
      text: 'Sign in with Discord and select the server you want to manage.',
      url: 'https://rolelogic.faizo.net/docs/quick-start#step-2-open-the-dashboard',
    },
    {
      '@type': 'HowToStep',
      name: 'Position the bot role',
      text: 'Move the RoleLogic role above every Discord role it should add or remove.',
      url: 'https://rolelogic.faizo.net/docs/quick-start#step-3-position-the-bots-role',
    },
    {
      '@type': 'HowToStep',
      name: 'Create an automatic role rule',
      text: 'Choose a rule condition and the role action that should run when it matches.',
      url: 'https://rolelogic.faizo.net/docs/quick-start#step-4-create-your-first-rule',
    },
    {
      '@type': 'HowToStep',
      name: 'Test the rule',
      text: 'Simulate a member role combination in the testing sandbox and confirm the expected result.',
      url: 'https://rolelogic.faizo.net/docs/quick-start#step-5-test-your-rule',
    },
  ],
}} />

## Before You Start

You'll need:

- **Administrator permission** on your Discord server (or "Manage Roles" at minimum)
- A web browser

## Step 1: Invite RoleLogic

1. Visit the RoleLogic website
2. Click **"Get Started Free"** or **["Add to Discord"](https://api-rolelogic.faizo.net/api/discord/bot/invite)**
3. Select your server from the dropdown
4. Click **"Authorize"**

Core role automation needs the **"Manage Roles"** Discord permission. Optional webhook logs also need **"Manage Webhooks"** in the selected channel. RoleLogic cannot read messages or DMs; it processes the account, server, role, configuration, and connected-integration data needed to run the service, as described in the [Privacy Policy](https://rolelogic.faizo.net/privacy).

## Step 2: Open the Dashboard

1. Go to the [RoleLogic dashboard](https://rolelogic.faizo.net/dashboard)
2. Click **"Login with Discord"**
3. Find your server and click **"Manage Server"**

**Don't see your server?** Make sure you have Administrator permission and RoleLogic is invited.

## Step 3: Position the Bot's Role

This is important! Discord only lets bots manage roles **below** their own position.

1. In Discord, go to **Server Settings → Roles**
2. Find the **"RoleLogic"** role
3. Drag it **above** all roles you want RoleLogic to manage
4. Save

**Example position:**

```
Admin
Moderator
RoleLogic ← Put it here
VIP
Member
Unverified
```

## Step 4: Create Your First Rule

Let's create a simple rule: remove "Unverified" when someone gets "Member".

### Open the Rule Editor

In the dashboard, click **"Add New Rule"**.

### Set the Condition (IF)

1. Select **"Has Some Roles"** from the dropdown
2. Choose the **"Member"** role

This means: _"If a user has the Member role..."_

### Set the Action (THEN)

1. Select **"Remove Roles"** from the dropdown
2. Choose the **"Unverified"** role

This means: _"...then remove the Unverified role"_

### Save

Click **"Save Changes"**. Your rule activates within 1 hour.

**Want it immediately?** Click the **Play button** to activate right away.

## Step 5: Test Your Rule

Before relying on it, test in the sandbox:

1. Click the **"Test"** tab
2. Select roles to simulate (e.g., Member + Unverified)
3. Click **"Run Test"**
4. See what would happen

This verifies your rule works without affecting real members.

## Done!

Your rule is now active. RoleLogic will:

- **Scan continuously** — checking all members 24/7
- **React within seconds** — role changes are evaluated in about 5 seconds on Free or 1.5 seconds on Premium

Use webhook logs to monitor member role changes. The **Activity Log** records edits to rules and other configuration.

<ProductCta title="Create your first rule now" />

---

## Next Steps

### Learn More

- **[Understanding Rules](./concepts/rules)** — How rules work in detail
- **[Condition Types](./concepts/conditions)** — All 9 ways to match members

### Get Ideas

- **[Common Scenarios](./guides/common-scenarios)** — 50+ ready-to-use configurations

### Advanced Features

- **[Cross-Server Rules](./features/cross-guild)** — Manage roles across servers
- **[Webhooks](./features/webhooks-logging)** — Get notifications for changes

### Need Help?

- **[FAQ](./faq)** — Common questions and troubleshooting
- **[Troubleshooting Guide](./guides/troubleshoot-discord-role-bot)** — Diagnose a rule that does not run
- **[Support](./support)** — Get help from the community
