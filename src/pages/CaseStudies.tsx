import { motion, useReducedMotion } from "motion/react";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { caseStudies } from "@/data/caseStudies";

export function CaseStudies() {
  const reduceMotion = useReducedMotion();

  return (
    <div>
      {/* Header */}
      <section className="py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-3xl md:text-4xl font-bold tracking-tight
                       text-content-primary mb-4"
          >
            Case Studies
          </motion.h1>
          <p className="font-sans text-lg text-content-secondary max-w-prose">
            Real projects built using structured prompting. Each one demonstrates
            how clear instructions lead to real results.
          </p>
        </div>
      </section>

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