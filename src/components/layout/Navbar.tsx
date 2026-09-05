import { NavLink } from "react-router-dom";
import { List } from "@phosphor-icons/react";
import { navLinks } from "@/data/navigation";

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40
                       bg-surface/80
                       backdrop-blur-md
                       border-b border-surface-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <NavLink
          to="/"
          className="font-mono font-semibold text-lg
                     text-content-primary
                     hover:text-accent transition-colors duration-150 shrink-0"
        >
          Prompting 101
        </NavLink>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? "text-accent bg-accent/10"
                    : "text-content-secondary hover:text-content-primary hover:bg-surface-raised"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2.5 -mr-2 rounded-lg
                     text-content-secondary hover:text-content-primary
                     hover:bg-surface-raised
                     transition-colors duration-150"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <List size={22} weight="bold" />
        </button>
      </nav>
    </header>
  );
}
