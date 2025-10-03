import { useEffect, useState } from "react";
import projectMeta from "../data/projectMeta";
import imageMap from "../data/projectImageMap";

const GITHUB_USERNAME = "Richard-Casey";
const API = "https://api.github.com";
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

// Optional: only show repos with this topic. Set to null to show all.
const INCLUDE_ONLY_TOPIC: string | null = null; // e.g. "portfolio"

export type Project = {
  id: number;
  name: string;          // repo name (raw)
  slug: string;
  title: string;         // nice display title
  description: string;
  html_url: string;      // GitHub link
  homepage?: string | null; // live demo
  topics: string[];      // GitHub topics OR fallback meta tags
  updated_at: string;
  language: string | null;
  imageUrl: string;      // mapped image OR OG preview OR placeholder
};

type Repo = {
  id: number;
  slug: string;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage?: string | null;
  updated_at: string;
  language: string | null;
  fork: boolean;
  archived: boolean;
  owner: { login: string };
};

type TopicsResponse = { names: string[] };

function displayTitleFromRepoName(rawName: string): string {
  // Keep exceptions as-is; otherwise prettify hyphens and camelCase
  return rawName
    .replace(/-/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .replace(/^./, (c) => c.toUpperCase());
}

async function gh<T>(path: string): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  const res = await fetch(`${API}${path}`, { headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText} – ${text}`);
  }
  return (await res.json()) as T;
}

async function fetchRepoTopics(owner: string, repo: string): Promise<string[]> {
  try {
    const data = await gh<TopicsResponse>(`/repos/${owner}/${repo}/topics`);
    return data?.names ?? [];
  } catch {
    return [];
  }
}

function localImageFor(slug: string): string {
  const explicit = imageMap[slug];
  if (explicit) return `${import.meta.env.BASE_URL}${explicit}`;

  // fallback to a conventional path if file exists; we can’t stat in browser,
  // so just return it and rely on <img onError> to swap to placeholder.
  return `${import.meta.env.BASE_URL}projects/${slug}.png`;
}

export default function useGitHubProjects(limit = 100) {
  const [repos, setRepos] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let abort = false;

    async function run() {
      setLoading(true);

      // Cache (10 minutes)
      const cached = localStorage.getItem("gh_repos_cache");
      const cachedAt = Number(localStorage.getItem("gh_repos_cache_time") || "0");
      const fresh = cached && Date.now() - cachedAt < 10 * 60 * 1000;

      if (fresh) {
        try {
          const parsed = JSON.parse(cached!) as Project[];
          if (!abort) {
            setRepos(parsed);
            setLoading(false);
            return;
          }
        } catch {}
      }

      try {
        const base = await gh<Repo[]>(
          `/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=${limit}`
        );

        // Filter & sort
        const filtered = base
          .filter((r) => r.owner.login === GITHUB_USERNAME)
          .filter((r) => !r.fork && !r.archived)
          .slice(0, limit);

        // Get topics for each repo
        const enriched = await Promise.all(
          filtered.map(async (r) => {
            const topics = await fetchRepoTopics(r.owner.login, r.name);
            const slug = r.name.toLowerCase();

            // Optional: include-only topic filter
            if (INCLUDE_ONLY_TOPIC && !topics.includes(INCLUDE_ONLY_TOPIC)) {
              return null;
            }

            // Merge meta tags if GitHub topics are empty
            const metaTags = projectMeta[slug]?.tags ?? [];
            const finalTopics = topics.length ? topics : metaTags;

            // Image priority: mapped local -> conventional local -> GitHub OG
            const localImg = localImageFor(slug);
            const og = `https://opengraph.githubassets.com/1/${r.owner.login}/${r.name}`;
            // We’ll set local first and let <img onError> fall back to placeholder
            const imageUrl = localImg || og;

            return {
              id: r.id,
              slug,
              name: r.name,
              title: displayTitleFromRepoName(r.name),
              description: r.description ?? "No description provided.",
              html_url: r.html_url,
              homepage: r.homepage,
              topics: finalTopics,
              updated_at: r.updated_at,
              language: r.language,
              imageUrl,
            } as Project;
          })
        );

        const clean = enriched.filter(Boolean) as Project[];
        if (!abort) {
          setRepos(clean);
          setLoading(false);
          localStorage.setItem("gh_repos_cache", JSON.stringify(clean));
          localStorage.setItem("gh_repos_cache_time", String(Date.now()));
        }
      } catch (e) {
        console.error(e);
        if (!abort) setLoading(false);
      }
    }

    run();
    return () => {
      abort = true;
    };
  }, [limit]);

  return { repos, loading };
}
