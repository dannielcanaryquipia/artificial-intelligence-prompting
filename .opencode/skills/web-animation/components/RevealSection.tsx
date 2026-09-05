import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

type Direction = "up" | "down" | "left" | "right";

interface RevealSectionProps {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  duration?: number;
  className?: string;
}

const directionMap: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
};

export function RevealSection({
  children,
  delay = 0,
  direction = "up",
  duration = 0.6,
  className,
}: RevealSectionProps) {
  const prefersReduced = useReducedMotion();
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const offset = directionMap[direction];

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, ...offset }}
        animate={isVisible ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
