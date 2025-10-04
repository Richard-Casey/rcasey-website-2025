// scripts/build-projects-json.mjs
import fs from "node:fs/promises";
import path from "node:path";

const USERNAME = "Richard-Casey";
const API = `https://api.github.com/users/${USERNAME}/repos?per_page=100&type=owner&sort=updated&direction=desc`;

const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "rcasey-website-2025-prefetch",
};
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

const res = await fetch(API, { headers });
if (!res.ok) {
  const text = await res.text();
  throw new Error(`GitHub API error ${res.status} ${res.statusText}: ${text}`);
}

const data = await res.json();

// keep only owner, not forks/archived
const filtered = data
  .filter(r => r?.owner?.login === USERNAME)
  .filter(r => !r.fork && !r.archived);

const mapped = filtered.map(r => ({
  id: r.id,
  name: r.name,
  slug: r.name.toLowerCase(),
  title: r.name
    .replace(/-/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .replace(/^./, c => c.toUpperCase()),
  description: r.description ?? "No description provided.",
  html_url: r.html_url,
  homepage: r.homepage,
  updated_at: r.updated_at,
  language: r.language,
  // topics omitted on purpose; frontend can add meta tags
}));

const outDir = path.join(process.cwd(), "public", "data");
await fs.mkdir(outDir, { recursive: true });
const outPath = path.join(outDir, "repos.json");
await fs.writeFile(outPath, JSON.stringify(mapped, null, 2));
console.log(`Wrote ${outPath} (${mapped.length} repos)`);
