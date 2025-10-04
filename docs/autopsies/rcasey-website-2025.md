# Richard Casey — 2025 Portfolio (React + Vite + TypeScript)

**A production-ready portfolio** showcasing my work in **C# / Unity / React**.  
Built with **React 19, Vite 6, TypeScript, Tailwind**, and a **cinematic, muted, looping video hero** rendered behind the content (overlayed for contrast).  
Projects are sourced from GitHub via a **token-free prebuild** (static JSON), so the live site never leaks secrets and never hits rate limits.

- **Live (GitHub Pages):** https://richard-casey.github.io/rcasey-website-2025/  
- **Custom domain (when pointed):** https://www.richard-casey.co.uk

---

## 🧠 Core Features

### 🎬 Video Hero (no controls, no audio, accessible)
- `<video autoPlay muted loop playsInline>` background with Tailwind overlay (`bg-black/60`) for legibility.
- Scales full-bleed with `object-cover`. Keyboard-safe and reduced-motion friendly.
- Source: `public/videos/websitesplash.mp4` (H.264, < 100 MB), produced & compressed specifically for web.

### 🧭 Responsive SPA with clean routing
- **React 19 + React Router 6** using **hash routing** → refresh-safe on GitHub Pages.
- **TailwindCSS** for consistent, scalable styling; **Framer Motion** for tasteful entrance animations.

### 📓 “Autopsies” (deep-dive write-ups)
- Markdown files in `public/autopsies/*.md`, rendered via `react-markdown` + `remark-gfm`.
- When a project has no local autopsy, the site fetches the repo README and **rewrites relative links** so images render correctly.

### 🧾 CV View + Download
- `public/rcaseycv.pdf` linked with `import.meta.env.BASE_URL` so it works on Pages **and** a custom domain without code changes.

### 🔒 Token-free GitHub integration
- A Node **prefetch script** calls the GitHub API **once** at build-time and writes `public/data/repos.json`.
- The site loads that JSON first → **instant page loads, no runtime tokens, no rate limiting**.

### 🚀 One-command deploys
- `npm run deploy` → commit source (auto message if omitted), prefetch GitHub data, build, publish to `/docs`, push.

---

## 🔧 Tech Stack

- **Frontend:** React 19, TypeScript, Vite 6, Tailwind 3, Framer Motion 12, GSAP  
- **Markdown:** `react-markdown`, `remark-gfm`  
- **Tooling:** ESLint 9, PostCSS/Autoprefixer  
- **Hosting:** GitHub Pages (publishing from `/docs` on `main`)  
- **Node:** 20+

---

## 📁 Project Structure (trimmed)

```text
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
│  │  └─ useGitHubProjects.ts    # static JSON first, single-API fallback
│  ├─ scripts/
│  │  └─ build-projects-json.mjs # fetches repos → public/data/repos.json
│  ├─ index.css, main.tsx, App.tsx
│  └─ vite-env.d.ts
├─ docs/                         # built app (published by GH Pages)
├─ vite.config.js                # base path + safety define
├─ package.json
└─ README.md
```

---

## 🧩 Key Components Overview

| Area | File | Highlights |
| --- | --- | --- |
| Video Hero | `src/components/Hero.tsx` | Background video + overlay; content at `z-10`; BASE_URL-safe asset paths. |
| Projects Grid | `src/pages/Projects.tsx` + `ProjectCard.tsx` | Curated tags, local/OG imagery, graceful fallbacks. |
| Project Detail | `src/pages/ProjectDetail.tsx` | Local autopsy MD if present, else README; rewrites relative links to absolute. |
| GitHub Data | `src/hooks/useGitHubProjects.ts` | **Zero token** at runtime; loads `/data/repos.json` first; single API fallback if missing. |
| Prefetch Script | `src/scripts/build-projects-json.mjs` | Node script; can use `GITHUB_TOKEN` env var locally; never bundled in client. |
| Animation | `src/components/FadeInWhenVisible.tsx` | Light, smooth entrance animations via IntersectionObserver. |

---

## 🔐 Security Wins

- **No PATs** in client code or history; didn’t bypass push protection — fixed it properly.  
- **Prebuild JSON pipeline** eliminates runtime secrets and prevents rate-limit failures.  
- Static assets (CNAME, PDFs, video) live in `public/` for predictable Vite → GH Pages deploys.

---

## 🛠️ Local Development

```bash
# install
npm ci

# run dev server
npm run dev
# => http://localhost:5173
```

*(Optional strict type-check)*

```bash
npx tsc --noEmit
```

---

## 🧱 Build & Deploy

This repo publishes from **`/docs` on `main`**.

### One-liners

```bash
# commit source only (auto message if none)
npm run commit
# or: npm run commit --m="update hero copy"

# build & publish /docs (live site)
npm run publish
# or: npm run publish --m="deploy: rebuild /docs"

# all-in-one: commit → prefetch → build → publish → push
npm run deploy
# or: npm run deploy --m="deploy: site update"
```

### What these do

- **prefetch** → runs `src/scripts/build-projects-json.mjs`, writes `public/data/repos.json`.  
  Optional: raise rate limits locally **without exposing secrets**:
  ```powershell
  $env:GITHUB_TOKEN="ghp_yourToken"; npm run prefetch; Remove-Item Env:\GITHUB_TOKEN
  ```
- **publish** → builds, creates `/docs`, adds `404.html` + `.nojekyll`, commits, pushes.  
- **deploy** → commits source (skips if unchanged), prefetches, builds, publishes, pushes.

---

## 🌐 GitHub Pages + Custom Domain

- **Repo preview:** set `vite.config.js` → `base: '/rcasey-website-2025/'`.  
- **Custom domain:** change `base: '/'` and add `public/CNAME` with `www.richard-casey.co.uk`.  
- Rebuild & publish to `/docs`, then **Settings → Pages → Custom domain** and **Enforce HTTPS**.  
- DNS: `CNAME www → richard-casey.github.io` (apex can forward or use A records).

---

## 🧩 Implementation Snippets

**Video hero (background)**

```tsx
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
```

**Safe CV link**

```tsx
<a href={`${import.meta.env.BASE_URL}rcaseycv.pdf`} target="_blank" rel="noopener noreferrer">
  View CV
</a>
```

**Prefetch (server-side only)**

```bash
# run once locally (optionally with a PAT)
npm run prefetch
```

---

## ♿ Accessibility & UX

- Honor `prefers-reduced-motion`; consider pausing the hero for those users.  
- Overlay keeps contrast **WCAG**-friendly.  
- Keyboard navigation is reachable and focus-visible.  
- Hash routing prevents 404s on refresh under GitHub Pages.

---

## ⚡ Performance Notes

- Keep the hero video ~10–20 s, H.264 MP4, 720p, ~2–4 Mbps; add a `poster` for dark first frames.  
- Vite warns >500 kB chunks → next step: route-level code splitting with dynamic `import()`.  
- All public assets resolve via `import.meta.env.BASE_URL` to work in both hosting modes.

---

## 🧪 Outcomes

- **Secure**, token-free GitHub integration that won’t break under API limits.  
- Clean GH Pages SPA setup (hash routing + 404 fallback).  
- Cinematic, performant hero without sacrificing readability.  
- Single-command deployments for consistent releases.

---

## 🛣️ Roadmap

- Route-level code splitting.  
- Reduced-motion opt-out toggle.  
- Nightly CI to refresh `repos.json`.  
- OG image generation for project pages.

---

## 📄 License

Personal portfolio. Content & media © Richard Casey. Code snippets MIT-friendly unless noted.
