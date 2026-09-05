import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Check, ArrowRight, Question, CaretDown } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const elements = [
  {
    id: "context",
    name: "Context",
    missing: "No background given — the AI doesn't know your skill level or why you want to learn.",
    why: "Without context, the AI can't tailor the roadmap — a busy professional, a student, or a total beginner each need a very different plan.",
  },
  {
    id: "task",
    name: "Task",
    missing: "No specific goal defined — 'learning roadmap' for what end purpose?",
    why: "A roadmap to 'use AI at work' looks completely different from one for 'build AI products'. Being specific about your goal helps the AI scope the path.",
  },
  {
    id: "format",
    name: "Format",
    missing: "No format specified — the AI might return a generic essay instead of a practical schedule.",
    why: "Telling the AI how to structure its answer (week-by-week, skills, practice prompts, resources) makes the roadmap actually usable instead of abstract.",
  },
  {
    id: "constraints",
    name: "Constraints",
    missing: "No constraints set — the AI might suggest paid tools or a plan that takes hours a day.",
    why: "Constraints keep the roadmap realistic. Budget, time per day, and resource limits stop the plan from over-committing you.",
  },
];

export function ActivityChips() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showFix, setShowFix] = useState(false);
  const [showProblem, setShowProblem] = useState(false);
  const reduceMotion = useReducedMotion();

  const toggleChip = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const allSelected = selected.length === elements.length;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Problem reveal */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => setShowProblem((prev) => !prev)}
          aria-expanded={showProblem}
          className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-tint
                     px-4 py-2 font-mono text-sm font-medium text-accent-deep
                     hover:bg-accent/15 active:bg-accent/25 transition-all duration-200"
        >
          <Question size={16} weight="duotone" />
          {showProblem ? "Hide the problem" : "What's the problem?"}
          <motion.span
            animate={{ rotate: showProblem ? 180 : 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.2 }}
            className="inline-block"
          >
            <CaretDown size={14} weight="bold" />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {showProblem && (
            <motion.div
              key="problem"
              initial={reduceMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
              }
              className="overflow-hidden"
            >
              <Card className="mt-4 bg-surface border-surface-border
                               border-l-4 border-l-accent">
                <CardContent className="py-5 md:py-6">
                  <span className="font-mono text-xs md:text-sm text-accent uppercase tracking-wider block mb-2">
                    The problem
                  </span>
                  <p className="font-sans text-sm md:text-base text-content-primary leading-relaxed">
                    Meet Danniel, a complete beginner with no coding experience. He wants to
                    learn AI prompting so he can use AI tools for his studies and future work —
                    but he&rsquo;s never asked an AI for a plan before. So he types the first
                    thing that comes to mind:
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* The weak prompt */}
      <Card className="mb-6 bg-red-tint/50
                       border-red/20
                       border-l-4 border-l-red">
        <CardContent className="py-6 md:py-8">
          <span className="font-mono text-xs md:text-sm text-red uppercase tracking-wider block mb-2">
            Weak prompt
          </span>
          <p className="font-mono text-base md:text-lg text-content-primary">
            &ldquo;create a learning roadmap for AI prompting&rdquo;
          </p>
        </CardContent>
      </Card>

      {/* Instruction */}
      <p className="font-sans text-content-secondary mb-4">
        Click each element that's missing from this prompt:
      </p>

      {/* Chip selector */}
      <div className="flex flex-wrap gap-3 mb-6">
        {elements.map((element) => {
          const isSelected = selected.includes(element.id);
          return (
            <motion.button
              key={element.id}
              whileTap={reduceMotion ? {} : { scale: 0.95 }}
              onClick={() => toggleChip(element.id)}
              className={`px-4 py-2 rounded-full font-mono text-sm font-medium transition-all duration-200 ${
                isSelected
                  ? "bg-accent text-white"
                  : "bg-surface-raised text-content-secondary hover:bg-surface-border border border-surface-border"
              }`}
              aria-pressed={isSelected}
            >
              {isSelected && <Check className="inline-block mr-1" size={16} />}
              {element.name}
            </motion.button>
          );
        })}
      </div>

      {/* Explanations for selected elements */}
      {selected.length > 0 && (
        <div className="space-y-3 mb-6">
          {elements
            .filter((e) => selected.includes(e.id))
            .map((element) => (
              <motion.div
                key={element.id}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-accent-tint/50
                               border-accent/20">
                  <CardContent className="py-5 md:py-6">
                    <p className="font-mono text-sm md:text-base text-accent-deep font-medium mb-1">
                      {element.missing}
                    </p>
                    <p className="font-sans text-sm md:text-base text-content-secondary leading-relaxed">
                      {element.why}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </div>
      )}

      {/* See the fix button */}
      {allSelected && !showFix && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Button
            onClick={() => setShowFix(true)}
            className="w-full"
            size="lg"
          >
            See the improved version
            <ArrowRight className="inline-block ml-2" size={18} />
          </Button>
        </motion.div>
      )}

      {/* Improved prompt reveal */}
      {showFix && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-emerald-tint/50
                          border-emerald/20
                          border-l-4 border-l-emerald">
            <CardContent className="py-6 md:py-8">
              <span className="font-mono text-xs md:text-sm text-emerald uppercase tracking-wider block mb-2">
                Improved prompt
              </span>
              <p className="font-mono text-sm md:text-base text-content-primary leading-relaxed">
                &ldquo;I'm a complete beginner with no coding experience (Context). I want to
                learn prompt engineering well enough to use AI tools effectively for
                study and work (Task). Please give me a week-by-week roadmap with
                specific skills, sample prompts to practice, and resources to use
                (Format). Keep it under 30 minutes per day, and include free resources
                only (Constraints).&rdquo;
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}