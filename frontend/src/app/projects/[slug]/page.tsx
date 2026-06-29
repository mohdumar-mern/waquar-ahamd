import { notFound } from "next/navigation";
import { generateMetadata as genMeta } from "@/lib/seo/metadata";
import { api } from "@/utils/api";
import type { ApiResponse } from "@/types/api.types";
import type { Project } from "@/types/project.types";
import { apiConfig } from "@/config/api.config";
import { siteConfig } from "@/config/site.config";

interface Props { params: { slug: string } }

// Dynamic metadata per project — great for SEO
export async function generateMetadata({ params }: Props) {
  try {
    const res = await api<ApiResponse<Project>>(`${apiConfig.endpoints.projects}/${params.slug}`);
    const p   = res.data;
    return genMeta({
      title      : p.metaTitle || p.title,
      description: p.metaDesc  || p.description.slice(0, 160),
      image      : p.thumbnail?.url,
      keywords   : [p.category, ...p.tools],
    });
  } catch {
    return genMeta({ title: "Project Not Found" });
  }
}

// Pre-generate static paths at build time
export async function generateStaticParams() {
  try {
    const res = await api<{ data: { data: Project[] } }>(apiConfig.endpoints.projects);
    return res.data.data.map(p => ({ slug: p.slug }));
  } catch { return []; }
}

export default async function ProjectPage({ params }: Props) {
  let project: Project;
  try {
    const res = await api<ApiResponse<Project>>(`${apiConfig.endpoints.projects}/${params.slug}`);
    project = res.data;
  } catch { notFound(); }

  return (
    <article className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        {/* Breadcrumb */}
        <nav className="text-xs tracking-widest text-racing-red mb-12">
          <a href="/">HOME</a> / <a href="/projects">PROJECTS</a> / <span className="text-white/50">{project.title.toUpperCase()}</span>
        </nav>

        <header className="mb-16">
          <p className="text-xs tracking-[6px] text-racing-red mb-4">{project.category.toUpperCase()} · {project.year}</p>
          <h1 className="text-5xl lg:text-7xl font-black uppercase leading-tight mb-6">{project.title}</h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl">{project.description}</p>
        </header>

        {/* Thumbnail */}
        {project.thumbnail?.url && (
          <div className="aspect-video bg-zinc-900 mb-16 border border-white/5">
            <img src={project.thumbnail.url} alt={project.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Tools */}
        {project.tools.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs tracking-[6px] text-racing-red mb-6">TOOLS USED</h2>
            <div className="flex flex-wrap gap-3">
              {project.tools.map(t => (
                <span key={t} className="px-4 py-2 border border-white/10 text-xs tracking-widest text-white/60">{t}</span>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
