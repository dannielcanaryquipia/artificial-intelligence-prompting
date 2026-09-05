import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, ArrowRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const elements = [
  {
    id: "context",
    name: "Context",
    missing: "No background given — the AI doesn't know your situation or skill level.",
    why: "Without context, the AI gives generic advice that might not apply to your specific assignment or experience.",
  },
  {
    id: "task",
    name: "Task",
    missing: "No specific task defined — 'help me' could mean anything.",
    why: "Vague requests get vague answers. Being specific about what you need helps the AI focus on solving your actual problem.",
  },
  {
    id: "format",
    name: "Format",
    missing: "No format specified — the AI might give a long essay when you need a quick checklist.",
    why: "Telling the AI how to structure its answer saves you from reading through irrelevant information.",
  },
  {
    id: "constraints",
    name: "Constraints",
    missing: "No constraints set — the AI might rewrite your entire project instead of just fixing the specific issue.",
    why: "Constraints prevent over-engineering and keep the AI focused on exactly what you need.",
  },
];

export function ActivityChips() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showFix, setShowFix] = useState(false);
  const reduceMotion = useReducedMotion();

  const toggleChip = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const allSelected = selected.length === elements.length;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* The weak prompt */}
      <Card className="mb-6 bg-red-tint/50
                       border-red/20
                       border-l-4 border-l-red">
        <CardContent className="py-6">
          <span className="font-mono text-xs text-red uppercase tracking-wider block mb-2">
            Weak prompt
          </span>
          <p className="font-mono text-base text-content-primary">
            &ldquo;help me with my assignment&rdquo;
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
                  <CardContent className="py-4">
                    <p className="font-mono text-sm text-accent font-medium mb-1">
                      {element.missing}
                    </p>
                    <p className="font-sans text-sm text-content-secondary">
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
            <CardContent className="py-6">
              <span className="font-mono text-xs text-emerald uppercase tracking-wider block mb-2">
                Improved prompt
              </span>
              <p className="font-mono text-sm text-content-primary leading-relaxed">
                &ldquo;I'm a second-year IT student (Context). My Python assignment asks me
                to analyze a CSV file of student grades and calculate the average for
                each subject (Task). Please give me a step-by-step explanation with
                code I can run in VS Code (Format). Keep it under 50 lines and use
                only the pandas library (Constraints).&rdquo;
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}