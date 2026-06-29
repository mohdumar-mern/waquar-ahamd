import { generateMetadata as genMeta } from "@/lib/seo/metadata";
import ProjectsSection from "@/components/sections/ProjectsSection";

export const metadata = genMeta({
  title      : "3D Animation Projects | Waquar Ahmad",
  description: "Browse Waquar Ahmad's portfolio of Formula 1, automotive, commercial, and game cinematic 3D animation projects.",
  keywords   : ["3D Animation Portfolio","F1 Animation Projects","Automotive 3D Work"],
});

export const revalidate = 300;

export default function ProjectsPage() {
  return (
    <main className="pt-16">
      <div className="min-h-[35vh] flex items-center justify-center bg-black border-b border-white/5 px-6">
        <div className="text-center">
          <p className="text-[9px] tracking-[6px] text-racing-red mb-4">PORTFOLIO</p>
          <h1 className="text-5xl lg:text-7xl font-black uppercase">Projects</h1>
        </div>
      </div>
      <ProjectsSection />
    </main>
  );
}
