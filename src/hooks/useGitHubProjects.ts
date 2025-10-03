import { useEffect, useState } from "react";
import projectMeta from "../data/projectMeta";
import imageMap from "../data/projectImageMap";

const GITHUB_USERNAME = "Richard-Casey";
const API = "https://api.github.com";

// Cache for an hour to avoid hammering the API
const CACHE_KEY = "gh_repos_cache_v2";
const CACHE_TIME_KEY = "gh_repos_cache_time_v2";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1h

export type Project = {
  id: number;
  name: string;
  slug: string;
  title: string;
  description: string;
  html_url: string;
  homepage?: string | null;
  topics: string[];
  updated_at: string;
  language: string | null;
  imageUrl: string;
};

type Repo = {
  id: number;
  name: string;
  owner: { login: string };
  description: string | null;
  html_url: string;
  homepage?: string | null;
  updated_at: string;
  language: string | null;
  fork: boolean;
  archived: boolean;
  topics?: string[];
};

function displayTitleFromRepoName(rawName: string): string {
  return rawName
    .replace(/-/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .replace(/^./, (c) => c.toUpperCase());
}

async function gh<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "rcasey-website-2025", // belt-and-braces
    },
  });
  if (!res.ok) {
    const limit = res.headers.get("x-ratelimit-remaining");
    const msg =
      res.status === 403 && limit === "0"
        ? "GitHub API rate limit hit (unauthenticated). Try again later."
        : `${res.status} ${res.statusText}`;
    throw new Error(msg);
  }
  return (await res.json()) as T;
}

function localImageFor(slug: string): string {
  const explicit = imageMap[slug];
  if (explicit) return `${import.meta.env.BASE_URL}${explicit}`;
  return `${import.meta.env.BASE_URL}projects/${slug}.png`;
}

export default function useGitHubProjects(limit = 100) {
  const [repos, setRepos] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let abort = false;

    async function run() {
      setLoading(true);

      // cache
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        const at = Number(localStorage.getItem(CACHE_TIME_KEY) || "0");
        if (cached && Date.now() - at < CACHE_TTL_MS) {
          const parsed = JSON.parse(cached) as Project[];
          if (!abort) {
            setRepos(parsed);
            setLoading(false);
            return;
          }
        }
      } catch {}

      try {
        // one request only; asks for topics inline to avoid N extra calls
        const base = await gh<Repo[]>(
          `/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=${limit}&type=owner`
        );

        const filtered = base
          .filter((r) => r.owner.login === GITHUB_USERNAME)
          .filter((r) => !r.fork && !r.archived)
          .slice(0, limit);

        const mapped: Project[] = filtered.map((r) => {
          const slug = r.name.toLowerCase();
          const metaTags = projectMeta[slug]?.tags ?? [];
          // Do NOT call topics API per-repo; rely on meta tags (stable, no rate cost)
          const finalTopics = metaTags;

          const localImg = localImageFor(slug);
          const og = `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${r.name}`;
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
          };
        });

        if (!abort) {
          setRepos(mapped);
          setLoading(false);
          localStorage.setItem(CACHE_KEY, JSON.stringify(mapped));
          localStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
        }
      } catch (e) {
        console.error(e);
        // Last-resort: leave current state but stop spinner
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
