import { PageHeader } from "@/components/motion/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { ActivityChips } from "@/components/ActivityChips";
import { WhatWeLearned } from "@/components/WhatWeLearned";

export function Activity() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        fillViewport
        title="Try It Yourself"
        subtitle="Take a weak prompt and identify what's missing. Click each element to see why it matters, then reveal the improved version."
      />

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

      {/* Wrap-up */}
      <WhatWeLearned />
    </div>
  );
}