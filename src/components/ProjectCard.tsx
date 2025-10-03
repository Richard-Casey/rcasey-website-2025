import { Link } from "react-router-dom";
import type { Project } from "../hooks/useGitHubProjects";

export default function ProjectCard({ project }: { project: Project }) {
  const date = new Date(project.updated_at).toLocaleDateString();

  return (
    <Link to={`/projects/${project.slug}`} className="group block h-full">
      <div
        className="
    relative bg-brand-gray border border-white/60 rounded-lg overflow-hidden
    shadow transition
    hover:-translate-y-1 hover:shadow-lg
    bg-gradient-to-b from-brand-gray to-brand-gray
    group-hover:from-brand-gray group-hover:to-[#1e4e7a]   /* pale blue gradient on hover */
    flex flex-col h-full
  "
      >
        {/* Text */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-brand-text mb-2">
            {project.title}
          </h3>
          <p className="text-brand-subtext text-sm mb-4 flex-grow">
            {project.description || "No description provided."}
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-2">
            {project.topics.length > 0 ? (
              project.topics.map((tag) => (
                <span
                  key={tag}
                  className="bg-brand-black/40 text-brand-accent text-xs px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-xs text-brand-subtext">No topics</span>
            )}
          </div>

          <div className="text-xs text-brand-subtext">Updated: {date}</div>
        </div>

        {/* Image (always pinned to bottom) */}
        <div className="px-4 pb-4 mt-auto">
          <div className="border border-white/60 rounded-md overflow-hidden">
            <img
              src={project.imageUrl}
              alt={`${project.title} preview`}
              className="w-full h-40 object-cover"
              loading="lazy"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = `${
                  import.meta.env.BASE_URL
                }projects/placeholder.png`;
              }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="px-4 pb-4 flex gap-3 justify-center">
          <a
            href={project.html_url}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            className="px-4 py-2 border border-brand-accent text-brand-accent rounded hover:bg-brand-accent hover:text-black transition"
          >
            GitHub
          </a>
          {project.homepage ? (
            <a
              href={project.homepage}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="px-4 py-2 border border-brand-accent text-brand-accent rounded hover:bg-brand-accent hover:text-black transition"
            >
              Live
            </a>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
