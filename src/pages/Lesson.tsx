import { useState } from "react";
import { PageHeader } from "@/components/motion/PageHeader";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FrameworkTimeline } from "@/components/FrameworkTimeline";
import { PromptComparison } from "@/components/PromptComparison";
import { GlossaryTerm } from "@/components/GlossaryTerm";
import { lessonExamples, nestedLoopExample, nestedLoopBugCode } from "@/data/promptExamples";

const lessonPlan = [
  {
    phase: "Motivation/Hook",
    duration: "2-3 min",
    description: "Live weak-vs-improved prompt comparison",
  },
  {
    phase: "Lesson Proper",
    duration: "10-12 min",
    description: "Framework + IT-context examples",
  },
  {
    phase: "Application",
    duration: "5-7 min",
    description: "Class activity, rewrite a bad prompt together",
  },
  {
    phase: "Wrap-up",
    duration: "2-3 min",
    description: "Why this matters for IT work specifically",
  },
  {
    phase: "Assessment",
    duration: "2 min",
    description:
      'One-sentence exit check — "what\'s one thing you\'ll change in your next prompt?"',
  },
];

export function Lesson() {
  const [frameworkOpen, setFrameworkOpen] = useState(false);

  return (
    <div>
      {/* Header */}
      <PageHeader
        fillViewport
        title="The Prompting Framework"
        subtitle="A structured approach to writing prompts that actually work. Four elements, any situation."
        onTitleClick={() => setFrameworkOpen(true)}
      />

      {/* "Prompting" + "Framework" glossary popup, opened by clicking the header */}
      <GlossaryTerm
        term="The Prompting Framework"
        open={frameworkOpen}
        onOpenChange={setFrameworkOpen}
        hideTrigger
        definitions={[
          {
            term: "Prompting",
            definition:
              "Prompting is the skill of writing that instruction clearly and specifically enough that the AI understands what you actually want. Think of it like giving directions to someone: vague directions get you lost, specific directions get you where you meant to go.",
          },
          {
            term: "Framework",
            definition:
              "A framework is a reusable structure or set of steps you follow to solve a type of problem consistently, instead of starting from scratch or guessing each time. In your lesson, the CTFC framework (Context, Task, Format, Constraints) is a framework for building a good prompt — it gives you four things to check off before you hit send, no matter what you're asking about.",
          },
        ]}
      />

      {/* Framework */}
      <section className="py-16 px-4 sm:px-6
                          bg-surface-raised">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-sans text-xl md:text-2xl font-semibold
                         text-content-primary mb-2">
            The 4-Step Framework
          </h2>
          <p className="font-sans text-content-secondary mb-8 max-w-prose">
            The four pieces of a strong prompt — built here out of
            Danniel&apos;s nested-loop prompt, which unfolds in full below.
            Click each step to see the exact line it comes from.
          </p>
          <FrameworkTimeline />
        </div>
      </section>

      {/* IT Examples */}
      <section className="py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
<h2 className="font-sans text-xl md:text-2xl font-semibold
             text-content-primary mb-4">
            IT-Context Examples
          </h2>
          <p className="font-sans text-content-secondary mb-10 max-w-prose">
            Real-world prompts for real IT work. First, the featured example
            from the homepage — unpacked in full.
          </p>

          <div className="space-y-12">
            {/* Featured: Danniel's nested-loop bug */}
            <div>
              <h3 className="font-sans text-lg font-semibold
                             text-content-primary mb-4">
                Danniel&apos;s nested-loop bug{" "}
                <Badge variant="outline" className="font-mono text-xs">
                  featured
                </Badge>
              </h3>

              <pre className="overflow-x-auto rounded-lg bg-accent-tint p-4 font-mono text-xs sm:text-sm text-content-primary leading-relaxed mb-2">
                {nestedLoopBugCode}
              </pre>
              <p className="font-sans text-xs text-content-muted mb-8">
                Supposed to return only numbers that appear more than once.
                Instead it returns every number, and sometimes crashes with{" "}
                <code className="font-mono">undefined</code>.
              </p>

              <PromptComparison example={nestedLoopExample} />

              <Accordion
                type="single"
                collapsible
                className="mt-8 rounded-xl border border-surface-border bg-surface px-6"
              >
                <AccordionItem value="what-danniel-needed">
                  <AccordionTrigger>
                    <span className="flex items-center gap-3">
                      <span className="font-sans text-sm font-semibold
                                     text-content-primary">
                        What Danniel actually needed to understand
                      </span>
                      <Badge variant="outline" className="font-mono text-xs">
                        click to open
                      </Badge>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="font-sans text-sm text-content-secondary mb-4">
                      The weak prompt sidestepped the bug — it handed back a
                      full rewrite that ignores the nested-loop version
                      he&apos;s learning. The improved prompt named exactly
                      what was wrong:
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-4 rounded-lg border border-surface-border p-4">
                        <Badge
                          className="bg-accent-deep hover:bg-accent-deep text-white shrink-0 h-8 w-8 rounded-full flex items-center justify-center font-mono text-sm"
                        >
                          1
                        </Badge>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-sans text-sm font-semibold
                                         text-content-primary mb-1">
                            Off-by-one bounds
                          </h4>
                          <p className="font-sans text-sm text-content-secondary">
                            <code className="font-mono">i &lt;= arr.length</code>{" "}
                            and{" "}
                            <code className="font-mono">j &lt;= arr.length</code>{" "}
                            should use{" "}
                            <code className="font-mono">&lt;</code>. Arrays
                            are zero-indexed, so the last valid index is{" "}
                            <code className="font-mono">arr.length - 1</code>.
                            The final pass reads{" "}
                            <code className="font-mono">arr[arr.length]</code>,
                            which is{" "}
                            <code className="font-mono">undefined</code> —
                            that&apos;s the crash.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 rounded-lg border border-surface-border p-4">
                        <Badge
                          className="bg-accent-deep hover:bg-accent-deep text-white shrink-0 h-8 w-8 rounded-full flex items-center justify-center font-mono text-sm"
                        >
                          2
                        </Badge>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-sans text-sm font-semibold
                                         text-content-primary mb-1">
                            Missing{" "}
                            <code className="font-mono">i !== j</code> check
                          </h4>
                          <p className="font-sans text-sm text-content-secondary">
                            With no guard, every element matches itself, so
                            every element gets pushed even when a value only
                            appears once. That&apos;s why it returns every
                            number instead of just the repeats.
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {lessonExamples.map((example) => (
              <div key={example.id}>
                <h3 className="font-sans text-lg font-semibold
                               text-content-primary mb-4 capitalize">
                  {example.id.replace("-", " ")}
                </h3>
                <PromptComparison example={example} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lesson Plan */}
      <section className="py-16 px-4 sm:px-6
                          bg-surface-raised">
        <div className="max-w-4xl mx-auto">
          <h2 className="sr-only">Lesson Plan</h2>
          <Accordion
            type="single"
            collapsible
            className="rounded-xl border border-surface-border bg-surface px-6"
          >
            <AccordionItem value="lesson-plan">
              <AccordionTrigger>
                <span className="flex items-center gap-3">
                  <span className="font-sans text-lg font-semibold
                                 text-content-primary">
                    Lesson Plan
                  </span>
                  <Badge variant="outline" className="font-mono text-xs">
                    click to open
                  </Badge>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="font-sans text-sm text-content-secondary mb-6">
                  The structure of this demo teaching session at The Lewis
                  College. Collapsed so it can be referenced without being
                  read out during the demo.
                </p>

                <div className="space-y-3">
                  {lessonPlan.map((item, index) => (
                    <div
                      key={item.phase}
                      className="flex items-start gap-4 rounded-lg border border-surface-border p-4"
                    >
                      <Badge
                        className="bg-accent-deep hover:bg-accent-deep text-white shrink-0 h-8 w-8 rounded-full flex items-center justify-center font-mono text-sm"
                      >
                        {index + 1}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-sans text-base font-semibold
                                         text-content-primary">
                            {item.phase}
                          </h3>
                          <Badge variant="outline" className="font-mono text-xs">
                            {item.duration}
                          </Badge>
                        </div>
                        <p className="font-sans text-sm text-content-secondary">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}