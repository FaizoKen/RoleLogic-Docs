---
sidebar_position: 2
title: Quick Start - Set Up RoleLogic in 5 Minutes
description: Add RoleLogic to your Discord server and create your first automatic role rule in 5 minutes. Step-by-step tutorial with screenshots for beginners.
keywords:
  - RoleLogic setup guide
  - how to add RoleLogic to Discord
  - Discord bot setup tutorial
  - RoleLogic tutorial
  - create Discord role rule
  - Discord role automation setup
  - add bot to Discord server
  - RoleLogic getting started
  - Discord bot installation
  - first rule Discord bot
image: /img/social-preview.png
---

# Quick Start Guide

Get RoleLogic running on your server in about 5 minutes.

## Before You Start

You'll need:

- **Administrator permission** on your Discord server (or "Manage Roles" at minimum)
- A web browser

## Step 1: Invite RoleLogic

1. Visit the RoleLogic website
2. Click **"Get Started Free"** or **["Add to Discord"](https://api-rolelogic.faizo.net/api/discord/bot/invite)**
3. Select your server from the dropdown
4. Click **"Authorize"**

RoleLogic only needs the **"Manage Roles"** permission. It cannot read messages or access any private information.

## Step 2: Open the Dashboard

1. Go to the RoleLogic Dashboard
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
- **React instantly** — when roles change, rules apply immediately

Monitor changes in the **Activity Log** section.

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
- **[Support](./support)** — Get help from the community
