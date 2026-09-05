import { PageHeader } from "@/components/motion/PageHeader";
import { CredentialGroup } from "@/components/CredentialGroup";
import { certifications } from "@/data/certifications";

export function About() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title="About the Instructor"
        titleClassName="mb-6"
      >
        <div className="max-w-prose">
          <p className="font-sans text-base text-content-primary leading-relaxed mb-4">
            BS Information Technology graduate, Cum Laude, from Sorsogon State
            University (2026). Background spans full-stack development (React,
            React Native, Supabase/PostgreSQL) and hands-on IT networking and
            field installations — plus a genuine, daily practice of
            AI-assisted development.
          </p>
          <p className="font-sans text-base text-content-secondary leading-relaxed">
            "AI Fluency for Educators" and "Teaching the AI Fluency Framework"
            are two of the certifications directly behind how this lesson was
            structured.
          </p>
        </div>
      </PageHeader>

      {/* Certifications */}
      <section className="pb-16 md:pb-24 px-4 sm:px-6
                          bg-surface-raised">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-sans text-xl md:text-2xl font-semibold
                         text-content-primary mb-8">
            Certifications
          </h2>

          {certifications.map((issuer) => (
            <CredentialGroup key={issuer.issuer} issuer={issuer} />
          ))}
        </div>
      </section>
    </div>
  );
}