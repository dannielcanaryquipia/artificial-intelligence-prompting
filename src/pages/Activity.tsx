import { motion, useReducedMotion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { ActivityChips } from "@/components/ActivityChips";

export function Activity() {
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
            Try It Yourself
          </motion.h1>
          <p className="font-sans text-lg text-content-secondary max-w-prose">
            Take a weak prompt and identify what's missing. Click each element to
            see why it matters, then reveal the improved version.
          </p>
        </div>
      </section>

      {/* Activity */}
      <section className="pb-16 md:pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <ActivityChips />

          {/* Live classroom tip */}
          <Card className="mt-12 bg-surface-raised
                           border-surface-border">
            <CardContent className="py-6">
              <h3 className="font-sans text-base font-semibold
                             text-content-primary mb-2">
                Live Classroom Version
              </h3>
              <p className="font-sans text-sm text-content-secondary leading-relaxed">
                Ask the audience to shout out what they'd add first — mirror their
                answer against the framework in real time. This works best when
                projected on screen and the class participates together.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}