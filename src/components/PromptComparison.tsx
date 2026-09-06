import { useEffect, useState, type KeyboardEvent } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "motion/react";
import {
  ArrowBendUpLeft,
  ArrowRight,
  CircleNotch,
  Lightbulb,
  Warning,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import type { PromptExample } from "@/data/promptExamples";

interface PromptComparisonProps {
  example: PromptExample;
}

type Phase = "idle" | "typing" | "awaitEnter" | "loading" | "streaming" | "complete";

interface RunState {
  phase: Phase;
  typedLen: number;
  respLen: number;
}

type Mode = "weak" | "improved";

const IDLE_STATE: RunState = { phase: "idle", typedLen: 0, respLen: 0 };

const CHAR_DELAY = 26;
const RESP_CHAR_DELAY = 12;
const THINK_DELAY = 1200;

export function PromptComparison({ example }: PromptComparisonProps) {
  const [isImproved, setIsImproved] = useState(false);
  const reduceMotion = useReducedMotion();

  const [runs, setRuns] = useState<Record<Mode, RunState>>({
    weak: { ...IDLE_STATE },
    improved: { ...IDLE_STATE },
  });

  const mode: Mode = isImproved ? "improved" : "weak";
  const run = runs[mode];
  const prompt = isImproved ? example.improvedPrompt : example.weakPrompt;
  const response = isImproved ? example.improvedOutput : example.weakOutput;

  const patch = (p: Partial<RunState>) =>
    setRuns((prev) => ({ ...prev, [mode]: { ...prev[mode], ...p } }));

  /* Idle → typing (or straight to awaitEnter under reduced motion) */
  const handlePromptActivate = () => {
    if (run.phase !== "idle") return;
    if (reduceMotion) {
      patch({ phase: "awaitEnter", typedLen: prompt.length });
    } else {
      patch({ phase: "typing", typedLen: 0 });
    }
  };

  const handlePromptKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (run.phase === "idle") handlePromptActivate();
      if (run.phase === "awaitEnter") handleSubmit();
    }
  };

  /* Enter pressed on prompt → loading (or straight to complete under reduced motion) */
  const handleSubmit = () => {
    if (run.phase !== "awaitEnter") return;
    if (reduceMotion) {
      patch({ phase: "complete", typedLen: prompt.length, respLen: response.length });
    } else {
      patch({ phase: "loading", typedLen: prompt.length, respLen: 0 });
    }
  };

  /* Animated typing of the prompt */
  useEffect(() => {
    if (run.phase !== "typing") return;
    const id = setInterval(() => {
      setRuns((prev) => {
        const cur = prev[mode];
        if (cur.typedLen >= prompt.length) {
          return { ...prev, [mode]: { ...cur, phase: "awaitEnter" } };
        }
        return { ...prev, [mode]: { ...cur, typedLen: cur.typedLen + 1 } };
      });
    }, CHAR_DELAY);
    return () => clearInterval(id);
  }, [run.phase, mode, prompt.length]);

  /* Loading → streaming → complete for the AI response */
  useEffect(() => {
    if (run.phase !== "loading" && run.phase !== "streaming") return;

    if (run.phase === "loading") {
      const think = setTimeout(
        () =>
          setRuns((prev) => ({ ...prev, [mode]: { ...prev[mode], phase: "streaming" } })),
        THINK_DELAY
      );
      return () => clearTimeout(think);
    }

    const id = setInterval(() => {
      setRuns((prev) => {
        const cur = prev[mode];
        if (cur.respLen >= response.length) {
          return { ...prev, [mode]: { ...cur, phase: "complete" } };
        }
        return { ...prev, [mode]: { ...cur, respLen: cur.respLen + 1 } };
      });
    }, RESP_CHAR_DELAY);
    return () => clearInterval(id);
  }, [run.phase, mode, response.length]);

  const showPromptText = run.typedLen > 0;
  const typedPrompt = prompt.slice(0, run.typedLen);
  const isActivatable = run.phase === "idle" || run.phase === "awaitEnter";

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
            isImproved ? "bg-emerald hover:bg-emerald/90 text-white" : ""
          }`}
          aria-pressed={isImproved}
        >
          <Lightbulb size={16} />
          Improved Prompt
        </Button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
          transition={transition}
        >
          {/* The prompt (simulated chat input) */}
          <div
            className={`w-full text-left rounded-xl p-6 mb-4 border-l-4 transition-colors ${
              isImproved
                ? "bg-emerald-tint border-l-emerald"
                : "bg-red-tint border-l-red"
            }`}
          >
            <span
              className={`font-mono text-xs uppercase tracking-wider block mb-2 ${
                isImproved ? "text-emerald" : "text-red"
              }`}
            >
              {isImproved ? "Improved prompt" : "Weak prompt"}
            </span>

            <div className="flex items-start justify-between gap-4">
              <div
                role={isActivatable ? "button" : undefined}
                tabIndex={isActivatable ? 0 : -1}
                onClick={handlePromptActivate}
                onKeyDown={handlePromptKeyDown}
                aria-label={
                  run.phase === "idle"
                    ? "Type the prompt"
                    : isImproved
                      ? "Improved prompt, press Enter to send"
                      : "Weak prompt, press Enter to send"
                }
                className={`flex-1 min-w-0 ${
                  run.phase === "idle" ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <p className="font-mono text-sm text-content-primary leading-relaxed whitespace-pre-wrap min-h-[1.5em]">
                  {showPromptText ? typedPrompt : null}
                  <SpanCaret visible={run.phase === "idle"} />
                  {!showPromptText && run.phase === "idle" && (
                    <span className="text-content-muted ml-0.5">type the prompt</span>
                  )}
                </p>
              </div>

              {run.phase === "awaitEnter" && (
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  aria-label="Send prompt"
                  title="Press Enter to send"
                  className="shrink-0 inline-flex h-8 items-center gap-1.5 rounded-lg border border-surface-border bg-surface px-3 font-mono text-xs text-content-secondary hover:text-content-primary hover:border-accent/50 transition-colors"
                >
                  <ArrowBendUpLeft size={16} />
                  Enter
                </motion.button>
              )}
            </div>
          </div>

          {/* The simulated AI output */}
          <div
            className={`rounded-xl p-6 border ${
              isImproved
                ? "bg-surface border-emerald/20"
                : "bg-surface-raised border-surface-border"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-content-secondary uppercase tracking-wider">
                AI response
              </span>
              {run.phase === "complete" && (
                <span
                  className={`font-mono text-[11px] uppercase tracking-wider ${
                    isImproved ? "text-emerald" : "text-red"
                  }`}
                >
                  {isImproved ? "answered" : "responded"}
                </span>
              )}
            </div>

            {run.phase === "loading" || run.phase === "streaming" ? (
              <StreamingIndicator
                responding={run.phase === "streaming"}
                partial={response.slice(0, run.respLen)}
                colored={isImproved}
              />
            ) : run.phase === "complete" ? (
              <div className="font-sans text-sm text-content-primary leading-relaxed whitespace-pre-line">
                {response}
              </div>
            ) : (
              <div className="font-sans text-sm text-content-muted leading-relaxed">
                Waiting for your prompt&hellip;
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function SpanCaret({ visible }: { visible: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`ml-0.5 inline-block h-[1.15em] w-[0.55ch] align-baseline rounded-[1px] bg-current ${
        visible ? "animate-pulse" : "opacity-0"
      }`}
    />
  );
}

function StreamingIndicator({
  responding,
  partial,
  colored,
}: {
  responding: boolean;
  partial: string;
  colored: boolean;
}) {
  return (
    <div>
      {!responding && (
        <div className="flex items-center gap-2 text-content-secondary mb-2">
          <CircleNotch size={16} className="animate-spin" />
          <span className="font-mono text-xs">thinking&hellip;</span>
        </div>
      )}
      <div className="font-sans text-sm text-content-primary leading-relaxed whitespace-pre-line">
        {partial}
        <span
          aria-hidden="true"
          className={`ml-0.5 inline-block h-[1.15em] w-[0.55ch] align-baseline rounded-[1px] ${
            colored ? "bg-emerald" : "bg-red"
          } animate-pulse`}
        />
      </div>
    </div>
  );
}