"use client";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedTextProps {
  text     : string;
  className?: string;
  delay?   : number;
  once?    : boolean;
}

export default function AnimatedText({ text, className = "", delay = 0, once = true }: AnimatedTextProps) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once });

  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline-flex flex-wrap gap-x-2 ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: delay + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
