import { PageHeader } from "@/components/motion/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FrameworkTimeline } from "@/components/FrameworkTimeline";
import { PromptComparison } from "@/components/PromptComparison";
import { lessonExamples } from "@/data/promptExamples";

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
  return (
    <div>
      {/* Header */}
      <PageHeader
        title="The Prompting Framework"
        subtitle="A structured approach to writing prompts that actually work. Four elements, any situation."
      />

      {/* Framework */}
      <section className="py-16 px-4 sm:px-6
                          bg-surface-raised">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-sans text-xl md:text-2xl font-semibold
                         text-content-primary mb-8">
            The 4-Step Framework
          </h2>
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
            Real-world prompts for real IT work. See how the framework applies
            to debugging, error messages, and learning new tools.
          </p>

          <div className="space-y-12">
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
          <h2 className="font-sans text-xl md:text-2xl font-semibold
                         text-content-primary mb-2">
            Lesson Plan
          </h2>
          <p className="font-sans text-content-secondary mb-8">
            The structure of this demo teaching session at The Lewis College.
          </p>

          <div className="space-y-3">
            {lessonPlan.map((item, index) => (
              <Card
                key={item.phase}
                className="bg-surface
                           border-surface-border"
              >
                <CardContent className="py-4">
                  <div className="flex items-start gap-4">
                    <Badge
                      variant="default"
                      className="bg-accent hover:bg-accent-active text-white shrink-0 h-8 w-8 rounded-full flex items-center justify-center font-mono text-sm"
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}