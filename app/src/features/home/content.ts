// SPDX-License-Identifier: LicenseRef-PolyForm-Shield-1.0.0
// SPDX-FileCopyrightText: 2025 Cogni-DAO

/**
 * Module: `@features/home/content`
 * Purpose: Single customization surface for the public landing page. ALL editable
 *   copy and placeholder data for the homepage lives here — hero, showcase cards,
 *   activity feed, and stats. The components in `./components/*` are layout only;
 *   they read everything from this file.
 * Scope: Public homepage content. No logic, no IO — pure data.
 * Invariants: Shapes are stable so layout components stay generic. Customize VALUES,
 *   not shapes, when minting a new node.
 * Side-effects: none
 * Links: src/features/home/components/LandingHero.tsx,
 *   src/features/home/components/ShowcaseCards.tsx,
 *   src/features/home/components/ActivityFeed.tsx,
 *   src/features/home/components/AgentStream.tsx,
 *   src/features/home/components/HomeStats.tsx
 * @public
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *  ███  cogni/games — the AI hub for gamers  ███
 *
 *  Mission: a community-owned, Reddit-like hub where an AI and human players
 *  gather game knowledge, coach each other, run education, and grow per-game
 *  sub-communities. This file is the homepage copy for that mission.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import {
  Activity,
  BrainCircuit,
  CheckCircle,
  Gamepad2,
  Search,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/* ─── HERO ────────────────────────────────────────────────────────────────
 * The first thing a visitor sees. `headline` renders as two lines; the second
 * line gets the brand gradient. Keep it short and declarative.
 */
export interface HeroContent {
  /** Tiny uppercase label inside the status pill at the top of the hero. */
  statusLabel: string;
  /** Line 1 of the headline (plain foreground color). */
  headlineTop: string;
  /** Line 2 of the headline (renders with the brand gradient). */
  headlineAccent: string;
  /** One- to two-sentence value prop under the headline. */
  subhead: string;
  /** Primary CTA — wired to the "try the demo" sign-in flow. */
  primaryCta: string;
  /** Small uppercase tagline shown next to the primary CTA. */
  ctaTagline: string;
}

export const HERO: HeroContent = {
  statusLabel: "Now in open beta",
  headlineTop: "Level up with your crew.",
  headlineAccent: "An AI hub for gamers.",
  subhead:
    "Reddit-style sub-communities for every game you play — backed by an AI that gathers strategy, coaches your weak spots, and builds living guides. Contributors earn governance tokens and vote on what the agent learns next.",
  primaryCta: "Enter the arena",
  ctaTagline: "Ask the AI. Coach your crew. Own the hub.",
};

/* ─── HERO LINKS ──────────────────────────────────────────────────────────
 * Secondary buttons in the hero. Point them at your community + source.
 */
export const HERO_LINKS = {
  chatUrl: "https://discord.gg/3b9sSyhZ4z",
  sourceUrl: "https://github.com/cogni-dao/games",
} as const;

/* ─── AGENT STREAM ────────────────────────────────────────────────────────
 * The live "console" embedded in the hero. Each sequence plays out like the
 * agent thinking in real time, then loops to the next. Rewrite these lines to
 * describe what YOUR agent actually does, step by step. Keep ~4-6 events each.
 */
export type StreamEventType =
  | "thinking"
  | "searching"
  | "analyzing"
  | "signal"
  | "done";

export interface StreamEvent {
  id: string;
  type: StreamEventType;
  text: string;
  /** ms offset from the start of the sequence when this line appears. */
  at: number;
}

/** Label shown in the stream header next to the spinner. */
export const AGENT_STREAM_SUBJECT = "cogni/games";

export const AGENT_STREAM_SEQUENCES: StreamEvent[][] = [
  [
    {
      id: "a1",
      type: "thinking",
      text: "Coaching request: 'I keep losing mid-game team fights as support'",
      at: 0,
    },
    {
      id: "a2",
      type: "searching",
      text: "Pulling high-elo VODs, patch notes, and the hub's support guides",
      at: 1800,
    },
    {
      id: "a3",
      type: "analyzing",
      text: "Spotting the pattern: over-extended warding, late peel on the carry",
      at: 3400,
    },
    {
      id: "a4",
      type: "signal",
      text: "Drill: a 3-step positioning fix + two practice scenarios. Sharing to r/support.",
      at: 5600,
    },
    {
      id: "a5",
      type: "done",
      text: "Coaching brief posted. Queued for community review and token weighting.",
      at: 7200,
    },
  ],
  [
    {
      id: "b1",
      type: "thinking",
      text: "New patch dropped — scanning for what changed across the meta",
      at: 0,
    },
    {
      id: "b2",
      type: "searching",
      text: "Diffing patch notes against the hub's tier lists and build guides",
      at: 2000,
    },
    {
      id: "b3",
      type: "analyzing",
      text: "Flagging 4 builds now outdated, 2 sleeper picks trending up",
      at: 3800,
    },
    {
      id: "b4",
      type: "signal",
      text: "Auto-updating the living wiki and pinging affected sub-communities.",
      at: 5400,
    },
    {
      id: "b5",
      type: "done",
      text: "Meta digest published. Guides freshness restored to green.",
      at: 6800,
    },
  ],
  [
    {
      id: "c1",
      type: "thinking",
      text: "Tallying this week's contributions across every game community...",
      at: 0,
    },
    {
      id: "c2",
      type: "searching",
      text: "Matching verified guides, accepted coaching, and answered questions",
      at: 1600,
    },
    {
      id: "c3",
      type: "analyzing",
      text: "Calculating token weights before the next roadmap vote",
      at: 3200,
    },
    {
      id: "c4",
      type: "done",
      text: "Contribution receipts ready. Governance distribution open for review.",
      at: 5000,
    },
  ],
];

/* ─── SHOWCASE CARDS ──────────────────────────────────────────────────────
 * A grid of cards showing what the node tracks / produces. The two-segment bar
 * is a generic split (e.g. Yes/No, Open/Closed, On-track/At-risk) — name the
 * segments per item. Replace the category list and the cards with your domain.
 */
export interface ShowcaseOutcome {
  label: string;
  /** 0-100; the two outcomes in a card should sum to ~100. */
  value: number;
}

export interface ShowcaseItem {
  id: string;
  title: string;
  /** Must match one of SHOWCASE_CATEGORIES (besides "All"). */
  category: string;
  /** Free-text source / origin shown in muted text. */
  source: string;
  /** Headline number shown top-right, e.g. "$4.2M" or "94%". */
  metric: string;
  /** 24h-style delta in percent; positive = up (success), negative = down. */
  change: number;
  /** Two-segment split bar. */
  outcomes: [ShowcaseOutcome, ShowcaseOutcome];
  /** Left footer meta (e.g. volume, members, size). */
  footerLeft: string;
  /** Right footer meta (e.g. "Updated 2h ago", "Resolves Jun 18"). */
  footerRight: string;
}

export const SHOWCASE_SECTION = {
  eyebrow: "What the hub does",
  heading: "Every game gets its own AI-powered community.",
  subhead:
    "Knowledge, coaching, education, and sub-communities — one shared place where the AI and the players make each other better. Pick your game and jump in.",
} as const;

export const SHOWCASE_CATEGORIES = [
  "All",
  "Knowledge",
  "Coaching",
  "Community",
  "Governance",
] as const;

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "1",
    title: "Living wikis that update themselves when the meta shifts",
    category: "Knowledge",
    source: "AI + community guides",
    metric: "1.2k",
    change: 14,
    outcomes: [
      { label: "Up to date", value: 88 },
      { label: "Stale", value: 12 },
    ],
    footerLeft: "Builds, tier lists, patch diffs",
    footerRight: "Updated hourly",
  },
  {
    id: "2",
    title: "Personal coaching that finds and fixes your weak spots",
    category: "Coaching",
    source: "VOD + match analysis",
    metric: "24/7",
    change: 11,
    outcomes: [
      { label: "Improving", value: 76 },
      { label: "Plateaued", value: 24 },
    ],
    footerLeft: "Drills, reviews, scenarios",
    footerRight: "On demand",
  },
  {
    id: "3",
    title: "Sub-communities for every title, rank, and playstyle",
    category: "Community",
    source: "Player-run hubs",
    metric: "48",
    change: 9,
    outcomes: [
      { label: "Active", value: 81 },
      { label: "Quiet", value: 19 },
    ],
    footerLeft: "Threads, LFG, tournaments",
    footerRight: "Member-led",
  },
  {
    id: "4",
    title: "Token holders steer what the AI coaches and learns next",
    category: "Governance",
    source: "Treasury + roadmap",
    metric: "DAO",
    change: 6,
    outcomes: [
      { label: "Members", value: 83 },
      { label: "Founder", value: 17 },
    ],
    footerLeft: "Priorities + budget",
    footerRight: "Next vote",
  },
];

/* ─── ACTIVITY FEED ───────────────────────────────────────────────────────
 * "What the agent is thinking" — public, explainable output. Each signal shows
 * the call, a confidence, the reasoning, and the sources. This is where you
 * prove the node works in the open. Rewrite for your domain.
 */
export type SignalDirection = "positive" | "negative" | "neutral";

export interface FeedSignal {
  id: string;
  title: string;
  category: string;
  source: string;
  direction: SignalDirection;
  /** 0-100 self-reported confidence. */
  confidence: number;
  /** The agent's reasoning, 1-2 sentences. */
  thesis: string;
  /** Citations / inputs the agent used. */
  sources: string[];
  /** Human-friendly relative time, e.g. "2m ago". */
  timestamp: string;
}

export const FEED_SECTION = {
  eyebrow: "The agent, working in the open",
  heading: "Watch the AI coach the community in real time.",
  subhead:
    "Every guide it writes, every coaching call it makes, every meta shift it catches — posted publicly with its reasoning and sources, so players can trust it and improve it.",
} as const;

/** The status-bar verbs and the running totals shown above the feed. */
export const FEED_STATUS = {
  scannedLabel: "matches reviewed",
  signalsLabel: "guides updated",
  startScanned: 18420,
  signalsToday: 37,
} as const;

export const FEED_SIGNALS: FeedSignal[] = [
  {
    id: "s1",
    title: "Patch 14.6 breaks the top jungle clear — guide auto-updated",
    category: "Knowledge",
    source: "Patch diff + community wiki",
    direction: "positive",
    confidence: 91,
    thesis:
      "Camp respawn timings changed enough to invalidate the fastest-clear route; the AI recomputed the path and flagged the old guide for review.",
    sources: [
      "Official patch notes",
      "Hub clear-timer data",
      "Top jungle mains",
    ],
    timestamp: "3m ago",
  },
  {
    id: "s2",
    title: "Coaching win: a support player climbed two ranks in a week",
    category: "Coaching",
    source: "Match history + drills",
    direction: "positive",
    confidence: 78,
    thesis:
      "Targeted positioning drills addressed a repeated team-fight death pattern; their measured deaths-per-fight dropped and rank followed.",
    sources: ["Replay analysis", "Drill completion", "Ranked ladder"],
    timestamp: "12m ago",
  },
  {
    id: "s3",
    title: "New sub-community proposed: co-op roguelikes",
    category: "Community",
    source: "Member requests",
    direction: "neutral",
    confidence: 70,
    thesis:
      "Enough cross-posted questions cluster around co-op roguelikes to justify a dedicated hub with its own guides, LFG, and coaching track.",
    sources: ["Thread volume", "Search queries", "Member poll"],
    timestamp: "19m ago",
  },
  {
    id: "s4",
    title: "Governance question drafted: fund a tournament-prep coach?",
    category: "Governance",
    source: "Roadmap",
    direction: "positive",
    confidence: 74,
    thesis:
      "Token holders should decide whether the next budget funds deeper tournament prep, more game coverage, or faster wiki refresh.",
    sources: ["Treasury", "Roadmap", "Member requests"],
    timestamp: "26m ago",
  },
];

/* ─── STATS ───────────────────────────────────────────────────────────────
 * The closing band of big numbers. Keep them true and specific to your node.
 */
export interface StatItem {
  value: string;
  label: string;
}

export const STATS: StatItem[] = [
  { value: "48", label: "Game communities" },
  { value: "1.2k", label: "Living guides" },
  { value: "24/7", label: "AI coach" },
  { value: "DAO", label: "Governance" },
];

/* ─── STREAM ICONS ────────────────────────────────────────────────────────
 * Maps stream event types to icons. You usually won't need to touch this.
 */
export const STREAM_ICONS: Record<StreamEventType, LucideIcon> = {
  thinking: BrainCircuit,
  searching: Search,
  analyzing: Activity,
  signal: Sparkles,
  done: CheckCircle,
};

export const SECTION_ICON: LucideIcon = Gamepad2;
