"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const STATS = [
  { value: "6+",   sub: "Years",     desc: "Professional Experience"    },
  { value: "120+", sub: "Projects",  desc: "Delivered On Time"          },
  { value: "40+",  sub: "Clients",   desc: "Globally Across 3 Continents"},
  { value: "8",    sub: "Awards",    desc: "Industry Recognition"       },
];

export default function StatsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="bg-racing-red/5 border-y border-racing-red/10 py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map(({ value, sub, desc }, i) => (
          <motion.div
            key={sub}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="text-center"
          >
            <div className="text-5xl font-black text-racing-red">{value}</div>
            <div className="text-[10px] tracking-[4px] text-white mt-1">{sub.toUpperCase()}</div>
            <div className="text-[9px] tracking-wider text-white/30 mt-2">{desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
