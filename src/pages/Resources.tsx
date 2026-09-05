import { PageHeader } from "@/components/motion/PageHeader";
import { RevealSection } from "@/components/motion/RevealSection";
import { ArrowSquareOut } from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { learningResources, uiLibraries } from "@/data/references";

export function Resources() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title="Resources"
        subtitle="Further reading on AI prompting, and an honest look at how this site was built."
      />

      {/* Learning Resources */}
      <section className="pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-sans text-xl md:text-2xl font-semibold
                         text-content-primary mb-6">
            Learning Resources
          </h2>

          <div className="space-y-3">
            {learningResources.map((resource) => (
              <a
                key={resource.title}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <Card className="bg-surface
                                 border-surface-border
                                 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                  <CardContent className="py-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="font-sans text-base font-semibold
                                       text-content-primary mb-1
                                       group-hover:text-accent transition-colors">
                          {resource.title}
                          {resource.free && (
                            <Badge variant="outline" className="ml-2 font-mono text-xs
                                                               bg-emerald-tint/50
                                                               text-emerald
                                                               border-emerald/20">
                              Free
                            </Badge>
                          )}
                        </h3>
                        <p className="font-sans text-sm text-content-secondary">
                          {resource.description}
                        </p>
                      </div>
                      <ArrowSquareOut
                        size={20}
                        className="flex-shrink-0 text-content-muted
                                   group-hover:text-accent transition-colors mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* How This Site Was Built */}
      <RevealSection className="pb-16 md:pb-24 px-4 sm:px-6
                          bg-surface-raised">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-sans text-xl md:text-2xl font-semibold
                         text-content-primary mb-2">
            How This Site Was Built
          </h2>
          <p className="font-sans text-content-secondary mb-6 max-w-prose">
            This site itself was built using AI-assisted development — here's the
            toolchain. A meta-demonstration of the lesson itself: structured,
            specific, real.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {uiLibraries.map((lib) => (
              <a
                key={lib.name}
                href={lib.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="h-full bg-surface
                                 border-surface-border
                                 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-sans text-base font-semibold
                                       text-content-primary
                                       group-hover:text-accent transition-colors">
                          {lib.name}
                        </h3>
                        <p className="font-sans text-sm text-content-secondary mt-1">
                          {lib.description}
                        </p>
                      </div>
                      <ArrowSquareOut
                        size={16}
                        className="flex-shrink-0 text-content-muted
                                   group-hover:text-accent transition-colors mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>

          {/* Tech stack note */}
          <Card className="mt-8 bg-accent-tint/50
                          border-accent/20">
            <CardContent className="py-4">
              <p className="font-sans text-sm text-content-primary">
                <strong className="font-semibold">Tech stack:</strong> React
                19 + Vite, TypeScript, Tailwind CSS v4, shadcn/ui, Motion
                (motion/react), React Router v7, Phosphor Icons. Built with
                AI-assisted development using the OpenCode 5-agent dev team and
                the Graphify codebase knowledge graph — a meta-demonstration of
                the lesson itself.
              </p>
            </CardContent>
          </Card>
        </div>
      </RevealSection>
    </div>
  );
}