"use client";
import { useState } from "react";
import type { Skill } from "@/types/skill.types";
import { cn } from "@/utils/cn";

interface SkillBadgeProps {
  skill: Skill;
}

export default function SkillBadge({ skill }: SkillBadgeProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={cn(
        "relative px-5 py-3 border text-[10px] tracking-[3px] transition-all duration-300 cursor-default",
        hovered
          ? "border-racing-red text-white bg-racing-red/10"
          : "border-white/10 text-white/50 bg-transparent"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span>{skill.name.toUpperCase()}</span>

      {/* Skill level bar — shows on hover */}
      {hovered && (
        <div className="absolute bottom-0 left-0 h-[2px] bg-racing-red transition-all duration-300"
             style={{ width: `${skill.level}%` }} />
      )}
    </div>
  );
}
