Richard Casey — 2025 Portfolio (React + Vite + TypeScript)
🎥 Cinematic Video Hero + Clean Dev-Blog Vibes

A fast, modern portfolio showcasing my work in C# / Unity / React. Built with React 19, Vite 6, TypeScript, Tailwind, and a muted/looping hero video behind the content (overlay + ~30% opacity for legibility). Project data comes from GitHub via a token-free prebuild (static JSON), so the live site never leaks secrets and never rate-limits.

Live (repo preview): https://<username>.github.io/rcasey-website-2025/

Live (custom domain): https://www.richard-casey.co.uk (when pointed)

🧠 Core Features
🎬 Video Hero (no controls, no audio, accessible)

<video autoPlay muted loop playsInline> with Tailwind overlay (bg-black/60) and object-cover.

Keyboard-safe, reduced-motion friendly.

Source: public/videos/websitesplash.mp4 (H.264, < 100 MB).

🧭 Smooth, responsive SPA

React 19 + React Router 6 (hash routing → safe refreshes on GitHub Pages).

TailwindCSS for layout/typography; Framer Motion for tasteful entrance animation.

📓 “Autopsies” (long-form write-ups)

Markdown under public/autopsies/*.md, rendered with react-markdown + remark-gfm.

Relative asset links in repo READMEs are rewritten to absolute URLs so images render.

🧾 CV view/download (zero JS hackery)

public/rcaseycv.pdf linked with import.meta.env.BASE_URL (works on Pages & custom domain).

🔒 Token-free GitHub integration

A Node prefetch script fetches repos once and writes public/data/repos.json.

The app loads that static JSON first → instant loads, no secrets, no rate limits.

🚀 One-command deploys

npm run deploy commits source (auto message if omitted), prefetches GitHub data, builds, publishes /docs, and pushes.

🔧 Tech Stack

Frontend: React 19, TypeScript, Vite 6, Tailwind 3, Framer Motion 12, GSAP

Markdown: react-markdown, remark-gfm

Tooling: ESLint 9, PostCSS/Autoprefixer

Hosting: GitHub Pages (publishing from /docs on main)

Node: 20+

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
│  │  ├─ FadeInWhenVisible.tsx   # IntersectionObserver animation
│  │  └─ ProjectCard.tsx         # project grid cards
│  ├─ pages/
│  │  ├─ Home.tsx
│  │  ├─ Projects.tsx            # grid view using the hook
│  │  ├─ ProjectDetail.tsx       # README/autopsy renderer
│  │  └─ CV.tsx
│  ├─ data/
│  │  ├─ projectMeta.ts          # curated tags/meta per repo
│  │  └─ projectImageMap.ts      # slug → local image mapping
│  ├─ hooks/
│  │  └─ useGitHubProjects.ts    # static JSON first, safe fallback
│  ├─ scripts/
│  │  └─ build-projects-json.mjs # fetches repos → public/data/repos.json
│  ├─ index.css, main.tsx, App.tsx
│  └─ vite-env.d.ts
├─ docs/                         # built app (published by GH Pages)
├─ vite.config.js                # base path + safety define
├─ package.json
└─ README.md

🧩 Key Components
Area	File	Highlights
Video Hero	src/components/Hero.tsx	Background video + overlay; content at z-10; BASE_URL-safe asset path.
Projects Grid	src/pages/Projects.tsx + ProjectCard.tsx	Maps repos to cards with curated tags and local/OG imagery.
Project Detail	src/pages/ProjectDetail.tsx	Uses local autopsy MD if present, else repo README; rewrites relative links to absolute.
GitHub Data	src/hooks/useGitHubProjects.ts	Zero token; loads /data/repos.json first; single API fallback only if missing.
Prefetch Script	src/scripts/build-projects-json.mjs	Node script; can use GITHUB_TOKEN env var locally; never bundled.
Animation	src/components/FadeInWhenVisible.tsx	Light, smooth entrance animations on intersection.
🔐 Security Wins

Removed all PATs from client code and history; refused to bypass push protection.

Prebuild JSON pipeline for GitHub data (no runtime secrets; no rate limits).

CNAME, PDF, and media in public/ so Vite → GH Pages deployment is clean.

🛠️ Local Development
# install
npm ci

# run dev
npm run dev
# => http://localhost:5173


(Optional strict type check)

npx tsc --noEmit

🧱 Build & Deploy

This repo publishes from /docs on main.

One-liners
# commit source only (auto message if none)
npm run commit
# or: npm run commit --m="update hero copy"

# build & publish /docs (live site)
npm run publish
# or: npm run publish --m="deploy: rebuild /docs"

# all-in-one: commit → prefetch → build → publish → push
npm run deploy
# or: npm run deploy --m="deploy: site update"

What they do

prefetch → runs src/scripts/build-projects-json.mjs, writes public/data/repos.json.
Optional: raise rate limit locally without exposing secrets:

$env:GITHUB_TOKEN="ghp_yourToken"; npm run prefetch; Remove-Item Env:\GITHUB_TOKEN


publish → builds, creates /docs, adds 404.html + .nojekyll, commits, pushes.

deploy → commits source (skips if no changes), prefetches, builds, publishes, pushes.

🌐 GitHub Pages + Custom Domain

Repo preview: set vite.config.js → base: '/rcasey-website-2025/'.

Custom domain: change base: '/' and add public/CNAME with www.richard-casey.co.uk.

Rebuild & publish /docs, then Settings → Pages → Custom domain + Enforce HTTPS.

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


Safe CV link

<a href={`${import.meta.env.BASE_URL}rcaseycv.pdf`} target="_blank" rel="noopener noreferrer">
  View CV
</a>


Prefetch script (server-side only)

# run once locally (optionally with a PAT)
npm run prefetch

♿ Accessibility & UX

Respect prefers-reduced-motion; consider pausing the hero for those users.

Overlay ensures color contrast stays WCAG-friendly.

Keyboard navigation is focus-visible and reachable.

Hash routing prevents 404s on refresh under GitHub Pages.

⚡ Performance Notes

Keep hero video ~10–20 s, H.264 MP4, 720p, ~2–4 Mbps; add a poster for dark first frames.

Vite warns >500 kB chunks → future: route-level code-splitting with dynamic import().

All public assets resolve via import.meta.env.BASE_URL to work in both hosting modes.

🧪 Outcomes

Secure, token-free GitHub integration that won’t break under API limits.

Clean GH Pages SPA setup (hash routing + 404 fallback).

Cinematic, performant hero without sacrificing readability.

Single-command deployments for consistent releases.

🛣️ Roadmap

Route-level code splitting.

Reduced-motion opt-out toggle.

Nightly CI to refresh repos.json.

OG image generation for project pages.

📄 License

Personal portfolio. Content & media © Richard Casey. Code snippets MIT-friendly unless noted.