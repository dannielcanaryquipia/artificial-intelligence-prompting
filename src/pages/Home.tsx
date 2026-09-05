import { Link } from "react-router-dom";
import { PageHeader } from "@/components/motion/PageHeader";
import { RevealSection } from "@/components/motion/RevealSection";
import { Lightbulb, Target, Wrench, GithubLogo, ArrowRight } from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { PromptComparison } from "@/components/PromptComparison";
import { QrCard } from "@/components/QrCard";
import { DetailDialog } from "@/components/DetailDialog";
import { homepageExample, nestedLoopBugCode } from "@/data/promptExamples";
import { projectGithubUrl } from "@/data/site";

const objectives = [
  {
    icon: Lightbulb,
    title: "Understand",
    description:
      "What a prompt actually is and why quality changes output quality",
    dialogDescription: "New to prompting? Start here.",
    sections: [
      {
        heading: "What is a prompt?",
        body: "A prompt is the instruction you give to an AI — a request, a question, or a task expressed in plain language. The model reads it and responds based on what you said, so the sharper the instruction, the closer the answer comes to what you actually want.",
      },
      {
        heading: "Does prompt quality change output quality?",
        body: "Yes. An AI can only work with what you give it. A vague prompt like \"fix my code\" produces a guess; a specific prompt that names the goal, the context, and the constraints produces an answer aimed at your real problem. Good instructions lead to good output.",
      },
    ],
  },
  {
    icon: Target,
    title: "Apply",
    description:
      "A simple framework — Context, Task, Format, Constraints — to any prompt",
    dialogDescription: "The four pieces behind every strong prompt.",
    sections: [
      {
        heading: "The four pieces",
        body: "Context seats the situation and the background. Task states exactly what you want done. Format defines the shape of the answer — a list, code only, a paragraph. Constraints set the limits: what to avoid, what to keep, what is out of scope.",
      },
      {
        heading: "Why it works",
        body: "Answer these four questions before you send anything, and you have covered the information the model needs to respond precisely. You also catch whatever is missing while it is still cheap to add.",
      },
    ],
  },
  {
    icon: Wrench,
    title: "Recognize",
    description:
      "How prompting shows up in everyday IT work: debugging, documentation, learning new tools",
    dialogDescription: "Where structured prompting pays off on the job.",
    sections: [
      {
        heading: "At work",
        body: "Most IT writing is not decorative prose — it is debugging requests, documentation questions, and \"how do I learn this tool\" prompts. Structured prompting turns those from hopeful questions into instructions that return usable answers.",
      },
      {
        heading: "The habit",
        body: "Context, Task, Format, Constraints does not slow you down. With practice it becomes the way you naturally phrase any request — and it works for people as well as it works for AI.",
      },
    ],
  },
];

export function Home() {
  return (
    <div>
      {/* Hero */}
      <PageHeader
        fillViewport
        title="A prompt is an instruction. Treat it like one."
        subtitle="A short lesson on prompting as a real, learnable skill for IT work — not a trick, a technique."
        titleClassName="mb-6"
        slot={<QrCard />}
      >
        <div className="mt-8">
          {projectGithubUrl ? (
            <a
              href={projectGithubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent-deep px-5 py-2.5 text-sm font-medium
                         text-white hover:brightness-95 active:brightness-90
                         transition-all duration-150"
            >
              <GithubLogo size={18} weight="bold" />
              View the project on GitHub
            </a>
          ) : (
            <span
              title="Add the project GitHub URL in src/data/site.ts"
              className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent-tint px-5 py-2.5 text-sm font-medium
                         text-accent-deep cursor-not-allowed"
            >
              <GithubLogo size={18} weight="bold" />
              View the project on GitHub
            </span>
          )}
        </div>
      </PageHeader>

      {/* Before/After Demo */}
      <section className="py-16 px-4 sm:px-6
                          bg-surface-raised">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-sans text-xl md:text-2xl font-semibold
                         text-content-primary mb-2 text-center">
            See the difference
          </h2>
          <p className="font-sans text-content-secondary text-center mb-10 max-w-prose mx-auto">
            The quality of what you put in directly determines the quality of
            what you get out.
          </p>

          {/* Meet Danniel */}
          <div className="rounded-xl border border-surface-border bg-surface p-6 sm:p-8 mb-10">
            <p className="font-sans text-sm font-medium text-content-secondary mb-4">
              Meet Danniel, a first-year student stuck on a nested-loop bug.
            </p>
            <pre className="overflow-x-auto rounded-lg bg-accent-tint p-4 font-mono text-xs sm:text-sm text-content-primary leading-relaxed">
              {nestedLoopBugCode}
            </pre>
            <p className="font-sans text-xs text-content-muted mt-2">
              Meant to return only repeated numbers. Instead it returns every
              number, and sometimes crashes with{" "}
              <code className="font-mono">undefined</code>.
            </p>

            <div className="mt-8">
              <PromptComparison example={homepageExample} />
            </div>

            {/* Wrap-up: the bug explained — toggled open/closed */}
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
                  <p className="font-sans text-sm text-content-secondary leading-relaxed mb-4">
                    The weak prompt sidestepped the bug — it handed back a
                    full rewrite that ignores the nested-loop version
                    he&apos;s learning. The improved prompt named exactly what
                    was wrong:
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
                          <code className="font-mono">&lt;</code>. Arrays are
                          zero-indexed, so the last valid index is{" "}
                          <code className="font-mono">arr.length - 1</code>.
                          The final pass reads{" "}
                          <code className="font-mono">arr[arr.length]</code>,
                          which is{" "}
                          <code className="font-mono">undefined</code> — that&apos;s
                          the crash.
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
                          With no guard, every element matches{" "}
                          <em>itself</em>, so every element gets pushed even
                          when it only appears once. That&apos;s why it
                          returned every number instead of just the repeats.
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="font-sans text-sm text-accent-deep font-medium mt-4">
                    The fix was two small changes to the loops — not a
                    rewritten function. That&apos;s the difference a structured
                    prompt makes.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <p className="font-sans text-center text-accent-deep text-sm font-medium mt-8">
              <Link to="/lesson" className="hover:underline">
                See the full breakdown on the Lesson page →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <RevealSection className="py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-sans text-xl md:text-2xl font-semibold
                         text-content-primary mb-8">
            What you'll learn
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {objectives.map((obj) => {
              const Icon = obj.icon;
              return (
                <DetailDialog
                  key={obj.title}
                  title={obj.title}
                  description={obj.dialogDescription}
                  sections={obj.sections}
                >
                  <button
                    type="button"
                    className="group w-full text-left cursor-pointer"
                  >
                    <Card className="h-full bg-surface border-surface-border hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
                      <CardContent className="pt-6">
                        <Icon
                          size={28}
                          weight="duotone"
                          className="text-accent mb-3"
                        />
                        <h3 className="font-sans text-lg font-semibold
                                       text-content-primary mb-2">
                          {obj.title}
                        </h3>
                        <p className="font-sans text-sm text-content-secondary leading-relaxed mb-3">
                          {obj.description}
                        </p>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-accent group-hover:underline">
                          Learn more
                          <ArrowRight size={14} weight="bold" aria-hidden="true" />
                        </span>
                      </CardContent>
                    </Card>
                  </button>
                </DetailDialog>
              );
            })}
          </div>
        </div>
      </RevealSection>
    </div>
  );
}