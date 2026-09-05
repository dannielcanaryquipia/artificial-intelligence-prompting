import type { KeyboardEvent } from "react";
import { motion, useReducedMotion } from "motion/react";

interface AnimatedTitleProps {
  text: string;
  className?: string;
  onClick?: () => void;
  highlightWords?: string[];
}

export function AnimatedTitle({
  text,
  className,
  onClick,
  highlightWords = [],
}: AnimatedTitleProps) {
  const reduceMotion = useReducedMotion();

  const interactive = onClick
    ? {
        role: "button" as const,
        tabIndex: 0,
        "aria-haspopup": "dialog" as const,
        onClick,
        onKeyDown: (e: KeyboardEvent<HTMLHeadingElement>) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        },
      }
    : {};

  const titleClass = `${className}${onClick ? " cursor-pointer" : ""}`;
  const highlightSet = new Set(highlightWords.map((w) => w.toLowerCase()));

  const renderHighlightedText = (raw: string) =>
    raw.split(" ").map((word, i) => {
      const stripped = word.toLowerCase().replace(/[.,;:!?)}\]"]+$/g, "");
      const cls = highlightSet.has(stripped) ? "text-accent" : undefined;
      return (
        <span key={i}>
          {i > 0 && "\u00A0"}
          {cls ? <span className={cls}>{word}</span> : word}
        </span>
      );
    });

  if (reduceMotion) {
    return (
      <h1 className={titleClass} {...interactive}>
        {renderHighlightedText(text)}
      </h1>
    );
  }

  const lines = text.split("\n");
  let wordIndex = 0;

  return (
    <h1 className={titleClass} {...interactive}>
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="block">
          {line.split(" ").map((word) => {
            const index = wordIndex++;
            const stripped = word.toLowerCase().replace(/[.,;:!?)}\]"]+$/g, "");
            const isHighlighted = highlightSet.has(stripped);
            return (
              <span
                key={`${lineIdx}-${index}`}
                className="inline-block overflow-hidden align-top"
              >
                <motion.span
                  className={`inline-block${isHighlighted ? " text-accent" : ""}`}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                    delay: index * 0.06,
                  }}
                >
                  {word}
                  {index < line.split(" ").length - 1 ? "\u00A0" : ""}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}