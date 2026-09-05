export interface NavItem {
  to: string;
  label: string;
}

export const navLinks: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/lesson", label: "Lesson" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/activity", label: "Try It" },
  { to: "/about", label: "About" },
  { to: "/resources", label: "Resources" },
];

const footerPaths = ["/", "/lesson", "/case-studies", "/about"];

export const footerLinks: NavItem[] = navLinks.filter((link) =>
  footerPaths.includes(link.to)
);