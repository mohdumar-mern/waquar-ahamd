import { generateMetadata as genMeta } from "@/lib/seo/metadata";
import ProjectsSection from "@/components/sections/ProjectsSection";

export const metadata = genMeta({
  title      : "Work | Waquar Ahmad",
  description: "Full archive of Waquar Ahmad's 3D automotive animation work — F1, hypercars, commercials, and game cinematics.",
});

export const revalidate = 300;

export default function WorkPage() {
  return (
    <main className="pt-16">
      <div className="min-h-[35vh] flex items-center justify-center bg-black border-b border-white/5 px-6">
        <div className="text-center">
          <p className="text-[9px] tracking-[6px] text-racing-red mb-4">FULL ARCHIVE</p>
          <h1 className="text-5xl lg:text-7xl font-black uppercase">Work</h1>
        </div>
      </div>
      <ProjectsSection />
    </main>
  );
}
