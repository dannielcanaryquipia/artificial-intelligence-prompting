import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const WORD1 = "Prompting";
const WORD2 = "101";

const LETTER_DELAY = 220;
const COLOR_AFTER = 200;
const FADE_MS = 400;
const PAUSE_MS = 300;

const ACCENT = "var(--color-accent)";
const FINAL = "var(--color-content-primary)";

const FONT_STACK = "var(--font-mono)";

function Letter({
  char,
  show,
  settled,
}: {
  char: string;
  show: boolean;
  settled: boolean;
}) {
  return (
    <span
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "scale(1)" : "scale(1.4)",
        color: settled ? FINAL : ACCENT,
        transition:
          "opacity 160ms ease, transform 160ms ease, color 260ms ease",
      }}
      className="inline-block will-change-transform"
    >
      {char}
    </span>
  );
}

export function SplashScreen() {
  const reduceMotion = useReducedMotion();

  const [line1, setLine1] = useState({ reveal: 0, settle: 0 });
  const [line2, setLine2] = useState({ reveal: 0, settle: 0 });
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setLine1({ reveal: WORD1.length, settle: WORD1.length });
      setLine2({ reveal: WORD2.length, settle: WORD2.length });
      const t = window.setTimeout(() => setDone(true), 600);
      return () => window.clearTimeout(t);
    }

    const timers: number[] = [];

    WORD1.split("").forEach((_, i) => {
      timers.push(
        window.setTimeout(
          () => setLine1((l) => ({ ...l, reveal: i + 1 })),
          i * LETTER_DELAY
        ),
        window.setTimeout(
          () => setLine1((l) => ({ ...l, settle: i + 1 })),
          i * LETTER_DELAY + COLOR_AFTER
        )
      );
    });

    const line2Start = WORD1.length * LETTER_DELAY + PAUSE_MS;

    WORD2.split("").forEach((_, i) => {
      timers.push(
        window.setTimeout(
          () => setLine2((l) => ({ ...l, reveal: i + 1 })),
          line2Start + i * LETTER_DELAY
        ),
        window.setTimeout(
          () => setLine2((l) => ({ ...l, settle: i + 1 })),
          line2Start + i * LETTER_DELAY + COLOR_AFTER
        )
      );
    });

    const total =
      line2Start + WORD2.length * LETTER_DELAY + PAUSE_MS + FADE_MS;

    timers.push(window.setTimeout(() => setFading(true), total - FADE_MS));
    timers.push(window.setTimeout(() => setDone(true), total));

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [reduceMotion]);

  if (done) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface transition-opacity duration-400 ease-out ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div
        className="flex text-[clamp(2rem,6vw,34px)]"
        style={{
          fontFamily: FONT_STACK,
          fontWeight: 700,
          color: FINAL,
          letterSpacing: "0.5px",
        }}
      >
        {WORD1.split("").map((char, i) => (
          <Letter
            key={i}
            char={char}
            show={line1.reveal > i}
            settled={line1.settle > i}
          />
        ))}
      </div>
      <div
        className="flex text-[clamp(1.25rem,4vw,22px)] mt-2"
        style={{
          fontFamily: FONT_STACK,
          fontWeight: 700,
          color: FINAL,
          letterSpacing: "1px",
        }}
      >
        {WORD2.split("").map((char, i) => (
          <Letter
            key={i}
            char={char}
            show={line2.reveal > i}
            settled={line2.settle > i}
          />
        ))}
      </div>
    </div>
  );
}