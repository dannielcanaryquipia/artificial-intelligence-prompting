import { useEffect, useRef, useState, RefCallback } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

interface UseScrollRevealReturn {
  ref: RefCallback<Element>;
  isVisible: boolean;
}

export function useScrollReveal(
  options: UseScrollRevealOptions = {}
): UseScrollRevealReturn {
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px", once = true } = options;
  const [isVisible, setIsVisible] = useState(false);
  const nodeRef = useRef<Element | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref: RefCallback<Element> = (node) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (!node) return;

    nodeRef.current = node;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && nodeRef.current) {
            observerRef.current?.unobserve(nodeRef.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observerRef.current.observe(node);
  };

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return { ref, isVisible };
}
