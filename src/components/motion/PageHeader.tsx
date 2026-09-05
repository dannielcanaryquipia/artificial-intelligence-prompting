import type { ReactNode } from "react";
import { FadeIn } from "./FadeIn";

interface PageHeaderProps {
  title: ReactNode;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  className?: string;
  children?: ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  titleClassName = "mb-4",
  subtitleClassName,
  className,
  children,
}: PageHeaderProps) {
  return (
    <section className={`py-16 md:py-24 px-4 sm:px-6 ${className ?? ""}`}>
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <h1
            className={`font-sans text-3xl md:text-4xl font-bold tracking-tight text-content-primary ${titleClassName}`}
          >
            {title}
          </h1>
        </FadeIn>
        {subtitle && (
          <FadeIn delay={0.1}>
            <p
              className={`font-sans text-lg text-content-secondary max-w-prose ${subtitleClassName ?? ""}`}
            >
              {subtitle}
            </p>
          </FadeIn>
        )}
        {children}
      </div>
    </section>
  );
}