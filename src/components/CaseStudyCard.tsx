import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CaseStudy } from "@/data/caseStudies";

interface CaseStudyCardProps {
  study: CaseStudy;
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <Card className="bg-surface
                     border-surface-border
                     hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
      <CardContent className="pt-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {study.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-mono">
              {tag}
            </Badge>
          ))}
        </div>

        <h3 className="font-sans text-xl font-semibold
                       text-content-primary mb-3">
          {study.title}
        </h3>

        <p className="font-sans text-sm text-content-secondary leading-relaxed mb-4">
          {study.description}
        </p>

        <p className="font-sans text-sm text-content-primary leading-relaxed
                     border-l-2 border-accent pl-4">
          {study.detail}
        </p>
      </CardContent>
    </Card>
  );
}