import { motion, useReducedMotion } from "motion/react";
import { CredentialGroup } from "@/components/CredentialGroup";
import { certifications } from "@/data/certifications";

export function About() {
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
            About the Instructor
          </motion.h1>

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
        </div>
      </section>

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