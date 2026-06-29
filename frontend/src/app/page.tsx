import { Suspense } from "react";
import { generateMetadata } from "@/lib/seo/metadata";
import HeroSection     from "@/components/sections/HeroSection";
import AboutSection    from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection   from "@/components/sections/SkillsSection";
import StatsSection    from "@/components/sections/StatsSection";
import ContactSection  from "@/components/sections/ContactSection";
import LoadingScreen   from "@/components/ui/LoadingScreen";

export const metadata = generateMetadata({
  title      : "3D Automotive Animator | F1 & Vehicle Specialist",
  description: "Waquar Ahmad — Professional 3D Animator creating cinematic Formula 1 and automotive animations. Blender, Maya, Cinema 4D, Unreal Engine 5.",
});

// ISR: revalidate every 10 minutes
export const revalidate = 600;

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        {/* Cinematic 3D hero — scroll-driven F1 sequence */}
        <HeroSection />
      </Suspense>

      <AboutSection />
      <StatsSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
