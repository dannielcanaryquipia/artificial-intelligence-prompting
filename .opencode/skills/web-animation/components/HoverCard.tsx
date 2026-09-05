import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  lift?: boolean;
}

export function HoverCard({
  children,
  className = "",
  lift = true,
}: HoverCardProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      whileHover={lift ? { y: -2, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" } : undefined}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
