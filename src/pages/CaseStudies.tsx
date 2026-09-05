import { PageHeader } from "@/components/motion/PageHeader";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { caseStudies } from "@/data/caseStudies";

export function CaseStudies() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title="Case Studies"
        subtitle="Real projects built using structured prompting. Each one demonstrates how clear instructions lead to real results."
      />

      {/* Case Studies Grid */}
      <section className="pb-16 md:pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {caseStudies.map((study) => (
              <CaseStudyCard key={study.id} study={study} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}