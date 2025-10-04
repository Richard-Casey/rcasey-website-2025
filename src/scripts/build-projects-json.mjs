// scripts/build-projects-json.mjs
import fs from "node:fs/promises";
import path from "node:path";

const USERNAME = "Richard-Casey";
const API = "https://api.github.com";

const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "rcasey-website-2025-prefetch",
};
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

async function jfetch(url, { swallow = false } = {}) {
  const res = await fetch(url, { headers });
  if (!res.ok) {
    const text = await res.text();
    if (swallow) return null;
    throw new Error(`${res.status} ${res.statusText} – ${text}`);
  }
  return res.json();
}

const repos = await jfetch(
  `${API}/users/${USERNAME}/repos?per_page=100&type=owner&sort=updated&direction=desc`
);

// keep only my own, not forks/archived
const base = repos
  .filter((r) => r?.owner?.login === USERNAME)
  .filter((r) => !r.fork && !r.archived);

// fetch topics for each repo
async function fetchTopics(name) {
  const data = await jfetch(`${API}/repos/${USERNAME}/${name}/topics`, {
    swallow: true,
  });
  return data?.names ?? [];
}

// map + include topics
const mapped = await Promise.all(
  base.map(async (r) => {
    const topics = await fetchTopics(r.name);
    const title = r.name
      .replace(/-/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\s+/g, " ")
      .replace(/^./, (c) => c.toUpperCase());

    return {
      id: r.id,
      name: r.name,
      slug: r.name.toLowerCase(),
      title,
      description: r.description ?? "No description provided.",
      html_url: r.html_url,
      homepage: r.homepage,
      updated_at: r.updated_at,
      language: r.language,
      topics, // <<— now included
    };
  })
);

// write JSON
const outDir = path.join(process.cwd(), "public", "data");
await fs.mkdir(outDir, { recursive: true });
const outPath = path.join(outDir, "repos.json");
await fs.writeFile(outPath, JSON.stringify(mapped, null, 2));
console.log(`Wrote ${outPath} (${mapped.length} repos)`);
