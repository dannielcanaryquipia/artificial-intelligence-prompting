import type { ReactNode } from "react";
import { FadeIn } from "./FadeIn";
import { AnimatedTitle } from "./AnimatedTitle";

interface PageHeaderProps {
  title: ReactNode;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  className?: string;
  children?: ReactNode;
  slot?: ReactNode;
  fillViewport?: boolean;
}

export function PageHeader({
  title,
  subtitle,
  titleClassName = "mb-4",
  subtitleClassName,
  className,
  children,
  slot,
  fillViewport = false,
}: PageHeaderProps) {
  const viewportClass = fillViewport
    ? "md:min-h-[calc(100dvh-4rem)] md:flex md:flex-col md:justify-center"
    : "";
  const h1Class = `font-sans text-3xl md:text-4xl font-bold tracking-tight text-content-primary ${titleClassName}`;
  const isStringTitle = typeof title === "string";
  const content = (
    <>
      {isStringTitle ? (
        <AnimatedTitle text={title as string} className={h1Class} />
      ) : (
        <FadeIn>
          <h1 className={h1Class}>{title}</h1>
        </FadeIn>
      )}
      {subtitle && (
        <FadeIn delay={isStringTitle ? 0.3 : 0.1}>
          <p
            className={`font-sans text-lg text-content-secondary max-w-prose ${subtitleClassName ?? ""}`}
          >
            {subtitle}
          </p>
        </FadeIn>
      )}
      {children}
    </>
  );
  return (
    <section
      className={`py-16 md:py-24 px-4 sm:px-6 ${viewportClass} ${className ?? ""}`}
    >
      {slot ? (
        <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-center">
          <div className="order-last md:order-first">{content}</div>
          <div className="order-first flex justify-center md:order-last">
            {slot}
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">{content}</div>
      )}
    </section>
  );
}