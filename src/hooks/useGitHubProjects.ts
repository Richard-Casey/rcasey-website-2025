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

// Shape we expect in public/data/repos.json (prefetch output)
type JSONRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage?: string | null;
  updated_at: string;
  language: string | null;
  topics?: string[];
  slug?: string;   // may exist in JSON, but we compute anyway
  title?: string;  // may exist in JSON, but we compute anyway
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
      "User-Agent": "rcasey-website-2025",
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

function mapToProjectLike(
  raw: Pick<Repo, "id" | "name" | "description" | "html_url" | "homepage" | "updated_at" | "language"> & { topics?: string[] }
): Project {
  const slug = raw.name.toLowerCase();
  const metaTags = projectMeta[slug]?.tags ?? [];
  const rawTopics = (raw.topics ?? []).map((t) => t.trim()).filter(Boolean);
  const finalTopics = rawTopics.length ? rawTopics : metaTags;

  const localImg = localImageFor(slug);
  const og = `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${raw.name}`;
  const imageUrl = localImg || og;

  return {
    id: raw.id,
    slug,
    name: raw.name,
    title: displayTitleFromRepoName(raw.name),
    description: raw.description ?? "No description provided.",
    html_url: raw.html_url,
    homepage: raw.homepage,
    topics: finalTopics,
    updated_at: raw.updated_at,
    language: raw.language,
    imageUrl,
  };
}

export default function useGitHubProjects(limit = 100) {
  const [repos, setRepos] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let abort = false;

    async function fromStaticJson(): Promise<Project[] | null> {
      try {
        // cache-bust to avoid stale GH Pages/CDN
        const url = `${import.meta.env.BASE_URL}data/repos.json?ts=${Date.now()}`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) return null;
        const list = (await res.json()) as JSONRepo[];
        const mapped = list.map((r) =>
          mapToProjectLike({
            id: r.id,
            name: r.name,
            description: r.description,
            html_url: r.html_url,
            homepage: r.homepage,
            updated_at: r.updated_at,
            language: r.language,
            topics: r.topics ?? [],
          })
        );
        return mapped.slice(0, limit);
      } catch {
        return null;
      }
    }

    async function fromGitHubApi(): Promise<Project[] | null> {
      try {
        const base = await gh<Repo[]>(
          `/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=${limit}&type=owner`
        );

        const filtered = base
          .filter((r) => r.owner.login === GITHUB_USERNAME)
          .filter((r) => !r.fork && !r.archived)
          .slice(0, limit);

        // NOTE: /users/:user/repos doesn't include topics; we rely on projectMeta for those here.
        const mapped = filtered.map((r) =>
          mapToProjectLike({
            id: r.id,
            name: r.name,
            description: r.description,
            html_url: r.html_url,
            homepage: r.homepage,
            updated_at: r.updated_at,
            language: r.language,
            topics: r.topics ?? [], // likely empty from this endpoint
          })
        );

        return mapped;
      } catch {
        return null;
      }
    }

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

      // 1) Prefer prebuilt JSON (contains topics)
      let data = await fromStaticJson();

      // 2) Fallback to GitHub API (topics will come from projectMeta)
      if (!data || data.length === 0) {
        data = await fromGitHubApi();
      }

      if (!abort && data) {
        setRepos(data);
        setLoading(false);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(data));
          localStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
        } catch {}
      } else if (!abort) {
        setLoading(false);
      }
    }

    run();
    return () => {
      abort = true;
    };
  }, [limit]);

  return { repos, loading };
}
