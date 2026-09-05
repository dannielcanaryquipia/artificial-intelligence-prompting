import { Link } from "react-router-dom";
import {
  Lightbulb,
  Target,
  Wrench,
  ArrowRight,
  ChalkboardTeacher,
} from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RevealSection } from "@/components/motion/RevealSection";

const takeaways = [
  {
    icon: Lightbulb,
    title: "Understand",
    body: "A prompt is an instruction — treat it like one. Vague in, vague out; the sharper the request, the closer the answer.",
  },
  {
    icon: Target,
    title: "Apply",
    body: "Run every request through CTFC: Context, Task, Format, Constraints. Four quick questions before you press send.",
  },
  {
    icon: Wrench,
    title: "Recognize",
    body: "Spot it in real IT work — debugging, documentation, learning a new tool. Structured prompting becomes a daily habit.",
  },
];

export function WhatWeLearned() {
  return (
    <RevealSection className="py-16 md:py-24 px-4 sm:px-6 bg-surface-raised">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge
            className="font-mono text-xs uppercase tracking-wider
                       bg-accent-deep text-white hover:bg-accent-deep mb-3"
          >
            Wrap-up
          </Badge>
          <h2 className="font-sans text-xl md:text-2xl font-semibold
                         text-content-primary mb-2">
            What You Learned
          </h2>
          <p className="font-sans text-content-secondary max-w-prose mx-auto">
            We started with a vague request and no idea how to phrase it. We end
            with a framework you can apply to any real problem — starting with
            the one you just solved.
          </p>
        </div>

        {/* Goal recap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-10">
          {takeaways.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="bg-surface border-surface-border h-full"
              >
                <CardContent className="pt-6">
                  <Icon
                    size={28}
                    weight="duotone"
                    className="text-accent mb-3"
                  />
                  <h3 className="font-sans text-lg font-semibold
                                 text-content-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-content-secondary leading-relaxed">
                    {item.body}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Close the loop */}
        <Card className="mb-10 bg-accent-tint/40
                         border-accent/20
                         border-l-4 border-l-accent">
          <CardContent className="py-6 md:py-8">
            <h3 className="font-sans text-base font-semibold
                           text-content-primary mb-2">
              That&apos;s the loop you just ran
            </h3>
            <p className="font-sans text-sm md:text-base text-content-secondary leading-relaxed mb-4">
              The problem reveal gave the situation. The weak prompt showed what
              happens without the framework. Clicking Context, Task, Format, and
              Constraints rebuilt it into an improved prompt — the exact same
              move you&apos;ll make on real IT problems: debugging a crash,
              asking how to use a tool, or writing documentation.
            </p>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 rounded-lg bg-accent-deep px-5 py-2.5 text-sm font-medium
                         text-white hover:brightness-95 active:brightness-90
                         transition-all duration-150"
            >
              See it applied in real projects
              <ArrowRight size={16} weight="bold" />
            </Link>
          </CardContent>
        </Card>

        {/* Exit check */}
        <Card className="bg-surface border-surface-border">
          <CardContent className="py-6 md:py-8 text-center">
            <ChalkboardTeacher
              size={28}
              weight="duotone"
              className="text-accent mx-auto mb-3"
            />
            <h3 className="font-sans text-lg font-semibold
                           text-content-primary mb-2">
              Exit check
            </h3>
            <p className="font-sans text-base md:text-lg text-content-secondary leading-relaxed mb-4 max-w-prose mx-auto">
              What&apos;s one thing you&apos;ll change in your next prompt?
            </p>
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent-tint
                         px-5 py-2.5 text-sm font-medium text-accent-deep
                         hover:bg-accent/15 active:bg-accent/25
                         transition-all duration-150"
            >
              Keep learning — free resources
              <ArrowRight size={16} weight="bold" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </RevealSection>
  );
}