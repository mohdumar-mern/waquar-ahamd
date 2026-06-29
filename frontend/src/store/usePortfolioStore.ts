import { create } from "zustand";
import type { Project } from "@/types/project.types";
import type { Skill }   from "@/types/skill.types";

interface PortfolioStore {
  projects        : Project[];
  featured        : Project[];
  skills          : Skill[];
  about           : Record<string, unknown> | null;
  isProjectsLoaded: boolean;
  isSkillsLoaded  : boolean;
  setProjects     : (p: Project[]) => void;
  setFeatured     : (p: Project[]) => void;
  setSkills       : (s: Skill[]) => void;
  setAbout        : (a: Record<string, unknown>) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  projects        : [],
  featured        : [],
  skills          : [],
  about           : null,
  isProjectsLoaded: false,
  isSkillsLoaded  : false,
  setProjects     : (p) => set({ projects: p, isProjectsLoaded: true }),
  setFeatured     : (f) => set({ featured: f }),
  setSkills       : (s) => set({ skills: s, isSkillsLoaded: true }),
  setAbout        : (a) => set({ about: a }),
}));
