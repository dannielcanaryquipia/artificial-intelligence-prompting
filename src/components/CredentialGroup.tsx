import { Badge } from "@/components/ui/badge";
import type { CertificationIssuer } from "@/data/certifications";

interface CredentialGroupProps {
  issuer: CertificationIssuer;
}

export function CredentialGroup({ issuer }: CredentialGroupProps) {
  return (
    <div className="mb-8 last:mb-0">
      <h3 className="font-sans text-lg font-semibold
                    text-content-primary mb-4">
        {issuer.issuer}
        <span className="ml-2 font-mono text-sm text-content-muted">
          ({issuer.certifications.length})
        </span>
      </h3>

      <div className="flex flex-wrap gap-2">
        {issuer.certifications.map((cert) => (
          <Badge
            key={cert}
            variant="outline"
            className="font-mono text-xs
                       bg-accent-tint/50
                       text-accent
                       border-accent/20"
          >
            {cert}
          </Badge>
        ))}
      </div>
    </div>
  );
}