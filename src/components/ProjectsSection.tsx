import useGitHubProjects from "../hooks/useGitHubProjects";
import ProjectCard from "./ProjectCard";
import projectMeta from "../data/projectMeta";

export default function ProjectsSection() {
  const { repos, loading } = useGitHubProjects(100);

  const latest = repos
    .slice(0, 3) // newest 3 projects
    .map((p) => ({
      ...p,
      ...projectMeta[p.slug], // merge in overrides (tags, autopsy, etc.)
    }));

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold mb-12 text-center text-brand-text">
        Latest Projects
      </h2>

      {loading ? (
        <div className="grid md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 rounded-lg bg-brand-gray animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {latest.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}

      <div className="text-center mt-12">
        <a
          href="/#/projects"
          className="px-6 py-3 border border-brand-accent text-brand-accent rounded hover:bg-brand-accent hover:text-black transition"
        >
          All Projects
        </a>
      </div>
    </section>
  );
}
