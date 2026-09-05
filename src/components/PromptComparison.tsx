import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight, Lightbulb, Warning } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import type { PromptExample } from "@/data/promptExamples";

interface PromptComparisonProps {
  example: PromptExample;
}

export function PromptComparison({ example }: PromptComparisonProps) {
  const [isImproved, setIsImproved] = useState(false);
  const reduceMotion = useReducedMotion();

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Toggle buttons */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <Button
          variant={isImproved ? "outline" : "destructive"}
          size="sm"
          onClick={() => setIsImproved(false)}
          className="font-mono gap-2"
          aria-pressed={!isImproved}
        >
          <Warning size={16} />
          Weak Prompt
        </Button>
        <ArrowRight size={18} className="text-content-muted shrink-0" />
        <Button
          variant={isImproved ? "default" : "outline"}
          size="sm"
          onClick={() => setIsImproved(true)}
          className={`font-mono gap-2 ${
            isImproved
              ? "bg-emerald hover:bg-emerald/90 text-white"
              : ""
          }`}
          aria-pressed={isImproved}
        >
          <Lightbulb size={16} />
          Improved Prompt
        </Button>
      </div>

      {/* Prompt display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isImproved ? "improved" : "weak"}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
          transition={transition}
        >
          {/* The prompt */}
          <div
            className={`rounded-xl p-6 mb-4 border-l-4 ${
              isImproved
                ? "bg-emerald-tint border-l-emerald"
                : "bg-red-tint border-l-red"
            }`}
          >
            <span className={`font-mono text-xs uppercase tracking-wider block mb-2 ${
              isImproved
                ? "text-emerald"
                : "text-red"
            }`}>
              {isImproved ? "Improved prompt" : "Weak prompt"}
            </span>
            <p className="font-mono text-sm text-content-primary leading-relaxed whitespace-pre-wrap">
              {isImproved ? example.improvedPrompt : example.weakPrompt}
            </p>
          </div>

          {/* The simulated output */}
          <div
            className={`rounded-xl p-6 border ${
              isImproved
                ? "bg-surface border-emerald/20"
                : "bg-surface-raised border-surface-border"
            }`}
          >
            <span className="font-mono text-xs text-content-secondary uppercase tracking-wider block mb-2">
              AI response
            </span>
            <div className="font-sans text-sm text-content-primary leading-relaxed whitespace-pre-line">
              {isImproved ? example.improvedOutput : example.weakOutput}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}