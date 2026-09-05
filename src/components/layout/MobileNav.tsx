import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X, House, BookOpen, FolderOpen, Lightbulb, User, Books, type Icon } from "@phosphor-icons/react";
import { navLinks } from "@/data/navigation";

const mobileNavIcons: Record<string, Icon> = {
  "/": House,
  "/lesson": BookOpen,
  "/case-studies": FolderOpen,
  "/activity": Lightbulb,
  "/about": User,
  "/resources": Books,
};

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const reduceMotion = useReducedMotion();

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const panelMotion = reduceMotion
    ? {}
    : {
        initial: { x: "-100%" as const },
        animate: { x: 0 },
        exit: { x: "-100%" as const },
      };

  const backdropMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Full-screen backdrop — z-[60] to sit above everything */}
          <motion.div
            key="mobile-nav-backdrop"
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden"
            onClick={onClose}
            aria-hidden="true"
            initial={backdropMotion.initial}
            animate={backdropMotion.animate}
            exit={backdropMotion.exit}
            transition={{ duration: 0.2 }}
          />

          {/* Slide-out panel — z-[60] to sit above the backdrop */}
          <motion.div
            key="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed top-0 left-0 bottom-0 w-[85vw] max-w-[360px] z-[60] md:hidden
                       bg-surface
                       border-r border-surface-border
                       shadow-2xl shadow-stone-950/10
                       flex flex-col"
            initial={panelMotion.initial}
            animate={panelMotion.animate}
            exit={panelMotion.exit}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-16 shrink-0
                            border-b border-surface-border">
              <span className="font-mono font-semibold text-lg
                               text-content-primary">
                Menu
              </span>
              <button
                onClick={onClose}
                className="p-2 -mr-2 rounded-lg
                           text-content-secondary hover:text-content-primary
                           hover:bg-surface-raised
                           transition-colors duration-150"
                aria-label="Close navigation menu"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            {/* Nav links — equal vertical distribution */}
            <nav className="flex-1 flex flex-col px-3 py-4 overflow-y-auto">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const Icon = mobileNavIcons[link.to];
                  return (
                    <motion.li
                      key={link.to}
                      initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.25,
                        delay: reduceMotion ? 0 : i * 0.04,
                        ease: [0.16, 1, 0.3, 1] as const,
                      }}
                    >
                      <NavLink
                        to={link.to}
                        end={link.to === "/"}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-medium transition-colors duration-150 ${
                            isActive
                              ? "bg-accent/10 text-accent"
                              : "text-content-secondary hover:text-content-primary hover:bg-surface-raised"
                          }`
                        }
                      >
                        <Icon size={20} weight={undefined} />
                        {link.label}
                      </NavLink>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer */}
            <div className="px-6 py-4 shrink-0
                            border-t border-surface-border">
              <p className="font-mono text-xs text-center
                           text-content-muted">
                Prompting 101 — The Lewis College
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}