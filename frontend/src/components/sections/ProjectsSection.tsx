"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProjectCard from "@/components/ui/ProjectCard";
import { api }    from "@/utils/api";
import { apiConfig } from "@/config/api.config";
import type { Project, ProjectsResponse } from "@/types/project.types";

const CATEGORIES = ["ALL","F1","Automotive","Commercial","GameCinematic","ShortFilm","ProductViz"];

// Placeholder projects shown before API loads
const PLACEHOLDER_PROJECTS: Project[] = Array.from({ length: 6 }, (_, i) => ({
  _id        : `placeholder-${i}`,
  title      : ["F1 Race Intro","Supercar Reveal","Rally Championship","EV Concept","Drift Championship","Vintage Racer"][i],
  slug       : ["f1-race-intro","supercar-reveal","rally-championship","ev-concept","drift-championship","vintage-racer"][i],
  category   : (["F1","Automotive","GameCinematic","ProductViz","Commercial","ShortFilm"] as Project["category"][])[i],
  description: "Cinematic automotive animation project showcasing premium vehicle rendering and dynamic camera work.",
  tools      : [["Blender","Unreal Engine 5"],["Cinema 4D","KeyShot"],["Maya","Houdini"],["Blender","Substance Painter"],["Houdini","After Effects"],["Blender","DaVinci Resolve"]][i],
  client     : "Confidential",
  year       : 2024 - (i % 2),
  featured   : i < 3,
  order      : i,
  isPublished: true,
  createdAt  : new Date().toISOString(),
  updatedAt  : new Date().toISOString(),
}));

export default function ProjectsSection() {
  const [projects,   setProjects  ] = useState<Project[]>(PLACEHOLDER_PROJECTS);
  const [activeTab,  setActiveTab ] = useState("ALL");
  const [filtered,   setFiltered  ] = useState<Project[]>(PLACEHOLDER_PROJECTS);
  const [loading,    setLoading   ] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  useEffect(() => {
    setLoading(true);
    api.get<ProjectsResponse>(apiConfig.endpoints.projects)
      .then((res) => { const data = res.data?.data || []; setProjects(data); setFiltered(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFiltered(activeTab === "ALL" ? projects : projects.filter((p) => p.category === activeTab));
  }, [activeTab, projects]);

  return (
    <section ref={ref} id="projects" className="bg-black py-28 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-[9px] tracking-[6px] text-racing-red mb-4">SELECTED WORK</p>
          <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-widest mb-10">Projects</h2>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`text-[8px] tracking-[3px] px-4 py-2 border transition-all duration-300 ${
                  activeTab === cat
                    ? "border-racing-red text-white bg-racing-red/10"
                    : "border-white/10 text-white/40 hover:border-white/30"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {filtered.map((project, i) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.6 }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && !loading && (
          <p className="text-center text-white/30 text-sm tracking-widest mt-16">NO PROJECTS IN THIS CATEGORY YET.</p>
        )}
      </div>
    </section>
  );
}
