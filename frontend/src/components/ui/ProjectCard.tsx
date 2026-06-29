"use client";
import { useState } from "react";
import type { Project } from "@/types/project.types";
import { cn } from "@/utils/cn";

interface ProjectCardProps {
  project: Project;
  index  : number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`/projects/${project.slug}`}
      className={cn(
        "group block bg-[#070707] border transition-all duration-400 overflow-hidden",
        hovered ? "border-racing-red bg-[#0d0000]" : "border-white/5"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-gradient-to-br from-[#0d0000] to-[#1a0000] relative overflow-hidden border-b border-white/5">
        {project.thumbnail?.url ? (
          <img
            src={project.thumbnail.url}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-5xl opacity-30">🏁</div>
        )}
        {/* Hover overlay */}
        <div className={cn(
          "absolute inset-0 bg-racing-red/10 flex items-center justify-center transition-opacity duration-300",
          hovered ? "opacity-100" : "opacity-0"
        )}>
          <span className="text-[9px] tracking-[5px] text-white border border-white/30 px-4 py-2">VIEW PROJECT</span>
        </div>
        {/* Category badge */}
        <span className="absolute top-3 left-3 text-[8px] tracking-[3px] text-racing-red bg-black/80 px-2 py-1 border border-racing-red/30">
          {project.category.toUpperCase()}
        </span>
        {/* Year */}
        <span className="absolute top-3 right-3 text-[8px] tracking-[2px] text-white/30">{project.year}</span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold mb-2 tracking-wide group-hover:text-racing-red transition-colors">
          {project.title}
        </h3>
        <p className="text-white/40 text-xs leading-relaxed line-clamp-2 mb-4">{project.description}</p>

        {/* Tools */}
        <div className="flex flex-wrap gap-2">
          {project.tools.slice(0, 3).map((t) => (
            <span key={t} className="text-[8px] tracking-[2px] text-white/30 border border-white/10 px-2 py-1">{t}</span>
          ))}
          {project.tools.length > 3 && (
            <span className="text-[8px] tracking-[2px] text-white/20 px-2 py-1">+{project.tools.length - 3}</span>
          )}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className={cn("h-[1px] bg-racing-red transition-all duration-500", hovered ? "opacity-100" : "opacity-0")} />
    </a>
  );
}
