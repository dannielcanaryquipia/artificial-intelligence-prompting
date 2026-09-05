import { useEffect, useState } from "react";
import type { RefObject } from "react";
import { useInView, useReducedMotion } from "motion/react";

type MarginValue = `${number}${"px" | "%"}`;
type RevealMargin =
  | MarginValue
  | `${MarginValue} ${MarginValue}`
  | `${MarginValue} ${MarginValue} ${MarginValue}`
  | `${MarginValue} ${MarginValue} ${MarginValue} ${MarginValue}`;

interface ScrollRevealOptions {
  once?: boolean;
  margin?: RevealMargin;
}

export function useScrollReveal<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: ScrollRevealOptions = {}
) {
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, {
    once: options.once ?? true,
    margin: options.margin ?? "-80px",
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (inView) setVisible(true);
  }, [inView]);

  return reduceMotion ? true : visible;
}