import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CheckCircle, Circle } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    id: 1,
    name: "Context",
    description:
      "What's the situation? Set the scene so the AI understands your background and constraints.",
    example:
      "I'm Danniel, a first-year student learning JavaScript for-loops this week",
    color: "blue",
  },
  {
    id: 2,
    name: "Task",
    description:
      "What exactly do you want done? Be specific, not vague.",
    example: "Find the bug(s) in the loop conditions and comparison logic",
    color: "accent",
  },
  {
    id: 3,
    name: "Format",
    description:
      "How should the answer be structured? A list, code only, step-by-step, a short paragraph.",
    example:
      "List each bug with a one-line explanation, then show corrected code only for the affected lines",
    color: "emerald",
  },
  {
    id: 4,
    name: "Constraints",
    description:
      "What should it avoid or stay within? Length, tools allowed, don't rewrite everything.",
    example:
      "Don't rewrite the whole function using a different approach like `Set` — I need to understand what's wrong with the loop version specifically, since that's what we're learning this week",
    color: "purple",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue: {
    bg: "bg-blue-tint",
    text: "text-blue",
    border: "border-blue",
  },
  accent: {
    bg: "bg-accent-tint",
    text: "text-accent",
    border: "border-accent",
  },
  emerald: {
    bg: "bg-emerald-tint",
    text: "text-emerald",
    border: "border-emerald",
  },
  purple: {
    bg: "bg-purple-tint",
    text: "text-purple",
    border: "border-purple",
  },
};

export function FrameworkTimeline() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-3">
        {steps.map((step, index) => {
          const colors = colorMap[step.color];
          const isActive = activeStep === step.id;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id}>
              <button
                onClick={() => setActiveStep(isActive ? null : step.id)}
                className="w-full text-left"
                aria-expanded={isActive}
              >
                <div
                  className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-200 ${
                    isActive
                      ? `${colors.bg} border-l-4 ${colors.border}`
                      : "bg-surface hover:bg-surface-raised border-surface-border"
                  }`}
                >
                  {/* Step indicator */}
                  <div className="flex-shrink-0 mt-0.5">
                    {isActive ? (
                      <CheckCircle
                        size={24}
                        weight="fill"
                        className={colors.text}
                      />
                    ) : (
                      <Circle
                        size={24}
                        className="text-content-muted"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="font-mono text-xs">
                        Step {step.id}
                      </Badge>
                      <h3 className="font-sans text-lg font-semibold
                                    text-content-primary">
                        {step.name}
                      </h3>
                    </div>
                    <p className="font-sans text-sm text-content-secondary">
                      {step.description}
                    </p>
                  </div>
                </div>
              </button>

              {/* Expanded example */}
              {isActive && (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-12 mt-2"
                >
                  <div
                    className={`p-4 rounded-xl border-l-2 ${colors.border} ${colors.bg}`}
                  >
                    <span className="font-mono text-xs text-content-secondary block mb-1">
                      Example:
                    </span>
                    <p className="font-mono text-sm text-content-primary italic">
                      &ldquo;{step.example}&rdquo;
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Connector line */}
              {!isLast && (
                <div className="flex justify-start ml-[31px] h-4">
                  <div className="w-px bg-surface-border" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}