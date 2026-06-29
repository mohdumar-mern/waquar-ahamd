import { generateMetadata as genMeta } from "@/lib/seo/metadata";
import ContactSection from "@/components/sections/ContactSection";

export const metadata = genMeta({
  title      : "Hire Waquar Ahmad | 3D Automotive Animator",
  description: "Get in touch with Waquar Ahmad for freelance automotive 3D animation, F1 cinematic projects, and vehicle visualization commissions.",
  keywords   : ["Hire 3D Animator","Freelance Automotive Animation","Commission 3D Car"],
});

export default function ContactPage() {
  return (
    <main className="pt-16">
      <ContactSection />
    </main>
  );
}
