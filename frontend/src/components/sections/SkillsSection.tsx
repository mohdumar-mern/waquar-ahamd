"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SkillBadge from "@/components/ui/SkillBadge";
import { api } from "@/utils/api";
import { apiConfig } from "@/config/api.config";
import type { Skill } from "@/types/skill.types";
import type { ApiResponse } from "@/types/api.types";

// Default skills shown before API loads
const DEFAULT_SKILLS: Skill[] = [
  { _id:"1", name:"Blender",            category:"Software",   level:98, order:1 },
  { _id:"2", name:"Maya",               category:"Software",   level:92, order:2 },
  { _id:"3", name:"Cinema 4D",          category:"Software",   level:90, order:3 },
  { _id:"4", name:"Unreal Engine 5",    category:"Software",   level:88, order:4 },
  { _id:"5", name:"Substance Painter",  category:"Software",   level:85, order:5 },
  { _id:"6", name:"Houdini FX",         category:"VFX",        level:78, order:6 },
  { _id:"7", name:"KeyShot",            category:"Rendering",  level:92, order:7 },
  { _id:"8", name:"ZBrush",             category:"Software",   level:75, order:8 },
  { _id:"9", name:"Vehicle Animation",  category:"Animation",  level:99, order:9 },
  { _id:"10",name:"Automotive Rendering",category:"Rendering", level:97, order:10},
  { _id:"11",name:"Particle FX",        category:"VFX",        level:85, order:11},
  { _id:"12",name:"HDR Lighting",       category:"Rendering",  level:94, order:12},
  { _id:"13",name:"Vehicle Rigging",    category:"Animation",  level:88, order:13},
  { _id:"14",name:"After Effects",      category:"General",    level:80, order:14},
  { _id:"15",name:"DaVinci Resolve",    category:"General",    level:76, order:15},
];

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>(DEFAULT_SKILLS);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    api.get<ApiResponse<Skill[]>>(apiConfig.endpoints.skills)
      .then((res) => { if (res.data?.length) setSkills(res.data); })
      .catch(() => {});
  }, []);

  return (
    <section ref={ref} id="skills" className="bg-[#040404] py-28 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[9px] tracking-[6px] text-racing-red mb-4">ARSENAL</p>
          <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-widest">Tools & Expertise</h2>
        </motion.div>

        <div className="flex flex-wrap gap-3 justify-center">
          {skills.map((skill, i) => (
            <motion.div
              key={skill._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.04, duration: 0.5 }}
            >
              <SkillBadge skill={skill} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
