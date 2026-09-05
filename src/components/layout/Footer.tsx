import { NavLink } from "react-router-dom";
import { footerLinks } from "@/data/navigation";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="bg-surface-raised
                       border-t border-surface-border py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-content-secondary font-sans flex items-center gap-2">
          <Logo className="h-5 w-5" />
          Prompting 101 — The Lewis College
        </p>

        <nav aria-label="Footer navigation">
          <ul className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className="text-sm text-content-secondary
                             hover:text-accent
                             transition-colors duration-150"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}