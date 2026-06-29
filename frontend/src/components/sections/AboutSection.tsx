"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import AnimatedText from "@/components/ui/AnimatedText";

const STATS = [
  { value: "6+",   label: "YEARS EXP"  },
  { value: "120+", label: "PROJECTS"   },
  { value: "40+",  label: "CLIENTS"    },
  { value: "8",    label: "AWARDS"     },
];

export default function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} id="about" className="relative bg-black py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[9px] tracking-[6px] text-racing-red mb-6">THE ARTIST</p>
          <h2 className="text-5xl lg:text-6xl font-black uppercase leading-tight mb-8">
            <span className="block">Waquar</span>
            <span className="block" style={{ WebkitTextStroke: "1px #e8000d", color: "transparent" }}>Ahmad</span>
          </h2>
          <p className="text-white/60 leading-relaxed mb-5 text-[15px]">
            A master of automotive 3D animation with over 6 years of experience creating cinematic vehicle
            experiences for global brands, game studios, and broadcast networks.
          </p>
          <p className="text-white/40 leading-relaxed text-sm">
            Specializing in Formula 1, hypercar reveals, and real-time Unreal Engine 5 pipelines —
            every frame engineered to perfection, every render a masterpiece.
          </p>

          <div className="flex gap-8 mt-12">
            {STATS.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              >
                <div className="text-4xl font-black text-racing-red leading-none">{value}</div>
                <div className="text-[8px] tracking-[4px] text-white/30 mt-2">{label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Visual placeholder — in production: real 3D or photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 1 }}
          className="relative aspect-square bg-gradient-to-br from-[#0d0000] to-[#1a0000] border border-white/5 flex items-center justify-center"
        >
          <span className="text-8xl">🏎️</span>
          {/* Corner accent */}
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 border-l border-b border-racing-red/50 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
