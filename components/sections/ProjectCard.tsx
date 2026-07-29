import Image from "next/image";
import { Code2, ExternalLink } from "lucide-react";
import { YoutubeIcon } from "@/components/ui/SocialIcons";
import type { Project, ProjectLinkType } from "./projects";

function ProjectLinkIcon({ type }: { type: ProjectLinkType }) {
  if (type === "github") return <Code2 aria-hidden="true" className="size-4" />;
  if (type === "youtube") return <YoutubeIcon aria-hidden="true" className="size-4" />;
  return <ExternalLink aria-hidden="true" className="size-4" />;
}

const categoryStyles: Record<Project["category"], { badge: string; tag: string; label: string }> = {
  personal: {
    badge: "border-purple-400/20 bg-purple-500/20 text-purple-200",
    tag: "border-purple-400/15 bg-purple-500/15 text-purple-200/80",
    label: "Personal",
  },
  forclients: {
    badge: "border-emerald-400/20 bg-emerald-500/20 text-emerald-200",
    tag: "border-sky-400/15 bg-sky-500/15 text-sky-200/80",
    label: "For Clients",
  },
};

const VISIBLE_TAG_LIMIT = 5;

export function ProjectCard({ project, duplicate = false }: { project: Project; duplicate?: boolean }) {
  const category = categoryStyles[project.category];
  const visibleTags = project.tags.slice(0, VISIBLE_TAG_LIMIT);
  const remainingTags = project.tags.length - visibleTags.length;

  return (
    <article className="flex w-[82vw] max-w-[390px] shrink-0 self-start flex-col rounded-[28px] border border-white/10 bg-black/35 p-4 pb-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:w-[58vw] md:w-[42vw] md:p-5 md:pb-9 lg:w-[28vw] xl:w-[390px]">
      <div className="aspect-[16/9] shrink-0 overflow-hidden rounded-2xl bg-white p-5">
        <div className="relative size-full">
          <Image
            src={project.image}
            alt={duplicate ? "" : `${project.title} project`}
            fill
            sizes="(min-width: 1280px) 350px, (min-width: 1024px) 25vw, (min-width: 768px) 38vw, (min-width: 640px) 54vw, 74vw"
            className={project.imageFit === "cover" ? "object-cover" : "object-contain"}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col">
        <div>
          <span className={`inline-flex rounded-full border px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.12em] uppercase ${category.badge}`}>
            {category.label}
          </span>
          <h3 className="mt-3 text-2xl leading-[1.05] font-semibold tracking-[-0.035em] text-white">
            {project.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/58">{project.description}</p>
        </div>

        <div className="pt-5">
          <ul className="flex flex-wrap gap-1.5" aria-label={`${project.title} technologies`}>
            {visibleTags.map((tag) => (
              <li key={tag} className={`rounded-full border px-2.5 py-1 text-[0.68rem] ${category.tag}`}>
                {tag}
              </li>
            ))}
            {remainingTags > 0 && (
              <li className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[0.68rem] text-white/55">
                +{remainingTags}
              </li>
            )}
          </ul>

          {project.links.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={duplicate ? -1 : undefined}
                  aria-label={`${link.label}: ${project.title}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-2 text-sm text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-violet-300"
                >
                  <ProjectLinkIcon type={link.type} />
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
