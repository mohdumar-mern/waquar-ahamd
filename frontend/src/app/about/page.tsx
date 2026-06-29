import { generateMetadata as genMeta } from "@/lib/seo/metadata";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import StatsSection from "@/components/sections/StatsSection";

export const metadata = genMeta({
  title      : "About Waquar Ahmad | 3D Automotive Animator",
  description: "Learn about Waquar Ahmad — 6+ years creating cinematic F1 and automotive 3D animations using Blender, Maya, Unreal Engine 5, and Cinema 4D.",
  keywords   : ["Waquar Ahmad About","3D Animator Biography","Automotive 3D Artist"],
});

export default function AboutPage() {
  return (
    <main className="pt-16">
      <div className="min-h-[40vh] flex items-center justify-center bg-black border-b border-white/5 px-6">
        <div className="text-center">
          <p className="text-[9px] tracking-[6px] text-racing-red mb-4">MEET THE ARTIST</p>
          <h1 className="text-5xl lg:text-7xl font-black uppercase">About</h1>
        </div>
      </div>
      <AboutSection />
      <StatsSection />
      <SkillsSection />
    </main>
  );
}
