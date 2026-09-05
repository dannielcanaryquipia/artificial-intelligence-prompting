export interface SocialLink {
  id: "facebook" | "instagram" | "github";
  label: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { id: "facebook", label: "Facebook", href: "" },
  { id: "instagram", label: "Instagram", href: "" },
  { id: "github", label: "GitHub", href: "" },
];

export const projectGithubUrl = "";