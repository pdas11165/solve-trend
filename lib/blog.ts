// Single source of truth for Solve Trend's blog / Insights.
// Consumed by the homepage Insights section, the /blog index,
// and the /blog/[slug] post pages.

const HERO_CDN = "https://cdn.prod.website-files.com/6904c591abb4bd2b6a67271b";
const WORK_CDN = "https://cdn.prod.website-files.com/69a2eb38c0f39fa49cd98ba1";
const PROJECT_CDN = "https://cdn.prod.website-files.com/69a9212ffc8e44e1794fb799";

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO date, e.g. "2026-07-15" */
  date: string;
  readingTime: string;
  author: string;
  color: string;
  coverImage: string;
  coverAlt: string;
  body: BlogBlock[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "custom-crm-vs-off-the-shelf",
    title: "Custom CRM vs. Off-the-Shelf: How to Actually Decide",
    excerpt:
      "Everyone tells you to \"just use HubSpot.\" Sometimes they're right. Here's the honest way to decide whether to configure a platform or build your own.",
    category: "AI & Automation",
    date: "2026-07-18",
    readingTime: "6 min read",
    author: "Solve Trend",
    color: "rgba(81, 150, 253, 0.8)",
    coverImage: `${WORK_CDN}/69bac6c472b3ddaac9735644_CMS%20Work%2001%20webp.webp`,
    coverAlt: "Custom CRM dashboard",
    body: [
      {
        type: "p",
        text: "A CRM is where your revenue actually lives — every lead, deal, and follow-up. So when a business outgrows its spreadsheet, the instinct is either \"let's buy the big-name tool\" or \"let's build exactly what we need.\" Both instincts are half right. The decision isn't about which is better; it's about where you are.",
      },
      {
        type: "h2",
        text: "Start with off-the-shelf until it hurts",
      },
      {
        type: "p",
        text: "For most teams under a certain size, a configured platform — HubSpot, Pipedrive, Attio, even a well-structured Airtable — will get you 80% of the way in days, not months. You get pipelines, reporting, and integrations out of the box, and you don't own the maintenance. The right first question is almost never \"what should we build,\" it's \"what can we configure.\"",
      },
      {
        type: "p",
        text: "The catch is the last 20%. That's where the platform's assumptions start fighting the way your business actually works — a sales process that doesn't fit their stages, a data model that doesn't match your objects, an automation their plan won't let you build.",
      },
      {
        type: "h2",
        text: "Signs you've genuinely outgrown the platform",
      },
      {
        type: "ul",
        items: [
          "You're paying for per-seat plans mostly to unlock one feature you actually need.",
          "Your team lives in three tools and copies data between them by hand.",
          "The platform can't model a core part of your business without ugly workarounds.",
          "You want automations or an AI layer the platform simply won't let you build.",
          "You're exporting to spreadsheets to do the reporting that matters.",
        ],
      },
      {
        type: "p",
        text: "When two or three of those are true, custom stops being a luxury. A CRM built around your pipeline — your objects, your stages, your integrations — removes the friction instead of working around it. And once you own the system, adding an AI automation layer (enrichment, scoring, auto-summaries, drafted follow-ups) is a feature you build, not a plan you upgrade to.",
      },
      {
        type: "quote",
        text: "Configure until the platform's assumptions cost you more than a custom build would. That line is different for every business — the job is finding yours.",
      },
      {
        type: "h2",
        text: "The middle path most people miss",
      },
      {
        type: "p",
        text: "You rarely have to choose all-or-nothing. Often the smartest move is to keep the platform for what it's good at and build a thin custom layer on top — a dashboard that unifies your tools, an integration that syncs them, or an AI automation that handles the repetitive work. You get the speed of off-the-shelf and the fit of custom, and you can replace the platform later if you ever truly outgrow it.",
      },
      {
        type: "p",
        text: "If you're staring at this decision right now, that's exactly the kind of thing worth a 30-minute conversation before you commit to either path.",
      },
    ],
  },
  {
    slug: "where-ai-automation-actually-pays-off",
    title: "Where AI Automation Actually Pays Off (and Where It Doesn't)",
    excerpt:
      "AI can automate almost anything now — which is exactly why most teams automate the wrong things. A practical filter for what's worth it.",
    category: "AI & Automation",
    date: "2026-07-12",
    readingTime: "5 min read",
    author: "Solve Trend",
    color: "rgba(18, 181, 201, 0.8)",
    coverImage: `${HERO_CDN}/6904ca7a4abbe56dfff89573_hero-marquee-img-06.avif`,
    coverAlt: "AI automation workflow",
    body: [
      {
        type: "p",
        text: "The question stopped being \"can we automate this?\" a while ago. With modern AI, the answer is almost always yes. The useful question now is \"should we, and is it worth it?\" — because automating the wrong task well is just an expensive way to move a problem around.",
      },
      {
        type: "h2",
        text: "The tasks worth automating first",
      },
      {
        type: "p",
        text: "The best early automations share three traits: they're repetitive, they're high-volume, and a human doing them adds little judgment. That's the sweet spot where AI removes real hours without removing the part where a person actually matters.",
      },
      {
        type: "ul",
        items: [
          "Lead enrichment — pulling context on a new contact so your team doesn't have to Google them.",
          "Summarizing calls, emails, and threads into a few lines someone can act on.",
          "Drafting first-pass follow-ups a human edits and sends in seconds.",
          "Lead scoring and routing so the right person sees the right deal.",
          "Answering the same support question for the hundredth time.",
        ],
      },
      {
        type: "p",
        text: "Notice what these have in common: the AI does the grunt work, and a human keeps the judgment. That's not a limitation — it's the design. The goal is to give your team back the hours, not to remove them from the loop.",
      },
      {
        type: "h2",
        text: "Where automation quietly backfires",
      },
      {
        type: "p",
        text: "Automation goes wrong when you point it at low-volume, high-stakes, or high-judgment work. Automating a decision that happens twice a month and needs real thought doesn't save time — it adds a system to maintain and a new way to be wrong. And automating something before you understand the manual process just encodes the mess faster.",
      },
      {
        type: "quote",
        text: "Automate the busywork, not the judgment. If a task needs a human's read on it, the AI's job is to prepare it — not to make the call.",
      },
      {
        type: "h2",
        text: "A simple filter before you build anything",
      },
      {
        type: "p",
        text: "Before automating a task, ask: how often does it happen, how long does it take each time, and what breaks if it's wrong? Multiply frequency by time to find where the hours actually are; use the \"what breaks\" answer to decide how much a human needs to stay in the loop. Start with the one or two automations that score highest — the ones that pay for themselves fast — and expand from there.",
      },
      {
        type: "p",
        text: "Done this way, AI automation isn't a moonshot. It's a series of small, obvious wins that compound — each one giving your team back time to spend on the work that actually needs them.",
      },
    ],
  },
  {
    slug: "outgrown-your-spreadsheets",
    title: "5 Signs Your Business Has Outgrown Its Spreadsheets",
    excerpt:
      "Spreadsheets are where most businesses start — and where a surprising number quietly stall. Here's how to tell it's time for a real system.",
    category: "Custom Software",
    date: "2026-07-05",
    readingTime: "4 min read",
    author: "Solve Trend",
    color: "rgba(143, 137, 255, 0.8)",
    coverImage: `${PROJECT_CDN}/69ce1dd984e68ff75cfcfcf3_prd.jpg`,
    coverAlt: "Internal tools and dashboards",
    body: [
      {
        type: "p",
        text: "Spreadsheets are genuinely great — flexible, free, and instantly understood. Most businesses run on them far longer than they should, because the moment they stop being enough is easy to miss. Here's what that moment usually looks like.",
      },
      {
        type: "h2",
        text: "1. Two people can't safely work at once",
      },
      {
        type: "p",
        text: "When \"who has the file open?\" is a real question, or someone's edits routinely overwrite someone else's, the spreadsheet has quietly become a bottleneck. Real systems handle concurrent users without anyone stepping on anyone.",
      },
      {
        type: "h2",
        text: "2. The same data lives in three places",
      },
      {
        type: "p",
        text: "A contact in the sheet, in your inbox, and in your invoicing tool — kept in sync by hand. Every manual copy is a chance to be wrong, and the time spent reconciling adds up fast.",
      },
      {
        type: "h2",
        text: "3. Reporting means an afternoon of copy-paste",
      },
      {
        type: "p",
        text: "If answering \"how did we do last month?\" requires stitching tabs together by hand, the data isn't structured for the questions you actually ask. A proper system answers those in a click.",
      },
      {
        type: "h2",
        text: "4. Only one person understands \"the sheet\"",
      },
      {
        type: "p",
        text: "When your operation depends on one heroic spreadsheet only one person can maintain, that's not a tool — it's a single point of failure with formulas.",
      },
      {
        type: "h2",
        text: "5. You can't automate on top of it",
      },
      {
        type: "p",
        text: "The moment you want reminders, approvals, scoring, or an AI layer on top of your data, a spreadsheet hits its ceiling. Those things want structure — defined objects, relationships, and rules — which is exactly what a custom tool or CRM gives you.",
      },
      {
        type: "quote",
        text: "You don't replace spreadsheets because they're bad. You replace them when the workarounds cost more than the system would.",
      },
      {
        type: "p",
        text: "The good news: outgrowing spreadsheets doesn't mean a two-year software project. It usually means a focused first build — the core objects and the one workflow that hurts most — that you grow from there.",
      },
    ],
  },
  {
    slug: "your-brand-is-a-system-not-a-logo",
    title: "Your Brand Is a System, Not a Logo",
    excerpt:
      "A logo is where a brand shows up, not what it is. Why the businesses that feel consistent everywhere are running a system underneath.",
    category: "Brand & Design",
    date: "2026-06-28",
    readingTime: "4 min read",
    author: "Solve Trend",
    color: "rgba(237, 100, 158, 0.8)",
    coverImage: `${HERO_CDN}/6904ca7a4abbe56dfff89585_hero-marquee-img-02.avif`,
    coverAlt: "Brand identity system",
    body: [
      {
        type: "p",
        text: "Ask most people what a brand is and they'll point at a logo. But the logo is just the most visible 1%. The brands that feel unmistakable — the ones you recognize before you read the name — are running a system underneath that makes everything they touch feel like the same company.",
      },
      {
        type: "h2",
        text: "The logo is an output, not the strategy",
      },
      {
        type: "p",
        text: "A logo designed without a strategy is a guess that looks nice. A logo designed as the expression of a clear position is a signal. The difference isn't in the mark — it's in everything that came before it: who you are, who you're for, and the one thing you want to be known for.",
      },
      {
        type: "h2",
        text: "What a brand system actually includes",
      },
      {
        type: "ul",
        items: [
          "Positioning — the gap you own in your customer's mind.",
          "Voice and tone — so you sound like one company across every channel.",
          "A visual system — type, color, and layout rules, not just a logo file.",
          "Templates — so your team stays on-brand without you in the room.",
        ],
      },
      {
        type: "p",
        text: "When those pieces exist and connect, consistency stops being something you police and starts being the path of least resistance. A new social post, a pitch deck, a landing page — they all pull from the same system, so they all feel like you.",
      },
      {
        type: "quote",
        text: "Consistency isn't discipline. It's a system that makes the on-brand choice the easy one.",
      },
      {
        type: "p",
        text: "That's also why brand work pays off downstream. Every design, ad, and even the interface of a custom tool you build later gets faster and sharper when there's a system to build from — instead of re-deciding what you look like every single time.",
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
