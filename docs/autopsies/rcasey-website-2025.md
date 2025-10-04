Richard Casey — 2025 Portfolio (React + Vite + TypeScript)
🎥 Cinematic Video Hero + Clean Dev Blog Vibes

A fast, modern portfolio site showcasing my work in C# / Unity / React. Built with React 19, Vite 6, TypeScript, Tailwind, and a muted/looping hero video sitting elegantly behind content (overlayed to ~30% perceived opacity for legibility). Projects are pulled from GitHub using a secure, token-free pipeline: a prebuild script generates static JSON, so the live site never leaks secrets or hits rate limits.

Live (GitHub Pages): https://<username>.github.io/rcasey-website-2025/ (repo preview)

Live (Custom domain): https://www.richard-casey.co.uk (when pointed)

🧠 Core Features
🎬 Video Hero (No Controls, No Audio, Accessible)

Autoplay, loop, muted, playsInline with an overlay (bg-black/60) and CSS opacity via Tailwind classes.

Scales full-bleed (object-cover) and is keyboard + reduced-motion aware (see A11y notes).

Hosted under public/videos/websitesplash.mp4 (lightweight, <100 MB, H.264).

🧭 Smooth, Responsive Single-Page App

React 19 + React Router 6 (hash-based routing for safe GH Pages refreshes).

TailwindCSS for fast, consistent styling and layout.

Framer Motion + IntersectionObserver (“FadeInWhenVisible”) for tasteful animations.

📂 “Autopsies” — Long-Form Project Write-ups

Markdown autopsies stored under public/autopsies/*.md, rendered with react-markdown + remark-gfm.

Auto-rewrites of relative asset links in project READMEs to absolute URLs (so images show properly).

🧾 CV View/Download (Zero JS Trickery)

public/rcaseycv.pdf, linked via import.meta.env.BASE_URL so it works both on GH Pages and a custom domain.

🔒 Token-Free GitHub Projects Integration

No client tokens. No secret headers.

A Node prebuild script fetches my repos once and writes public/data/repos.json.

The app loads that static JSON first. Result: instant loads, no rate limits, no secrets in bundles.

🚀 One-Command Deploys

npm run deploy → commits source (with an auto message if you omit one), prefetches GitHub data, builds, publishes /docs, pushes.

🔧 Tech Stack

Frontend: React 19, TypeScript, Vite 6, Tailwind 3, Framer Motion 12, GSAP

Markdown: react-markdown, remark-gfm

Tooling: ESLint 9, PostCSS/Autoprefixer

Hosting: GitHub Pages (publishing from /docs on main)

Node: 20+ recommended

📁 Project Structure (trimmed)
rcasey-website-2025/
├─ public/
│  ├─ autopsies/                 # long-form write-ups
│  ├─ projects/                  # fallback images
│  ├─ videos/websitesplash.mp4   # hero background video
│  ├─ data/repos.json            # prebuilt GitHub repo data
│  ├─ CNAME                      # set when using custom domain
│  └─ rcaseycv.pdf               # CV (view/download)
├─ src/
│  ├─ components/
│  │  ├─ Hero.tsx                # video hero with overlay + buttons
│  │  ├─ Navbar.tsx, FooterSection.tsx
│  │  ├─ FadeInWhenVisible.tsx   # intersection observer animation
│  │  └─ ProjectCard.tsx         # card layout for projects grid
│  ├─ pages/
│  │  ├─ Home.tsx
│  │  ├─ Projects.tsx            # grid view pulling from hook
│  │  ├─ ProjectDetail.tsx       # README/autopsy renderer
│  │  └─ CV.tsx
│  ├─ data/
│  │  ├─ projectMeta.ts          # curated tags/meta per repo
│  │  └─ projectImageMap.ts      # slug → local image mapping
│  ├─ hooks/
│  │  └─ useGitHubProjects.ts    # static JSON first, safe fallback
│  ├─ scripts/
│  │  └─ build-projects-json.mjs # prefetches repos → public/data/repos.json
│  ├─ index.css, main.tsx, App.tsx
│  └─ vite-env.d.ts
├─ docs/                         # built app (published by GH Pages)
├─ vite.config.js                # base path + safety define
├─ package.json
└─ README.md

🧩 Key Components Overview
Area	File	Highlights
Video Hero	src/components/Hero.tsx	<video autoPlay muted loop playsInline> background with overlay (bg-black/60), content stacked at z-10, buttons use BASE_URL-safe links.
Project Grid	src/pages/Projects.tsx + ProjectCard.tsx	Renders mapped repos with curated tags and local/OG images; graceful fallbacks.
Project Detail	src/pages/ProjectDetail.tsx	Loads local autopsy MD if present, otherwise fetches repo README; rewrites relative URLs to absolute so images render reliably.
GitHub Data	src/hooks/useGitHubProjects.ts	Zero token. Tries BASE_URL + data/repos.json first, then a single GitHub API call as fallback. Caches sensibly.
Prefetch Script	src/scripts/build-projects-json.mjs	Node script that fetches repos (optionally with PAT via env var) and writes public/data/repos.json. Keeps secrets out of client bundles.
Animations	src/components/FadeInWhenVisible.tsx	IntersectionObserver-driven entrance animations; lightweight, smooth.
Styling	Tailwind (various)	Thoughtful typography via @tailwindcss/typography; consistent color tokens (text-brand-*).
🔐 Security Notes (What I Did Right)

Removed all Personal Access Tokens from client code and commit history.

Refused to bypass GitHub’s push protection. Fixed the issue properly.

Switched to a prebuild JSON pipeline for GitHub data.

Kept CNAME, PDFs, and media in public/ so they deploy via Vite → GH Pages cleanly.

🛠️ Local Development
# install
npm ci

# run dev server
npm run dev
# http://localhost:5173

# type-check (if you want strict runs)
# npx tsc --noEmit

🧱 Build & Deploy

This repo publishes from /docs on main.

One-liners
# commit source only (auto message if none provided)
npm run commit
# or: npm run commit --m="update hero copy"

# build & publish /docs (live site)
npm run publish
# or: npm run publish --m="deploy: rebuild /docs"

# all-in-one: commit → prefetch → build → publish → push
npm run deploy
# or: npm run deploy --m="deploy: site update"

What the scripts do

prefetch: runs src/scripts/build-projects-json.mjs → writes public/data/repos.json.

Optional: GITHUB_TOKEN as a one-off env var to raise rate limits for the script (not committed, not bundled):

$env:GITHUB_TOKEN="ghp_yourToken"; npm run prefetch; Remove-Item Env:\GITHUB_TOKEN


publish: builds with Vite, generates docs/ + 404.html + .nojekyll, commits, pushes.

deploy: commits source (skip if no changes), runs prefetch, builds, publishes /docs, pushes.

🌐 GitHub Pages + Custom Domain

Repo preview (project page): Set vite.config.js → base: '/rcasey-website-2025/'.

Custom domain: Change base: '/' and add public/CNAME with www.richard-casey.co.uk.

Rebuild and publish to /docs, then set Settings → Pages → Custom domain and Enforce HTTPS.

DNS: CNAME www → richard-casey.github.io (apex can forward or use A records).

🧩 Implementation Snippets
Video Hero (background)
<section className="relative w-screen max-w-full overflow-x-hidden h-[90vh] flex items-center justify-center text-center">
  <video
    className="absolute inset-0 w-full h-full object-cover opacity-30"
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    src={`${import.meta.env.BASE_URL}videos/websitesplash.mp4`}
  />
  <div className="absolute inset-0 bg-black/60" />
  <div className="relative z-10 px-6">
    <h1 className="text-5xl font-bold mb-4 text-brand-text">Hi, I'm Richard Casey</h1>
    <p className="text-xl text-brand-subtext mb-8">Software Developer — C# / Unity / React</p>
    {/* buttons */}
  </div>
</section>

Safe CV Link
<a href={`${import.meta.env.BASE_URL}rcaseycv.pdf`} target="_blank" rel="noopener noreferrer">
  View CV
</a>

Prefetch Script (server-side only)
# run once locally (optionally with a PAT)
npm run prefetch

♿ Accessibility & UX

Reduced Motion: respect prefers-reduced-motion; consider pausing hero video and falling back to a static poster for those users.

Color/Contrast: hero overlay ensures text ratio remains WCAG-friendly over video.

Keyboard Navigation: interactive elements reachable and focus-visible.

Hash Routing: refreshes on deep routes won’t 404 on GH Pages.

⚡ Performance Notes

Video: keep under ~10–20 s, H.264 MP4, 720p, ~2–4 Mbps; set a poster image if first frame is dark.

Code: Vite warns about >500 kB chunks; future work: split routes with dynamic import() for lower initial JS.

Assets: all public assets resolve via import.meta.env.BASE_URL to work on both preview and custom domain.

🧪 Development Goals & Outcomes

Built a secure, token-free GitHub integration that won’t break under API limits.

Cleanly solved GH Pages SPA problems (hash routing + 404 fallback).

Implemented a cinematic, performant video hero without sacrificing readability.

Added single-command deploy scripts for repeatable, fast releases.

🛣️ Roadmap / Future Ideas

Dynamic route-level code splitting for faster first paint.

“Prefers-reduced-motion” video opt-out toggle.

Add a lightweight RSS/JSON feed for autopsies.

CI to auto-refresh repos.json nightly via GitHub Actions.

Inline OG image generation for project pages.

📄 License

Personal portfolio. Content & media © Richard Casey. Code snippets MIT-friendly unless stated otherwise.

If you’re reviewing this as a hiring manager: this site demonstrates my ability to design for production constraints, ship securely, and automate clean deployments—with an eye on UX polish and developer ergonomics.