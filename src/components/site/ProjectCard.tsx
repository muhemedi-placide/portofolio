import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { GalleryItem } from "@/content/site";
import { useLang, useT } from "@/i18n/context";
import { translate } from "@/i18n/translations";

export function ProjectCard({ project }: { project: GalleryItem }) {
  const { lang } = useLang();
  const t = useT();
  return (
    <Link to="/galerie/$slug" params={{ slug: project.slug }} className="project-link group block">
      <div className="project-preview">
        <img src={project.image} alt={project.title} loading="lazy" width={1200} height={750} />
      </div>
      <div className="pt-5">
        <div className="flex items-center justify-between gap-3 text-[11px] text-muted-foreground">
          <span>{translate(project.category, lang)}</span>
          <span>{project.year}</span>
        </div>
        <div className="mt-2 flex items-start justify-between gap-4">
          <h3 className="max-w-md text-lg font-semibold leading-snug md:text-xl">
            {project.title}
          </h3>
          <ArrowUpRight
            size={21}
            className="mt-1 shrink-0 text-brand-green transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{project.description}</p>
        <span className="sr-only">{t("Voir le projet", "View project")}</span>
      </div>
    </Link>
  );
}
