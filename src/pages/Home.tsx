import { PageHeader } from "@/components/motion/PageHeader";
import { RevealSection } from "@/components/motion/RevealSection";
import { Lightbulb, Target, Wrench, GithubLogo } from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import { PromptComparison } from "@/components/PromptComparison";
import { homepageExample } from "@/data/promptExamples";
import { projectGithubUrl } from "@/data/site";

const objectives = [
  {
    icon: Lightbulb,
    title: "Understand",
    description:
      "What a prompt actually is and why quality changes output quality",
  },
  {
    icon: Target,
    title: "Apply",
    description:
      "A simple framework — Context, Task, Format, Constraints — to any prompt",
  },
  {
    icon: Wrench,
    title: "Recognize",
    description:
      "How prompting shows up in everyday IT work: debugging, documentation, learning new tools",
  },
];

export function Home() {
  return (
    <div>
      {/* Hero */}
      <PageHeader
        title={
          <>
            A prompt is an instruction.
            <br />
            Treat it like one.
          </>
        }
        subtitle="A short lesson on prompting as a real, learnable skill for IT work — not a trick, a technique."
        titleClassName="mb-6"
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

          <PromptComparison example={homepageExample} />
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
                <Card
                  key={obj.title}
                  className="bg-surface
                             border-surface-border
                             hover:shadow-md transition-shadow duration-200"
                >
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
                    <p className="font-sans text-sm text-content-secondary leading-relaxed">
                      {obj.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </RevealSection>
    </div>
  );
}