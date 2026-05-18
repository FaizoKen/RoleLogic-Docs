---
sidebar_position: 1
title: 50+ Discord Role Automation Examples & Templates
description: Ready-to-use RoleLogic rule templates. Copy configurations for verification, tier systems, VIP rewards, booster perks, staff management, and more.
keywords:
  - Discord role automation examples
  - RoleLogic rule templates
  - Discord verification bot rules
  - tier system Discord setup
  - VIP role automation examples
  - booster perks Discord
  - Discord staff management
  - gaming server role templates
  - achievement system Discord
  - Discord gamification roles
  - cross-server role examples
  - Discord role bot templates
image: /img/social-preview.png
---

# Common Scenarios & Examples

This guide provides **50+ ready-to-use rule configurations** for popular Discord server setups. Copy these patterns and adapt them to your server's role names.

## Quick Navigation

### Basic Scenarios

| Category                                              | Best For                                              |
| ----------------------------------------------------- | ----------------------------------------------------- |
| [Verification Systems](#verification-systems)         | Servers with verification bots or manual verification |
| [Tier and Level Systems](#tier-and-level-systems)     | Gaming servers, leveling bots (MEE6, etc.)            |
| [VIP and Rewards](#vip-and-rewards)                   | Booster perks, supporter rewards, achievements        |
| [Staff Management](#staff-management)                 | Organizing moderator/admin teams                      |
| [Team and Group Systems](#team-and-group-systems)     | Competitive teams, houses, factions                   |
| [Onboarding Flows](#onboarding-flows)                 | New member experiences                                |
| [Access Control](#access-control)                     | Channel permissions, mute systems                     |
| [Activity and Engagement](#activity-and-engagement)   | Rewarding active members                              |
| [Gaming and Clans](#gaming-and-clans)                 | Gaming servers, clan management                       |
| [Subscription and Premium](#subscription-and-premium) | Patreon, Ko-fi, paid memberships                      |
| [Color and Cosmetic Roles](#color-and-cosmetic-roles) | Vanity colors, nickname colors                        |
| [Free Plan Examples](#free-plan-examples-5-rules)     | Complete setups within the free plan's 5 rules        |

### Advanced Scenarios

| Category                                                              | Best For                             |
| --------------------------------------------------------------------- | ------------------------------------ |
| [Conditional Element Roles](#conditional-element-roles-booster-perks) | Booster perks based on chosen colors |
| [Achievement Badge System](#achievement-badge-system)                 | Gamification and collection rewards  |
| [Role Evolution System](#role-evolution-system)                       | Progressive role upgrades            |
| [Persistent Exclusive Roles](#persistent-exclusive-color-roles)       | Self-assign exclusive options        |
| [Loyalty Milestone Rewards](#loyalty-milestone-rewards)               | Multi-source supporter recognition   |
| [Faction/Team Wars](#factionteam-war-system)                          | Competitive team-based systems       |
| [Reputation System](#reputation-and-standing-system)                  | Trust and standing management        |
| [Creator Spotlight](#creatorstreamer-spotlight-system)                | Content creator tiers                |
| [Mentorship System](#mentorship-and-onboarding-system)                | Helper recognition programs          |
| [Class System](#skill-based-class-system-gaming-servers)              | RPG-style class perks                |
| [Seasonal Events](#seasonal-event-participation)                      | Year-round engagement tracking       |
| [Economy Integration](#economy-integration-shop-purchases)            | Shop purchase rewards                |
| [Comeback Rewards](#comebackreturn-rewards)                           | Returning member recognition         |
| [Cross-Server Actions](#cross-server-actions)                         | Multi-server role sync               |

---

## Verification Systems

### Basic Verification Cleanup

**Goal:** When a member gets verified, remove their unverified/guest roles.

**Rule Configuration:**

- **IF**: Has Some Roles → [Verified]
- **THEN**: Remove Roles → [Unverified, Guest, New Member]

**How it works:** As soon as someone receives the "Verified" role (from you, a verification bot, or another system), RoleLogic removes all the pre-verification roles.

**Works with:** Captcha.bot, Wick, AltDentifier, manual verification, Discord's built-in verification

---

### Pending Verification

**Goal:** Give new members a "Pending" role if they don't have any verification status.

**Rule Configuration:**

- **IF**: Lacks All Roles → [Verified, Pending, Rejected]
- **THEN**: Add Roles → [Pending]

**How it works:** Members without any verification status automatically get "Pending" to indicate they need to complete verification.

:::tip
Remember that all members have @everyone. Test this rule with @everyone selected to ensure it works correctly.
:::

---

### Verification + Channel Access

**Goal:** Verified members should get access to member channels.

**Rule Configuration:**

- **IF**: Has Some Roles → [Verified]
- **THEN**: Add Roles → [Member Channels Access]

**How it works:** Verification unlocks channel access automatically.

---

### Complete 2-Step Verification

**Goal:** Require both email verification AND rules acceptance.

**Rule Configuration:**

- **IF**: Has All Roles → [Email Verified, Rules Accepted]
- **THEN**: Add Roles → [Verified, Member Access]

**How it works:** Members must complete BOTH steps before getting full access.

---

## Tier and Level Systems

### Auto-Remove Lower Tiers

**Goal:** When someone reaches a higher tier, remove their lower tier roles.

**Rule 1 (Priority 0):**

- **IF**: Has Some Roles → [Gold Tier]
- **THEN**: Remove Roles → [Bronze Tier, Silver Tier]

**Rule 2 (Priority 1):**

- **IF**: Has Some Roles → [Silver Tier]
- **THEN**: Remove Roles → [Bronze Tier]

**How it works:** Each tier removes all lower tiers, maintaining clean role assignments.

---

### Tier Benefits (Cascade Down)

**Goal:** Higher tiers should automatically receive lower tier benefits.

**Rule 1:**

- **IF**: Has Some Roles → [Platinum Tier]
- **THEN**: Add Roles → [Gold Benefits, Silver Benefits, Bronze Benefits]

**Rule 2:**

- **IF**: Has Some Roles → [Gold Tier]
- **THEN**: Add Roles → [Silver Benefits, Bronze Benefits]

**Rule 3:**

- **IF**: Has Some Roles → [Silver Tier]
- **THEN**: Add Roles → [Bronze Benefits]

**How it works:** Benefits cascade down—platinum members get all benefits.

---

### No-Tier Indicator

**Goal:** Give a "No Tier" role to members without any tier.

**Rule 1:**

- **IF**: Lacks All Roles → [Bronze Tier, Silver Tier, Gold Tier, Platinum Tier]
- **THEN**: Add Roles → [No Tier]

**Rule 2:**

- **IF**: Has Some Roles → [Bronze Tier, Silver Tier, Gold Tier, Platinum Tier]
- **THEN**: Remove Roles → [No Tier]

**How it works:** Members without any tier get tagged. Getting any tier removes the tag.

---

### MEE6/Leveling Bot Integration

**Goal:** Clean up when leveling bot assigns new level roles.

**Rule Configuration:**

- **IF**: Has Some Roles → [Level 20]
- **THEN**: Remove Roles → [Level 5, Level 10, Level 15]

**How it works:** When a leveling bot like MEE6 assigns Level 20, RoleLogic removes the old level roles automatically.

---

## VIP and Rewards

### Server Booster VIP

**Goal:** Server boosters automatically get VIP status.

**Rule Configuration:**

- **IF**: Has Some Roles → [Server Booster]
- **THEN**: Add Roles → [VIP, Booster Perks, Exclusive Access]

**How it works:** Discord's built-in booster role triggers your custom VIP roles.

---

### Multi-Qualification VIP

**Goal:** VIP requires both supporter AND active member status.

**Rule Configuration:**

- **IF**: Has All Roles → [Supporter, Active Member]
- **THEN**: Add Roles → [VIP]

**How it works:** Both conditions must be met—being a supporter alone isn't enough.

---

### Loyalty Badge (Collectors)

**Goal:** Give a special badge to members with multiple achievements.

**Rule Configuration:**

- **IF**: At Least 3 Roles → [Achievement 1, Achievement 2, Achievement 3, Achievement 4, Achievement 5]
- **THEN**: Add Roles → [Collector Badge]

**How it works:** Members who collect at least 3 achievements get recognized.

---

### Event Winner Rewards

**Goal:** Event winners get special perks across categories.

**Rule Configuration:**

- **IF**: Has Some Roles → [1st Place, 2nd Place, 3rd Place]
- **THEN**: Add Roles → [Event Winner, Winner Lounge Access]

**How it works:** Any podium finish unlocks winner benefits.

---

### Remove VIP When Booster Lapses

**Goal:** Automatically remove VIP perks when someone stops boosting.

**Rule Configuration:**

- **IF**: Lacks All Roles → [Server Booster, Patreon Supporter, Premium]
- **THEN**: Remove Roles → [VIP, Exclusive Access, Booster Perks]

**How it works:** When all VIP-granting roles are gone, VIP perks are removed.

---

## Staff Management

### Staff Promotion Cleanup

**Goal:** When promoted to full staff, remove trainee roles.

**Rule Configuration:**

- **IF**: Has Some Roles → [Moderator]
- **THEN**: Remove Roles → [Trial Moderator, Helper, Trainee]

**How it works:** Promotion to full moderator cleans up all training roles.

---

### Combined Conditions AND Actions (Advanced)

**Goal:** When a verified member reaches Level 10 AND is not muted, upgrade them to Trusted Member AND remove their Newcomer role.

**Rule Configuration:**

- **IF**: Has All Roles → [Verified, Level 10] **AND** Lacks All Roles → [Muted, Banned]
- **THEN**: Add Roles → [Trusted Member, Community Access] **AND** Remove Roles → [Newcomer, Limited Access]

**How it works:** This rule combines multiple conditions (must have Verified AND Level 10, must NOT have Muted or Banned) with multiple actions (add rewards AND remove starter roles)—all in a single rule. This is more efficient than creating separate rules and ensures all changes happen together.

:::tip Using Combined AND Logic
You can add up to 9 AND conditions and combine Add + Remove actions in one rule. This is perfect for:

- Tiered promotions with cleanup
- Complex qualification requirements
- Atomic role transitions (add new, remove old simultaneously)
  :::

---

### Staff Base Permissions

**Goal:** All staff roles should have base staff access.

**Rule Configuration:**

- **IF**: Has Some Roles → [Helper, Moderator, Admin, Owner]
- **THEN**: Add Roles → [Staff, Staff Lounge Access]

**How it works:** Anyone with any staff role gets the base staff permissions.

---

### Admin Inherits Mod

**Goal:** Admins should have all moderator permissions too.

**Rule Configuration:**

- **IF**: Has Some Roles → [Admin]
- **THEN**: Add Roles → [Moderator Permissions]

**How it works:** Admin role automatically includes moderator capabilities.

---

### Staff Removal on Suspension

**Goal:** If someone gets suspended, remove all staff roles.

**Rule Configuration:**

- **IF**: Has Some Roles → [Banned, Suspended]
- **THEN**: Remove Roles → [Helper, Moderator, Admin, Staff, Staff Lounge Access]

**How it works:** Safety measure—suspended users lose staff access immediately.

---

### Department Leads

**Goal:** Department leads get additional management access.

**Rule Configuration:**

- **IF**: Has Some Roles → [Support Lead, Events Lead, Community Lead]
- **THEN**: Add Roles → [Management, Lead Perks, Meeting Access]

**How it works:** Any department lead gets management-level access.

---

## Team and Group Systems

### Exclusive Teams (Mutual Exclusivity)

**Goal:** Members can only be on one team—if they somehow have both, remove one.

**Rule Configuration:**

- **IF**: Has All Roles → [Team Red, Team Blue]
- **THEN**: Remove Roles → [Team Red]

**How it works:** Enforces mutual exclusivity—Team Blue takes priority.

**Tip:** Create similar rules for all team combinations if needed.

---

### Team Badge

**Goal:** Give a general "Team Member" badge to anyone on a team.

**Rule Configuration:**

- **IF**: Has Some Roles → [Team Red, Team Blue, Team Green, Team Yellow]
- **THEN**: Add Roles → [Team Member]

**How it works:** Anyone on any team gets the general badge.

---

### Team Lead Perks

**Goal:** Team leads get additional permissions.

**Rule Configuration:**

- **IF**: Has Some Roles → [Red Lead, Blue Lead, Green Lead, Yellow Lead]
- **THEN**: Add Roles → [Team Lead Permissions, Leadership Lounge]

**How it works:** Any team lead gets leadership perks.

---

### House System (Hogwarts-style)

**Goal:** Sorted members get house common room access.

**Rule Configuration:**

- **IF**: Has Some Roles → [Gryffindor, Slytherin, Ravenclaw, Hufflepuff]
- **THEN**: Add Roles → [Sorted, Common Room Access]

**How it works:** Any house assignment grants sorted status and common room access.

---

## Onboarding Flows

### New Member Welcome

**Goal:** Brand new members (no roles) get starter roles.

**Rule Configuration:**

- **IF**: Lacks All Roles → [Member, Verified, Guest]
- **THEN**: Add Roles → [New Arrival]

**Note:** Test carefully with @everyone in the sandbox!

---

### Complete Onboarding

**Goal:** Members who complete all onboarding steps get full access.

**Rule 1:**

- **IF**: Has All Roles → [Rules Accepted, Introduction Posted, Verified]
- **THEN**: Add Roles → [Full Member]

**Rule 2:**

- **IF**: Has Some Roles → [Full Member]
- **THEN**: Remove Roles → [Onboarding, New Arrival]

**How it works:** Completing all steps unlocks full membership and cleans up onboarding roles.

---

### Pronoun Role Channel Access

**Goal:** Members who select pronouns get access to pronoun-discussion channel.

**Rule Configuration:**

- **IF**: Has Some Roles → [He/Him, She/Her, They/Them, Any Pronouns]
- **THEN**: Add Roles → [Pronouns Set, Self-Expression Access]

**How it works:** Selecting any pronoun grants access to related channels.

---

## Access Control

### Age-Restricted Access

**Goal:** Only verified adults get access to certain channels.

**Rule Configuration:**

- **IF**: Has All Roles → [Verified, 18+]
- **THEN**: Add Roles → [Adult Channels Access]

**How it works:** Both verification AND age confirmation required.

---

### Revoke Access on Mute

**Goal:** Muted members lose access to certain channels.

**Rule Configuration:**

- **IF**: Has Some Roles → [Muted]
- **THEN**: Remove Roles → [General Access, Voice Access, Media Access]

**How it works:** Muting restricts access beyond just the mute itself.

---

### Restore Access After Unmute

**Goal:** When mute is removed, restore basic access.

**Rule Configuration:**

- **IF**: Has All Roles → [Member]
- **AND**: Lacks All Roles → [Muted, Banned, Suspended]
- **THEN**: Add Roles → [General Access]

**How it works:** Members in good standing get access restored.

---

### Quarantine System

**Goal:** Suspicious accounts get quarantined with limited access.

**Rule Configuration:**

- **IF**: Has Some Roles → [Quarantined]
- **THEN**: Remove Roles → [Member, Verified, General Access, Voice Access]

**How it works:** Quarantine instantly revokes all access while you investigate.

---

## Activity and Engagement

### Active Member Badge

**Goal:** Members with engagement roles get an "Active" badge.

**Rule Configuration:**

- **IF**: At Least 2 Roles → [Event Participant, Regular Chatter, Voice Active, Helper]
- **THEN**: Add Roles → [Active Member]

**How it works:** Engaging in multiple ways earns recognition.

---

### Inactive Cleanup

**Goal:** Members marked inactive lose activity-based perks.

**Rule Configuration:**

- **IF**: Has Some Roles → [Inactive, AFK]
- **THEN**: Remove Roles → [Active Member, Voice Priority, Event Notifications]

**How it works:** Going inactive removes activity-dependent roles.

---

### Event Notification Opt-In

**Goal:** Members who react to events get notification role.

**Rule Configuration:**

- **IF**: Has Some Roles → [Event RSVP, Event Interested]
- **THEN**: Add Roles → [Event Notifications]

**How it works:** Interest in events triggers notification role.

---

## Gaming and Clans

### Clan Member Base Permissions

**Goal:** All clan members get clan base permissions regardless of rank.

**Rule Configuration:**

- **IF**: Has Some Roles → [Recruit, Member, Veteran, Officer, Leader]
- **THEN**: Add Roles → [Clan Member, Clan Chat Access, Clan Events Access]

**How it works:** Any clan rank grants base clan permissions.

---

### Game-Specific Access

**Goal:** Players of specific games get game-related channels.

**Rule Configuration:**

- **IF**: Has Some Roles → [Valorant, Apex, Overwatch]
- **THEN**: Add Roles → [FPS Gamer, Competitive Access]

**How it works:** Selecting a game grants access to that gaming category.

---

### Ranked Player Recognition

**Goal:** High-ranked players in any game get recognition.

**Rule Configuration:**

- **IF**: Has Some Roles → [Diamond+, Immortal, Radiant, Predator, Top 500]
- **THEN**: Add Roles → [High Rank, Skilled Player Lounge]

**How it works:** High rank in any game earns special access.

---

### Streamer/Content Creator Badge

**Goal:** Active streamers get streamer perks.

**Rule Configuration:**

- **IF**: Has All Roles → [Verified Streamer, Active]
- **THEN**: Add Roles → [Live Notifications, Promo Channel Access]

**How it works:** Verified AND active streamers get promotion privileges.

---

## Subscription and Premium

### Patreon Tier Benefits

**Goal:** Patreon supporters get tier-appropriate benefits.

**Rule 1:**

- **IF**: Has Some Roles → [Patreon $10]
- **THEN**: Add Roles → [Premium, Exclusive Channels, Patreon Perks]

**Rule 2:**

- **IF**: Has Some Roles → [Patreon $5]
- **THEN**: Add Roles → [Supporter, Early Access]

**How it works:** Patreon integration roles trigger your custom benefits.

---

### Ko-fi Supporter

**Goal:** Ko-fi supporters get recognition.

**Rule Configuration:**

- **IF**: Has Some Roles → [Ko-fi Supporter]
- **THEN**: Add Roles → [Supporter, Thank You Perks, Supporter Chat]

**How it works:** Ko-fi integration triggers supporter perks.

---

### Subscription Lapsed Cleanup

**Goal:** Remove premium perks when subscription ends.

**Rule Configuration:**

- **IF**: Lacks All Roles → [Patreon $5, Patreon $10, Ko-fi Supporter, Server Booster]
- **THEN**: Remove Roles → [Premium, Supporter, Exclusive Channels, Early Access]

**How it works:** When all subscription roles are gone, perks are removed.

---

## Color and Cosmetic Roles

### Exclusive Colors (Only One)

**Goal:** Members can only have one color role at a time.

**Rule 1:**

- **IF**: Has All Roles → [Red, Blue]
- **THEN**: Remove Roles → [Red]

**Rule 2:**

- **IF**: Has All Roles → [Red, Green]
- **THEN**: Remove Roles → [Red]

**Rule 3:**

- **IF**: Has All Roles → [Blue, Green]
- **THEN**: Remove Roles → [Blue]

**How it works:** If someone gets two colors, remove the older one. The most recently added color stays.

---

### Color Access Requirements

**Goal:** Only verified members or VIPs can use color roles.

**Rule Configuration:**

- **IF**: Has Some Roles → [Red, Blue, Green, Purple, Orange]
- **AND**: Lacks All Roles → [Verified, VIP, Premium]
- **THEN**: Remove Roles → [Red, Blue, Green, Purple, Orange]

**How it works:** Color roles are removed from unverified/non-VIP members.

---

## Free Plan Examples (5 Rules)

Here are complete setups that fit within the free plan's 5-rule limit. Each of these uses just 2 rules, so you have room to spare:

### Setup 1: Verification + Booster Rewards

**Rule 1: Verification Cleanup**

- **IF**: Has Some Roles → [Verified]
- **THEN**: Remove Roles → [Unverified, Guest, Pending]

**Rule 2: Booster VIP**

- **IF**: Has Some Roles → [Server Booster]
- **THEN**: Add Roles → [VIP, Booster Perks]

**Result:** Clean verification system AND booster rewards with just 2 rules!

---

### Setup 2: Tier System (Consolidated)

**Rule 1: High Tier Cleanup**

- **IF**: Has Some Roles → [Gold, Platinum]
- **THEN**: Remove Roles → [Bronze, Silver]

**Rule 2: Benefits for Any Tier**

- **IF**: Has Some Roles → [Bronze, Silver, Gold, Platinum]
- **THEN**: Add Roles → [Tier Benefits, Member Access]

**Result:** Automatic tier cleanup AND universal benefits!

---

### Setup 3: Staff + Mute System

**Rule 1: Staff Base Permissions**

- **IF**: Has Some Roles → [Helper, Mod, Admin]
- **THEN**: Add Roles → [Staff, Staff Chat Access]

**Rule 2: Mute Restrictions**

- **IF**: Has Some Roles → [Muted]
- **THEN**: Remove Roles → [Chat Access, Voice Access]

**Result:** Staff management AND moderation with 2 rules!

---

## Combining Multiple Scenarios

These scenarios can be combined! For example, a complete server might have:

| Priority | Category       | Purpose                      |
| -------- | -------------- | ---------------------------- |
| 0-1      | Verification   | Process new members first    |
| 2-4      | Tier/Level     | Handle ranking systems       |
| 5-7      | Rewards/VIP    | Process perks and benefits   |
| 8-9      | Staff          | Handle staff permissions     |
| 10+      | Access Control | Final permission adjustments |

Use priority to control the order when rules might interact.

---

## Advanced Creative Scenarios

These advanced scenarios showcase creative role automation ideas for engaging communities. Perfect for gaming servers, creator communities, and active Discord servers looking for unique member experiences.

### Conditional Element Roles (Booster Perks)

**Goal:** Boosters get special "element" roles based on their chosen color role. Combine self-assigned preferences with booster status for personalized perks.

**The Setup:**

**Rule 1: Water Element for Blue Boosters**

- **IF**: Has All Roles → [Blue, Server Booster]
- **THEN**: Add Roles → [Water Element, Element Holder]

**Rule 2: Fire Element for Red Boosters**

- **IF**: Has All Roles → [Red, Server Booster]
- **THEN**: Add Roles → [Fire Element, Element Holder]

**Rule 3: Earth Element for Green Boosters**

- **IF**: Has All Roles → [Green, Server Booster]
- **THEN**: Add Roles → [Earth Element, Element Holder]

**Rule 4: Air Element for White Boosters**

- **IF**: Has All Roles → [White, Server Booster]
- **THEN**: Add Roles → [Air Element, Element Holder]

**Rule 5: Element Cleanup (When Booster Lapses)**

- **IF**: Lacks All Roles → [Server Booster]
- **THEN**: Remove Roles → [Water Element, Fire Element, Earth Element, Air Element, Element Holder]

**Why it's engaging:** Members choose their color preference, and boosting "unlocks" their element. If they stop boosting, elements disappear. If they boost again, their element returns automatically based on their color!

**Keywords:** Discord booster perks, conditional roles, element roles, personalized rewards

---

### Achievement Badge System

**Goal:** Reward members who collect multiple achievement roles with special recognition badges. Encourage participation across different activities.

**The Setup:**

**Rule 1: Collector Badge (3 of 5 achievements)**

- **IF**: At Least 3 Roles → [Event Winner, Helper, Voice Active, Art Contributor, Meme Master]
- **THEN**: Add Roles → [Collector Badge, Achievement Hunter]

**Rule 2: Master Collector (All 5 achievements)**

- **IF**: Has All Roles → [Event Winner, Helper, Voice Active, Art Contributor, Meme Master]
- **THEN**: Add Roles → [Master Collector, Elite Status]

**Rule 3: Clean Up Master When Missing One**

- **IF**: Lacks Some Roles → [Event Winner, Helper, Voice Active, Art Contributor, Meme Master]
- **AND**: Has Some Roles → [Master Collector]
- **THEN**: Remove Roles → [Master Collector]

**Why it's engaging:** Creates a "gotta catch 'em all" mentality. Members are motivated to participate in different activities to earn each achievement and unlock badges.

**Keywords:** Discord achievement system, badge automation, role collection, gamification

---

### Role Evolution System

**Goal:** Base roles "evolve" into advanced versions when members meet certain conditions. Creates a sense of progression and growth.

**The Setup:**

**Rule 1: Rookie → Regular**

- **IF**: Has All Roles → [Rookie, Verified, Level 5]
- **THEN**: Add Roles → [Regular] AND Remove Roles → [Rookie]

**Rule 2: Regular → Veteran**

- **IF**: Has All Roles → [Regular, Level 15, Event Participant]
- **THEN**: Add Roles → [Veteran] AND Remove Roles → [Regular]

**Rule 3: Veteran → Legend**

- **IF**: Has All Roles → [Veteran, Level 30, Helper Badge]
- **THEN**: Add Roles → [Legend] AND Remove Roles → [Veteran]

**Why it's engaging:** Members see their role literally "evolve" as they grow in the community. Each evolution feels like an upgrade, not just gaining another role.

**Keywords:** Discord role evolution, progression system, role upgrades, member journey

---

### Persistent Exclusive Color Roles

**Goal:** Members can self-assign ONE color role that stays until they change it. Perfect for reaction role setups where colors should be mutually exclusive.

**The Setup (Priority matters!):**

**Rule 1: Red replaces other colors (Priority 0)**

- **IF**: Has All Roles → [Red, Blue]
- **THEN**: Remove Roles → [Blue]

**Rule 2: Red replaces Green (Priority 1)**

- **IF**: Has All Roles → [Red, Green]
- **THEN**: Remove Roles → [Green]

**Rule 3: Blue replaces Green (Priority 2)**

- **IF**: Has All Roles → [Blue, Green]
- **THEN**: Remove Roles → [Green]

_(Create rules for all color combinations)_

**Rule 4: Color Holder Badge**

- **IF**: Has Some Roles → [Red, Blue, Green, Purple, Orange, Pink]
- **THEN**: Add Roles → [Color Customized]

**Why it's engaging:** Works perfectly with reaction role bots. Members click a new color, RoleLogic removes the old one automatically. The "Color Customized" badge shows they've personalized their profile.

**Keywords:** Discord color roles, exclusive roles, self-assign roles, reaction role cleanup

---

### Loyalty Milestone Rewards

**Goal:** Automatically reward members as they accumulate loyalty-related roles from various sources (boosting, events, helping, etc.).

**The Setup:**

**Rule 1: Bronze Supporter (Any loyalty)**

- **IF**: Has Some Roles → [Server Booster, Patreon, Event Helper, Donator, Nitro Gifter]
- **THEN**: Add Roles → [Supporter, Loyalty Badge Bronze]

**Rule 2: Silver Supporter (2 loyalties)**

- **IF**: At Least 2 Roles → [Server Booster, Patreon, Event Helper, Donator, Nitro Gifter]
- **THEN**: Add Roles → [Loyalty Badge Silver]

**Rule 3: Gold Supporter (3 loyalties)**

- **IF**: At Least 3 Roles → [Server Booster, Patreon, Event Helper, Donator, Nitro Gifter]
- **THEN**: Add Roles → [Loyalty Badge Gold, VIP Lounge Access]

**Rule 4: Diamond Supporter (4+ loyalties)**

- **IF**: At Least 4 Roles → [Server Booster, Patreon, Event Helper, Donator, Nitro Gifter]
- **THEN**: Add Roles → [Loyalty Badge Diamond, Exclusive Access, Custom Perks]

**Why it's engaging:** Recognizes members who support the community in multiple ways. Someone who boosts AND donates AND helps at events gets special recognition.

**Keywords:** Discord loyalty rewards, milestone badges, supporter tiers, community recognition

---

### Faction/Team War System

**Goal:** Competitive team system where team membership unlocks special channels and perks, with dynamic scoring recognition.

**The Setup:**

**Rule 1: Faction Base Access**

- **IF**: Has Some Roles → [Dragons, Phoenix, Wolves, Serpents]
- **THEN**: Add Roles → [Faction Member, War Participant, Team Chat Access]

**Rule 2: Faction Officers**

- **IF**: Has Some Roles → [Dragon Officer, Phoenix Officer, Wolf Officer, Serpent Officer]
- **THEN**: Add Roles → [Faction Leadership, Strategy Room Access, Officer Badge]

**Rule 3: Winning Faction Champion**

- **IF**: Has Some Roles → [Season 1 Winner, Season 2 Winner, Season 3 Winner]
- **THEN**: Add Roles → [Former Champion, Hall of Fame]

**Rule 4: Dynasty (Multiple Wins)**

- **IF**: At Least 2 Roles → [Season 1 Winner, Season 2 Winner, Season 3 Winner]
- **THEN**: Add Roles → [Dynasty Member, Legend Status]

**Why it's engaging:** Creates tribal loyalty and competition. Members fight for their faction, and historical achievements are preserved.

**Keywords:** Discord faction system, team wars, competitive roles, gaming server automation

---

### Reputation and Standing System

**Goal:** Track member reputation through positive/negative roles. Good standing unlocks perks; bad standing restricts access.

**The Setup:**

**Rule 1: Trusted Member**

- **IF**: Has All Roles → [Verified, Active 30 Days]
- **AND**: Lacks All Roles → [Warning, Muted, Restricted]
- **THEN**: Add Roles → [Trusted, Links Allowed, Media Allowed]

**Rule 2: Good Standing Perks**

- **IF**: Has Some Roles → [Trusted]
- **AND**: At Least 2 Roles → [Helpful, Friendly, Event Regular, Contributor]
- **THEN**: Add Roles → [Excellent Standing, Suggestion Access]

**Rule 3: Warning Removes Trust**

- **IF**: Has Some Roles → [Warning, Strike, Probation]
- **THEN**: Remove Roles → [Trusted, Links Allowed, Excellent Standing]

**Rule 4: Redemption (Warning Cleared)**

- **IF**: Has All Roles → [Verified, Active 30 Days]
- **AND**: Lacks All Roles → [Warning, Strike, Probation, Muted]
- **THEN**: Add Roles → [Trusted]

**Why it's engaging:** Creates consequences for bad behavior and rewards for good behavior. Members can "redeem" themselves when warnings clear.

**Keywords:** Discord reputation system, trust roles, standing system, moderation automation

---

### Creator/Streamer Spotlight System

**Goal:** Content creators get tiered recognition based on their activity and community engagement.

**The Setup:**

**Rule 1: Verified Creator Base**

- **IF**: Has Some Roles → [Verified YouTuber, Verified Streamer, Verified Artist]
- **THEN**: Add Roles → [Content Creator, Promo Channel Access]

**Rule 2: Active Creator**

- **IF**: Has All Roles → [Content Creator, Posted This Week]
- **THEN**: Add Roles → [Active Creator, Featured Eligible]

**Rule 3: Community Creator**

- **IF**: Has All Roles → [Content Creator, Event Participant]
- **AND**: At Least 1 Roles → [Helpful, Contributor]
- **THEN**: Add Roles → [Community Creator, Spotlight Eligible]

**Rule 4: Partner Creator**

- **IF**: Has All Roles → [Community Creator, 10 Posts]
- **THEN**: Add Roles → [Partner, Special Embed Color, Priority Promotion]

**Why it's engaging:** Rewards creators who actually engage with the community, not just self-promote. Creates a pathway from "verified" to "partner."

**Keywords:** Discord streamer roles, creator verification, content creator perks, partnership system

---

### Mentorship and Onboarding System

**Goal:** Experienced members can become mentors; helping new members unlocks rewards.

**The Setup:**

**Rule 1: Mentor Eligibility**

- **IF**: Has All Roles → [Veteran, Helpful Badge, Active]
- **THEN**: Add Roles → [Mentor Eligible]

**Rule 2: Active Mentor**

- **IF**: Has All Roles → [Mentor Eligible, Currently Mentoring]
- **THEN**: Add Roles → [Active Mentor, Mentor Lounge Access]

**Rule 3: Mentor Recognition**

- **IF**: At Least 3 Roles → [Mentored 1, Mentored 2, Mentored 3, Mentored 4, Mentored 5]
- **THEN**: Add Roles → [Experienced Mentor, Mentor Badge Gold]

**Rule 4: Master Mentor**

- **IF**: At Least 5 Roles → [Mentored 1, Mentored 2, Mentored 3, Mentored 4, Mentored 5]
- **THEN**: Add Roles → [Master Mentor, Staff Consideration, Special Recognition]

**Why it's engaging:** Creates a pathway for experienced members to give back. Mentors get recognition for helping new members succeed.

**Keywords:** Discord mentorship system, community onboarding, helper rewards, member engagement

---

### Skill-Based Class System (Gaming Servers)

**Goal:** Members choose a "class" that determines their abilities and unlocks class-specific channels.

**The Setup:**

**Rule 1: Warrior Class Perks**

- **IF**: Has Some Roles → [Warrior]
- **THEN**: Add Roles → [Melee Fighter, Warrior Den Access, Tank Role Eligible]

**Rule 2: Mage Class Perks**

- **IF**: Has Some Roles → [Mage]
- **THEN**: Add Roles → [Magic User, Mage Tower Access, Support Role Eligible]

**Rule 3: Rogue Class Perks**

- **IF**: Has Some Roles → [Rogue]
- **THEN**: Add Roles → [Stealth Specialist, Shadow Guild Access, DPS Role Eligible]

**Rule 4: Multiclass Prevention**

- **IF**: Has All Roles → [Warrior, Mage]
- **THEN**: Remove Roles → [Warrior]

**Rule 5: Class Mastery (Level up)**

- **IF**: Has All Roles → [Warrior, Level 20]
- **THEN**: Add Roles → [Elite Warrior, Class Master]

**Why it's engaging:** Perfect for RPG and gaming servers. Members identify with their class and unlock class-specific content.

**Keywords:** Discord RPG roles, class system, gaming server automation, role-based permissions

---

### Seasonal Event Participation

**Goal:** Track participation across seasonal events and reward consistent engagement throughout the year.

**The Setup:**

**Rule 1: Event Participant Base**

- **IF**: Has Some Roles → [Spring Event, Summer Event, Fall Event, Winter Event]
- **THEN**: Add Roles → [Event Participant, Seasonal Member]

**Rule 2: Seasonal Veteran**

- **IF**: At Least 2 Roles → [Spring Event, Summer Event, Fall Event, Winter Event]
- **THEN**: Add Roles → [Seasonal Veteran, Priority Event Signup]

**Rule 3: Year-Round Champion**

- **IF**: Has All Roles → [Spring Event, Summer Event, Fall Event, Winter Event]
- **THEN**: Add Roles → [Annual Champion, Exclusive Yearly Badge, VIP Next Year]

**Rule 4: Multi-Year Legend**

- **IF**: At Least 2 Roles → [2023 Champion, 2024 Champion, 2025 Champion]
- **THEN**: Add Roles → [Community Legend, Hall of Fame, Permanent VIP]

**Why it's engaging:** Encourages year-round participation. Members who stick around for multiple events get increasingly valuable recognition.

**Keywords:** Discord seasonal events, annual rewards, event participation, long-term engagement

---

### Economy Integration (Shop Purchases)

**Goal:** Members who purchase items/roles through economy bots get automatic perks and recognition.

**The Setup:**

**Rule 1: Shop Customer**

- **IF**: Has Some Roles → [Purchased Item, Shop Role, Economy Role]
- **THEN**: Add Roles → [Valued Customer, Shop Supporter]

**Rule 2: Big Spender**

- **IF**: At Least 3 Roles → [Tier 1 Purchase, Tier 2 Purchase, Tier 3 Purchase, Premium Purchase]
- **THEN**: Add Roles → [Big Spender, Exclusive Shop Access]

**Rule 3: Collector's Edition**

- **IF**: Has All Roles → [Rare Item 1, Rare Item 2, Rare Item 3]
- **THEN**: Add Roles → [Rare Collector, Limited Edition Access]

**Why it's engaging:** Works alongside economy bots (UnbelievaBoat, etc.). Spending currency unlocks not just the purchased item but additional recognition.

**Keywords:** Discord economy integration, shop rewards, purchase perks, currency system automation

---

### Comeback/Return Rewards

**Goal:** Recognize members who return after being away, encouraging re-engagement.

**The Setup:**

**Rule 1: Welcome Back**

- **IF**: Has All Roles → [Returning Member, Formerly Active]
- **THEN**: Add Roles → [Welcome Back, Returnee Perks]

**Rule 2: Loyalty Despite Absence**

- **IF**: Has All Roles → [Returning Member, Previous VIP]
- **THEN**: Add Roles → [Loyalty Recognized, VIP Restored]

**Rule 3: Clean Return Slate**

- **IF**: Has All Roles → [Returning Member, Verified]
- **AND**: Lacks All Roles → [Warning, Strike, Previous Ban]
- **THEN**: Add Roles → [Good Standing Restored, Full Access]

**Why it's engaging:** Shows members they're valued even if they took a break. Returning feels welcoming, not punishing.

**Keywords:** Discord returning members, re-engagement, comeback rewards, member retention

---

## Cross-Server Actions

Cross-server (cross-guild) actions let you manage roles across multiple Discord servers from a single rule. These examples require RoleLogic to be in all involved servers with proper permissions.

### VIP Sync Across Servers

**Goal:** When someone gets VIP in your main server, automatically give them VIP access in your secondary/lounge server.

**Servers:**

- **Main Server**: Where members earn VIP status
- **Lounge Server**: Exclusive VIP hangout

**Rule Configuration (created in Main Server):**

- **IF**: Has Some Roles → [VIP]
- **THEN**: Add Roles → [Lounge Access] _(select from Lounge Server)_

**How it works:** When a member receives "VIP" in the main server, RoleLogic adds "Lounge Access" from your other server—if the member is in both servers.

:::info Cross-Server Requirements

- RoleLogic must be in **both** servers with "Manage Roles" permission
- RoleLogic's role must be positioned correctly in **both** servers
- The member must exist in **both** servers for the action to apply
  :::

---

### Partner Network Badge

**Goal:** Partners in your main community get recognition badges in all your network servers.

**Servers:**

- **Community Hub**: Main server where partners are assigned
- **Gaming Server**: Secondary server
- **Events Server**: Tertiary server

**Rule Configuration (created in Community Hub):**

- **IF**: Has Some Roles → [Partner]
- **THEN**: Add Roles → [Partner Badge] _(from Gaming Server)_, [Partner Badge] _(from Events Server)_

**How it works:** Assigning "Partner" in your hub automatically grants partner badges across your entire server network.

---

### Verification Sync

**Goal:** Members verified in one server don't need to re-verify in linked servers.

**Rule Configuration (created in Main Server):**

- **IF**: Has All Roles → [Verified, Member]
- **THEN**: Add Roles → [Verified] _(from Partner Server)_ **AND** Remove Roles → [Unverified] _(from Partner Server)_

**How it works:** Once verified in your main server, members automatically get verified status in partner servers, skipping duplicate verification processes.

---

### Staff Sync Across Servers

**Goal:** Staff members get appropriate roles in all servers you manage.

**Rule Configuration (created in Main Server):**

- **IF**: Has Some Roles → [Moderator, Admin]
- **THEN**: Add Roles → [Staff Access] _(from Server B)_, [Staff Access] _(from Server C)_

**How it works:** Promoting someone to staff in your main server grants them staff access across all your servers automatically.

---

### Event Winner Cross-Server Rewards

**Goal:** Event winners in your events server get recognition in your main community.

**Servers:**

- **Events Server**: Where competitions happen
- **Main Community**: Where winners should be recognized

**Rule Configuration (created in Events Server):**

- **IF**: Has Some Roles → [1st Place, 2nd Place, 3rd Place]
- **THEN**: Add Roles → [Event Champion] _(from Main Community)_, [Winner Lounge] _(from Main Community)_

**How it works:** Winners in events automatically get champion status and lounge access in your main community server.

---

### Community Network Recognition

**Goal:** Members of your main/official server get special recognition and perks when they join your satellite servers (game-specific servers, regional servers, or community-run fan servers).

**Servers:**

- **Official Hub**: Your main community server
- **Game Server**: Satellite server for a specific game
- **Regional Server**: Community server for a specific region

**Rule 1: Hub Member Badge (created in Official Hub):**

- **IF**: Has Some Roles → [@everyone]
- **THEN**: Add Roles → [Hub Member] _(from Game Server)_, [Official Community] _(from Regional Server)_

**Rule 2: Established Member Perks (created in Official Hub):**

- **IF**: Has Some Roles → [Verified, Active Member]
- **THEN**: Add Roles → [Trusted Visitor] _(from Game Server)_, [Verified Crossover] _(from Regional Server)_

**Rule 3: VIP Network Access (created in Official Hub):**

- **IF**: Has Some Roles → [VIP, Server Booster, Patreon]
- **THEN**: Add Roles → [VIP Guest] _(from Game Server)_, [Premium Network Member] _(from Regional Server)_

**How it works:** Simply being a member of your official hub (@everyone) grants recognition in satellite servers. Higher status in the hub unlocks progressively better perks across your entire network. Members feel rewarded for being part of the main community wherever they go.

**Use cases:**

- **Gaming organizations** with game-specific Discord servers
- **Content creators** with main channel + game/topic-specific communities
- **Large communities** with regional or language-specific servers
- **Server networks** wanting to reward loyal hub members

**Keywords:** cross-server Discord, multi-server roles, linked servers, server network, cross-guild automation

---

## Tips for Implementing Scenarios

### Start Simple

Implement one scenario at a time. Test it thoroughly before adding more complexity.

### Test Every Rule

Use the sandbox to verify each rule works as expected before going live.

### Consider Rule Consolidation

With the free plan's 5-rule limit, look for ways to combine logic:

- Use "Has Some Roles" with multiple roles instead of separate rules
- Combine add AND remove actions in one rule
- Let cascading handle complex chains

### Document Your Setup

Keep notes about why you configured rules certain ways. Future you will thank present you.

### Review Regularly

As your server evolves, revisit these rules. Remove obsolete ones and update others.

---

## Need More Examples?

- **[Best Practices](./best-practices)** — Organize multiple scenarios effectively
- **[FAQ](../faq)** — Troubleshooting when scenarios don't work
- **[Conditions Reference](../reference/conditions-reference)** — All condition types explained
- **[Support](../support)** — Get help with custom scenarios
