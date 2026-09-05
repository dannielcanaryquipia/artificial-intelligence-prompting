import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
}

export function RevealSection({ children, className }: RevealSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.section>
  );
}