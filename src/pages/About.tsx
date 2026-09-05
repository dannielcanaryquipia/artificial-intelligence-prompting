import {
  FacebookLogo,
  InstagramLogo,
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
  FilePdf,
} from "@phosphor-icons/react";
import { PageHeader } from "@/components/motion/PageHeader";
import { CredentialGroup } from "@/components/CredentialGroup";
import { certifications } from "@/data/certifications";
import { socialLinks } from "@/data/site";
import instructorPhoto from "@/assets/about-image/profile.jpg";
import resumePdf from "@/assets/cv/Danniel_Canary_Quipia_ATS_resume_.pdf";

const socialIcons: Record<string, typeof GithubLogo> = {
  facebook: FacebookLogo,
  instagram: InstagramLogo,
  github: GithubLogo,
  linkedin: LinkedinLogo,
  email: EnvelopeSimple,
};

export function About() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        fillViewport
        title="About the Instructor"
        titleClassName="mb-6"
      >
        <div className="mt-8 mb-8">
          <div className="inline-block rounded-2xl border border-surface-border bg-surface p-2">
            <img
              src={instructorPhoto}
              alt="Danniel Canary, the instructor"
              className="h-40 w-40 rounded-xl object-cover"
            />
          </div>
        </div>

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

        <div className="mt-8 flex items-center gap-3">
          <a
            href={resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-deep px-5 py-2.5 text-sm font-medium
                       text-white hover:brightness-95 active:brightness-90
                       transition-all duration-150"
          >
            <FilePdf size={18} weight="bold" />
            View Resume
          </a>
        </div>

        <div className="flex items-center gap-3 mt-6">
          {socialLinks.map((social) => {
            const Icon = socialIcons[social.id];
            const base =
              "h-11 w-11 rounded-full border border-surface-border bg-surface flex items-center justify-center text-content-secondary transition-colors duration-150";
            return social.href ? (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                title={social.label}
                className={`${base} hover:text-accent hover:border-accent/40`}
              >
                <Icon size={20} weight="duotone" />
              </a>
            ) : (
              <span
                key={social.id}
                aria-label={social.label}
                title={`Paste your ${social.label} URL in src/data/site.ts`}
                className={`${base} opacity-50 cursor-not-allowed`}
              >
                <Icon size={20} weight="duotone" />
              </span>
            );
          })}
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